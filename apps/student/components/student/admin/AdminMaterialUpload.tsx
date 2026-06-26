import { useEffect, useRef, type ChangeEvent } from "react";
import { FileUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAdminUploadAcceptValue,
  getAdminUploadHelpText,
  validateAdminUploadFile,
} from "@/lib/student/admin-upload-validation";
import type { AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type AdminMaterialUploadProps = {
  file: File | null;
  attachedFiles: MaterialAttachment[];
  isUploading: boolean;
  uploadType: AdminUploadType | null;
  materialType: MaterialType;
  onFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
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
  onFileRejected,
  onUpload,
  onRemoveAttachment,
}: AdminMaterialUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [file]);

  if (!uploadType) {
    return null;
  }

  const activeUploadType = uploadType;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    if (!nextFile) {
      onFileChange(null);
      return;
    }

    const validationMessage = validateAdminUploadFile(nextFile, activeUploadType);
    if (validationMessage) {
      onFileChange(null);
      event.target.value = "";
      onFileRejected(validationMessage);
      return;
    }

    onFileChange(nextFile);
  }

  const replacesPrimaryFile = materialType === "pdf" || materialType === "attachment";
  const uploadHelpText = getAdminUploadHelpText(activeUploadType);

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
        ref={inputRef}
        type="file"
        accept={getAdminUploadAcceptValue(activeUploadType)}
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
      <p className="student-muted-text mt-1 text-xs">{uploadHelpText}</p>
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
