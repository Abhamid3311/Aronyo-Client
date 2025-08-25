import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

const Newarrivals = async () => {
  const [newArrivals] = await Promise.all([
    getProductsWithFilters({ tag: "new-arrivals" }),
  ]);
  return (
    <div className="min-h-screen">
      <PageHeader
        title="New Arrivals"
        para="Discover the latest plants and accessories for your home garden."
      />

      <ProductExplorer initialData={newArrivals} />
    </div>
  );
};

export default Newarrivals;
