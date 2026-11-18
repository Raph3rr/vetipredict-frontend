"use client";

import { useState } from "react";
import type { DiseaseImage } from "@/data/diseaseLibrary";

type DiseaseImageFigureProps = {
  image: DiseaseImage;
  animal: string;
};

export default function DiseaseImageFigure({
  image,
  animal
}: DiseaseImageFigureProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {imageFailed ? (
        <div
          role="status"
          className="flex min-h-40 items-center justify-center bg-slate-100 px-5 py-8 text-center text-sm text-slate-600"
        >
          This reference image is currently unavailable.
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-80 w-full bg-slate-100 object-contain"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}
      <figcaption className="px-3 py-2 text-xs text-slate-500">
        {animal} reference image
        {image.caption ? `: ${image.caption}` : ""}. An image alone cannot
        confirm a disease.
      </figcaption>
    </figure>
  );
}
