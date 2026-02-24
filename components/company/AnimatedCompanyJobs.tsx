"use client";

import { motion } from "framer-motion";
import JobCard from "@/components/job/JobCard";
import { Job } from "@/types/job";

interface Props {
  jobs: Job[];
  companyName: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

export default function AnimatedCompanyJobs({ jobs, companyName }: Props) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Jobs at {companyName}
      </motion.h1>

      {jobs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-slate-500 text-lg">
            No jobs found for this company.
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {jobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
