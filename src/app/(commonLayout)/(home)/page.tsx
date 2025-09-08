import Help from "@/components/Modules/Home/Help";
import Hero from "@/components/Modules/Home/Hero";
import LargePlants from "@/components/Modules/Home/LargePlant";
import NewArrivals from "@/components/Modules/Home/NewArrivals";
import PopularPlants from "@/components/Modules/Home/PopularPlants";
import Category from "@/components/Modules/Home/Category";
import {
  getBlogsWithFilters,
  getCategories,
  getProductsWithFilters,
} from "@/lib/services/Products/publicApi";
import BlogSec from "@/components/Modules/Home/BlogSec";
import PopularPlantsSkeleton from "@/components/Modules/skeletons/PlantSectionSkeleton";
import { Suspense } from "react";

export default async function Home() {
  const [categories, popularPro, largePlant, newArrival, blogs] =
    await Promise.all([
      getCategories(),
      getProductsWithFilters(),
      getProductsWithFilters({ category: "large-plants" }),
      getProductsWithFilters({ tag: "new-arrivals" }),
      getBlogsWithFilters(),
    ]);

  // console.log(popularPro);

  return (
    <div>
      <Hero />

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <PopularPlants popProducts={popularPro?.data} />
      </Suspense>

      <Help />

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <Category category={categories.data} />
      </Suspense>

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <LargePlants popProducts={largePlant.data} />
      </Suspense>

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <NewArrivals popProducts={newArrival.data} />
      </Suspense>

      <Suspense fallback={<PopularPlantsSkeleton />}>
        <BlogSec blogs={blogs.data} />
      </Suspense>
    </div>
  );
}
