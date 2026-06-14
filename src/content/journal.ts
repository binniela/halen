/**
 * The Journal — editorial registry. Metadata-only (no React imports) so it can
 * be consumed by the sitemap, schema, and metadata generators as well as the
 * hub and article pages. Article *bodies* live in ./articles.
 *
 * This is the spine of Halen's topical authority: each entry is a real, written
 * piece — not a templated stub. New pieces are added here and nowhere else.
 */

export type JournalCategory =
  | "Field Guide"
  | "Provenance"
  | "The Ritual"
  | "Comparison"
  | "On Value";

export type Article = {
  slug: string;
  /** Eyebrow label shown above the title. */
  kicker: string;
  /** H1 / base SEO title. */
  title: string;
  /** Subtitle / dek — also used as the hub excerpt. */
  dek: string;
  /** Meta description (≤ ~158 chars). */
  description: string;
  category: JournalCategory;
  /** Author slug — see ./authors. */
  author: string;
  readingMinutes: number;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  keywords: string[];
  /** Poster image used for OG + the on-page lede image. */
  image: string;
  /** Slugs of related pieces (powers internal linking + schema). */
  related: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "fleur-de-sel-vs-maldon",
    kicker: "Comparison",
    title: "Fleur de Sel vs Maldon",
    dek: "Two of the great finishing salts — and the quiet difference between a crystal grown by the sun and one coaxed by heat.",
    description:
      "Fleur de sel vs Maldon: how each finishing salt is made, how the crystals taste and behave on food, and which to reach for — an honest comparison.",
    category: "Comparison",
    author: "halen-editorial",
    readingMinutes: 7,
    datePublished: "2026-06-12",
    dateModified: "2026-06-13",
    keywords: [
      "fleur de sel vs maldon",
      "maldon vs fleur de sel",
      "best finishing salt",
      "maldon alternatives",
      "flaky sea salt",
    ],
    image: "/videos/clip-c-poster.jpg",
    related: ["fleur-de-sel", "is-expensive-salt-worth-it"],
  },
  {
    slug: "best-salt-for-steak",
    kicker: "The Ritual",
    title: "The Best Salt for Steak",
    dek: "Seasoning a steak is two jobs, not one. Most cooks only do the first.",
    description:
      "The best salt for steak: why great cooks use two salts — one to season for the cook, one to finish for the eat — with timing, method, and the mistakes to avoid.",
    category: "The Ritual",
    author: "halen-editorial",
    readingMinutes: 6,
    datePublished: "2026-06-11",
    dateModified: "2026-06-13",
    keywords: [
      "best salt for steak",
      "salt for steak",
      "finishing salt steak",
      "how to season steak",
      "flaky salt steak",
    ],
    image: "/videos/clip-b-poster.jpg",
    related: ["a-pinch-off-the-heat", "fleur-de-sel"],
  },
  {
    slug: "is-expensive-salt-worth-it",
    kicker: "On Value",
    title: "Is Expensive Salt Worth It?",
    dek: "All salt is sodium chloride. So what, exactly, are you paying for — and when is it worth it?",
    description:
      "Is expensive salt worth it? An honest look at what provenance, hand-harvesting and purity actually buy — when premium finishing salt earns its price, and when it doesn't.",
    category: "On Value",
    author: "halen-editorial",
    readingMinutes: 6,
    datePublished: "2026-06-10",
    dateModified: "2026-06-13",
    keywords: [
      "is expensive salt worth it",
      "expensive salt",
      "premium salt",
      "gourmet salt worth it",
      "why is fleur de sel expensive",
    ],
    image: "/videos/clip-a-poster.jpg",
    related: ["aegean-salt-pans", "fleur-de-sel-vs-maldon"],
  },
  {
    slug: "fleur-de-sel",
    kicker: "Field Guide",
    title: "Fleur de Sel: A Field Guide",
    dek: "The most prized of finishing salts — what it is, how it forms, and why a pinch changes everything.",
    description:
      "A field guide to fleur de sel: how the crystals form, how they differ from sea and table salt, and how to use the most prized finishing salt.",
    category: "Field Guide",
    author: "halen-editorial",
    readingMinutes: 6,
    datePublished: "2026-06-02",
    dateModified: "2026-06-13",
    keywords: [
      "fleur de sel",
      "what is fleur de sel",
      "finishing salt",
      "flaky sea salt",
      "fleur de sel vs sea salt",
    ],
    image: "/videos/clip-c-poster.jpg",
    related: ["aegean-salt-pans", "a-pinch-off-the-heat"],
  },
  {
    slug: "aegean-salt-pans",
    kicker: "Provenance",
    title: "The Salt Pans of the Aegean",
    dek: "One stretch of Greek coastline, a single summer, and the slow work of taking salt by hand.",
    description:
      "Where Halen comes from: the Aegean salt pans of Greece, the summer harvest, and the hand-raking that makes single-origin fleur de sel.",
    category: "Provenance",
    author: "halen-editorial",
    readingMinutes: 5,
    datePublished: "2026-06-05",
    dateModified: "2026-06-13",
    keywords: [
      "Mediterranean sea salt",
      "Aegean sea salt",
      "Greek sea salt",
      "single-origin salt",
      "hand-harvested salt",
    ],
    image: "/videos/clip-a-poster.jpg",
    related: ["fleur-de-sel", "a-pinch-off-the-heat"],
  },
  {
    slug: "a-pinch-off-the-heat",
    kicker: "The Ritual",
    title: "A Pinch, Off the Heat",
    dek: "Finishing salt is a last gesture, not an ingredient. Where to use it, and when to stop.",
    description:
      "How to use finishing salt: a cook's guide to seasoning at the table — on tomatoes, fish, butter, chocolate and more, added off the heat.",
    category: "The Ritual",
    author: "halen-editorial",
    readingMinutes: 5,
    datePublished: "2026-06-09",
    dateModified: "2026-06-13",
    keywords: [
      "how to use finishing salt",
      "salt for steak",
      "salt for cooking",
      "finishing salt for chocolate",
      "chef techniques",
    ],
    image: "/videos/clip-b-poster.jpg",
    related: ["fleur-de-sel", "aegean-salt-pans"],
  },
];

export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

/** Newest first — used by the hub. */
export const articlesByDate = () =>
  [...ARTICLES].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
