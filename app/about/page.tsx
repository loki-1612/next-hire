export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">About NextHire</h1>
        <p className="text-slate-500 mt-4">
          Smart Job Discovery Platform built with modern web technologies.
        </p>
      </div>

      <div className="space-y-10 text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-2xl font-semibold mb-3">🚀 Our Mission</h2>
          <p>
            NextHire aims to simplify the job discovery process by combining
            powerful filtering, intelligent sorting, and real-time updates into
            one seamless experience.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            💡 What Makes Us Different
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Server-side rendering for fast performance</li>
            <li>Advanced filtering & sorting</li>
            <li>Bookmark and save jobs</li>
            <li>SEO optimized dynamic metadata</li>
            <li>Production-ready architecture</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">🛠 Built With</h2>
          <p>
            Next.js App Router, TypeScript, Tailwind CSS, and modern SSR
            architecture designed for scalability.
          </p>
        </div>

        <div className="bg-slate-100 rounded-xl p-8 text-center mt-10">
          <h3 className="text-xl font-semibold">
            Looking for your next opportunity?
          </h3>
          <p className="text-slate-600 mt-2">
            Start exploring jobs and find your perfect match today.
          </p>
        </div>
      </div>
    </section>
  );
}
