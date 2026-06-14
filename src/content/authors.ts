/**
 * Author registry. A luxury publication has a byline — but we attribute
 * honestly. The default voice is the in-house editorial desk (an editorial
 * collective, schema-typed as the Organization). When a real named contributor
 * writes a piece, add them here with `type: "person"` and a genuine bio, and the
 * Article/ProfilePage schema will emit a Person rather than the Organization.
 *
 * Do not invent fictitious people with fabricated credentials — it is both an
 * E-E-A-T risk and against the brand.
 */

export type Author = {
  slug: string;
  /** "editorial" → attributed to the Organization; "person" → a real human byline. */
  type: "editorial" | "person";
  name: string;
  /** Short role shown under the name. */
  role: string;
  /** One-line intro for bylines and cards. */
  short: string;
  /** Full bio for the author page. */
  bio: string;
};

export const AUTHORS: Author[] = [
  {
    slug: "halen-editorial",
    type: "editorial",
    name: "Halen Editorial",
    role: "The Halen Editors",
    short:
      "The in-house editorial desk, writing on salt, provenance, and the table.",
    bio: "Halen Editorial is the brand's in-house desk — a small group writing about salt and the craft around it: how fleur de sel forms, where it comes from, and how a single pinch changes a plate. Everything here is reported from the source: one stretch of the Aegean coast, one annual harvest, taken by hand.",
  },
];

export const getAuthor = (slug: string) =>
  AUTHORS.find((a) => a.slug === slug);
