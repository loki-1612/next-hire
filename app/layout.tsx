import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextHire - Smart Job Discovery Platform",
  description: "Discover live job opportunities from top companies worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight">NextHire</h1>

            <nav className="space-x-8 text-sm font-medium text-slate-600 flex gap-8">
              <Link href="/" className="hover:text-slate-900 transition">
                Jobs
              </Link>
              <Link
                href="/companies"
                className="hover:text-slate-900 transition"
              >
                Companies
              </Link>
              <Link href="/about" className="hover:text-slate-900 transition">
                About
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} NextHire. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
