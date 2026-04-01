"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  TemplateHeader,
  templateEvents,
  templateGallery,
  templateTimeline,
  type TemplatePreviewProps,
} from "@/components/template-preview-shared";

export default function ModernMonogramPreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const initials = `${preview.groom.charAt(0)}${preview.bride.charAt(0)}`.toUpperCase();
  const galleryImages = images.galleryImages.length ? images.galleryImages : templateGallery;

  return (
    <>
      <section className={`relative isolate overflow-hidden ${isDark ? "bg-[linear-gradient(180deg,#0d0d0f,#171719)] text-white" : "bg-[linear-gradient(180deg,#faf7f2,#f0ebe4)]"}`}>
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 sm:px-10 lg:px-16 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={`rounded-[2.4rem] p-8 shadow-[0_18px_50px_rgba(49,42,40,0.08)] sm:p-10 ${
              isDark ? "border border-white/10 bg-white/6" : "border border-[var(--color-ink)]/8 bg-white/78"
            }`}>
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{template.style}</p>
              <div className={`mt-8 flex h-40 w-40 items-center justify-center rounded-full font-display text-7xl ${
                isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
              }`}>
                {initials}
              </div>
              <h1 className="mt-8 font-display text-5xl leading-none sm:text-7xl">{preview.groom} & {preview.bride}</h1>
              <p className={`mt-6 text-base leading-8 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/72"}`}>{template.heroTitle}</p>
            </div>
            <div className="grid gap-5">
              <button
                type="button"
                onClick={() => onPreviewImage({ src: images.coverImage || template.image, alt: `Cover ${template.name}` })}
                className={`block cursor-pointer rounded-[2.4rem] p-4 text-left shadow-[0_24px_70px_rgba(49,42,40,0.08)] ${
                  isDark ? "border border-white/10 bg-white/6" : "bg-white"
                }`}
              >
                <div
                  className="min-h-[440px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[520px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(49,42,40,0.32)), url(${images.coverImage || template.image})`,
                  }}
                >
                  <div className="flex h-full items-end justify-between">
                    <div className={`rounded-[1.6rem] p-5 ${isDark ? "bg-[#111214]/90 text-white" : "bg-white/90 text-[var(--color-ink)]"}`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{template.previewLabel}</p>
                      <p className="mt-3 font-display text-4xl">{preview.dateLabel}</p>
                    </div>
                    <div className="rounded-full border border-white/40 px-5 py-3 text-sm uppercase tracking-[0.25em] text-white backdrop-blur">
                      {initials}
                    </div>
                  </div>
                </div>
              </button>
              <div className="grid gap-5 sm:grid-cols-2">
                {templateEvents.map((event) => (
                  <article key={event.label} className={`rounded-[1.8rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] ${
                    isDark ? "border border-white/10 bg-white/6" : "bg-white"
                  }`}>
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{event.label}</p>
                    <p className="mt-3 font-display text-3xl">{event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}</p>
                    <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/68"}`}>
                      {event.place === "Riverside Garden" ? preview.venue : event.place}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] bg-[var(--color-ink)] px-6 py-8 text-white sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-white/58">Monogram story</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {templateTimeline.map((item) => (
                <article key={item.year} className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/58">{item.year}</p>
                  <p className="mt-3 font-display text-3xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/76">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div className={`rounded-[2.2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] sm:p-8 ${
            isDark ? "border border-white/10 bg-white/6" : "bg-white"
          }`}>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Gallery strip</p>
            <div className="mt-8 grid gap-4">
              {galleryImages.slice(0, 3).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => onPreviewImage({ src: image, alt: `Gallery ${index + 1} ${template.name}` })}
                  className="h-40 cursor-pointer rounded-[1.6rem] bg-cover bg-center"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.22)), url(${image})` }}
                />
              ))}
            </div>
            <div className={`mt-6 rounded-[1.6rem] p-5 ${isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "bg-[var(--color-cream)]"}`}>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Countdown</p>
              <div className="mt-4">
                <WeddingCountdown targetDate={preview.countdownTarget} variant="minimal" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
