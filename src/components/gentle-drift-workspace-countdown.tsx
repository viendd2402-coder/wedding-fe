"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { AppLanguage } from "@/components/global-preferences-provider";
import {
  datetimeLocalValueToCountdownTarget,
  formatCountdownReadableWorkspace,
} from "@/lib/gentle-drift-countdown-datetime";

const MAX_HOUR = 23;
const MAX_MIN = 59;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function partsFromCountdownTarget(raw: string): {
  y: number;
  m: number;
  d: number;
  h: number;
  min: number;
} | null {
  const t = raw.trim();
  if (!t) return null;
  const dt = new Date(t);
  if (Number.isNaN(dt.getTime())) return null;
  return {
    y: dt.getFullYear(),
    m: dt.getMonth(),
    d: dt.getDate(),
    h: dt.getHours(),
    min: dt.getMinutes(),
  };
}

function toDatetimeLocalFragment(y: number, m: number, d: number, h: number, min: number): string {
  return `${y}-${pad2(m + 1)}-${pad2(d)}T${pad2(h)}:${pad2(min)}`;
}

function calendarMatrix(
  y: number,
  m: number,
  language: AppLanguage,
): { cells: ({ n: number } | null)[]; monthTitle: string; weekdays: string[] } {
  const firstDow = new Date(y, m, 1).getDay();
  const lastDate = new Date(y, m + 1, 0).getDate();
  const cells: ({ n: number } | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let n = 1; n <= lastDate; n++) cells.push({ n });
  const tail = cells.length % 7;
  if (tail !== 0) for (let i = 0; i < 7 - tail; i++) cells.push(null);
  const monthTitle = new Date(y, m, 1).toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    { month: "long", year: "numeric" },
  );
  const weekdays =
    language === "vi"
      ? ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return { cells, monthTitle, weekdays };
}

type Props = {
  value: string;
  onChange: (next: string) => void;
  language: AppLanguage;
  isDark: boolean;
  hint: string;
};

