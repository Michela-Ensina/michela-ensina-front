import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer min-h-10 items-center justify-center rounded-[12px] px-4 py-2 text-sm font-semibold transition-opacity focus-visible:outline-none disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        primary: "text-[var(--color-background)]",
        outline: "border bg-transparent text-[var(--color-text)]",
        ghost: "bg-transparent text-[var(--color-text-muted)]",
        danger: "border",
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

  if (variant === "primary") {
    mergedStyle.background =
      mergedStyle.background ??
      "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 86%, var(--color-brand-lilac)), color-mix(in oklab, var(--color-secondary) 74%, var(--color-brand-blue)))";
    mergedStyle.color = mergedStyle.color ?? "#fffefa";
  }

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
