import { CategoriesTableClient } from "@/components/Modules/dashboard/tables/CategoryTable";
import { getCategoriesForAdmin } from "@/lib/services/Products/productsApi";
import React from "react";

const AllCategory = async () => {
  const Categories = await getCategoriesForAdmin();
  console.log(Categories);
  return (
    <div>
      <CategoriesTableClient initialData={Categories.data} />
    </div>
  );
};

export default AllCategory;
