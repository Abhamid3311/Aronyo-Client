import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import { getProductsWithFilters } from "@/lib/services/Products/publicApi";
import React, { Suspense } from "react";

const Gifts = async () => {
  const [giftProducts] = await Promise.all([
    getProductsWithFilters({ tags: "gift" }),
  ]);


  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="The Gift Collection"
        para="From birthdays to housewarmings and every holiday – shop our favorite gift-able greens for all occasions."
      />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductExplorer initialData={giftProducts} />
      </Suspense>
    </div>
  );
};

export default Gifts;
