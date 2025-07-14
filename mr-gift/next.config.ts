import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Removed static export for Clerk authentication
  images: {
    unoptimized: true
  }
};

export default nextConfig;
