
const livestockDiseases = [
  {
    animal: "Cattle",
    diseases: [
      "Anthrax",
      "Blackleg",
      "Brucellosis",
      "Coccidiosis",
      "Contagious Bovine Pleuropneumonia (CBPP)",
      "Foot and Mouth Disease",
      "Lumpy Skin Disease",
      "Mastitis",
      "Pasteurellosis",
      "Sarcoptic Mange",
    ],
  },
  {
    animal: "Chicken",
    diseases: [
      "Avian Influenza", "Coccidiosis", "Fowl Pox", "Histomoniasis (Blackhead)",
      "Infectious Coryza", "Newcastle Disease",
    ],
  },
  {
    animal: "Duck",
    diseases: ["Avian Influenza", "Coccidiosis", "Duck Viral Enteritis", "Newcastle Disease"],
  },
  {
    animal: "Goat",
    diseases: [
      "Anthrax", "Blackleg", "Brucellosis", "Coccidiosis", "Contagious Ecthyma (Orf)",
      "Foot and Mouth Disease", "Mastitis", "Pasteurellosis",
      "Peste des Petits Ruminants (PPR)", "Sarcoptic Mange",
    ],
  },
  {
    animal: "Grasscutter",
    diseases: ["Coccidiosis", "Pasteurellosis", "Sarcoptic Mange"],
  },
  {
    animal: "Guinea fowl",
    diseases: [
      "Avian Influenza", "Coccidiosis", "Fowl Pox", "Histomoniasis (Blackhead)",
      "Infectious Coryza", "Newcastle Disease",
    ],
  },
  {
    animal: "Pig",
    diseases: [
      "African Swine Fever", "Anthrax", "Brucellosis", "Coccidiosis",
      "Foot and Mouth Disease", "Mastitis", "Pasteurellosis", "Sarcoptic Mange",
      "Swine Erysipelas",
    ],
  },
  {
    animal: "Rabbit",
    diseases: ["Coccidiosis", "Pasteurellosis", "Sarcoptic Mange"],
  },
  {
    animal: "Sheep",
    diseases: [
      "Anthrax", "Blackleg", "Brucellosis", "Coccidiosis", "Contagious Ecthyma (Orf)",
      "Foot and Mouth Disease", "Mastitis", "Pasteurellosis",
      "Peste des Petits Ruminants (PPR)", "Sarcoptic Mange",
    ],
  },
  {
    animal: "Turkey",
    diseases: [
      "Avian Influenza", "Coccidiosis", "Fowl Pox", "Histomoniasis (Blackhead)",
      "Newcastle Disease",
    ],
  },
];

export default function SupportedDiseasesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <a
            href="/recommendation"
            className="mb-5 inline-flex items-center gap-2 rounded-lg border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-50"
          >
            <span aria-hidden="true">←</span>
            Back to Prediction
          </a>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Supported Diseases
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            View the diseases currently supported by the livestock disease
            prediction system, grouped by animal type.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {livestockDiseases.map((group) => (
            <section
              key={group.animal}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2 className="border-b border-green-100 pb-3 text-lg font-semibold text-green-700">
                {group.animal}
              </h2>

              <ul className="mt-4 space-y-3">
                {group.diseases.map((disease) => (
                  <li
                    key={disease}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-600" />
                    <span>{disease}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
