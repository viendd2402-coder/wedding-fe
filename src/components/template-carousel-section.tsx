"use client";

import { useRef } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { TemplateListCard } from "@/components/template-list-card";
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
  /** Nhãn nút demo (thẻ có thể bấm cả vùng; nút chỉ là gợi ý). */
  demoLinkLabel?: string;
  /** Premium xếp dưới free trong cùng section — tách nhịp bằng rule + padding. */
  stackedBelowFree?: boolean;
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
  demoLinkLabel,
  stackedBelowFree = false,
}: TemplateCarouselSectionProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useGlobalPreferences();
  const { home } = useMessages();
  const resolvedDemoLabel = demoLinkLabel ?? home.templateCardDemo;
  const isDark = theme === "dark";
  const shouldUseCarousel = templates.length > 2;

  const rootClass = stackedBelowFree
    ? isDark
      ? "mt-10 border-t border-white/12 pt-10 sm:mt-12 sm:pt-12"
      : "mt-8 border-t border-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-ink)_14%)] pt-10 sm:mt-10 sm:pt-12"
    : "mt-12";

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) {
      return;
    }

    const scrollAmount = 436;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={rootClass}>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.32em] ${eyebrowColorClassName}`}>
            {eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl sm:mt-3 sm:text-3xl md:text-4xl">{title}</h3>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className={`max-w-md text-xs leading-6 sm:text-sm sm:leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/86"}`}>
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
                : "border-2 border-[color-mix(in_srgb,var(--luxury-gold)_40%,white)] bg-[linear-gradient(145deg,#fffefb,rgba(252,240,232,0.95))] text-[var(--color-ink)] shadow-[0_12px_36px_rgba(46,36,32,0.1)] backdrop-blur-sm hover:border-[color-mix(in_srgb,var(--luxury-gold)_55%,var(--color-rose))] hover:shadow-[0_16px_44px_rgba(158,90,102,0.12)]"
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
                : "border-2 border-[color-mix(in_srgb,var(--luxury-gold)_40%,white)] bg-[linear-gradient(145deg,#fffefb,rgba(252,240,232,0.95))] text-[var(--color-ink)] shadow-[0_12px_36px_rgba(46,36,32,0.1)] backdrop-blur-sm hover:border-[color-mix(in_srgb,var(--luxury-gold)_55%,var(--color-rose))] hover:shadow-[0_16px_44px_rgba(158,90,102,0.12)]"
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
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {templates.map((item) => (
              <TemplateListCard
                key={item.slug}
                item={item}
                isDark={isDark}
                badgeClassName={badgeClassName}
                demoLabel={resolvedDemoLabel}
                secondaryHref={secondaryActionHref}
                secondaryLabel={secondaryActionLabel}
                secondaryClassName={secondaryActionClassName}
                cardClassName="w-[min(100%,400px)] min-w-[292px] shrink-0 sm:w-[400px]"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((item) => (
            <TemplateListCard
              key={item.slug}
              item={item}
              isDark={isDark}
              badgeClassName={badgeClassName}
              demoLabel={resolvedDemoLabel}
              secondaryHref={secondaryActionHref}
              secondaryLabel={secondaryActionLabel}
              secondaryClassName={secondaryActionClassName}
              cardClassName="h-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
