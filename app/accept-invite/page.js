import Link from "next/link";
import { AuthShell } from "../../components/auth-shell";
import { AuthForm } from "../../components/forms";

export const metadata = { title: "Accept invite" };

export default function AcceptInvite() {
  return (
    <AuthShell
      title="You have been invited"
      subtitle="Set a password to join the workspace you were invited to. Your role is already assigned."
      footer={
        <p className="text-[14px] text-slate-dim">
          Invited by mistake?{" "}
          <Link href="/contact" className="font-medium text-royal-600 transition-colors hover:text-royal-700">
            Tell us
          </Link>
        </p>
      }
    >
      <AuthForm mode="invite" />
    </AuthShell>
  );
}
