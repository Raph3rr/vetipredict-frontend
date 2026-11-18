
"use client";

import React, { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<string[]>([
    "livestock_diseases.csv",
    "food_nutrients.csv",
  ]);

  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/datasets/list`);

        if (res.ok) {
          const j = await res.json();

          if (Array.isArray(j.files)) {
            setDatasets(j.files.filter(
              (name: unknown): name is string =>
                typeof name === "string" && name.trim().length > 0
            ));
          }
        }
      } catch {
        // Keep the default dataset names if the API is unavailable.
      }
    })();
  }, []);

  async function handlePreview(name: string) {
    setPreviewRows([]);
    setPreviewName(name);
    setLoadingPreview(true);
    setMessage(null);

    try {
      const r = await fetch(
        `${API_BASE}/datasets/download?name=${encodeURIComponent(name)}`
      );

      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }

      const text = await r.text();

      const lines = text.trim().split(/\r?\n/).filter(Boolean);

      const rows = lines.slice(0, 15).map((ln) =>
        ln
          .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
          .map((c) =>
            c
              .replace(/^\s+|\s+$/g, "")
              .replace(/^"|"$/g, "")
          )
      );

      setPreviewRows(rows);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message || String(err) : String(err);
      setMessage(`Could not load preview. Error: ${message}`);
    } finally {
      setLoadingPreview(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API_BASE}/datasets/upload`, {
        method: "POST",
        body: form,
      });

      const j = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage(j.message || "Upload successful.");

        if (j.name) {
          setDatasets((current) =>
            Array.from(new Set([j.name, ...current]))
          );
        } else {
          // Refresh the available datasets after a successful upload.
          const listRes = await fetch(`${API_BASE}/datasets/list`);

          if (listRes.ok) {
            const listData = await listRes.json();

            if (Array.isArray(listData.files)) {
              setDatasets(
                listData.files.filter(
                  (name: unknown): name is string =>
                    typeof name === "string" && name.trim().length > 0
                )
              );
            }
          }
        }
      } else {
        setMessage(
          j.error || j.message || `Upload failed: HTTP ${res.status}`
        );
      }
    } catch (err: unknown) {
      setMessage(
        err instanceof Error && err.message
          ? err.message
          : "Upload error. Check your connection."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="min-h-screen px-3 py-6 sm:px-4 sm:py-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-4 shadow-md sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Datasets
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Manage the CSV datasets used by VetiPredict. Preview existing
            datasets, download files, or upload a new CSV file.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Available datasets */}
          <div className="min-w-0 rounded-lg border bg-slate-50 p-4 lg:col-span-1">
            <h2 className="mb-3 font-semibold text-slate-800">
              Available datasets
            </h2>

            {datasets.length > 0 ? (
              <ul className="space-y-3">
                {datasets.map((d) => (
                  <li
                    key={d}
                    className="rounded-lg border bg-white p-3"
                  >
                    <div className="break-all text-sm font-medium text-slate-700">
                      {d}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handlePreview(d)}
                        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Preview
                      </button>

                      <a
                        href={`${API_BASE}/datasets/download?name=${encodeURIComponent(d)}`}
                        className="rounded-md bg-emerald-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-emerald-700"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No datasets are currently available.
              </p>
            )}

            {/* Upload section */}
            <div className="mt-6 border-t pt-5">
              <h3 className="mb-2 text-sm font-semibold text-slate-800">
                Upload new dataset
              </h3>

              <p className="mb-3 text-xs leading-relaxed text-slate-500">
                Select a CSV file to upload to VetiPredict.
              </p>

              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleUpload}
                disabled={uploading}
                className="block w-full max-w-full text-xs text-slate-600 file:mr-2 file:rounded-md file:border-0 file:bg-emerald-600 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-emerald-700 disabled:opacity-50"
              />

              {uploading && (
                <p className="mt-3 text-sm text-slate-500">
                  Uploading dataset…
                </p>
              )}
            </div>

            {message && (
              <div
                role="status"
                className="mt-4 break-words rounded-md border bg-white p-3 text-xs leading-relaxed text-slate-600"
              >
                {message}
              </div>
            )}
          </div>

          {/* Dataset preview */}
          <div className="min-w-0 rounded-lg border bg-white p-4 lg:col-span-2 sm:p-5">
            <h2 className="mb-3 break-words font-semibold text-slate-800">
              Preview: {previewName ?? "(pick a dataset)"}
            </h2>

            {loadingPreview && (
              <p className="text-sm text-slate-500">
                Loading preview…
              </p>
            )}

            {!loadingPreview && previewRows.length > 0 && (
              <>
                <p className="mb-2 text-xs text-slate-400">
                  Showing the first few rows. Scroll horizontally to view
                  all columns.
                </p>

                <div className="max-h-[400px] max-w-full overflow-auto rounded-lg border">
                  <table className="w-full min-w-max border-collapse text-xs">
                    <thead>
                      <tr className="border-b bg-slate-50 font-semibold text-slate-600">
                        {previewRows[0].map((c, i) => (
                          <th
                            key={i}
                            className="whitespace-nowrap border p-2 text-left"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {previewRows.slice(1).map((r, ri) => (
                        <tr
                          key={ri}
                          className={
                            ri % 2 === 0 ? "bg-slate-50/50" : "bg-white"
                          }
                        >
                          {r.map((c, ci) => (
                            <td
                              key={ci}
                              className="whitespace-nowrap border p-2 align-top text-[11px]"
                            >
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {!loadingPreview && previewRows.length === 0 && (
              <div className="mt-8 rounded-lg bg-slate-50 px-4 py-10 text-center text-sm leading-relaxed text-slate-400">
                No preview loaded. Select Preview on a dataset to display
                its first few lines.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
