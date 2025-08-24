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
  }
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/login", credentials);
  const { accessToken, user } = response.data;
  setAccessToken(accessToken);
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/auth/register", credentials);
  const { accessToken } = response.data;
  setAccessToken(accessToken);
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
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const refreshAccessToken = async (): Promise<string> => {
  const response = await axiosInstance.post("/auth/refresh");
  const { accessToken } = response.data;
  setAccessToken(accessToken);
  return accessToken;
};
