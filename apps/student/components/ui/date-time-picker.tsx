"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Popover as BasePopover } from "@base-ui/react/popover";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils/cn";

type DateTimePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
};

type DateTimeParts = {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
};

const monthOptions = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function getYearOptions(selectedYear: string) {
  const currentYear = new Date().getFullYear();
  const parsedSelectedYear = Number(selectedYear) || currentYear;
  const firstYear = Math.min(currentYear - 1, parsedSelectedYear);
  const lastYear = Math.max(currentYear + 4, parsedSelectedYear);

  return Array.from(
    { length: lastYear - firstYear + 1 },
    (_, index) => String(firstYear + index),
  );
}

function getDaysInMonth(year: string, month: string) {
  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  if (!parsedYear || !parsedMonth) return 31;

  return new Date(parsedYear, parsedMonth, 0).getDate();
}

function getDefaultParts(): DateTimeParts {
  const now = new Date();

  return {
    day: pad2(now.getDate()),
    month: pad2(now.getMonth() + 1),
    year: String(now.getFullYear()),
    hour: pad2(now.getHours()),
    minute: pad2(now.getMinutes()),
  };
}

function splitDateTime(value: string): DateTimeParts {
  if (!value) return getDefaultParts();

  const [date = "", time = ""] = value.split("T");
  const [year, month, day] = date.split("-");
  const [hour = "00", minute = "00"] = time.split(":");

  return {
    day: day || "01",
    month: month || "01",
    year: year || String(new Date().getFullYear()),
    hour,
    minute,
  };
}

function joinDateTime(parts: DateTimeParts) {
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
  const [draftParts, setDraftParts] = useState<DateTimeParts>(() => splitDateTime(value));
  const selectedMonthLabel =
    monthOptions.find((month) => month.value === draftParts.month)?.label ?? "Mês";
  const yearOptions = useMemo(
    () => getYearOptions(draftParts.year),
    [draftParts.year],
  );
  const dayOptions = useMemo(
    () =>
      Array.from({ length: getDaysInMonth(draftParts.year, draftParts.month) }, (_, index) =>
        pad2(index + 1),
      ),
    [draftParts.month, draftParts.year],
  );
  const hourOptions = useMemo(() => Array.from({ length: 24 }, (_, index) => pad2(index)), []);
  const minuteOptions = useMemo(
    () => Array.from({ length: 60 }, (_, index) => pad2(index)),
    [],
  );

  function updateDraftPart(part: keyof DateTimeParts, nextValue: string) {
    setDraftParts((current) => {
      const next = { ...current, [part]: nextValue };
      const daysInMonth = getDaysInMonth(next.year, next.month);

      if (Number(next.day) > daysInMonth) {
        next.day = pad2(daysInMonth);
      }

      return next;
    });
  }

  function handleDraftPartChange(
    part: keyof DateTimeParts,
    nextValue: string | null,
  ) {
    if (nextValue) updateDraftPart(part, nextValue);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setDraftParts(splitDateTime(value));
    }

    setOpen(nextOpen);
  }

  return (
    <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
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
            <div className="grid gap-3 sm:grid-cols-[0.72fr_1.1fr_0.9fr]">
              <label className="text-sm font-medium">
                Dia
                <Select
                  value={draftParts.day}
                  onValueChange={(nextValue) =>
                    handleDraftPartChange("day", nextValue)
                  }
                >
                  <SelectTrigger className="mt-1">{draftParts.day}</SelectTrigger>
                  <SelectContent>
                    {dayOptions.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="text-sm font-medium">
                Mês
                <Select
                  value={draftParts.month}
                  onValueChange={(nextValue) =>
                    handleDraftPartChange("month", nextValue)
                  }
                >
                  <SelectTrigger className="mt-1">{selectedMonthLabel}</SelectTrigger>
                  <SelectContent>
                    {monthOptions.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="text-sm font-medium">
                Ano
                <Select
                  value={draftParts.year}
                  onValueChange={(nextValue) =>
                    handleDraftPartChange("year", nextValue)
                  }
                >
                  <SelectTrigger className="mt-1">{draftParts.year}</SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Hora
                <Select
                  value={draftParts.hour}
                  onValueChange={(nextValue) =>
                    handleDraftPartChange("hour", nextValue)
                  }
                >
                  <SelectTrigger className="mt-1">{draftParts.hour}</SelectTrigger>
                  <SelectContent>
                    {hourOptions.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="text-sm font-medium">
                Minuto
                <Select
                  value={draftParts.minute}
                  onValueChange={(nextValue) =>
                    handleDraftPartChange("minute", nextValue)
                  }
                >
                  <SelectTrigger className="mt-1">{draftParts.minute}</SelectTrigger>
                  <SelectContent>
                    {minuteOptions.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
                Limpar data
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  onChange(joinDateTime(draftParts));
                  setOpen(false);
                }}
              >
                Aplicar
              </Button>
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
