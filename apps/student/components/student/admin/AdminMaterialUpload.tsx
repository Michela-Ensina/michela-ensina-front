import type { ChangeEvent } from "react";
import { FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminUploadType } from "@/types/admin";
import type { MaterialAttachment } from "@/types/student";

type AdminMaterialUploadProps = {
  file: File | null;
  attachedFiles: MaterialAttachment[];
  isUploading: boolean;
  uploadType: AdminUploadType | null;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
};

export function AdminMaterialUpload({
  file,
  attachedFiles,
  isUploading,
  uploadType,
  onFileChange,
  onUpload,
}: AdminMaterialUploadProps) {
  if (!uploadType) {
    return null;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    onFileChange(event.target.files?.[0] ?? null);
  }

  return (
    <div
      className="rounded-[var(--radius-md)] border p-4"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 62%, transparent)",
      }}
    >
      <Label htmlFor="materialFile">
        {uploadType === "pdf" ? "PDF do material" : "Arquivo do anexo"}
      </Label>
      <Input
        id="materialFile"
        type="file"
        accept={uploadType === "pdf" ? "application/pdf" : undefined}
        onChange={handleFileChange}
      />
      {attachedFiles.length > 0 ? (
        <div className="mt-3 rounded-[var(--radius-sm)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-semibold">Arquivo vinculado</p>
          {attachedFiles.map((attachment) => (
            <p key={attachment.id} className="student-muted-text mt-1 truncate">
              {attachment.original_name}
            </p>
          ))}
        </div>
      ) : null}
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
