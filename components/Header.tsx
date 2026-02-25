"use client";

import Link from "next/link";
import { useSavedJobs } from "@/context/savedJobContext";

export default function Header() {
  const { savedJobs } = useSavedJobs();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">NextHire</h1>

        <nav className="space-x-8 text-sm font-medium text-slate-600 flex gap-8">
          <Link href="/" className="hover:text-slate-900 transition">
            Jobs
          </Link>
          <Link href="/companies" className="hover:text-slate-900 transition">
            Companies
          </Link>
          <Link href="/saved" className="hover:text-slate-900 transition">
            Saved Jobs ({savedJobs.length})
          </Link>
          <Link href="/about" className="hover:text-slate-900 transition">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
