import BlogSec from "@/components/Modules/Home/BlogSec";
import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import PopularPlantsSkeleton from "@/components/Modules/skeletons/PlantSectionSkeleton";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import {
  getBlogsWithFilters,
  getProductsWithFilters,
} from "@/lib/services/Products/publicApi";
import React, { Suspense } from "react";

const PlantCare = async () => {
  const [plantCare, blogs] = await Promise.all([
    getProductsWithFilters({ category: "plant-care" }),
    getBlogsWithFilters(),
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

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <BlogSec blogs={blogs.data} />
      </Suspense>
    </div>
  );
};

export default PlantCare;
