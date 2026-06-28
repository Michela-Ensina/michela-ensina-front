"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { cn } from "@/lib/utils/cn";

type NumberInputProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Root>,
  "children"
> & {
  inputClassName?: string;
};

export function NumberInput({ className, inputClassName, ...props }: NumberInputProps) {
  return (
    <BaseNumberField.Root className={cn("w-full", className)} {...props}>
      <BaseNumberField.Group className="student-input-control flex min-h-11 w-full items-stretch overflow-hidden rounded-[12px] border p-0">
        <BaseNumberField.Input
          className={cn(
            "min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]",
            inputClassName,
          )}
        />
        <div className="flex w-8 shrink-0 flex-col border-l border-[var(--color-border)]">
          <BaseNumberField.Increment className="student-action student-hover-surface grid min-h-0 flex-1 place-items-center text-[var(--color-text-muted)] disabled:pointer-events-none disabled:opacity-45">
            <ChevronUp size={13} aria-hidden="true" />
          </BaseNumberField.Increment>
          <BaseNumberField.Decrement className="student-action student-hover-surface grid min-h-0 flex-1 place-items-center border-t border-[var(--color-border)] text-[var(--color-text-muted)] disabled:pointer-events-none disabled:opacity-45">
            <ChevronDown size={13} aria-hidden="true" />
          </BaseNumberField.Decrement>
        </div>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
