import Link from "next/link";

import type { StudentNavItem } from "@/components/layout/StudentSidebar";

type StudentMobileNavProps = {
  items: StudentNavItem[];
  currentPath: string;
};

export function StudentMobileNav({ items, currentPath }: StudentMobileNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t px-2 py-1.5 lg:hidden"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 75%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 92%, var(--color-background))",
      }}
    >
      <ul className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="student-action student-hover-surface flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-center text-[11px] font-semibold"
                style={{
                  color: isActive ? "var(--color-brand-cream)" : "var(--color-text-muted)",
                  backgroundColor: isActive
                    ? "var(--color-secondary)"
                    : "transparent",
                }}
              >
                <Icon size={16} aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
