"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/* Page-level back control for the auth shell: step back through history when
   the visitor came from inside the site, otherwise fall back to home. */
export function BackButton() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <button type="button" onClick={goBack} className="auth-back">
      <ArrowLeft size={16} aria-hidden="true" />
      Back
    </button>
  );
}
