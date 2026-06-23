"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialCard } from "@/components/student/MaterialCard";
import { MaterialListItem } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import { DashboardProgressSummary } from "@/components/student/dashboard/DashboardProgressSummary";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
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
  const pendingCount = Math.max(data.progress.total_materials - data.progress.viewed_count, 0);

  return (
    <div className="space-y-7">
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
                label={data.student.is_active ? "Acesso ativo" : "Acesso limitado"}
                tone={data.student.is_active ? "concluído" : "bloqueado"}
              />
              {data.student.must_change_password ? <StatusBadge label="Senha recomendada" tone="em-andamento" /> : null}
            </div>
            <h2 className="mt-4 text-3xl leading-tight">Olá, {data.student.name.split(" ")[0]}.</h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base" style={{ color: "var(--color-text-muted)" }}>
              Seu espaço do Modo Fluente está pronto para continuar os estudos, revisar materiais e acompanhar o ritmo.
            </p>
          </div>

          <DashboardProgressSummary
            percentage={data.progress.percentage}
            viewedCount={data.progress.viewed_count}
            pendingCount={pendingCount}
            totalMaterials={data.materials.length}
          />
        </div>
      </section>

      {isEmpty ? (
        <EmptyState
          title="Ainda não há materiais disponíveis"
          description="Assim que os conteúdos forem liberados, você verá seu progresso aqui."
        />
      ) : (
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.8fr]">
          <section className="space-y-4">
            <SectionHeader
              title="Continuar estudando"
              description="O próximo conteúdo aparece em destaque para manter o fluxo de estudo simples."
              action={
                <Link href="/materiais" className="student-text-action rounded-lg px-2 py-1 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  Ver biblioteca
                </Link>
              }
            />

            <div
              className="grid gap-0 overflow-hidden rounded-[var(--radius-lg)] border lg:grid-cols-[1fr_0.9fr]"
              style={{
                borderColor: "color-mix(in oklab, var(--color-border) 82%, var(--color-primary))",
                backgroundColor: "color-mix(in oklab, var(--color-surface) 88%, var(--color-secondary))",
              }}
            >
              <div className="p-5 sm:p-6">
                <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  <Clock3 size={16} aria-hidden="true" />
                  Próximo material
                </p>
                <h3 className="mt-3 text-2xl leading-tight">{nextMaterial?.title ?? "Sem sugestão disponível"}</h3>
                <p className="mt-3 max-w-xl text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {nextMaterial?.description ?? "Assim que houver um material disponível, ele aparecerá aqui."}
                </p>
                <Link href={nextMaterial ? `/materiais/${nextMaterial.id}` : "/materiais"} className="mt-5 inline-block">
                  <Button type="button" variant="primary" className="gap-2">
                    Continuar material
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </Link>
              </div>

              <div
                className="border-t p-5 lg:border-l lg:border-t-0"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 86%, var(--color-secondary))",
                }}
              >
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <BookOpen size={16} aria-hidden="true" />
                  Materiais recentes
                </p>
                <div className="mt-2">
                  {recentMaterials.map((material) => (
                    <MaterialListItem key={material.id} material={material} progressItems={data.progress.items} density="compact" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <SectionHeader title="Destaques" description="Uma visão compacta do que está liberado agora." />
            <div className="grid gap-4">
              {data.materials.slice(0, 2).map((material) => (
                <MaterialCard key={material.id} material={material} progressItems={data.progress.items} />
              ))}
            </div>
            <div className="rounded-[var(--radius-lg)] border p-4" style={{ borderColor: "var(--color-border)" }}>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 size={16} aria-hidden="true" />
                Ritmo de estudo
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {pendingCount > 0
                  ? `${pendingCount} materiais ainda estão abertos para continuar.`
                  : "Todos os materiais liberados foram concluídos."}
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
