"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Select as BaseSelect } from "@base-ui/react/select";

import { cn } from "@/lib/utils/cn";

type SelectProps = React.ComponentProps<typeof BaseSelect.Root<string>>;
type SelectTriggerProps = React.ComponentProps<typeof BaseSelect.Trigger>;
type SelectContentProps = React.ComponentProps<typeof BaseSelect.Popup>;
type SelectItemProps = React.ComponentProps<typeof BaseSelect.Item> & {
  children: React.ReactNode;
};

function Select({ modal = false, ...props }: SelectProps) {
  return <BaseSelect.Root modal={modal} {...props} />;
}

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      type="button"
      className={cn(
        "student-input-control student-action student-hover-surface flex min-h-11 w-full items-center justify-between gap-2 rounded-[12px] border px-3 py-2 text-left text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
      {...props}
    >
      <BaseSelect.Value>{children}</BaseSelect.Value>
      <BaseSelect.Icon>
        <ChevronDown size={16} aria-hidden="true" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectContent({ className, children, ...props }: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={6} className="z-50">
        <BaseSelect.Popup
          className={cn(
            "max-h-72 w-[var(--anchor-width)] overflow-auto rounded-[var(--radius-md)] border p-1 shadow-[var(--shadow-md)] outline-none",
            className,
          )}
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      className={cn(
        "student-action grid cursor-pointer grid-cols-[1rem_1fr] items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-text)] outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-[var(--color-surface-soft)] data-[selected]:font-semibold",
        className,
      )}
      {...props}
    >
      <span className="grid size-4 place-items-center">
        <BaseSelect.ItemIndicator className="grid size-4 place-items-center text-[var(--color-primary)]">
          <Check size={14} aria-hidden="true" />
        </BaseSelect.ItemIndicator>
      </span>
      <BaseSelect.ItemText className="min-w-0 truncate">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger };
