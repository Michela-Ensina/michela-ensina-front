"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import { ArrowLeft, ChevronRight, ListVideo } from "lucide-react";

import type { StudentNavItem } from "@/components/layout/StudentSidebar";
import { cn } from "@/lib/utils/cn";

type MaterialTheaterShellProps = {
  isTheaterMode: boolean;
  navItems: StudentNavItem[];
  actions: ReactNode;
  title: string;
  typeLabel: string;
  children: ReactNode;
};

function TheaterMenu({ navItems }: { navItems: StudentNavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        type="button"
        className="student-action student-hover-surface flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        <ListVideo size={16} aria-hidden="true" />
        Conteúdo
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8} className="z-50">
          <BasePopover.Popup
            className="w-56 rounded-[var(--radius-md)] border p-2 shadow-[var(--shadow-md)] outline-none"
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
                  onClick={() => setOpen(false)}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}

export function MaterialTheaterShell({
  isTheaterMode,
  navItems,
  actions,
  title,
  typeLabel,
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
          ?"max-w-none space-y-4"
          : "max-w-7xl space-y-6",
      )}
    >
      <div className={cn("flex flex-wrap items-center justify-between gap-3", isTheaterMode ?"hidden" : "")}>
        <div className="flex flex-wrap items-center gap-2">
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

      {isTheaterMode ?(
        <div className="student-theater-header relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen border-y">
          <div className="mx-auto flex min-h-14 w-full max-w-[96rem] items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link
                href="/materiais"
                className="student-action student-hover-surface grid size-9 shrink-0 place-items-center rounded-lg text-[var(--color-text-muted)]"
                aria-label="Voltar para materiais"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </Link>
              <TheaterMenu navItems={navItems} />
              <div className="hidden h-7 w-px bg-[var(--color-border)] sm:block" />
              <div className="flex min-w-0 items-center gap-2 text-sm">
                <span className="truncate font-semibold text-[var(--color-text)]">{title}</span>
                <ChevronRight size={14} className="hidden shrink-0 text-[var(--color-text-muted)] sm:block" aria-hidden="true" />
                <span className="hidden shrink-0 text-[var(--color-text-muted)] sm:block">{typeLabel}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {actions}
            </div>
          </div>
        </div>
      ) : null}

      {children}
    </section>
  );
}
