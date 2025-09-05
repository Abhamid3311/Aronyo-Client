import axiosInstance from "@/lib/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  IUser,
} from "@/lib/types";

// Login
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials, {
    withCredentials: true, // ✅ send cookies
  });

  // Backend sets accessToken + refreshToken cookies
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true"); // optional flag
  }

  return response.data;
};

// Register
export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", credentials, {
    withCredentials: true,
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true");
  }

  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
    }
  }
};

// Get current user
export const getCurrentUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get("/users/me", {
    withCredentials: true,
  });
  return response.data.data;
};

// Refresh accessToken manually (rarely needed)
export const refreshAccessToken = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });
    // Backend sets new accessToken cookie automatically
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    await logout();
  }
};

// Check if previously logged in
export const wasLoggedIn = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  return false;
};
