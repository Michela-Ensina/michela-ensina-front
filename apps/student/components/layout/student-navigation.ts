import { BarChart3, BookOpen, FolderKanban, Home, Settings } from "lucide-react";

import type { StudentNavItem } from "@/components/layout/StudentSidebar";

type StudentPageMeta = {
  title: string;
  subtitle: string;
};

const NAV_ITEMS: StudentNavItem[] = [
  { href: "/dashboard", label: "Página inicial", icon: Home },
  { href: "/materiais", label: "Materiais", icon: BookOpen },
  { href: "/progresso", label: "Progresso", icon: BarChart3 },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

const ADMIN_NAV_ITEM: StudentNavItem = {
  href: "/admin/materiais",
  label: "Admin",
  icon: FolderKanban,
};

const PAGE_META: Record<string, StudentPageMeta> = {
  "/dashboard": {
    title: "Página inicial",
    subtitle: "Visão geral da sua jornada de estudos.",
  },
  "/materiais": {
    title: "Materiais",
    subtitle: "Aulas e conteúdos organizados para você.",
  },
  "/progresso": {
    title: "Progresso",
    subtitle: "Acompanhe seu avanço nos materiais.",
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

export function getStudentNavItems(isAdmin: boolean): StudentNavItem[] {
  return isAdmin ?[...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS;
}

export function getStudentPageMeta(pathname: string): StudentPageMeta {
  if (pathname.startsWith("/materiais/")) {
    return {
      title: "Material",
      subtitle: "Estude, revise e atualize seu progresso.",
    };
  }

  return PAGE_META[pathname] ?? PAGE_META["/dashboard"];
}
