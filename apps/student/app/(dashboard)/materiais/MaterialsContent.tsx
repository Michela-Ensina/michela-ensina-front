"use client";

import { MaterialCard } from "@/components/student/MaterialCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialsData } from "@/lib/student/use-materials-data";

export function MaterialsContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useMaterialsData();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <SurfaceCard key={index} className="min-h-56 animate-pulse" />
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
    <div className="space-y-5">
      <SurfaceCard>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <h2 className="text-2xl">Seus materiais</h2>
            <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--color-text-muted)" }}>
              Aulas e apoios do Modo Fluente em uma lista simples para revisar, continuar ou começar.
            </p>
          </div>
          {data.progress ? <ProgressBar value={data.progress.percentage} label="Conclusão dos materiais" /> : null}
        </div>
      </SurfaceCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data.materials.map((material) => (
          <MaterialCard key={material.id} material={material} progressItems={progressItems} />
        ))}
      </div>
    </div>
  );
}
