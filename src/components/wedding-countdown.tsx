"use client";

import { useEffect, useMemo, useState } from "react";
import { useMessages } from "@/i18n/use-messages";

type WeddingCountdownProps = {
  targetDate: string;
  variant?: "minimal" | "editorial" | "romance" | "dark" | "coastal" | "gentleDrift";
  /**
   * Chỉ dùng với `variant="gentleDrift"`: ô đếm giấy champagne (warm) hoặc nâu ấm tối (midnight), không dùng nền đen tuyền.
   */
  gentleDriftTone?: "warm" | "midnight";
};

type CountdownPart = {
  label: string;
  value: string;
};

function getCountdownParts(
  targetDate: string,
  labels: [string, string, string, string],
): CountdownPart[] {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = Math.max(target.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [
    { label: labels[0], value: String(days).padStart(2, "0") },
    { label: labels[1], value: String(hours).padStart(2, "0") },
    { label: labels[2], value: String(minutes).padStart(2, "0") },
    { label: labels[3], value: String(seconds).padStart(2, "0") },
  ];
}

function zeroParts(labels: [string, string, string, string]): CountdownPart[] {
  return labels.map((label) => ({ label, value: "00" }));
}

export default function WeddingCountdown({
  targetDate,
  variant = "minimal",
  gentleDriftTone = "warm",
}: WeddingCountdownProps) {
  const { countdown: cd } = useMessages();
  const labels = useMemo<[string, string, string, string]>(
    () => [cd.day, cd.hour, cd.minute, cd.second],
    [cd.day, cd.hour, cd.minute, cd.second],
  );
  /** Không gọi `Date` trong initial state — tránh lệch SSR vs hydrate. */
  const [parts, setParts] = useState<CountdownPart[]>(() => zeroParts(labels));

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(targetDate, labels));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [labels, targetDate]);

  const itemClassName = useMemo(() => {
    if (variant === "editorial") {
      return "bg-[var(--color-ink)] text-white";
    }

    if (variant === "romance") {
      return "bg-[rgba(184,144,152,0.16)]";
    }

    if (variant === "dark") {
      return "bg-[linear-gradient(180deg,#241c20,#34272a)] text-white";
    }

    if (variant === "coastal") {
      return "bg-[rgba(123,168,184,0.16)]";
    }

    if (variant === "gentleDrift") {
      if (gentleDriftTone === "midnight") {
        return [
          "border border-[rgba(212,184,122,0.26)]",
          "bg-[linear-gradient(168deg,#2f2a25_0%,#1e1b18_48%,#161412_100%)]",
          "text-[#f7f1ea]",
          "shadow-[0_10px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]",
        ].join(" ");
      }
      return [
        "border border-[rgba(184,149,106,0.4)]",
        "bg-[linear-gradient(180deg,#fffdf9_0%,#efe8de_55%,#e8dfd4_100%)]",
        "text-[#16110d]",
        "shadow-[0_8px_26px_rgba(20,14,10,0.065),inset_0_1px_0_rgba(255,255,255,0.9)]",
      ].join(" ");
    }

    return "bg-[var(--color-cream)]";
  }, [gentleDriftTone, variant]);

  const labelClassName = useMemo(() => {
    if (variant === "editorial") return "text-white/68";
    if (variant === "dark") return "text-white/62";
    if (variant === "gentleDrift") {
      return gentleDriftTone === "midnight"
        ? "text-[rgba(247,241,234,0.58)]"
        : "text-[#6e655b]";
    }
    return "text-[var(--color-sage)]";
  }, [gentleDriftTone, variant]);

  const gridGap =
    variant === "gentleDrift" ? "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" : "grid grid-cols-2 gap-4 sm:grid-cols-4";

  const cellRadius = variant === "gentleDrift" ? "rounded-[1.05rem]" : "rounded-[1.6rem]";

  const cellPad = variant === "gentleDrift" ? "p-4 sm:p-[1.15rem]" : "p-5";

  const valueClass =
    variant === "gentleDrift"
      ? "font-display text-[2.1rem] leading-none tracking-[-0.02em] sm:text-[2.65rem]"
      : "font-display text-5xl leading-none";

  const labelGap = variant === "gentleDrift" ? "mt-2.5" : "mt-3";

  const labelTrack = variant === "gentleDrift" ? "tracking-[0.26em]" : "tracking-[0.28em]";

  return (
    <div className={gridGap}>
      {parts.map((item) => (
        <div key={item.label} className={`${cellRadius} ${cellPad} text-center ${itemClassName}`}>
          <p className={valueClass}>{item.value}</p>
          <p className={`${labelGap} text-xs uppercase ${labelTrack} ${labelClassName}`}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
