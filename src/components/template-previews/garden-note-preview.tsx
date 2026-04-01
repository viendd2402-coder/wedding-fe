"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  TemplateHeader,
  templateGallery,
  type TemplatePreviewProps,
} from "@/components/template-preview-shared";

export default function GardenNotePreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const galleryImages = images.galleryImages.length ? images.galleryImages : templateGallery;

  return (
    <>
      <section className={`relative isolate overflow-hidden ${isDark ? "bg-[linear-gradient(180deg,#0d0f0d,#161916)] text-white" : "bg-[linear-gradient(180deg,#fffaf6,#f5f1e8)]"}`}>
        <div className={`absolute inset-0 ${isDark ? "bg-[radial-gradient(circle_at_top_left,_rgba(151,165,143,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(197,167,161,0.08),_transparent_28%)]" : "bg-[radial-gradient(circle_at_top_left,_rgba(151,165,143,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(197,167,161,0.16),_transparent_34%)]"}`} />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className={`rounded-[2.5rem] p-5 shadow-[0_20px_60px_rgba(49,42,40,0.08)] backdrop-blur ${
              isDark ? "border border-white/10 bg-white/6" : "border border-white/70 bg-white/64"
            }`}>
              <button
                type="button"
                onClick={() => onPreviewImage({ src: images.coverImage || template.image, alt: `Cover ${template.name}` })}
                className="block w-full cursor-pointer rounded-[2rem] text-left"
              >
                <div
                  className="min-h-[420px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[580px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(49,42,40,0.24)), url(${images.coverImage || template.image})`,
                  }}
                >
                  <div className="flex h-full items-end">
                    <div className="rounded-[1.8rem] border border-white/22 bg-white/20 p-6 text-white backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/72">{template.previewLabel}</p>
                      <p className="mt-4 font-display text-5xl leading-none">
                        {preview.groom}
                        <span className="px-3 text-white/72">&</span>
                        {preview.bride}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{template.style}</p>
              <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">{template.name}</h1>
              <p className={`mt-6 text-lg leading-8 ${isDark ? "text-white/74" : "text-[var(--color-ink)]/74"}`}>{template.heroTitle}</p>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/62" : "text-[var(--color-ink)]/62"}`}>{template.heroSubtitle}</p>
              <div className={`mt-8 rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] ${
                isDark ? "border border-white/10 bg-white/6" : "bg-white/80"
              }`}>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Calendar & countdown</p>
                <div className="mt-5">
                  <WeddingCountdown targetDate={preview.countdownTarget} variant="romance" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div className={`rounded-[2.2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] sm:p-8 ${
            isDark ? "border border-white/10 bg-white/6" : "bg-white/82"
          }`}>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Garden invitation</p>
            <div className="mt-8 grid gap-4">
              <div className={`rounded-[1.8rem] p-6 text-center ${isDark ? "border border-white/10 bg-[rgba(255,255,255,0.04)]" : "bg-[var(--color-cream)]"}`}>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Save the date</p>
                <p className="mt-4 font-display text-4xl">{preview.dateLabel}</p>
                <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/68"}`}>{preview.venue}</p>
              </div>
              <div className={`rounded-[1.8rem] p-6 shadow-[0_12px_30px_rgba(49,42,40,0.05)] ${
                isDark ? "border border-white/10 bg-white/6" : "bg-white"
              }`}>
                <p className={`text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/72"}`}>{template.sectionProfile}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => onPreviewImage({ src: image, alt: `Gallery ${index + 1} ${template.name}` })}
                className={`overflow-hidden rounded-[2rem] ${index === 1 ? "sm:mt-14" : ""} h-72 cursor-pointer`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.06), rgba(49,42,40,0.18)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
