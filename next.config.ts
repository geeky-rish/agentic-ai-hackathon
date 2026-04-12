import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard Vercel configuration
  // No static export needed for Vercel unless explicitly building a static-only site
  output: "export",
  images: {
    // Keep unoptimized for now to prevent potential Vercel Image Optimization limits/errors if not set up properly, or you can remove it. Let's keep it safe.
    unoptimized: true,
  },
};

export default nextConfig;
