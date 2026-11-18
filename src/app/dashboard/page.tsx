"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";

interface Job {
  job_id: number;
  source: string;
  status: "pending" | "running" | "completed" | "failed";
  meta: unknown;
  created_at: string;
  finished_at: string | null;
}

interface Email {
  id: number;
  email: string;
  source: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/auth/login");
    fetchJobs();
    fetchEmails();
  }, []);

  async function apiFetch(path: string, opts: RequestInit = {}) {
    const token = localStorage.getItem("access_token");
    const headers = new Headers(opts.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || `Error ${res.status}`);
    return json;
  }

  async function fetchJobs() {
    try {
      const data = await apiFetch("/api/scrape/jobs");
      const items: Job[] = data.items || [];
      setJobs(items);
      items.filter((j) => j.status === "running").forEach((j) => pollJob(j.job_id));
    } catch (err: unknown) {
      setError(err instanceof Error && err.message ? err.message : "Failed to fetch jobs");
    }
  }

  async function fetchEmails() {
    try {
      const data = await apiFetch("/api/emails?page=1&per_page=10");
      setEmails(data.items || []);
    } catch (err: unknown) {
      setError(err instanceof Error && err.message ? err.message : "Failed to fetch emails");
    }
  }

  function pollJob(jobId: number) {
    if (pollRef.current[jobId]) return;
    const intervalId = window.setInterval(async () => {
      try {
        const job: Job = await apiFetch(`/api/scrape/jobs/${jobId}`);
        setJobs((prev) => {
          const copy = prev.filter((j) => j.job_id !== job.job_id);
          copy.unshift(job);
          return copy.slice(0, 100);
        });
        if (job.status === "completed" || job.status === "failed") {
          clearInterval(intervalId);
          delete pollRef.current[jobId];
        }
      } catch {
        clearInterval(intervalId);
        delete pollRef.current[jobId];
      }
    }, 2000);
    pollRef.current[jobId] = intervalId;
  }

  const summary = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === "completed").length,
    running: jobs.filter((j) => j.status === "running").length,
    failed: jobs.filter((j) => j.status === "failed").length,
    pending: jobs.filter((j) => j.status === "pending").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            router.push("/auth/login");
          }}
          className="px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
        >
          Logout
        </button>
      </header>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(summary).map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-4 rounded-2xl shadow flex flex-col items-center justify-center"
          >
            <span className="text-sm text-slate-500 capitalize">{key}</span>
            <span className="text-2xl font-bold">{value}</span>
          </div>
        ))}
      </section>

      {/* Recent Jobs Table */}
      <section className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Recent Jobs</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className="text-slate-500 text-sm">
              <tr>
                <th className="px-3 py-2">Job ID</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Meta</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Finished</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-4 text-sm text-slate-400">
                    No jobs yet
                  </td>
                </tr>
              )}
              {jobs.slice(0, 10).map((j) => (
                <tr key={j.job_id} className="border-t">
                  <td className="px-3 py-2">{j.job_id}</td>
                  <td className="px-3 py-2">{j.source}</td>
                  <td className="px-3 py-2">
                    {j.status === "completed" ? (
                      <span className="text-green-600">Completed</span>
                    ) : j.status === "running" ? (
                      <span className="text-amber-600">Running</span>
                    ) : j.status === "failed" ? (
                      <span className="text-red-600">Failed</span>
                    ) : (
                      <span className="text-slate-500">{j.status}</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-xs">{JSON.stringify(j.meta)}</td>
                  <td className="px-3 py-2 text-sm">{new Date(j.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2 text-sm">{j.finished_at ? new Date(j.finished_at).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Emails Table */}
      <section className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Recent Emails</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className="text-slate-500 text-sm">
              <tr>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {emails.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-sm text-slate-400">
                    No emails yet
                  </td>
                </tr>
              )}
              {emails.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="px-3 py-2 text-sm">{e.email}</td>
                  <td className="px-3 py-2 text-sm">{e.source}</td>
                  <td className="px-3 py-2 text-sm">{new Date(e.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
