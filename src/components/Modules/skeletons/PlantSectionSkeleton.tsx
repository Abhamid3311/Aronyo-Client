import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const PopularPlantsSkeleton = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Plants Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="group overflow-hidden">
              {/* Image Skeleton */}
              <CardHeader className="p-0 relative">
                <Skeleton className="aspect-square w-full rounded-t-lg" />

                {/* Action Buttons Skeleton */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </CardHeader>

              {/* Content Skeleton */}
              <CardContent className="p-6">
                {/* Plant Name */}
                <Skeleton className="h-6 w-3/4 mb-3" />

                {/* Description */}
                <div className="space-y-2 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>

              {/* Price Section Skeleton */}
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-20" /> {/* Current Price */}
                    <Skeleton className="h-4 w-16" /> {/* Original Price */}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View More Button Skeleton */}
        <div className="text-center mt-12">
          <Skeleton className="h-12 w-36 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default PopularPlantsSkeleton;
