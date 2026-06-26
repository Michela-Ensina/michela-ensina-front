import { FileText, Paperclip } from "lucide-react";

import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { formatFileSize } from "@/lib/student/material-media";
import type { MaterialAttachment } from "@/types/student";

type MaterialAttachmentsListProps = {
  attachments: MaterialAttachment[];
};

function AttachmentCard({ attachment }: { attachment: MaterialAttachment }) {
  const size = formatFileSize(attachment.size);
  const Icon = attachment.type === "pdf" ? FileText : Paperclip;

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className="student-action student-hover-surface flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] border p-3"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface-soft)",
      }}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{attachment.original_name}</span>
        <span className="student-muted-text block text-xs">{size ?? attachment.mime_type ?? "Arquivo de apoio"}</span>
      </span>
    </a>
  );
}

export function MaterialAttachmentsList({ attachments }: MaterialAttachmentsListProps) {
  if (attachments.length === 0) return null;

  return (
    <SurfaceCard>
      <div>
        <h2 className="text-xl">Materiais de apoio</h2>
        <p className="student-muted-text mt-1 text-sm">Arquivos anexados a este conteúdo.</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {attachments.map((attachment) => (
          <AttachmentCard key={attachment.id} attachment={attachment} />
        ))}
      </div>
    </SurfaceCard>
  );
}
