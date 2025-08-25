import ProductExplorer from "@/components/Modules/Products/ProductExplorer";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import React from "react";

const Gifts = async () => {
  const [giftProducts] = await Promise.all([
    getProductsWithFilters({ tag: "gift" }),
  ]);
  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="The Gift Collection"
        para="From birthdays to housewarmings and every holiday – shop our favorite gift-able greens for all occasions."
      />

      <ProductExplorer initialData={giftProducts} />
    </div>
  );
};

export default Gifts;
