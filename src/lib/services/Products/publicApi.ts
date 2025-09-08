"use server";

import { BASE_API_URL } from "@/config/api";

// Get All Categories for User

export async function getCategories() {
  const res = await fetch(`${BASE_API_URL}/category`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
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
export async function getProductBySlug(slug: string) {
  const res = await fetch(`${BASE_API_URL}/products/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Product");
  const result = await res.json();
  return result.data;
}

// Get All Blogs for User
export async function getBlogsWithFilters(filters?: Record<string, string>) {
  let url = `${BASE_API_URL}/blog`;

  if (filters && Object.keys(filters).length > 0) {
    const searchParams = new URLSearchParams(filters);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Blog");
  return res.json();
}

// Get Single Blog for User
export async function getBlogById(id: string) {
  const res = await fetch(`${BASE_API_URL}/blog/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Blog");
  const result = await res.json();
  return result.data;
}
