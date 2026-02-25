import type { Metadata } from "next";
import "./globals.css";
import { SavedJobsProvider } from "@/context/savedJobContext";
import Header from "@/components/Header";


export const metadata: Metadata = {
  title: "NextHire - Smart Job Discovery Platform",
  description: "Discover live job opportunities from top companies worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5EFE6] text-slate-900 min-h-screen flex flex-col">
        <SavedJobsProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <footer className="bg-[#1a1a1a] mt-auto py-6">
            <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              {/* Left - Brand */}
              <div className="text-center sm:text-left">
                <p className="text-base font-bold text-white">NextHire</p>
                <p className="text-xs text-gray-300 mt-1">
                  Smart Job Discovery Platform
                </p>
              </div>

              {/* Right - Credit + Copyright */}
              <div className="text-center sm:text-right">
                <p className="text-xs text-gray-300">
                  Job data powered by{" "}
                  <a
                    href="https://remotive.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium underline hover:opacity-60 transition"
                  >
                    Remotive
                  </a>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  © 2026 NextHire. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </SavedJobsProvider>
      </body>
    </html>
  );
}
