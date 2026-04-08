"use client";

import { useEffect, useMemo, useState } from "react";
import { useMessages } from "@/i18n/use-messages";

type WeddingCountdownProps = {
  targetDate: string;
  variant?: "minimal" | "editorial" | "romance" | "dark" | "coastal";
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

export default function WeddingCountdown({
  targetDate,
  variant = "minimal",
}: WeddingCountdownProps) {
  const { countdown: cd } = useMessages();
  const labels = useMemo<[string, string, string, string]>(
    () => [cd.day, cd.hour, cd.minute, cd.second],
    [cd.day, cd.hour, cd.minute, cd.second],
  );
  const [parts, setParts] = useState<CountdownPart[]>(() =>
    getCountdownParts(targetDate, labels),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setParts(getCountdownParts(targetDate, labels));
    }, 1000);

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

    return "bg-[var(--color-cream)]";
  }, [variant]);

  const labelClassName =
    variant === "editorial"
      ? "text-white/68"
      : variant === "dark"
        ? "text-white/62"
      : "text-[var(--color-sage)]";

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {parts.map((item) => (
        <div
          key={item.label}
          className={`rounded-[1.6rem] p-5 text-center ${itemClassName}`}
        >
          <p className="font-display text-5xl leading-none">{item.value}</p>
          <p
            className={`mt-3 text-xs uppercase tracking-[0.28em] ${labelClassName}`}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
