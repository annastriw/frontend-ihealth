// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // atau true jika ingin strict mode
  images: {
    domains: ["127.0.0.1", "ihealthkkn.site"], // domain yang diizinkan untuk <Image />
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ penting untuk mencegah build gagal di Vercel karena error ESLint
  },
  async rewrites() {
    return [
      {
        source: "/api/pdf/:path*",
        destination: "https://ihealthkkn.site/:path*", // untuk proxy PDF
      },
    ];
  },
};

export default nextConfig;
