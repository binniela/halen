"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * Derives a table of contents from the article's own headings at runtime (so
 * article bodies stay clean prose), assigns stable ids, and highlights the
 * section currently in view. Renders nothing if the piece has no sections.
 */
export default function TableOfContents({
  targetId,
  className = "",
}: {
  targetId: string;
  className?: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("h2, h3")
    );
    const seen = new Set<string>();
    const data = nodes.map((node) => {
      let id = node.id || slugify(node.textContent || "");
      while (seen.has(id)) id += "-x";
      seen.add(id);
      node.id = id;
      return { id, text: node.textContent || "", level: node.tagName === "H3" ? 3 : 2 };
    });
    setHeadings(data);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "0px 0px -72% 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [targetId]);

  if (headings.length < 2) return null;

  return (
    <nav className={`toc ${className}`} aria-label="On this page">
      <p className="label toc-label">Contents</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} data-level={h.level}>
            <a
              href={`#${h.id}`}
              className={active === h.id ? "is-active" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
