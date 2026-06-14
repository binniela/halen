import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_LOCALE, abs } from "@/lib/site";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Halen — Aegean Fleur de Sel | Hand-Harvested Greek Sea Salt",
    template: "%s · Halen",
  },
  description:
    "Halen is single-origin fleur de sel, hand-harvested from the Aegean coast of Greece and dried by sun alone. Unrefined finishing salt, additive-free, 125g jar.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  keywords: [
    "fleur de sel",
    "Aegean sea salt",
    "Greek sea salt",
    "finishing salt",
    "hand-harvested salt",
    "flaky sea salt",
    "unrefined sea salt",
    "single-origin salt",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Halen — Aegean Fleur de Sel",
    description:
      "Single-origin fleur de sel, hand-harvested from the Greek coast and dried by sun alone. Unrefined. Additive-free.",
    url: SITE_URL,
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Halen — Aegean Fleur de Sel",
    description:
      "Single-origin fleur de sel, hand-harvested from the Greek coast. Unrefined. Additive-free.",
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: SITE_NAME },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#16263f",
  colorScheme: "light",
};

// Site-wide identity only. Page-level schema (WebPage, Product, FAQPage,
// Article, breadcrumbs) is emitted by each page so it never appears on a route
// it doesn't describe. Other pages reference #website / #org by @id.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: abs("/"),
      name: SITE_NAME,
      description: "Single-origin Aegean fleur de sel, hand-harvested in Greece.",
      inLanguage: "en",
      publisher: { "@id": abs("/#org") },
    },
    {
      "@type": "Organization",
      "@id": abs("/#org"),
      name: SITE_NAME,
      url: abs("/"),
      description: "Single-origin Aegean sea salt, hand-harvested in Greece.",
      logo: { "@type": "ImageObject", url: abs("/icon.svg") },
      slogan: "From still water, a quiet harvest.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
