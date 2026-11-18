/*
Files included:
- src/app/auth/register/page.tsx
- src/app/auth/login/page.tsx

Drop these into your Next.js `app` directory. They use Tailwind CSS and expect
an environment variable NEXT_PUBLIC_API_BASE (optional) that points to your
Flask backend, e.g. http://localhost:5000. If NEXT_PUBLIC_API_BASE is omitted,
requests will go to the same host (useful with proxies).
*/

// -----------------------------
// src/app/auth/register/page.tsx
// -----------------------------

"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || data.error || "Registration failed");

      setSuccess("Account created. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
      <p className="text-sm text-slate-500 mb-6">Sign up to start scraping and managing email jobs.</p>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      {success && <div className="mb-4 text-sm text-green-600">{success}</div>}

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
            placeholder="at least 6 characters"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-slate-600">Confirm Password</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="confirm password"
            required
          />
        </label>

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
              "Create account"
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 text-sm text-slate-600">
        Already have an account? <Link href="/auth/login" className="text-indigo-600 hover:underline">Log in</Link>
      </div>
    </div>
  );
}
