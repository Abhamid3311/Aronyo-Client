import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const AllPlants = async () => {
  const [allProducts] = await Promise.all([getProductsWithFilters()]);
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="All Plants & Greenery"
        para="Explore our wide range of plants, planters, and garden essentials to bring life and freshness to your space."
      />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductExplorer initialData={allProducts} />
      </Suspense>
    </div>
  );
};

export default AllPlants;
