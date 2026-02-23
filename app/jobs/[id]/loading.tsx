export default function Loading(){
    return (
        <div className="max-w-4xl mx-auto px-6 py-16 animate-pulse">
            <div className="h-8 bg-slate-300 rounded w-1/2 mb-6"/>
            <div className="h-4 bg-slate-300 rounded w-1/3 mb-4"/>
            <div className="h-4 bg-slate-300 rounded w-1/4 mb-8"/>
            <div className="h-64 bg-slate-200 rounded"/>
        </div>
    );
}