import Image from "next/image";

import { DashboardProgressSummary } from "@/components/student/dashboard/DashboardProgressSummary";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ProgressSummary, User } from "@/types/student";

type DashboardHeroProps = {
  pendingCount: number;
  progress: ProgressSummary;
  student: User;
  totalMaterials: number;
};

export function DashboardHero({
  pendingCount,
  progress,
  student,
  totalMaterials,
}: DashboardHeroProps) {
  return (
    <section
      className="relative overflow-hidden rounded-[var(--radius-lg)] border px-5 py-5 sm:px-6"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <Image
        src="/assets/brand/graphics/elementos-02-lilas.svg"
        alt=""
        width={148}
        height={148}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 opacity-[0.11]"
      />
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={32}
        height={32}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 right-10 opacity-20"
      />

      <div className="relative grid gap-6 lg:grid-cols-[1.45fr_0.82fr] lg:items-end">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              label={student.is_active ? "Acesso ativo" : "Acesso limitado"}
              tone={student.is_active ? "concluído" : "bloqueado"}
            />
            {student.must_change_password ? (
              <StatusBadge label="Senha recomendada" tone="em-andamento" />
            ) : null}
          </div>
          <h2 className="mt-4 text-3xl leading-tight">
            Olá, {student.name.split(" ")[0]}.
          </h2>
          <p className="student-muted-text mt-2 max-w-2xl text-sm sm:text-base">
            Seu espaço do Modo Fluente está pronto para continuar os estudos,
            revisar materiais e acompanhar o ritmo.
          </p>
        </div>

        <div
          className="rounded-[var(--radius-md)] border p-4"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface-soft)",
          }}
        >
          <DashboardProgressSummary
            percentage={progress.percentage}
            viewedCount={progress.viewed_count}
            pendingCount={pendingCount}
            totalMaterials={totalMaterials}
          />
        </div>
      </div>
    </section>
  );
}
