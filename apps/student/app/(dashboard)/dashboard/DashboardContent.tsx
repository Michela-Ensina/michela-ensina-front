"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Clock3 } from "lucide-react";

import { MaterialCard } from "@/components/student/MaterialCard";
import { MetricTile } from "@/components/student/MetricTile";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <SurfaceCard key={index} className="min-h-32 animate-pulse" />
        ))}
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

  if (!data) {
    return null;
  }

  const viewedIds = new Set(data.progress.items.filter((item) => item.viewed).map((item) => item.material_id));
  const nextMaterial = getNextMaterial(data.materials, viewedIds);
  const recentMaterials = data.materials.slice(0, 2);
  const pendingCount = Math.max(data.progress.total_materials - data.progress.viewed_count, 0);

  return (
    <div className="space-y-5">
      <SurfaceCard className="overflow-hidden">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                label={data.student.is_active ? "Acesso ativo" : "Acesso limitado"}
                tone={data.student.is_active ? "concluído" : "bloqueado"}
              />
              {data.student.must_change_password ? <StatusBadge label="Senha recomendada" tone="em-andamento" /> : null}
            </div>
            <h2 className="mt-4 text-3xl leading-tight">Olá, {data.student.name.split(" ")[0]}.</h2>
            <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--color-text-muted)" }}>
              Continue seus estudos do Modo Fluente com materiais organizados e progresso fácil de acompanhar.
            </p>
          </div>

          <div className="min-w-64">
            <ProgressBar value={data.progress.percentage} label="Progresso geral" />
          </div>
        </div>
      </SurfaceCard>

      {isEmpty ? (
        <EmptyState
          title="Ainda não há materiais disponíveis"
          description="Assim que os conteúdos forem liberados, você verá seu progresso aqui."
        />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricTile
              label="Concluídos"
              value={`${data.progress.viewed_count}`}
              detail={`${data.progress.total_materials} materiais disponíveis`}
              icon={<CheckCircle2 size={19} aria-hidden="true" />}
            />
            <MetricTile
              label="Em aberto"
              value={`${pendingCount}`}
              detail="Materiais para continuar estudando"
              icon={<Clock3 size={19} aria-hidden="true" />}
            />
            <MetricTile
              label="Biblioteca"
              value={`${data.materials.length}`}
              detail="Vídeos, PDFs, anexos e links"
              icon={<BookOpen size={19} aria-hidden="true" />}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
            <SurfaceCard>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Continuar estudando
              </p>
              <h3 className="mt-2 text-2xl leading-tight">{nextMaterial?.title ?? "Sem sugestão disponível"}</h3>
              <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {nextMaterial?.description ?? "Assim que houver um material disponível, ele aparecerá aqui."}
              </p>
              <Link href={nextMaterial ? `/materiais/${nextMaterial.id}` : "/materiais"} className="mt-5 inline-block">
                <Button type="button" variant="primary">
                  Continuar material
                </Button>
              </Link>
            </SurfaceCard>

            <div className="grid gap-4 md:grid-cols-2">
              {recentMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} progressItems={data.progress.items} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
