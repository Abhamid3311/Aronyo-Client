"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: string; // default login page
}

export const AuthGuard = ({
  children,
  fallback = "/login",
}: AuthGuardProps) => {
  const { isAuthenticated, loading, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && hydrated && !isAuthenticated) {
      router.replace(fallback); // redirect only after auth check
    }
  }, [isAuthenticated, loading, hydrated, router, fallback]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {loading ? "Checking auth..." : "Redirecting..."}
        </span>
      </div>
    );
  }

  return <>{children}</>;
};
