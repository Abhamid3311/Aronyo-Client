import { ProductsTableClient } from "@/components/Modules/dashboard/tables/ProductsTable";
import { getProductsForAdmin } from "@/lib/services/Products/productsApi";
import React from "react";

const Product = async () => {
  const allProducts = await getProductsForAdmin(); // already returns data
  console.log(allProducts);
  
  return (
    <div>
      <ProductsTableClient initialData={allProducts.data} />
    </div>
  );
};

export default Product;
