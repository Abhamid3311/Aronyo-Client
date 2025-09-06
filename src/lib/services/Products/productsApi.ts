"use server";

import { BASE_API_URL } from "@/config/api";
import { cookies } from "next/headers";

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
export async function getProductById(id: string) {
  const res = await fetch(`${BASE_API_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Product");
  const result = await res.json();
  return result.data;
}

// Get All Users for Admin
export async function getUsersForAdmin() {
  const cookieStore = cookies(); // ✅ Read cookies on server
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${BASE_API_URL}/users/admin/all-users`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
}

// Get All Category for Admin
export async function getCategoriesForAdmin() {
  const cookieStore = cookies(); // ✅ Read cookies on server
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${BASE_API_URL}/category/admin/all-categories`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
}
