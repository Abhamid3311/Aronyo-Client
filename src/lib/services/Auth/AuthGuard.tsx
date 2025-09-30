"use client";
import { useAuth } from "@/Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const roleBasedRoutes: Record<string, RegExp[]> = {
  user: [
    /^\/dashboard$/,
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
  ],
  staff: [
    /^\/dashboard$/,
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
    /^\/dashboard\/admin\/product-managment/,
    /^\/dashboard\/admin\/order-managment/,
    /^\/dashboard\/admin\/blog-managment/,
  ],
  admin: [/.*/],
};

const publicRoutes = ["/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // 👇 user is restored from cookies inside useAuth
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    const role = (user.role as keyof typeof roleBasedRoutes) || "user";

    // prevent logged-in user from accessing /login or /register
    if (publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }

    // block unauthorized routes
    if (role !== "admin") {
      const allowedRoutes = roleBasedRoutes[role] ?? [];
      const isAllowed = allowedRoutes.some((r) => pathname.match(r));
      if (!isAllowed) router.replace("/");
    }
  } else {
    // guest trying to access protected route → redirect to login
    if (!publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }

  return <>{children}</>;
}
