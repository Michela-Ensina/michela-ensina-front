import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type AuthSubmitButtonProps = {
  children: ReactNode;
  isSubmitting: boolean;
};

export function AuthSubmitButton({ children, isSubmitting }: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      variant="primary"
      fullWidth
      className="disabled:opacity-75"
    >
      {children}
    </Button>
  );
}

type AuthLoginLinkProps = {
  children: ReactNode;
};

export function AuthLoginLink({ children }: AuthLoginLinkProps) {
  return (
    <div className="mt-4 text-sm">
      <Link
        href="/login"
        className="student-text-action rounded-lg px-2 py-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        {children}
      </Link>
    </div>
  );
}
