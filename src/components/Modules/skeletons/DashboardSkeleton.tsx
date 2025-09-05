import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="px-5 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Filter */}
          <Skeleton className="h-10 w-24 rounded-lg" /> {/* Export */}
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-72 rounded-lg" />
        <Skeleton className="h-6 w-20" /> {/* Rows per page */}
      </div>

      {/* Table */}
      <div className="border rounded-xl p-4 shadow-sm space-y-4">
        {/* Table header */}
        <div className="flex justify-between items-center">
          {[
            "Name",
            "Price",
            "Category",
            "Stock",
            "Status",
            "Created",
            "Actions",
          ].map((_, i) => (
            <Skeleton key={i} className="h-5 w-20" />
          ))}
        </div>

        {/* Table rows */}
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-2"
            >
              <Skeleton className="h-4 w-24" /> {/* Name */}
              <Skeleton className="h-4 w-16" /> {/* Price */}
              <Skeleton className="h-4 w-24" /> {/* Category */}
              <Skeleton className="h-6 w-10 rounded-md" /> {/* Stock */}
              <Skeleton className="h-6 w-16 rounded-md" /> {/* Status */}
              <Skeleton className="h-4 w-20" /> {/* Created */}
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" /> {/* View */}
                <Skeleton className="h-8 w-8 rounded-full" /> {/* Edit */}
                <Skeleton className="h-8 w-8 rounded-full" /> {/* Delete */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
    </div>
  );
}
