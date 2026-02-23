import JobCard from "@/components/JobCard";
import { fetchJobs } from "@/services/api";
import { Metadata } from "next";
import SearchBar from "@/components/SearchBar";

export const revalidate = 3600;

interface SearchParams {
  search?: string;
  location?: string;
  type?: string;
  sort?: string; // ✅ Added sort
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
      "Explore curated job opportunities with filtering, sorting and optimized performance.",
  };
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const result = await fetchJobs();

  if ("error" in result) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Failed to load jobs.</p>
        <a
          href="/"
          className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-lg"
        >
          Retry
        </a>
      </div>
    );
  }

  const jobs = result;

  if ((jobs as any)?.error) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-red-500 text-lg font-medium">Failed to load jobs.</p>
        <a
          href="/"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Retry
        </a>
      </div>
    );
  }

  const search = params?.search?.toLowerCase() || "";
  const locationFilter = params?.location?.toLowerCase() || "";
  const typeFilter = params?.type || "";
  const sort = params?.sort || "latest"; // ✅ Sort
  const currentPage = Number(params?.page) || 1;

  const jobsPerPage = 6;

  // ✅ 1️⃣ Filtering
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title?.toLowerCase().includes(search) &&
      job.candidate_required_location?.toLowerCase().includes(locationFilter) &&
      (typeFilter ? job.job_type === typeFilter : true)
    );
  });

  // ✅ 2️⃣ Sorting
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sort === "salary") {
      return (b.salary ?? "").localeCompare(a.salary ?? "");
    }

    // Default = latest
    return (
      new Date(b.publication_date).getTime() -
      new Date(a.publication_date).getTime()
    );
  });

  // ✅ 3️⃣ Pagination
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const paginatedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Discover Opportunities
      </h1>

      {/* Filters + Sorting */}
      <form
        method="GET"
        className="max-w-5xl mx-auto mb-12 grid gap-6 md:grid-cols-4"
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

        {/* ✅ Sort Dropdown */}
        <select
          name="sort"
          defaultValue={params.sort}
          className="border border-slate-300 p-3 rounded-lg"
        >
          <option value="latest">Sort: Latest</option>
          <option value="salary">Sort: Salary</option>
        </select>

        <button
          type="submit"
          className="md:col-span-4 bg-black text-white py-3 rounded-lg"
        >
          Apply Filters
        </button>
      </form>

      {/* Job Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job.id}
            job={job}
            />
          ))
        ) : (
          // ✅ Polished Empty State
          <div className="col-span-full text-center py-20">
            <h3 className="text-xl font-semibold text-slate-700">
              No jobs found
            </h3>
            <p className="text-slate-500 mt-3">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </div>

      {/* Pagination (preserve sort) */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-3">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            const query = new URLSearchParams({
              search: params.search || "",
              location: params.location || "",
              type: params.type || "",
              sort: params.sort || "",
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
