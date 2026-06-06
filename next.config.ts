import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  // Merge our push handler into the generated SW
  customWorkerSrc: "public",
  customWorkerDest: "public",
  workboxOptions: {
    disableDevLogs: true,
    importScripts: ["/sw-push.js"],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "@react-three/drei"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default withPWA(withNextIntl(nextConfig));
