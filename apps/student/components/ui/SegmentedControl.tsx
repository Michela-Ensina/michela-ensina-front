"use client";

type SegmentedOption<TValue extends string> = {
  value: TValue;
  label: string;
};

type SegmentedControlProps<TValue extends string> = {
  label: string;
  options: SegmentedOption<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
};

export function SegmentedControl<TValue extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<TValue>) {
  return (
    <div>
      <p className="sr-only">{label}</p>
      <div
        className="inline-flex flex-wrap gap-1 rounded-2xl border p-1"
        style={{
          borderColor: "color-mix(in oklab, var(--color-border) 78%, transparent)",
          backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 68%, transparent)",
        }}
      >
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className="min-h-9 rounded-xl px-3 text-sm font-semibold transition-colors"
              style={{
                color: isActive ? "var(--color-text)" : "var(--color-text-muted)",
                backgroundColor: isActive ? "var(--color-surface)" : "transparent",
                boxShadow: isActive ? "var(--shadow-sm)" : "none",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
