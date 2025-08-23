import ProductCard from "@/components/Cards/ProductCard";
import PageHeader from "@/components/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import { IProduct } from "@/lib/types";
import React from "react";

const Gifts = () => {
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="The Gift Collection"
        para="From birthdays to housewarmings and every holiday – shop our favorite gift-able greens for all occasions."
      />

      <GiftProducts />
    </div>
  );
};

export default Gifts;

const GiftProducts = async () => {
  const [giftProducts] = await Promise.all([
    getProductsWithFilters({ tag: "gift" }),
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
