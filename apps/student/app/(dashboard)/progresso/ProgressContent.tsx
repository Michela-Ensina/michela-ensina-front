"use client";

import Link from "next/link";
import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

import { getMaterialStatus, MaterialListItem } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialsData } from "@/lib/student/use-materials-data";

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
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Não foi possível carregar</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {errorMessage}
        </p>
        <Button type="button" onClick={() => void refetch()} variant="outline" className="mt-4">
          Tentar novamente
        </Button>
      </SurfaceCard>
    );
  }

  if (!data || isEmpty || !data.progress) {
    return (
      <EmptyState
        title="Ainda não há progresso registrado"
        description="Quando você iniciar seus materiais, seu progresso aparecerá aqui."
      />
    );
  }

  const completedMaterials = data.materials.filter((material) => getMaterialStatus(material, data.progress.items).tone === "concluído");
  const openMaterials = data.materials.filter((material) => getMaterialStatus(material, data.progress.items).tone !== "concluído");

  return (
    <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
      <aside className="space-y-4">
        <SurfaceCard>
          <p className="text-sm font-semibold">Resumo da jornada</p>
          <div className="mt-5">
            <ProgressBar value={data.progress.percentage} label="Progresso geral" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border p-3" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-2xl font-bold">{completedMaterials.length}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Concluídos</p>
            </div>
            <div className="rounded-2xl border p-3" style={{ borderColor: "var(--color-border)" }}>
              <p className="text-2xl font-bold">{openMaterials.length}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Em aberto</p>
            </div>
          </div>
        </SurfaceCard>

        <div className="rounded-[var(--radius-lg)] border p-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Clock3 size={16} aria-hidden="true" />
            Próximo passo
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
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
        className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "color-mix(in oklab, var(--color-surface) 68%, transparent)",
        }}
      >
        <div className="border-b py-4" style={{ borderColor: "var(--color-border)" }}>
          <SectionHeader
            title="Linha de progresso"
            description="Materiais agrupados pelo estado atual para uma leitura rápida da sua jornada."
          />
        </div>

        <div className="py-4">
          <div className="flex items-center gap-2">
            <CircleDashed size={16} aria-hidden="true" />
            <h3 className="text-lg">Em aberto</h3>
          </div>
          <div className="mt-1">
            {openMaterials.length > 0 ? (
              openMaterials.map((material) => (
                <MaterialListItem key={material.id} material={material} progressItems={data.progress.items} density="compact" />
              ))
            ) : (
              <p className="py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Não há materiais em aberto no momento.
              </p>
            )}
          </div>
        </div>

        <div className="border-t py-4" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} aria-hidden="true" />
            <h3 className="text-lg">Concluídos</h3>
          </div>
          <div className="mt-1">
            {completedMaterials.length > 0 ? (
              completedMaterials.map((material) => (
                <MaterialListItem key={material.id} material={material} progressItems={data.progress.items} density="compact" />
              ))
            ) : (
              <p className="py-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Os materiais concluídos aparecerão aqui.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
