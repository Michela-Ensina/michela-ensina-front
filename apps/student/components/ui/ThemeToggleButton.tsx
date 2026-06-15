"use client";

import { Moon, Sun } from "lucide-react";

import type { ThemeMode } from "@/lib/theme/theme";

type ThemeToggleButtonProps = {
  theme: ThemeMode;
  onToggle: () => void;
  className?: string;
  mode?: "switch" | "icon";
};

export function ThemeToggleButton({
  theme,
  onToggle,
  className,
  mode = "switch",
}: ThemeToggleButtonProps) {
  const isDark = theme === "dark";

  if (mode === "icon") {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
        className={`student-action student-hover-surface ${className ?? ""}`}
        style={{
          display: "inline-flex",
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          border: "1px solid var(--color-border)",
          backgroundColor:
            "color-mix(in oklab, var(--color-surface) 78%, transparent)",
          color: "var(--color-text)",
          boxShadow: "var(--shadow-sm)",
          transition: "transform 180ms ease, background-color 180ms ease",
          cursor: "pointer",
        }}
      >
        {isDark ? (
          <Sun size={18} strokeWidth={2} absoluteStrokeWidth />
        ) : (
          <Moon size={18} strokeWidth={2} absoluteStrokeWidth />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={`student-action student-hover-surface ${className ?? ""}`}
      style={{
        position: "relative",
        display: "inline-flex",
        width: 62,
        height: 34,
        alignItems: "center",
        borderRadius: 999,
        border: "1px solid var(--color-border)",
        backgroundColor:
          "color-mix(in oklab, var(--color-surface) 88%, transparent)",
        transition: "background-color 180ms ease, border-color 180ms ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: isDark ? 31 : 3,
          top: 3,
          width: 26,
          height: 26,
          borderRadius: "50%",
          border:
            "1px solid color-mix(in oklab, var(--color-border) 80%, transparent)",
          backgroundColor: "var(--color-background)",
          boxShadow: "0 2px 8px rgb(0 0 0 / 0.18)",
          transition: "left 220ms ease",
        }}
      />

      <span className="sr-only">Alternar tema</span>
      <span
        className="flex w-full items-center justify-between px-2.5"
        aria-hidden="true"
      >
        <Moon
          size={14}
          strokeWidth={2}
          color={isDark ? "var(--color-primary)" : "var(--color-text-muted)"}
          absoluteStrokeWidth
        />
        <Sun
          size={14}
          strokeWidth={2}
          color={isDark ? "var(--color-text-muted)" : "var(--color-primary)"}
          absoluteStrokeWidth
        />
      </span>
    </button>
  );
}
