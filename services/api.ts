export interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  job_type: string;
  salary: string;
  description: string;
  url:string;
}


export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(
    "https://remotive.com/api/remote-jobs",
    {
        next: { revalidate: 3600 }
    }  
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();
  return data.jobs;
}