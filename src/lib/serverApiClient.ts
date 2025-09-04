/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { setAccessToken } from "./services/Auth/auth";
import axios from "axios";
import { API_URL } from "./axios";

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    console.warn("❌ No refresh token in cookies");
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    console.error("❌ Token refresh failed:", response.status);
    return null;
  }

  const { data } = await response.json();
  const { accessToken } = data;

  setAccessToken(accessToken);
  return accessToken;
}

export async function ssrApiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("No access token available for SSR API call");
  }

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`, // ✅ backend expects this
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `SSR API call failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// HTTP method helpers
export const ssrApi = {
  get: async <T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return ssrApiCall<T>(`${endpoint}${queryString}`);
  },

  post: async <T = any>(endpoint: string, data?: any): Promise<T> => {
    return ssrApiCall<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  put: async <T = any>(endpoint: string, data?: any): Promise<T> => {
    return ssrApiCall<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  delete: async <T = any>(endpoint: string): Promise<T> => {
    return ssrApiCall<T>(endpoint, {
      method: "DELETE",
    });
  },

  patch: async <T = any>(endpoint: string, data?: any): Promise<T> => {
    return ssrApiCall<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};

// Pre-built admin API functions
export const adminApi = {
  // Products
  getProducts: () => ssrApi.get("/products/admin/"),

  getProduct: (id: string) => ssrApi.get(`/products/admin/${id}`),

  // Users
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    ssrApi.get("/users/admin/", params),

  getUser: (id: string) => ssrApi.get(`/users/admin/${id}`),

  // Orders
  getOrders: (params?: { page?: number; limit?: number; status?: string }) =>
    ssrApi.get("/orders/admin/", params),

  getOrder: (id: string) => ssrApi.get(`/orders/admin/${id}`),

  // Dashboard
  getDashboardStats: () => ssrApi.get("/admin/dashboard/stats"),
};
