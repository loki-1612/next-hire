"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/Jobcard";
import { mockJobs } from "@/components/mockJobs";

export default function Home() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 3;

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        (locationFilter ? job.location === locationFilter : true) &&
        (typeFilter ? job.type === typeFilter : true)
      );
    });
  }, [search, locationFilter, typeFilter]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Explore Opportunities
      </h2>

      {/* Search + Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-2">
              Search by Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-2">
              Location
            </label>
            <select
              className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Locations</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-2">
              Job Type
            </label>
            <select
              className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
            />
          ))
        ) : (
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <h3 className="text-xl font-semibold text-slate-700">
                No jobs found
              </h3>
              <p className="text-slate-500 mt-2">
                Try adjusting your search or filters.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Showing {filteredJobs.length} results
              </p>
            </div>
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
    </section>
  );
}
