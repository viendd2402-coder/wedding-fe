"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import type { WeddingTemplate } from "@/lib/templates";
import {
  TOP_TEMPLATE_SLUGS_BY_USAGE,
  TOP_TEMPLATE_SPOTLIGHT_LIMIT,
  weddingTemplates,
} from "@/lib/templates";

function resolveTopByUsage(): WeddingTemplate[] {
  const map = new Map(weddingTemplates.map((t) => [t.slug, t]));
  return TOP_TEMPLATE_SLUGS_BY_USAGE.map((slug) => map.get(slug)).filter(
    (t): t is WeddingTemplate => t != null,
  ).slice(0, TOP_TEMPLATE_SPOTLIGHT_LIMIT);
}

export default function HomeHeroSpotlight() {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const items = useMemo(() => resolveTopByUsage(), []);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            eyebrow: "Phổ biến",
            title: "Mẫu được chọn nhiều nhất",
            body: "Thứ hạng theo lượt cặp đôi chọn mẫu — mở thẻ để xem demo đầy đủ.",
            openLabel: "Xem mẫu",
            viewAll: "Xem tất cả mẫu giao diện",
            tierFree: "Miễn phí",
            tierPremium: "Trả phí",
            rankLabel: (n: number) => `Hạng ${n}`,
          }
        : {
            eyebrow: "Popular",
            title: "Most-chosen templates",
            body: "Ranked by how often couples pick each design — open a card for the full demo.",
            openLabel: "Open",
            viewAll: "Browse all templates",
            tierFree: "Free",
            tierPremium: "Premium",
            rankLabel: (n: number) => `#${n}`,
          },
    [language],
  );

  const tierLabel = (tier: string) => {
    if (tier === "Miễn phí") return copy.tierFree;
    if (tier === "Trả phí") return copy.tierPremium;
    return tier;
  };

  const cardClass = isDark
    ? "border-white/10 bg-white/[0.05] shadow-[0_16px_40px_rgba(0,0,0,0.22)] hover:border-white/16 hover:bg-white/[0.08]"
    : "border-[var(--color-ink)]/10 bg-white/75 shadow-[0_16px_40px_rgba(49,42,40,0.06)] hover:border-[var(--color-ink)]/14 hover:bg-white/90";

  const tierClass = isDark
    ? "bg-white/10 text-white/78"
    : "bg-[var(--color-ink)]/8 text-[var(--color-ink)]/72";

  const rankBadgeClass = isDark
    ? "bg-black/55 text-white ring-1 ring-white/20"
    : "bg-[var(--color-ink)]/88 text-white ring-1 ring-white/25";

  return (
    <div className="animate-fade-up-soft-delay-2 min-w-0 w-full max-w-md lg:max-w-none">
      <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
        {copy.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
        {copy.title}
      </h2>
      <p className={`mt-3 max-w-md text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/68"}`}>
        {copy.body}
      </p>

      <ol className="mt-8 flex flex-col gap-3 sm:gap-4">
        {items.map((template, index) => {
          const rank = index + 1;
          return (
            <li key={template.slug}>
              <Link
                href={`/templates/${template.slug}`}
                className={`group flex overflow-hidden rounded-[1.75rem] border transition ${cardClass}`}
                aria-label={`${copy.rankLabel(rank)}: ${template.name}`}
              >
                <div className="relative shrink-0">
                  <div
                    className="aspect-[3/4] w-[6.75rem] bg-cover bg-center sm:w-[7.75rem]"
                    style={{ backgroundImage: `url(${template.image})` }}
                    role="presentation"
                  />
                  <span
                    className={`absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-display text-sm tabular-nums backdrop-blur-sm ${rankBadgeClass}`}
                  >
                    {rank}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3.5 sm:gap-2 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${tierClass}`}>
                      {tierLabel(template.tier)}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.2em] ${isDark ? "text-white/48" : "text-[var(--color-ink)]/48"}`}
                    >
                      {template.style}
                    </span>
                  </div>
                  <p className="font-display text-xl leading-tight sm:text-[1.65rem]">
                    {template.name}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-sage)]">
                    {copy.openLabel}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <a
        href="#templates"
        className={`mt-6 inline-flex text-sm font-medium underline-offset-4 transition hover:underline ${isDark ? "text-white/72 hover:text-white" : "text-[var(--color-ink)]/72 hover:text-[var(--color-ink)]"}`}
      >
        {copy.viewAll}
      </a>
    </div>
  );
}
