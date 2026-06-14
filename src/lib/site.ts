/**
 * Single source of truth for site-wide SEO constants and structured content.
 * Imported by layout (metadata + JSON-LD), robots, sitemap, manifest, and the
 * page (FAQ section) so on-page content and schema can never drift apart.
 */

// IMPORTANT: set NEXT_PUBLIC_SITE_URL to the real production domain before
// deploy. The previous hardcoded "https://halen.salt" used a non-existent TLD,
// which silently produced invalid canonical/OG/sitemap URLs. Everything below
// derives from this one value.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://halensalt.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Halen";
export const SITE_TAGLINE = "Aegean Sea Salt";
export const SITE_LOCALE = "en_GB";

export const PRODUCT = {
  name: "Halen Fleur de Sel",
  sku: "HALEN-FDS-125",
  price: "24.00",
  currency: "USD",
  priceDisplay: "$24",
  weightGrams: 125,
  weightDisplay: "125g · 4.4oz",
  origin: "Aegean coast, Greece",
  // The jar still from the cinematic stage doubles as the product image.
  image: "/videos/clip-c-poster.jpg",
} as const;

/** Trust markers shown on the product section — claims, not badges. */
export const TRUST_MARKERS = [
  "Single-Origin",
  "Hand Harvested",
  "Greek Coast",
  "Limited First Harvest",
] as const;

/**
 * Real customer testimonials. NOTE: the `name` attributions below are
 * placeholders inserted during the build — replace each with the actual
 * customer's real name (and, if you have it, a city) before publishing so the
 * real quotes are correctly attributed.
 */
export const TESTIMONIALS = [
  {
    quote:
      "I didn't think salt could make this much of a difference until I tried Halen. The texture is what surprised me most — light, delicate flakes that add the perfect crunch without overpowering the food. It's become the finishing touch on everything from steaks to sourdough.",
    name: "Maya", // TODO: replace with real customer name
  },
  {
    quote:
      "Every detail feels premium. From the packaging to the crystal structure itself, Halen feels more like a luxury pantry staple than a seasoning. Guests constantly ask what makes the food taste so good.",
    name: "James", // TODO: replace with real customer name
  },
  {
    quote:
      "I originally tried Halen as a gift for someone and immediately wanted a jar for myself. It looks beautiful on the counter and instantly elevates even the simplest meals. One of those rare things that actually exceeds expectations.",
    name: "Sofia", // TODO: replace with real customer name
  },
] as const;

/** Absolute URL helper. */
export const abs = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Genuine, search-intent-aligned Q&A. Rendered as a visible FAQ section AND
 * emitted as FAQPage JSON-LD from the same array — Google requires the marked-up
 * answer to match the on-page text, so they share this source.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is fleur de sel?",
    a: "Fleur de sel — “flower of salt” — is the delicate first layer of crystals that blooms on the surface of a salt pan and is skimmed by hand. It is the most prized finishing salt: light, flaked crystals with a clean, briny taste that you add at the table rather than cook into a dish.",
  },
  {
    q: "How is Halen different from ordinary table salt?",
    a: "Table salt is mined, ground to a uniform powder, and usually treated with anti-caking agents and added iodine. Halen is unrefined Aegean sea salt with nothing added or removed — only the crystals the summer sun and sea leave behind, raked by hand and dried by light alone.",
  },
  {
    q: "How do you use a finishing salt?",
    a: "Add a small pinch off the heat, just before serving — on sliced tomatoes, grilled fish, roasted vegetables, fresh butter, even dark chocolate or caramel. The crystals are meant to be tasted, not dissolved, so they bring brief bursts of brightness and texture to a finished plate.",
  },
  {
    q: "Where does Halen come from?",
    a: "Every jar is hand-harvested from salt pans on the Aegean coast of Greece and dried by sun alone. It is single-origin and traceable to one stretch of coastline — not blended from multiple sources.",
  },
  {
    q: "What is in the jar — is anything added?",
    a: "Only sea salt. No anti-caking agents, no bleaching, no additives of any kind. The crystals are whole and never ground, so what reaches your table is exactly what the pan gave up.",
  },
  {
    q: "How much is it, and when does it ship?",
    a: "A 125g jar is $24. The inaugural harvest is small and reserved in advance — add your email to reserve a jar and we will write to you the moment reservations open. There is no payment now; nothing is charged until the first jars ship.",
  },
];
