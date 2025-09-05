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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken(); // refresh access token if expired
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
        setHydrated(true);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const res = await apiLogin(credentials);
      console.log(res);
      setUser(res.data.user);
      router.push("/dashboard");
    } catch (err) {
      setUser(null);
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
      router.push("/dashboard");
    } catch (err) {
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {hydrated ? (
        children
      ) : (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
