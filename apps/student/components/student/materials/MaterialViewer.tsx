import { ExternalLink, FileText, Link2, Paperclip } from "lucide-react";

import { PdfMaterialViewer } from "@/components/student/materials/PdfMaterialViewer";
import { VideoMaterialViewer } from "@/components/student/materials/VideoMaterialViewer";
import { Button } from "@/components/ui/button";
import { getMaterialUploadFileUrl } from "@/lib/api/materials";
import {
  getMaterialFileUrl,
  getPrimaryMaterialFile,
  isPdfMaterial,
} from "@/lib/student/material-media";
import { cn } from "@/lib/utils/cn";
import type { Material } from "@/types/student";

type MaterialViewerProps = {
  material: Material;
  typeLabel: string;
  isTheaterMode?: boolean;
  token?: string | null;
};

function MaterialFallbackIcon({ type }: { type: Material["type"] }) {
  if (type === "pdf") return <FileText size={28} aria-hidden="true" />;
  if (type === "attachment") return <Paperclip size={28} aria-hidden="true" />;
  return <Link2 size={28} aria-hidden="true" />;
}

export function MaterialViewer({
  material,
  typeLabel,
  isTheaterMode = false,
  token,
}: MaterialViewerProps) {
  const fileUrl = getMaterialFileUrl(material);
  const primaryFile = getPrimaryMaterialFile(material);
  const shouldRenderPdfViewer = isPdfMaterial(material);
  const shouldUseProtectedFileUrl = Boolean(primaryFile);
  const pdfUrl = primaryFile
    ? getMaterialUploadFileUrl(material.id, primaryFile.id)
    : fileUrl;
  const canOpenExternalMaterial = material.type === "other" && Boolean(fileUrl);

  return (
    <div
      className={cn(
        "overflow-hidden border",
        isTheaterMode
          ? "rounded-[var(--radius-md)] border-[rgb(228_206_244_/_0.14)] bg-[rgb(13_7_24)] shadow-[0_18px_56px_rgb(10_5_20_/_0.34)]"
          : "rounded-[var(--radius-lg)]",
      )}
      style={
        isTheaterMode
          ? undefined
          : {
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }
      }
    >
      {material.type === "video" ? (
        <VideoMaterialViewer title={material.title} url={material.url} />
      ) : shouldRenderPdfViewer ? (
        <PdfMaterialViewer
          key={pdfUrl}
          title={material.title}
          url={pdfUrl}
          isTheaterMode={isTheaterMode}
          token={shouldUseProtectedFileUrl ? token : null}
        />
      ) : (
        <div className="grid min-h-[360px] place-items-center p-8 text-center">
          <div>
            <div
              className="mx-auto grid size-16 place-items-center rounded-2xl"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--color-primary) 16%, var(--color-surface))",
                color: "var(--color-primary)",
              }}
            >
              <MaterialFallbackIcon type={material.type} />
            </div>
            <h3 className="mt-4 text-2xl">{typeLabel}</h3>
            <p className="student-muted-text mx-auto mt-2 max-w-md text-sm">
              {canOpenExternalMaterial
                ? "Este conteúdo está disponível em um link externo."
                : "Este arquivo principal ainda não possui visualização interna para este formato."}
            </p>
            {canOpenExternalMaterial ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block"
              >
                <Button type="button" variant="primary" className="gap-2">
                  Abrir material
                  <ExternalLink size={16} aria-hidden="true" />
                </Button>
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
