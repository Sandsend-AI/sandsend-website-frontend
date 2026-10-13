import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
