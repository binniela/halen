import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthor } from "@/content/authors";
import { ARTICLES } from "@/content/journal";
import { abs } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role}`,
    description: author.short,
    alternates: { canonical: `/journal/authors/${author.slug}` },
    openGraph: {
      type: "profile",
      title: `${author.name} — Halen Journal`,
      description: author.short,
      url: abs(`/journal/authors/${author.slug}`),
    },
  };
}

export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const pieces = ARTICLES.filter((a) => a.author === author.slug).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished)
  );
  const url = abs(`/journal/authors/${author.slug}`);

  // Editorial desk → the author entity IS the Organization. A named person would
  // instead emit a Person node with their own @id.
  const authorEntity =
    author.type === "person"
      ? {
          "@type": "Person",
          "@id": `${url}#person`,
          name: author.name,
          jobTitle: author.role,
          description: author.bio,
          url,
        }
      : { "@id": abs("/#org") };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: `${author.name} — Halen Journal`,
        isPartOf: { "@id": abs("/#website") },
        mainEntity: authorEntity,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Journal", item: abs("/journal") },
          { "@type": "ListItem", position: 3, name: author.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-[768px] px-7 sm:px-8 pt-[clamp(4rem,12vh,8rem)] pb-[clamp(2.5rem,7vh,5rem)]">
        <p className="label !text-ink-faint mb-7">
          <Link href="/journal" className="nav-link tap">The Journal</Link>
          <span className="mx-3" aria-hidden>·</span>
          Contributor
        </p>
        <h1 className="serif text-[clamp(2.4rem,5.5vw,3.8rem)] text-ink leading-[1.05]">
          {author.name}
        </h1>
        <p className="label !text-ink-faint mt-4">{author.role}</p>
        <p className="text-ink-soft mt-8 max-w-[60ch] leading-[1.75]">
          {author.bio}
        </p>
      </section>

      {pieces.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-7 sm:px-8 md:px-14 pb-[clamp(5rem,16vh,11rem)]">
          <p className="label mb-8">Writing</p>
          <ul className="border-t border-line">
            {pieces.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/journal/${p.slug}`}
                  className="group grid md:grid-cols-12 gap-y-2 md:gap-x-12 items-baseline py-8 sm:py-10 tap"
                >
                  <span className="label !text-ink-faint md:col-span-2">{p.kicker}</span>
                  <h2 className="serif text-[clamp(1.5rem,2.6vw,2.1rem)] text-ink leading-[1.12] md:col-span-7 transition-opacity duration-300 group-hover:opacity-60">
                    {p.title}
                  </h2>
                  <span className="label !text-ink-faint md:col-span-3 md:text-right">
                    {p.readingMinutes} min read
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
