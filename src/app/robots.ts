import type { MetadataRoute } from "next";
import { SITE_URL, abs } from "@/lib/site";

/** Generates /robots.txt. Open to all crawlers; points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next dev/build internals — keep them out of the index.
        disallow: ["/_next/"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: SITE_URL,
  };
}
