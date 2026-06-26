import { AdminMaterialUpload } from "@/components/student/admin/AdminMaterialUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  adminMaterialTypes,
  type MaterialFormState,
} from "@/lib/student/admin-material-form";
import type { AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type AdminMaterialTypeFieldsProps = {
  form: MaterialFormState;
  file: File | null;
  attachedFiles: MaterialAttachment[];
  uploadType: AdminUploadType | null;
  isUploading: boolean;
  onFieldChange: <TField extends keyof MaterialFormState>(
    field: TField,
    value: MaterialFormState[TField],
  ) => void;
  onFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
};

export function AdminMaterialTypeFields({
  form,
  file,
  attachedFiles,
  uploadType,
  isUploading,
  onFieldChange,
  onFileChange,
  onFileRejected,
  onUpload,
  onRemoveAttachment,
}: AdminMaterialTypeFieldsProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[1fr_112px]">
        <div>
          <Label htmlFor="materialType">Tipo</Label>
          <Select
            id="materialType"
            value={form.type}
            onChange={(event) => onFieldChange("type", event.target.value as MaterialType)}
          >
            {adminMaterialTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="materialOrder">Ordem</Label>
          <Input
            id="materialOrder"
            type="number"
            min={0}
            value={form.order}
            onChange={(event) => onFieldChange("order", event.target.value)}
          />
        </div>
      </div>

      <AdminMaterialUpload
        file={file}
        attachedFiles={attachedFiles}
        isUploading={isUploading}
        uploadType={uploadType}
        materialType={form.type}
        onFileChange={onFileChange}
        onFileRejected={onFileRejected}
        onUpload={onUpload}
        onRemoveAttachment={onRemoveAttachment}
      />

      {form.type === "video" ? (
        <div>
          <Label htmlFor="materialUrl">URL do YouTube</Label>
          <Input
            id="materialUrl"
            value={form.url}
            onChange={(event) => onFieldChange("url", event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      ) : null}

      {form.type === "other" ? (
        <div>
          <Label htmlFor="materialUrl">Link do material</Label>
          <Input
            id="materialUrl"
            value={form.url}
            onChange={(event) => onFieldChange("url", event.target.value)}
            placeholder="https://..."
          />
        </div>
      ) : null}

      <div>
        <Label htmlFor="materialReleasedAt">Liberar em</Label>
        <Input
          id="materialReleasedAt"
          type="datetime-local"
          value={form.releasedAt}
          onChange={(event) => onFieldChange("releasedAt", event.target.value)}
        />
        <p className="student-muted-text mt-1 text-xs">Deixe em branco para liberar imediatamente.</p>
      </div>
    </>
  );
}
