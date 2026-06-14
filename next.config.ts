import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Baseline security headers — harmless to SEO, good hygiene.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // The hero/product clips are large and immutable between deploys;
        // cache them hard so repeat visits hit the LCP frame instantly.
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
