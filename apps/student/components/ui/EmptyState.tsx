type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="rounded-[var(--radius-lg)] border border-dashed p-6 text-center sm:p-8"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 75%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 75%, transparent)",
      }}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
        {description}
      </p>
    </div>
  );
}
