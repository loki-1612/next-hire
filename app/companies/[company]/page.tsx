import { fetchJobs } from "@/services/api";
import { Job } from "@/types/job";
import { normalizeCompany } from "@/lib/utils";
import { notFound } from "next/navigation";
import AnimatedCompanyJobs from "@/components/company/AnimatedCompanyJobs";

interface PageProps {
  params: Promise<{ company: string }>;
}

export const revalidate = 3600;

export default async function CompanyJobsPage({ params }: PageProps) {
  const { company } = await params; // ✅ MUST await

  if (!company) {
    notFound();
  }

  const decodedCompany = normalizeCompany(decodeURIComponent(company));

  const jobs: Job[] = await fetchJobs();

  if (!jobs || jobs.length === 0) {
    notFound();
  }

  const companyJobs = jobs.filter(
    (job) =>
      normalizeCompany(job.company_name) === normalizeCompany(decodedCompany),
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <AnimatedCompanyJobs jobs={companyJobs} companyName={decodedCompany} />
    </section>
  );
}
