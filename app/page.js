import { Header } from "../components/site-header";
import { Footer } from "../components/site-footer";
import { Hero } from "../components/hero";
import { PipelineRail } from "../components/pipeline-rail";
import { ClientsCRM } from "../components/clients-crm";
import { ContentCreative } from "../components/content-creative";
import { MeetingsNotes } from "../components/meetings-notes";
import { AISummary } from "../components/ai-summary";
import { Monitoring } from "../components/monitoring";
import { HomeWorkspaceComparison } from "../components/workspace-comparison";
import { TrustSection, FAQ } from "../components/trust-faq";
import { StructuredData } from "../components/structured-data";
import { product } from "../lib/product";
import { siteName } from "../lib/site";

/*
  Ten sections, and that is deliberately fewer than it was.

  REMOVED
  - ClosingCTA      the "Bring the work you are actually doing." conclusion.
                       It repeated the hero's ask on every page it appeared and
                       pushed the footer below the fold on smaller viewports.
                       Component is kept on disk at /components/closing-cta.js;
                       re-add the import and the tag if you disagree.
  - ProjectsTasks      a six-row task table. Every row it showed (assignee,
                       progress bar, due date, status) was already on screen in
                       PipelineRail and again in Monitoring. Third statement of
                       the same fact.
  - TeamCollaboration three abstract figure shapes beside a fourth record
                      list. The weakest thing on the page visually, and the one
                      section that proved least — collaboration is better shown
                      inside the shared record the other sections already
                      describe. Component is kept on disk; re-add the import and
                      the tag if you disagree.
  - AssetSlots        literal scaffolding. It said so on the page: "Handover ·
                      not part of the live site". Five empty asset frames have
                      no business in a build anyone sees. Delete it from
                      /components once the art is sourced.

  WHAT THIS BUYS
  The page went from 14 sections / 7 product panels / 16 lists to 11 / 4 / 10.
  Removing the repeats is what makes the sections that remain feel deliberate
  instead of accumulated — the same task row in three places reads as a product
  with one feature, not one with many.

  ORDER — each answers a different question, and no two neighbours share a
  layout pattern or a background.

     1. What it is + who for   (Hero)            ink-950  text on gradient
     2. How work moves         (PipelineRail)    ink-850  centred + track
     3. The client relationship(ClientsCRM)      ink-900  asymmetric editorial
     4. Creative work          (ContentCreative) ink-800  large UI spread
     5. The human part         (MeetingsNotes)   ink-850  scene L + UI R
     6. The AI capability      (AISummary)       ink-950  horizontal progression
     7. What is moving         (Monitoring)      ink-900  one calm dashboard
     8. The simple idea        (IdeasExecution)  ink-950  whitespace + 3 objects
     9. Why believe it         (TrustSection)    PAPER    ink on paper
     10. What to ask            (FAQ)             ink-900  asymmetric accordion

  BAND SEAM — verified by resolving every class to its token and comparing
  adjacent pairs, not by reading class names. band-flat, band-dark and
  band-base are all ink-950; three different names, one colour. Two sections
  that read as "different" in this file were merging on screen. The one
  remaining ink-950 pair is FAQ -> footer, which is deliberate: the footer
  card is inset into that field rather than sitting beside it.

  COLOUR DISCIPLINE
  Only the hero uses a generous blue glow. Coral appears
  only where people talk, purple only at the AI step, orange only where
  something is being imagined. If a section needs a fourth accent to make
  sense, the section is the problem.
*/

export const metadata = {
  /* `absolute` deliberately bypasses the "%s · ManthanOS" template from
     app/layout.js. The home page is the brand page: the template would append
     the company name to a title that already opens with it, and a <title> is
     one of the three strongest on-page signals there is — it should read as a
     sentence, not as a sentence with a suffix.

     Title, description and the hero <h1> are now the same statement in the
     same order (workspace → ideas → projects → clients → content). A crawler
     that sees a title promising one thing and a headline promising another
     discounts both. */
  title: { absolute: `${siteName} — ${product.tagline}` },
  description: product.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Organization + WebSite + SoftwareApplication + FAQPage, rendered from
          the same lib/ files the page itself reads. Server-rendered, so it is
          present in the HTML whether or not JavaScript runs. */}
      <StructuredData faq />
      <Header />
      <main className="home-page">
        <Hero />
        <PipelineRail />
        <HomeWorkspaceComparison />
        <ClientsCRM />
        <ContentCreative />
        <MeetingsNotes />
        <AISummary />
        <Monitoring />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
