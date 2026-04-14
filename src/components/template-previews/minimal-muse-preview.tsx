"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { minimalMusePreviewMessages } from "@/i18n/messages/template-previews/minimal-muse";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  MinimalMuseFallingHearts,
  MinimalMuseHeader,
  MinimalMuseMusicPlayer,
  minimalMuseEvents,
  minimalMuseGallery,
  minimalMuseTimeline,
  type TemplatePreviewProps,
} from "@/templates/free/minimal-muse/support";
import scroll from "./minimal-muse-preview.module.css";

const ioOpts: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -18% 0px",
  threshold: 0.12,
};

type RevealAxis = "up" | "left" | "right";

function mediaPendingClass(axis: RevealAxis): string {
  if (axis === "left") return scroll.scrollMediaPendingLeft;
  if (axis === "right") return scroll.scrollMediaPendingRight;
  return scroll.scrollMediaPending;
}

function titlePendingClass(axis: RevealAxis): string {
  if (axis === "left") return scroll.scrollTitlePendingLeft;
  if (axis === "right") return scroll.scrollTitlePendingRight;
  return scroll.scrollTitlePending;
}

function ScrollRevealDiv({
  variant = "media",
  className = "",
  children,
  revealAxis = "up",
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  variant?: "media" | "title";
  revealAxis?: RevealAxis;
}) {
  const ref = useRef<ElementRef<"div">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const p = variant === "title" ? titlePendingClass(revealAxis) : mediaPendingClass(revealAxis);
  const d = variant === "title" ? scroll.scrollTitleShown : scroll.scrollMediaShown;
  return (
    <div ref={ref} {...rest} className={`${className} ${shown ? d : p}`.trim()}>
      {children}
    </div>
  );
}

function ScrollRevealButton(
  props: ComponentPropsWithoutRef<"button"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"button">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pending = mediaPendingClass(revealAxis);
  return (
    <button
      ref={ref}
      {...rest}
      className={`${className} ${shown ? scroll.scrollMediaShown : pending}`.trim()}
    >
      {children}
    </button>
  );
}

