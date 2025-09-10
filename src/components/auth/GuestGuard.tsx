"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/Context/AuthContext";

interface GuestGuardProps {
  children: React.ReactNode;
  fallback?: string;
}

export const GuestGuard = ({ children, fallback = "/" }: GuestGuardProps) => {
  const { isAuthenticated, loading, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !loading && isAuthenticated) {
      router.replace(fallback);
    }
  }, [hydrated, isAuthenticated, loading, router, fallback]);

  if (!hydrated || loading || isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">
          {!hydrated
            ? "Guest Loading..."
            : loading
            ? "Checking auth..."
            : "Redirecting..."}
        </span>
      </div>
    );
  }

  return <>{children}</>;
};
