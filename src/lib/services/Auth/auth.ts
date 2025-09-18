

import axiosInstance from "@/lib/axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  IUser,
} from "@/lib/types";
import { cookies } from "next/headers";

// Login
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials, {
    withCredentials: true, // send cookies automatically
  });
  return response.data; // backend sets access + refresh cookies
};




// Register
export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", credentials, {
    withCredentials: true,
  });
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout error:", err);
  }
};

// Get current user
export const getCurrentUser = async (): Promise<IUser | null> => {
  try {
    const response = await axiosInstance.get("/users/me", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    return null; // not logged in
  }
};

// Refresh access token
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    await axiosInstance.post("/auth/refresh", {}, { withCredentials: true });
    return true; // refresh succeeded
  } catch (err) {
    console.log("Failed to refresh access token:", err);
    return false;
  }
};
