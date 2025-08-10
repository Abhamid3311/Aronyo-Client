import React from "react";
import { ProductsProps } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";

const LargePlants: React.FC<ProductsProps> = ({ popProducts }) => {
  return (
    <div className="py-10 custom-container my-10 px-5">
      <h1 className="px-5 ">Large Floor Plants</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
        {popProducts
          .map((item) => <ProductCard key={item._id} product={item} />)
          .slice(4, 8)}
      </div>
    </div>
  );
};

export default LargePlants;
