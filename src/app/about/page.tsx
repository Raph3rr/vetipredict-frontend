
"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full min-w-0 px-3 py-6 sm:px-5 sm:py-8 lg:px-6 lg:py-10">
      <div className="mx-auto w-full max-w-7xl min-w-0 overflow-hidden rounded-2xl bg-white p-4 shadow-md sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold font-sans text-slate-900 sm:text-3xl">
              About VetiPredict
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
              Learn about the project goals, data sources, and how to get
              started.
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:shrink-0">
            <Link
              href="/datasets"
              className="inline-flex w-full items-center justify-center rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:w-auto"
            >
              Datasets
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          {/* Main About Content */}
          <section className="min-w-0 rounded-lg border bg-white p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              What is VetiPredict?
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              VetiPredict is an intelligent livestock health management and
              disease prediction assistant built by Victor Mark. It helps
              veterinarians, agricultural extension workers, and livestock
              owners review possible livestock diseases based on selected
              animal categories and observed clinical symptoms. It also
              incorporates a feed formulation module to help users assess
              nutritional values and prepare balanced feed mixtures.
            </p>

            {/* Project Scope */}
            <div className="mt-6 min-w-0 rounded-xl border border-green-200 bg-green-50/50 p-4 sm:p-5 lg:p-6">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Project Scope
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                VetiPredict provides livestock health support through
                machine-learning-based disease prediction and a feed
                formulation module. The disease prediction component covers
                ten livestock categories: cattle, goats, sheep, pigs, chickens,
                guinea fowl, ducks, turkeys, rabbits, and grasscutters. It
                uses individual animal-specific machine-learning models to
                assess possible health conditions based on the selected
                animal category and its observed symptoms. The feed
                formulation component supports the preparation and assessment
                of nutritionally balanced feed mixtures.
              </p>

              <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
                {/* Disease Prediction */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800">
                    Livestock Disease Prediction
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The disease prediction component allows users to select
                    from the ten supported livestock categories and choose
                    observed symptoms. The current prediction dataset uses
                    fifteen binary symptom features.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    VetiPredict uses ten individually trained Random Forest
                    classification models, with a dedicated model for each
                    supported livestock category. When a user selects an
                    animal category, the system uses the corresponding
                    animal-specific model and its associated label encoder
                    to process the input and generate prediction outcomes.
                    This allows each model to learn disease patterns relevant
                    to its assigned livestock category.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The system presents ranked prediction outcomes with their
                    corresponding percentages. Results can include possible
                    diseases as well as a Healthy outcome, depending on the
                    selected animal category and the model&apos;s assessment.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The prediction dataset covers twenty livestock diseases.
                    The diseases available for prediction depend on the
                    supported disease classes associated with the selected
                    animal category. Not every disease applies to every
                    livestock category.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    The current dataset contains 3,000 records distributed
                    across the ten livestock categories. It is a
                    literature-informed, synthetically generated dataset
                    designed using veterinary disease and symptom information
                    from established references. It is not a collection of
                    3,000 confirmed clinical cases from farms or veterinary
                    laboratories.
                  </p>

                  <Link
                    href="/supported-diseases"
                    className="mt-4 inline-flex max-w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-50"
                  >
                    <span>View supported diseases</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Feed Formulation */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800">
                    Feed Formulation
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    The feed formulation component helps users work with
                    available livestock feed ingredients and their nutritional
                    information. It provides calculations relating to
                    nutritional values such as protein, energy, and minerals
                    to support the preparation of balanced feed mixtures.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    By using the available ingredient and nutrient information,
                    users can assess the nutritional composition of proposed
                    feed mixtures and make more informed decisions when
                    formulating livestock diets.
                  </p>
                </div>
              </div>

              {/* Scope Limitations */}
              <div className="mt-6 border-t border-green-200 pt-5">
                <h3 className="font-semibold text-slate-800">
                  Scope Limitations
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The disease prediction component is limited to the ten
                  supported livestock categories, the twenty disease classes,
                  and the fifteen symptom features represented in its current
                  dataset. Its predictions depend on the information supplied
                  by the user and the patterns learned during training by the
                  corresponding animal-specific model. Diseases outside the
                  supported classes may not be identified by the system.
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  The current dataset is synthetically generated using
                  literature-informed disease and symptom patterns. Although
                  established veterinary references inform its design, the
                  dataset does not replace validation using real-world,
                  professionally confirmed livestock cases. Model performance
                  should therefore be interpreted within the limits of its
                  training data and evaluation.
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  VetiPredict is intended to serve as a preliminary
                  decision-support tool. Its predictions should not be treated
                  as confirmed veterinary diagnoses or as a replacement for
                  professional veterinary examination, laboratory testing,
                  treatment decisions, or advice.
                </p>
              </div>
            </div>

            {/* Objectives and Technology */}
            <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800">
                  Objectives
                </h3>

                <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-600">
                  <li>
                    Support the preliminary assessment of livestock health
                    conditions using supported animal categories and observed
                    symptoms.
                  </li>

                  <li>
                    Provide information about supported livestock diseases
                    and possible prediction outcomes.
                  </li>

                  <li>
                    Formulate nutritionally balanced diets using available
                    feed ingredients.
                  </li>

                  <li>
                    Support livestock owners, veterinarians, and agricultural
                    extension workers in making more informed decisions.
                  </li>
                </ul>
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800">
                  Tech & Data
                </h3>

                <ul className="mt-3 ml-5 list-disc space-y-2 text-sm leading-7 text-slate-600">
                  <li>Frontend: Next.js + Tailwind CSS</li>

                  <li>Backend: Flask (Python)</li>

                  <li>
                    ML Algorithm: Random Forest classification (200 trees)
                  </li>

                  <li>
                    Model Architecture: Ten individual animal-specific
                    Random Forest models, each with its corresponding label
                    encoder
                  </li>

                  <li>
                    Prediction Inputs: Ten livestock categories and fifteen
                    binary clinical symptom features
                  </li>

                  <li>
                    Prediction Targets: Twenty livestock diseases and a
                    Healthy outcome
                  </li>

                  <li>
                    Disease Dataset:{" "}
                    <code className="break-all">
                      vetipredict_livestock_diseases_verified-v2.csv
                    </code>
                  </li>

                  <li>
                    Feed Data:{" "}
                    <code className="break-all">food_nutrients.csv</code>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 break-words border-t border-slate-100 pt-5 text-sm leading-7 text-slate-500">
              <p>
                <strong className="text-slate-700">Contact:</strong>{" "}
                Victor Mark —{" "}
                <a
                  href="mailto:victormark@gmail.com"
                  className="break-all text-green-700 underline-offset-2 hover:underline"
                >
                  hello@victormark@gmail.com
                </a>
              </p>

              <p className="mt-2">License: MIT</p>
            </div>
          </section>

          {/* How to Use */}
          <section className="min-w-0 rounded-lg border bg-slate-50 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-800">
              How to use
            </h3>

            <ol className="mt-3 ml-5 list-decimal space-y-2 text-sm leading-7 text-slate-600">
              <li>
                Review the available datasets or upload a custom CSV on the
                Datasets page.
              </li>

              <li>
                Go to the Disease Predictor page, select one of the ten
                supported livestock categories, and choose its observed
                symptoms.
              </li>

              <li>
                Review the ranked prediction outcomes and use the available
                disease information to learn more about a predicted condition.
              </li>

              <li>
                Use the Feed Advisory to calculate protein, energy, and
                mineral balances for feed mixtures.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
