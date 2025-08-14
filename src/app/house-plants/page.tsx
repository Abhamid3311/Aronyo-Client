import ProductCard from "@/components/Cards/ProductCard";
import Headlines from "@/components/Shared/Headlines";
import { getProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";
import Link from "next/link";
import React from "react";

const HousePlants = async () => {
  return (
    <div className="min-h-screen custom-container ">
      <div className="py-10 text-center ">
        <h1 className="text-3xl lg:text-5xl font-semibold mb-3 text-textClr">
          Plants Make People Happy
        </h1>
        <p className="text-sm lg:text-base">
          Shop our plants, care accessories, and more delivered to your
          door—happiness guaranteed.
        </p>
      </div>

      <PopularPro />
      <PetFriendly />
      <IndorPlant />
    </div>
  );
};

export default HousePlants;

const PopularPro = async () => {
  const [popularPro] = await Promise.all([getProducts()]);
  return (
    <>
      <div>
        <Headlines
          title={"Most Popular"}
          link={"#"}
          buttonText={" Shop all best sellers"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 my-5 px-5 ">
          {popularPro.data
            .map((item: IProduct) => (
              <ProductCard key={item._id} product={item} />
            ))
            .slice(0, 6)}
        </div>
      </div>
    </>
  );
};

const PetFriendly = async () => {
  const [petFriendly] = await Promise.all([getProducts("pet-friendly-plants")]);
  return (
    <>
      <div className="py-10">
        <Headlines
          title={"Pet-Friendly Picks"}
          link={"#"}
          buttonText={"Shop all Pet-Friendly"}
        />

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
        <Headlines
          title={"Indoor Plants"}
          link={"#"}
          buttonText={"Shop all Indoor Plants"}
        />

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
