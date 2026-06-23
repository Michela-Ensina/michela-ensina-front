type ProgressCountTileProps = {
  count: number;
  label: string;
  accentColor: string;
};

export function ProgressCountTile({ count, label, accentColor }: ProgressCountTileProps) {
  return (
    <div
      className="rounded-2xl border p-3"
      style={{
        borderColor: `color-mix(in oklab, var(--color-border) 72%, ${accentColor})`,
        backgroundColor: `color-mix(in oklab, ${accentColor} 12%, transparent)`,
      }}
    >
      <p className="text-2xl font-bold">{count}</p>
      <p className="student-muted-text text-xs">{label}</p>
    </div>
  );
}
