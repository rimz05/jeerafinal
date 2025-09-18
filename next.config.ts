import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables build failing on ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // optional: disable TS build errors too
  },
};

export default nextConfig;
