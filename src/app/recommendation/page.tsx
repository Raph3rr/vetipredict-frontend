
"use client";

import React, { useState } from "react";
import Link from "next/link";
import DiseaseImageFigure from "@/app/component/DiseaseImageFigure";
import {
  ANIMAL_TYPES,
  DISEASE_ADVICE,
  formatDiseaseName,
  getDiseaseImages,
  normalizeDiseaseName,
  type DiseaseAdvice
} from "@/data/diseaseLibrary";

type Prediction = {
  disease: string;
  probability: number;
};

type PredictResponse = {
  input?: Record<string, unknown>;
  predictions?: Prediction[];
  error?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";

const SYMPTOM_FIELDS = [
  "coughing", "diarrhea", "lethargy", "loss_of_appetite",
  "nasal_discharge", "lesions", "lameness", "labored_breathing",
  "ocular_discharge", "swelling", "weight_loss", "neurological_signs",
  "bloody_stool", "excessive_salivation", "reduced_production"
];

const SYMPTOM_HELP: Record<string, string> = {
  coughing: "Repeated or noticeable coughing.",
  diarrhea: "Loose or watery droppings.",
  lethargy: "Unusually weak, inactive, or slow to respond.",
  loss_of_appetite: "Eating less than usual or refusing feed.",
  nasal_discharge: "Fluid or mucus coming from the nostrils.",
  lesions: "Visible sores, scabs, lumps, or unusual skin marks.",
  lameness: "Limping or difficulty standing or walking.",
  labored_breathing: "Breathing looks difficult, fast, or unusually effortful.",
  ocular_discharge: "Fluid or discharge coming from the eyes.",
  swelling: "Unusual swelling on the body, face, joints, or limbs.",
  weight_loss: "Noticeable loss of body condition or weight.",
  neurological_signs: "Tremors, poor balance, or unusual head or neck position.",
  bloody_stool: "Visible blood in the droppings or stool.",
  excessive_salivation: "More saliva or drooling than usual.",
  reduced_production: "Lower than usual milk, egg, or other production."
};

function symptomLabel(field: string) {
  const labels: Record<string, string> = {
    loss_of_appetite: "Loss of appetite",
    nasal_discharge: "Nasal discharge",
    labored_breathing: "Labored breathing",
    ocular_discharge: "Eye discharge",
    weight_loss: "Weight loss",
    neurological_signs: "Neurological signs",
    bloody_stool: "Bloody stool",
    excessive_salivation: "Excessive salivation",
    reduced_production: "Reduced production"
  };
  return labels[field] || field.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DiseasePredictorPage() {
  const [animalType, setAnimalType] = useState("Cattle");

  const [symptoms, setSymptoms] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SYMPTOM_FIELDS.map((field) => [field, false]))
  );

  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAllPredictions, setShowAllPredictions] = useState(false);

  const [openAdviceDisease, setOpenAdviceDisease] = useState<string | null>(
    null
  );
  const hasSelectedSymptom = SYMPTOM_FIELDS.some((field) => symptoms[field]);

  function clearSymptoms() {
    setSymptoms(Object.fromEntries(SYMPTOM_FIELDS.map((field) => [field, false])));
  }

  function resetOutput() {
    setResp(null);
    setError(null);
    setOpenAdviceDisease(null);
    setShowAllPredictions(false);
  }

  function handleAnimalChange(val: string) {
    setAnimalType(val);
    clearSymptoms();
    resetOutput();
  }

  function handleReset() {
    setAnimalType("Cattle");
    clearSymptoms();
    resetOutput();
  }

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault();

    resetOutput();

    if (!hasSelectedSymptom) {
      setError("Select at least one symptom to generate a prediction.");
      return;
    }

    const payload = {
      animal_type: animalType,
      ...Object.fromEntries(
        SYMPTOM_FIELDS.map((field) => [field, symptoms[field] ? 1 : 0])
      )
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(json?.error || json?.msg || `HTTP ${response.status}`);
        return;
      }

      if (!Array.isArray(json.predictions)) {
        setError(
          "The prediction service returned an unexpected response."
        );
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 700));

      setResp(json);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Network error. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  function renderAdviceForDisease(diseaseName: string) {
    const key = normalizeDiseaseName(diseaseName);
    const info = DISEASE_ADVICE[key];
    const images = getDiseaseImages(diseaseName, animalType);

    if (!info) {
      return (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Veterinary information unavailable</p>
          <p className="mt-1">
            Specific guidance for {formatDiseaseName(diseaseName)} has not
            been added. Please consult a veterinary professional for
            assessment and treatment.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4 space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
        <div>
          <h4 className="text-base font-semibold text-slate-800">
            {formatDiseaseName(diseaseName)}: Overview
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {info.short}
          </p>
        </div>

        {images.length > 0 && (
          <div className={images.length > 1 ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
            {images.map((image) => (
              <DiseaseImageFigure key={image.src} image={image} animal={animalType} />
            ))}
          </div>
        )}
        {images.length === 0 && (
          <p className="text-xs text-slate-500">
            No animal-matched reference image is available yet.
          </p>
        )}

        <div className="border-t border-slate-200 pt-4">
          <h5 className="font-semibold text-slate-800">
            Recognisable signs and symptoms
          </h5>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-xs leading-relaxed text-slate-600">
            {info.signs.map((sign, index) => (
              <li key={index}>{sign}</li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h5 className="font-semibold text-slate-800">
            How the disease spreads
          </h5>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            {info.transmission}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-4 md:grid-cols-2">
          <div>
            <h5 className="font-semibold text-slate-800">
              Treatment and management
            </h5>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {info.treatment}
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-slate-800">
              Prevention and biosecurity
            </h5>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              {info.prevention}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h5 className="font-semibold text-slate-800">
            Important steps for farmers
          </h5>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-xs leading-relaxed text-slate-600">
            {info.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-900">
            Important veterinary notice
          </p>
          <p className="mt-1 text-xs leading-relaxed text-amber-800">
            These descriptions and pictures are for educational purposes.
            Symptoms can overlap between diseases, and a picture or symptom
            alone cannot confirm a diagnosis. Contact a qualified veterinary
            professional for examination and appropriate testing. For
            suspected serious or reportable diseases, contact the relevant
            veterinary authorities promptly and follow their instructions.
          </p>
        </div>
      </div>
    );
  }

  const allPredictions = resp?.predictions ?? [];

  const rankedPredictions = allPredictions
    .filter(
      (prediction) =>
        Number.isFinite(prediction.probability) && prediction.probability > 0
    )
    .sort((a, b) => b.probability - a.probability);

  const roundedProbabilityTenths = rankedPredictions.map((prediction) =>
    Math.round(prediction.probability * 1000)
  );
  const roundingDifference =
    1000 - roundedProbabilityTenths.reduce((sum, value) => sum + value, 0);
  const highestProbabilityIndex = rankedPredictions.reduce(
    (highestIndex, prediction, index, predictions) =>
      prediction.probability > predictions[highestIndex].probability
        ? index
        : highestIndex,
    0
  );
  if (highestProbabilityIndex >= 0) {
    roundedProbabilityTenths[highestProbabilityIndex] += roundingDifference;
  }
  const displayProbabilityPercent = (disease: string) => {
    const index = rankedPredictions.findIndex(
      (prediction) => prediction.disease === disease
    );
    return index >= 0 ? roundedProbabilityTenths[index] / 10 : 0;
  };

  const visiblePredictions = showAllPredictions
    ? rankedPredictions
    : rankedPredictions.slice(0, 3);
  const hasMorePredictions = rankedPredictions.length > 3;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Livestock health support
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Livestock Disease Predictor
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
            Enter the animal&apos;s details and select its observed symptoms to
            generate possible conditions for further veterinary assessment.
          </p>

          <aside className="mt-4 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            This prediction tool supports decision-making by highlighting
            possible conditions based on the symptoms entered. It is not a
            diagnostic tool and does not replace professional veterinary care.
            Always consult a veterinarian for diagnosis and treatment decisions.
          </aside>

          <Link
            href="/supported-diseases"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            View supported diseases
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <form onSubmit={handlePredict} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Step 1
              </span>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Animal type
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select the animal for the symptom-based prediction.
              </p>
            </div>

            <label className="flex max-w-md flex-col text-sm">
              <span className="mb-1.5 text-xs font-semibold text-slate-600">
                Animal type
              </span>
              <select
                value={animalType}
                onChange={(e) => handleAnimalChange(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                {ANIMAL_TYPES.map((animal) => (
                  <option key={animal} value={animal}>{animal}</option>
                ))}
              </select>
            </label>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Step 2
              </span>

              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Clinical symptoms
              </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select only signs you have actually observed. You may select
                  more than one; leave unobserved signs unchecked.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SYMPTOM_FIELDS.map((field) => (
                <label
                  key={field}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                    symptoms[field]
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={symptoms[field]}
                    onChange={(e) => {
                      setSymptoms((current) => ({
                        ...current,
                        [field]: e.target.checked
                      }));

                      resetOutput();
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                  />

                  <span>
                    <span className="block text-sm font-medium text-slate-700">
                      {symptomLabel(field)}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                      {SYMPTOM_HELP[field]}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading || !hasSelectedSymptom}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}

                {loading
                  ? "Generating results..."
                  : "Generate prediction"}
              </button>

              {!hasSelectedSymptom && (
                <p className="self-center text-sm text-slate-500">
                  Select at least one symptom to enable prediction.
                </p>
              )}

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reset form
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}
        </form>

        {resp && (
          <section className="mt-10 border-t border-slate-200 pt-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Prediction report
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Results for {animalType}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  The model has ranked the supported conditions using the
                  information provided.
                </p>
              </div>

              <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                Prediction generated
              </span>
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Possible outcomes
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Healthy and disease outcomes are ranked together. Outcomes
                  with 0% probability are hidden.
                </p>
              </div>

              {rankedPredictions.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {visiblePredictions.map((prediction, index) => {
                      const isHealthy =
                        prediction.disease.toLowerCase().trim() === "healthy";
                      const isOpen =
                        openAdviceDisease === prediction.disease;

                      const percentage = displayProbabilityPercent(
                        prediction.disease
                      );

                      return (
                        <article
                          key={prediction.disease}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md md:p-6"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                                  isHealthy
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {index + 1}
                              </div>

                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  {isHealthy
                                    ? "Health outcome"
                                    : `Possible condition ${index + 1}`}
                                </p>

                                <h4 className="mt-1 text-lg font-bold capitalize text-slate-900">
                                  {formatDiseaseName(prediction.disease)}
                                </h4>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                              <div className="rounded-xl bg-slate-100 px-4 py-2">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                  Model-estimated probability
                                </p>

                                <p className="text-lg font-bold tabular-nums text-slate-800">
                                  {percentage.toFixed(1)}%
                                </p>
                              </div>

                              {!isHealthy && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenAdviceDisease(
                                      isOpen ? null : prediction.disease
                                    )
                                  }
                                  className="cursor-pointer rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
                                >
                                  {isOpen
                                    ? "Hide information"
                                    : "View information"}
                                </button>
                              )}
                            </div>
                          </div>

                          {isOpen &&
                            renderAdviceForDisease(prediction.disease)}
                        </article>
                      );
                    })}
                  </div>

                  {hasMorePredictions && (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setShowAllPredictions((previous) => !previous)
                        }
                        className="cursor-pointer rounded-xl border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        {showAllPredictions
                          ? "Show less"
                          : `Show more (${rankedPredictions.length - 3} more)`}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  No outcomes with non-zero model probability were returned.
                  Please review the input and consult a veterinary
                  professional if the animal shows signs of illness.
                </div>
              )}
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900">
                Important notice
              </p>

              <p className="mt-1 text-xs leading-relaxed text-amber-800">
                These percentages are outputs from the prediction model.
                They are not confirmed disease probabilities, diagnostic
                certainty, or model accuracy. The results are intended for
                decision support only and must not replace examination by a
                qualified veterinary professional.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
