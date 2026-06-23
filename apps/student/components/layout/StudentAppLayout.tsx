"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { BarChart3, BookOpen, FolderKanban, Home, Settings } from "lucide-react";

import { StudentMobileNav } from "@/components/layout/StudentMobileNav";
import { StudentSidebar, type StudentNavItem } from "@/components/layout/StudentSidebar";
import { StudentTopbar } from "@/components/layout/StudentTopbar";
import { useAuth } from "@/lib/auth/use-auth";

type StudentAppLayoutProps = {
  children: ReactNode;
  pathname: string;
};

const NAV_ITEMS: StudentNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/materiais", label: "Materiais", icon: BookOpen },
  { href: "/progresso", label: "Progresso", icon: BarChart3 },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

const ADMIN_NAV_ITEM: StudentNavItem = {
  href: "/admin/materiais",
  label: "Admin",
  icon: FolderKanban,
};

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
  "/admin/materiais": {
    title: "Admin",
    subtitle: "Gerencie os materiais da fase 1.",
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

export function StudentAppLayout({ children, pathname }: StudentAppLayoutProps) {
  const { user } = useAuth();
  const navItems = user?.roles?.includes("admin") ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;
  const page = getPageMeta(pathname);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-transparent">
      <Image
        src="/assets/brand/graphics/elementos-02-lilas.svg"
        alt=""
        width={150}
        height={150}
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-24 hidden opacity-[0.07] lg:block"
      />
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={36}
        height={36}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-10 hidden opacity-[0.12] lg:block"
      />
      <StudentSidebar items={navItems} currentPath={pathname} />

      <div className="relative z-10 flex min-h-screen w-full flex-col px-4 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <StudentTopbar title={page.title} subtitle={page.subtitle} />
        <main className="w-full max-w-[1320px] flex-1">{children}</main>
      </div>

      <StudentMobileNav items={navItems} currentPath={pathname} />
    </div>
  );
}
