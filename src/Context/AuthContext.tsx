"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser, LoginCredentials, RegisterCredentials } from "@/lib/types";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  refreshAccessToken,
} from "@/lib/services/Auth/auth";
import { confirmAlert, errorAlert, successAlert } from "@/lib/alert";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Always try refresh token
        await refreshAccessToken(); // no need to store return value
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.log("User not authenticated or refresh failed");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await apiLogin(credentials);
      setUser(response.data.user);
      successAlert("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      errorAlert("Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      const response = await apiRegister(credentials);
      setUser(response.data.user);
      successAlert("Registration successful!");
      router.push("/dashboard");
    } catch (error) {
      errorAlert("Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const confirmed = await confirmAlert("Do you really want to logout?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await apiLogout();
      setUser(null);
      successAlert("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      errorAlert("Logout failed. Please try again.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
