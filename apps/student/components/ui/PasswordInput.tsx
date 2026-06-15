"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  isVisible: boolean;
  onToggleVisibility: () => void;
};

export function PasswordInput({
  className,
  disabled,
  isVisible,
  onToggleVisibility,
  ...props
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        {...props}
        disabled={disabled}
        type={isVisible ? "text" : "password"}
        className={cn("pr-11", className)}
      />
      <button
        type="button"
        disabled={disabled}
        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60"
        style={{ color: "var(--color-text-muted)" }}
        aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
        onClick={onToggleVisibility}
      >
        {isVisible ? (
          <EyeOff size={17} aria-hidden="true" />
        ) : (
          <Eye size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
