"use client";

import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";
import { cn } from "@/lib/utils/cn";

export type StudentNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type StudentSidebarProps = {
  items: StudentNavItem[];
  currentPath: string;
};

export function StudentSidebar({ items, currentPath }: StudentSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden shrink-0 border-r px-4 py-6 transition-[width] duration-200 ease-out lg:flex lg:flex-col",
        isCollapsed ? "lg:w-20 xl:w-72" : "w-72",
      )}
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 78%, var(--color-primary))",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 82%, var(--color-background))",
      }}
    >
      <div className="mb-7 flex items-center justify-between gap-3 px-2">
        <StudentBrandMark
          variant={isCollapsed ? "symbol" : "horizontal"}
          className={cn("h-8 w-auto", isCollapsed ? "xl:hidden" : "")}
        />
        {isCollapsed ? <StudentBrandMark variant="horizontal" className="hidden h-8 w-auto xl:block" /> : null}
        <button
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          className="student-action student-hover-surface hidden size-9 place-items-center rounded-xl border lg:grid xl:hidden"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
            backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 70%, transparent)",
          }}
          aria-label={isCollapsed ? "Expandir navegação" : "Recolher navegação"}
        >
          {isCollapsed ? <PanelLeftOpen size={17} aria-hidden="true" /> : <PanelLeftClose size={17} aria-hidden="true" />}
        </button>
      </div>

      <p className={cn("mb-2 px-3 text-xs font-bold", isCollapsed ? "lg:hidden xl:block" : "")} style={{ color: "var(--color-text-muted)" }}>
        Área do aluno
      </p>
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "student-action flex min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium",
                isCollapsed ? "lg:justify-center lg:px-2 xl:justify-start xl:px-3" : "",
                isActive ? "font-semibold" : "student-hover-surface",
              )}
              style={{
                color: isActive ? "var(--color-brand-cream)" : "var(--color-text-muted)",
                backgroundColor: isActive ? "var(--color-secondary)" : "transparent",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
              }}
            >
              <Icon size={17} aria-hidden="true" />
              <span className={cn(isCollapsed ? "lg:sr-only xl:not-sr-only" : "")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
