// File: app/welcome/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function WelcomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white" >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        {/* Hero */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Early disease detection. Optimized feed advisory.
            </h1>
            <p className="text-slate-600 max-w-xl">
              VetiPredict helps veterinarians, extension workers, and livestock owners identify potential
              diseases based on animal symptoms and formulate nutritionally balanced feed diets — offline-friendly
              and data-driven.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/recommendation"
                className="px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:scale-[.995] transition transform"
              >
                Disease Predictor
              </Link>

              <Link
                href="/nutrition"
                className="px-5 py-3 rounded-2xl bg-white text-slate-800 border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                Feed Advisory
              </Link>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <StatCard label="Diseases Supported" value="10+" />
              <StatCard label="Feed Ingredients" value="10+" />
              <StatCard label="Offline Ready" value="Yes" />
              <StatCard label="Model Core" value="Random Forest" />
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Hero image (public/images/hero.jpg) */}
            <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden bg-white">
              {/* Use Image for optimization; provide fallback SVG if image not present */}
              <div className="relative w-full h-64 sm:h-80 md:h-96">
                <Image
                  src="/livestock.png"
                  alt="Livestock illustrations"
                  fill
                  className="object-cover"
                  onLoadingComplete={() => setHeroLoaded(true)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {!heroLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/50 to-slate-50">
                    <svg className="w-20 h-20 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 6v-2a2 2 0 012-2h6a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" />
                      <circle cx="15.5" cy="12.5" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold mb-4">What you can do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard title="Disease Diagnostics" desc="Review possible livestock illnesses from animal species and observed symptoms." />
            <FeatureCard title="Feed Advisory & Diet Plans" desc="Formulate nutrient balanced diets using local feed resources." />
            <FeatureCard title="Manage Datasets" desc="View, upload and preview CSV dataset tables for health and feeds." />
            <FeatureCard title="Offline Friendly" desc="Designed to work well on low-bandwidth or mobile devices." />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-3">
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">About</Link>
            <a href="mailto:hello@ksoft.example" className="text-sm text-slate-600 hover:text-slate-900">Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* --- Small reusable components --- */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-500 mt-2">{desc}</div>
    </div>
  );
}
