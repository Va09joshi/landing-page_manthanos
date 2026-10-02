import { redirect } from "next/navigation";

export const metadata = { title: "Sign in" };

/* Sign-in has been retired on the marketing site.
   Workspaces are invite/application only — send everyone to /register. */
export default function Login() {
  redirect("/register");
}

