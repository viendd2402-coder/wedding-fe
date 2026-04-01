"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  TemplateHeader,
  templateGallery,
  templateTimeline,
  type TemplatePreviewProps,
} from "@/components/template-preview-shared";

export default function CityChicPreview({
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
      <section className={`relative isolate overflow-hidden ${isDark ? "bg-[linear-gradient(180deg,#0d0d0f,#171719)] text-white" : "bg-[linear-gradient(180deg,#f6f6f4,#ece9e3)]"}`}>
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 sm:px-10 lg:px-16 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[2.4rem] bg-[var(--color-ink)] p-8 text-white sm:p-10">
              <p className="text-sm uppercase tracking-[0.35em] text-white/58">{template.style}</p>
              <h1 className="mt-8 font-display text-6xl leading-none sm:text-8xl">
                City
                <br />
                Chic
              </h1>
              <p className="mt-6 text-base leading-8 text-white/76">{template.heroTitle}</p>
              <div className="mt-10 space-y-3">
                <div className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/76">{preview.dateLabel}</div>
                <div className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/76">{preview.location}</div>
              </div>
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
                  className="min-h-[460px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[560px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.04), rgba(49,42,40,0.4)), url(${images.coverImage || template.image})`,
                  }}
                >
                  <div className="flex h-full items-end justify-between">
                    <div className={`rounded-[1.6rem] p-5 ${isDark ? "bg-[#111214]/90 text-white" : "bg-white/90 text-[var(--color-ink)]"}`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{template.previewLabel}</p>
                      <p className="mt-3 font-display text-4xl">
                        {preview.groom}
                        <span className="px-3 text-[var(--color-rose)]/72">&</span>
                        {preview.bride}
                      </p>
                    </div>
                    <div className="text-right text-xs uppercase tracking-[0.25em] text-white/76">
                      <p>{template.badge}</p>
                      <p className="mt-2">{template.mood}</p>
                    </div>
                  </div>
                </div>
              </button>
              <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                <div className={`rounded-[2rem] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.05)] ${
                  isDark ? "border border-white/10 bg-white/6" : "bg-white"
                }`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Story highlight</p>
                  <div className="mt-5 space-y-4">
                    {templateTimeline.map((item) => (
                      <div key={item.year} className="border-b border-[var(--color-ink)]/8 pb-4 last:border-b-0 last:pb-0">
                        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{item.year}</p>
                        <p className="mt-2 font-display text-3xl">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`rounded-[2rem] p-6 text-white ${isDark ? "bg-[linear-gradient(180deg,#141416,#1d1d20)]" : "bg-[var(--color-ink)]"}`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/56">Countdown</p>
                  <div className="mt-5">
                    <WeddingCountdown targetDate={preview.countdownTarget} variant="editorial" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onPreviewImage({ src: image, alt: `Gallery ${index + 1} ${template.name}` })}
              className={`overflow-hidden rounded-[2rem] ${index === 0 ? "md:col-span-2 md:h-[380px]" : "md:h-[380px]"} h-72 cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.3)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
