import ProductCard from "@/components/Modules/Cards/ProductCard";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import ProductsSkeleton from "@/components/Modules/skeletons/ProductGridSkeleton";
import { getProductsWithFilters } from "@/lib/services/Products/productsApi";
import { OUTDOOR_PATIO_CONFIG } from "@/lib/staticData";
import { IProduct } from "@/lib/types";
import { Suspense } from "react";

interface OutdoorPatioPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OutdoorPatioPage({
  params,
}: OutdoorPatioPageProps) {
  const { slug } = await params;

  const categoryConfig =
    OUTDOOR_PATIO_CONFIG[slug as keyof typeof OUTDOOR_PATIO_CONFIG];

  if (!categoryConfig) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Outdoor & Patio Category Not Found</h1>
        <p>The outdoor & patio category &quot;{slug}&quot; does not exist.</p>
      </div>
    );
  }

  // Fetch products using your dynamic function
  const products = await getProductsWithFilters({
    category: categoryConfig.apiParam,
  });

  return (
    <div className="custom-container px-4 py-8">
      <Suspense fallback={<ProductsSkeleton />}>
        <PageHeader
          title={categoryConfig.title}
          para={categoryConfig.description}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products.data.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Suspense>

      {/* Empty state */}
      {(!products.data || products.data.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-4">No products found</h3>
          <p className="text-gray-600">
            We don&lsquo;t have any products in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}

// Generate metadata dynamically
export async function generateMetadata({ params }: OutdoorPatioPageProps) {
  const { slug } = await params;
  const categoryConfig =
    OUTDOOR_PATIO_CONFIG[slug as keyof typeof OUTDOOR_PATIO_CONFIG];

  return {
    title: categoryConfig?.title || "Outdoor & Patio",
    description:
      categoryConfig?.description ||
      "Browse our outdoor & patio plant collection",
  };
}

// Generate static params for better performance
export async function generateStaticParams() {
  return Object.keys(OUTDOOR_PATIO_CONFIG).map((slug) => ({
    slug,
  }));
}
