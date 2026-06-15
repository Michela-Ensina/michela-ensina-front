import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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
  return (
    <aside
      className="hidden w-72 shrink-0 border-r px-4 py-6 lg:flex lg:flex-col"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 70%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 72%, var(--color-background))",
      }}
    >
      <div className="mb-7 flex items-center gap-3 px-2">
        <StudentBrandMark variant="horizontal" className="h-8 w-auto" />
      </div>

      <p className="mb-2 px-3 text-xs font-bold" style={{ color: "var(--color-text-muted)" }}>
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
                "flex min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "font-semibold" : "hover:opacity-100",
              )}
              style={{
                color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                backgroundColor: isActive
                  ? "color-mix(in oklab, var(--color-primary) 18%, transparent)"
                  : "transparent",
                boxShadow: isActive ? "inset 0 0 0 1px color-mix(in oklab, var(--color-primary) 24%, transparent)" : "none",
              }}
            >
              <Icon size={17} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
