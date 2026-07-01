import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl leading-tight">{title}</h2>
        {description ?<p className="student-muted-text mt-1.5 text-sm">{description}</p> : null}
      </div>
      {action ?<div className="shrink-0">{action}</div> : null}
    </div>
  );
}
