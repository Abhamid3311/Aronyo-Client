import { ProductsTableClient } from "@/components/Modules/dashboard/tables/ProductsTable";
import { getAdminProducts } from "@/lib/services/Products/productsApi";
import React from "react";

const ProductManagement = async () => {
  const products = await getAdminProducts();
  // console.log(products);
  return (
    <div>
      <ProductsTableClient initialData={products.data} />
    </div>
  );
};

export default ProductManagement;
