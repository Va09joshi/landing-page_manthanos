/**
 * Site identity — the canonical origin and name.
 *
 * Defined once because it is used in three places that must not disagree: the
 * metadata `metadataBase` (how Next.js resolves relative URLs), the canonical
 * <link> tag on every page, and the `url`/`@id` fields of the structured data.
 * A canonical pointing at one host while the structured data points at another
 * splits the same page into two entities as far as a crawler is concerned.
 */

export const siteUrl = "https://manthanos.app";
export const siteName = "ManthanOS";

/**
 * pageMetadata — the metadata every route below the homepage shares.
 *
 * A page that sets only `title` and `description` inherits the *root* OpenGraph
 * and Twitter objects, which means /features shares a link preview that
 * advertises the homepage. Search and social both read those fields, so each
 * route states its own.
 *
 * `path` is used for two things at once: the canonical URL and the OpenGraph
 * `url`. They are the same value on purpose — the canonical is the one URL a
 * crawler is told to consolidate signals onto, and the share card should point
 * at that same URL or the two disagree.
 *
 * @param {object}  params
 * @param {string}  params.title        Page title, without the brand suffix.
 * @param {string}  params.description  One sentence, per page, not the brand blurb.
 * @param {string}  params.path         Root-relative route, e.g. "/features".
 */
export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    /* Resolved against metadataBase in app/layout.js, so the emitted tag is a
       full absolute URL — which is what the spec asks for. */
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${siteName}`,
      description,
      url: path,
      siteName,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: `${title} · ${siteName}`, description },
  };
}