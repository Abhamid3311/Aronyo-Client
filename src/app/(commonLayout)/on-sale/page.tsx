import ProductCard from "@/components/Cards/ProductCard";
import PageHeader from "@/components/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/api";
import { IProduct } from "@/lib/types";
import React from "react";

const OnSale = () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Our Best Sales"
        para="Save on plants, planters, and more! All plants are backed by our 30-Day Happiness Guarantee."
      />

      <GetProducts />
    </div>
  );
};

export default OnSale;

const GetProducts = async () => {
  const [giftProducts] = await Promise.all([
    getProductsWithFilters({ tag: "sale,deals" }),
  ]);

  return (
    <div className="custom-container">
      <div className="py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5">
          {giftProducts.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
