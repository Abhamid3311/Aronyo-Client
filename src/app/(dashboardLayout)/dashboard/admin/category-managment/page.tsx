import { CategoriesTableClient } from "@/components/Modules/dashboard/tables/CategoryTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import { getCategoriesForAdmin } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const AllCategory = async () => {
  const Categories = await getCategoriesForAdmin();
  console.log(Categories);
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <CategoriesTableClient initialData={Categories.data} />
      </Suspense>
    </div>
  );
};

export default AllCategory;
