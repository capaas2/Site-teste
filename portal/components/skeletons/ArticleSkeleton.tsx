export function ArticleSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Article content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton h-10 w-full rounded" />
        <div className="skeleton h-10 w-5/6 rounded" />
        <div className="skeleton h-4 w-40 rounded" />
        <div className="skeleton h-72 w-full rounded-xl" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-4 w-full rounded" />
        ))}
      </div>
      {/* Sidebar */}
      <div className="space-y-4">
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
