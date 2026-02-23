import { fetchJobs } from "@/services/api";
import { Job } from "@/app/types/job";
import JobCard from "@/components/JobCard";

interface PageProps {
  params: Promise<{ company: string }>;
}

export default async function CompanyJobsPage({ params }: PageProps) {
  const { company } = await params; // ✅ unwrap params
  const decodedCompany = decodeURIComponent(company);

  const jobs: Job[] = await fetchJobs();

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // replace ANY non-alphanumeric with "-"
      .replace(/^-+|-+$/g, "");

  const companyJobs = jobs.filter(
    (job) => normalize(job.company_name) === normalize(decodedCompany),
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Jobs at {decodedCompany}</h1>

      {companyJobs.length === 0 ? (
        <p className="text-slate-500">No jobs found for this company.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {companyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
