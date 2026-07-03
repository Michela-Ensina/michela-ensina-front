import { AdminMaterialUpload } from "@/components/student/admin/AdminMaterialUpload";
import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
  adminMaterialTypes,
  type MaterialFormState,
} from "@/lib/student/admin-material-form";
import type { AdminProduct, AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type AdminMaterialTypeFieldsProps = {
  form: MaterialFormState;
  primaryFile: File | null;
  supportFile: File | null;
  attachedFiles: MaterialAttachment[];
  products: AdminProduct[];
  productsErrorMessage: string | null;
  primaryUploadType: AdminUploadType | null;
  supportUploadType: AdminUploadType;
  isUploading: boolean;
  onFieldChange: <TField extends keyof MaterialFormState>(
    field: TField,
    value: MaterialFormState[TField],
  ) => void;
  onPrimaryFileChange: (file: File | null) => void;
  onSupportFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onPrimaryUpload: () => void;
  onSupportUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
  onAttachmentDownloadableChange: (attachmentId: string, downloadable: boolean) => void;
  onToggleProduct: (productId: string, checked: boolean) => void;
};

export function AdminMaterialTypeFields({
  form,
  primaryFile,
  supportFile,
  attachedFiles,
  products,
  productsErrorMessage,
  primaryUploadType,
  supportUploadType,
  isUploading,
  onFieldChange,
  onPrimaryFileChange,
  onSupportFileChange,
  onFileRejected,
  onPrimaryUpload,
  onSupportUpload,
  onRemoveAttachment,
  onAttachmentDownloadableChange,
  onToggleProduct,
}: AdminMaterialTypeFieldsProps) {
  const selectedTypeLabel =
    adminMaterialTypes.find((type) => type.value === form.type)?.label ?? "Selecione";

  return (
    <>
      <div className="min-w-0">
        <Label htmlFor="materialType">Tipo</Label>
        <Select
          id="materialType"
          value={form.type}
          onValueChange={(value) => onFieldChange("type", value as MaterialType)}
        >
          <SelectTrigger>{selectedTypeLabel}</SelectTrigger>
          <SelectContent>
            {adminMaterialTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AdminMaterialUpload
        primaryFile={primaryFile}
        supportFile={supportFile}
        attachedFiles={attachedFiles}
        isUploading={isUploading}
        primaryUploadType={primaryUploadType}
        supportUploadType={supportUploadType}
        materialType={form.type}
        onPrimaryFileChange={onPrimaryFileChange}
        onSupportFileChange={onSupportFileChange}
        onFileRejected={onFileRejected}
        onPrimaryUpload={onPrimaryUpload}
        onSupportUpload={onSupportUpload}
        onRemoveAttachment={onRemoveAttachment}
        onAttachmentDownloadableChange={onAttachmentDownloadableChange}
      />

      {form.type === "video" ? (
        <div className="min-w-0">
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
        <div className="min-w-0">
          <Label htmlFor="materialUrl">Link do material</Label>
          <Input
            id="materialUrl"
            value={form.url}
            onChange={(event) => onFieldChange("url", event.target.value)}
            placeholder="https://..."
          />
        </div>
      ) : null}

      <div className="min-w-0">
        <Label htmlFor="materialReleasedAt">Liberar em</Label>
        <DateTimePicker
          id="materialReleasedAt"
          value={form.releasedAt}
          onChange={(value) => onFieldChange("releasedAt", value)}
        />
        <p className="student-muted-text mt-1 text-xs">
          Se ficar em branco, o material será liberado imediatamente ao salvar.
        </p>
      </div>

      <div className="min-w-0">
        <Label>Produtos com acesso</Label>
        {productsErrorMessage ? <Alert tone="error">{productsErrorMessage}</Alert> : null}
        {products.length > 0 ? (
          <div className="student-soft-surface mt-2 space-y-2 rounded-[var(--radius-md)] border p-3">
            {products.map((product) => {
              const isChecked = form.productIds.includes(product.id);

              return (
                <label
                  key={product.id}
                  className="student-action student-hover-surface flex items-start gap-3 rounded-[var(--radius-sm)] px-2 py-2 text-sm"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      onToggleProduct(product.id, Boolean(checked))
                    }
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold">{product.name}</span>
                    {product.hotmart_product_id ? (
                      <span className="student-muted-text mt-0.5 block text-xs">
                        Hotmart ID: {product.hotmart_product_id}
                      </span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        ) : (
          <p className="student-muted-text mt-2 text-xs">
            Sem produtos vinculáveis no momento. Se este material deve ficar aberto para todos os alunos, deixe assim.
          </p>
        )}
      </div>
    </>
  );
}
