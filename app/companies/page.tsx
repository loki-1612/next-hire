import { fetchJobs } from "@/services/api";
import { Job } from "@/types/job";
import AnimatedCompanyGrid from "@/components/company/AnimatedCompanyGrid";

export const revalidate = 3600;

interface Company {
  name: string;
  location: string;
  count: number;
}

export const metadata = {
  title: "Explore Companies – NextHire",
  description: "Browse global companies hiring remote professionals.",
};

export default async function CompaniesPage() {
  const jobs: Job[] = await fetchJobs();

  if (!jobs || jobs.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-red-500">Failed to load companies.</p>
      </section>
    );
  }

  /* Group Jobs by Company */
  const companyMap = jobs.reduce<Map<string, Company>>((map, job) => {
    const existing = map.get(job.company_name);

    if (existing) {
      existing.count += 1;
    } else {
      map.set(job.company_name, {
        name: job.company_name,
        location: job.candidate_required_location,
        count: 1,
      });
    }

    return map;
  }, new Map());

  const companies = Array.from(companyMap.values());

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Explore Companies
      </h1>

      <AnimatedCompanyGrid companies={companies} />
    </section>
  );
}
