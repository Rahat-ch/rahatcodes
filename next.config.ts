import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is static, so the build is plain files in out/, served by nginx
  // (see Dockerfile) and cacheable at Cloudflare's edge.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
