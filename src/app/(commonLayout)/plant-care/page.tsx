import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const PlantCare = async () => {
  const [plantCare] = await Promise.all([
    getProductsWithFilters({ category: "plant-care" }),
  ]);
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Plant Care"
        para="One-stop-shop for plant care essentials from organic potting mix to all-natural fertilizer and more."
      />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductExplorer initialData={plantCare} category="plant-care" />
      </Suspense>
    </div>
  );
};

export default PlantCare;
