import { fetchJobs } from "@/services/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  salary?: string;
  description?: string;
  url?: string;
  publication_date: string;
}

/* ===========================
   Metadata (SEO)
=========================== */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const result = await fetchJobs();

  if ("error" in result) {
    return {
      title: "Job | NextHire",
    };
  }

  const jobs = result as Job[];
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

/* ===========================
   Page Component
=========================== */
export default async function JobDetails({ params }: PageProps) {
  const { id } = await params;

  const result = await fetchJobs();

  // ✅ Handle API Error
  if ("error" in result) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <p className="text-red-500 text-lg font-medium">
          Failed to load job details.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </a>
      </div>
    );
  }

  const jobs = result as Job[];
  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    notFound();
  }

  const cleanDescription =
    job.description
      ?.replace(/<img[^>]*>/g, "")
      .replace(/ style="[^"]*"/g, "") ?? "No description available.";

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:underline">
          Jobs
        </Link>
        <span className="mx-2">/</span>
        <span>{job.title}</span>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-16">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{job.title}</h1>

          <div className="mt-4 text-slate-600">
            <p className="font-medium">{job.company_name}</p>
            <p>{job.candidate_required_location}</p>
            <p className="mt-2">{job.salary || "Not specified"}</p>
          </div>

          <div
            className="mt-8 prose prose-slate max-w-3xl leading-7"
            dangerouslySetInnerHTML={{
              __html: cleanDescription,
            }}
          />
        </div>

        {/* Sticky Apply Card */}
        <div className="bg-white rounded-2xl p-8 h-fit sticky top-24 border border-slate-100 shadow-sm">
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

        <div className="grid sm:grid-cols-2 gap-8">
          {jobs
            .filter((j) => j.id !== job.id)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.id}
                href={`/jobs/${related.id}`}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition px-6 py-5"
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
