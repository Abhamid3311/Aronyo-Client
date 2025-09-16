import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Role Type
type Role = keyof typeof roleBasedRoutes;

// Routes that don't require authentication
const authRoutes = ["/login", "/register"];

// Role-based protected routes
const roleBasedRoutes = {
  user: [/^\/dashboard/, /^\/order-history/, /^\/cart/, /^\/wishlist/],
  staff: [/^\/dashboard/],
  admin: [/^\/dashboard/, /^\/order-history/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  console.log("=== Middleware Debug ===");
  console.log("Pathname:", pathname);

  // Skip middleware for auth routes
  if (authRoutes.includes(pathname)) {
    console.log("Auth route, allowing access");
    return NextResponse.next();
  }

  // Get token and user info
  const token = request.cookies.get("refreshToken")?.value;
  console.log("Token exists:", !!token);

  let userInfo = null;

  if (token) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userInfo = jwtDecode(token) as any;
      console.log("User info:", userInfo);

      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (userInfo.exp && userInfo.exp < currentTime) {
        console.log("Token expired");
        userInfo = null;
      }
    } catch (error) {
      console.log("Invalid token:", error);
      userInfo = null;
    }
  }

  // If no valid user info, redirect to login
  if (!userInfo) {
    console.log("No valid user info, redirecting to login");
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }

  // Check if user has access to the requested route
  const userRole = userInfo.role as Role;
  console.log("User role:", userRole);

  if (userRole && roleBasedRoutes[userRole]) {
    const allowedRoutes = roleBasedRoutes[userRole];
    const hasAccess = allowedRoutes.some((route) => pathname.match(route));

    console.log("Has access:", hasAccess);

    if (hasAccess) {
      console.log("Access granted, proceeding");
      return NextResponse.next();
    }
  }

  // If no access, redirect to home
  console.log("No access, redirecting to home");
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
