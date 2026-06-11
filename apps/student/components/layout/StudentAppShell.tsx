import type { ReactNode } from "react";
import { BarChart3, BookOpen, Home, Settings } from "lucide-react";

import { StudentMobileNav } from "@/components/layout/StudentMobileNav";
import { StudentSidebar, type StudentNavItem } from "@/components/layout/StudentSidebar";
import { StudentTopbar } from "@/components/layout/StudentTopbar";

type StudentAppShellProps = {
  children: ReactNode;
  pathname: string;
};

const NAV_ITEMS: StudentNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/materiais", label: "Materiais", icon: BookOpen },
  { href: "/progresso", label: "Progresso", icon: BarChart3 },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Visão geral da sua jornada de estudos.",
  },
  "/materiais": {
    title: "Materiais",
    subtitle: "Aulas e conteúdos organizados para você.",
  },
  "/progresso": {
    title: "Progresso",
    subtitle: "Acompanhe sua evolução no curso.",
  },
  "/configuracoes": {
    title: "Configurações",
    subtitle: "Ajuste preferências do ambiente do aluno.",
  },
};

function getPageMeta(pathname: string) {
  if (pathname.startsWith("/materiais/")) {
    return {
      title: "Material",
      subtitle: "Estude, revise e atualize seu progresso.",
    };
  }

  return PAGE_META[pathname] ?? PAGE_META["/dashboard"];
}

export function StudentAppShell({ children, pathname }: StudentAppShellProps) {
  const page = getPageMeta(pathname);

  return (
    <div className="flex min-h-screen bg-transparent">
      <StudentSidebar items={NAV_ITEMS} currentPath={pathname} />

      <div className="flex min-h-screen w-full flex-col px-4 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <StudentTopbar title={page.title} subtitle={page.subtitle} />
        <main className="mx-auto w-full max-w-6xl flex-1">{children}</main>
      </div>

      <StudentMobileNav items={NAV_ITEMS} currentPath={pathname} />
    </div>
  );
}
