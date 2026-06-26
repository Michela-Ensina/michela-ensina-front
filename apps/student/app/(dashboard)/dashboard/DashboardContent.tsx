"use client";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { ContinueStudySection } from "@/components/student/dashboard/ContinueStudySection";
import { DashboardHero } from "@/components/student/dashboard/DashboardHero";
import { DashboardHighlights } from "@/components/student/dashboard/DashboardHighlights";
import { EmptyState } from "@/components/ui/EmptyState";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useDashboardData } from "@/lib/student/use-dashboard-data";
import type { Material } from "@/types/student";

function getNextMaterial(materials: Material[], viewedIds: Set<string>): Material | null {
  return materials.find((material) => !viewedIds.has(material.id)) ?? materials[0] ?? null;
}

export function DashboardContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useDashboardData();

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.45fr_0.75fr]">
        <SurfaceCard className="min-h-80 animate-pulse" />
        <SurfaceCard className="min-h-80 animate-pulse" />
      </div>
    );
  }

  if (errorMessage) {
    return <LoadErrorCard message={errorMessage} onRetry={() => void refetch()} />;
  }

  if (!data) {
    return null;
  }

  const viewedIds = new Set(data.progress.items.filter((item) => item.viewed).map((item) => item.material_id));
  const nextMaterial = getNextMaterial(data.materials, viewedIds);
  const recentMaterials = data.materials.slice(0, 3);
  const highlightedMaterials = data.materials.slice(0, 2);
  const pendingCount = Math.max(data.progress.total_materials - data.progress.viewed_count, 0);

  return (
    <div className="space-y-7">
      <DashboardHero
        pendingCount={pendingCount}
        progress={data.progress}
        student={data.student}
        totalMaterials={data.materials.length}
      />

      {isEmpty ? (
        <EmptyState
          title="Ainda não há materiais disponíveis"
          description="Assim que os conteúdos forem liberados, você verá seu progresso aqui."
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          <ContinueStudySection
            nextMaterial={nextMaterial}
            progressItems={data.progress.items}
            recentMaterials={recentMaterials}
          />
          <DashboardHighlights
            materials={highlightedMaterials}
            pendingCount={pendingCount}
            progressItems={data.progress.items}
          />
        </div>
      )}
    </div>
  );
}
