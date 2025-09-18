import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { logout } from "./services/Auth/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const protectedRules = ["/dashboard/*"];

export function isProtectedRoute(path: string) {
  return protectedRules.some((rule) => {
    if (rule.endsWith("/*")) {
      const prefix = rule.replace("/*", "");
      return path.startsWith(prefix);
    }
    return path === rule;
  });
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, //  send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// No need to attach token manually, cookies handle it

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Retry only once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint, backend sets new accessToken cookie
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Retry original request, cookies will automatically send new accessToken
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        logout();

        const currentPath = window.location.pathname;
        if (isProtectedRoute(currentPath)) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
