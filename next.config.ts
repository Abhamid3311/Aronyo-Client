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
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
