import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content/journal";
import { ARTICLE_BODIES } from "@/content/articles";
import { getAuthor } from "@/content/authors";
import { SITE_NAME, abs } from "@/lib/site";
import ReadingProgress from "../_components/reading-progress";
import TableOfContents from "../_components/table-of-contents";
import Byline from "../_components/byline";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = abs(`/journal/${a.slug}`);
  const author = getAuthor(a.author);
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url,
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
      authors: [author?.name ?? SITE_NAME],
      images: [{ url: abs(a.image), width: 1280, height: 720, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const Body = ARTICLE_BODIES[a.slug];
  const author = getAuthor(a.author);
  const related = a.related
    .map((s) => getArticle(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const url = abs(`/journal/${a.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: a.title,
        description: a.description,
        image: abs(a.image),
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        articleSection: a.category,
        keywords: a.keywords.join(", "),
        wordCount: undefined,
        inLanguage: "en",
        // Editorial desk → attributed to the Organization. Swap to a Person
        // node here when a named human writes the piece.
        author: { "@id": abs("/#org") },
        publisher: { "@id": abs("/#org") },
        isPartOf: { "@id": abs("/journal#collection") },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: { "@id": abs("/#product") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Journal", item: abs("/journal") },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
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
      <ReadingProgress targetId="article" />

      <article id="article">
        {/* Masthead */}
        <header className="mx-auto max-w-[768px] px-7 sm:px-8 pt-[clamp(3.5rem,11vh,7rem)] pb-[clamp(1.5rem,4vh,2.5rem)] text-center">
          <p className="label !text-ink-faint mb-7">
            <Link href="/journal" className="nav-link tap">The Journal</Link>
            <span className="mx-3" aria-hidden>·</span>
            {a.kicker}
          </p>
          <h1 className="serif text-[clamp(2.4rem,5.8vw,4.2rem)] text-ink leading-[1.04] text-balance">
            {a.title}
          </h1>
          <p className="serif italic text-[clamp(1.3rem,2.8vw,1.8rem)] text-ink-soft mt-7 leading-snug mx-auto max-w-[44ch]">
            {a.dek}
          </p>
          <div className="mt-9 flex justify-center">
            <Byline
              authorSlug={a.author}
              datePublished={a.datePublished}
              readingMinutes={a.readingMinutes}
            />
          </div>
        </header>

        {/* Hero image */}
        <figure className="mx-auto max-w-[1180px] px-4 sm:px-6 mt-4 mb-[clamp(2.5rem,7vh,5rem)]">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] w-full overflow-hidden bg-salt-wash">
            <Image
              src={a.image}
              alt={a.title}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover"
            />
          </div>
        </figure>

        {/* Body + TOC rail */}
        <div className="mx-auto max-w-[1180px] px-7 sm:px-8 xl:grid xl:grid-cols-[210px_minmax(0,720px)] xl:gap-14 xl:justify-center">
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <TableOfContents targetId="article-body" />
            </div>
          </aside>

          <div className="mx-auto w-full max-w-[720px]">
            {/* Mobile / tablet contents */}
            <details className="toc-mobile xl:hidden">
              <summary className="label tap">Contents</summary>
              <TableOfContents targetId="article-body" />
            </details>

            <div id="article-body" className="prose">
              <Body />
            </div>
          </div>
        </div>
      </article>

      {/* Conversion CTA */}
      <section className="mx-auto max-w-[720px] px-7 sm:px-8 mt-[clamp(3.5rem,9vh,6rem)]">
        <div className="border-t border-line pt-12 flex flex-col items-start gap-6">
          <p className="label">The First Harvest</p>
          <p className="serif text-[clamp(1.6rem,3.4vw,2.3rem)] text-ink leading-[1.1] max-w-[20ch]">
            Reserved before the first jars are sealed.
          </p>
          <Link
            href="/#reserve"
            className="label !text-salt bg-ink px-9 py-4 rounded-[3px] !tracking-[0.24em] transition-opacity duration-300 hover:opacity-80"
          >
            Reserve a jar →
          </Link>
        </div>
      </section>

      {/* Author note */}
      {author && (
        <section className="mx-auto max-w-[720px] px-7 sm:px-8 mt-[clamp(3rem,7vh,5rem)]">
          <div className="border-t border-line pt-10 flex flex-col gap-3">
            <p className="label !text-ink-faint">Written by</p>
            <Link
              href={`/journal/authors/${author.slug}`}
              className="serif text-2xl text-ink tap w-fit"
            >
              {author.name}
            </Link>
            <p className="text-ink-soft text-[0.95rem] max-w-[58ch]">
              {author.short}
            </p>
          </div>
        </section>
      )}

      {/* Related — internal links */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-7 sm:px-8 md:px-14 mt-[clamp(4.5rem,12vh,8rem)] pb-[clamp(5rem,14vh,10rem)]">
          <p className="label mb-8">Keep reading</p>
          <ul className="grid sm:grid-cols-2 gap-px bg-line border border-line">
            {related.map((r) => (
              <li key={r.slug} className="bg-salt">
                <Link
                  href={`/journal/${r.slug}`}
                  className="group block h-full p-8 sm:p-10 tap"
                >
                  <span className="label !text-ink-faint">{r.kicker}</span>
                  <h2 className="serif text-[clamp(1.5rem,2.4vw,2rem)] text-ink leading-[1.12] mt-4 transition-opacity duration-300 group-hover:opacity-60">
                    {r.title}
                  </h2>
                  <p className="text-ink-soft text-[0.92rem] mt-3 max-w-[42ch]">
                    {r.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
