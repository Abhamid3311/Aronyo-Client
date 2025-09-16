import PageHeader from "@/components/Modules/Shared/PageHeader";
import { ProductSection } from "@/components/Modules/Shared/ProductSection";
import { getProductsWithFilters } from "@/lib/services/Products/publicApi";
import React from "react";

const Outdoors = async () => {
  const [bonsaiPlant, outdoorPlant, flower] = await Promise.all([
    getProductsWithFilters({ category: "bonsai-miniatures" }),
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
        link="/outdoor-patio/outdoor-plants"
        buttonText="Shop all Fruit"
        products={outdoorPlant.data}
      />

      <ProductSection
        title="Bonsai & Miniatures"
        link="/outdoor-patio/bonsai-miniatures"
        buttonText="Shop all Bonsai"
        products={bonsaiPlant.data}
      />

      <ProductSection
        title="Flowering Trees & Shrubs"
        link="/outdoor-patio/flowering-plants"
        buttonText="Shop all Flowering Plants"
        products={flower.data}
      />
    </div>
  );
};

export default Outdoors;
