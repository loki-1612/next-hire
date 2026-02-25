"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./ui/Pagination";
import AnimatedJobGrid from "./job/AnimatedJobGrid";
import FilterForm from "./ui/FilterForm";

export default function JobsClientInner() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "latest";

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const jobsPerPage = 6;

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []); // ✅ Fetch once on mount — works because key forces remount on URL change

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title?.toLowerCase().includes(search);
      const matchesLocation = job.candidate_required_location
        ?.toLowerCase()
        .includes(location);
      const matchesType = type ? job.job_type === type : true;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, search, location, type]);

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sort === "salary") {
        return (b.salary || "").localeCompare(a.salary || "");
      }
      return (
        new Date(b.publication_date).getTime() -
        new Date(a.publication_date).getTime()
      );
    });
  }, [filteredJobs, sort]);

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    const start = (page - 1) * jobsPerPage;
    const end = page * jobsPerPage;
    return sortedJobs.slice(start, end);
  }, [sortedJobs, page]);

  if (loading) {
    return <p className="text-center mt-20">Loading jobs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          Remote Jobs Worldwide
        </p>
        <h1 className="text-4xl font-bold text-[#1C1410]">
          Discover Opportunities
        </h1>
        <p className="text-gray-500 mt-3 text-base">
          Browse curated remote jobs from top companies — updated daily.
        </p>
      </div>

      <FilterForm />

      {paginatedJobs.length > 0 ? (
        <AnimatedJobGrid jobs={paginatedJobs} />
      ) : (
        <p className="text-center mt-10 text-gray-500">No jobs found.</p>
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
}
