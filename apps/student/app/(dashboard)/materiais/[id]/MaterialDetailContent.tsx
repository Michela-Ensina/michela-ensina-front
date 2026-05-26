"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getMaterialById } from "@/lib/api/materials";
import { ApiClientError } from "@/lib/api/errors";
import { getProgress, updateMaterialProgress } from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material, ProgressItem } from "@/types/student";

type MaterialDetailContentProps = {
  materialId: string;
};

function getMaterialTypeLabel(type: Material["type"]) {
  if (type === "video") return "Vídeo";
  if (type === "pdf") return "PDF";
  if (type === "attachment") return "Anexo";
  return "Material";
}

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

function getMaterialStatus(progress: ProgressItem | null) {
  if (!progress) return { label: "Não iniciado", tone: "novo" as const };
  if (progress.viewed) return { label: "Concluído", tone: "concluído" as const };
  return { label: "Em andamento", tone: "em-andamento" as const };
}

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const { token, logout } = useAuth();

  const [material, setMaterial] = useState<Material | null>(null);
  const [progressItem, setProgressItem] = useState<ProgressItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressErrorMessage, setProgressErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) {
      setErrorMessage("Sessão inválida. Faça login novamente.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setProgressErrorMessage(null);
    setNotFound(false);

    try {
      const [materialResponse, progress] = await Promise.all([
        getMaterialById(materialId, token),
        getProgress(token),
      ]);

      setMaterial(materialResponse);
      setProgressItem(progress.items.find((item) => item.material_id === materialId) ?? null);
    } catch (error) {
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        setErrorMessage("Sua sessão expirou. Faça login novamente.");
        await logout();
      } else if (error instanceof ApiClientError && error.status === 404) {
        setNotFound(true);
      } else {
        setErrorMessage("Não foi possível carregar este material agora.");
      }
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

  const status = useMemo(() => getMaterialStatus(progressItem), [progressItem]);
  const embedUrl = material?.url ? resolveEmbedUrl(material.url) : null;

  async function handleMarkAsCompleted() {
    if (!token || !material) return;

    setIsUpdatingProgress(true);
    setProgressErrorMessage(null);

    try {
      const updated = await updateMaterialProgress(material.id, token);
      setProgressItem(updated);
    } catch (error) {
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        setProgressErrorMessage("Sua sessão expirou. Faça login novamente.");
        await logout();
      } else {
        setProgressErrorMessage("Não foi possível atualizar o progresso agora.");
      }
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  if (isLoading) {
    return (
      <SurfaceCard>
        <p style={{ color: "var(--color-text-muted)" }}>Carregando material...</p>
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
          onClick={() => void fetchData()}
          variant="outline"
          className="mt-4"
        >
          Tentar novamente
        </Button>
      </SurfaceCard>
    );
  }

  if (notFound || !material) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material não encontrado</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Este material não está disponível no momento.
        </p>
        <Link href="/materiais" className="mt-4 inline-block text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="space-y-4">
      <SurfaceCard>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-text-muted)" }}>
              {getMaterialTypeLabel(material.type)}
            </p>
            <h2 className="mt-2 text-2xl">{material.title}</h2>
          </div>

          <StatusBadge label={status.label} tone={status.tone} />
        </div>

        <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {material.description ?? "Este material ainda não possui uma descrição detalhada."}
        </p>
      </SurfaceCard>

      <SurfaceCard>
        <h3 className="text-xl">Conteúdo</h3>

        {!material.url ? (
          <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Material em preparação.
          </p>
        ) : material.type === "video" && embedUrl ? (
          <div className="mt-3 overflow-hidden rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
            <iframe
              title={material.title}
              src={embedUrl}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="mt-3 rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Este conteúdo está disponível por link externo.
            </p>
            <a
              href={material.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm font-semibold"
              style={{ color: "var(--color-primary)" }}
            >
              Abrir material
            </a>
          </div>
        )}
      </SurfaceCard>

      <SurfaceCard>
        <h3 className="text-xl">Progresso</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Marque este material como concluído quando finalizar o conteúdo.
        </p>

        {progressErrorMessage ? (
          <Alert tone="error">{progressErrorMessage}</Alert>
        ) : null}

        <Button
          type="button"
          onClick={() => void handleMarkAsCompleted()}
          disabled={isUpdatingProgress || status.tone === "concluído"}
          variant="outline"
          className="mt-4"
          style={{
            opacity: isUpdatingProgress || status.tone === "concluído" ? 0.7 : 1,
          }}
        >
          {isUpdatingProgress
            ? "Atualizando progresso..."
            : status.tone === "concluído"
              ? "Material concluído"
              : "Marcar como concluído"}
        </Button>
      </SurfaceCard>
    </div>
  );
}
