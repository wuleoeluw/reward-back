import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  ...(isProduction && {
    output: "export",
    basePath: "/reward-back",
  }),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? "/reward-back" : "",
  },
};

export default nextConfig;
