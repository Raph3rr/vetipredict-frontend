import type { Metadata } from "next";
import "./globals.css";
import Header from "./component/header";

export const metadata: Metadata = {
  title: "VetiPredict — Livestock Disease Prediction & Feed Advisor",
  description:
    "Predict livestock diseases from symptoms and formulate optimized feed diets for healthy livestock. Built with Flask + Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-cover bg-center bg-no-repeat text-slate-900 antialiased"
        style={{ backgroundImage: "url('/footer-bg.png')" }}
      >
        <Header />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <main className="mt-4 sm:mt-6">{children}</main>

          <footer className="mt-12 border-t border-slate-200 py-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center text-sm text-slate-600 md:text-left">
                © {new Date().getFullYear()} VetiPredict Livestock Disease
                Prediction and Health Advisory.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
