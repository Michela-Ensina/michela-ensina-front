"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { getMaterialStatus } from "@/components/student/materials/material-display";
import { ProgressMaterialSection } from "@/components/student/progress/ProgressMaterialSection";
import { ProgressCountTile } from "@/components/student/progress/ProgressCountTile";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialsData } from "@/lib/student/use-materials-data";
import type { Material, ProgressItem } from "@/types/student";

type ProgressMaterialGroups = {
  completedMaterials: Material[];
  openMaterials: Material[];
};

function groupMaterialsByProgress(materials: Material[], progressItems: ProgressItem[]): ProgressMaterialGroups {
  return materials.reduce<ProgressMaterialGroups>(
    (groups, material) => {
      const isCompleted = getMaterialStatus(material, progressItems).tone === "concluído";

      if (isCompleted) {
        groups.completedMaterials.push(material);
      } else {
        groups.openMaterials.push(material);
      }

      return groups;
    },
    { completedMaterials: [], openMaterials: [] },
  );
}

export function ProgressContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useMaterialsData();

  if (isLoading) {
    return (
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SurfaceCard className="min-h-72 animate-pulse" />
        <SurfaceCard className="min-h-72 animate-pulse" />
      </div>
    );
  }

  if (errorMessage) {
    return <LoadErrorCard message={errorMessage} onRetry={() => void refetch()} />;
  }

  if (!data || isEmpty || !data.progress) {
    return (
      <EmptyState
        title="Ainda não há progresso registrado"
        description="Quando você iniciar seus materiais, seu progresso aparecerá aqui."
      />
    );
  }

  const progress = data.progress;
  const { completedMaterials, openMaterials } = groupMaterialsByProgress(data.materials, progress.items);

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-4">
        <SurfaceCard className="relative overflow-hidden">
          <Image
            src="/assets/brand/graphics/estrela-lilas.svg"
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-5 opacity-20"
          />
          <div className="relative">
            <p className="text-sm font-semibold">Resumo da jornada</p>
            <div className="mt-5">
              <ProgressBar value={progress.percentage} label="Progresso geral" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ProgressCountTile
                count={completedMaterials.length}
                label="Concluídos"
                accentColor="#48b08c"
              />
              <ProgressCountTile
                count={openMaterials.length}
                label="Em aberto"
                accentColor="var(--color-brand-blue)"
              />
            </div>
          </div>
        </SurfaceCard>

        <div
          className="student-elevated-surface rounded-[var(--radius-lg)] border p-4"
        >
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Clock3 size={16} aria-hidden="true" />
            Próximo passo
          </p>
          <p className="student-muted-text mt-2 text-sm">
            Continue pelo primeiro material em aberto para manter o ritmo sem procurar demais.
          </p>
          <Link href="/materiais" className="mt-4 inline-block">
            <Button type="button" variant="outline" size="sm">
              Abrir materiais
            </Button>
          </Link>
        </div>
      </aside>

      <section
        className="student-elevated-surface rounded-[var(--radius-lg)] border px-4 sm:px-5"
      >
        <div className="border-b py-4" style={{ borderColor: "var(--color-border)" }}>
          <SectionHeader
            title="Linha de progresso"
            description="Materiais agrupados pelo estado atual para uma leitura rápida da sua jornada."
          />
        </div>

        <ProgressMaterialSection
          title="Em aberto"
          icon={<CircleDashed size={16} aria-hidden="true" />}
          materials={openMaterials}
          progressItems={progress.items}
          emptyMessage="Não há materiais em aberto no momento."
        />

        <div className="border-t py-4" style={{ borderColor: "var(--color-border)" }}>
          <ProgressMaterialSection
            title="Concluídos"
            icon={<CheckCircle2 size={16} aria-hidden="true" />}
            materials={completedMaterials}
            progressItems={progress.items}
            emptyMessage="Os materiais concluídos aparecerão aqui."
          />
        </div>
      </section>
    </div>
  );
}
