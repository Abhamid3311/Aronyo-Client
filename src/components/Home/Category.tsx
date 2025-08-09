import React from "react";
import PlantCard from "../Cards/categoryCard";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date
  createdBy: string;
  __v: number;
}

interface CategoryProps {
  data: ICategory[];
}

const Category: React.FC<CategoryProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="min-h-screen custom-container my-10 px-5">
      <h1 className="px-5 ">Plants For Everyone</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5 ">
        {data
          .map((item) => <PlantCard key={item._id} plant={item} />)
          .slice(0, 8)}
      </div>
    </div>
  );
};

export default Category;
