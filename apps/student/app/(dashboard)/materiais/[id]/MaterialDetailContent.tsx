"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ExternalLink, FileText, Link2, Paperclip, PlayCircle } from "lucide-react";

import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import {
  getPreviewMaterialById,
  getPreviewProgress,
  markPreviewMaterialCompleted,
} from "@/lib/pre-integration/student-preview";
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
      const materialResponse = getPreviewMaterialById(materialId);

      if (!materialResponse) {
        setNotFound(true);
        setMaterial(null);
        setProgressItem(null);
        return;
      }

      const progress = getPreviewProgress();
      setMaterial(materialResponse);
      setProgressPercentage(progress.percentage);
      setProgressItem(progress.items.find((item) => item.material_id === materialId) ?? null);
    } catch {
      setErrorMessage("Não foi possível carregar este material de pré-integração.");
    } finally {
      setIsLoading(false);
    }
  }, [materialId]);

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
      setProgressItem(markPreviewMaterialCompleted(material.id));
    } catch {
      setProgressErrorMessage("Não foi possível atualizar o progresso de pré-integração.");
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  if (isLoading) {
    return <SurfaceCard className="min-h-80 animate-pulse" />;
  }

  if (errorMessage) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Não foi possível carregar</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {errorMessage}
        </p>
        <Button type="button" onClick={() => void fetchData()} variant="outline" className="mt-4">
          Tentar novamente
        </Button>
      </SurfaceCard>
    );
  }

  if (notFound || !material || !type) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material não encontrado</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Este material não está disponível no preview local.
        </p>
        <Link href="/materiais" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <Link href="/materiais" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
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
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--color-surface) 82%, var(--color-brand-lilac)), color-mix(in oklab, var(--color-surface) 82%, var(--color-brand-blue)))",
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
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 24%, transparent), color-mix(in oklab, var(--color-brand-blue) 18%, transparent))",
                    color: "var(--color-accent-soft)",
                  }}
                >
                  <MaterialFallbackIcon type={material.type} />
                </div>
                <h3 className="mt-4 text-2xl">{type.label}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--color-text-muted)" }}>
                  Este conteúdo abre em uma referência externa enquanto a integração final não está conectada.
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
