import { Header } from "../components/site-header";
import { Footer } from "../components/site-footer";
import { Hero } from "../components/hero";
import { PipelineRail } from "../components/pipeline-rail";
import { ClientsCRM } from "../components/clients-crm";
import { ContentCreative } from "../components/content-creative";
import { MeetingsNotes } from "../components/meetings-notes";
import { AISummary } from "../components/ai-summary";
import { Monitoring } from "../components/monitoring";
import { IdeasExecution } from "../components/ideas-execution";
import { TrustSection, FAQ } from "../components/trust-faq";
import { ClosingCTA } from "../components/closing-cta";

/*
  Eleven sections, and that is deliberately fewer than it was.

  REMOVED
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
    11. What to do             (ClosingCTA)      ink-950  minimal conclusion

  BAND SEAM — verified by resolving every class to its token and comparing
  adjacent pairs, not by reading class names. band-flat, band-dark and
  band-base are all ink-950; three different names, one colour. Two sections
  that read as "different" in this file were merging on screen. The one
  remaining ink-950 pair is CTA -> footer, which is deliberate: the footer
  card is inset into that field rather than sitting beside it.

  COLOUR DISCIPLINE
  Only the hero and the closing CTA use a generous blue glow. Coral appears
  only where people talk, purple only at the AI step, orange only where
  something is being imagined. If a section needs a fourth accent to make
  sense, the section is the problem.
*/

export const metadata = {
  title: "ManthanOS — One workspace for the work behind the work",
  description:
    "ManthanOS connects your ideas, projects, tasks, clients, meetings and content in one workspace — with ownership, approvals and handoffs already built in.",
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PipelineRail />
        <ClientsCRM />
        <ContentCreative />
        <MeetingsNotes />
        <AISummary />
        <Monitoring />
        <IdeasExecution />
        <TrustSection />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
