import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { ARTICLES } from "@/content/journal";
import { AUTHORS } from "@/content/authors";

/** Generates /sitemap.xml from the homepage, the Journal, articles, and authors. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: abs("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: abs("/journal"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ARTICLES.map((a) => ({
      url: abs(`/journal/${a.slug}`),
      lastModified: new Date(a.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...AUTHORS.map((a) => ({
      url: abs(`/journal/authors/${a.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
