import { ExternalLink, FileText, Link2, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Material } from "@/types/student";

type MaterialViewerProps = {
  material: Material;
  typeLabel: string;
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

export function MaterialViewer({ material, typeLabel }: MaterialViewerProps) {
  const embedUrl = resolveEmbedUrl(material.url);

  return (
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
            <h3 className="mt-4 text-2xl">{typeLabel}</h3>
            <p className="student-muted-text mx-auto mt-2 max-w-md text-sm">
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
  );
}
