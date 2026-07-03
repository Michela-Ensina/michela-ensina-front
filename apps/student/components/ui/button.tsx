import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "student-action inline-flex min-h-10 items-center justify-center rounded-[12px] px-4 py-2 text-sm font-semibold focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        primary: "student-primary-action bg-[var(--color-secondary)] text-[var(--color-brand-cream)]",
        outline: "student-hover-surface border bg-transparent text-[var(--color-text)]",
        ghost: "student-hover-surface bg-transparent text-[var(--color-text-muted)]",
        danger: "student-hover-surface border",
      },
      size: {
        default: "",
        sm: "min-h-9 px-3 text-xs",
        lg: "min-h-11 px-5 text-base",
        icon: "h-11 w-11 rounded-full p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
      fullWidth: false,
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  fullWidth,
  style,
  ...props
}: ButtonProps) {
  const mergedStyle: React.CSSProperties = {
    ...style,
  };

  if (variant === "outline") {
    mergedStyle.borderColor = mergedStyle.borderColor ?? "var(--color-border)";
  }

  if (variant === "danger") {
    mergedStyle.borderColor =
      mergedStyle.borderColor ??
      "color-mix(in oklab, #cc5a7a 50%, var(--color-border))";
    mergedStyle.color =
      mergedStyle.color ??
      "color-mix(in oklab, #cc5a7a 74%, var(--color-text))";
    mergedStyle.backgroundColor =
      mergedStyle.backgroundColor ??
      "color-mix(in oklab, #cc5a7a 10%, transparent)";
  }

  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      style={mergedStyle}
      {...props}
    />
  );
}

export { buttonVariants };
