import { ProgressBar } from "@/components/ui/ProgressBar";

type DashboardProgressSummaryProps = {
  percentage: number;
  viewedCount: number;
  pendingCount: number;
  totalMaterials: number;
};

function SummaryCount({ label, value, withDivider = false }: { label: string; value: number; withDivider?: boolean }) {
  return (
    <div
      className={withDivider ?"border-x px-3 py-3" : "px-3 py-3"}
      style={withDivider ?{ borderColor: "var(--color-border)" } : undefined}
    >
      <p className="text-lg font-bold">{value}</p>
      <p className="student-muted-text text-xs">{label}</p>
    </div>
  );
}

function getCompletedCountLabel(count: number) {
  return count === 1 ? "Concluído" : "Concluídos";
}

export function DashboardProgressSummary({
  percentage,
  viewedCount,
  pendingCount,
  totalMaterials,
}: DashboardProgressSummaryProps) {
  return (
    <div>
      <ProgressBar value={percentage} label="Progresso geral" />
      <div
        className="mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border text-center"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <SummaryCount
          label={getCompletedCountLabel(viewedCount)}
          value={viewedCount}
        />
        <SummaryCount label="Em aberto" value={pendingCount} withDivider />
        <SummaryCount label="Materiais" value={totalMaterials} />
      </div>
    </div>
  );
}
