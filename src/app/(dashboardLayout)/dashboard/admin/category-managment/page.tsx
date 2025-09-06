import { CategoriesTableClient } from "@/components/Modules/dashboard/tables/CategoryTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import React, { Suspense } from "react";

const AllCategory = async () => {
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <CategoriesTableClient />
      </Suspense>
    </div>
  );
};

export default AllCategory;
