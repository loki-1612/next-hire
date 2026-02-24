"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* -----------------------------
   Animation Variants
----------------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl font-bold tracking-tight">
          About <span className="text-black">NextHire</span>
        </h1>

        <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto">
          A modern job discovery platform built to simplify how professionals
          find opportunities — fast, intelligent, and beautifully designed.
        </p>
      </motion.div>

      {/* Mission + Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-12"
      >
        {/* Mission Card */}
        <motion.div
          variants={fadeUp}
          className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">🚀 Our Mission</h2>
          <p className="text-slate-600 leading-relaxed">
            NextHire streamlines job discovery through powerful filtering,
            intelligent sorting, and real-time updates — delivering a seamless
            experience for modern professionals.
          </p>
        </motion.div>

        {/* Differentiation Card */}
        <motion.div
          variants={fadeUp}
          className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">
            💡 What Makes Us Different
          </h2>

          <ul className="space-y-3 text-slate-600">
            <li>• Server-side rendering for blazing-fast performance</li>
            <li>• Advanced filtering & intelligent sorting</li>
            <li>• Bookmark & save jobs instantly</li>
            <li>• SEO-optimized dynamic metadata</li>
            <li>• Scalable production-ready architecture</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">
          🛠 Built With Modern Technologies
        </h2>

        <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          NextHire is powered by Next.js App Router, TypeScript, Tailwind CSS,
          Framer Motion, and modern SSR architecture — ensuring performance,
          scalability, and clean code structure.
        </p>
      </motion.div>

      {/* Call To Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-24 bg-gradient-to-r from-black to-slate-800 text-white rounded-3xl p-12 text-center shadow-xl"
      >
        <h3 className="text-2xl font-semibold">
          Ready to find your next opportunity?
        </h3>

        <p className="mt-4 text-slate-300">
          Explore curated job listings and discover your perfect match today.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-white text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
        >
          Explore Jobs
        </Link>
      </motion.div>
    </section>
  );
}
