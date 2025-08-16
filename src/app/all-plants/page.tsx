import ProductCard from "@/components/Cards/ProductCard";
import PageHeader from "@/components/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/api";
import { IProduct } from "@/lib/types";
import React from "react";

const AllPlants = () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="All Plants & Greenery"
        para="Explore our wide range of plants, planters, and garden essentials to bring life and freshness to your space."
      />

      <NewProducts />
    </div>
  );
};

export default AllPlants;

const NewProducts = async () => {
  const [plantCare] = await Promise.all([getProductsWithFilters()]);

  return (
    <div className="custom-container">
      <div className="py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5">
          {plantCare.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
