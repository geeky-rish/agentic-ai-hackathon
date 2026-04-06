import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/agentic-ai-hackathon' : '',
  assetPrefix: isGithubPages ? '/agentic-ai-hackathon/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
