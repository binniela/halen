# Halen — Premium-Brand SEO Strategy

> Brief: optimise like Aesop / Flamingo Estate / Graza / Salt & Straw — **not** a generic
> ecommerce store. Goal is **maximum *qualified* organic traffic** from people likely to buy a
> luxury finishing salt, balancing brand perception, organic growth, conversion, and editorial
> storytelling. No keyword stuffing, thin content, or generic AI posts.

## The thesis

Halen does not win by out-publishing Amazon or McCormick. It wins the way Graza won olive oil and
Flamingo Estate won "luxury pantry": **a small body of genuinely excellent, branded, editorial
content that owns a specific taste-led territory** — fleur de sel, finishing salt, provenance, and
the ritual of the table — and converts a high-intent reader into a reservation.

Every page must do three things at once: rank for a real query, read like the brand wrote it
(not an SEO tool), and move the reader one step toward a jar. Pages that can't do all three
don't get made.

---

## 1. Complete site architecture

```
/                                   Home — cinematic landing (Product, FAQ, Journal teaser)
/journal                            The Journal — editorial hub  ✅ built
  /journal/fleur-de-sel             Field Guide (pillar)         ✅ built
  /journal/aegean-salt-pans         Provenance (E-E-A-T)         ✅ built
  /journal/a-pinch-off-the-heat     The Ritual (use-case)        ✅ built
  /journal/[+ roadmap pieces]       → see §3
/fleur-de-sel        (optional)     Evergreen guide route (can alias the pillar)
/finishing-salt      (optional)     Category landing as the line grows
/gourmet-salt        (optional)     Commercial collection as SKUs grow
robots.txt · sitemap.xml · manifest.webmanifest · opengraph-image   ✅ built
```

**Editorial-first IA, on purpose.** Premium brands file content under a *Journal*, not a `/blog`.
It signals craft over content-marketing and keeps the URL taxonomy calm. Commercial collection
routes (`/gourmet-salt`, gift sets) come online only when there's more than one SKU — until then,
forcing them would create thin pages.

**What's already implemented in code (this session):**
- The Journal system (registry → hub → SSG article routes), 3 written cornerstone pieces.
- Correct per-page JSON-LD scoping (WebSite/Organization global; WebPage/Product/FAQ/Article/
  CollectionPage page-scoped).
- Internal linking: home → Journal teaser, nav + footer → Journal, article ↔ article (related),
  every article → Reserve.
- Sitemap auto-includes every article; breadcrumbs on all interior pages.

---

## 2. Topical authority map (premium-angled)

Nine territories, mapped to the brand's voice. Each "theme" is a cluster; the **pillar** is the
authority anchor and the spokes deepen it. (Full keyword-level map with volume/intent estimates:
[topical-authority-map.md](topical-authority-map.md).)

