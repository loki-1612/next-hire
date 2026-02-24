import { Job } from "@/types/job";

export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs", {
      cache:"no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data: { jobs: Job[] } = await res.json();

    return data.jobs;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
