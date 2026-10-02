import Link from "next/link";
import { AuthShell } from "../../components/auth-shell";
import { AuthForm } from "../../components/forms";

export const metadata = { title: "Sign in" };

export default function Login() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your ManthanOS workspace. You will land in the portal built for your role."
      footer={
        <p className="text-[14px] text-slate-dim">
          No workspace yet?{" "}
          <Link href="/register" className="font-medium text-royal-600 transition-colors hover:text-royal-700">
            Request one
          </Link>
        </p>
      }
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
