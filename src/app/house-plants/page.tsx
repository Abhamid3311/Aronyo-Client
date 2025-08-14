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
          <h1 className="px-5 text-textClr">Most Popular</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5 ">
          {popularPro.data
            .map((item: IProduct) => (
              <ProductCard key={item._id} product={item} />
            ))
            .slice(0, 6)}
        </div>
      </div>

      <PetFriendly />
      <IndorPlant />
    </div>
  );
};

export default HousePlants;

const PetFriendly = async () => {
  const [petFriendly] = await Promise.all([getProducts("pet-friendly-plants")]);
  return (
    <>
      <div className="py-10">
        <div className="flex items-center justify-between gap-1">
          <h1 className="px-5 text-textClr">Pet-Friendly Picks</h1>
          <Link
            href={"#"}
            className="bg-ghost text-textClr  px-2 py-3 rounded-md text-lg font-bold font-[--font-playfair]"
          >
            <p className="tracking-normal hover:tracking-wider ease-linear duration-500 text-lg">
              Shop all Pet-Friendly
              <span className="ml-1 inline-block text-xl">→</span>
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5 ">
          {petFriendly.data
            .map((item: IProduct) => (
              <ProductCard key={item._id} product={item} />
            ))
            .slice(0, 6)}
        </div>
      </div>
    </>
  );
};

const IndorPlant = async () => {
  const [indorPlant] = await Promise.all([getProducts("indoor-plants")]);
  return (
    <>
      <div className="py-10">
        <div className="flex items-center justify-between gap-1">
          <h1 className="px-5 text-textClr">Indoor Plants</h1>
          <Link
            href={"#"}
            className="bg-ghost text-textClr  px-2 py-3 rounded-md text-lg font-bold font-[--font-playfair]"
          >
            <p className="tracking-normal hover:tracking-wider ease-linear duration-500 text-lg">
              Shop all Indoor Plants
              <span className="ml-1 inline-block text-xl">→</span>
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5 ">
          {indorPlant.data
            .map((item: IProduct) => (
              <ProductCard key={item._id} product={item} />
            ))
            .slice(0, 6)}
        </div>
      </div>
    </>
  );
};
