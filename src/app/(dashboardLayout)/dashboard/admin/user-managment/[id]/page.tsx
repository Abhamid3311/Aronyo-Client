"use client";

import ProductDetailsAdmin from "@/components/Modules/dashboard/ShowSingelData/ProductDetailsAdmin";
import ProductDetailsSkeleton from "@/components/Modules/skeletons/ProductDetailsSkeleton";
import { useSingelProducts } from "@/hooks/useProducts";
import { use } from "react"; // react use() for async

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params); // unwrap the Promise

  const { data: product, isLoading, error } = useSingelProducts(id);

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error || !product) return <div>Product Not Found</div>;

  return <ProductDetailsAdmin product={product} />;
}
