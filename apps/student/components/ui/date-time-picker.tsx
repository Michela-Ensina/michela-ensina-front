"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Popover as BasePopover } from "@base-ui/react/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type DateTimePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
};

function splitDateTime(value: string) {
  const [date = "", time = ""] = value.split("T");
  return { date, time };
}

function joinDateTime(date: string, time: string) {
  if (!date) return "";
  return `${date}T${time || "00:00"}`;
}

function formatDateTimeValue(value: string) {
  if (!value) return "Liberar imediatamente";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsed);
}

export function DateTimePicker({ id, value, onChange }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const { date, time } = useMemo(() => splitDateTime(value), [value]);

  function updateDate(nextDate: string) {
    onChange(joinDateTime(nextDate, time));
  }

  function updateTime(nextTime: string) {
    onChange(joinDateTime(date, nextTime));
  }

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        type="button"
        id={id}
        className={cn(
          "student-input-control student-action student-hover-surface flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border px-3 py-2 text-left text-sm outline-none",
          !value ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]",
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarDays size={16} aria-hidden="true" />
          <span className="truncate">{formatDateTimeValue(value)}</span>
        </span>
        <Clock size={15} aria-hidden="true" />
      </BasePopover.Trigger>

      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8} className="z-50">
          <BasePopover.Popup
            className="w-[min(22rem,calc(100vw-2rem))] rounded-[var(--radius-md)] border p-4 shadow-[var(--shadow-md)] outline-none"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
              <label className="text-sm font-medium">
                Data
                <Input
                  type="date"
                  className="mt-1"
                  value={date}
                  onChange={(event) => updateDate(event.target.value)}
                />
              </label>
              <label className="text-sm font-medium">
                Hora
                <Input
                  type="time"
                  className="mt-1"
                  value={time}
                  onChange={(event) => updateTime(event.target.value)}
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                Limpar data
              </Button>
              <Button type="button" variant="primary" size="sm" onClick={() => setOpen(false)}>
                Aplicar
              </Button>
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
