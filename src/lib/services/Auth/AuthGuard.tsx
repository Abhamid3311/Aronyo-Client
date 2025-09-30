"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/services/Products/publicApi"; // ✅ cookie+decode util

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
  const pathname = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getLoggedInUser(); // ✅ decode cookie
      setCurrentUser(user);

      // Not logged in → redirect to login
      if (!user) {
        if (!publicRoutes.includes(pathname)) {
          router.replace(`/login?redirectPath=${pathname}`);
        }
        return;
      }

      // Logged in but on login/register → push to dashboard
      if (publicRoutes.includes(pathname)) {
        router.replace("/dashboard");
        return;
      }

      // Role-based routes
      const role = user.role as
        | keyof typeof roleBasedRoutes
        | "admin"
        | undefined;
      if (!role) {
        router.replace("/login");
        return;
      }

      if (role === "admin") return; // full access

      const allowedRoutes = roleBasedRoutes[role] ?? [];
      const isAllowed = allowedRoutes.some((r) => pathname.match(r));
      if (!isAllowed) {
        router.replace("/");
      }
    };

    checkAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
