"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const metadata = {
  title: "About NextHire",
  description: "Learn more about NextHire remote job discovery platform.",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { number: "300+", label: "Remote Jobs" },
  { number: "100+", label: "Companies" },
  { number: "50+", label: "Countries" },
  { number: "100%", label: "Free to Use" },
];

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Jobs load instantly with server-side rendering — no waiting, no delays.",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Filter by title, location, job type and sort by latest or salary.",
  },
  {
    icon: "🔖",
    title: "Save Jobs",
    desc: "Bookmark any job and revisit it anytime from your saved list.",
  },
  {
    icon: "🌍",
    title: "Remote First",
    desc: "Curated remote opportunities from companies across the globe.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    desc: "Fully responsive — looks great on desktop, tablet, and mobile.",
  },
  {
    icon: "🏢",
    title: "Company Profiles",
    desc: "Explore companies and see all their open positions in one place.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-[#F5F0E8] py-32 px-6 text-center border-b border-[#E8DDD0]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-[#8B7355] mb-5 block">
            About NextHire
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-[#1C1410]">
            Connecting Talent With
            <span className="block text-[#14532D] mt-2">
              Opportunity Worldwide
            </span>
          </h1>

          <p className="mt-8 text-[#5C4A32] text-lg leading-relaxed max-w-2xl mx-auto">
            NextHire is a modern remote job discovery platform built to help
            professionals find their next opportunity — fast, smart, and
            beautifully simple.
          </p>

          <Link
            href="/"
            className="inline-block mt-10 bg-[#1C1410] text-[#F5F0E8] px-8 py-3.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:bg-[#14532D] transition-all duration-300"
          >
            Browse Jobs →
          </Link>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-white border-b border-gray-100 py-14 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <p className="text-5xl font-bold tracking-tight text-black">
                {stat.number}
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 px-6 bg-[#F5F0E8]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#8B7355] mb-4 block">
            Our Mission
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C1410] tracking-tight">
            Making Job Search Simple
          </h2>
          <p className="mt-6 text-[#5C4A32] text-lg leading-relaxed">
            We believe finding a great remote job shouldn't be complicated.
            NextHire cuts through the noise — giving you clean, curated listings
            with powerful filters so you can focus on what matters: finding the
            right opportunity for you.
          </p>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-gray-400 mb-4 block">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
              Everything You Need
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="border border-gray-100 rounded-2xl p-8 bg-white shadow-md hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                <span className="text-4xl">{f.icon}</span>
                <h3 className="text-xl font-semibold text-black mt-4">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="py-20 px-6 bg-[#F5F0E8] border-t border-[#E8DDD0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs uppercase tracking-widest text-[#8B7355] mb-4 block">
            Tech Stack
          </span>
          <h2 className="text-4xl font-bold text-[#1C1410] tracking-tight mb-10">
            Built With Modern Technologies
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js App Router",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "SSR",
              "Remotive API",
            ].map((tech) => (
              <span
                key={tech}
                className="border-2 border-[#5C4A32] text-[#1C1410] bg-transparent text-sm px-5 py-2.5 rounded-full font-medium hover:bg-[#5C4A32] hover:text-[#F5F0E8] transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Value Divider ── */}
      <section className="bg-white py-14 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-10">
            Why Job Seekers Choose NextHire
          </p>

          {/* Three value points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl">🎯</span>
              <h3 className="font-semibold text-[#1C1410] text-base">
                Curated Listings Only
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                No spam, no duplicates. Every job is sourced directly from
                verified remote-first companies.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <h3 className="font-semibold text-[#1C1410] text-base">
                No Sign-Up Required
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Browse, filter, save and apply to jobs instantly — no account,
                no friction, no barriers.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-2xl">🔄</span>
              <h3 className="font-semibold text-[#1C1410] text-base">
                Always Up to Date
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Job listings are refreshed regularly so you never miss a fresh
                opportunity from top companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 bg-[#F5F0E8] border-t border-[#E8DDD0] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-[#8B7355] mb-5 block">
            Get Started
          </span>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1C1410]">
            Ready to Find Your Next Role?
          </h2>

          <p className="mt-5 text-[#5C4A32] text-lg">
            Browse hundreds of remote jobs from top companies worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/"
              className="border-2 border-[#1C1410] text-[#1C1410] px-8 py-3.5 rounded-full font-semibold hover:bg-[#1C1410] hover:text-[#F5F0E8] transition-all duration-300"
            >
              Browse Jobs
            </Link>
            <Link
              href="/companies"
              className="border-2 border-[#1C1410] text-[#1C1410] px-8 py-3.5 rounded-full font-semibold hover:bg-[#1C1410] hover:text-[#F5F0E8] transition-all duration-300"
            >
              Explore Companies
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
