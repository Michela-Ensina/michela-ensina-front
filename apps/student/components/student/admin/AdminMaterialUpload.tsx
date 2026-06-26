import type { ChangeEvent } from "react";
import { FileUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type AdminMaterialUploadProps = {
  file: File | null;
  attachedFiles: MaterialAttachment[];
  isUploading: boolean;
  uploadType: AdminUploadType | null;
  materialType: MaterialType;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
};

export function AdminMaterialUpload({
  file,
  attachedFiles,
  isUploading,
  uploadType,
  materialType,
  onFileChange,
  onUpload,
  onRemoveAttachment,
}: AdminMaterialUploadProps) {
  if (!uploadType) {
    return null;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    onFileChange(event.target.files?.[0] ?? null);
  }

  const replacesPrimaryFile = materialType === "pdf" || materialType === "attachment";

  return (
    <div
      className="rounded-[var(--radius-md)] border p-4"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 62%, transparent)",
      }}
    >
      <Label htmlFor="materialFile">
        {materialType === "pdf"
          ? "PDF do material"
          : materialType === "video"
            ? "Anexo de apoio ao vídeo"
            : "Arquivo do anexo"}
      </Label>
      <Input
        id="materialFile"
        type="file"
        accept={uploadType === "pdf" ? "application/pdf" : undefined}
        onChange={handleFileChange}
      />
      {attachedFiles.length > 0 ? (
        <div className="mt-3 rounded-[var(--radius-sm)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-semibold">{replacesPrimaryFile ? "Arquivo principal" : "Anexos vinculados"}</p>
          {attachedFiles.map((attachment) => (
            <div key={attachment.id} className="mt-1 flex items-center justify-between gap-2">
              <p className="student-muted-text min-w-0 truncate">{attachment.original_name}</p>
              <button
                type="button"
                className="student-action student-hover-surface grid size-7 shrink-0 place-items-center rounded-lg text-[var(--color-text-muted)]"
                onClick={() => onRemoveAttachment(attachment.id)}
                aria-label={`Remover ${attachment.original_name}`}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <p className="student-muted-text mt-3 text-xs">
        {replacesPrimaryFile
          ? "Enviar outro arquivo substitui o arquivo principal deste material."
          : "Você pode adicionar arquivos de apoio ao vídeo antes de salvar."}
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3 gap-2"
        disabled={!file || isUploading}
        onClick={onUpload}
      >
        <FileUp size={16} aria-hidden="true" />
        {isUploading ? "Enviando..." : "Enviar arquivo"}
      </Button>
    </div>
  );
}
