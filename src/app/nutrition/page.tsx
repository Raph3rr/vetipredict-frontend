"use client";

import React, { useState } from "react";

type FeedItemInput = {
  food_id: number;
  food_name: string;
  amount_g: number | "";
};

type PerItemResult = {
  food_id: number;
  food_name: string;
  amount_g: number;
  calories_kcal?: number; // Metabolizable Energy
  carbs_g?: number; // Crude Fiber
  protein_g?: number; // Crude Protein
  fat_g?: number; // Crude Fat
  vitamin_a_mcg?: number; // Vitamin A
  vitamin_c_mg?: number; // Vitamin E
  iron_mg?: number; // Phosphorus
  calcium_mg?: number; // Calcium
  zinc_mg?: number; // Zinc
};

type FeedResponse = {
  items?: PerItemResult[];
  totals?: Record<string, number>;
  note?: string;
  error?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";

const SAMPLE_FEEDS: { food_id: number; name: string }[] = [
  { food_id: 1, name: "Yellow Maize (Corn)" },
  { food_id: 2, name: "Soybean Meal (48%)" },
  { food_id: 3, name: "Wheat Bran" },
  { food_id: 4, name: "Alfalfa Hay (Late Bud)" },
  { food_id: 5, name: "Fish Meal (60%)" },
  { food_id: 6, name: "Rice Bran" },
  { food_id: 7, name: "Cottonseed Meal" },
  { food_id: 8, name: "Bone Meal" },
  { food_id: 9, name: "Maize Silage" },
  { food_id: 10, name: "Limestone (Ground)" }
];

export default function FeedAdvisoryPage() {
  const [rows, setRows] = useState<FeedItemInput[]>([
    { food_id: 1, food_name: "Yellow Maize (Corn)", amount_g: 600 },
    { food_id: 2, food_name: "Soybean Meal (48%)", amount_g: 350 },
    { food_id: 8, food_name: "Bone Meal", amount_g: 50 }
  ]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [resp, setResp] = useState<FeedResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function addRow() {
    setResp(null);
    setError(null);
    setAdding(true);
    setTimeout(() => {
      setRows((s) => [
        ...s,
        { food_id: SAMPLE_FEEDS[0].food_id, food_name: SAMPLE_FEEDS[0].name, amount_g: "" }
      ]);
      setAdding(false);
    }, 200);
  }

  function removeRow(idx: number) {
    setRows((s) => s.filter((_, i) => i !== idx));
    setResp(null);
    setError(null);
  }

  function updateRow(idx: number, patch: Partial<FeedItemInput>) {
    setRows((s) => s.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
    setResp(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResp(null);

    if (!rows.length) {
      setError("Add at least one feed ingredient.");
      return;
    }

    for (const [i, r] of rows.entries()) {
      if (!r.food_id || r.amount_g === "" || Number(r.amount_g) <= 0) {
        setError(`Row ${i + 1}: select an ingredient and enter a valid weight in grams (> 0).`);
        return;
      }
    }

    const payload = {
      items: rows.map((r) => ({
        food_id: Number(r.food_id),
        amount_g: Number(r.amount_g)
      }))
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/nutrition/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error || j?.msg || `HTTP ${res.status}`);
      } else {
        const json = await res.json();
        await new Promise((r) => setTimeout(r, 600));
        setResp(json);
      }
    } catch (err: unknown) {
      setError(err instanceof Error && err.message ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setRows([
      { food_id: 1, food_name: "Yellow Maize (Corn)", amount_g: 600 },
      { food_id: 2, food_name: "Soybean Meal (48%)", amount_g: 350 },
      { food_id: 8, food_name: "Bone Meal", amount_g: 50 }
    ]);
    setResp(null);
    setError(null);
  }

  function generateAdvisory(totals: Record<string, number> | undefined) {
    if (!totals) return { bullets: [], summary: "" };

    const bullets: string[] = [];
    const totalWeight = rows.reduce((acc, r) => acc + (Number(r.amount_g) || 0), 0);

    const cp = totals.protein_g ?? 0; // crude protein in grams
    const energy = totals.calories_kcal ?? 0; // metabolizable energy in kcal
    const fiber = totals.carbs_g ?? 0; // crude fiber in grams
    const calcium = totals.calcium_mg ?? 0; // calcium in mg
    const phosphorus = totals.iron_mg ?? 0; // phosphorus in mg

    // Calculate percent profiles of the feed
    const cpPct = totalWeight > 0 ? (cp / totalWeight) * 100 : 0;
    const fiberPct = totalWeight > 0 ? (fiber / totalWeight) * 100 : 0;
    const mePerKg = totalWeight > 0 ? (energy / totalWeight) * 1000 : 0;
    const caPct = totalWeight > 0 ? (calcium / (totalWeight * 1000)) * 100 : 0;
    const pPct = totalWeight > 0 ? (phosphorus / (totalWeight * 1000)) * 100 : 0;

    bullets.push(`Crude Protein content is ${cpPct.toFixed(1)}% of total weight.`);
    bullets.push(`Metabolizable Energy density is ${mePerKg.toFixed(0)} kcal/kg.`);
    bullets.push(`Crude Fiber content is ${fiberPct.toFixed(1)}%.`);
    bullets.push(`Calcium-to-Phosphorus ratio is ${(pPct > 0 ? caPct / pPct : 0).toFixed(2)}:1 (Target is usually 1.5:1 to 2:1).`);

    if (cpPct < 14) {
      bullets.push("Crude Protein looks low. Consider increasing soybean meal or fish meal to boost protein for growing animals or laying hens.");
    }
    if (mePerKg < 2500) {
      bullets.push("Energy density is low. Consider raising Yellow Maize ratios to boost metabolizable energy.");
    }
    if (fiberPct > 15) {
      bullets.push("Crude fiber is high. Suitable for ruminants (cattle/goats), but may reduce digestibility for monogastrics (poultry/pigs).");
    }

    const summary = `Total Feed Formulation weight: ${(totalWeight / 1000).toFixed(2)} kg. The mix provides ${cp.toFixed(0)}g of Crude Protein and ${energy.toFixed(0)} kcal of Metabolizable Energy.`;

    return { bullets, summary };
  }

  const { bullets, summary } = generateAdvisory(resp?.totals);

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="mx-auto max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Livestock Feed Advisory & Formulator</h1>
          <p className="text-sm text-slate-500 mt-1">
            Build custom diet formulations using common feed resources. Calculate total energy (ME), protein, fiber, calcium, and phosphorus values to check if they meet nutritional standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Ingredients Calculator</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {rows.map((row, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <select
                      value={row.food_id}
                      onChange={(e) => {
                        const fid = Number(e.target.value);
                        const match = SAMPLE_FEEDS.find((f) => f.food_id === fid);
                        updateRow(idx, { food_id: fid, food_name: match ? match.name : "" });
                      }}
                      className="flex-1 min-w-0 px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    >
                      {SAMPLE_FEEDS.map((item) => (
                        <option key={item.food_id} value={item.food_id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="Amount (g)"
                      value={row.amount_g}
                      onChange={(e) =>
                        updateRow(idx, { amount_g: e.target.value === "" ? "" : Number(e.target.value) })
                      }
                      className="w-28 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => removeRow(idx)}
                      disabled={rows.length <= 1}
                      className="p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                      title="Remove ingredient"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={addRow}
                  disabled={adding}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  {adding ? "Adding..." : "+ Add Ingredient"}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2"
                >
                  {loading ? "Calculating..." : "Formulate Diet"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold ml-auto"
                >
                  Reset
                </button>
              </div>

              {error && <div className="text-sm font-semibold text-rose-500">{error}</div>}
            </form>
          </div>

          {/* Results & Advisory */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-semibold text-slate-800">Nutritional Breakdown</h2>
            
            {!resp && (
              <div className="h-64 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <div className="text-sm font-medium text-slate-500">No active formulation</div>
                <p className="text-xs text-slate-400 mt-1 max-w-[240px]">Enter weights for each ingredient and click &apos;Formulate Diet&apos; to view nutritional stats.</p>
              </div>
            )}

            {resp && resp.totals && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Nutrients</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Metabolizable Energy:</span>
                      <span className="font-bold text-slate-800">{resp.totals.calories_kcal?.toFixed(0)} kcal</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Crude Protein:</span>
                      <span className="font-bold text-slate-800">{(resp.totals.protein_g ?? 0).toFixed(1)} g</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Crude Fiber:</span>
                      <span className="font-bold text-slate-800">{(resp.totals.carbs_g ?? 0).toFixed(1)} g</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Crude Fat:</span>
                      <span className="font-bold text-slate-800">{(resp.totals.fat_g ?? 0).toFixed(1)} g</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Calcium (Ca):</span>
                      <span className="font-bold text-slate-800">{((resp.totals.calcium_mg ?? 0) / 1000).toFixed(2)} g</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 font-medium">Phosphorus (P):</span>
                      <span className="font-bold text-slate-800">{((resp.totals.iron_mg ?? 0) / 1000).toFixed(2)} g</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100/50 space-y-3">
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Feed Formulation Advice</h3>
                  <div className="text-emerald-800 font-medium text-sm leading-relaxed">{summary}</div>
                  {bullets.length > 0 && (
                    <ul className="list-disc ml-5 space-y-1.5 text-xs text-emerald-900/80 leading-relaxed">
                      {bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
