import * as React from "react";

import { cn } from "@/lib/utils/cn";

export function Textarea({ className, style, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "student-input-control min-h-24 w-full rounded-[12px] border px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      style={style}
      {...props}
    />
  );
}
