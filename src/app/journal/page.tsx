import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articlesByDate } from "@/content/journal";
import { abs } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Journal — On Salt, Provenance & the Table",
  description:
    "Field guides, provenance, and kitchen ritual from Halen — on fleur de sel, finishing salt, Mediterranean sea salt, and how to use them well.",
  alternates: { canonical: "/journal" },
  openGraph: {
    type: "website",
    title: "The Halen Journal",
    description:
      "Field guides, provenance, and kitchen ritual — on fleur de sel and finishing salt.",
    url: abs("/journal"),
  },
};

export default function JournalIndex() {
  const articles = articlesByDate();
  const [lead, ...rest] = articles;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": abs("/journal#collection"),
        url: abs("/journal"),
        name: "The Halen Journal",
        isPartOf: { "@id": abs("/#website") },
        about: { "@id": abs("/#product") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Journal", item: abs("/journal") },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: articles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: abs(`/journal/${a.slug}`),
          name: a.title,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Masthead */}
      <section className="mx-auto max-w-[1180px] px-7 sm:px-8 md:px-14 pt-[clamp(3.5rem,11vh,7rem)] pb-[clamp(2.5rem,7vh,4.5rem)] text-center">
        <p className="label mb-6">The Journal</p>
        <h1 className="serif text-[clamp(2.6rem,7vw,5rem)] text-ink leading-[1.02] mx-auto max-w-[15ch]">
          On salt, provenance, and the table.
        </h1>
        <p className="text-ink-soft mt-7 mx-auto max-w-[48ch]">
          Field guides and kitchen ritual from a single stretch of the Aegean
          coast — what fleur de sel is, where it comes from, and how to use it
          well.
        </p>
      </section>

      {/* Featured lead */}
      {lead && (
        <section className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-14 mb-[clamp(3rem,9vh,6rem)]">
          <Link href={`/journal/${lead.slug}`} className="group block tap">
            <figure className="relative aspect-[16/9] w-full overflow-hidden bg-salt-wash">
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                priority
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </figure>
            <div className="mx-auto max-w-[760px] text-center mt-8 sm:mt-10">
              <span className="label !text-ink-faint">{lead.kicker}</span>
              <h2 className="serif text-[clamp(1.9rem,4vw,3rem)] text-ink leading-[1.08] mt-4 transition-opacity duration-300 group-hover:opacity-70">
                {lead.title}
              </h2>
              <p className="text-ink-soft mt-4 mx-auto max-w-[46ch]">{lead.dek}</p>
              <p className="label !text-ink-faint mt-5">{lead.readingMinutes} min read</p>
            </div>
          </Link>
        </section>
      )}

      {/* Index */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-7 sm:px-8 md:px-14 pb-[clamp(5rem,16vh,11rem)]">
          <p className="label !text-ink-faint border-t border-line pt-8 mb-2">More writing</p>
          <ul>
            {rest.map((a) => (
              <li key={a.slug} className="border-b border-line">
                <Link
                  href={`/journal/${a.slug}`}
                  className="group grid md:grid-cols-12 gap-y-3 md:gap-x-12 items-baseline py-9 sm:py-12 tap"
                >
                  <span className="label !text-ink-faint md:col-span-2">{a.kicker}</span>
                  <div className="md:col-span-7">
                    <h2 className="serif text-[clamp(1.6rem,3vw,2.4rem)] text-ink leading-[1.1] transition-opacity duration-300 group-hover:opacity-60">
                      {a.title}
                    </h2>
                    <p className="text-ink-soft text-[0.95rem] mt-3 max-w-[52ch]">{a.dek}</p>
                  </div>
                  <span className="label !text-ink-faint md:col-span-3 md:text-right">
                    {a.readingMinutes} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
