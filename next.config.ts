import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any host
      },
      {
        protocol: "http",
        hostname: "**", // if you also want to allow http
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com", // Corrected hostname
        pathname: "/**", // Allows all paths under ibb.co
      },
    ],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/api/v1/:path*",
          destination: "https://aronyo-backend.onrender.com/api/v1/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
