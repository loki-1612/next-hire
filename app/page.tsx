"use client";

import { useState, useMemo, useEffect } from "react";
import JobCard from "@/components/Jobcard";
import { fetchJobs, Job } from "@/services/api";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const jobsPerPage = 6;

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        setError("Unable to load jobs.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  // ✅ Correct filtering using API data
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.candidate_required_location
          .toLowerCase()
          .includes(locationFilter.toLowerCase()) &&
        (typeFilter ? job.job_type === typeFilter : true)
      );
    });
  }, [jobs, search, locationFilter, typeFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Live Job Opportunities
      </h2>

      {/* Search + Filters */}
      <div className="max-w-4xl mx-auto mb-12 grid gap-6 md:grid-cols-3">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-2">
            Search by Title
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            className="border border-slate-300 p-3 rounded-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. India, USA"
            className="border border-slate-300 p-3 rounded-lg"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Job Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-2">
            Job Type
          </label>
          <select
            className="border border-slate-300 p-3 rounded-lg"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Types</option>
            <option value="full_time">Full-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-slate-500">Loading jobs...</p>}

      {/* Error */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Jobs Grid */}
      {!loading && !error && (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <JobCard
                  key={job.id}
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
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === index + 1 ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
