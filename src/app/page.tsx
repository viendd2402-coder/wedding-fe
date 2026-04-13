"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { HomeContactReportForm } from "@/components/home-contact-report-form";
import HomeHeroSpotlight from "@/components/home-hero-spotlight";
import TemplateCarouselSection from "@/components/template-carousel-section";
import {
  freeTemplates,
  premiumTemplates,
  weddingTemplates,
} from "@/lib/templates";

/** Số dòng bảng so sánh hiển thị trước khi bấm "Xem thêm". */
const FEATURE_TABLE_PREVIEW_COUNT = 6;

type WhyUsIconId = "envelope" | "users" | "list" | "globe" | "pricing" | "heart";
/** Tông thiệp cưới: champagne / blush / sage / hồng — tránh violet-indigo “app công nghệ”. */
type WhyUsTone = "amber" | "rose" | "blush" | "champagne" | "sage" | "warmRose";

function whyUsIconGradient(tone: WhyUsTone, isDark: boolean): string {
  const d = isDark;
  switch (tone) {
    case "amber":
      return d ? "from-amber-200/45 to-rose-400/35" : "from-amber-200 to-rose-100";
    case "rose":
      return d ? "from-rose-500/85 to-pink-600/90" : "from-rose-400 to-pink-400";
    case "blush":
      return d ? "from-[#b8939a]/90 to-[#8f6b73]/90" : "from-[#e8d4d0] to-[#d1b1ab]";
    case "champagne":
      return d ? "from-[#c4a574]/40 to-[#9a737c]/45" : "from-[#e9ddd1] to-[#c5a7a1]";
    case "sage":
      return d ? "from-emerald-700/80 to-teal-800/85" : "from-[#7d8c79] to-[#5c6b58]";
    case "warmRose":
      return d ? "from-[#c97b7b]/90 to-[#8b4049]/90" : "from-[#c7a29f] to-[#9a737c]";
    default:
      return d ? "from-zinc-500 to-zinc-700" : "from-zinc-500 to-zinc-600";
  }
}

function whyUsTitleClass(tone: WhyUsTone, isDark: boolean): string {
  if (isDark) {
    switch (tone) {
      case "amber":
        return "text-amber-200";
      case "rose":
        return "text-rose-300";
      case "blush":
        return "text-[#e8cfc9]";
      case "champagne":
        return "text-[#e9ddd1]";
      case "sage":
        return "text-[#b8c9b0]";
      case "warmRose":
        return "text-[#f0c4c4]";
      default:
        return "text-white/88";
    }
  }
  switch (tone) {
    case "amber":
      return "text-amber-900";
    case "rose":
      return "text-rose-900";
    case "blush":
      return "text-[#6d4c52]";
    case "champagne":
      return "text-[#5c4a42]";
    case "sage":
      return "text-[#3d4a38]";
    case "warmRose":
      return "text-[#6d3d45]";
    default:
      return "text-[var(--color-ink)]";
  }
}

function WhyUsGlyph({ id }: { id: WhyUsIconId }) {
  const c = "h-5 w-5 text-white";
  switch (id) {
    case "envelope":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 5.5L20 7" />
        </svg>
      );
    case "users":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "list":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "globe":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
      );
    case "pricing":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "heart":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 4.21C5.43 4.21 3.78 5.88 3.78 8c0 2.85 3.72 5.23 5.22 7.47.26.4.72.4.98 0 1.5-2.24 5.22-4.62 5.22-7.47 0-2.12-1.65-3.79-3.72-3.79-1.12 0-2.14.52-2.78 1.34-.64-.82-1.66-1.34-2.78-1.34Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

/** Họa tiết chia nhỏ — gợi thiệp / trang trí tiệc. */
function WeddingFlourish({
  align = "center",
  className = "",
  luxury = false,
}: {
  align?: "center" | "start";
  className?: string;
  /** Theme sáng trang chủ: viền vàng hồng champagne */
  luxury?: boolean;
}) {
  const lineClass = luxury
    ? "home-wedding-flourish-line-luxury h-px w-10 max-w-[28vw] shrink sm:w-14"
    : "h-px w-10 max-w-[28vw] shrink bg-[color-mix(in_srgb,var(--color-rose)_42%,transparent)] sm:w-14";
  const starClass = luxury
    ? "home-wedding-flourish-star-luxury font-display text-[0.95rem] leading-none"
    : "font-display text-[0.95rem] leading-none text-[var(--color-rose)]/90";
  return (
    <div
      className={`flex w-full items-center gap-3 ${align === "start" ? "justify-start" : "justify-center"} ${className}`}
      aria-hidden="true"
    >
      <span className={lineClass} />
      <span className={starClass}>✦</span>
      <span className={lineClass} />
    </div>
  );
}

