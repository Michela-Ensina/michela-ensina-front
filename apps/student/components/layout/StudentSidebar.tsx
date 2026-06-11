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
      className="hidden w-64 shrink-0 border-r px-4 py-6 lg:flex lg:flex-col"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 70%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 65%, transparent)",
      }}
    >
      <div className="mb-8 flex items-center gap-3 px-2">
        <StudentBrandMark variant="horizontal" className="h-8 w-auto" />
      </div>

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
                  ? "color-mix(in oklab, var(--color-primary) 16%, transparent)"
                  : "transparent",
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
