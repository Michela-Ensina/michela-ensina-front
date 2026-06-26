"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { StudentMobileNav } from "@/components/layout/StudentMobileNav";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { StudentTopbar } from "@/components/layout/StudentTopbar";
import { getStudentNavItems, getStudentPageMeta } from "@/components/layout/student-navigation";
import { useAuth } from "@/lib/auth/use-auth";

type StudentAppLayoutProps = {
  children: ReactNode;
  pathname: string;
};

export function StudentAppLayout({ children, pathname }: StudentAppLayoutProps) {
  const { user } = useAuth();
  const navItems = getStudentNavItems(Boolean(user?.roles?.includes("admin")));
  const page = getStudentPageMeta(pathname);

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

      <div className="student-app-content relative z-10 flex min-h-screen w-full flex-col px-4 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <StudentTopbar title={page.title} subtitle={page.subtitle} />
        <main className="student-app-main w-full max-w-[1320px] flex-1">{children}</main>
      </div>

      <StudentMobileNav items={navItems} currentPath={pathname} />
    </div>
  );
}
