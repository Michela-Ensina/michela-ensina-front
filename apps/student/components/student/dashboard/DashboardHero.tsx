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
      className="rounded-[var(--radius-lg)] border px-5 py-5 sm:px-6"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 76%, var(--color-primary))",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 86%, var(--color-secondary))",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr] lg:items-end">
        <div>
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

        <DashboardProgressSummary
          percentage={progress.percentage}
          viewedCount={progress.viewed_count}
          pendingCount={pendingCount}
          totalMaterials={totalMaterials}
        />
      </div>
    </section>
  );
}
