import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

const Planters = async () => {
  const [planters] = await Promise.all([
    getProductsWithFilters({ category: "planters" }),
  ]);

  return (
    <div className="min-h-screen ">
      <PageHeader
        title="Planters"
        para="Meet your new favorite planter. Discover planters, cachepots, propagation vessels, and more in a wide range of styles, sizes, & colors."
      />

      <ProductExplorer initialData={planters} category="planters" />
    </div>
  );
};

export default Planters;
