import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="group block overflow-hidden rounded-xl">
      {/* Image Skeleton */}
      <div className="relative w-full h-40 lg:h-[350px] overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Title Skeleton */}
      <div className="mt-2 mb-1">
        <Skeleton className="h-5 lg:h-6 w-3/4" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-1">
        <Skeleton className="h-3 lg:h-4 w-full" />
        <Skeleton className="h-3 lg:h-4 w-2/3" />
      </div>

      {/* Price Skeleton */}
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-4 lg:h-5 w-12" /> {/* "Price:" text */}
        <Skeleton className="h-5 lg:h-6 w-20" /> {/* Price value */}
      </div>
    </div>
  );
}
