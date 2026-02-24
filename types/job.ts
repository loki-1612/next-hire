export interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  salary?: string;
  job_type?: string;
  publication_date: string;
  description?: string;
  url?: string;
}