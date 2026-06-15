import Reveal from "./reveal";
import SiteNav from "./site-nav";
import CinematicStage from "./cinematic-stage";
import SiteFooter from "./site-footer";
import ReserveButton from "./_components/reserve-button";
import ReservationModal from "./_components/reservation-modal";
import StickyCta from "./_components/sticky-cta";
import TrackOnView from "./_components/track-on-view";
import Photo from "./_components/photo";
import Link from "next/link";
import { FAQS, PRODUCT, TRUST_MARKERS, TESTIMONIALS, SITE_NAME, abs } from "@/lib/site";
import { articlesByDate } from "@/content/journal";

// One year out — keeps the Product offer's priceValidUntil from going stale.
const priceValidUntil = new Date(Date.now() + 365 * 864e5)
  .toISOString()
  .slice(0, 10);

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": abs("/#webpage"),
      url: abs("/"),
      name: "Halen — Aegean Fleur de Sel",
      isPartOf: { "@id": abs("/#website") },
      about: { "@id": abs("/#product") },
      primaryImageOfPage: { "@id": abs("/#primaryimage") },
      inLanguage: "en",
    },
    {
      "@type": "ImageObject",
      "@id": abs("/#primaryimage"),
      url: abs("/opengraph-image"),
      width: 1200,
      height: 630,
    },
    {
      "@type": "Product",
      "@id": abs("/#product"),
      name: PRODUCT.name,
      category: "Sea salt",
      description:
        "Single-origin fleur de sel, hand-harvested from the Aegean coast of Greece and dried by sun alone. Unrefined, additive-free finishing salt.",
      brand: { "@type": "Brand", name: SITE_NAME },
      sku: PRODUCT.sku,
      image: abs(PRODUCT.image),
      countryOfOrigin: { "@type": "Country", name: "Greece" },
      weight: {
        "@type": "QuantitativeValue",
        value: PRODUCT.weightGrams,
        unitCode: "GRM",
      },
      offers: {
        "@type": "Offer",
        price: PRODUCT.price,
        priceCurrency: PRODUCT.currency,
        priceValidUntil,
        availability: "https://schema.org/PreOrder",
        url: abs("/#reserve"),
        seller: { "@id": abs("/#org") },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function Home() {
  const journal = articlesByDate().slice(0, 3);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Reveal />
      <SiteNav />

      {/* ---- Cinematic journey: ocean loop -> push-in -> product ---- */}
      <CinematicStage />
      {/* marker: nav flips from film-white to editorial-ink past this point */}
      <div id="cine-end" aria-hidden />

      {/* ---- Opening statement — asymmetric editorial --------------- */}
      <section className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(5rem,18vh,12rem)]">
        <div className="reveal grid md:grid-cols-12 gap-y-7 md:gap-x-12">
          <p className="label md:col-span-3 md:pt-4">Purity</p>
          <p className="serif text-[clamp(1.9rem,4vw,3.3rem)] text-ink leading-[1.16] md:col-span-9 max-w-[22ch]">
            Only sea water, sun, and time. The summer heat draws the Aegean down
            to salt; that salt is all we take.
          </p>
        </div>
      </section>

      {/* ---- Provenance — full-bleed origin photograph ------------- */}
      <figure className="reveal w-full">
        <Photo
          name="worker"
          alt="A salt worker raking fleur de sel by hand from the surface of an Aegean salt pan at dusk"
          imgClassName="block w-full aspect-[16/10] md:aspect-[2/1] object-cover"
        />
      </figure>

      {/* ---- The Product — name, price, proof, action -------------- */}
      <section id="salt" className="bg-salt-wash">
        <TrackOnView event="product_viewed" />
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,14vh,10rem)] grid md:grid-cols-2 gap-10 md:gap-24 items-center">
          {/* real product imagery: clean studio jar + macro of the crystals */}
          <div className="reveal order-2 md:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[440px] mx-auto">
              <figure className="relative aspect-[3/4] overflow-hidden ring-1 ring-line bg-ultramarine shadow-[0_22px_50px_-44px_rgba(22,38,63,0.35)]">
                <img
                  src="/videos/clip-c-poster.jpg"
                  alt="A sealed studio jar of Halen fleur de sel against the Aegean sea"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </figure>
              <figure className="relative aspect-[3/4] overflow-hidden ring-1 ring-line bg-salt-wash">
                <Photo
                  name="salt"
                  alt="Extreme macro of Halen fleur de sel showing the delicate, flaked crystal structure"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>

          <div className="reveal order-1 md:order-2 max-w-md">
            <p className="label mb-5">The First Harvest</p>
            <h2 className="serif text-[clamp(2.2rem,5vw,3.3rem)] text-ink leading-[1.04] text-balance">
              Halen Fleur de Sel
            </h2>

            <div className="flex items-baseline gap-4 mt-5 mb-6">
              <span className="serif text-ink text-[clamp(2rem,4.4vw,2.6rem)] leading-none">
                {PRODUCT.priceDisplay}
              </span>
              <span className="label !text-ink-faint !tracking-[0.18em]">
                {PRODUCT.weightDisplay}
              </span>
            </div>

            <p className="text-ink-soft mb-7">
              Hand-harvested fleur de sel from the Greek coast. Delicate, flaked
              crystals with a clean mineral finish — made for steaks, vegetables,
              seafood, and desserts.
            </p>

            <ul className="trust-markers mb-9">
              {TRUST_MARKERS.map((m) => (
                <li key={m} className="trust-marker">{m}</li>
              ))}
            </ul>

            <dl className="border-t border-line text-[0.9rem]">
              {[
                ["Origin", "Aegean coast, Greece"],
                ["Harvest", "By hand, at dusk"],
                ["Composition", "Sea salt — nothing added"],
                ["Jar", PRODUCT.weightDisplay],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
                >
                  <dt className="label">{k}</dt>
                  <dd className="text-ink text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <ReserveButton
                source="product_section"
                variant="ink"
                className="w-full sm:w-auto justify-center sm:justify-start"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Ritual — left-aligned editorial index ------------------ */}
      <section id="ritual" className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,16vh,12rem)]">
        <div className="reveal grid md:grid-cols-12 gap-y-6 md:gap-x-12 mb-12 sm:mb-16">
          <p className="label md:col-span-3 md:pt-3">Ritual</p>
          <h2 className="serif text-[clamp(2rem,4.2vw,3rem)] text-ink leading-[1.08] md:col-span-9 max-w-[14ch]">
            Three things, done slowly.
          </h2>
        </div>

        <div className="reveal border-t border-line">
          {[
            {
              n: "01",
              t: "Harvested at dusk",
              d: "When the wind drops and the surface stills, the first bloom is raked by hand into shallow baskets.",
            },
            {
              n: "02",
              t: "Dried by sun alone",
              d: "No kilns, no additives. Mediterranean light and time are the only steps between sea and jar.",
            },
            {
              n: "03",
              t: "Sealed, untouched",
              d: "Whole crystals, never ground. What reaches your table is exactly what the pan gave up.",
            },
          ].map((item) => (
            <div
              key={item.n}
              className="grid md:grid-cols-12 gap-y-3 md:gap-x-12 items-baseline border-b border-line py-8 sm:py-11"
            >
              <span className="label !text-ink-faint md:col-span-2">{item.n}</span>
              <h3 className="serif text-[clamp(1.5rem,2.4vw,2rem)] text-ink leading-[1.1] md:col-span-4">
                {item.t}
              </h3>
              <p className="text-ink-soft text-[0.95rem] md:col-span-6 max-w-[44ch]">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- From the First Harvest — editorial social proof ------- */}
      <section id="voices" className="border-t border-line bg-salt-wash">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,14vh,10rem)]">
          <div className="reveal text-center mb-14 sm:mb-20">
            <p className="label mb-5">From the First Harvest</p>
            <h2 className="serif text-[clamp(2rem,4.2vw,3rem)] text-ink leading-[1.08]">
              A few words from early customers.
            </h2>
          </div>

          <div className="reveal grid md:grid-cols-3 gap-x-12 lg:gap-x-16 gap-y-14">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col">
                <span className="serif text-ink-faint text-5xl leading-none mb-4" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="serif text-[clamp(1.15rem,1.55vw,1.4rem)] text-ink leading-[1.5]">
                  {t.quote}
                </blockquote>
                <figcaption className="label !text-ink-faint mt-7">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- From the Journal — editorial depth + internal links ---- */}
      <section id="journal" className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,14vh,10rem)]">
        <div className="reveal grid md:grid-cols-12 gap-y-6 md:gap-x-12 mb-10 sm:mb-14">
          <p className="label md:col-span-3 md:pt-3">The Journal</p>
          <h2 className="serif text-[clamp(2rem,4.2vw,3rem)] text-ink leading-[1.08] md:col-span-9 max-w-[18ch]">
            On salt, provenance, and the table.
          </h2>
        </div>

        <ul className="reveal border-t border-line">
          {journal.map((a) => (
            <li key={a.slug} className="border-b border-line">
              <Link
                href={`/journal/${a.slug}`}
                className="group grid md:grid-cols-12 gap-y-2 md:gap-x-12 items-baseline py-7 sm:py-9 tap"
              >
                <span className="label !text-ink-faint md:col-span-2">{a.kicker}</span>
                <h3 className="serif text-[clamp(1.4rem,2.4vw,2rem)] text-ink leading-[1.12] md:col-span-7 transition-opacity duration-300 group-hover:opacity-60">
                  {a.title}
                </h3>
                <span className="label !text-ink-faint md:col-span-3 md:text-right">
                  {a.readingMinutes} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="reveal mt-9">
          <Link href="/journal" className="label !text-ink nav-link tap">
            All writing →
          </Link>
        </p>
      </section>

      {/* ---- Questions — FAQ (crawlable + FAQPage schema) ----------- */}
      <section id="faq" className="border-t border-line bg-salt-wash">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(4.5rem,14vh,10rem)]">
          <div className="reveal grid md:grid-cols-12 gap-y-6 md:gap-x-12 mb-10 sm:mb-14">
            <p className="label md:col-span-3 md:pt-3">Questions</p>
            <h2 className="serif text-[clamp(2rem,4.2vw,3rem)] text-ink leading-[1.08] md:col-span-9 max-w-[16ch]">
              Fleur de sel, answered.
            </h2>
          </div>

          <div className="reveal border-t border-line">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group border-b border-line">
                <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none py-6 sm:py-7 tap">
                  <h3 className="serif text-[clamp(1.25rem,2vw,1.6rem)] text-ink leading-[1.2]">
                    {q}
                  </h3>
                  <span
                    className="label shrink-0 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="text-ink-soft text-[0.95rem] max-w-[64ch] pb-7 pr-8 -mt-1">
                  {a}
                </p>
              </details>
            ))}
          </div>

          <p className="reveal text-ink-soft text-[0.95rem] mt-10 max-w-[52ch]">
            Ready when you are —{" "}
            <a href="#reserve" className="nav-link tap text-ink">
              reserve a jar
            </a>{" "}
            from the first harvest, or read{" "}
            <a href="#ritual" className="nav-link tap text-ink">
              how it&rsquo;s made
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---- Use — full-bleed closing seduction before the reserve - */}
      <figure className="reveal w-full">
        <Photo
          name="cookie"
          alt="A hand sprinkling flaky fleur de sel over warm, just-baked chocolate cookies"
          imgClassName="block w-full aspect-[16/10] md:aspect-[2/1] object-cover"
        />
        <figcaption className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 mt-5 label !text-ink-faint">
          A pinch, off the heat.
        </figcaption>
      </figure>

      {/* ---- Reserve — full-bleed dark closing moment -------------- */}
      <section id="shop" className="bg-ink">
        <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-[clamp(7.5rem,24vh,16rem)]">
          <div className="reveal grid md:grid-cols-12 gap-y-12 md:gap-x-16 items-start">
            <div className="md:col-span-6">
              <p className="label !text-turquoise mb-6">The First Harvest</p>
              <h2 className="serif text-[clamp(2.1rem,4.4vw,3.4rem)] text-salt leading-[1.05] max-w-[13ch] mb-7">
                Reserved before the first jars are sealed.
              </h2>
              <p className="text-salt/90 max-w-[40ch]">
                Fleur de sel is the fragile first bloom of crystals lifted from
                the surface of the pans — the most prized, the most scarce. The
                first harvest is small. Reserve a jar and we&rsquo;ll set one
                aside.
              </p>
            </div>

            <div id="reserve" className="md:col-span-6 md:col-start-8 md:pt-3">
              <p className="label !text-salt/65 mb-3">Halen Fleur de Sel</p>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="serif text-turquoise text-[clamp(2.3rem,5vw,3.1rem)] leading-none">
                  {PRODUCT.priceDisplay}
                </span>
                <span className="label !text-salt/45 !tracking-[0.18em]">
                  {PRODUCT.weightDisplay}
                </span>
              </div>
              <ReserveButton
                source="reserve_section"
                variant="cream"
                className="w-full sm:w-auto justify-center sm:justify-start"
              />
              <p className="label !text-[0.62rem] !tracking-[0.2em] !text-salt/55 mt-6 max-w-[40ch]">
                No payment now. One quiet note when reservations open — first
                access, before anyone else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer ------------------------------------------------- */}
      <SiteFooter />

      {/* Fake-door mechanics: shared reservation modal + persistent mobile CTA */}
      <ReservationModal />
      <StickyCta />
    </>
  );
}
