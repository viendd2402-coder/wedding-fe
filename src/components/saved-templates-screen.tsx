"use client";

import Image from "next/image";
import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useSavedTemplateSlugs } from "@/hooks/use-saved-template-slugs";
import { useMessages } from "@/i18n/use-messages";
import { removeSavedTemplateSlug } from "@/lib/saved-template-slugs";
import { weddingTemplates } from "@/lib/templates";

function BookmarkGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 4h12a2 2 0 0 1 2 2v15.5l-8-5.5-8 5.5V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export default function SavedTemplatesScreen() {
  const { theme } = useGlobalPreferences();
  const { savedTemplates: copy } = useMessages();
  const slugs = useSavedTemplateSlugs();
  const isDark = theme === "dark";

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";

  const panelOuter = isDark
    ? "border border-white/[0.09] shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_32px_80px_rgba(0,0,0,0.42),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    : "border border-[var(--color-ink)]/[0.06] shadow-[0_4px_0_0_rgba(49,42,40,0.03),0_28px_70px_rgba(49,42,40,0.09),inset_0_1px_0_0_rgba(255,255,255,0.85)]";

  const panelInner = isDark
    ? "bg-[linear-gradient(168deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_42%,rgba(22,22,24,0.96)_78%)] backdrop-blur-xl"
    : "bg-[linear-gradient(168deg,rgba(255,255,255,0.98)_0%,rgba(255,252,248,0.96)_40%,rgba(247,242,236,0.94)_100%)] backdrop-blur-sm";

  const cardRow = isDark
    ? "border border-white/[0.08] bg-white/[0.03] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
    : "border border-[var(--color-ink)]/[0.07] bg-white/[0.97] shadow-[0_8px_30px_rgba(49,42,40,0.05)]";

  const templateBySlug = new Map(weddingTemplates.map((t) => [t.slug, t]));

  return (
    <main
      className={`relative isolate min-h-screen overflow-hidden transition-colors ${
        isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(209,177,171,0.14),transparent),radial-gradient(circle_at_100%_0%,rgba(125,140,121,0.08),transparent_40%),linear-gradient(180deg,#0a0a0b,#111113)]"
            : "bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,rgba(197,167,161,0.45),transparent),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.9),transparent_45%),linear-gradient(180deg,#fffcf8,#f7f2ec)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute -top-24 right-[-18%] h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-[var(--color-rose)]/10" : "bg-white/60"
        }`}
      />

      <div className="relative mx-auto w-full max-w-lg px-5 py-10 sm:max-w-3xl sm:px-8 lg:max-w-[58rem] lg:px-10 xl:max-w-[76rem] xl:px-12 2xl:max-w-[min(calc(100vw-4rem),96rem)] 2xl:px-16 min-[1800px]:max-w-[min(calc(100vw-5rem),112rem)] min-[1800px]:px-20 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10">
          <Link
            href="/"
            className={`inline-flex w-fit items-center gap-2 text-sm font-medium transition hover:opacity-80 ${muted}`}
          >
            <span aria-hidden className="text-base opacity-70">
              ←
            </span>
            {copy.backHome}
          </Link>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.38em] sm:text-[11px] sm:tracking-[0.42em] ${
                  isDark ? "text-[var(--color-sage)]/90" : "text-[var(--color-sage)]"
                }`}
              >
                Lumiere
              </p>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.title}</h1>
            </div>
            <div
              className={`hidden h-14 w-px shrink-0 sm:block ${
                isDark ? "bg-white/12" : "bg-[var(--color-ink)]/12"
              }`}
              aria-hidden
            />
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${
                isDark
                  ? "border-white/12 bg-white/[0.06] text-[var(--color-rose)]/90"
                  : "border-[var(--color-ink)]/12 bg-white text-[var(--color-rose)]"
              }`}
            >
              <BookmarkGlyph className="h-7 w-7" />
            </div>
          </div>
          <p className={`max-w-2xl text-sm leading-relaxed ${muted}`}>{copy.subtitle}</p>
        </div>

        <div className={`overflow-hidden rounded-[2rem] ${panelOuter} ${panelInner}`}>
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{copy.listHeading}</h2>
              <p
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  isDark
                    ? "border-white/12 bg-white/[0.04] text-white/55"
                    : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/60 text-[var(--color-ink)]/55"
                }`}
              >
                {slugs.length} {copy.countSuffix}
              </p>
            </div>

            {slugs.length === 0 ? (
              <div className="py-12 text-center">
                <p
                  className={`font-display text-2xl tracking-tight ${
                    isDark ? "text-white/88" : "text-[var(--color-ink)]"
                  }`}
                >
                  {copy.emptyTitle}
                </p>
                <p className={`mx-auto mt-3 max-w-md text-sm leading-relaxed ${muted}`}>{copy.emptyBody}</p>
                <Link
                  href="/#templates"
                  className="btn-primary mt-8 inline-flex rounded-full px-8 py-3.5 text-sm font-medium"
                >
                  {copy.ctaBrowse}
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col gap-5">
                {slugs.map((slug) => {
                  const meta = templateBySlug.get(slug);
                  const unknown = !meta;

                  return (
                    <li key={slug}>
                      <article
                        className={`overflow-hidden rounded-[1.85rem] transition-[border-color,box-shadow] duration-300 ${cardRow} ${
                          isDark
                            ? "hover:border-white/16 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
                            : "hover:border-[var(--color-ink)]/14 hover:shadow-[0_20px_56px_rgba(49,42,40,0.1)]"
                        }`}
                      >
                        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
                          {unknown ? (
                            <div
                              className={`relative flex aspect-[16/10] w-full shrink-0 items-center justify-center rounded-2xl border sm:aspect-auto sm:h-auto sm:w-44 md:w-52 ${
                                isDark ? "border-white/10 bg-white/[0.04]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/80"
                              }`}
                            >
                              <BookmarkGlyph
                                className={`h-10 w-10 ${isDark ? "text-white/25" : "text-[var(--color-ink)]/22"}`}
                              />
                            </div>
                          ) : (
                            <Link
                              href={`/templates/${encodeURIComponent(slug)}`}
                              className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-auto sm:h-auto sm:w-44 md:w-52 ${
                                isDark ? "ring-1 ring-white/10" : "ring-1 ring-[var(--color-ink)]/10"
                              }`}
                            >
                              <Image
                                src={meta.image}
                                alt={meta.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 220px"
                              />
                            </Link>
                          )}

                          <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                            <div className="min-w-0 space-y-2">
                              {unknown ? (
                                <>
                                  <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                                    {copy.unknownTemplateTitle}
                                  </h3>
                                  <p className={`text-sm ${muted}`}>{copy.unknownTemplateBody}</p>
                                  <p className={`font-mono text-xs ${mutedSoft}`}>{slug}</p>
                                </>
                              ) : (
                                <>
                                  <p
                                    className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${mutedSoft}`}
                                  >
                                    {meta.tier}
                                  </p>
                                  <h3 className="font-display text-xl tracking-tight sm:text-2xl">{meta.name}</h3>
                                  <p className={`text-sm leading-relaxed ${muted}`}>{meta.previewLabel}</p>
                                </>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 sm:justify-end">
                              {!unknown ? (
                                <Link
                                  href={`/templates/${encodeURIComponent(slug)}`}
                                  className="btn-primary inline-flex flex-1 items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium sm:flex-none sm:px-6"
                                >
                                  {copy.openDemo}
                                </Link>
                              ) : null}
                              <button
                                type="button"
                                onClick={() => removeSavedTemplateSlug(slug)}
                                className={`inline-flex flex-1 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition sm:flex-none sm:px-6 ${
                                  isDark
                                    ? "border-white/16 text-white/88 hover:bg-white/[0.08]"
                                    : "border-[var(--color-ink)]/16 text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
                                }`}
                              >
                                {copy.removeLabel}
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}

            {slugs.length > 0 ? (
              <p className={`mt-10 text-center text-xs leading-relaxed ${mutedSoft}`}>{copy.localStorageNote}</p>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
