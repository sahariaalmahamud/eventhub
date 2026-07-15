"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, signOutUser, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            E
          </span>
          EventHub
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${pathname === link.href ? "text-blue-600" : "text-slate-600 hover:text-slate-900"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              {user?.email?.toLowerCase() === "admin@eventhub.app" ? (
                <Link href="/dashboard" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
                  Dashboard
                </Link>
              ) : null}
              <button
                onClick={() => void signOutUser()}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-600 hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                Register
              </Link>
            </>
          )}
        </div>

        <button className="rounded-full border border-slate-200 p-2 md:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {user?.email?.toLowerCase() === "admin@eventhub.app" ? (
                  <Link href="/dashboard" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                ) : null}
                <button onClick={() => void signOutUser()} className="text-left text-sm font-medium text-slate-700">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
