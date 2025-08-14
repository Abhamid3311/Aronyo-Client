import Category from "@/components/Home/Category";
import Help from "@/components/Home/Help";
import Hero from "@/components/Home/Hero";
import LargePlants from "@/components/Home/LargePlant";
import NewArrivals from "@/components/Home/NewArrivals";
import PopularPlants from "@/components/Home/PopularPlants";
import { getCategories, getProducts } from "@/lib/api";

export default async function Home() {
  const [categories, popularPro] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  // console.log(popularPro);

  return (
    <div>
      <Hero />
      <PopularPlants popProducts={popularPro?.data} />
      <Help />
      <Category category={categories?.data} />
      <LargePlants popProducts={popularPro?.data} />
      <NewArrivals popProducts={popularPro?.data} />
    </div>
  );
}
