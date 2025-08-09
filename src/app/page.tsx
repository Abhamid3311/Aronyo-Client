import Category from "@/components/Home/Category";
import Hero from "@/components/Home/Hero";
import { BASE_API_URL } from "@/config/api";

export default async function Home() {
  const res = await fetch(`${BASE_API_URL}/category`, {
    cache: "no-store",
  });

  const categories = await res.json(); // <- parse the JSON

  // console.log(categories); // check the actual structure of the data

  return (
    <div>
      {/* <h1>Number: {categories?.data?.length}</h1> */}
      <Hero />
      <Category data={categories?.data}  />
    </div>
  );
}
