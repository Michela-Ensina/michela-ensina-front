import * as React from "react";

import { cn } from "@/lib/utils/cn";

export function Input({ className, style, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(
        "student-input-control flex min-h-11 w-full rounded-[12px] border px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      style={style}
      {...props}
    />
  );
}
