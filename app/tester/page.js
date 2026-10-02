import { notFound } from "next/navigation";

/* ---------------------------------------------------------------------------
   /tester — REMOVED FROM THE PUBLIC SITE.

   The user-testing recruitment page was publicly indexable and submitted to the
   live leads endpoint. It is an internal programme page, not a product page, and
   it should not be reachable by anyone who finds it in a search result.

   The route is kept as an explicit 404 rather than deleted, so any inbound link
   or bookmark fails loudly instead of hitting a missing route. Restore it by
   moving this file back and removing the notFound() call below.
   ------------------------------------------------------------------------- */

export const metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function TesterPage() {
  notFound();
}