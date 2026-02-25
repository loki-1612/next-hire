"use client";

import Link from "next/link";
import { Job } from "@/types/job";
import { motion } from "framer-motion";
import { useSavedJobs } from "@/context/savedJobContext";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { toggleSave, isSaved } = useSavedJobs(); // ✅ inside component
  const saved = isSaved(job.id); // ✅ use actual job instance

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Top Section */}
        <div className="flex justify-between items-start gap-4">
          <Link href={`/jobs/${job.id}`} className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 min-h-[56px]">
              {job.title}
            </h3>
          </Link>

          {/* Save Button */}
          <button
            onClick={() => toggleSave(job)}
            className={`px-3 py-1 text-sm rounded-lg border transition ${
              saved
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            ⭐ {saved ? "Saved" : "Save"}
          </button>
        </div>

        {/* Company Info */}
        <p className="text-slate-500 text-sm mt-2">{job.company_name}</p>
        <p className="text-slate-500 text-sm">
          {job.candidate_required_location}
        </p>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {job.salary ? (
            <span className="text-green-600 font-medium">{job.salary}</span>
          ) : (
            <span className="text-slate-400 text-sm">Salary not disclosed</span>
          )}

          <Link
            href={`/jobs/${job.id}`}
            className="text-sm font-medium text-black hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
