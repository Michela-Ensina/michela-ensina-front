"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import { MetricTile } from "@/components/student/MetricTile";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useProgressData } from "@/lib/student/use-progress-data";

export function ProgressContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useProgressData();

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

  if (!data || isEmpty) {
    return (
      <EmptyState
        title="Ainda não há progresso registrado"
        description="Quando você iniciar seus materiais, seu progresso aparecerá aqui."
      />
    );
  }

  const pendingCount = Math.max(data.total_materials - data.viewed_count, 0);

  return (
    <div className="space-y-5">
      <SurfaceCard>
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
          <div>
            <h2 className="text-2xl">Seu progresso</h2>
            <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--color-text-muted)" }}>
              Acompanhe o que já foi concluído e o que ainda está aberto para estudo.
            </p>
          </div>
          <ProgressBar value={data.percentage} label="Progresso geral" />
        </div>
      </SurfaceCard>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricTile
          label="Percentual concluído"
          value={`${data.percentage}%`}
          detail="Atualizado a partir dos materiais marcados"
          icon={<CheckCircle2 size={19} aria-hidden="true" />}
        />
        <MetricTile
          label="Concluídos"
          value={`${data.viewed_count}`}
          detail={`${data.total_materials} materiais no total`}
          icon={<Circle size={19} aria-hidden="true" />}
        />
        <MetricTile
          label="Pendentes"
          value={`${pendingCount}`}
          detail="Continue no seu ritmo"
          icon={<Clock3 size={19} aria-hidden="true" />}
        />
      </div>

      <SurfaceCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl">Itens de progresso</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Status individual dos materiais liberados.
            </p>
          </div>
          <Link href="/materiais">
            <Button type="button" variant="outline" size="sm">
              Ir para materiais
            </Button>
          </Link>
        </div>

        <ul className="mt-4 divide-y" style={{ borderColor: "var(--color-border)" }}>
          {data.items.map((item) => {
            const title = item.material?.title ?? `Material ${item.material_id.slice(0, 8)}`;

            return (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {item.viewed_at
                      ? `Concluído em ${new Date(item.viewed_at).toLocaleDateString("pt-BR")}`
                      : "Aguardando conclusão"}
                  </p>
                </div>

                <StatusBadge
                  label={item.viewed ? "Material concluído" : "Em andamento"}
                  tone={item.viewed ? "concluído" : "em-andamento"}
                />
              </li>
            );
          })}
        </ul>
      </SurfaceCard>
    </div>
  );
}