export default function GentleDriftWorkspaceCountdown({
  value,
  onChange,
  language,
  isDark,
  hint,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const parts = useMemo(() => partsFromCountdownTarget(value), [value]);
  const [viewY, setViewY] = useState(() => parts?.y ?? new Date().getFullYear());
  const [viewM, setViewM] = useState(() => parts?.m ?? new Date().getMonth());

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const grid = useMemo(
    () => calendarMatrix(viewY, viewM, language),
    [language, viewY, viewM],
  );

  const selectedDom = parts && parts.y === viewY && parts.m === viewM ? parts.d : null;

  const readable = formatCountdownReadableWorkspace(value, language);
  const isoLine = value.trim() || "—";

  const toggleOpen = useCallback(() => {
    if (!open) {
      const p = partsFromCountdownTarget(value);
      if (p) {
        setViewY(p.y);
        setViewM(p.m);
      }
    }
    setOpen((o) => !o);
  }, [open, value]);

  const bumpMonth = useCallback(
    (delta: number) => {
      const d = new Date(viewY, viewM + delta, 1);
      setViewY(d.getFullYear());
      setViewM(d.getMonth());
    },
    [viewY, viewM],
  );

  const pickDay = useCallback(
    (dom: number) => {
      const p = partsFromCountdownTarget(value) ?? {
        y: viewY,
        m: viewM,
        d: dom,
        h: 9,
        min: 0,
      };
      const frag = toDatetimeLocalFragment(viewY, viewM, dom, p.h, p.min);
      onChange(datetimeLocalValueToCountdownTarget(frag));
    },
    [onChange, value, viewM, viewY],
  );

  const setHourMin = useCallback(
    (h: number, min: number) => {
      const pr = partsFromCountdownTarget(value);
      if (!pr) return;
      const frag = toDatetimeLocalFragment(pr.y, pr.m, pr.d, h, min);
      onChange(datetimeLocalValueToCountdownTarget(frag));
    },
    [onChange, value],
  );

  const hourVal = parts?.h ?? 9;
  const minVal = parts?.min ?? 0;

  const shell = isDark
    ? "border-white/14 bg-[#141210] text-[#f4ede6] shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
    : "border-[#b8956a]/35 bg-gradient-to-b from-[#fffdf9] to-[#f3ebe0] text-[#14110e] shadow-[0_22px_50px_rgba(20,14,10,0.12)]";

  const btn = isDark
    ? "border-[#d4b896]/35 bg-[#181614] text-[#f4ede6] hover:border-[#d4b896]/55"
    : "border-[#b8956a]/45 bg-[#fffdf9] text-[#14110e] hover:border-[#b8956a]/65";

  const muted = isDark ? "text-white/55" : "text-[#14110e]/55";
  const navBtn = isDark
    ? "rounded-lg border border-white/12 bg-white/6 px-2 py-1 text-xs hover:bg-white/10"
    : "rounded-lg border border-[#b8956a]/25 bg-white/70 px-2 py-1 text-xs hover:bg-white";

  const cellBase = isDark
    ? "rounded-lg text-sm font-medium text-white/85 hover:bg-white/8"
    : "rounded-lg text-sm font-medium text-[#14110e] hover:bg-[#b8956a]/12";
  const cellMuted = isDark ? "text-white/25" : "text-[#14110e]/22";
  const cellPick = isDark
    ? "bg-[#d4b896]/22 ring-1 ring-[#d4b896]/45"
    : "bg-[#b8956a]/18 ring-1 ring-[#b8956a]/40";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={`${baseId}-trigger`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggleOpen}
        className={`flex w-full min-w-0 flex-col gap-1 rounded-xl border px-3.5 py-2.5 text-left transition ${btn}`}
      >
        <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${muted}`}>
          {language === "vi" ? "Ngày & giờ đếm ngược" : "Countdown date & time"}
        </span>
        <span className="font-serif text-[15px] font-semibold leading-snug">{readable || "—"}</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-labelledby={`${baseId}-trigger`}
          className={`absolute left-0 right-0 z-50 mt-2 rounded-2xl border p-3.5 sm:left-0 sm:right-auto sm:min-w-[min(100%,20.5rem)] ${shell}`}
        >
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <button type="button" className={navBtn} onClick={() => bumpMonth(-1)} aria-label="Prev">
              ‹
            </button>
            <p className="min-w-0 flex-1 text-center font-serif text-base font-semibold capitalize">
              {grid.monthTitle}
            </p>
            <button type="button" className={navBtn} onClick={() => bumpMonth(1)} aria-label="Next">
              ›
            </button>
          </div>
          <div
            className={`mb-1.5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wide ${muted}`}
          >
            {grid.weekdays.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {grid.cells.map((cell, idx) => {
              const isSel = cell && selectedDom === cell.n;
              return (
                <div key={idx} className="aspect-square min-h-[2rem]">
                  {cell ? (
                    <button
                      type="button"
                      onClick={() => pickDay(cell.n)}
                      className={`flex h-full w-full items-center justify-center ${cellBase} ${isSel ? cellPick : ""}`}
                    >
                      {cell.n}
                    </button>
                  ) : (
                    <span className={`flex h-full w-full items-center justify-center text-xs ${cellMuted}`}>
                      ·
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className={`mt-3 flex flex-wrap items-center gap-2 border-t pt-3 ${isDark ? "border-white/10" : "border-[#b8956a]/18"}`}
          >
            <span className={`text-[11px] font-semibold uppercase tracking-wide ${muted}`}>
              {language === "vi" ? "Giờ" : "Time"}
            </span>
            <select
              className={`min-w-[4.25rem] rounded-lg border px-2 py-1.5 text-sm ${isDark ? "border-white/14 bg-black/30 text-white" : "border-[#b8956a]/25 bg-white text-[#14110e]"}`}
              value={hourVal}
              onChange={(e) => setHourMin(Number(e.target.value), minVal)}
            >
              {Array.from({ length: MAX_HOUR + 1 }, (_, h) => (
                <option key={h} value={h}>
                  {pad2(h)}
                </option>
              ))}
            </select>
            <span className={muted}>:</span>
            <select
              className={`min-w-[4.25rem] rounded-lg border px-2 py-1.5 text-sm ${isDark ? "border-white/14 bg-black/30 text-white" : "border-[#b8956a]/25 bg-white text-[#14110e]"}`}
              value={minVal}
              onChange={(e) => setHourMin(hourVal, Number(e.target.value))}
            >
              {Array.from({ length: MAX_MIN + 1 }, (_, m) => (
                <option key={m} value={m}>
                  {pad2(m)}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={`ml-auto rounded-lg px-3 py-1.5 text-xs font-semibold ${isDark ? "bg-white/10 hover:bg-white/14" : "bg-[#b8956a]/15 hover:bg-[#b8956a]/25"}`}
              onClick={() => setOpen(false)}
            >
              {language === "vi" ? "Đóng" : "Close"}
            </button>
          </div>
        </div>
      ) : null}

      <p className={`mt-2 text-[11px] leading-relaxed ${muted}`}>{hint}</p>
      <p
        className={`mt-1.5 font-mono text-[11px] leading-relaxed ${isDark ? "text-white/45" : "text-[#14110e]/50"}`}
      >
        ISO: {isoLine}
      </p>
      <p className={`mt-1 text-xs font-medium leading-relaxed ${isDark ? "text-white/78" : "text-[#14110e]/80"}`}>
        {readable}
      </p>
    </div>
  );
}
