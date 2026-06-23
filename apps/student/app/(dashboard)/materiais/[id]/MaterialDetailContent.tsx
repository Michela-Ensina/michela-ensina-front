"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, FileText, Link2, Paperclip, PlayCircle } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ApiClientError } from "@/lib/api/errors";
import { getMaterialById } from "@/lib/api/materials";
import { getProgress, updateMaterialProgress } from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import type { Material, ProgressItem } from "@/types/student";

type MaterialDetailContentProps = {
  materialId: string;
};

function resolveEmbedUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "").trim();
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      if (!videoId) return null;
      return `https://player.vimeo.com/video/${videoId}`;
    }
  } catch {
    return null;
  }

  return null;
}

function MaterialFallbackIcon({ type }: { type: Material["type"] }) {
  if (type === "pdf") return <FileText size={28} aria-hidden="true" />;
  if (type === "attachment") return <Paperclip size={28} aria-hidden="true" />;
  return <Link2 size={28} aria-hidden="true" />;
}

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const { token, logout } = useAuth();
  const [material, setMaterial] = useState<Material | null>(null);
  const [progressItem, setProgressItem] = useState<ProgressItem | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressErrorMessage, setProgressErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setProgressErrorMessage(null);
    setNotFound(false);

    try {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      const [materialResponse, progress] = await Promise.all([
        getMaterialById(materialId, token),
        getProgress(token),
      ]);

      setMaterial(materialResponse);
      setProgressPercentage(progress.percentage);
      setProgressItem(progress.items.find((item) => item.material_id === materialId) ?? null);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        setNotFound(true);
        setMaterial(null);
        setProgressItem(null);
        return;
      }

      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível carregar este material.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [logout, materialId, token]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchData]);

  const status = useMemo(() => {
    if (!material) return { label: "Ainda não iniciado", tone: "novo" as const };
    return getMaterialStatus(material, progressItem ? [progressItem] : []);
  }, [material, progressItem]);
  const type = material ? getMaterialTypeMeta(material.type) : null;
  const embedUrl = material?.url ? resolveEmbedUrl(material.url) : null;

  async function handleMarkAsCompleted() {
    if (!material) return;

    setIsUpdatingProgress(true);
    setProgressErrorMessage(null);

    try {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      const updatedItem = await updateMaterialProgress(material.id, token);
      const progress = await getProgress(token);
      setProgressItem(updatedItem);
      setProgressPercentage(progress.percentage);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setProgressErrorMessage(
        error instanceof Error ? error.message : "Não foi possível atualizar o progresso.",
      );
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  if (isLoading) {
    return <SurfaceCard className="min-h-80 animate-pulse" />;
  }

  if (errorMessage) {
    return <LoadErrorCard message={errorMessage} onRetry={() => void fetchData()} />;
  }

  if (notFound || !material || !type) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material não encontrado</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Este material não está disponível para a sua conta.
        </p>
        <Link href="/materiais" className="student-text-action mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <Link href="/materiais" className="student-text-action inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
          <ArrowLeft size={16} aria-hidden="true" />
          Materiais
        </Link>

        <SectionHeader
          title={material.title}
          description={material.description ?? "Material disponível para estudo."}
          action={<StatusBadge label={status.label} tone={status.tone} />}
        />

        <div
          className="overflow-hidden rounded-[var(--radius-lg)] border"
          style={{
            borderColor: "color-mix(in oklab, var(--color-border) 70%, var(--color-accent-soft))",
            backgroundColor: "color-mix(in oklab, var(--color-surface) 88%, var(--color-brand-lilac))",
          }}
        >
          {material.type === "video" && embedUrl ? (
            <iframe
              title={material.title}
              src={embedUrl}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="grid min-h-[360px] place-items-center p-8 text-center">
              <div>
                <div
                  className="mx-auto grid size-16 place-items-center rounded-2xl"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--color-primary) 16%, var(--color-surface))",
                    color: "var(--color-primary)",
                  }}
                >
                  <MaterialFallbackIcon type={material.type} />
                </div>
                <h3 className="mt-4 text-2xl">{type.label}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--color-text-muted)" }}>
                  Este conteúdo está disponível em uma referência externa.
                </p>
                <a href={material.url} target="_blank" rel="noreferrer" className="mt-5 inline-block">
                  <Button type="button" variant="primary" className="gap-2">
                    Abrir material
                    <ExternalLink size={16} aria-hidden="true" />
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <SurfaceCard>
          <p className="flex items-center gap-2 text-sm font-semibold">
            <PlayCircle size={16} aria-hidden="true" />
            Informações do material
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>Tipo</dt>
              <dd className="font-semibold">{type.label}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>Status</dt>
              <dd><StatusBadge label={status.label} tone={status.tone} /></dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>Ordem</dt>
              <dd className="font-semibold">{material.order}</dd>
            </div>
          </dl>
        </SurfaceCard>

        <SurfaceCard>
          <p className="text-sm font-semibold">Progresso da jornada</p>
          <div className="mt-4">
            <ProgressBar value={progressPercentage} label="Conclusão geral" />
          </div>
          <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Marque este conteúdo como concluído quando terminar de estudar.
          </p>

          {progressErrorMessage ? <Alert tone="error">{progressErrorMessage}</Alert> : null}

          <Button
            type="button"
            onClick={() => void handleMarkAsCompleted()}
            disabled={isUpdatingProgress || status.tone === "concluído"}
            variant={status.tone === "concluído" ? "outline" : "primary"}
            fullWidth
            className="mt-4"
            style={{
              opacity: isUpdatingProgress || status.tone === "concluído" ? 0.75 : 1,
            }}
          >
            {isUpdatingProgress
              ? "Atualizando..."
              : status.tone === "concluído"
                ? "Material concluído"
                : "Marcar como concluído"}
          </Button>
        </SurfaceCard>
      </aside>
    </div>
  );
}
