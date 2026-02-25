"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Job } from "@/types/job";


interface SavedJobsContextType {
  savedJobs: Job[];
  toggleSave: (job: Job) => void;
  isSaved: (id: number) => boolean;
}

const SavedJobsContext = createContext<SavedJobsContextType | null>(null);

export function SavedJobsProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedJobs");
    if (stored) {
      setSavedJobs(JSON.parse(stored));
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const toggleSave = (job: Job) => {
    setSavedJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      if (exists) {
        return prev.filter((j) => j.id !== job.id);
      }
      return [...prev, job];
    });
  };

  const isSaved = (id: number) => {
    return savedJobs.some((j) => j.id === id);
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSave, isSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used inside SavedJobsProvider");
  }
  return context;
}
