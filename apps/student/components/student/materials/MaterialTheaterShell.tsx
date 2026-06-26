"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, ListVideo } from "lucide-react";

import type { StudentNavItem } from "@/components/layout/StudentSidebar";
import { cn } from "@/lib/utils/cn";

type MaterialTheaterShellProps = {
  isTheaterMode: boolean;
  navItems: StudentNavItem[];
  actions: ReactNode;
  children: ReactNode;
};

function TheaterMenu({ navItems }: { navItems: StudentNavItem[] }) {
  return (
    <details className="group relative">
      <summary
        className="student-action student-hover-surface flex list-none items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold marker:content-none"
        style={{ borderColor: "var(--color-border)" }}
      >
        <ListVideo size={16} aria-hidden="true" />
        Conteúdo
      </summary>
      <div
        className="absolute left-0 z-50 mt-2 w-56 rounded-[var(--radius-md)] border p-2 shadow-[var(--shadow-md)]"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="student-action student-hover-surface flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)]"
            >
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}

export function MaterialTheaterShell({
  isTheaterMode,
  navItems,
  actions,
  children,
}: MaterialTheaterShellProps) {
  useEffect(() => {
    if (isTheaterMode) {
      document.body.setAttribute("data-material-theater", "true");
    } else {
      document.body.removeAttribute("data-material-theater");
    }

    return () => {
      document.body.removeAttribute("data-material-theater");
    };
  }, [isTheaterMode]);

  return (
    <section
      className={cn(
        "mx-auto w-full pb-8",
        isTheaterMode
          ? "max-w-none space-y-4"
          : "max-w-7xl space-y-6",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {isTheaterMode ? <TheaterMenu navItems={navItems} /> : null}
          <Link
            href="/materiais"
            className="student-text-action inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--color-text-muted)]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Materiais
          </Link>
        </div>
        {actions}
      </div>

      {children}
    </section>
  );
}
