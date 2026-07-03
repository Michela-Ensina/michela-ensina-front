type ProgressCountTileProps = {
  count: number;
  label: string;
  accentColor: string;
};

export function ProgressCountTile({ count, label, accentColor }: ProgressCountTileProps) {
  return (
    <div
      className="student-soft-surface rounded-2xl border p-3"
      style={{
        borderColor: `color-mix(in oklab, var(--color-border) 84%, ${accentColor})`,
      }}
    >
      <p className="text-2xl font-bold" style={{ color: accentColor }}>{count}</p>
      <p className="student-muted-text text-xs">{label}</p>
    </div>
  );
}
