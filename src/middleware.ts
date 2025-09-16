import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Define role-based allowed routes
const roleBasedRoutes = {
  user: [
    /^\/dashboard$/, // Profile (common)
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
  ],
  staff: [
    /^\/dashboard$/, // Profile (common)
    /^\/dashboard\/order-history/,
    /^\/dashboard\/cart/,
    /^\/dashboard\/wishlist/,
    /^\/dashboard\/admin\/product-managment/,
    /^\/dashboard\/admin\/order-managment/,
    /^\/dashboard\/admin\/blog-managment/,
  ],
  admin: [/.*/], // admin can access everything
};

// Public routes
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Get token from cookies
  const token = request.cookies.get("refreshToken")?.value;

  console.log({token})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userInfo: any = null;
  if (token) {
    try {
      userInfo = jwtDecode(token);
    } catch {
      userInfo = null;
    }
  }

  console.log({userInfo})
  
  //  Redirect logged-in users away from public routes
  if (publicRoutes.includes(pathname) && userInfo?.role) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //  Allow public routes if not logged in
  if (publicRoutes.includes(pathname) && !userInfo) {
    return NextResponse.next();
  }


  //  Not logged in → redirect to login
  if (!userInfo?.role) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  const role = userInfo.role as keyof typeof roleBasedRoutes;

  //  Admin = full access
  if (role === "admin") {
    return NextResponse.next();
  }

  //  Check allowed routes for user/staff
  const allowedRoutes = roleBasedRoutes[role] || [];
  if (allowedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // ❌ Unauthorized → home
  return NextResponse.redirect(new URL("/", request.url));
}

// Protect only required routes
export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
