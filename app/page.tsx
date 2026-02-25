import JobsClient from "@/components/JobsClient";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <JobsClient/>;
    </Suspense>
  );
}