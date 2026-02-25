"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return; // ✅ Don't navigate if same page

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNumber));

    router.push(`${pathname}?${params.toString()}`); // ✅ No scroll:false
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-14 gap-3"
    >
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        const isActive = currentPage === pageNumber;

        return (
          <motion.button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isActive} // ✅ Disable active page button
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-black text-white border-black shadow-md cursor-default"
                : "bg-white hover:bg-black hover:text-white hover:border-black cursor-pointer"
            }`}
          >
            {pageNumber}
          </motion.button>
        );
      })}
    </motion.div>
  );
}