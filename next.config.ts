import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["127.0.0.1", "dialisisconnect.site"], 
  },
  async rewrites() {
    return [
      {
        source: "/api/pdf/:path*", 
        destination: "https://dialisisconnect.site/:path*", 
      },
    ];
  },
};

export default nextConfig;
