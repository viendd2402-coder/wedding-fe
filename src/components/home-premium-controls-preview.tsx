"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";

export default function HomePremiumControlsPreview() {
  const { language, theme, setLanguage, setTheme } = useGlobalPreferences();

  const isDark = theme === "dark";
  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            eyebrow: "Premium Preview Controls",
            body:
              "Ngay trên website, khách có thể đổi ngôn ngữ Việt/Anh và chuyển nhanh giao diện sáng/tối để xem mẫu premium theo đúng mood mong muốn.",
            heroLabel: "Mẫu website cưới",
            heroTitle: "Hiện Đại",
            heroTitleAccent: "Tinh Tế",
            heroBody:
              "Từ các mẫu free gọn nhẹ đến những concept premium kiểu editorial, dark luxury và destination wedding.",
            languageLabel: "Ngôn ngữ",
            themeLabel: "Giao diện",
            lightLabel: "Trắng",
            darkLabel: "Đen",
            previewLabel: "Xem demo premium",
            premiumTag: "Mẫu trả phí",
          }
        : {
            eyebrow: "Premium Preview Controls",
            body:
              "Right on the website, guests can switch between Vietnamese and English and instantly preview light or dark styling for premium concepts.",
            heroLabel: "Wedding website",
            heroTitle: "Modern",
            heroTitleAccent: "Refined",
            heroBody:
              "From lightweight free templates to premium concepts like editorial, dark luxury, and destination wedding.",
            languageLabel: "Language",
            themeLabel: "Theme",
            lightLabel: "Light",
            darkLabel: "Dark",
            previewLabel: "View premium demo",
            premiumTag: "Premium template",
          },
    [language],
  );

  const panelClass = isDark
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
    : "border-white/70 bg-white/68 text-[var(--color-ink)] shadow-[0_18px_50px_rgba(49,42,40,0.08)]";
  const pillGroupClass = isDark
    ? "border-white/10 bg-white/6 text-white/70"
    : "border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-ink)]/56";
  const heroShellClass = isDark
    ? "border-white/14 bg-[#111113]"
    : "border-white/80 bg-white/65";
  const previewStageClass = isDark
    ? "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_34%),linear-gradient(180deg,#050505,#111214)]"
    : "bg-transparent";
  const leftGlowClass = isDark
    ? "border-white/10 bg-[rgba(255,255,255,0.04)]"
    : "border-white/80 bg-transparent";
  const rightGlowClass = isDark
    ? "bg-[rgba(255,255,255,0.08)]"
    : "bg-[rgba(197,167,161,0.18)]";
  const heroBackgroundClass = isDark
    ? "bg-[linear-gradient(180deg,_rgba(20,20,22,0.4),_rgba(255,255,255,0.04)),url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80')]"
    : "bg-[linear-gradient(180deg,_rgba(233,221,209,0.4),_rgba(125,140,121,0.22)),url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80')]";
  const heroOverlayClass = isDark
    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.65))]"
    : "bg-[linear-gradient(180deg,rgba(49,42,40,0.03),rgba(49,42,40,0.35))]";
  const chipClass = isDark
    ? "border-white/18 bg-white/8 text-white/82"
    : "border-white/24 bg-white/12 text-white/82";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div className={`max-w-xl rounded-[2rem] border p-5 backdrop-blur ${panelClass}`}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-rose)]">
              {copy.eyebrow}
            </p>
            <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/72" : "text-[var(--color-ink)]/72"}`}>
              {copy.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className={`inline-flex items-center gap-1 rounded-full border p-1 text-xs font-medium ${pillGroupClass}`}>
              <span className="px-2 uppercase tracking-[0.2em]">
                {copy.languageLabel}
              </span>
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "vi"
                    ? isDark
                      ? "bg-white text-[#111113]"
                      : "bg-[var(--color-ink)] text-white"
                    : isDark
                      ? "text-white/76 hover:bg-white/8"
                      : ""
                }`}
              >
                VI
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === "en"
                    ? isDark
                      ? "bg-white text-[#111113]"
                      : "bg-[var(--color-ink)] text-white"
                    : isDark
                      ? "text-white/76 hover:bg-white/8"
                      : ""
                }`}
              >
                EN
              </button>
            </div>
            <div className={`inline-flex items-center gap-1 rounded-full border p-1 text-xs font-medium ${pillGroupClass}`}>
              <span className="px-2 uppercase tracking-[0.2em]">
                {copy.themeLabel}
              </span>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`rounded-full px-3 py-1.5 transition ${
                  theme === "light"
                    ? isDark
                      ? "bg-white text-[#111113]"
                      : "bg-[var(--color-ink)] text-white"
                    : isDark
                      ? "text-white/76 hover:bg-white/8"
                      : ""
                }`}
              >
                {copy.lightLabel}
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`rounded-full px-3 py-1.5 transition ${
                  theme === "dark"
                    ? isDark
                      ? "bg-white text-[#111113]"
                      : "bg-[var(--color-ink)] text-white"
                    : isDark
                      ? "text-white/76 hover:bg-white/8"
                      : ""
                }`}
              >
                {copy.darkLabel}
              </button>
            </div>
          </div>
          <Link
            href="/templates/editorial-bloom"
            className="btn-secondary inline-flex w-fit rounded-full px-6 py-3 text-sm font-medium"
          >
            {copy.previewLabel}
          </Link>
        </div>
      </div>

      <div className={`relative mx-auto w-full max-w-xl rounded-[2.4rem] p-3 transition ${previewStageClass}`}>
        <div className={`absolute -left-8 top-12 hidden h-32 w-32 rounded-full border lg:block ${leftGlowClass}`} />
        <div className={`absolute -right-8 bottom-12 hidden h-40 w-40 rounded-full blur-2xl lg:block ${rightGlowClass}`} />
        <div className={`rounded-[2rem] border p-4 backdrop-blur transition ${heroShellClass}`}>
          <div className={`relative overflow-hidden rounded-[1.7rem] bg-cover bg-center transition ${heroBackgroundClass}`}>
            <div className={`min-h-[520px] p-8 sm:p-10 ${heroOverlayClass}`}>
              <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/80">
                <span>Demo nổi bật</span>
                <span>{copy.premiumTag}</span>
              </div>
              <div className="mt-64 rounded-[1.6rem] border border-white/30 bg-white/16 p-6 text-white backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                  {copy.heroLabel}
                </p>
                <p className="mt-4 font-display text-5xl sm:text-6xl">
                  {copy.heroTitle}
                  <span className="px-3 text-white/70">&</span>
                  {copy.heroTitleAccent}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/85">
                  {copy.heroBody}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.2em] ${chipClass}`}>
                    {language === "vi" ? "VI" : "EN"}
                  </span>
                  <span className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.2em] ${chipClass}`}>
                    {copy.themeLabel} {theme === "light" ? copy.lightLabel : copy.darkLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
