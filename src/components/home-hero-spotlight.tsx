"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
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
  const { theme } = useGlobalPreferences();
  const { homeHeroSpotlight: copy } = useMessages();
  const isDark = theme === "dark";
  const items = useMemo(() => resolveTopByUsage(), []);

  const tierLabel = (tier: string) => {
    if (tier === "Miễn phí") return copy.tierFree;
    if (tier === "Trả phí") return copy.tierPremium;
    return tier;
  };

  const cardClass = isDark
    ? "border-white/10 bg-white/[0.05] shadow-[0_16px_40px_rgba(0,0,0,0.22)] ring-1 ring-[color-mix(in_srgb,var(--color-rose)_12%,transparent)] hover:border-white/16 hover:bg-white/[0.08]"
    : "home-lux-panel--compact border-0 shadow-[0_20px_52px_rgba(46,36,32,0.1)] ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_38%,var(--color-rose))] backdrop-blur-sm hover:shadow-[0_26px_64px_rgba(158,90,102,0.14)]";

  const tierClass = isDark
    ? "bg-white/10 text-white/78"
    : "bg-[color-mix(in_srgb,var(--luxury-gold)_26%,var(--color-sage))]/22 font-semibold text-[var(--color-ink)] ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_32%,transparent)]";

  const rankBadgeClass = isDark
    ? "bg-black/55 text-white ring-1 ring-white/20"
    : "bg-[linear-gradient(135deg,#cfa394,#8f4f58)] text-[#fffdfb] shadow-[0_8px_22px_rgba(158,90,102,0.4)] ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_45%,white)]";

  return (
    <div className="animate-fade-up-soft-delay-2 min-w-0 w-full max-w-md lg:max-w-none">
      <p className="home-hero-spotlight-eyebrow text-xs uppercase tracking-[0.28em] text-[var(--color-sage)] sm:text-sm sm:tracking-[0.35em]">
        {copy.eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl leading-tight sm:mt-3 sm:text-3xl md:text-4xl lg:text-[2.35rem]">
        {copy.title}
      </h2>
      <p className={`mt-2 max-w-md text-xs leading-6 sm:mt-3 sm:text-sm sm:leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/86"}`}>
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
                aria-label={`${copy.rankLabelTpl.replace("__N__", String(rank))}: ${template.name}`}
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
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:gap-1.5 sm:p-3.5 md:gap-2 md:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${tierClass}`}>
                      {tierLabel(template.tier)}
                    </span>
                    <span
                      className={`text-[11px] uppercase tracking-[0.2em] ${isDark ? "text-white/48" : "text-[var(--color-ink)]/70"}`}
                    >
                      {template.style}
                    </span>
                  </div>
                  <p className="font-display text-lg leading-tight sm:text-xl md:text-[1.65rem]">
                    {template.name}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[color-mix(in_srgb,var(--luxury-gold)_25%,var(--color-sage))] sm:text-sm">
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
        className={`mt-6 inline-flex text-sm font-medium underline-offset-4 transition hover:underline ${isDark ? "text-white/72 hover:text-white" : "text-[var(--color-ink)] hover:text-[var(--color-ink)]"}`}
      >
        {copy.viewAll}
      </a>
    </div>
  );
}
