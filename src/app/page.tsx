import Category from "@/components/Home/Category";
import Help from "@/components/Home/Help";
import Hero from "@/components/Home/Hero";
import { BASE_API_URL } from "@/config/api";

export default async function Home() {
  const res = await fetch(`${BASE_API_URL}/category`, {
    cache: "no-store",
  });
  const categories = await res.json();

  // console.log(categories);

  return (
    <div>
      <Hero />

      <Category data={categories?.data} />
      <Help />
    </div>
  );
}
