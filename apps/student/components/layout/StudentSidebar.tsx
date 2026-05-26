import Link from "next/link";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";
import { cn } from "@/lib/utils/cn";

export type StudentNavItem = {
  href: string;
  label: string;
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
        <div>
          <p className="text-base font-semibold">Área do aluno</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href !== "/dashboard" && currentPath.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "font-semibold" : "hover:opacity-100",
              )}
              style={{
                color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                backgroundColor: isActive
                  ? "color-mix(in oklab, var(--color-primary) 16%, transparent)"
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
