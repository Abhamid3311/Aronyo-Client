import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="px-5 py-6 space-y-6">
        {/* Title */}
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-60" />
        </div>

        {/* Items */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 rounded-lg" /> {/* Image */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
