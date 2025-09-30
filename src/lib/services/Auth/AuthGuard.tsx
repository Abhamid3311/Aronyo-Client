"use client";
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

export default function AuthGuard({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialUser: any;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = initialUser; // user is already decoded server-side

  // Client-side role-based route enforcement
  if (user) {
    const role = user.role as keyof typeof roleBasedRoutes | "admin";

    if (publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }

    if (role !== "admin") {
      const allowedRoutes = roleBasedRoutes[role] ?? [];
      const isAllowed = allowedRoutes.some((r) => pathname.match(r));
      if (!isAllowed) router.replace("/");
    }
  }

  return <>{children}</>;
}
