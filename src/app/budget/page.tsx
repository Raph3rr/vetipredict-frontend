"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/**
 * BudgetPage
 * - Fetches from /api/users/{userId}/budget-projection?forecast_days=14
 * - Shows loading / error states
 * - Export CSV and Adjust budget actions included
 *
 * Props:
 *  - apiBase?: string
 *  - userId?: string | number
 *  - className?: string
 */

type Transaction = {
  id: string | number;
  title: string;
  category?: string;
  amount: number;
  date: string; // YYYY-MM-DD
  vendor?: string;
};

type DailyPoint = { date: string; amount: number };

type BudgetPayload = {
  monthly_budget: number;
  spent_month: number;
  remaining_month: number;
  spent_year_to_date?: number;
  transactions: Transaction[];
  daily_spend: DailyPoint[]; // used for chart
  forecast?: { ds: string; yhat: number }[]; // optional future forecast
};

export default function BudgetPage({
  apiBase,
  userId,
  className = "",
}: {
  apiBase?: string;
  userId?: string | number;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BudgetPayload | null>(null);
  const [forecastDays, setForecastDays] = useState<number>(14);

  // Demo fallback data (kept for offline preview)
  const demo: BudgetPayload = {
    monthly_budget: 120000, // NGN
    spent_month: 45230,
    remaining_month: 74770,
    spent_year_to_date: 510000,
    transactions: [
      { id: 1, title: "Market - Rice & Beans", category: "Groceries", amount: 12500, date: "2025-11-21", vendor: "Alhaji Bello" },
      { id: 2, title: "Vegetables (Local)", category: "Groceries", amount: 3400, date: "2025-11-23", vendor: "Samaru Farm" },
      { id: 3, title: "Fuel", category: "Transport", amount: 18000, date: "2025-11-10", vendor: "Shell" },
      { id: 4, title: "Cooking Gas", category: "Household", amount: 8000, date: "2025-11-03", vendor: "Gas Co." },
    ],
    daily_spend: [
      { date: "2025-10-27", amount: 1200 },
      { date: "2025-10-30", amount: 5600 },
      { date: "2025-11-03", amount: 8000 },
      { date: "2025-11-10", amount: 18000 },
      { date: "2025-11-15", amount: 6000 },
      { date: "2025-11-21", amount: 12500 },
      { date: "2025-11-23", amount: 3400 },
    ],
    forecast: [
      { ds: "2025-11-27", yhat: 17000 },
      { ds: "2025-11-28", yhat: 16500 },
      { ds: "2025-11-29", yhat: 16000 },
      { ds: "2025-11-30", yhat: 15800 },
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function load() {
      if (!apiBase || !userId) {
        setData(demo);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const url = `${apiBase}/api/users/${userId}/budget-projection?forecast_days=${encodeURIComponent(
          String(forecastDays)
        )}`;
        const res = await fetch(url, { signal });
        if (!res.ok) {
          // try to parse json message if available
          let msg = `HTTP ${res.status}`;
          try {
            const body = await res.json();
            if (body && body.msg) msg = body.msg;
          } catch {
            /* ignore */
          }
          throw new Error(msg);
        }
        const json = await res.json();
        setData({
          monthly_budget: Number(json.monthly_budget || json.budget_monthly || 0),
          spent_month: Number(json.spent_month || json.spent || 0),
          remaining_month: Number(
            (json.monthly_budget || json.budget_monthly || 0) - (json.spent_month || json.spent || 0)
          ),
          spent_year_to_date: Number(json.spent_year_to_date || 0),
          transactions: json.transactions || [],
          daily_spend: json.daily_spend || [],
          forecast: json.forecast || [],
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error && err.message ? err.message : "Could not load budget data");
        setData(demo);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [apiBase, userId, forecastDays]);

  // Export transactions to CSV
  function exportTransactionsCSV() {
    if (!data || !data.transactions) return;
    const rows = [
      ["id", "title", "category", "vendor", "date", "amount"],
      ...data.transactions.map((t) => [String(t.id), t.title, t.category || "", t.vendor || "", t.date, String(t.amount)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_user_${userId || "demo"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Adjust budget (prompts user, tries PATCH, falls back to optimistic UI)
  async function handleAdjustBudget() {
    if (!data) return;
    const raw = prompt("Enter new monthly budget (number, NGN):", String(data.monthly_budget));
    if (!raw) return;
    const parsed = Number(raw.replace(/[^0-9.-]+/g, ""));
    if (!isFinite(parsed) || parsed < 0) {
      alert("Enter a valid positive number.");
      return;
    }

    const old = data.monthly_budget;
    setData({ ...data, monthly_budget: parsed, remaining_month: Math.max(0, parsed - data.spent_month) });

    // Try to PATCH backend if available
    if (apiBase && userId) {
      try {
        const res = await fetch(`${apiBase}/api/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ budget_monthly: parsed }),
        });
        if (!res.ok) {
          // if backend doesn't support PATCH, show a gentle warning but keep optimistic update
          let msg = `HTTP ${res.status}`;
          try {
            const b = await res.json();
            if (b && b.msg) msg = b.msg;
          } catch {}
          console.warn("Could not persist new budget:", msg);
        }
      } catch (e) {
        console.warn("Could not persist new budget (network):", e);
      }
    } else {
      // no backend - nothing to persist
    }
  }

  if (loading && !data) {
    return (
      <div className={`p-8 bg-slate-50 min-h-[300px] rounded-2xl ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-40 bg-white rounded-xl shadow p-4" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`p-8 bg-slate-50 min-h-[300px] rounded-2xl ${className}`}>
        <div className="text-center py-12 text-gray-500">No budget data available.</div>
      </div>
    );
  }

  const percentUsed = Math.min(100, Math.round((data.spent_month / Math.max(1, data.monthly_budget)) * 100));

  return (
    <div className={`p-6 bg-slate-50 min-h-screen ${className}`}>
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Monthly Budget</h1>
            <p className="text-sm text-gray-500">Overview of your monthly spending and forecast</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-500">Budget target</div>
              <div className="text-xl font-bold text-gray-900">₦{data.monthly_budget.toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setForecastDays((d) => (d === 7 ? 14 : 7))}
                title="Toggle forecast horizon"
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm"
              >
                {forecastDays}d forecast
              </button>

              <button
                onClick={handleAdjustBudget}
                className="px-3 py-2 rounded-lg bg-white border text-gray-800 hover:bg-gray-50 text-sm"
              >
                Adjust budget
              </button>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded">{error}</div>
        )}

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: summary + chart */}
          <section className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Spent this month</div>
                  <div className="text-3xl font-extrabold text-gray-900">₦{data.spent_month.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Remaining ₦{(data.monthly_budget - data.spent_month).toLocaleString()}</div>
                </div>
                <div className="w-48">
                  <div className="text-xs text-gray-500">Usage</div>
                  <div className="w-full mt-2 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all"
                      style={{ width: `${percentUsed}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">{percentUsed}% used</div>
                </div>
              </div>

              <div className="mt-6 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.daily_spend.map((d) => ({ date: d.date, amount: d.amount }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v: number) => `₦${v}`} />
                    <Tooltip formatter={(v: number) => `₦${v.toLocaleString()}`} />
                    <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {data.forecast && data.forecast.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Forecast:</strong> next {forecastDays} days show expected spend trends.
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Recent transactions</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportTransactionsCSV}
                    className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm"
                  >
                    Export transactions
                  </button>
                </div>
              </div>

              {data.transactions.length === 0 ? (
                <div className="text-sm text-gray-500 py-8 text-center">No transactions found.</div>
              ) : (
                <ul className="space-y-3">
                  {data.transactions.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                          {(t.title || "").slice(0, 1)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{t.title}</div>
                          <div className="text-xs text-gray-500">
                            {t.category ?? t.vendor} • {t.date}
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold ${t.amount > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        ₦{t.amount.toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </section>

          {/* Right column: quick stats */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="text-xs text-gray-500">Year to date spent</div>
              <div className="text-xl font-bold text-gray-900">₦{(data.spent_year_to_date || 0).toLocaleString()}</div>
              <div className="text-xs text-gray-400 mt-2">Track yearly spending vs budget</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Next bill estimate</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₦{Math.round((data.monthly_budget - data.spent_month) * 0.25).toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-gray-400">Auto</div>
              </div>
              <div className="mt-3 text-xs text-gray-500">Suggested buffer for last week of month</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
              <div className="flex flex-col gap-2">
                <button onClick={handleAdjustBudget} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm shadow-sm hover:bg-indigo-700">
                  Adjust budget
                </button>
                <button onClick={exportTransactionsCSV} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm hover:bg-gray-200">
                  Export transactions
                </button>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-8 text-xs text-gray-500">
          Data shown is sample/demo if backend is not connected. Connect your account to view live budget projections.
        </footer>
      </div>
    </div>
  );
}
