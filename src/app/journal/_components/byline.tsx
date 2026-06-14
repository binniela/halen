import Link from "next/link";
import { getAuthor } from "@/content/authors";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Editorial byline: author link · date · reading time. */
export default function Byline({
  authorSlug,
  datePublished,
  readingMinutes,
}: {
  authorSlug: string;
  datePublished: string;
  readingMinutes: number;
}) {
  const author = getAuthor(authorSlug);
  return (
    <p className="label !text-ink-faint flex flex-wrap items-center gap-x-3 gap-y-1">
      {author && (
        <>
          <span>
            Words by{" "}
            <Link
              href={`/journal/authors/${author.slug}`}
              className="nav-link tap !text-ink-soft"
            >
              {author.name}
            </Link>
          </span>
          <span aria-hidden>·</span>
        </>
      )}
      <time dateTime={datePublished}>{fmtDate(datePublished)}</time>
      <span aria-hidden>·</span>
      <span>{readingMinutes} min read</span>
    </p>
  );
}
