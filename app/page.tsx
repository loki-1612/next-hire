import JobCard from "@/components/Jobcard";
import { mockJobs } from "@/components/mockJobs";
export default function Home() {
  return (
    <main className="bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Latest Job Opportunities
          </h2>
          <p className="mt-3 text-slate-500">
            Explore curated opportunities from top companies
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mockJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
