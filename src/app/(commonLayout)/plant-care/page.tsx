import ProductCard from "@/components/Modules/Cards/ProductCard";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import { IProduct } from "@/lib/types";
import React from "react";

const PlantCare = async () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Plant Care"
        para="One-stop-shop for plant care essentials from organic potting mix to all-natural fertilizer and more."
      />

      <OrchidProducts />
    </div>
  );
};

export default PlantCare;

const OrchidProducts = async () => {
  const [plantCare] = await Promise.all([
    getProductsWithFilters({ category: "plant-care" }),
  ]);

  return (
    <div className="custom-container">
      <div className="py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5">
          {plantCare.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
