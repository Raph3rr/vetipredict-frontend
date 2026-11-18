// -------------------------
// src/app/auth/login/page.tsx
// -------------------------

"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE_LOGIN = process.env.NEXT_PUBLIC_API_BASE || "";

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_LOGIN}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || "Invalid credentials");

      // store token + optional user info
      if (data.access_token) {
        try {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user_email", email);
        } catch (e) {
          // ignore localStorage errors
        }
      }

      // redirect to dashboard
      // router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
      <p className="text-sm text-slate-500 mb-6">Log in to manage scrapes, view jobs and export results.</p>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-slate-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="you@company.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="your password"
            required
          />
        </label>

        <div className="flex items-center justify-between text-sm">
          <div />
          <Link href="/auth/forgot" className="text-indigo-600 hover:underline">Forgot password?</Link>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 text-sm text-slate-600">
        Don&apos;t have an account? <Link href="/auth/register" className="text-indigo-600 hover:underline">Create one</Link>
      </div>
    </div>
  );
}
