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

function getPendingMaterialsMessage(pendingCount: number) {
  if (pendingCount === 0) {
    return "Todos os materiais liberados foram concluídos.";
  }

  if (pendingCount === 1) {
    return "1 material ainda está aberto para continuar.";
  }

  return `${pendingCount} materiais ainda estão abertos para continuar.`;
}

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
      <div className="student-soft-surface rounded-[var(--radius-lg)] border p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 size={16} aria-hidden="true" />
          Ritmo de estudo
        </p>
        <p className="student-muted-text mt-2 text-sm">
          {getPendingMaterialsMessage(pendingCount)}
        </p>
      </div>
    </SurfaceCard>
  );
}
