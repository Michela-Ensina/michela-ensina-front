"use client";

import { useMemo, useState } from "react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { getMaterialStatus, MaterialListItem } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import {
  MaterialsFilterSidebar,
  type MaterialStatusFilter,
  type MaterialTypeFilter,
} from "@/components/student/materials/MaterialsFilterSidebar";
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

  const featuredMaterial = filteredMaterials[0] ?? data.materials[0];

  return (
    <div className="space-y-6">
      <section
        className="rounded-[var(--radius-lg)] border p-5 sm:p-6"
        style={{
          borderColor: "color-mix(in oklab, var(--color-border) 82%, var(--color-primary))",
          backgroundColor: "color-mix(in oklab, var(--color-surface) 90%, var(--color-brand-lilac))",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <SectionHeader
            title="Biblioteca de materiais"
            description="Filtre os conteúdos liberados e continue pelo item mais importante para o seu momento."
          />
          {data.progress ? <ProgressBar value={data.progress.percentage} label="Conclusão dos materiais" /> : null}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <MaterialsFilterSidebar
          featuredMaterial={featuredMaterial}
          progressItems={progressItems}
          statusFilter={statusFilter}
          typeFilter={typeFilter}
          onStatusFilterChange={setStatusFilter}
          onTypeFilterChange={setTypeFilter}
        />

        <section
          className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
          style={{
            borderColor: "color-mix(in oklab, var(--color-border) 72%, var(--color-accent-soft))",
            backgroundColor: "color-mix(in oklab, var(--color-surface) 76%, transparent)",
          }}
        >
          <div className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:items-end sm:justify-between" style={{ borderColor: "var(--color-border)" }}>
            <div>
              <h2 className="text-xl">Lista de estudo</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {filteredMaterials.length} de {data.materials.length} materiais exibidos.
              </p>
            </div>
          </div>

          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <MaterialListItem key={material.id} material={material} progressItems={progressItems} />
            ))
          ) : (
            <div className="py-6">
              <EmptyState
                title="Nenhum material nesse filtro"
                description="Ajuste os filtros para ver outros conteúdos liberados."
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
