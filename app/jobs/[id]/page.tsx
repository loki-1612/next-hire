import { fetchJobs } from "@/services/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const jobs = await fetchJobs();
  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    return {
      title: "Job Not Found | NextHire",
    };
  }

  return {
    title: `${job.title} | ${job.company_name} | NextHire`,
    description: job.title,
  };
}

export default async function JobDetails({ params }: PageProps) {
  const { id } = await params;

  const jobs = await fetchJobs();

  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    notFound();
  }

   const cleanDescription = job.description?.replace(/<img[^>]*>/g, "") ?? "No description available";

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold">{job.title}</h1>

      <div className="mt-4 text-slate-600">
        <p className="font-medium">{job.company_name}</p>
        <p>{job.candidate_required_location}</p>
        <p className="mt-2">{job.salary || "Not specified"}</p>
      </div>

      <div
        className="mt-8 prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: cleanDescription,
        }}
      />

      <a
        href={job.url ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg"
      >
        Apply Now
      </a>
    </section>
  );
}
