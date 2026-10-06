import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image Coolify deploys (see Dockerfile).
  output: "standalone",
};

export default nextConfig;
