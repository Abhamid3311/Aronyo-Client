// auth.ts - Simplified and fixed
import axiosInstance from "@/lib/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  IUser,
} from "@/lib/types";

let accessToken: string | null = null;

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return accessToken || localStorage.getItem("accessToken");
  }
  return null;
};

export const setAccessToken = (token: string) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const removeAccessToken = () => {
  accessToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn"); // Add this flag
  }
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials);
  // console.log(response);
  const { accessToken, user } = response.data.data;
  // console.log(accessToken, user);
  setAccessToken(accessToken);
  // Set login flag
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true");
  }
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", credentials);
  const { accessToken } = response.data.data;
  setAccessToken(accessToken);
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", "true");
  }
  return response.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    removeAccessToken();
  }
};

export const getCurrentUser = async (): Promise<IUser> => {
  const response = await axiosInstance.get("/users/me");
  // console.log(response.data.data);
  return response.data.data;
};

export const refreshAccessToken = async (): Promise<string> => {
  const response = await axiosInstance.post("/auth/refresh");
  const { accessToken } = response.data.data;
  setAccessToken(accessToken);
  return accessToken;
};

// Simple function to check if user was previously logged in
export const wasLoggedIn = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  return false;
};
