import React from "react";
import { ProductsProps } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";
import Link from "next/link";

const NewArrivals: React.FC<ProductsProps> = ({ popProducts }) => {
  return (
    <div className="py-10 custom-container my-10 px-5">
      <div className="flex items-center justify-between gap-1">
        <h1 className="px-5 ">New Arrivals</h1>
        <Link
          href={"#"}
          className="bg-ghost text-textClr  px-2 py-3 rounded-md text-lg font-bold font-[--font-playfair]"
        >
          <p className="tracking-normal hover:tracking-wider ease-linear duration-500 text-lg">
            Shop all New Arrivals
            <span className="ml-1 inline-block text-xl">→</span>
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
        {popProducts
          .map((item) => <ProductCard key={item._id} product={item} />)
          .slice(6, 10)}
      </div>
    </div>
  );
};

export default NewArrivals;
