import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React, { Suspense } from "react";

const OnSale = async () => {
  const [onSale] = await Promise.all([
    getProductsWithFilters({ tag: "sale,deals" }),
  ]);
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Our Best Sales"
        para="Save on plants, planters, and more! All plants are backed by our 30-Day Happiness Guarantee."
      />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductExplorer initialData={onSale} />
      </Suspense>
    </div>
  );
};

export default OnSale;
