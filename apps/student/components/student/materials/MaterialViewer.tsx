import { ExternalLink, FileText, Link2, Paperclip } from "lucide-react";

import { PdfMaterialViewer } from "@/components/student/materials/PdfMaterialViewer";
import { VideoMaterialViewer } from "@/components/student/materials/VideoMaterialViewer";
import { Button } from "@/components/ui/button";
import { getMaterialFileUrl } from "@/lib/student/material-media";
import { cn } from "@/lib/utils/cn";
import type { Material } from "@/types/student";

type MaterialViewerProps = {
  material: Material;
  typeLabel: string;
  isTheaterMode?: boolean;
};

function MaterialFallbackIcon({ type }: { type: Material["type"] }) {
  if (type === "pdf") return <FileText size={28} aria-hidden="true" />;
  if (type === "attachment") return <Paperclip size={28} aria-hidden="true" />;
  return <Link2 size={28} aria-hidden="true" />;
}

export function MaterialViewer({ material, typeLabel, isTheaterMode = false }: MaterialViewerProps) {
  const fileUrl = getMaterialFileUrl(material);

  return (
    <div
      className={cn(
        "overflow-hidden border",
        isTheaterMode ? "rounded-none border-x-0 sm:border-x" : "rounded-[var(--radius-lg)]",
      )}
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {material.type === "video" ? (
        <VideoMaterialViewer title={material.title} url={material.url} />
      ) : material.type === "pdf" ? (
        <PdfMaterialViewer key={fileUrl} title={material.title} url={fileUrl} isTheaterMode={isTheaterMode} />
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
              Este conteúdo está disponível como material de apoio.
            </p>
            <a href={fileUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block">
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
