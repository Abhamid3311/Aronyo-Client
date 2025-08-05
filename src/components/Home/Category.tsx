import React from "react";

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

type CategoryProps = {
  categoriesData: ICategory[];
};

const Category = () => {
  return (
    <div className="min-h-screen custom-container">
      <h1 className="text-3xl">Plants For Everyone</h1>

      <div></div>
    </div>
  );
};

export default Category;
