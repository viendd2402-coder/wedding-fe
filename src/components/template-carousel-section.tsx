"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import type { WeddingTemplate } from "@/lib/templates";

type TemplateCarouselSectionProps = {
  eyebrowColorClassName: string;
  title: string;
  eyebrow: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  templates: WeddingTemplate[];
  badgeClassName: string;
  secondaryActionHref: string;
  secondaryActionLabel: string;
  secondaryActionClassName: string;
};

export default function TemplateCarouselSection({
  eyebrowColorClassName,
  title,
  eyebrow,
  description,
  ctaHref,
  ctaLabel,
  templates,
  badgeClassName,
  secondaryActionHref,
  secondaryActionLabel,
  secondaryActionClassName,
}: TemplateCarouselSectionProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const shouldUseCarousel = templates.length > 2;

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) {
      return;
    }

    const scrollAmount = 340;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-sm uppercase tracking-[0.3em] ${eyebrowColorClassName}`}>
            {eyebrow}
          </p>
          <h3 className="mt-3 font-display text-4xl">{title}</h3>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className={`max-w-md text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
            {description}
          </p>
          <a
            href={ctaHref}
            className="btn-ghost inline-flex w-fit rounded-full px-5 py-3 text-sm font-medium transition"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {shouldUseCarousel ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            className={`absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 -translate-x-[120%] cursor-pointer items-center justify-center rounded-full backdrop-blur transition hover:scale-105 md:inline-flex ${
              isDark
                ? "border border-white/10 bg-white/8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:bg-white/12"
                : "border border-white/80 bg-white/88 text-[var(--color-ink)] shadow-[0_18px_40px_rgba(49,42,40,0.16)] hover:bg-white"
            }`}
            aria-label={`Cuon trai ${title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            className={`absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-[120%] cursor-pointer items-center justify-center rounded-full backdrop-blur transition hover:scale-105 md:inline-flex ${
              isDark
                ? "border border-white/10 bg-white/8 text-white shadow-[0_18px_40px_rgba(0,0,0,0.28)] hover:bg-white/12"
                : "border border-white/80 bg-white/88 text-[var(--color-ink)] shadow-[0_18px_40px_rgba(49,42,40,0.16)] hover:bg-white"
            }`}
            aria-label={`Cuon phai ${title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {templates.map((item) => (
              <article
                key={item.slug}
                className={`flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[2rem] ${
                  isDark
                    ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                    : "border border-[var(--color-ink)]/8 bg-white/70 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
                }`}
              >
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
                    <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                      isDark
                        ? "bg-white/8 text-white/72"
                        : "bg-[var(--color-ink)]/6 text-[var(--color-ink)]/62"
                    }`}>
                      {item.badge}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                      isDark
                        ? "bg-[rgba(255,255,255,0.04)] text-white/68"
                        : "bg-[var(--color-cream)] text-[var(--color-ink)]/62"
                    }`}>
                      {item.mood}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl">{item.name}</h3>
                  <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/70"}`}>
                    {item.description}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/58" : "text-[var(--color-ink)]/58"}`}>
                    {item.sectionProfile}
                  </p>
                  <div className="mt-auto flex gap-3 pt-6">
                    <Link
                      href={`/templates/${item.slug}`}
                      className="btn-primary inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-3 text-center text-sm font-medium whitespace-nowrap transition"
                    >
                      Xem demo
                    </Link>
                    <a
                      href={secondaryActionHref}
                      className={`${secondaryActionClassName} inline-flex h-12 min-w-0 flex-1 items-center justify-center px-4 text-center text-[13px] font-medium whitespace-nowrap`}
                    >
                      {secondaryActionLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((item) => (
            <article
              key={item.slug}
              className={`flex h-full flex-col overflow-hidden rounded-[2rem] ${
                isDark
                  ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                  : "border border-[var(--color-ink)]/8 bg-white/70 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
              }`}
            >
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
                  <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                    isDark
                      ? "bg-white/8 text-white/72"
                      : "bg-[var(--color-ink)]/6 text-[var(--color-ink)]/62"
                  }`}>
                    {item.badge}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.2em] ${
                    isDark
                      ? "bg-[rgba(255,255,255,0.04)] text-white/68"
                      : "bg-[var(--color-cream)] text-[var(--color-ink)]/62"
                  }`}>
                    {item.mood}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl">{item.name}</h3>
                <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/70"}`}>
                  {item.description}
                </p>
                <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/58" : "text-[var(--color-ink)]/58"}`}>
                  {item.sectionProfile}
                </p>
                <div className="mt-auto flex gap-3 pt-6">
                  <Link
                    href={`/templates/${item.slug}`}
                    className="btn-primary inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-full px-4 py-3 text-center text-sm font-medium whitespace-nowrap transition"
                  >
                    Xem demo
                  </Link>
                  <a
                    href={secondaryActionHref}
                    className={`${secondaryActionClassName} inline-flex h-12 min-w-0 flex-1 items-center justify-center px-4 text-center text-[13px] font-medium whitespace-nowrap`}
                  >
                    {secondaryActionLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
