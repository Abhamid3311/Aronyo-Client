import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Define role-based allowed routes (matching your roleMenus)
const roleBasedRoutes = {
  user: [
    /^\/dashboard$/, // Profile (common)
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
    "/cart",
    "/wishlist",
  ],
  staff: [
    /^\/dashboard$/, // Profile (common)
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
    /^\/dashboard\/admin\/product-managment/,
    /^\/dashboard\/admin\/order-managment/,
    /^\/dashboard\/admin\/blog-managment/,
    "/cart",
    "/wishlist",
  ],
  admin: [/.*/], // admin can access everything
};

// Public routes (no login required)
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Get token from cookies
  const token = request.cookies.get("refreshToken")?.value;
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  // ✅ Decode token
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userInfo: any = null;
  try {
    userInfo = jwtDecode(token);
  } catch {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  if (!userInfo?.role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = userInfo.role as keyof typeof roleBasedRoutes;

  // ✅ Admin = full access
  if (role === "admin") {
    return NextResponse.next();
  }

  // ✅ Check allowed routes for user/staff
  const allowedRoutes = roleBasedRoutes[role] || [];
  if (allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // ❌ Unauthorized → home
  return NextResponse.redirect(new URL("/", request.url));
}

// ✅ Protect only required routes
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/cart", "/wishlist"],
};