| # | Territory | Pillar | Brand role |
|---|---|---|---|
| 1 | **Fleur de sel** | Fleur de Sel: A Field Guide ✅ | Defines the product category — highest relevance |
| 2 | **Finishing salt** | What Finishing Salt Is (and Isn't) | Captures the buying category |
| 3 | **Flaky sea salt** | Flaky Sea Salt, Explained | Texture-led, comparison magnet |
| 4 | **Mediterranean sea salt** | The Salt Pans of the Aegean ✅ | Provenance moat — hard to copy |
| 5 | **Premium / gourmet salt** | Is Expensive Salt Worth It? | Commercial-investigation, money pages |
| 6 | **Gourmet cooking** | Seasoning, the Last Step | Aspirational, chef-adjacent |
| 7 | **Chef techniques** | What Chefs Know About Salt | Authority + reach |
| 8 | **Ingredient quality** | Reading a Salt Label | Trust / E-E-A-T, differentiator |
| 9 | **Culinary rituals** | A Pinch, Off the Heat ✅ | Conversion-driving use-cases |

Authority flows: Theme 4 (provenance) and Theme 8 (ingredient quality) are the **defensible moats**
— competitors with a mined or blended product literally cannot write them truthfully. Lead there.

---

## 3. The 25 highest-value pages

Ranked by **(qualified intent × winnability for a premium newcomer)**, not raw volume.
Status: ✅ built · ◗ next · ○ roadmap. Type: GUIDE / COMPARISON / RITUAL / PROVENANCE / COMMERCIAL.

| # | Page | Type | Primary query | Intent | Priority |
|---|---|---|---|---|---|
| 1 | Fleur de Sel: A Field Guide | GUIDE | fleur de sel | INFO→COMM | ✅ |
| 2 | The Salt Pans of the Aegean | PROVENANCE | Mediterranean / Aegean sea salt | INFO | ✅ |
| 3 | A Pinch, Off the Heat | RITUAL | how to use finishing salt | USE | ✅ |
| 4 | Fleur de Sel vs Maldon | COMPARISON | fleur de sel vs Maldon | COMM | ◗ |
| 5 | What Finishing Salt Is (and Isn't) | GUIDE | finishing salt | INFO→COMM | ◗ |
| 6 | The Best Salt for Steak | RITUAL | best salt for steak | USE/COMM | ◗ |
| 7 | Sea Salt vs Table Salt | COMPARISON | sea salt vs table salt | INFO | ◗ |
| 8 | Is Expensive Salt Worth It? | COMMERCIAL | is expensive salt worth it | COMM | ◗ |
| 9 | Flaky Sea Salt, Explained | GUIDE | flaky sea salt | INFO | ◗ |
| 10 | What Chefs Know About Salt | GUIDE | what salt do chefs use | COMM | ○ |
| 11 | Fleur de Sel vs Sea Salt | COMPARISON | fleur de sel vs sea salt | INFO | ○ |
| 12 | Finishing Salt for Chocolate & Caramel | RITUAL | salt for chocolate | USE | ○ |
| 13 | Reading a Salt Label | GUIDE | unrefined vs refined salt | INFO | ○ |
| 14 | Cooking Salt vs Finishing Salt | COMPARISON | cooking salt vs finishing salt | COMM | ○ |
| 15 | A Fleur de Sel Substitute (and when none works) | GUIDE | fleur de sel substitute | INFO | ○ |
| 16 | How Fleur de Sel Is Made | PROVENANCE | how is fleur de sel made | INFO | ○ |
| 17 | When to Salt Meat | RITUAL | when to salt meat | INFO/USE | ○ |
| 18 | Sea Salt vs Kosher Salt | COMPARISON | sea salt vs kosher salt | INFO | ○ |
| 19 | The Best Maldon Alternatives | COMMERCIAL | Maldon alternatives | COMM | ○ |
| 20 | Greek Sea Salt: A Tradition | PROVENANCE | Greek sea salt | INFO | ○ |
| 21 | Finishing Salt for Seafood & Vegetables | RITUAL | salt for fish / vegetables | USE | ○ |
| 22 | Coarse vs Fine vs Flaked Salt | COMPARISON | coarse vs fine sea salt | INFO | ○ |
| 23 | Salt & the Mediterranean Table | GUIDE | Mediterranean cooking salt | INFO | ○ |
| 24 | The Gourmet Salt Gift Guide | COMMERCIAL | gourmet salt gift | TXN | ○ (seasonal) |
| 25 | Chef-Grade Salt: What It Actually Means | GUIDE | chef-grade salt | COMM | ○ |

---

## 4. Internal linking recommendations

Principles (premium = sparse, deliberate links with editorial anchor text — never a link farm):

- **One pillar per theme is the link sink.** Every spoke links up to its pillar; the pillar links
  down to spokes from within prose, not a "related posts" widget.
- **Provenance + ingredient-quality pages are the authority sources** — link *from* them into
  commercial/comparison pages to pass trust toward the money pages.
- **Home → pillars.** The homepage (your strongest page) links to the 3 cornerstone pieces via the
  Journal teaser. ✅ Keep the teaser pointed at current pillars.
- **Comparisons link to both entities + the product**, positioning Halen as the considered pick,
  never with forced "buy now" anchors.
- **Every page carries exactly one Reserve CTA** and one in-prose product mention — no more (luxury
  restraint; over-CTA'd pages read cheap).
- **Cross-theme bridges**: `Best Salt for Steak` → Fleur de Sel guide + What Finishing Salt Is;
  `Is Expensive Salt Worth It` → The Salt Pans + Reading a Salt Label (trust → justify price).
- Add each new URL to `sitemap.ts` (the registry does this automatically for `/journal/*`).

Anchor-text rule: descriptive and natural ("hand-raked fleur de sel from the Aegean"), never exact-
match stuffing ("buy fleur de sel online").

---

## 5. Content briefs (all 25)

Format: **Angle · Key sections · Words · Schema · Internal links · Conversion**. Briefs 1–3 are
already executed; included for completeness of the system.

**1. Fleur de Sel: A Field Guide** ✅ — Angle: definitive, calm explainer. Sections: what it is /
how it forms / vs table·sea·flake / taste / use / storage. 1,000w. Article+Breadcrumb. → Aegean
pans, A Pinch, Reserve. Conv: soft CTA after "how to use".

**2. The Salt Pans of the Aegean** ✅ — Angle: provenance narrative. Sections: geography / the
summer / by hand / single-origin / sealed. 800w. Article+Breadcrumb. → Fleur de Sel, A Pinch,
Reserve. Conv: "first harvest is small" scarcity CTA.

**3. A Pinch, Off the Heat** ✅ — Angle: the gesture, not a recipe dump. Sections: rule / where it
sings / how much / what to look for. 800w. Article+Breadcrumb. → Fleur de Sel, Aegean pans,
Reserve. Conv: end-of-use CTA.

**4. Fleur de Sel vs Maldon** ◗ — Angle: honest, respectful comparison (Maldon is great; here's the
difference). Sections: origin / crystal / taste / price / best-for / verdict table. 1,100w.
Article + a comparison table + Breadcrumb (consider Product references, no fake ratings). → Fleur
de Sel guide, Best Maldon Alternatives, Reserve. Conv: "if you want X, choose Halen" verdict CTA.

**5. What Finishing Salt Is (and Isn't)** ◗ — Angle: category pillar. Sections: definition /
finishing vs cooking salt / types / when to use / how to buy. 1,300w. Article+FAQ+Breadcrumb.
→ all ritual spokes, Fleur de Sel, Reserve. Conv: buyer's-guide CTA block.

**6. The Best Salt for Steak** ◗ — Angle: the two-salt method (season with one, finish with
another). Sections: why two salts / for cooking / for finishing / timing / mistakes. 1,000w.
Article+HowTo+Breadcrumb. → A Pinch, Finishing Salt, Reserve. Conv: high — buyer intent; product as
the finisher.

**7. Sea Salt vs Table Salt** ◗ — Angle: the honest primer (incl. "is it healthier?" handled
carefully, no medical claims). Sections: how each is made / additives / taste / cooking / health
note. 1,100w. Article+FAQ+Breadcrumb. → Fleur de Sel, Reading a Salt Label, Reserve. Conv: low-
pressure; trust-builder feeding pillars.

**8. Is Expensive Salt Worth It?** ◗ — Angle: brand-defining POV piece. Sections: what you pay for
(provenance, labour, scarcity) / when it's *not* worth it / how to taste the difference. 1,000w.
Article+Breadcrumb. → Aegean pans, Reading a Salt Label, Reserve. Conv: justify-the-price CTA.

**9. Flaky Sea Salt, Explained** ◗ — Angle: texture territory. Sections: what makes a flake / fleur
de sel vs manufactured flakes / uses / brands to know. 900w. Article+Breadcrumb. → Fleur de Sel,
vs Maldon, Reserve.

**10. What Chefs Know About Salt** ○ — Angle: technique authority (seasoning in layers, finishing
last). Sections: seasoning theory / the finish / what's in pro kitchens. 1,100w. Article+Breadcrumb.
→ A Pinch, Best Salt for Steak, Reserve. Conv: aspirational.

**11. Fleur de Sel vs Sea Salt** ○ — Comparison; crystal/harvest/use; 800w; Article+Breadcrumb; →
pillar, A Pinch, Reserve.

**12. Finishing Salt for Chocolate & Caramel** ○ — Ritual; salt+sweet science, where to use; 700w;
Article+HowTo+Breadcrumb; → A Pinch, Reserve. Conv: gifting bridge.

**13. Reading a Salt Label** ○ — Ingredient-quality moat; additives, "natural" claims, what to
avoid; 900w; Article+Breadcrumb; → Is Expensive Salt Worth It, Aegean pans, Reserve. Conv: trust.

**14. Cooking Salt vs Finishing Salt** ○ — Comparison/role clarity; 700w; Article+Breadcrumb; →
What Finishing Salt Is, A Pinch, Reserve.

**15. A Fleur de Sel Substitute** ○ — Honest "use flaky salt / Maldon; here's what you lose"; 700w;
Article+Breadcrumb; → Fleur de Sel, vs Maldon, Reserve. (High intent, captures substitution
searchers.)

**16. How Fleur de Sel Is Made** ○ — Provenance/process; evaporation→bloom→rake; 800w; Article+
Breadcrumb; → Aegean pans, Fleur de Sel, Reserve.

**17. When to Salt Meat** ○ — Technique, high volume; before/after, dry-brine, finish; 1,000w;
Article+Breadcrumb; → Best Salt for Steak, A Pinch, Reserve.

**18. Sea Salt vs Kosher Salt** ○ — Comparison; grain/use/measuring; 900w; Article+Breadcrumb; →
Sea Salt vs Table Salt, Reserve.

**19. The Best Maldon Alternatives** ○ — Commercial listicle done with taste (honest field incl.
Halen positioned, no faked #1); 1,100w; Article+ItemList+Breadcrumb; → vs Maldon, Flaky Sea Salt,
Reserve. Conv: high.

**20. Greek Sea Salt: A Tradition** ○ — Provenance/culture; 800w; Article+Breadcrumb; → Aegean pans,
Mediterranean Table, Reserve.

**21. Finishing Salt for Seafood & Vegetables** ○ — Ritual; 700w; Article+HowTo+Breadcrumb; →
A Pinch, Reserve.

**22. Coarse vs Fine vs Flaked Salt** ○ — Comparison/format guide; 800w; Article+Breadcrumb; →
Flaky Sea Salt, Cooking vs Finishing, Reserve.

**23. Salt & the Mediterranean Table** ○ — Culture/lifestyle; 900w; Article+Breadcrumb; → Aegean
pans, Greek Sea Salt, Reserve.

**24. The Gourmet Salt Gift Guide** ○ (seasonal) — Commercial/gifting; 800w; Article+ItemList+
Breadcrumb; → Is Expensive Salt Worth It, Reserve/gift. Conv: transactional, Q4.

**25. Chef-Grade Salt: What It Actually Means** ○ — Myth-bust + standards; 800w; Article+Breadcrumb;
→ What Chefs Know, Reading a Salt Label, Reserve.

---

## 6. Schema recommendations (by page type)

- **Home**: WebPage + Product (Offer, PreOrder, priceValidUntil, countryOfOrigin) + FAQPage +
  Breadcrumb. ✅ implemented. Add **Review/AggregateRating only when real reviews exist** — never
  fabricate (manual-action risk; anti-E-E-A-T).
- **Journal hub**: CollectionPage + ItemList + Breadcrumb. ✅
- **Articles**: Article (author/publisher = Organization by @id, datePublished/Modified,
  articleSection, about → Product) + Breadcrumb. ✅
- **HowTo** on ritual/technique pages (Best Salt for Steak, chocolate, seafood) — steps as HowToStep.
- **Comparison pages**: keep Article + a real HTML comparison table; reference both products by name.
  Avoid marking up competitor products with ratings.
- **Site-wide**: WebSite + Organization (logo, slogan; add `sameAs` once socials exist). ✅
- When a real storefront ships: Product `availability` → InStock, add `shippingDetails` +
  `hasMerchantReturnPolicy`, and Offer `priceСurrency`/`price` from live data.

---

## 7. Conversion opportunities (per page archetype)

The reservation (email capture, no payment) is the conversion. Match the CTA to the reader's
mindset — luxury converts through desire and trust, not urgency banners.

- **Guides (TOFU)** → soft CTA after the "how to use" moment: *"Halen is fleur de sel from one
  Aegean coastline — reserve a jar."* Goal: capture, not push.
- **Provenance** → scarcity-as-truth: *"The first harvest is small."* Highest brand-trust converter.
- **Ritual / use-case (MOFU→BOFU)** → contextual CTA tied to the dish just described. Best CTR.
- **Comparisons (COMM)** → verdict CTA: *"If you want a single-origin, hand-raked finish, choose
  Halen."* Decision-stage.
- **Commercial / gift** → transactional CTA + gift framing; seasonal urgency acceptable here only.
- **Across all**: one CTA, one in-prose product link, generous whitespace. Measure assisted
  conversions (these pages *influence* the reservation, they rarely close it on first visit) — judge
  them on qualified-visit → reservation rate, not last-click.

---

## Build cadence (premium pace)

**2 excellent pieces per month**, not 20 thin ones. Order: finish the ◗ "next" set (4–9) over the
first quarter — they're the winnable, high-intent core — then work the ○ roadmap by theme,
leading with the provenance and ingredient-quality moats competitors can't copy.

Validate the top ~15 target queries with real keyword data before committing (volume/difficulty),
and submit `sitemap.xml` in Search Console + Bing on launch day with the real domain set via
`NEXT_PUBLIC_SITE_URL`.
