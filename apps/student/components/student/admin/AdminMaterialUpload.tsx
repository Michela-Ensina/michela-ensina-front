import type { ChangeEvent } from "react";
import { FileUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminUploadType } from "@/types/admin";

type AdminMaterialUploadProps = {
  file: File | null;
  isUploading: boolean;
  uploadType: AdminUploadType | null;
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
};

export function AdminMaterialUpload({
  file,
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
      className="rounded-[var(--radius-md)] border p-3"
      style={{ borderColor: "var(--color-border)" }}
    >
      <Label htmlFor="materialFile">Arquivo</Label>
      <Input id="materialFile" type="file" onChange={handleFileChange} />
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
