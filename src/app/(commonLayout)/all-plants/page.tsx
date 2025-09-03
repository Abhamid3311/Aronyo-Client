import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

const AllPlants = async () => {
  const [allProducts] = await Promise.all([getProductsWithFilters()]);
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="All Plants & Greenery"
        para="Explore our wide range of plants, planters, and garden essentials to bring life and freshness to your space."
      />

      <ProductExplorer initialData={allProducts} />
    </div>
  );
};

export default AllPlants;
