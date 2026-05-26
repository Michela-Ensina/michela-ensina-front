import { Input as InputPrimitive } from "@base-ui/react/input";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type InputProps = ComponentProps<"input">;

export function Input({ className, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      className={cn(
        "h-11 w-full rounded-lg border border-border/30 bg-surface px-3 text-base text-text placeholder:text-text-muted/75 outline-none transition-colors focus-visible:border-primary/60",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
