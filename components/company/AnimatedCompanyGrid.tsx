"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Company {
  name: string;
  location: string;
  count: number;
}

interface Props {
  companies: Company[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AnimatedCompanyGrid({ companies }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-3 gap-8"
    >
      {companies.map((company) => (
        <motion.div key={company.name} variants={itemVariants}>
          <Link
            href={`/companies/${slugify(company.name)}`}
            className="group border rounded-xl p-6 bg-white hover:shadow-xl transition duration-300 hover:-translate-y-1 block"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {company.name}
            </h3>

            <p className="text-sm text-slate-500 mt-2">{company.location}</p>

            <p className="text-sm mt-4 text-slate-700 font-medium">
              {company.count} open position
              {company.count > 1 ? "s" : ""}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
