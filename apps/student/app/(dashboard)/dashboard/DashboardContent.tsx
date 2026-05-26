"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useDashboardData } from "@/lib/student/use-dashboard-data";
import type { Material } from "@/types/student";

function getNextMaterial(materials: Material[], viewedIds: Set<string>): Material | null {
  for (const material of materials) {
    if (!viewedIds.has(material.id)) {
      return material;
    }
  }

  return materials[0] ?? null;
}

export function DashboardContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useDashboardData();

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-5">
        <SurfaceCard>
          <p style={{ color: "var(--color-text-muted)" }}>Carregando dados do dashboard...</p>
        </SurfaceCard>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="space-y-4 sm:space-y-5">
        <SurfaceCard>
          <h2 className="text-2xl">Não foi possível carregar</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {errorMessage}
          </p>
          <Button
            type="button"
            onClick={() => void refetch()}
            variant="outline"
            className="mt-4"
          >
            Tentar novamente
          </Button>
        </SurfaceCard>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const viewedIds = new Set(data.progress.items.filter((item) => item.viewed).map((item) => item.material_id));
  const nextMaterial = getNextMaterial(data.materials, viewedIds);
  const recentMaterials = data.materials.slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-5">
      <SurfaceCard>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Olá, {data.student.name}.
            </p>
            <h2 className="mt-2 text-2xl">Que bom te ver por aqui.</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {data.student.email}
            </p>
          </div>

          <StatusBadge
            label={data.student.is_active ? "Acesso ativo" : "Acesso limitado"}
            tone={data.student.is_active ? "concluído" : "bloqueado"}
          />
        </div>
      </SurfaceCard>

      {isEmpty ? (
        <EmptyState
          title="Ainda não há materiais disponíveis"
          description="Assim que os conteúdos forem liberados, você verá seu progresso aqui."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <SurfaceCard className="lg:col-span-1">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Progresso geral
            </p>
            <p className="mt-2 text-3xl font-bold">{data.progress.percentage}%</p>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {data.progress.viewed_count} de {data.progress.total_materials} materiais concluídos.
            </p>
            <div
              className="mt-3 h-2 w-full rounded-full"
              style={{ backgroundColor: "color-mix(in oklab, var(--color-text-muted) 25%, transparent)" }}
            >
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${Math.max(0, Math.min(data.progress.percentage, 100))}%`,
                  backgroundColor: "var(--color-primary)",
                }}
              />
            </div>
          </SurfaceCard>

          <SurfaceCard className="lg:col-span-1">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Continue de onde parou
            </p>
            <h3 className="mt-2 text-xl">{nextMaterial ? nextMaterial.title : "Sem sugestão disponível"}</h3>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {nextMaterial?.description ??
                "Assim que houver um material disponível, ele aparecerá aqui para você continuar."}
            </p>
            <div className="mt-3">
              <Link href="/materiais" className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                Ver materiais
              </Link>
            </div>
          </SurfaceCard>

          <SurfaceCard className="lg:col-span-1">
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Materiais disponíveis
            </p>
            {recentMaterials.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {recentMaterials.map((item) => (
                  <li key={item.id} className="rounded-lg border p-2.5" style={{ borderColor: "var(--color-border)" }}>
                    <p className="text-sm">{item.title}</p>
                    <p className="mt-1 text-xs capitalize" style={{ color: "var(--color-text-muted)" }}>
                      {item.type}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Nenhum material encontrado.
              </p>
            )}
          </SurfaceCard>
        </div>
      )}
    </div>
  );
}
