interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
}

export default function JobCard({
  title,
  company,
  location,
  salary,
}: JobCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm text-slate-600">{company}</p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500">{location}</span>
        <span className="font-semibold text-slate-800">{salary}</span>
      </div>
    </div>
  );
}
