import { ProductsTableClient } from "@/components/Modules/dashboard/tables/ProductsTable";
import DashboardSkeleton from "@/components/Modules/skeletons/DashboardSkeleton";
import { getAdminProducts } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const ProductManagement = async () => {
  const products = await getAdminProducts();
  // console.log(products);
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <ProductsTableClient initialData={products.data} />
      </Suspense>
    </div>
  );
};

export default ProductManagement;
