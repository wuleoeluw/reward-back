import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/reward-back",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
