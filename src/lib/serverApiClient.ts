/* "use server";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/axios"; // reuse your base config

export function getServerAxios() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const serverAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // ✅ forward cookies for SSR
    },
  });

  // Response interceptor for SSR
  serverAxios.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Call refresh endpoint (backend sets new accessToken cookie)
          await serverAxios.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );

          // Retry the original request
          return serverAxios(originalRequest);
        } catch (refreshError) {
          console.error("SSR refresh failed:", refreshError);
          // ❌ Don't use window.location here (no window in SSR)
          // Instead: let the calling page decide what to do (redirect, throw, etc.)
          throw refreshError;
        }
      }

      throw error;
    }
  );

  return serverAxios;
}
 */
