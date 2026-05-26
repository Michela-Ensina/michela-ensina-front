"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useProgressData } from "@/lib/student/use-progress-data";

export function ProgressContent() {
  const { data, isLoading, errorMessage, isEmpty, refetch } = useProgressData();

  if (isLoading) {
    return (
      <SurfaceCard>
        <p style={{ color: "var(--color-text-muted)" }}>Carregando progresso...</p>
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
        title="Ainda não há progresso registrado"
        description="Quando você iniciar seus materiais, seu progresso aparecerá aqui."
      />
    );
  }

  const pendingCount = Math.max(data.total_materials - data.viewed_count, 0);

  return (
    <div className="space-y-4">
      <SurfaceCard>
        <h2 className="text-2xl">Seu progresso</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Acompanhe seu avanço nas aulas e materiais do curso.
        </p>
      </SurfaceCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <SurfaceCard className="lg:col-span-1">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Percentual concluído
          </p>
          <p className="mt-2 text-3xl font-bold">{data.percentage}%</p>
          <div
            className="mt-3 h-2 w-full rounded-full"
            style={{ backgroundColor: "color-mix(in oklab, var(--color-text-muted) 25%, transparent)" }}
          >
            <div
              className="h-2 rounded-full"
              style={{
                width: `${Math.max(0, Math.min(data.percentage, 100))}%`,
                backgroundColor: "var(--color-primary)",
              }}
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="lg:col-span-1">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Totais
          </p>
          <p className="mt-2 text-sm">Materiais: {data.total_materials}</p>
          <p className="mt-1 text-sm">Concluídos: {data.viewed_count}</p>
          <p className="mt-1 text-sm">Pendentes: {pendingCount}</p>
        </SurfaceCard>

        <SurfaceCard className="lg:col-span-1">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Próximo passo
          </p>
          <p className="mt-2 text-sm">Continue suas aulas para evoluir no curso.</p>
          <Link href="/materiais" className="mt-3 inline-block text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
            Ir para materiais
          </Link>
        </SurfaceCard>
      </div>

      <SurfaceCard>
        <h3 className="text-xl">Itens de progresso</h3>
        <ul className="mt-4 space-y-2.5">
          {data.items.length === 0 ? (
            <li>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Nenhum item de progresso retornado pelo backend no momento.
              </p>
            </li>
          ) : (
            data.items.map((item) => {
              const title = item.material?.title ?? `Material ${item.material_id.slice(0, 8)}`;

              return (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {item.viewed_at
                        ? `Concluído em ${new Date(item.viewed_at).toLocaleDateString("pt-BR")}`
                        : "Sem data de conclusão"}
                    </p>
                  </div>

                  <StatusBadge
                    label={item.viewed ? "Concluído" : "Em andamento"}
                    tone={item.viewed ? "concluído" : "em-andamento"}
                  />
                </li>
              );
            })
          )}
        </ul>
      </SurfaceCard>
    </div>
  );
}
