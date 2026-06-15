"use client";

import { AccountMenu } from "@/components/layout/AccountMenu";

type StudentTopbarProps = {
  title: string;
  subtitle?: string;
};

export function StudentTopbar({ title, subtitle }: StudentTopbarProps) {
  return (
    <header
      className="sticky top-0 z-20 mb-6 border-b px-1 py-4 backdrop-blur"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 75%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-background) 82%, transparent)",
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl leading-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {subtitle}
            </p>
          ) : null}
        </div>

        <AccountMenu />
      </div>
    </header>
  );
}
