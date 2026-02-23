import Link from "next/link";
import BookmarkButton from "./BookmarkButton";
import { Job } from "@/app/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>

          <BookmarkButton jobId={job.id} />
        </div>

        <p className="text-slate-600 mt-2">{job.company_name}</p>

        <p className="text-slate-500 text-sm mt-1">
          {job.candidate_required_location}
        </p>

        {job.salary && (
          <p className="text-green-600 font-medium mt-2">{job.salary}</p>
        )}
      </div>
    </Link>
  );
}
