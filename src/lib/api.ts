import { BASE_API_URL } from "@/config/api";

export async function getCategories() {
  const res = await fetch(`${BASE_API_URL}/category`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProducts(category?: string) {
  const url = category
    ? `${BASE_API_URL}/products?category=${category}`
    : `${BASE_API_URL}/products`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
