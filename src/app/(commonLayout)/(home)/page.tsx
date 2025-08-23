import Category from "@/components/Home/Category";
import Help from "@/components/Home/Help";
import Hero from "@/components/Home/Hero";
import LargePlants from "@/components/Home/LargePlant";
import NewArrivals from "@/components/Home/NewArrivals";
import PopularPlants from "@/components/Home/PopularPlants";
import {
  getCategories,
  getProductsWithFilters,
} from "@/lib/services/Products/productsApi";

export default async function Home() {
  const [categories, popularPro, largePlant, newArrival] = await Promise.all([
    getCategories(),
    getProductsWithFilters(),
    getProductsWithFilters({ category: "large-plants" }),
    getProductsWithFilters({ tag: "new-arrivals" }),
  ]);

  // console.log(popularPro);

  return (
    <div>
      <Hero />
      <PopularPlants popProducts={popularPro?.data} />
      <Help />
      <Category category={categories.data} />
      <LargePlants popProducts={largePlant.data} />
      <NewArrivals popProducts={newArrival.data} />
    </div>
  );
}
