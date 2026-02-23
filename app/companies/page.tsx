import { fetchJobs } from "@/services/api";
import Link from "next/link";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function CompaniesPage() {
  const jobs = await fetchJobs();

  const companyMap = new Map();

  jobs.forEach((job) => {
    if (!companyMap.has(job.company_name)) {
      companyMap.set(job.company_name, {
        name: job.company_name,
        location: job.candidate_required_location,
        count: 1,
      });
    } else {
      companyMap.get(job.company_name).count++;
    }
  });

  const companies = Array.from(companyMap.values());

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-12">Explore Companies</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {companies.map((company) => (
          <Link
            key={company.name}
            href={`/companies/${slugify(company.name)}`}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{company.name}</h3>
            <p className="text-sm text-slate-500 mt-2">{company.location}</p>
            <p className="text-sm mt-4">
              {company.count} open position
              {company.count > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
