import { fetchJobs } from "@/services/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

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

  const cleanDescription =
    job.description?.replace(/<img[^>]*>/g, "") ?? "No description available";

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:underline">
          Jobs
        </Link>
        <span className="mx-2">/</span>
        <span>{job.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
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

        </div>
        <div className="border rounded-xl p-6 h-fit sticky top-24 shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Apply for this role</h3>

          <p className="text-sm text-slate-500 mb-6">
            Submit your application on the official company page.
          </p>

          <a
            href={job.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-black text-white py-3 rounded-lg"
          >
            Apply Now
          </a>
        </div>
      </div>
      {/* Related Jobs */}
      <div className="mt-20 border-t pt-12">
        <h2 className="text-2xl font-semibold mb-8">Related Jobs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {jobs
            .filter((j) => j.id !== job.id)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.id}
                href={`/jobs/${related.id}`}
                className="border rounded-xl p-6 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{related.title}</h3>
                <p className="text-sm text-slate-500 mt-2">
                  {related.company_name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
