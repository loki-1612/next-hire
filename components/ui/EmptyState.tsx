"use client";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-full text-center py-20"
    >
      <h3 className="text-xl font-semibold text-slate-700">No jobs found</h3>
      <p className="text-slate-500 mt-3">Try adjusting your filters.</p>
    </motion.div>
  );
}
