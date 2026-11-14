"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useMessages } from "@/i18n/use-messages";
import { HomeContactReportForm } from "@/components/home-contact-report-form";
import HomeHero from "@/components/home-hero";
import HomeHeroSpotlight from "@/components/home-hero-spotlight";
import TemplateGallery from "@/components/template-gallery";
import {
  freeTemplates,
  premiumTemplates,
} from "@/lib/templates";

/** Số dòng bảng so sánh hiển thị trước khi bấm "Xem thêm". */
const FEATURE_TABLE_PREVIEW_COUNT = 6;


type WhyUsIconId = "envelope" | "users" | "list" | "globe" | "pricing" | "heart";

function WhyUsGlyph({ id }: { id: WhyUsIconId }) {
  const c = "h-5 w-5";
  switch (id) {
    case "envelope":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 5.5L20 7" />
        </svg>
      );
    case "users":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "list":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "globe":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
      );
    case "pricing":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "heart":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[1.1rem] w-[1.1rem]"
      aria-hidden="true"
    >
      {direction === "left" ? <path d="M19 12H5M11 6l-6 6 6 6" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Tiêu đề section dùng chung — eyebrow + display title + mô tả. */
function SectionHeading({
  eyebrow,
  title,
  body,
  align = "start",
  id,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "start" | "center";
  id?: string;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={`lux-eyebrow ${centered ? "lux-eyebrow--center" : ""}`}>{eyebrow}</p>
      <h2 id={id} className="lux-title mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3.1rem]">
        {title}
      </h2>
      {body ? (
        <p className={`lux-muted mt-5 text-[0.95rem] leading-relaxed sm:text-[1.05rem] ${centered ? "mx-auto max-w-2xl" : ""}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const { home: copy } = useMessages();

  /** Cùng max-width & padding ngang cho mọi section */
  const homeOuter = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

  const contactFieldClass =
    "w-full min-w-0 rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-3.5 text-base leading-normal text-[var(--color-ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-gold)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-gold)_16%,transparent)] sm:px-5";

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
    const step = Math.min(400, Math.max(280, el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const roundNavBtnClass =
    "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] transition hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--background)]";

  const whyUsItems = [...copy.whyUsLeft, ...copy.whyUsRight];


  return (
    <main className="lux-page-bg text-[var(--color-ink)] transition-colors">
      <HomeHero />

      <HomeHeroSpotlight />

      {/* ───────── Templates ───────── */}
      <section id="templates" className={`scroll-mt-20 py-24 sm:py-32 ${homeOuter}`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={copy.templatesEyebrow} title={copy.templatesTitle} />
          <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-3">
            <Link href="/templates/free" className="lux-link text-sm">
              {copy.freeCta}
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/templates/premium" className="lux-link text-sm">
              {copy.premiumCta}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <TemplateGallery freeTemplates={freeTemplates} premiumTemplates={premiumTemplates} />
      </section>

      {/* ───────── Why us ───────── */}
      <section id="why-us" className="lux-band scroll-mt-20 py-24 sm:py-32">
        <div className={`grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 ${homeOuter}`}>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={copy.whyUsEyebrow} title={copy.whyUsTitle} body={copy.whyUsBody} />
            <div className="relative mt-10 aspect-[5/4] w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-[1.5rem] shadow-[var(--shadow-lift)]">
              {/* Unsplash — photo-1519741497674-611481863552 (Unsplash License) */}
              <Image
                src="/marketing/wedding-animation.jpg"
                alt={copy.whyUsImageAlt}
                fill
                className="select-none object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 28rem"
              />
            </div>
          </div>

          <div className="grid content-start gap-px overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
            {whyUsItems.map((item, i) => (
              <article
                key={item.title}
                className="group flex flex-col bg-[var(--color-surface)] p-7 transition-colors duration-500 hover:bg-[var(--color-gold-soft)] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] text-[var(--color-gold)] transition group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-surface)]">
                    <WhyUsGlyph id={item.icon as WhyUsIconId} />
                  </span>
                  <span className="font-display text-lg italic text-[var(--color-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-[1.6rem] font-medium leading-tight">{item.title}</h3>
                <p className="lux-muted mt-3 text-sm leading-[1.75]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Feature comparison ───────── */}
      <section id="features" className={`scroll-mt-20 py-24 sm:py-32 ${homeOuter}`}>
        <SectionHeading eyebrow={copy.featuresEyebrow} title={copy.featuresTitle} align="center" />

        <div className="lux-card mx-auto mt-14 max-w-5xl overflow-hidden rounded-[1.75rem]">
          <div id="features-comparison-table">
            <div className="hidden grid-cols-[1.6fr_1fr_1fr] border-b border-[var(--color-line)] bg-[var(--color-surface-2)] md:grid">
              {copy.featureTableHeaders.map((header, index) => (
                <div
                  key={header}
                  className={`px-6 py-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${
                    index === 2 ? "text-[var(--color-gold)]" : "text-[var(--color-muted)]"
                  }`}
                >
                  {index === 2 ? <span aria-hidden="true">✦ </span> : null}
                  {header}
                </div>
              ))}
            </div>
            {featureRowsForTable.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-2 gap-x-4 gap-y-3 px-5 py-5 md:grid-cols-[1.6fr_1fr_1fr] md:gap-0 md:px-0 md:py-0 ${
                  index < featureRowsForTable.length - 1 ? "border-b border-[var(--color-line)]" : ""
                }`}
              >
                <div className="col-span-2 flex items-baseline gap-4 md:col-span-1 md:px-6 md:py-5">
                  <span className="font-display text-sm italic text-[var(--color-gold)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.95rem] font-medium leading-relaxed">{row.label}</p>
                </div>
                <div className="md:px-6 md:py-5">
                  <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] md:hidden">
                    {copy.featureTableHeaders[1]}
                  </p>
                  <p className="lux-muted text-sm leading-relaxed">{row.free}</p>
                </div>
                <div className="md:bg-[color-mix(in_srgb,var(--color-gold-soft)_55%,transparent)] md:px-6 md:py-5">
                  <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)] md:hidden">
                    {copy.featureTableHeaders[2]}
                  </p>
                  <p className="flex items-start gap-2 text-sm font-medium leading-relaxed">
                    <span className="mt-1 text-[var(--color-gold)]">
                      <CheckIcon />
                    </span>
                    {row.premium}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {featureTableHasMore ? (
            <div className="flex justify-center border-t border-[var(--color-line)] px-4 py-4">
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--color-ink)_6%,transparent)]"
              >
                {featuresTableExpanded ? copy.featuresCollapse : copy.featuresExpand}
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${featuresTableExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* ───────── Process ───────── */}
      <section id="process" className="lux-band scroll-mt-20 py-24 sm:py-32">
        <div className={homeOuter}>
          <SectionHeading eyebrow={copy.processEyebrow} title={copy.processTitle} />
          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {copy.process.map((item) => (
              <li key={item.step} className="relative border-t border-[var(--color-line-strong)] pt-8">
                <span className="absolute -top-px left-0 h-px w-12 bg-[var(--color-gold)]" aria-hidden="true" />
                <p className="font-display text-5xl font-medium italic leading-none text-[var(--color-gold)]">
                  {item.step}
                </p>
                <h3 className="mt-6 font-display text-[1.6rem] font-medium leading-tight">{item.title}</h3>
                <p className="lux-muted mt-3 text-sm leading-[1.75]">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section id="pricing" className={`scroll-mt-20 py-24 sm:py-32 ${homeOuter}`}>
        <SectionHeading eyebrow={copy.pricingEyebrow} title={copy.pricingTitle} body={copy.pricingBody} align="center" />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {copy.pricing.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-[1.75rem] p-8 sm:p-10 ${
                plan.featured ? "lux-inverse shadow-[var(--shadow-lift)]" : "lux-card"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                  {plan.name}
                </p>
                {plan.featured ? <span className="lux-chip lux-chip--gold">✦ {copy.pricingPopularBadge}</span> : null}
              </div>
              {plan.tagline ? (
                <p className="mt-3 text-sm font-medium text-[var(--color-muted)]">{plan.tagline}</p>
              ) : null}
              <p className="mt-8 font-display text-6xl font-medium leading-none tracking-tight text-[var(--color-ink)] sm:text-7xl">
                {plan.price}
              </p>
              <div className="my-8 h-px bg-[var(--color-line)]" />
              <p className="text-sm leading-[1.8] text-[var(--color-muted)]">{plan.note}</p>
              <div className="mt-auto pt-10">
                <a
                  href="#templates"
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium ${
                    plan.featured ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {copy.heroPrimaryCta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#features" onClick={() => setFeaturesTableExpanded(true)} className="lux-link text-sm">
            {copy.pricingCompareCta}
          </a>
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section id="feedback" className="lux-band scroll-mt-20 overflow-hidden py-24 sm:py-32">
        <div className={homeOuter}>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={copy.testimonialsEyebrow} title={copy.testimonialsTitle} body={copy.testimonialsBody} />
            <div className="flex gap-2">
              <button type="button" className={roundNavBtnClass} onClick={() => scrollFeedbackStrip("left")} aria-label={copy.feedbackScrollPrev}>
                <ArrowIcon direction="left" />
              </button>
              <button type="button" className={roundNavBtnClass} onClick={() => scrollFeedbackStrip("right")} aria-label={copy.feedbackScrollNext}>
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>

          <div
            ref={feedbackStripRef}
            className="-mx-4 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 pt-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-2 lg:px-2 [&::-webkit-scrollbar]:hidden"
          >
            {copy.testimonials.map((item) => (
              <figure
                key={item.name}
                className="lux-card lux-card-hover flex w-[85vw] max-w-[24rem] shrink-0 snap-start flex-col rounded-[1.5rem] p-7 sm:p-8"
              >
                <div className="flex gap-0.5 text-[var(--color-gold)]" aria-hidden="true">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-sm">{s}</span>
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-[var(--color-ink)] sm:text-[1.35rem]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-soft)] font-display text-lg italic text-[var(--color-gold)]" aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="lux-muted truncate text-xs">{item.detail}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Contact ───────── */}
      <section
        id="contact"
        className={`scroll-mt-20 pb-[max(7rem,calc(env(safe-area-inset-bottom)+5.5rem))] pt-24 sm:pb-32 sm:pt-32 ${homeOuter}`}
      >
        <div className="lux-card relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-5 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_18%,transparent),transparent_70%)]"
            aria-hidden="true"
          />
          <SectionHeading eyebrow={copy.contactEyebrow} title={copy.contactTitle} body={copy.contactBody} align="center" />
          <HomeContactReportForm fieldClassName={contactFieldClass} />
        </div>
      </section>
    </main>
  );
}
