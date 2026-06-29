"use client";

import { PlayCircle } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { resolveYoutubeEmbedUrl } from "@/lib/student/material-media";

type VideoMaterialViewerProps = {
  title: string;
  url: string;
};

export function VideoMaterialViewer({ title, url }: VideoMaterialViewerProps) {
  const embedUrl = resolveYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="grid min-h-[360px] place-items-center bg-[var(--color-surface)] p-6">
        <div className="max-w-md">
          <Alert tone="error">Informe uma URL válida do YouTube para exibir este vídeo.</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[rgb(13_7_24)]">
      <div className="absolute left-4 top-4 z-10 hidden items-center gap-2 rounded-full bg-[rgb(26_13_43_/_0.78)] px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm sm:flex">
        <PlayCircle size={16} aria-hidden="true" />
        Aula em vídeo
      </div>
      <iframe
        title={title}
        src={embedUrl}
        className="aspect-video w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
