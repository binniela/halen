import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/** Web app manifest — installability + cleaner mobile/browser surface. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description:
      "Single-origin Aegean fleur de sel, hand-harvested in Greece and dried by sun alone.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfdfd",
    theme_color: "#16263f",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
    ],
  };
}
