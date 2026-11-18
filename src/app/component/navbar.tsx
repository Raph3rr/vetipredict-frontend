// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

export default function Navbar({
  links = [
    { href: "/", label: "Home" },
    { href: "/predictions", label: "Predictions" },
    { href: "/upload", label: "Upload Data" },
    { href: "/reports", label: "Reports" },
    { href: "/settings", label: "Settings" },
  ],
  logoText = "KSOFT Technova",
  onUpload,
  user = { name: "Demo User", email: "demo@ksoft.ng", avatarUrl: "/avatar-placeholder.png" },
}: {
  links?: NavLink[];
  logoText?: string;
  onUpload?: (file: File) => void;
  user?: { name?: string; email?: string; avatarUrl?: string };
}) {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && onUpload) onUpload(file);
    // reset input so same file can be selected again if needed
    e.currentTarget.value = "";
  }

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* left: brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold shadow-md">
                KS
              </div>
              <div className="ml-3">
                <div className="text-lg font-semibold text-slate-900 leading-tight">{logoText}</div>
                <div className="text-xs text-slate-500">Market Price Forecasting</div>
              </div>
            </Link>

            {/* primary nav (hidden on mobile) */}
            <div className="hidden md:flex md:ml-6 md:space-x-2">
              {links.map((l) => (
                <Link
                  key={`nav-${l.href}`}
                  href={l.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:shadow-sm transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            {/* upload button (csv/xlsx allowed) */}
            <label className="relative inline-flex items-center">
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Upload dataset"
              />
              <span
                role="button"
                className="inline-flex items-center px-3 py-2 border border-slate-200 rounded-2xl text-sm font-medium bg-white hover:bg-slate-50 cursor-pointer shadow-sm"
                title="Upload CSV / Excel"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21H3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Upload Data
              </span>
            </label>

            {/* New Forecast quick action */}
            <Link
              href="/predictions"
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-2xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm transition"
              aria-label="New Forecast"
            >
              New Forecast
            </Link>

            {/* user avatar */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
                title="Open user menu"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover border border-slate-100 shadow-sm"
                />
              </button>

              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="text-sm font-medium text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    </div>

                    <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</Link>
                    <Link href="/account" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Account</Link>
                    <button
                      onClick={() => { /* TODO: implement logout */ }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:bg-slate-50"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="Open main menu"
              >
                {!open ? (
                  <svg className="block h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-100">
          <div className="pt-2 pb-3 space-y-1 px-2">
            {links.map((l) => (
              <Link
                key={`mobile-${l.href}`}
                href={l.href}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link href="/predictions" className="w-full block text-center px-3 py-2 rounded-2xl bg-indigo-600 text-white">New Forecast</Link>
            </div>
          </div>

          <div className="pt-4 pb-3 border-t border-slate-100 px-3">
            <div className="flex items-center">
              <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800">{user.name}</div>
                <div className="text-sm font-medium text-slate-500">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link href="/profile" className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50">Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50">Logout</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
