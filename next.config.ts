import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/agentic-ai-hackathon',
  assetPrefix: '/agentic-ai-hackathon/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
