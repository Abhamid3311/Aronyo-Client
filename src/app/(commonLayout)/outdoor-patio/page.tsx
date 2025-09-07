import PageHeader from "@/components/Modules/Shared/PageHeader";
import { ProductSection } from "@/components/Modules/Shared/ProductSection";
import { getProductsWithFilters } from "@/lib/services/Products/publicApi";
import React from "react";

const Outdoors = async () => {
  const [largePlant, outdoorPlant, flower] = await Promise.all([
    getProductsWithFilters({ category: "large-plants" }),
    getProductsWithFilters({ category: "outdoor-plants" }),
    getProductsWithFilters({ category: "flowering-plants" }),
  ]);

  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Outdoor & Patio Plants"
        para="The Aronyo is taking you outdoors!"
      />

      <ProductSection
        title="Fruit Trees & Berry Bushes"
        link="#"
        buttonText="Shop all Fruit"
        products={outdoorPlant.data}
      />

      <ProductSection
        title="Patio Plants"
        link="#"
        buttonText="Shop all Indoor Plants"
        products={largePlant.data}
      />

      <ProductSection
        title="Flowering Trees & Shrubs"
        link="#"
        buttonText="Shop all Flowering Plants"
        products={flower.data}
      />
    </div>
  );
};

export default Outdoors;
