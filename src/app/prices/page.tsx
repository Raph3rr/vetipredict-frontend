"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DiseaseImageFigure from "@/app/component/DiseaseImageFigure";
import {
  ANIMAL_TYPES,
  DISEASE_ADVICE,
  DISEASE_ANIMALS,
  formatDiseaseName,
  type DiseaseAdvice
} from "@/data/diseaseLibrary";

type LibraryEntry = {
  key: string;
  name: string;
  advice: DiseaseAdvice;
  animals: string[];
};

const DISEASES: LibraryEntry[] = Object.entries(DISEASE_ADVICE)
  .map(([key, advice]) => ({
    key,
    name: formatDiseaseName(key),
    advice,
    animals: DISEASE_ANIMALS[key] ?? []
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function DiseaseLibraryPage() {
  const [search, setSearch] = useState("");
  const [animalFilter, setAnimalFilter] = useState("all");
  const [openDisease, setOpenDisease] = useState<string | null>(null);

  const filteredDiseases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return DISEASES.filter((disease) => {
      const matchesAnimal =
        animalFilter === "all" || disease.animals.includes(animalFilter);
      const searchableText = [
        disease.name,
        disease.advice.short,
        disease.advice.transmission,
        disease.advice.treatment,
        disease.advice.prevention,
        ...disease.advice.signs,
        ...disease.advice.tips,
        ...disease.animals
      ]
        .join(" ")
        .toLowerCase();

      return matchesAnimal && (!query || searchableText.includes(query));
    });
  }, [animalFilter, search]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Livestock reference
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Disease Library
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Browse disease information by animal or search for a condition.
                You can use this library without making a prediction.
              </p>
            </div>

            <Link
              href="/recommendation"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Open symptom predictor
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_260px]">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Search diseases or signs
              </span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="For example, coccidiosis or bloody stool"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Filter by animal
              </span>
              <select
                value={animalFilter}
                onChange={(event) => setAnimalFilter(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="all">All supported animals</option>
                {ANIMAL_TYPES.map((animal) => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500" aria-live="polite">
              Showing {filteredDiseases.length} of {DISEASES.length} diseases
            </p>
            {(search || animalFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setAnimalFilter("all");
                }}
                className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Clear search and filter
              </button>
            )}
          </div>
        </header>

        {filteredDiseases.length ? (
          <section
            aria-label="Livestock diseases"
            className="mt-6 grid gap-5 lg:grid-cols-2"
          >
            {filteredDiseases.map((disease) => {
              const isOpen = openDisease === disease.key;
              const detailsId = `disease-library-${disease.key.replaceAll(" ", "-")}`;
              const availableImages = Object.entries(
                disease.advice.imagesByAnimal ?? {}
              ).flatMap(([animal, value]) => {
                if (animalFilter !== "all" && animal !== animalFilter) {
                  return [];
                }
                const images = Array.isArray(value) ? value : [value];
                return images.map((image, index) => ({
                  animal,
                  image,
                  key: `${animal}-${index}-${image.src}`
                }));
              });

              return (
                <article
                  key={disease.key}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-xl font-bold text-slate-900">
                        {disease.name}
                      </h2>
                      <span className="w-fit shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                        {disease.animals.length} animal types
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {disease.advice.short}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        In the current project scope
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {disease.animals.map((animal) => (
                          <span
                            key={animal}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {animal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailsId}
                      onClick={() =>
                        setOpenDisease(isOpen ? null : disease.key)
                      }
                      className="mt-5 inline-flex items-center rounded-lg border border-emerald-200 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                    >
                      {isOpen ? "Close details" : "Read full details"}
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      id={detailsId}
                      className="space-y-5 border-t border-slate-200 bg-slate-50 p-5 sm:p-6"
                    >
                      <section>
                        <h3 className="font-semibold text-slate-900">
                          Recognisable signs and symptoms
                        </h3>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                          {disease.advice.signs.map((sign) => (
                            <li key={sign}>{sign}</li>
                          ))}
                        </ul>
                      </section>

                      {availableImages.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {availableImages.map(({ animal, image, key }) => (
                            <DiseaseImageFigure
                              key={key}
                              image={image}
                              animal={animal}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-500">
                          No animal-matched reference image is available yet
                          {animalFilter !== "all" ? ` for ${animalFilter}` : ""}.
                        </p>
                      )}

                      <section>
                        <h3 className="font-semibold text-slate-900">
                          How it spreads
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {disease.advice.transmission}
                        </p>
                      </section>

                      <div className="grid gap-5 md:grid-cols-2">
                        <section>
                          <h3 className="font-semibold text-slate-900">
                            Treatment and management
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {disease.advice.treatment}
                          </p>
                        </section>
                        <section>
                          <h3 className="font-semibold text-slate-900">
                            Prevention and biosecurity
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {disease.advice.prevention}
                          </p>
                        </section>
                      </div>

                      <section>
                        <h3 className="font-semibold text-slate-900">
                          Practical guidance
                        </h3>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                          {disease.advice.tips.map((tip) => (
                            <li key={tip}>{tip}</li>
                          ))}
                        </ul>
                      </section>

                      <aside className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                        This information is for learning and reference. Signs
                        can overlap between diseases, and this page cannot
                        confirm a condition. Contact a qualified veterinary
                        professional for assessment and testing. Follow
                        veterinary or animal-health authority instructions for
                        suspected serious or reportable diseases.
                      </aside>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              No matching diseases found
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Try another search or select a different animal type.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
