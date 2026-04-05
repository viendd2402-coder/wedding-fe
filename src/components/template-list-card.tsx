"use client";

import Link from "next/link";
import type { WeddingTemplate } from "@/lib/templates";

type TemplateListCardProps = {
  item: WeddingTemplate;
  isDark: boolean;
  badgeClassName: string;
  /** Nhãn nút trùng với hành vi mở demo (thẻ cũng mở demo; nút chỉ mang tính gợi ý). */
  demoLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryClassName: string;
  /** Ví dụ `w-[320px] shrink-0` cho carousel ngang. */
  cardClassName?: string;
};

export function TemplateListCard({
  item,
  isDark,
  badgeClassName,
  demoLabel,
  secondaryHref,
  secondaryLabel,
  secondaryClassName,
  cardClassName = "",
}: TemplateListCardProps) {
  const detailHref = `/templates/${item.slug}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] ${
        isDark
          ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
          : "border border-[var(--color-ink)]/8 bg-white/70 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
      } ${cardClassName}`}
    >
      <Link
        href={detailHref}
        className={`absolute inset-0 z-0 rounded-[2rem] outline-offset-4 focus-visible:outline focus-visible:outline-2 ${
          isDark ? "focus-visible:outline-white/50" : "focus-visible:outline-[var(--color-rose)]/60"
        }`}
        aria-label={`${demoLabel} — ${item.name}`}
      >
        <span className="sr-only">{item.name}</span>
      </Link>
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col pointer-events-none">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex min-h-[52px] items-start justify-between gap-3">
            <p className="max-w-[180px] text-sm uppercase tracking-[0.28em] text-[var(--color-sage)]">
              {item.style}
            </p>
            <span className={badgeClassName}>{item.tier}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                isDark
                  ? "bg-white/8 text-white/72"
                  : "bg-[var(--color-ink)]/6 text-[var(--color-ink)]/62"
              }`}
            >
              {item.badge}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                isDark
                  ? "bg-[rgba(255,255,255,0.04)] text-white/68"
                  : "bg-[var(--color-cream)] text-[var(--color-ink)]/62"
              }`}
            >
              {item.mood}
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl">{item.name}</h2>
          <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/70"}`}>
            {item.description}
          </p>
          <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/58" : "text-[var(--color-ink)]/58"}`}>
            {item.sectionProfile}
          </p>
          <div className="mt-auto flex gap-3 pt-6">
            <span
              className={`btn-primary inline-flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full px-4 py-3 text-center text-sm font-medium whitespace-nowrap select-none ${
                isDark ? "opacity-95 group-hover:opacity-100" : "group-hover:brightness-[1.02]"
              }`}
              aria-hidden="true"
            >
              {demoLabel}
            </span>
            <a
              href={secondaryHref}
              className={`${secondaryClassName} relative z-[2] inline-flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center px-4 text-center text-[13px] font-medium whitespace-nowrap pointer-events-auto`}
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
