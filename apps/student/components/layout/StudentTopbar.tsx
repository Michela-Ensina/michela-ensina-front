"use client";

import Image from "next/image";

import { AccountMenu } from "@/components/layout/AccountMenu";

type StudentTopbarProps = {
  title: string;
  subtitle?: string;
};

export function StudentTopbar({ title, subtitle }: StudentTopbarProps) {
  return (
    <header
      className="sticky top-0 z-20 -mx-4 mb-6 overflow-hidden border-b px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 80%, var(--color-primary))",
        backgroundColor: "color-mix(in oklab, var(--color-background) 92%, var(--color-surface))",
      }}
    >
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
        className="pointer-events-none absolute right-28 top-4 hidden opacity-[0.14] md:block"
      />
      <div className="relative flex items-center justify-between gap-4">
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
