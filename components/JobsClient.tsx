"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import JobsClientInner from "./JobsClientInner";

function JobsClientWrapper() {
  const searchParams = useSearchParams();
  const key = searchParams.toString(); // ✅ Key changes on every URL change

  return <JobsClientInner key={key} />;
}

export default function JobsClient() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <JobsClientWrapper />
    </Suspense>
  );
}