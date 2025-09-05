import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="flex gap-6 px-5 py-8">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block space-y-6">
          {/* Search */}
          <Skeleton className="h-10 w-full" />

          {/* Category */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-28" />
            ))}
          </div>

          {/* Brands */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-28" />
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-32" />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <Skeleton className="h-8 w-40 mb-2" /> {/* Title */}
          <Skeleton className="h-5 w-96 mb-6" /> {/* Subtitle */}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex justify-center w-full max-w-xs mx-auto rounded-2xl border shadow p-4"
              >
                <div className="w-full">
                  {/* Image */}
                  <Skeleton className="h-40 w-full rounded-xl" />

                  {/* Content */}
                  <div className="mt-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
