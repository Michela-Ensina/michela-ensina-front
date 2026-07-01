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
      className="student-topbar sticky top-0 z-50 -mx-4 mb-6 overflow-visible border-b px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
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
          {subtitle ?(
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
