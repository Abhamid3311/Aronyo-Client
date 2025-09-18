"use server";

import { BASE_API_URL } from "@/config/api";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { LoginCredentials } from "@/lib/types";

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

// Added New Filter products
export async function getFilterOptions() {
  const res = await fetch(`${BASE_API_URL}/products/filters`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch filter options");
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

// Get Active Reviews
export async function getActiveReviews() {
  const res = await fetch(`${BASE_API_URL}/review/active-reviews`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Reviews");
  return res.json();
}

// Login User
/* export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    const result = await res.json();
    console.log(result);

    if (result.success && result.data) {
      // ✅ Store tokens in cookies
      (await cookies()).set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60, // 15 minutes
      });
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Login failed",
    };
  }
}; */

// Get Current Logedin User From Cookie for middleware
export const getLoggedInUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};
