import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
  {
    protocol: "https",
    hostname: "coachtech-matter.s3.ap-northeast-1.amazonaws.com",
  },
  {
    protocol: "http",
    hostname: "localhost",
    pathname: "/storage/**",
  },
    ],
  },
};

export default nextConfig;
