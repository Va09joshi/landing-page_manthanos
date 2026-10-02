/**
 * Structured data — the machine-readable form of what the pages already say.
 *
 * A crawler reconstructs a product from markup, not from prose. Without this,
 * "ManthanOS" is a string that appears on a page; with it, it is an
 * Organization with a name, a URL and a logo, publishing a WebSite, offering a
 * SoftwareApplication, and answering six specific questions.
 *
 * Four rules this file follows:
 *
 *  1. NOTHING IS INVENTED. Every value below already exists in lib/product.js
 *     or lib/faq.js and is visible on the rendered page. Structured data that
 *     claims more than the page shows is a manual-action risk, not a shortcut.
 *  2. NO PRICES. The pricing page deliberately publishes no figures — plans
 *     are shaped per workspace — so `offers` is omitted rather than guessed.
 *     An `offers` node with a made-up price is worse than no node.
 *  3. NO `sameAs`. We have no verified social profiles to point at, and a
 *     wrong profile link is a wrong identity claim.
 *  4. ONE GRAPH, NOT FOUR SCRIPTS. Nodes reference each other by `@id`, which
 *     is how a crawler is told these facts are about the same entity rather
 *     than four unrelated things that happen to share a name.
 *
 * It is a server component with a plain <script>, so it survives JavaScript
 * being disabled — the only consumer is a machine, and machines do not run JS.
 */

import { product, workspaceTypes } from "../lib/product";
import { faqs } from "../lib/faq";
import { siteName, siteUrl } from "../lib/site";

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;
const APP_ID = `${siteUrl}/#software`;

export function StructuredData({ faq = false }) {
  const graph = [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteName,
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 448,
        height: 79,
      },
      description: product.description,
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${siteUrl}/`,
      name: siteName,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: siteName,
      url: `${siteUrl}/`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: product.description,
      publisher: { "@id": ORG_ID },
      /* The real navigation modules, straight from the workspace definitions.
         This is the feature list the product ships, not a wish list.

         Deduplicated: the three workspace types legitimately share modules
         (Client Projects, Roles, Brand Deals), and repeating a name in
         `featureList` reads to a parser as three separate features rather than
         one feature available in three shapes. */
      featureList: [...new Set(workspaceTypes.flatMap((type) => type.modules))],
      audience: {
        "@type": "Audience",
        audienceType: workspaceTypes.map((type) => type.audience).join("; "),
      },
    },
  ];

  if (faq) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      isPartOf: { "@id": SITE_ID },
      mainEntity: faqs.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return (
    <script
      type="application/ld+json"
      /* `<` is escaped so a string containing a closing script tag can never
         terminate this element early. The payload is static, but escaping here
         means it stays safe the day it is not. */
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}