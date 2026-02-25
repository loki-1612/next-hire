"use client";

import { useSavedJobs } from "@/context/savedJobContext";
import AnimatedJobGrid from "@/components/job/AnimatedJobGrid";

export default function SavedPage() {
  const { savedJobs } = useSavedJobs();

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10">Saved Jobs</h1>

      {savedJobs.length > 0 ? (
        <AnimatedJobGrid jobs={savedJobs} />
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
}