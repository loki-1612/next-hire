"use client";

import { motion } from "framer-motion";
import JobCard from "@/components/job/JobCard";
import { Job } from "@/types/job";

interface Props {
  jobs: Job[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AnimatedJobGrid({ jobs }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
    >
      {jobs.map((job) => (
        <motion.div key={job.id} variants={item}>
          <JobCard key={job.id} job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
}
