import { AuthShell } from "../../components/auth-shell";
import { WorkspaceApplicationForm } from "../../components/workspace-application-form";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/register",
  title: "Request a workspace",
  description:
    "Apply for a ManthanOS workspace. Tell us your team size, your platforms and how you plan to use it.",
});

export default function Register() {
  return (
    <AuthShell
      title={
        <>
          Apply for a <span className="text-signal">workspace</span>
        </>
      }
      subtitle={null}
      footer={null}
    >
      <WorkspaceApplicationForm />
    </AuthShell>
  );
}
