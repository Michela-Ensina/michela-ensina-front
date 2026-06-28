"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";
import { STUDENT_BRAND_LINKS } from "@/constants/brand-links";
import { cn } from "@/lib/utils/cn";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export type StudentNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type StudentSidebarProps = {
  items: StudentNavItem[];
  currentPath: string;
};

type CollapsibleSidebarPartProps = {
  isCollapsed: boolean;
};

function SidebarDecor({ isCollapsed }: CollapsibleSidebarPartProps) {
  return (
    <>
      <Image
        src="/assets/brand/graphics/elemento-01-lilas.svg"
        alt=""
        width={82}
        height={82}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-8 top-28 opacity-[0.10]",
          isCollapsed ? "lg:hidden xl:block" : "",
        )}
      />
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-7 left-6 opacity-[0.18]",
          isCollapsed ? "lg:hidden xl:block" : "",
        )}
      />
    </>
  );
}

type SidebarHeaderProps = CollapsibleSidebarPartProps & {
  onToggle: () => void;
};

function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "mb-7 flex gap-3 px-2",
        isCollapsed
          ? "lg:flex-col lg:items-center lg:justify-start xl:flex-row xl:items-center xl:justify-between"
          : "items-center justify-between",
      )}
    >
      <div
        className={cn(
          "flex h-8 shrink-0 items-center",
          isCollapsed ? "lg:w-8 lg:justify-center xl:w-auto" : "",
        )}
      >
        <StudentBrandMark
          variant={isCollapsed ? "symbol" : "horizontal"}
          tone="light"
          className={cn(
            "shrink-0 object-contain",
            isCollapsed ? "h-7 w-7 xl:hidden" : "h-8 w-auto",
          )}
        />
        {isCollapsed ? (
          <StudentBrandMark
            variant="horizontal"
            tone="light"
            className="hidden h-8 w-auto shrink-0 xl:block"
          />
        ) : null}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="student-sidebar-toggle student-action hidden size-8 place-items-center rounded-full lg:grid xl:hidden"
        aria-label={isCollapsed ? "Expandir navegação" : "Recolher navegação"}
      >
        {isCollapsed ? (
          <ChevronRight size={17} aria-hidden="true" />
        ) : (
          <ChevronLeft size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

type SidebarNavProps = CollapsibleSidebarPartProps & {
  currentPath: string;
  items: StudentNavItem[];
};

function SidebarNav({ currentPath, isCollapsed, items }: SidebarNavProps) {
  return (
    <div
      className={cn(
        "student-sidebar-nav-block",
        isCollapsed ? "lg:mt-3 xl:mt-0" : "",
      )}
    >
      <p
        className={cn(
          "student-sidebar-section-label px-3 text-xs font-bold",
          isCollapsed ? "lg:hidden xl:block" : "",
        )}
      >
        Área do aluno
      </p>
      <nav className="student-sidebar-nav flex flex-col gap-1.5">
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
                isCollapsed
                  ? "lg:justify-center lg:px-2 xl:justify-start xl:px-3"
                  : "",
                isActive ? "font-semibold" : "student-hover-surface",
              )}
              style={{
                color: isActive
                  ? "var(--color-brand-cream)"
                  : "var(--color-brand-lilac)",
                backgroundColor: isActive
                  ? "var(--color-secondary)"
                  : "transparent",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
              }}
            >
              <Icon size={17} aria-hidden="true" />
              <span
                className={cn(isCollapsed ? "lg:sr-only xl:not-sr-only" : "")}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function SidebarSocialLinks({ isCollapsed }: CollapsibleSidebarPartProps) {
  return (
    <div
      className={cn(
        "relative z-10 mt-auto pt-6",
        isCollapsed ? "lg:flex lg:justify-center xl:block" : "",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          isCollapsed ? "lg:flex-col xl:flex-row" : "",
        )}
      >
        <Link
          href={STUDENT_BRAND_LINKS.whatsappChannel}
          target="_blank"
          rel="noreferrer"
          className="student-action student-hover-surface grid size-9 place-items-center rounded-xl text-[var(--color-brand-lilac)]"
          aria-label="Canal do Whatsapp da Michela"
        >
          <SiWhatsapp size={17} aria-hidden="true" />
        </Link>
        <Link
          href={STUDENT_BRAND_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          className="student-action student-hover-surface grid size-9 place-items-center rounded-xl text-[var(--color-brand-lilac)]"
          aria-label="Instagram da Michela"
        >
          <SiInstagram size={17} aria-hidden="true" />
        </Link>
        <span
          className={cn(
            "ml-1 text-xs font-semibold text-[var(--color-brand-lilac)]",
            isCollapsed ? "lg:sr-only xl:not-sr-only" : "",
          )}
        >
          Michela Ensina
        </span>
      </div>
    </div>
  );
}

export function StudentSidebar({ items, currentPath }: StudentSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "student-sidebar relative hidden shrink-0 overflow-hidden px-3 py-6 transition-[width] duration-200 ease-out lg:flex lg:flex-col",
        isCollapsed ? "lg:w-20 xl:w-56" : "w-56",
      )}
    >
      <SidebarDecor isCollapsed={isCollapsed} />
      <SidebarHeader
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((current) => !current)}
      />
      <SidebarNav
        currentPath={currentPath}
        isCollapsed={isCollapsed}
        items={items}
      />
      <SidebarSocialLinks isCollapsed={isCollapsed} />
    </aside>
  );
}
