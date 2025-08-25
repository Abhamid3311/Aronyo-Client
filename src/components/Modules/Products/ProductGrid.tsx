import { IProduct } from "@/lib/types";
import ProductCard from "../Cards/ProductCard";

export default function ProductGrid({ products }: { products: IProduct[] }) {
  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products found</p>;
  }

  return (
    <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center px-5 py-5">
      {products.map((item) => (
        <div
          key={item._id}
          className="flex justify-center w-full max-w-xs mx-auto"
        >
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
}
