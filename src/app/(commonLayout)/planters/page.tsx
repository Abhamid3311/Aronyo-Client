import ProductExplorer from "@/components/Modules/Products/SearchFilter";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

const Planters = async () => {
  const [plantCare] = await Promise.all([
    getProductsWithFilters({ category: "planters" }),
  ]);

  return (
    <div className="min-h-screen ">
      <PageHeader
        title="Planters"
        para="Meet your new favorite planter. Discover planters, cachepots, propagation vessels, and more in a wide range of styles, sizes, & colors."
      />

      <ProductExplorer initialData={plantCare} category="planters" />
    </div>
  );
};

export default Planters;
