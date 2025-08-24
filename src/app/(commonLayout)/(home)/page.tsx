import Help from "@/components/Modules/Home/Help";
import Hero from "@/components/Modules/Home/Hero";
import LargePlants from "@/components/Modules/Home/LargePlant";
import NewArrivals from "@/components/Modules/Home/NewArrivals";
import PopularPlants from "@/components/Modules/Home/PopularPlants";
import Category from "@/components/Modules/Home/Category";
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
