import Link from "next/link";
import SiteFooter from "../site-footer";

/**
 * Interior chrome for the Journal. Unlike the homepage nav (which reacts to the
 * cinematic film), this is a calm, always-solid editorial header — no scroll JS.
 */
export default function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-salt/85 backdrop-blur-md border-b border-line">
        <nav className="mx-auto max-w-[1400px] px-7 md:px-14 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="serif text-2xl tracking-tight text-ink tap">
            Halen
          </Link>
          <ul className="flex items-center gap-7 md:gap-12 label">
            <li className="hidden sm:block">
              <Link href="/#salt" className="nav-link tap text-ink">The Salt</Link>
            </li>
            <li>
              <Link href="/journal" className="nav-link tap text-ink">Journal</Link>
            </li>
            <li>
              <Link href="/#shop" className="nav-link tap text-ink">Reserve</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <SiteFooter />
    </>
  );
}
