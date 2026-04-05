"use client";

import { useRef } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
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
  demoLinkLabel = "Xem demo",
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
              <TemplateListCard
                key={item.slug}
                item={item}
                isDark={isDark}
                badgeClassName={badgeClassName}
                demoLabel={demoLinkLabel}
                secondaryHref={secondaryActionHref}
                secondaryLabel={secondaryActionLabel}
                secondaryClassName={secondaryActionClassName}
                cardClassName="w-[320px] shrink-0"
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
              demoLabel={demoLinkLabel}
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
