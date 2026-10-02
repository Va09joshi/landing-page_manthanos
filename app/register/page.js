import Link from "next/link";
import { AuthShell } from "../../components/auth-shell";
import { PublicWorkspaceApplicationForm } from "../../components/forms";

export const metadata = {
  title: "Request a workspace",
  description:
    "Apply for a ManthanOS workspace. Tell us your team size, your platforms and how you plan to use it.",
};

export default function Register() {
  return (
    <AuthShell
      title={<>Continue with <span className="text-royal-600">ManthanOS</span></>}
      subtitle="Bring your ideas, projects and people together. Let’s find the right workspace for you."
      footer={
        <p className="text-[14px] text-slate-dim">
          Already have a workspace?{" "}
          <Link href="/login" className="font-medium text-royal-600 transition-colors hover:text-royal-700">
            Sign in
          </Link>
        </p>
      }
    >
      <PublicWorkspaceApplicationForm />
    </AuthShell>
  );
}
