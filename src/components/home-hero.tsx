"use client";

import Image from "next/image";
import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import {
  getTemplateCardImage,
  getTemplateDisplayName,
  getTemplateHref,
  getTemplateNumber,
  getTemplateScrollPreview,
  weddingTemplates,
  type WeddingTemplate,
} from "@/lib/templates";

/** Vị trí từng điện thoại trong dãy hình quạt (giữa nổi bật nhất). */
const FAN_LAYOUT = [
  { rotate: -12, y: 64, scale: 0.8, z: 10, hideOnMobile: true },
  { rotate: -6, y: 24, scale: 0.9, z: 20, hideOnMobile: false },
  { rotate: 0, y: 0, scale: 1, z: 30, hideOnMobile: false },
  { rotate: 6, y: 24, scale: 0.9, z: 20, hideOnMobile: false },
  { rotate: 12, y: 64, scale: 0.8, z: 10, hideOnMobile: true },
] as const;

/** Lấy tối đa 5 mẫu có ảnh khác nhau, ưu tiên mẫu trả phí đặt ở giữa. */
function pickShowcaseTemplates(): WeddingTemplate[] {
  const seen = new Set<string>();
  const unique = weddingTemplates.filter((t) => {
    const img = getTemplateCardImage(t);
    if (!img || seen.has(img)) return false;
    seen.add(img);
    return true;
  });
  const picked = unique.slice(0, FAN_LAYOUT.length);
  // Đưa mẫu đầu tiên (thường là premium nổi bật) vào vị trí giữa.
  if (picked.length >= 3) {
    const [first, ...rest] = picked;
    const mid = Math.floor(picked.length / 2);
    rest.splice(mid, 0, first);
    return rest;
  }
  return picked;
}

const showcase = pickShowcaseTemplates();

export default function HomeHero() {
  const { home: copy } = useMessages();
  const { language } = useGlobalPreferences();

  const stats = [
    { label: copy.statTemplates, value: `${weddingTemplates.length}+` },
    { label: copy.statDelivery, value: copy.statDeliveryValue },
    { label: copy.statMobile, value: "100%" },
  ];

  const layoutOffset = Math.floor((FAN_LAYOUT.length - showcase.length) / 2);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Ánh champagne phía trên + vòng tròn mảnh sau dãy điện thoại */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_srgb,var(--color-gold)_16%,transparent),transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[88rem] px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-10 lg:pt-24">
        <span className="lux-chip lux-chip--gold animate-fade-up-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {copy.heroEyebrow}
        </span>

        <h1 className="lux-title animate-fade-up-soft-delay-1 mx-auto mt-7 max-w-4xl text-balance text-[2.25rem] leading-[1.08] sm:text-[3.4rem] lg:text-[4.4rem]">
          {copy.heroTitle}
        </h1>

        <p className="lux-muted animate-fade-up-soft-delay-2 mx-auto mt-7 max-w-2xl text-base leading-[1.8] sm:text-[1.075rem]">
          {copy.heroBody}
        </p>

        <div className="animate-fade-up-soft-delay-3 mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href="#templates"
            className="btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
          >
            {copy.heroPrimaryCta}
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium"
          >
            {copy.heroSecondaryCta}
          </a>
        </div>

        <dl className="animate-fade-up-soft-delay-3 mx-auto mt-10 flex max-w-xl items-center justify-center divide-x divide-[var(--color-line-strong)]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1 px-3 sm:px-6">
              <dd className="font-display text-2xl font-medium leading-none sm:text-3xl">{stat.value}</dd>
              <dt className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)] sm:text-[0.68rem]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Dãy điện thoại hình quạt — mỗi máy là link tới demo mẫu */}
      <div className="animate-fade-scale-soft relative mx-auto mt-16 h-[21rem] max-w-6xl overflow-hidden px-4 pt-4 sm:mt-20 sm:h-[25rem] lg:h-[28rem]">
        <div
          className="pointer-events-none absolute left-1/2 top-[18%] -z-10 aspect-square w-[min(56rem,120vw)] -translate-x-1/2 rounded-full border border-[color-mix(in_srgb,var(--color-gold)_30%,transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[30%] -z-10 aspect-square w-[min(40rem,90vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_14%,transparent),transparent_65%)]"
          aria-hidden="true"
        />

        <div className="flex items-start justify-center">
          {showcase.map((template, i) => {
            const pos = FAN_LAYOUT[i + layoutOffset];
            const name = getTemplateDisplayName(template, language);
            const scrollPreview = getTemplateScrollPreview(template);
            return (
              <Link
                key={template.slug}
                href={getTemplateHref(template)}
                aria-label={name}
                className={`group relative -mx-5 w-[min(13.5rem,36vw)] shrink-0 sm:-mx-6 lg:w-[14.5rem] ${
                  pos.hideOnMobile ? "hidden md:block" : ""
                }`}
                style={{
                  zIndex: pos.z,
                  transform: `translateY(${pos.y}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                  transformOrigin: "50% 100%",
                }}
              >
                <div className="relative aspect-[9/19] overflow-hidden rounded-[2.2rem] border-[6px] border-[#151311] bg-[#151311] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3">
                  {scrollPreview ? (
                    // unoptimized: ảnh rất dài — rê chuột vào máy mới cuộn (object-position 0% → 100%)
                    <Image
                      src={scrollPreview}
                      alt=""
                      fill
                      unoptimized
                      priority={pos.z === 30}
                      className="animate-lux-phone-scroll object-cover object-top"
                    />
                  ) : (
                    <Image
                      src={getTemplateCardImage(template)}
                      alt=""
                      fill
                      priority={pos.z === 30}
                      sizes="(max-width: 768px) 36vw, 232px"
                      className="object-cover object-center"
                      quality={85}
                    />
                  )}
                  <span className="absolute left-1/2 top-2 h-[1.1rem] w-[34%] -translate-x-1/2 rounded-full bg-[#151311]" aria-hidden="true" />
                  <span className="absolute right-3 top-9 rounded-full bg-black/45 px-2.5 py-1 font-display text-sm italic text-white backdrop-blur-sm">
                    Nº {getTemplateNumber(template)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mờ dần phía dưới để dãy máy "chìm" vào trang */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-44 bg-gradient-to-t from-[var(--background)] via-[color-mix(in_srgb,var(--background)_70%,transparent)] to-transparent"
          aria-hidden="true"
        />
      </div>

      <p className="relative mx-auto -mt-6 max-w-xl text-balance px-4 pb-20 text-center font-display text-xl italic leading-snug text-[var(--color-gold)] sm:pb-24 sm:text-2xl">
        {copy.heroTagline}
      </p>
    </section>
  );
}
