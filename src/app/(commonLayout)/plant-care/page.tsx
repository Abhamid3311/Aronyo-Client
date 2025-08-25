import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

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

      <ProductExplorer initialData={plantCare} category="plant-care" />
    </div>
  );
};

export default PlantCare;
