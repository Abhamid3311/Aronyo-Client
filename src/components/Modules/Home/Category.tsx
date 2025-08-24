import React from "react";
import { CategoryProps } from "@/lib/types";
import PlantCard from "../Cards/categoryCard";

const Category: React.FC<CategoryProps> = ({ category }) => {
  // console.log(category);
  return (
    <div className="py-10 custom-container my-10 px-5">
      <h1 className="px-5 ">Plants For Everyone</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
        {category
          .map((item) => <PlantCard key={item._id} plant={item} />)
          .slice(0, 8)}
      </div>
    </div>
  );
};

export default Category;
