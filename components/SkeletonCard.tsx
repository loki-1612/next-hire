export default function SkeletonCard() {
  return (
    <div className="border p-6 rounded-lg animate-pulse">
      <div className="h-4 bg-slate-200 mb-4 rounded"></div>
      <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
    </div>
  );
}
