import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken, logout } from "./services/Auth/auth";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const accessToken = getAccessToken();

      if (!accessToken) {
        const refreshToken = Cookies.get("refreshToken");

        if (!refreshToken) {
          logout();

          const currentPath = window.location.pathname;
          if (isProtectedRoute(currentPath)) {
            window.location.href = "/login";
          }

          return Promise.reject(error);
        }

        try {
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const { accessToken: newAccessToken } = response.data;
          setAccessToken(newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          logout();

          const currentPath = window.location.pathname;
          if (isProtectedRoute(currentPath)) {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
