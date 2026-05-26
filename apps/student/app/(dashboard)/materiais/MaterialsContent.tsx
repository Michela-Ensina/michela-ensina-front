"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialsData } from "@/lib/student/use-materials-data";
import type { Material, ProgressItem } from "@/types/student";

function getMaterialStatus(material: Material, progressItems: ProgressItem[]) {
  const progress = progressItems.find((item) => item.material_id === material.id);

  if (!progress) {
    return { label: "Não iniciado", tone: "novo" as const };
  }

  if (progress.viewed) {
    return { label: "Concluído", tone: "concluído" as const };
  }

  return { label: "Em andamento", tone: "em-andamento" as const };
}

function getMaterialTypeLabel(type: Material["type"]) {
  if (type === "video") return "Vídeo";
  if (type === "pdf") return "PDF";
  if (type === "attachment") return "Anexo";
  return "Material";
}

export function MaterialsContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useMaterialsData();

  if (isLoading) {
    return (
      <SurfaceCard>
        <p style={{ color: "var(--color-text-muted)" }}>Carregando materiais...</p>
      </SurfaceCard>
    );
  }

  if (errorMessage) {
    return (
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
    );
  }

  if (!data || isEmpty) {
    return (
      <EmptyState
        title="Nenhum material disponível"
        description="Novos conteúdos aparecerão aqui assim que forem liberados."
      />
    );
  }

  const progressItems = data.progress?.items ?? [];

  return (
    <div className="space-y-4">
      <SurfaceCard>
        <h2 className="text-2xl">Seus materiais</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Acompanhe as aulas e materiais liberados para a sua jornada.
        </p>
      </SurfaceCard>

      <div className="grid gap-4 md:grid-cols-2">
        {data.materials.map((material) => {
          const status = getMaterialStatus(material, progressItems);

          return (
            <SurfaceCard key={material.id}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl">{material.title}</h3>
                <StatusBadge label={status.label} tone={status.tone} />
              </div>

              <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {material.description ?? "Material disponível para estudo."}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-text-muted)" }}>
                  {getMaterialTypeLabel(material.type)}
                </p>

                <Link href={`/materiais/${material.id}`} className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  {status.tone === "concluído" ? "Revisar" : "Continuar"}
                </Link>
              </div>
            </SurfaceCard>
          );
        })}
      </div>
    </div>
  );
}
