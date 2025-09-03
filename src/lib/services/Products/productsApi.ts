import { BASE_API_URL } from "@/config/api";
import axiosInstance from "@/lib/axios";

export async function getCategories() {
  const res = await fetch(`${BASE_API_URL}/category`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Get All Products for Admin
export async function getProductsForAdmin() {
  const res = await axiosInstance.get("/products/admin/");
  console.log(res);
  // if (!res.ok) throw new Error("Failed to fetch products");
  return res;
}

// Get All Products for User
export async function getProductsWithFilters(filters?: Record<string, string>) {
  let url = `${BASE_API_URL}/products`;

  if (filters && Object.keys(filters).length > 0) {
    const searchParams = new URLSearchParams(filters);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Get Single Product for User
export async function getProductById(id: string) {
  const res = await fetch(`${BASE_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Product");
  const result = await res.json();
  return result.data;
}
