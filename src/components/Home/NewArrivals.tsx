import React from "react";
import { ProductsProps } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";
import Headlines from "../Shared/Headlines";

const NewArrivals: React.FC<ProductsProps> = ({ popProducts }) => {
  return (
    <div className="py-10 custom-container my-10 px-5">
      <Headlines
        title={"New Arrivals"}
        link={"#"}
        buttonText={"Shop all New Arrivals"}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
        {popProducts
          .map((item) => <ProductCard key={item._id} product={item} />)
          .slice(6, 10)}
      </div>
    </div>
  );
};

export default NewArrivals;
