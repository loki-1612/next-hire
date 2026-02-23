import { Job } from "@/app/types/job";

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("https://remotive.com/api/remote-jobs");

  const data = await res.json();

  return data.jobs;
}
