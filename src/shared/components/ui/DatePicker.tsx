import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  allowClear?: boolean;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  className = "",
  allowClear = false,
}) => {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => {
    if (!value) return null;
    const parsed = parseISO(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [value]);
  const [viewMonth, setViewMonth] = useState<Date>(selected ?? new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) setViewMonth(selected);
  }, [selected]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewMonth));
    const end = endOfWeek(endOfMonth(viewMonth));
    return eachDayOfInterval({ start, end });
  }, [viewMonth]);

  const display = selected ? format(selected, "MMM d, yyyy") : placeholder;

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      {label && (
        <span className="block text-xs text-[var(--muted)] mb-1">{label}</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full min-w-[10.5rem] h-10 flex items-center justify-between gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 text-sm text-[var(--foreground)] hover:border-[color-mix(in_srgb,var(--ires-navy-blue)_25%,var(--border))] focus:outline-none focus:ring-2 focus:ring-[var(--ires-navy-blue)]/20 focus:border-[var(--ires-navy-blue)] transition-all cursor-pointer"
      >
        <span className="flex items-center gap-2 min-w-0">
          <CalendarIcon className="h-4 w-4 shrink-0 text-[var(--muted)]" />
          <span className={`truncate ${selected ? "text-[var(--ires-navy-blue)]" : "text-[var(--muted)]"}`}>
            {display}
          </span>
        </span>
        <svg
          className={`w-3.5 h-3.5 shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-[280px] rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              className="ui-action-btn h-8 w-8 p-0 inline-flex items-center justify-center"
              onClick={() => setViewMonth((month) => addMonths(month, -1))}
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm font-semibold text-[var(--ires-navy-blue)]">
              {format(viewMonth, "MMMM yyyy")}
            </p>
            <button
              type="button"
              className="ui-action-btn h-8 w-8 p-0 inline-flex items-center justify-center"
              onClick={() => setViewMonth((month) => addMonths(month, 1))}
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-[11px] font-medium text-[var(--muted)]"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = isSameMonth(day, viewMonth);
              const isSelected = selected ? isSameDay(day, selected) : false;
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(format(day, "yyyy-MM-dd"));
                    setOpen(false);
                  }}
                  className={`h-8 rounded-lg text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--ires-navy-blue)] text-white font-semibold"
                      : inMonth
                        ? "text-[var(--ires-navy-blue)] hover:bg-[var(--cool-blue-tint)]"
                        : "text-[var(--muted)]/50 hover:bg-[var(--cool-blue-tint)]/50"
                  } ${!isSelected && isToday ? "ring-1 ring-[var(--ires-navy-blue)]/30" : ""}`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
            <button
              type="button"
              className="text-xs font-medium text-[var(--ires-navy-blue)] hover:underline"
              onClick={() => {
                onChange(format(new Date(), "yyyy-MM-dd"));
                setOpen(false);
              }}
            >
              Today
            </button>
            {allowClear && (
              <button
                type="button"
                className="text-xs font-medium text-[var(--muted)] hover:text-[var(--ires-navy-blue)]"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
