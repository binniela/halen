import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

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

const SITE = "https://halen.salt"; // placeholder — set to the real domain on deploy

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Halen — Aegean Sea Salt",
    template: "%s · Halen",
  },
  description:
    "Single-origin fleur de sel, hand-harvested by hand from the Greek coast and dried by sun alone. Unrefined, additive-free, 125g.",
  applicationName: "Halen",
  keywords: [
    "fleur de sel",
    "sea salt",
    "Aegean salt",
    "Greek sea salt",
    "finishing salt",
    "hand-harvested salt",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Halen",
    title: "Halen — Aegean Sea Salt",
    description:
      "Single-origin fleur de sel, hand-harvested from the Greek coast. Unrefined. Additive-free.",
    url: SITE,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halen — Aegean Sea Salt",
    description:
      "Single-origin fleur de sel, hand-harvested from the Greek coast.",
  },
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Halen" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#16263f",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Halen",
      description: "Single-origin Aegean sea salt, hand-harvested in Greece.",
      url: SITE,
    },
    {
      "@type": "Product",
      name: "Halen Fleur de Sel",
      category: "Sea salt",
      description:
        "Single-origin fleur de sel, hand-harvested from the Greek coast and dried by sun alone. Unrefined, additive-free.",
      brand: { "@type": "Brand", name: "Halen" },
      weight: { "@type": "QuantitativeValue", value: 125, unitCode: "GRM" },
      offers: {
        "@type": "Offer",
        price: "28.00",
        priceCurrency: "EUR",
        availability: "https://schema.org/PreOrder",
        url: `${SITE}/#reserve`,
      },
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
