"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FilterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("latest");

  // ✅ Sync state with URL when page loads
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
    setType(searchParams.get("type") || "");
    setSort(searchParams.get("sort") || "latest");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (sort) params.set("sort", sort);

    // ✅ Reset to page 1 when filtering
    params.set("page", "1");

    router.push(`/?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto mb-12 grid gap-6 md:grid-cols-4"
    >
      <input
        type="text"
        placeholder="Search by Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-slate-300 p-3 rounded-lg"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-slate-300 p-3 rounded-lg"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border border-slate-300 p-3 rounded-lg"
      >
        <option value="">All Types</option>
        <option value="full_time">Full-time</option>
        <option value="contract">Contract</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-slate-300 p-3 rounded-lg"
      >
        <option value="latest">Sort: Latest</option>
        <option value="salary">Sort: Salary</option>
      </select>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="md:col-span-4 bg-black text-white py-3 rounded-lg"
      >
        Apply Filters
      </motion.button>
    </motion.form>
  );
}