import { CheckCircle2 } from "lucide-react";

import { MaterialCard } from "@/components/student/MaterialCard";
import { SectionHeader } from "@/components/student/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material, ProgressItem } from "@/types/student";

type DashboardHighlightsProps = {
  materials: Material[];
  pendingCount: number;
  progressItems: ProgressItem[];
};

export function DashboardHighlights({
  materials,
  pendingCount,
  progressItems,
}: DashboardHighlightsProps) {
  return (
    <SurfaceCard className="space-y-4">
      <SectionHeader
        title="Destaques"
        description="Uma visão compacta do que está liberado agora."
      />
      <div className="grid gap-4">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            progressItems={progressItems}
          />
        ))}
      </div>
      <div
        className="student-soft-surface rounded-[var(--radius-lg)] border p-4"
      >
        <p className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 size={16} aria-hidden="true" />
          Ritmo de estudo
        </p>
        <p className="student-muted-text mt-2 text-sm">
          {pendingCount > 0
            ? `${pendingCount} materiais ainda estão abertos para continuar.`
            : "Todos os materiais liberados foram concluídos."}
        </p>
      </div>
    </SurfaceCard>
  );
}
