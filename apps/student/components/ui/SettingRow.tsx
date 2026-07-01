import type { ReactNode } from "react";

type SettingRowProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SettingRow({ title, description, children }: SettingRowProps) {
  return (
    <div
      className="grid gap-3 border-b py-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center"
      style={{ borderColor: "color-mix(in oklab, var(--color-border) 72%, transparent)" }}
    >
      <div>
        <p className="text-sm font-semibold">{title}</p>
        {description ?<p className="student-muted-text mt-1 text-sm">{description}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