/** Một lần duy nhất: cành lá mờ trong hero — nét mảnh, ít lớp, tránh “vệt xám” khi blur. */
function HeroBotanicalMotif({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden="true"
    >
      <div
        className={`absolute -right-2 top-[5%] h-[min(70vh,500px)] w-[min(42vw,400px)] origin-top-right md:h-[min(62vh,440px)] md:w-[min(48vw,360px)] lg:-right-1 lg:top-[4%] lg:h-[min(76vh,540px)] lg:w-[min(44vw,420px)] ${
          isDark
            ? "text-[color-mix(in_srgb,var(--color-rose)_48%,rgb(255_255_255)_52%)]"
            : "text-[color-mix(in_srgb,var(--color-rose)_45%,var(--luxury-gold)_40%,var(--color-sage)_15%)]"
        }`}
      >
        <div
          className={`h-full w-full ${isDark ? "opacity-[0.09]" : "opacity-[0.125]"} [-webkit-mask-image:linear-gradient(to_left,black_55%,transparent)] [mask-image:linear-gradient(to_left,black_55%,transparent)] lg:[-webkit-mask-image:linear-gradient(to_left,black_68%,transparent)] lg:[mask-image:linear-gradient(to_left,black_68%,transparent)]`}
        >
          <div className="h-full w-full blur-[0.5px] will-change-transform lg:blur-none">
            <svg
              className="h-full w-full max-w-none"
              viewBox="0 0 400 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMaxYMin meet"
            >
              <path
                d="M388 568C312 472 278 332 252 210C228 102 184 38 64 6"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <g fill="currentColor" fillOpacity="0.34">
                <ellipse cx="322" cy="418" rx="36" ry="13" transform="rotate(-36 322 418)" />
                <ellipse cx="278" cy="298" rx="32" ry="12" transform="rotate(-48 278 298)" />
                <ellipse cx="242" cy="188" rx="28" ry="11" transform="rotate(-58 242 188)" />
                <ellipse cx="198" cy="92" rx="24" ry="10" transform="rotate(-28 198 92)" />
              </g>
              <g fill="currentColor" fillOpacity="0.22">
                <ellipse cx="348" cy="312" rx="22" ry="9" transform="rotate(24 348 312)" />
                <ellipse cx="128" cy="48" rx="20" ry="8" transform="rotate(-18 128 48)" />
              </g>
              <g fill="currentColor" fillOpacity="0.5">
                <circle cx="218" cy="108" r="3" />
                <circle cx="268" cy="218" r="2.6" />
                <circle cx="308" cy="338" r="2.8" />
                <circle cx="348" cy="468" r="2.4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { theme } = useGlobalPreferences();
  const { home: copy } = useMessages();
  const isDark = theme === "dark";

  /** Cùng max-width & padding ngang với #templates — trang cân, một cột nhịp */
  const homeOuter =
    "mx-auto w-full max-w-[min(100%,92rem)] px-4 sm:px-6 lg:px-10";

  const contactFieldClass = isDark
    ? "w-full min-w-0 rounded-2xl border border-white/16 bg-white/[0.07] px-4 py-3.5 text-base leading-normal text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none transition-[border-color,box-shadow] placeholder:text-white/42 focus-visible:border-white/28 focus-visible:ring-2 focus-visible:ring-white/15 sm:px-5 sm:py-4"
    : "w-full min-w-0 rounded-2xl border border-[var(--color-ink)]/14 bg-[var(--color-cream)] px-4 py-3.5 text-base leading-normal text-[var(--color-ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--color-ink)]/38 focus-visible:border-[var(--color-ink)]/25 focus-visible:ring-2 focus-visible:ring-[var(--color-rose)]/20 sm:px-5 sm:py-4";


  const [featuresTableExpanded, setFeaturesTableExpanded] = useState(false);

  const featureRowsForTable = useMemo(() => {
    const all = copy.featureRows;
    if (featuresTableExpanded || all.length <= FEATURE_TABLE_PREVIEW_COUNT) {
      return all;
    }
    return all.slice(0, FEATURE_TABLE_PREVIEW_COUNT);
  }, [copy.featureRows, featuresTableExpanded]);

  const featureTableHasMore = copy.featureRows.length > FEATURE_TABLE_PREVIEW_COUNT;

  const featuresExpandButtonRef = useRef<HTMLButtonElement>(null);
  const featuresExpandAnchorTopRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const anchorTop = featuresExpandAnchorTopRef.current;
    if (anchorTop === null) return;
    const btn = featuresExpandButtonRef.current;
    featuresExpandAnchorTopRef.current = null;
    if (!btn) return;
    const delta = btn.getBoundingClientRect().top - anchorTop;
    if (delta !== 0) {
      window.scrollBy({ top: delta, left: 0, behavior: "auto" });
    }
  }, [featuresTableExpanded]);

  const feedbackStripRef = useRef<HTMLDivElement>(null);

  const scrollFeedbackStrip = (direction: "left" | "right") => {
    const el = feedbackStripRef.current;
    if (!el) return;
    const step = Math.min(360, Math.max(280, el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const feedbackNavBtnClass = `flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur transition hover:scale-105 sm:h-12 sm:w-12 ${
    isDark
      ? "border-white/12 bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-white/18"
      : "home-lux-panel--compact border-0 bg-[linear-gradient(145deg,#fffefb,rgba(252,244,236,0.95))] text-[var(--color-ink)] shadow-[0_12px_36px_rgba(46,36,32,0.1)] hover:ring-2 hover:ring-[color-mix(in_srgb,var(--luxury-gold)_40%,transparent)]"
  }`;

  return (
    <main
      className={`home-wedding-main-backdrop text-[var(--color-ink)] transition-colors ${!isDark ? "home-luxury-light subpixel-antialiased" : ""}`}
    >
      <section className="relative isolate overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(ellipse_75%_48%_at_50%_-10%,rgba(209,177,171,0.18),transparent_46%),linear-gradient(145deg,rgba(10,9,9,0.98),rgba(14,12,13,0.96))]"
              : "bg-[radial-gradient(ellipse_72%_44%_at_50%_-6%,rgba(184,146,92,0.2),transparent_54%),radial-gradient(ellipse_82%_50%_at_50%_-8%,rgba(196,160,153,0.22),transparent_50%),radial-gradient(circle_at_86%_10%,rgba(255,252,250,0.92),transparent_55%),linear-gradient(168deg,#fffefb_0%,#faf4ee_48%,#f3e4d8_100%)]"
          }`}
        />
        <div
          className={`animate-float-soft absolute -top-28 right-[-120px] h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-[rgba(209,177,171,0.1)]" : "bg-[color-mix(in_srgb,var(--luxury-gold)_28%,#fffefb)]"
          }`}
        />
        <div
          className={`animate-drift-soft absolute bottom-0 left-[-80px] h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-[rgba(155,168,150,0.1)]" : "bg-[color-mix(in_srgb,var(--color-rose)_22%,#f5f0eb)]"
          }`}
        />

        <HeroBotanicalMotif isDark={isDark} />

        <div className={`relative z-10 flex min-h-screen flex-col py-6 sm:py-10 lg:py-12 ${homeOuter}`}>
          <div className="grid flex-1 items-center gap-8 py-8 sm:gap-14 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div className="max-w-2xl">
              <p className="animate-fade-up-soft mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_32%,var(--color-sage))] sm:mb-3 sm:text-sm sm:tracking-[0.38em]">
                {copy.heroEyebrow}
              </p>
              <WeddingFlourish align="start" className="animate-fade-up-soft mb-4 sm:mb-5" luxury={!isDark} />
              <h1
                className={`animate-fade-up-soft-delay-1 font-display text-3xl leading-[1.08] tracking-[-0.02em] sm:text-5xl sm:leading-[1.06] sm:tracking-[-0.015em] md:text-7xl lg:text-8xl ${
                  isDark ? "" : "text-[var(--color-ink)]"
                }`}
              >
                {copy.heroTitle}
              </h1>
              <p className={`animate-fade-up-soft-delay-2 mt-4 max-w-xl text-sm leading-7 sm:mt-6 sm:text-base sm:leading-8 md:text-lg ${isDark ? "text-white/74" : "text-[var(--color-ink)]/88"}`}>
                {copy.heroBody}
              </p>
              <p
                className={`animate-fade-up-soft-delay-2 mt-4 max-w-xl font-display text-base italic leading-relaxed sm:mt-5 sm:text-lg md:text-xl ${
                  isDark
                    ? "text-[var(--color-rose)]/80"
                    : "text-[color-mix(in_srgb,var(--color-rose)_78%,var(--luxury-gold)_22%)]"
                }`}
              >
                {copy.heroTagline}
              </p>

              <div className="animate-fade-up-soft-delay-3 mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <a
                  href="#templates"
                  className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {copy.heroPrimaryCta}
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {copy.heroSecondaryCta}
                </a>
              </div>

              <div className="animate-fade-up-soft-delay-3 mt-8 grid max-w-lg grid-cols-3 gap-2.5 sm:mt-12 sm:gap-4">
                <div
                  className={`rounded-2xl p-3 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-4 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)]"
                      : "home-lux-panel--compact border-0 ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_38%,var(--color-rose))] backdrop-blur-sm sm:rounded-3xl"
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-sage))] sm:text-xs sm:tracking-[0.28em]">
                    {copy.statTemplates}
                  </p>
                  <p className="mt-2 font-display text-xl sm:mt-3 sm:text-3xl">
                    {weddingTemplates.length}+
                  </p>
                </div>
                <div
                  className={`rounded-2xl p-3 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-4 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)]"
                      : "home-lux-panel--compact border-0 ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_38%,var(--color-rose))] backdrop-blur-sm sm:rounded-3xl"
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-sage))] sm:text-xs sm:tracking-[0.28em]">
                    {copy.statDelivery}
                  </p>
                  <p className="mt-2 font-display text-lg leading-tight sm:mt-3 sm:text-2xl md:text-3xl">{copy.statDeliveryValue}</p>
                </div>
                <div
                  className={`rounded-2xl p-3 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:p-4 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)]"
                      : "home-lux-panel--compact border-0 ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_38%,var(--color-rose))] backdrop-blur-sm sm:rounded-3xl"
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-sage))] sm:text-xs sm:tracking-[0.28em]">
                    {copy.statMobile}
                  </p>
                  <p className="mt-2 font-display text-xl sm:mt-3 sm:text-3xl">100%</p>
                </div>
              </div>
            </div>

            <HomeHeroSpotlight />
          </div>
        </div>
      </section>

      <section
        id="templates"
        className={`${homeOuter} py-24 sm:py-28 ${
          isDark
            ? "border-t border-[color-mix(in_srgb,var(--color-rose)_14%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-rose)_6%,transparent),transparent)]"
            : "home-lux-panel my-6 rounded-[2.5rem] border-0 sm:my-10"
        }`}
      >
        <div className="max-w-4xl">
          <WeddingFlourish align="start" className="mb-4" luxury={!isDark} />
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
            {copy.templatesEyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:mt-4 sm:text-4xl sm:leading-tight md:text-5xl lg:text-[2.75rem]">
            {copy.templatesTitle}
          </h2>
        </div>

        <TemplateCarouselSection
          eyebrow={copy.freeEyebrow}
          title={copy.freeTitle}
          description={copy.freeDescription}
          eyebrowColorClassName="text-[var(--color-sage)]"
          ctaHref="/templates/free"
          ctaLabel={copy.freeCta}
          templates={freeTemplates}
          badgeClassName="rounded-full bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-medium text-[var(--color-sage)]"
          secondaryActionHref="#contact"
          secondaryActionLabel={copy.freeSecondary}
          secondaryActionClassName="btn-ghost inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
          demoLinkLabel={copy.templateCardDemo}
        />

        <TemplateCarouselSection
          eyebrow={copy.premiumEyebrow}
          title={copy.premiumTitle}
          description={copy.premiumDescription}
          eyebrowColorClassName="text-[var(--color-rose)]"
          ctaHref="/templates/premium"
          ctaLabel={copy.premiumCta}
          templates={premiumTemplates}
          badgeClassName="rounded-full bg-[var(--color-rose)]/12 px-3 py-1 text-xs font-medium text-[var(--color-rose)]"
          secondaryActionHref="#pricing"
          secondaryActionLabel={copy.premiumSecondary}
          secondaryActionClassName="btn-secondary inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
          demoLinkLabel={copy.templateCardDemo}
          stackedBelowFree
        />
      </section>

      <section
        id="why-us"
        className={`animate-fade-scale-soft ${homeOuter} py-20 sm:py-24 ${!isDark ? "home-lux-panel rounded-[2.5rem] border-0" : ""}`}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_35%,var(--color-rose))] sm:text-sm sm:tracking-[0.38em]">
            {copy.whyUsEyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl leading-[1.15] sm:mt-4 sm:text-3xl sm:leading-[1.12] md:text-4xl lg:text-[2.85rem]">
            {copy.whyUsTitle}
          </h2>
          <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 md:text-lg ${isDark ? "text-white/68" : "text-[var(--color-ink)]/85"}`}>
            {copy.whyUsBody}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_minmax(220px,340px)_1fr] lg:items-center lg:gap-8 xl:gap-12">
          <div className="order-2 flex flex-col gap-10 lg:order-1 lg:gap-12">
            {copy.whyUsLeft.map((item) => (
              <div key={item.title} className="flex flex-row-reverse items-start gap-4 sm:gap-5 lg:ml-auto lg:max-w-md">
                <div
                  className={`shrink-0 rounded-xl bg-gradient-to-br p-3.5 shadow-lg ${whyUsIconGradient(item.tone as WhyUsTone, isDark)}`}
                >
                  <WhyUsGlyph id={item.icon as WhyUsIconId} />
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <h3 className={`text-sm font-semibold tracking-tight sm:text-base md:text-lg ${whyUsTitleClass(item.tone as WhyUsTone, isDark)}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-1.5 text-xs leading-6 sm:mt-2 sm:text-sm sm:leading-7 ${isDark ? "text-white/60" : "text-[var(--color-ink)]/82"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 flex justify-center px-2 lg:order-2 lg:px-0">
            <div className="relative w-full max-w-[min(100%,420px)] sm:max-w-[440px] lg:max-w-[380px]">
              {/* Unsplash — photo-1519741497674-611481863552 (Unsplash License) */}
              <Image
                src="/marketing/wedding-animation.jpg"
                alt={copy.whyUsImageAlt}
                width={1200}
                height={1000}
                className={`h-auto w-full select-none rounded-2xl object-cover object-center ${
                  isDark
                    ? "shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
                    : "shadow-[0_28px_72px_rgba(46,36,32,0.14),0_0_0_1px_rgba(255,255,255,0.95)_inset] ring-2 ring-[color-mix(in_srgb,var(--luxury-gold)_50%,var(--color-rose))]"
                }`}
                sizes="(max-width: 1024px) min(100vw, 420px), 380px"
                priority={false}
              />
            </div>
          </div>

          <div className="order-3 flex flex-col gap-10 lg:gap-12">
            {copy.whyUsRight.map((item) => (
              <div key={item.title} className="flex items-start gap-4 sm:gap-5 lg:max-w-md">
                <div
                  className={`shrink-0 rounded-xl bg-gradient-to-br p-3.5 shadow-lg ${whyUsIconGradient(item.tone as WhyUsTone, isDark)}`}
                >
                  <WhyUsGlyph id={item.icon as WhyUsIconId} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className={`text-sm font-semibold tracking-tight sm:text-base md:text-lg ${whyUsTitleClass(item.tone as WhyUsTone, isDark)}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-1.5 text-xs leading-6 sm:mt-2 sm:text-sm sm:leading-7 ${isDark ? "text-white/60" : "text-[var(--color-ink)]/82"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className={`animate-fade-scale-soft-delay-1 ${homeOuter} py-14 sm:py-20 lg:py-24`}
      >
        <div
          className={`hover-lift-strong rounded-[1.75rem] px-4 py-10 sm:rounded-[2.5rem] sm:px-6 sm:py-14 md:px-10 lg:px-14 ${
            isDark
              ? "border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(209,177,171,0.1),_transparent_28%),linear-gradient(180deg,#111113,#18181b)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              : "home-lux-panel border-0 text-[var(--color-ink)]"
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p
                className={`text-xs font-semibold uppercase tracking-[0.32em] sm:text-sm sm:tracking-[0.38em] ${
                  isDark ? "text-[var(--color-rose)]/82" : "text-[color-mix(in_srgb,var(--luxury-gold)_30%,var(--color-rose))]"
                }`}
              >
                {copy.featuresEyebrow}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
                {copy.featuresTitle}
              </h2>
            </div>
            {/* <p className={`max-w-md text-xs leading-6 sm:text-sm sm:leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/86"}`}>
              {copy.featuresBody}
            </p> */}
          </div>

          <div
            className={`mt-10 overflow-x-auto rounded-[2rem] backdrop-blur transition-transform duration-500 hover:scale-[1.01] ${
              isDark
                ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_14px_36px_rgba(0,0,0,0.22)]"
                : "home-lux-panel--compact border-0 bg-white/80 shadow-[0_16px_44px_rgba(46,36,32,0.08)] ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_25%,transparent)] backdrop-blur-sm"
            }`}
          >
            <div id="features-comparison-table" className="min-w-[920px]">
              <div className={`grid grid-cols-[1.5fr_0.8fr_1fr] border-b ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                {copy.featureTableHeaders.map((header, index) => (
                  <div
                    key={header}
                    className={`px-5 py-4 text-sm font-medium uppercase tracking-[0.24em] ${
                      index === 1
                        ? "text-[var(--color-sage)]"
                        : index === 2
                          ? "text-[var(--color-rose)]"
                          : isDark
                            ? "text-white/62"
                            : "text-[var(--color-ink)]/78"
                    }`}
                  >
                    {header}
                  </div>
                ))}
              </div>
              {featureRowsForTable.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.5fr_0.8fr_1fr] ${
                    index < featureRowsForTable.length - 1
                      ? isDark
                        ? "border-b border-white/8"
                        : "border-b border-[var(--color-ink)]/10"
                      : ""
                  }`}
                >
                  <div className="px-5 py-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-rose)]/76">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
                      {row.label}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      isDark
                        ? "bg-[rgba(155,168,150,0.14)] text-[var(--color-sage)]"
                        : "bg-[rgba(125,140,121,0.18)] text-[var(--color-sage)]"
                    }`}>
                      {row.free}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      isDark
                        ? "bg-[rgba(209,177,171,0.14)] text-[var(--color-rose)]"
                        : "bg-[rgba(197,167,161,0.2)] text-[var(--color-rose)]"
                    }`}>
                      {row.premium}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {featureTableHasMore ? (
              <div className={`flex justify-center border-t px-4 py-4 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                <button
                  ref={featuresExpandButtonRef}
                  type="button"
                  aria-expanded={featuresTableExpanded}
                  aria-controls="features-comparison-table"
                  onClick={() => {
                    const el = featuresExpandButtonRef.current;
                    if (el) {
                      featuresExpandAnchorTopRef.current = el.getBoundingClientRect().top;
                    }
                    setFeaturesTableExpanded((v) => !v);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isDark
                      ? "text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose)]/70"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-ink)]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose)]/50"
                  }`}
                >
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${featuresTableExpanded ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {featuresTableExpanded ? copy.featuresCollapse : copy.featuresExpand}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section
        id="process"
        className={`animate-fade-scale-soft-delay-1 ${homeOuter} py-24 sm:py-28 ${!isDark ? "home-lux-panel rounded-[2.5rem] border-0" : ""}`}
      >
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
              {copy.processEyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl sm:mt-4 sm:text-3xl md:text-4xl md:leading-tight lg:text-[2.75rem]">{copy.processTitle}</h2>
          </div>
          {/* <p className={`max-w-md text-xs leading-6 sm:text-sm sm:leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/86"}`}>
            {copy.processBody}
          </p> */}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.process.map((item) => (
            <article
              key={item.step}
              className={`hover-lift-strong rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6 ${
                isDark
                  ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                  : "home-lux-panel--compact border-0 ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_22%,transparent)]"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-sage))] sm:text-sm sm:tracking-[0.32em]">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-2xl sm:mt-4 sm:text-3xl">{item.title}</h3>
              <p className={`mt-3 text-xs leading-6 sm:mt-4 sm:text-sm sm:leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/86"}`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`animate-fade-scale-soft-delay-2 grid gap-6 py-12 sm:py-16 lg:grid-cols-[1fr_0.9fr] ${homeOuter}`}
      >
        <div
          className={`hover-lift-strong rounded-[1.75rem] p-5 sm:rounded-[2.4rem] sm:p-8 md:p-10 ${
            isDark
              ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              : "home-lux-panel border-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
            {copy.valueEyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
            {copy.valueTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.valuePoints.map((feature) => (
              <div
                key={feature}
                className={`hover-lift-strong rounded-[1.25rem] p-3 text-xs sm:rounded-[1.5rem] sm:p-4 sm:text-sm ${
                  isDark
                    ? "bg-[rgba(255,255,255,0.04)] text-white/75"
                    : "home-lux-panel--compact rounded-[1.5rem] border-0 text-[var(--color-ink)] ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_18%,transparent)]"
                }`}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`animate-pulse-glow-soft hover-lift-strong rounded-[1.75rem] p-5 sm:rounded-[2.4rem] sm:p-8 md:p-10 ${
            isDark
              ? "border border-white/10 bg-[linear-gradient(180deg,rgba(209,177,171,0.08),rgba(255,255,255,0.04))]"
              : "home-lux-panel--jewel border-0"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
            {copy.positioningEyebrow}
          </p>
          <blockquote className="mt-3 font-display text-2xl leading-tight sm:mt-4 sm:text-3xl md:text-4xl">
            &ldquo;{copy.positioningQuote}&rdquo;
          </blockquote>
          <p className={`mt-4 text-xs leading-6 sm:mt-6 sm:text-sm sm:leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/86"}`}>
            {copy.positioningBody}
          </p>
        </div>
      </section>

      <section
        id="pricing"
        className={`animate-fade-scale-soft-delay-2 ${homeOuter} py-24 sm:py-28 ${!isDark ? "home-lux-panel rounded-[2.5rem] border-0" : ""}`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
            {copy.pricingEyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl sm:mt-4 sm:text-4xl md:text-[2.85rem]">{copy.pricingTitle}</h2>
          <p className={`mx-auto mt-3 max-w-2xl text-xs leading-6 sm:mt-4 sm:text-sm sm:leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/86"}`}>
            {copy.pricingBody}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#features"
              onClick={() => setFeaturesTableExpanded(true)}
              className="btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              {copy.pricingCompareCta}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-2">
          {copy.pricing.map((plan) => (
            <article
              key={plan.name}
              className={`hover-lift-strong rounded-[1.75rem] p-5 transition sm:rounded-[2.5rem] sm:p-8 ${
                plan.featured
                  ? isDark
                    ? "border-2 border-[var(--color-rose)]/45 bg-white/[0.07] shadow-[0_22px_56px_rgba(0,0,0,0.28)] ring-1 ring-[var(--color-rose)]/20"
                    : "home-lux-panel--jewel border-0"
                  : isDark
                    ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                    : "home-lux-panel--compact rounded-[2.5rem] border-0 p-8 ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_22%,transparent)]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-sage))]">
                  {plan.name}
                </p>
                {plan.featured ? (
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--luxury-gold)_22%,var(--color-rose))]/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--luxury-gold)_15%,var(--color-rose))] ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_35%,transparent)]">
                    {copy.pricingPopularBadge}
                  </span>
                ) : null}
              </div>
              {plan.tagline ? (
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-white/55" : "text-[var(--color-ink)]/78"}`}>
                  {plan.tagline}
                </p>
              ) : null}
              <h3 className="mt-3 font-display text-3xl sm:mt-4 sm:text-4xl md:text-5xl">{plan.price}</h3>
              <p className={`mt-3 text-xs leading-6 sm:mt-4 sm:text-sm sm:leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/86"}`}>
                {plan.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="feedback"
        className={`animate-fade-scale-soft-delay-2 ${homeOuter} py-24 sm:py-28 ${
          isDark ? "mt-10 sm:mt-14 lg:mt-16" : "home-lux-panel mt-10 rounded-[2.5rem] border-0 sm:mt-14 lg:mt-16"
        }`}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_35%,var(--color-rose))] sm:text-sm sm:tracking-[0.38em]">
            {copy.testimonialsEyebrow}
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight sm:mt-4 sm:text-4xl md:text-[2.85rem]">
            {copy.testimonialsTitle}
          </h2>
          <p className={`mt-3 text-xs leading-6 sm:mt-4 sm:text-sm sm:leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/85"}`}>
            {copy.testimonialsBody}
          </p>
        </div>

        <div className="mt-12 flex w-full min-w-0 max-w-full items-stretch gap-2 sm:gap-4">
          <button
            type="button"
            className={`${feedbackNavBtnClass} shrink-0 self-center`}
            onClick={() => scrollFeedbackStrip("left")}
            aria-label={copy.feedbackScrollPrev}
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

          <div
            ref={feedbackStripRef}
            className="min-w-0 flex-1 overflow-x-auto scroll-smooth py-6 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] overscroll-x-contain snap-x snap-mandatory sm:py-8 [&::-webkit-scrollbar]:hidden"
          >
            {/*
              Padding dọc trên khối overflow-x + lớp trong: chừa chỗ cho box-shadow hover (tránh bị clip).
            */}
            <div className="flex items-stretch gap-5 px-3 py-4 sm:px-4 sm:py-6">
            {copy.testimonials.map((item) => (
              <figure
                key={item.name}
                className={`hover-lift-strong relative z-0 flex w-[min(17.5rem,100%)] shrink-0 snap-start flex-col rounded-[1.5rem] p-4 sm:w-[22rem] sm:rounded-[2rem] sm:p-7 ${
                  isDark
                    ? "border border-white/10 bg-white/[0.05]"
                    : "home-lux-panel--compact rounded-[2rem] border-0 bg-white/85 ring-1 ring-[color-mix(in_srgb,var(--luxury-gold)_28%,transparent)] backdrop-blur-sm"
                }`}
              >
                <span className="font-display text-3xl leading-none text-[color-mix(in_srgb,var(--luxury-gold)_40%,var(--color-rose))] sm:text-4xl" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote
                  className={`mt-2 flex-1 text-sm leading-6 [overflow-wrap:normal] [word-break:normal] sm:text-base sm:leading-7 ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {item.quote}
                </blockquote>
                <figcaption className={`mt-4 min-w-0 border-t pt-4 sm:mt-6 sm:pt-5 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                  <p className="font-display text-lg break-words sm:text-xl">{item.name}</p>
                  <div
                    className={`mt-2 max-w-full overflow-x-auto overflow-y-hidden pb-0.5 [-webkit-overflow-scrolling:touch] ${isDark ? "text-white/50" : "text-[var(--color-ink)]/72"}`}
                  >
                    <p className="w-max min-w-full whitespace-nowrap text-xs uppercase tracking-[0.2em]">
                      {item.detail}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
            </div>
          </div>

          <button
            type="button"
            className={`${feedbackNavBtnClass} shrink-0 self-center`}
            onClick={() => scrollFeedbackStrip("right")}
            aria-label={copy.feedbackScrollNext}
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
        </div>
      </section>

      <section
        id="contact"
        className={`animate-fade-scale-soft-delay-2 ${homeOuter} pb-[max(7rem,calc(env(safe-area-inset-bottom)+5.5rem))] pt-6 sm:pb-24 sm:pt-10`}
      >
        <div
          className={`animate-pulse-glow-soft hover-lift-strong min-w-0 rounded-[1.35rem] p-5 sm:rounded-[2rem] sm:p-8 lg:rounded-[2.5rem] lg:p-12 ${
            isDark
              ? "border border-white/12 bg-white/[0.07] shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
              : "home-lux-panel--jewel border-0"
          }`}
        >
          <div className="px-0.5 text-center sm:px-0">
            <WeddingFlourish className="mb-3 sm:mb-4" luxury={!isDark} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[color-mix(in_srgb,var(--luxury-gold)_28%,var(--color-sage))] sm:text-sm sm:tracking-[0.38em]">
              {copy.contactEyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl leading-[1.15] tracking-[-0.02em] sm:mt-4 sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl">
              {copy.contactTitle}
            </h2>
            <p
              className={`mx-auto mt-3 max-w-2xl text-xs leading-relaxed sm:mt-4 sm:text-sm sm:leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/86"}`}
            >
              {copy.contactBody}
            </p>
          </div>

          <HomeContactReportForm fieldClassName={contactFieldClass} />
        </div>
      </section>
    </main>
  );
}
