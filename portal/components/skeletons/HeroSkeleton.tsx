export function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main hero */}
      <div className="lg:col-span-2 skeleton rounded-xl h-[420px]" />
      {/* Secondary 2 stacked */}
      <div className="flex flex-col gap-4">
        <div className="skeleton rounded-xl flex-1 h-[200px]" />
        <div className="skeleton rounded-xl flex-1 h-[200px]" />
      </div>
      {/* Sidebar list */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
