"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();

  useEffect(() => {
    router.push(`/?search=${debouncedSearch}`);
  }, [debouncedSearch, router]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search jobs..."
      className="border p-3 rounded-lg w-full"
    />
  );
}
