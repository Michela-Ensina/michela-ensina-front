"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { getMaterialStatus } from "@/components/student/materials/material-display";
import { SectionHeader } from "@/components/student/SectionHeader";
import {
  MaterialsFilterSidebar,
  type MaterialStatusFilter,
  type MaterialTypeFilter,
} from "@/components/student/materials/MaterialsFilterSidebar";
import { MaterialsStudyList } from "@/components/student/materials/MaterialsStudyList";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialsData } from "@/lib/student/use-materials-data";

export function MaterialsContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useMaterialsData();
  const [statusFilter, setStatusFilter] = useState<MaterialStatusFilter>("todos");
  const [typeFilter, setTypeFilter] = useState<MaterialTypeFilter>("todos");

  const progressItems = useMemo(() => data?.progress?.items ?? [], [data?.progress?.items]);
  const filteredMaterials = useMemo(() => {
    if (!data) return [];

    return data.materials.filter((material) => {
      const status = getMaterialStatus(material, progressItems);
      const matchesStatus =
        statusFilter === "todos" ||
        (statusFilter === "concluidos" && status.tone === "concluído") ||
        (statusFilter === "em-aberto" && status.tone !== "concluído");
      const matchesType = typeFilter === "todos" || material.type === typeFilter;

      return matchesStatus && matchesType;
    });
  }, [data, progressItems, statusFilter, typeFilter]);

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <SurfaceCard className="min-h-64 animate-pulse" />
        <SurfaceCard className="min-h-64 animate-pulse" />
      </div>
    );
  }

  if (errorMessage) {
    return <LoadErrorCard message={errorMessage} onRetry={() => void refetch()} />;
  }

  if (!data || isEmpty) {
    return (
      <EmptyState
        title="Nenhum material disponível"
        description="Novos conteúdos aparecerão aqui assim que forem liberados."
      />
    );
  }

  const featuredMaterial = filteredMaterials[0];

  return (
    <div className="space-y-6">
      <section
        className="student-section-surface relative overflow-hidden rounded-[var(--radius-lg)] border p-5 sm:p-6"
      >
        <Image
          src="/assets/brand/graphics/estrela-lilas.svg"
          alt=""
          width={34}
          height={34}
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-5 opacity-20"
        />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <SectionHeader
            title="Biblioteca de materiais"
            description="Filtre os conteúdos liberados e continue pelo item mais importante para o seu momento."
          />
          {data.progress ? (
            <div
              className="student-soft-surface rounded-[var(--radius-md)] border p-4"
            >
              <ProgressBar value={data.progress.percentage} label="Conclusão dos materiais" />
            </div>
          ) : null}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
        <MaterialsFilterSidebar
          featuredMaterial={featuredMaterial}
          progressItems={progressItems}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onStatusFilterChange={setStatusFilter}
          onTypeFilterChange={setTypeFilter}
        />

        <MaterialsStudyList
          materials={filteredMaterials}
          totalMaterials={data.materials.length}
          progressItems={progressItems}
        />
      </div>
    </div>
  );
}
