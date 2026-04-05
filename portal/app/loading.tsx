import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <HeroSkeleton />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}
