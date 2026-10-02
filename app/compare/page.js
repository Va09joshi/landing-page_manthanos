import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { FullWorkspaceComparison } from "../../components/workspace-comparison";
import { PageHead, StatusPill } from "../../components/ui";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/compare",
  title: "Creator vs company workspaces",
  description:
    "Compare ManthanOS creator and company workspaces by workflow, modules, roles, and the work each one helps your team deliver.",
});

export default function CompareWorkspaces() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="Workspace comparison"
          title="Are you building an audience or delivering for a business?"
          lede="Creator and company workspaces share the same connected foundation, but they organize the day around different outcomes. See which operating lane fits your team."
        >
          <div className="flex flex-wrap gap-2">
            <StatusPill tone="live">Creator</StatusPill>
            <StatusPill tone="meet">Company</StatusPill>
          </div>
        </PageHead>
        <FullWorkspaceComparison />
      </main>
      <Footer />
    </>
  );
}
