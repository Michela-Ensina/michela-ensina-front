type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const normalizedValue = Math.max(0, Math.min(value, 100));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between gap-3 text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
          <span>{label}</span>
          <span>{normalizedValue}%</span>
        </div>
      ) : null}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "color-mix(in oklab, var(--color-text-muted) 20%, transparent)" }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-out"
          style={{
            width: `${normalizedValue}%`,
            background:
              "linear-gradient(90deg, var(--color-primary), var(--color-accent-soft), var(--color-brand-blue))",
          }}
        />
      </div>
    </div>
  );
}
