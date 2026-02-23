import JobCard from "@/components/Jobcard";
import { fetchJobs } from "@/services/api";
import { Metadata } from "next";

export const revalidate = 3600;

interface SearchParams {
  search?: string;
  location?: string;
  type?: string;
  page?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;

  const search = params.search ? `Search: ${params.search}` : "All Jobs";
  const location = params.location ? ` in ${params.location}` : "";
  const type = params.type ? ` (${params.type.replace("_", " ")})` : "";

  return {
    title: `${search}${location}${type} | NextHire`,
    description:
      "Explore job opportunities with server-side rendering, filtering and optimized performance.",
  };
}

export default async function Home({ searchParams }: PageProps) {
  // ✅ Unwrap searchParams
  const params = await searchParams;

  const jobs = await fetchJobs();

  const search = params?.search?.toLowerCase() || "";
  const locationFilter = params?.location?.toLowerCase() || "";
  const typeFilter = params?.type || "";
  const currentPage = Number(params?.page) || 1;

  const jobsPerPage = 6;

  // ✅ Server-side filtering
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title?.toLowerCase().includes(search) &&
      job.candidate_required_location?.toLowerCase().includes(locationFilter) &&
      (typeFilter ? job.job_type === typeFilter : true)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Live Job Opportunities
      </h1>

      {/* Filters */}
      <form
        method="GET"
        className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-3"
      >
        <input
          type="text"
          name="search"
          placeholder="Search by Title"
          defaultValue={params.search}
          className="border border-slate-300 p-3 rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          defaultValue={params.location}
          className="border border-slate-300 p-3 rounded-lg"
        />

        <select
          name="type"
          defaultValue={params.type}
          className="border border-slate-300 p-3 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="full_time">Full-time</option>
          <option value="contract">Contract</option>
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-black text-white py-3 rounded-lg"
        >
          Apply Filters
        </button>
      </form>

      {/* Job Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={String(job.id)}
              title={job.title}
              company={job.company_name}
              location={job.candidate_required_location}
              salary={job.salary || "Not specified"}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-xl font-semibold text-slate-700">
              No jobs found
            </h3>
            <p className="text-slate-500 mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            const query = new URLSearchParams({
              search: params.search || "",
              location: params.location || "",
              type: params.type || "",
              page: String(pageNumber),
            }).toString();

            return (
              <a
                key={pageNumber}
                href={`?${query}`}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === pageNumber
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {pageNumber}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
