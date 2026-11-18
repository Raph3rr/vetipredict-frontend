
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");
      const email = localStorage.getItem("user_email");
      setIsLoggedIn(!!token);
      setUserEmail(email);
    } catch {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    setIsLoggedIn(false);
    setUserEmail(null);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none"
        >
          <div className="min-w-0">
            <div className="whitespace-nowrap text-lg font-semibold">
              VetiPredict
            </div>
            <div className="text-xs leading-tight text-slate-500">
              Livestock Disease Prediction • Feed Advisor
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/recommendation">Disease Predictor</NavLink>
          <NavLink href="/nutrition">Feed Advisor</NavLink>
          <NavLink href="/prices">Disease Library</NavLink>
          <NavLink href="/datasets">Datasets</NavLink>
          <NavLink href="/about">About</NavLink>

          <Link
            href="/recommendation"
            className="ml-2 inline-flex shrink-0 items-center whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white shadow transition hover:bg-emerald-700"
          >
            Predict Disease
          </Link>
        </nav>

        {/* Mobile and Tablet Menu Button */}
        <div className="shrink-0 lg:hidden">
          <button
            type="button"
            aria-label={open ? "Close Menu" : "Open Menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md bg-white p-2 shadow-sm transition hover:bg-slate-100"
          >
            {open ? (
              <svg
                className="h-5 w-5 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile and Tablet Navigation */}
        {open && (
          <div
            id="mobile-navigation"
            className="absolute left-4 right-4 top-full z-50 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg sm:left-6 sm:right-6 lg:hidden"
          >
            <MobileNavItem href="/">Home</MobileNavItem>
            <MobileNavItem href="/recommendation">
              Disease Predictor
            </MobileNavItem>
            <MobileNavItem href="/nutrition">Feed Advisor</MobileNavItem>
            <MobileNavItem href="/prices">Disease Library</MobileNavItem>
            <MobileNavItem href="/datasets">Datasets</MobileNavItem>
            <MobileNavItem href="/train-model">Train Model</MobileNavItem>
            <MobileNavItem href="/about">About</MobileNavItem>
          </div>
        )}
      </div>
    </header>
  );
}

/* Reusable Components */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:text-slate-900 ${
        active ? "bg-slate-100" : ""
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block border-b border-slate-100 px-4 py-3 text-slate-700 transition last:border-b-0 hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}

function ProfileMenu({
  email,
  onLogout,
}: {
  email: string | null;
  onLogout: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-slate-700">{email ?? "User"}</div>
      <button
        onClick={onLogout}
        className="rounded bg-red-50 px-3 py-2 text-sm text-red-700 transition hover:bg-red-100"
      >
        Logout
      </button>
    </div>
  );
}
