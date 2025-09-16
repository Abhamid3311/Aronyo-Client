/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshed = await refreshAccessToken(); // returns boolean
        if (refreshed) {
          const userData = await getCurrentUser();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch {
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
      const res = await apiLogin(credentials);
      setUser(res.data.user);
      successAlert("Login successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      setUser(null);
      errorAlert(err.message || "Login failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      const res = await apiRegister(credentials);
      setUser(res.data.user);
      successAlert("Registered successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      setUser(null);
      errorAlert(err.message || "Registration failed!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const confirmed = await confirmAlert("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      setLoading(true);
      await apiLogout();
      setUser(null);
      successAlert("Logged out successfully!");
      router.push("/login");
    } catch {
      setUser(null);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
