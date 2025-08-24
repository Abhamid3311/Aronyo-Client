import ProductCard from "@/components/Modules/Cards/ProductCard";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import { IProduct } from "@/lib/types";
import React from "react";

const Newarrivals = () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="New Arrivals"
        para="Discover the latest plants and accessories for your home garden."
      />

      <NewProducts />
    </div>
  );
};

export default Newarrivals;

const NewProducts = async () => {
  const [plantCare] = await Promise.all([
    getProductsWithFilters({ tag: "new-arrivals" }),
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
