type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="rounded-[var(--radius-lg)] border border-dashed p-6 text-center sm:p-8"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="student-muted-text mt-2 text-sm">{description}</p>
    </div>
  );
}
