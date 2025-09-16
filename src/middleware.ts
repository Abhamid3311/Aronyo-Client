import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

// Role Type
type Role = keyof typeof roleBasedRoutes;
const authRoututes = ["/login", "/register"];
const sharedRoutes = [/^\/dashboard/];

const roleBasedRoutes = {
  user: [
    /^\/dashboard/, //  allow dashboard + all subpages
    /^\/order-history/,
    /^\/cart/,
    /^\/wishlist/,
  ],
  staff: [
    /^\/dashboard/, //  allow dashboard + all subpages
  ],
  admin: [
    /^\/dashboard/, // already allows dashboard + subpages
    /^\/order-history/,
  ],
};

export const middleware = async (request: NextRequest) => {
  // Get Path Name
  const { pathname } = request.nextUrl;

  // Get User Info
  const token = request.cookies.get("refreshToken")?.value;
  let userInfo = null;

  if (token) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userInfo = jwtDecode(token) as any;
      console.log("User info:", userInfo);
    } catch (error) {
      console.log("Invalid token:", error);
      userInfo = null;
    }
  }

  // Check Path and User Info
  if (!userInfo) {
    if (authRoututes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/login?redirectPath=${pathname}`
        )
      );
    }
  }

  if (sharedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // Check Role
  if (userInfo?.role && roleBasedRoutes[userInfo.role as Role]) {
    const routes = roleBasedRoutes[userInfo.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    // Auth routes
    "/login",
    "/register",
    // Protected Outside routes
    "/cart",
    "/wishlist",
    // Protected Outside routes
    "/dashboard/:path*",
  ],
};
