import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold tracking-wide transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        // Dark CTA buttons must keep light text for accessibility and contrast.
        primary:
          "bg-secondary !text-surface hover:bg-accent hover:!text-surface focus-visible:ring-surface/50",
        outline:
          "border border-primary/30 bg-surface text-primary hover:bg-surface-soft focus-visible:ring-primary/20",
        soft: "bg-surface-soft text-primary hover:bg-surface",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends ComponentProps<"a">, VariantProps<typeof buttonVariants> {}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        buttonVariants({ variant, size }),
        "no-underline",
        className,
      )}
      {...props}
    />
  );
}
