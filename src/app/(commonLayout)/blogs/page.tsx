import BlogList from "@/components/blogs/BlogList";
import PageHeader from "@/components/Modules/Shared/PageHeader";
import PopularPlantsSkeleton from "@/components/Modules/skeletons/PlantSectionSkeleton";
import { getBlogsWithFilters } from "@/lib/services/Products/publicApi";
import { Suspense } from "react";

// ✅ ISR every 60s
export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getBlogsWithFilters();

  return (
    <div className="min-h-screen custom-container">
      <PageHeader
        title="Our Blogs"
        para="Discover expert tips, plant care guides, and inspiring stories from our gardening community."
      />

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <BlogList blogs={blogs.data} />
      </Suspense>
    </div>
  );
}
