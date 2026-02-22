export interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  job_type: string;
  salary?: string;
}

export interface JobsResponse {
  jobs: Job[];
}

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(
    "https://remotive.com/api/remote-jobs?limit=50",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data: JobsResponse = await res.json();
  return data.jobs;
}