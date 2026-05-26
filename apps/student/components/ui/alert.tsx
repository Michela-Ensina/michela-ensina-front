import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type AlertTone = "default" | "error" | "success";

type AlertProps = {
  children: ReactNode;
  tone?: AlertTone;
  className?: string;
};

export function Alert({ children, tone = "default", className }: AlertProps) {
  if (tone === "error") {
    return <p className={cn("student-feedback student-feedback--error", className)}>{children}</p>;
  }

  if (tone === "success") {
    return <p className={cn("student-feedback student-feedback--success", className)}>{children}</p>;
  }

  return (
    <p
      className={cn("student-feedback", className)}
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </p>
  );
}
