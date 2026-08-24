import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridLines } from "@/components/layout/GridLines";
import { Loader } from "@/components/layout/Loader";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ReinstateLabs — Building What's Next",
    template: "%s — ReinstateLabs",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "technology studio",
    "software development",
    "AI development",
    "machine learning",
    "cloud infrastructure",
    "business automation",
    "web applications",
    "product engineering",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "ReinstateLabs — Building What's Next",
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ReinstateLabs — technology studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@reinstatelabs",
    title: "ReinstateLabs — Building What's Next",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phone,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      sameAs: site.social.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Without JavaScript, scroll-triggered blocks would never leave their
          hidden initial state. This pins them open so the page still reads.
        */}
        <noscript>
          <style>{`[data-rl-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Silence hydration mismatches injected by browser extensions (e.g. Dark Reader).
            These attributes don't exist server-side and are harmless — suppressing them
            keeps the console clean without masking real bugs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var orig = console.error.bind(console);
  console.error = function() {
    var msg = arguments[0];
    if (typeof msg === 'string' && (
      msg.includes('darkreader') ||
      msg.includes('data-darkreader') ||
      msg.includes('Prop') && msg.includes('did not match')
    )) return;
    orig.apply(console, arguments);
  };
})();`,
          }}
        />
      </head>
      <body className="min-h-svh antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          // Static, author-controlled structured data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        <SmoothScroll>
          <GridLines />
          <Loader />
          <Navbar />

          <main id="main" className="relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
