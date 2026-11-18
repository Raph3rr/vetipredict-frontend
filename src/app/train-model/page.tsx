"use client";

import React, { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";

export default function TrainModelPage() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [classes, setClasses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleTrain() {
    setLoading(true);
    setError(null);
    setReport(null);
    setClasses([]);

    try {
      const res = await fetch(`${API_BASE}/train`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      if (data.animals && typeof data.animals === "object") {
        const entries = Object.entries(data.animals) as [
          string,
          { report?: string; classes?: string[]; rows?: number }
        ][];
        setReport(
          entries
            .map(([animal, details]) => `${animal} (${details.rows ?? 0} records)\n${details.report ?? ""}`)
            .join("\n\n")
        );
        setClasses([...new Set(entries.flatMap(([, details]) => details.classes ?? []))]);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to trigger model retraining."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">ML Model Training</h1>
        <p className="text-sm text-slate-500 mb-6">
          Trigger retraining of the Random Forest classifier using the current contents of the <strong>livestock_diseases.csv</strong> dataset.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
          <h3 className="font-semibold text-slate-800 mb-2">Model Specifications</h3>
          <ul className="list-disc ml-5 text-sm text-slate-600 space-y-1">
            <li>Algorithm: RandomForestClassifier (200 estimators)</li>
            <li>Input features: 15 binary symptom indicators</li>
            <li>One model per animal category in the current CSV</li>
            <li>Validation: 85/15 group split so identical symptom profiles stay together</li>
          </ul>

          <button
            onClick={handleTrain}
            disabled={loading}
            className="mt-6 px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-medium shadow-sm transition disabled:opacity-55 flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {loading ? "Training Pipeline Running..." : "Retrain ML Model"}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm font-medium text-rose-700 mb-6">
            Error: {error}
          </div>
        )}

        {report && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
              Model successfully trained and saved to server. Validation results details are below.
            </div>

            {classes.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Diagnoses Target List ({classes.length} classes):</h3>
                <div className="flex flex-wrap gap-2">
                  {classes.map((cls) => (
                    <span key={cls} className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-700 font-medium">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Classification Validation Report:</h3>
              <pre className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre">
                {report}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
