import Link from "next/link";

/**
 * Shared footer for the homepage and interior (Journal) pages. Uses root-
 * relative hrefs so the section links resolve from any route.
 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-7 sm:px-8 md:px-14 py-11 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-7 md:gap-8">
        <Link href="/" className="serif text-2xl text-ink tap">
          Halen
        </Link>
        <ul className="flex flex-wrap justify-center gap-7 sm:gap-10 label">
          <li><Link href="/#salt" className="nav-link tap">The Salt</Link></li>
          <li><Link href="/#ritual" className="nav-link tap">Ritual</Link></li>
          <li><Link href="/journal" className="nav-link tap">Journal</Link></li>
          <li><Link href="/#faq" className="nav-link tap">Questions</Link></li>
          <li><Link href="/#shop" className="nav-link tap">Reserve</Link></li>
        </ul>
        <span className="label">Hand-harvested in Greece</span>
      </div>
    </footer>
  );
}
