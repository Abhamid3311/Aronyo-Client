import { getProductBySlug } from "@/lib/services/Products/publicApi";
import { IProduct } from "@/lib/types";
import React, { Suspense } from "react";
import ProductDetails from "@/components/Modules/Products/ProductDetails";
import ProductDetailsSkeleton from "@/components/Modules/skeletons/ProductDetailsSkeleton";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = params;

  let product: IProduct;

  try {
    product = await getProductBySlug(slug);
  } catch {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600">
          The requested product could not be found.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails product={product} />
    </Suspense>
  );
}
