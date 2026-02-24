"use client";

import { useEffect, useState } from "react";

interface Props {
  jobId: number;
}

export default function BookmarkButton({ jobId }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSaved(savedJobs.includes(jobId));
  }, [jobId]);

  const toggleBookmark = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

    let updated;

    if (savedJobs.includes(jobId)) {
      updated = savedJobs.filter((id: number) => id !== jobId);
    } else {
      updated = [...savedJobs, jobId];
    }

    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSaved(!saved);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="text-sm border px-3 py-1 rounded-md"
    >
      {saved ? "★ Saved" : "☆ Save"}
    </button>
  );
}
