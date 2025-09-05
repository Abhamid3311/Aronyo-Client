import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="px-5 py-6 grid lg:grid-cols-3 gap-8">
        {/* Left side - Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-16 w-16 rounded-lg" />{" "}
                {/* Product image */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-20 rounded-md" /> {/* Quantity */}
                <Skeleton className="h-5 w-16" /> {/* Price */}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Summary */}
        <div className="border rounded-xl p-6 shadow-sm space-y-4">
          <Skeleton className="h-6 w-32" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
          <Skeleton className="h-10 w-full rounded-lg" />{" "}
          {/* Checkout button */}
        </div>
      </div>
    </div>
  );
}
