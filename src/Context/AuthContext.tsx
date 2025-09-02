"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IUser, LoginCredentials, RegisterCredentials } from "@/lib/types";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  getAccessToken,
  refreshAccessToken,
  removeAccessToken,
  wasLoggedIn,
} from "@/lib/services/Auth/auth";

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
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();

  // Initialize auth only once
  useEffect(() => {
    if (initialized) return;

    const initAuth = async () => {
      try {
        if (!wasLoggedIn()) {
          console.log("❌ User was never logged in");
          setLoading(false);
          setInitialized(true);
          return;
        }

        // Check if we have a valid access token
        const token = getAccessToken();

        if (token) {
          try {
            console.log("✅ Trying existing token");
            const userData = await getCurrentUser();
            setUser(userData);
            setLoading(false);
            setInitialized(true);
            return;
          } catch (error) {
            console.log(" Token expired, trying refresh...");
          }
        } else {
          return;
        }

        // Try refresh token
        try {
          const newToken = await refreshAccessToken();
          const userData = await getCurrentUser();
          // console.log("🎉 User authenticated after refresh:", userData);
          setUser(userData);
        } catch (refreshError) {
          console.log(" Refresh failed, clearing auth");
          removeAccessToken();
          setUser(null);
        }
      } catch (error) {
        console.error("Auth init failed:", error);
        removeAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, [initialized]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await apiLogin(credentials);
      setUser(response.data.user);
      router.push("/dashboard");
    } catch (error) {
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
      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await apiLogout();
      setUser(null);
      setInitialized(false); // Reset for next login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      setInitialized(false);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const token = getAccessToken();
      if (!token) return;
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
