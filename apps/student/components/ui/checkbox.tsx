"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";

import { cn } from "@/lib/utils/cn";

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "student-action student-hover-surface grid size-5 shrink-0 place-items-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-brand-cream)] outline-none data-[checked]:border-[var(--color-secondary)] data-[checked]:bg-[var(--color-secondary)] disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator>
        <Check size={14} aria-hidden="true" strokeWidth={2.4} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
