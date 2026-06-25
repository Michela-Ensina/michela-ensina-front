import * as React from "react";

import { cn } from "@/lib/utils/cn";

export function Select({ className, style, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "student-input-control min-h-11 w-full rounded-[12px] border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      style={style}
      {...props}
    />
  );
}
