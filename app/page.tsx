export default function Home() {
  return (
    <main className="bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        
        <h2 className="text-5xl font-bold tracking-tight text-slate-900">
          Find Your Next Career Move
        </h2>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover top opportunities from leading companies.
          Filter by role, location, and salary to find the job that fits you best.
        </p>

        <div className="mt-10">
          <button className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm">
            Browse Jobs
          </button>
        </div>

      </section>
    </main>
  );
}