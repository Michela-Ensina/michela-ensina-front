import Link from "next/link";

import type { StudentNavItem } from "@/components/layout/StudentSidebar";

type StudentMobileNavProps = {
  items: StudentNavItem[];
  currentPath: string;
};

export function StudentMobileNav({ items, currentPath }: StudentMobileNavProps) {
  return (
    <nav
      className="student-mobile-nav fixed inset-x-0 bottom-0 z-30 border-t px-2 py-1.5 lg:hidden"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <ul className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));
          const Icon = item.icon;
          const mobileLabel =
            item.href === "/configuracoes" ? "Config." : item.label;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-label={item.label}
                className="student-action student-hover-surface flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-center text-[10px] font-semibold"
                style={{
                  color: isActive ?"var(--color-brand-cream)" : "var(--color-text-muted)",
                  backgroundColor: isActive
                    ?"var(--color-secondary)"
                    : "transparent",
                }}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="max-w-full truncate">{mobileLabel}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
