import { ProductsTableClient } from "@/components/Modules/dashboard/tables/ProductsTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import React, { Suspense } from "react";

const ProductManagement = () => {
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <ProductsTableClient />
      </Suspense>
    </div>
  );
};

export default ProductManagement;
