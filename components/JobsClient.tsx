"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./ui/Pagination";
import AnimatedJobGrid from "./job/AnimatedJobGrid";
import FilterForm from "./ui/FilterForm";

export default function JobsClient() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "latest";

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const jobsPerPage = 6;

  // Fetch jobs once
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
  }, []);

  // 🔥 Filter jobs
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

  // 🔥 Sort jobs
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sort === "salary") {
        return (b.salary || "").localeCompare(a.salary || "");
      }

      // latest
      return (
        new Date(b.publication_date).getTime() -
        new Date(a.publication_date).getTime()
      );
    });
  }, [filteredJobs, sort]);

  // 🔥 Pagination after filtering + sorting
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
      <h1 className="text-4xl font-bold mb-10 text-center">
        Discover Opportunities
      </h1>

      <FilterForm />

      {paginatedJobs.length > 0 ? (
        <AnimatedJobGrid jobs={paginatedJobs} />
      ) : (
        <p className="text-center mt-10">No jobs found.</p>
      )}

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
}
