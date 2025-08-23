// components/products/NewProducts.tsx
import { Suspense } from "react";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi"; // Adjust import path
import { IProduct } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";
import Pagination from "../Shared/Pagination";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface ProductResponse {
  success: boolean;
  data: IProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const NewProducts = async ({ searchParams }: ProductsPageProps) => {
  const currentPage = parseInt((searchParams.page as string) || "1");
  const limit = parseInt((searchParams.limit as string) || "12");

  // Convert searchParams to filters object
  const filters: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      filters[key] = value;
    }
  });

  // Add pagination parameters
  filters.page = currentPage.toString();
  filters.limit = limit.toString();

  let productData: ProductResponse;

  try {
    productData = await getProductsWithFilters(filters);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return (
      <div className="custom-container">
        <div className="py-5">
          <div className="text-center py-10">
            <p className="text-destructive">
              Failed to load products. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-container">
      <div className="py-5">
        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 my-5 px-5">
          {productData.data.map((item: IProduct) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>

        {/* No products found */}
        {productData.data.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}

        {/* Pagination Component */}
        {productData.data.length > 0 && (
          <Pagination
            currentPage={productData.meta.page}
            totalPages={productData.meta.totalPages}
            totalItems={productData.meta.total}
            itemsPerPage={productData.meta.limit}
            showItemsPerPage={true}
            itemsPerPageOptions={[12, 24, 48, 96]}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
};

export default NewProducts;
