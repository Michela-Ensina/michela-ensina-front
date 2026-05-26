import type { ReactNode } from "react";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";

type StudentShellProps = {
  children: ReactNode;
};

export function StudentShell({ children }: StudentShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-10 flex items-center gap-3">
        <StudentBrandMark variant="horizontal" className="h-8 w-auto" />
        <div>
          <p className="text-base font-semibold">Área do aluno</p>
        </div>
      </header>

      {children}
    </main>
  );
}
