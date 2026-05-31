import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.githubusercontent.com" },
      { protocol: "https", hostname: "www.sacred-texts.com" },
    ],
  },
};

export default nextConfig;
