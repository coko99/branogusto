import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Cursor otvara sajt preko 127.0.0.1, a dev server inače dozvoljava samo localhost.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
