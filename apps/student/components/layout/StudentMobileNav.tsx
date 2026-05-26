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
      <ul className="grid grid-cols-4 gap-1.5">
        {items.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block min-h-10 rounded-lg px-2 py-2 text-center text-xs font-semibold"
                style={{
                  color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                  backgroundColor: isActive
                    ? "color-mix(in oklab, var(--color-primary) 15%, transparent)"
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
