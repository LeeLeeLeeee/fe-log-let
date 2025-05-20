import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  basePath: "/app",
  assetPrefix: "/app",
  publicRuntimeConfig: {
    assetPrefix: "/app",
  },
};

export default nextConfig;
