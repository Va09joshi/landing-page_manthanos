import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { product } from "../lib/product";
import { siteName, siteUrl } from "../lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  /* One origin, imported rather than retyped, so metadataBase, the canonical
     link and the structured-data @ids can never disagree. */
  metadataBase: new URL(siteUrl),

  /* `default` supplies the home page; `template` appends the brand to every
     deeper route, which is what keeps "Features · ManthanOS" readable in a
     result list instead of five pages all titled the same. */
  title: {
    default: `${siteName} — ${product.tagline}`,
    template: `%s · ${siteName}`,
  },
  description: product.description,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  /* Canonicals are declared on every page. Without them, /features, /features/
     and the same URL with campaign parameters are three pages competing for
     one set of queries. */
  alternates: { canonical: "/" },

  keywords: [
    "creative workspace software",
    "all-in-one workspace for teams",
    "content pipeline software",
    "client project management",
    "agency CRM",
    "meeting notes for teams",
    "ManthanOS",
  ],

  openGraph: {
    title: `${siteName} — ${product.tagline}`,
    description: product.description,
    type: "website",
    siteName,
    url: "/",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${product.tagline}`,
    description: product.description,
  },

  robots: {
    index: true,
    follow: true,
    /* Explicit directives for the full-size crawler. `max-image-preview:large`
       is the one that matters here: without it Google may show a thumbnail
       instead of the hero art in a result card. */
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* ------------------------------------------------ no-JS visibility
            Every element that animates in does so from framer-motion's
            `initial` state, and that state is serialised into the prerendered
            HTML as an inline `style="opacity:0;transform:…"`. That is correct
            with JavaScript — and it is a blank page without it.

            A crawler that does not execute scripts, a reader with JS blocked,
            and a bundle that fails to load all see the same document: forty
            invisible elements, including the <h1>. <noscript> applies in
            exactly those cases and no others, and !important is mandatory
            because the hidden state is an inline style, which no ordinary
            stylesheet rule can outrank.

            Two selectors, on purpose:
              [data-reveal]        our own marker, set by the shared Reveal
                                   wrapper. Explicit — extend this one.
              [style^="opacity:0"] a safety net for motion elements that are
                                   not inside a Reveal (the hero's own children
                                   and the pipeline rows). It keys on
                                   framer-motion's serialised hidden state,
                                   which always begins the style attribute and
                                   is never used for a partial opacity — the
                                   decorative washes carry their opacity after
                                   a background declaration, so they are not
                                   matched and stay translucent.

            If framer-motion ever changes that format this degrades to "some
            elements are still hidden without JS". It can never degrade to
            "elements are broken with JS", because the whole block is inert
            the moment scripting is available. */}
        <noscript>
          <style>{`[data-reveal],[style^="opacity:0"]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
