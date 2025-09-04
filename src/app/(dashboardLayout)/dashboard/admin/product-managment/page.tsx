import { ProductsTableClient } from "@/components/Modules/dashboard/tables/ProductsTable";
import { adminApi } from "@/lib/serverApiClient";
import React from "react";

const ProductManagement = async () => {
  const products = await adminApi.getProducts();
  console.log(products);
  return (
    <div>
      <ProductsTableClient initialData={products.data} />
    </div>
  );
};

export default ProductManagement;