export default function MinimalMusePreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const galleryImages = images.galleryImages.length ? images.galleryImages : minimalMuseGallery;
  const copy = minimalMusePreviewMessages[language];

  return (
    <>
      <section
        className={`relative isolate overflow-hidden ${
          isDark
            ? "bg-[linear-gradient(180deg,#0d0d0f,#151618)] text-white"
            : "bg-[linear-gradient(180deg,#fffdf9,#f4efe7)]"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_top,_rgba(155,168,150,0.1),_transparent_28%)]"
              : "bg-[radial-gradient(circle_at_top,_rgba(125,140,121,0.16),_transparent_34%)]"
          }`}
        />
        <MinimalMuseFallingHearts color="rgba(197, 122, 145, 0.9)" />
        <MinimalMuseHeader tier={template.tier} hideBackToHome={isPublicInviteSnapshot} />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <ScrollRevealDiv revealAxis="left" className={scroll.block}>
            <div className="max-w-2xl">
              <h1 className="break-words font-display text-4xl leading-[1.06] sm:text-6xl lg:text-8xl">
                {preview.groom}
                <br />
                <span className="text-[var(--color-sage)]/78">&</span> {preview.bride}
              </h1>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className={`rounded-full px-5 py-3 text-sm shadow-[0_12px_30px_rgba(49,42,40,0.06)] ${
                  isDark ? "border border-white/10 bg-white/8 text-white/70" : "bg-white text-[var(--color-ink)]/70"
                }`}>
                  {preview.dateLabel}
                </div>
                <div className={`rounded-full px-5 py-3 text-sm shadow-[0_12px_30px_rgba(49,42,40,0.06)] ${
                  isDark ? "border border-white/10 bg-white/8 text-white/70" : "bg-white text-[var(--color-ink)]/70"
                }`}>
                  {preview.location}
                </div>
              </div>
              <div className="mt-6">
                <MinimalMuseMusicPlayer
                  label="Wedding march"
                  accentClassName="bg-[var(--color-sage)]"
                />
              </div>
            </div>
            </ScrollRevealDiv>
            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className="grid gap-5">
              <button
                type="button"
                onClick={() =>
                  onPreviewImage({
                    src: images.coverImage || template.image,
                    alt: `Cover ${template.name}`,
                  })
                }
                className={`block cursor-pointer rounded-[2.2rem] p-4 text-left ${
                  isDark
                    ? "border border-white/10 bg-white/6 shadow-[0_24px_70px_rgba(0,0,0,0.26)]"
                    : "border border-white/80 bg-white/72 shadow-[0_24px_70px_rgba(49,42,40,0.08)]"
                }`}
              >
                <div
                  className="min-h-[min(380px,72svh)] rounded-[1.8rem] bg-cover bg-center p-4 sm:min-h-[520px] sm:p-6"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(49,42,40,0.22)), url(${images.coverImage || template.image})`,
                  }}
                >
                  <div className="flex h-full items-end">
                    <div className={`rounded-[1.6rem] p-6 shadow-[0_18px_40px_rgba(49,42,40,0.08)] ${
                      isDark ? "bg-[#111214]/88 text-white" : "bg-white/88 text-[var(--color-ink)]"
                    }`}>
                      <p className="break-words font-display text-3xl leading-tight sm:text-4xl sm:leading-none lg:text-5xl">
                        {preview.groom} & {preview.bride}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className={`rounded-[1.8rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] ${
                  isDark ? "border border-white/10 bg-white/6" : "bg-white"
                }`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Save the date</p>
                  <p className="mt-3 font-display text-4xl">20.10.2026</p>
                </div>
                <div className={`rounded-[1.8rem] p-6 ${isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "bg-[var(--color-cream)]"}`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Countdown</p>
                  <div className="mt-4">
                    <WeddingCountdown targetDate={preview.countdownTarget} variant="minimal" />
                  </div>
                </div>
              </div>
            </div>
            </ScrollRevealDiv>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <ScrollRevealDiv revealAxis="left" className={scroll.block}>
          <div className={`rounded-[2.2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8 ${
            isDark ? "border border-white/10 bg-white/6" : "bg-white"
          }`}>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Thiệp mời</p>
            <div className={`mt-8 rounded-[1.8rem] p-8 text-center ${
              isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "border border-[var(--color-ink)]/8 bg-[var(--color-cream)]"
            }`}>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-sage)]">Trân trọng kính mời</p>
              <p className="mt-5 break-words font-display text-3xl leading-tight sm:text-5xl sm:leading-none">
                {preview.groom}
                <span className="inline-block px-1.5 text-[var(--color-rose)]/80 sm:px-3">&</span>
                {preview.bride}
              </p>
            </div>
          </div>
          </ScrollRevealDiv>
          <div className="grid gap-4">
            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className={`rounded-[2.2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] sm:p-8 ${
              isDark ? "border border-white/10 bg-white/6" : "bg-white/84"
            }`}>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{copy.featureEyebrow}</p>
              <h2 className="mt-4 font-display text-4xl leading-tight">{copy.featureTitle}</h2>
              <div className="mt-6 grid gap-3">
                {copy.featureItems.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-[1.6rem] p-4 ${
                      isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "bg-[var(--color-cream)]"
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-sage)]/76">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/78" : "text-[var(--color-ink)]/78"}`}>{item}</p>
                  </div>
                ))}
              </div>
              <p className={`mt-6 text-sm leading-7 ${isDark ? "text-white/66" : "text-[var(--color-ink)]/66"}`}>{copy.valueNote}</p>
            </div>
            </ScrollRevealDiv>
            <div className="grid gap-4 sm:grid-cols-3">
              {minimalMuseTimeline.map((item, ti) => (
                <ScrollRevealDiv
                  key={item.year}
                  revealAxis={ti % 2 === 0 ? "left" : "right"}
                  className={scroll.block}
                >
                <article className={`rounded-[1.8rem] p-5 shadow-[0_16px_40px_rgba(49,42,40,0.05)] ${
                  isDark ? "border border-white/10 bg-white/6" : "bg-white/84"
                }`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{item.year}</p>
                  <p className="mt-3 font-display text-3xl">{item.title}</p>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/72"}`}>{item.description}</p>
                </article>
                </ScrollRevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <ScrollRevealButton
              key={image}
              revealAxis={index % 2 === 0 ? "left" : "right"}
              type="button"
              onClick={() => onPreviewImage({ src: image, alt: `Gallery ${index + 1} ${template.name}` })}
              className={`overflow-hidden rounded-[1.8rem] ${index === 0 ? "md:col-span-2 md:row-span-2 md:h-[420px]" : "md:h-[200px]"} h-72 cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.06), rgba(49,42,40,0.22)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.96fr]">
          <ScrollRevealDiv revealAxis="left" className={scroll.block}>
          <div
            className={`rounded-[2.1rem] px-6 py-8 text-white sm:p-8 ${
              isDark
                ? "border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(155,168,150,0.08),_transparent_28%),linear-gradient(180deg,#121315,#1a1b1d)] shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
                : "bg-[var(--color-ink)]"
            }`}
          >
            <p className={`text-sm uppercase tracking-[0.35em] ${isDark ? "text-[var(--color-rose)]/82" : "text-white/58"}`}>Lịch sự kiện</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Timeline trong ngày cưới</h2>
            <p className={`mt-4 max-w-xl text-sm leading-7 ${isDark ? "text-white/66" : "text-white/70"}`}>
              Mỗi mốc được tách rõ để khách chỉ cần lướt một lần là nắm được thời gian, địa điểm và nhịp di chuyển trong ngày.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {minimalMuseEvents.map((event) => (
                <article
                  key={event.label}
                  className={`rounded-[1.6rem] p-5 ${
                    isDark
                      ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
                      : "border border-white/10 bg-white/6"
                  }`}
                >
                  <p className={`text-xs uppercase tracking-[0.25em] ${isDark ? "text-[var(--color-sand)]/84" : "text-white/58"}`}>{event.label}</p>
                  <p className="mt-4 font-display text-4xl">
                    {event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}
                  </p>
                  <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/82" : "text-white/76"}`}>
                    {event.place === "Riverside Garden" ? preview.venue : event.place}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/56" : "text-white/52"}`}>{event.address}</p>
                </article>
              ))}
            </div>
          </div>
          </ScrollRevealDiv>

          <ScrollRevealDiv revealAxis="right" className={scroll.block}>
          <div id="rsvp" className={`rounded-[2.1rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8 ${
            isDark ? "border border-white/10 bg-white/6" : "bg-white"
          }`}>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{copy.basicRsvp}</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.basicRsvp}</h2>
            <form className="mt-8 grid gap-4">
              <input className={`rounded-2xl px-5 py-4 outline-none ${isDark ? "border border-white/10 bg-white/6 placeholder:text-white/35" : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)] placeholder:text-[var(--color-ink)]/35"}`} placeholder="Họ và tên" />
              <input className={`rounded-2xl px-5 py-4 outline-none ${isDark ? "border border-white/10 bg-white/6 placeholder:text-white/35" : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)] placeholder:text-[var(--color-ink)]/35"}`} placeholder="Số điện thoại" />
              <select className={`rounded-2xl px-5 py-4 outline-none ${isDark ? "border border-white/10 bg-white/6" : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"}`}>
                <option>{copy.basicAttend}</option>
                <option>{copy.basicDecline}</option>
              </select>
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                {copy.submit}
              </button>
            </form>
            <div className={`mt-6 rounded-[1.6rem] p-5 ${isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "bg-[var(--color-cream)]"}`}>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{copy.gift}</p>
              <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/72"}`}>
                {preview.bankName}
                <br />
                {preview.accountName}
                <br />
                {preview.accountNumber}
              </p>
            </div>
          </div>
          </ScrollRevealDiv>
        </div>
      </section>

    </>
  );
}
