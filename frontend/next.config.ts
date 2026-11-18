import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5142/api/:path*",
      },
    ];
  },
};

export default nextConfig;
