import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";
import Link from "next/link";
import React from "react";

const HousePlants = async () => {
  const [popularPro] = await Promise.all([getProducts()]);

  return (
    <div className="min-h-screen custom-container ">

      <div className="py-10 text-center ">
        <h1 className="text-5xl font-semibold mb-3 text-textClr">
          Plants Make People Happy
        </h1>
        <p>
          Shop our plants, care accessories, and more delivered to your
          door—happiness guaranteed.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-1">
          <h1 className="px-5 ">Most Popular</h1>
          <Link
            href={"#"}
            className="bg-ghost text-textClr  px-2 py-3 rounded-md text-lg font-bold font-[--font-playfair]"
          >
            <p className="tracking-normal hover:tracking-wider ease-linear duration-500 text-lg">
              Shop all best sellers
              <span className="ml-1 inline-block text-xl">→</span>
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
          {popularPro.data
            .map((item: IProduct) => (
              <ProductCard key={item._id} product={item} />
            ))
            .slice(0, 8)}
        </div>
      </div>
    </div>
  );
};

export default HousePlants;
