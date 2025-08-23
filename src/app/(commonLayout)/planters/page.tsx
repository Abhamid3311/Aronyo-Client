import ProductCard from "@/components/Cards/ProductCard";
import PageHeader from "@/components/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/api";
import { IProduct } from "@/lib/types";
import React from "react";

const Planters = () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Planters"
        para="Meet your new favorite planter. Discover planters, cachepots, propagation vessels, and more in a wide range of styles, sizes, & colors."
      />

      <PlantersProducts />
    </div>
  );
};

export default Planters;

const PlantersProducts = async () => {
  const [plantCare] = await Promise.all([
    getProductsWithFilters({ category: "planters" }),
  ]);

  return (
    <div className="custom-container">
      <div className="py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5">
          {plantCare.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
