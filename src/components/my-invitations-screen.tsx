"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useAuthSession } from "@/components/auth-session";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { MY_INVITATIONS_DEMO_DATA, type DemoInvitation } from "@/lib/my-invitations-demo-data";

function InvitationsGlyph({ className }: { className?: string }) {
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
      <path d="M4 7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10Z" />
      <path d="M8 5.5V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5" />
      <path d="M4 9.5h16" />
      <path d="M9 14h.01M12 14h.01M15 14h.01" />
    </svg>
  );
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function formatUpdatedAt(iso: string, locale: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

export default function MyInvitationsScreen() {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { theme, language } = useGlobalPreferences();
  const { myInvitations: copy } = useMessages();
  const isDark = theme === "dark";
  const isClient = useIsClient();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyPublicUrl = useCallback(async (id: string, url: string) => {
    try {
      const absolute =
        url.startsWith("/") && typeof window !== "undefined"
          ? `${window.location.origin}${url}`
          : url;
      await navigator.clipboard.writeText(absolute);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (!signedIn) router.replace("/login");
  }, [isClient, signedIn, router]);

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";

  if (!isClient) {
    return (
      <main
        className={`relative isolate min-h-screen ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}
      >
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 px-6 py-28 text-center">
          <p className={`text-sm font-medium ${muted}`}>{copy.loading}</p>
        </div>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main
        className={`relative isolate min-h-screen ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}
      >
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-6 py-28 text-center">
          <p
            className={`font-display text-2xl ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
          >
            {copy.needLogin}
          </p>
          <Link href="/login" className="btn-primary rounded-full px-8 py-3.5 text-sm font-medium">
            {copy.goLogin}
          </Link>
        </div>
      </main>
    );
  }
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";

  const panelOuter = isDark
    ? "border border-white/[0.09] shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_32px_80px_rgba(0,0,0,0.42),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    : "border border-[var(--color-ink)]/[0.06] shadow-[0_4px_0_0_rgba(49,42,40,0.03),0_28px_70px_rgba(49,42,40,0.09),inset_0_1px_0_0_rgba(255,255,255,0.85)]";

  const panelInner = isDark
    ? "bg-[linear-gradient(168deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_42%,rgba(22,22,24,0.96)_78%)] backdrop-blur-xl"
    : "bg-[linear-gradient(168deg,rgba(255,255,255,0.98)_0%,rgba(255,252,248,0.96)_40%,rgba(247,242,236,0.94)_100%)] backdrop-blur-sm";

  const stepCard = isDark
    ? "border border-white/10 bg-white/[0.04] text-white/88"
    : "border border-[var(--color-ink)]/10 bg-white/90 text-[var(--color-ink)]";

  const inviteRow = isDark
    ? "border border-white/[0.08] bg-white/[0.03] shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
    : "border border-[var(--color-ink)]/[0.07] bg-white/[0.97] shadow-[0_8px_30px_rgba(49,42,40,0.05)]";

  const urlBox = isDark
    ? "border border-white/[0.07] bg-black/30 text-white/[0.92]"
    : "border border-[var(--color-ink)]/[0.08] bg-[var(--color-cream)]/80 text-[var(--color-ink)]";

  const statusPublished = isDark
    ? "border border-emerald-400/25 bg-emerald-500/12 text-emerald-200/95"
    : "border border-emerald-600/20 bg-emerald-600/10 text-emerald-900/90";
  const statusDraft = isDark
    ? "border border-amber-400/22 bg-amber-500/12 text-amber-100/90"
    : "border border-amber-600/25 bg-amber-500/12 text-amber-950/85";

  const demoItems: DemoInvitation[] = MY_INVITATIONS_DEMO_DATA;

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
      <div
        className={`pointer-events-none absolute bottom-[-10%] left-[-12%] h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-[var(--color-sage)]/8" : "bg-[var(--color-sage)]/12"
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
              <InvitationsGlyph className="h-7 w-7" />
            </div>
          </div>
          <p className={`max-w-2xl text-sm leading-relaxed ${muted}`}>{copy.subtitle}</p>
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            { n: "01", t: copy.step1 },
            { n: "02", t: copy.step2 },
            { n: "03", t: copy.step3 },
          ].map((s) => (
            <div
              key={s.n}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 sm:flex-col sm:items-start sm:gap-3 ${stepCard}`}
            >
              <span
                className={`font-display text-2xl tabular-nums ${
                  isDark ? "text-white/35" : "text-[var(--color-ink)]/28"
                }`}
              >
                {s.n}
              </span>
              <p className="text-sm font-semibold leading-snug">{s.t}</p>
            </div>
          ))}
        </div>

        <div className={`overflow-hidden rounded-[2rem] ${panelOuter} ${panelInner}`}>
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div
              className={`mb-8 rounded-2xl border px-4 py-3 sm:px-5 ${
                isDark
                  ? "border-amber-400/18 bg-amber-400/[0.07]"
                  : "border-amber-700/15 bg-amber-50/90"
              }`}
            >
              <p className={`text-sm leading-relaxed ${isDark ? "text-amber-50/88" : "text-amber-950/85"}`}>
                {copy.demoNotice}
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{copy.listHeading}</h2>
              <p
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  isDark
                    ? "border-white/12 bg-white/[0.04] text-white/55"
                    : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/60 text-[var(--color-ink)]/55"
                }`}
              >
                {demoItems.length} {language === "vi" ? "thiệp" : "invitations"}
              </p>
            </div>

            <ul className="flex w-full max-w-none flex-col gap-6">
              {demoItems.map((item, index) => {
                const tName = item.templateName[language];
                const couple = item.coupleLine[language];
                const statusClass = item.status === "published" ? statusPublished : statusDraft;
                const statusLabel =
                  item.status === "published" ? copy.statusPublished : copy.statusDraft;
                const tierLabel = item.tier === "premium" ? copy.tierPremium : copy.tierFree;
                const tierOnImageClass =
                  item.tier === "premium"
                    ? isDark
                      ? "border border-amber-300/40 bg-amber-500/30 text-amber-50 shadow-lg shadow-black/25"
                      : "border border-amber-700/35 bg-amber-50 text-amber-950 shadow-sm"
                    : isDark
                      ? "border border-white/22 bg-black/50 text-white/92 backdrop-blur-md"
                      : "border border-[var(--color-ink)]/14 bg-white/93 text-[var(--color-ink)] backdrop-blur-sm shadow-sm";
                const detailPanel = isDark
                  ? "border-white/[0.08] bg-white/[0.03]"
                  : "border-[var(--color-ink)]/[0.08] bg-[var(--color-cream)]/55";
                const linkDivider = isDark ? "border-white/[0.1]" : "border-[var(--color-ink)]/[0.1]";

                return (
                  <li key={item.id}>
                    <article
                      className={`group overflow-hidden rounded-[1.85rem] transition-[border-color,box-shadow] duration-300 ${inviteRow} ${
                        isDark
                          ? "hover:border-white/16 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
                          : "hover:border-[var(--color-ink)]/14 hover:shadow-[0_20px_56px_rgba(49,42,40,0.1)]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-stretch">
                        <div className="relative aspect-[16/10] max-h-[12rem] w-full shrink-0 sm:max-h-none sm:aspect-auto sm:min-h-full sm:w-[12.5rem] md:w-[13.75rem] lg:w-[14.5rem]">
                          <Image
                            src={item.previewImageUrl}
                            alt={item.previewImageAlt[language]}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, 280px"
                            priority={index === 0}
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 sm:bg-gradient-to-r sm:from-black/35 sm:via-transparent sm:to-black/10"
                            aria-hidden
                          />
                          <span
                            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] sm:left-3 sm:top-3 ${tierOnImageClass}`}
                          >
                            {tierLabel}
                          </span>
                          <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-10 sm:hidden">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/72">
                              {copy.previewPhotoCaption}
                            </p>
                            <p className="mt-0.5 font-display text-lg leading-snug tracking-tight text-white drop-shadow-md">
                              {couple}
                            </p>
                          </div>
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 px-4 py-5 sm:px-6 sm:py-5 md:gap-6 md:px-7 md:py-6">
                          <div className="min-w-0 space-y-4 md:space-y-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-2">
                              <div className="flex min-w-0 flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                                    isDark ? "bg-white/[0.07] text-white/52" : "bg-[var(--color-ink)]/[0.05] text-[var(--color-ink)]/52"
                                  }`}
                                >
                                  {tName}
                                </span>
                                <span
                                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusClass}`}
                                >
                                  {statusLabel}
                                </span>
                              </div>
                              <p className={`text-[11px] tabular-nums sm:text-right ${mutedSoft}`}>
                                {copy.updatedPrefix}{" "}
                                <time dateTime={item.updatedAtISO}>
                                  {formatUpdatedAt(item.updatedAtISO, language)}
                                </time>
                              </p>
                            </div>

                            <div className="hidden sm:block">
                              <p
                                className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${mutedSoft}`}
                              >
                                {copy.previewPhotoCaption}
                              </p>
                              <h3 className="font-display mt-1 text-[1.35rem] leading-tight tracking-tight md:text-2xl">
                                {couple}
                              </h3>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                              <div className={`rounded-xl border px-3.5 py-3.5 sm:px-4 sm:py-4 ${detailPanel}`}>
                                <p
                                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${mutedSoft}`}
                                >
                                  {copy.eventSummaryLabel}
                                </p>
                                <p
                                  className={`mt-2 text-sm font-medium leading-snug sm:text-[15px] ${
                                    isDark ? "text-white/90" : "text-[var(--color-ink)]"
                                  }`}
                                >
                                  {item.eventSummary[language]}
                                </p>
                              </div>
                              <div className={`rounded-xl border px-3.5 py-3.5 sm:px-4 sm:py-4 ${detailPanel}`}>
                                <p
                                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${mutedSoft}`}
                                >
                                  {copy.venueLabel}
                                </p>
                                <p className={`mt-2 text-sm leading-snug sm:text-[15px] ${muted}`}>
                                  {item.venueLine[language]}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className={`flex flex-col gap-3 border-t border-dashed pt-5 ${linkDivider}`}>
                            <p
                              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${mutedSoft}`}
                            >
                              {copy.inviteLinkLabel}
                            </p>
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                              <div
                                className={`min-h-[2.75rem] flex-1 rounded-lg px-3 py-2.5 font-mono text-[11px] leading-relaxed lg:min-w-0 lg:text-xs ${urlBox}`}
                                title={item.publicInviteUrl}
                              >
                                <span className="break-all">{item.publicInviteUrl}</span>
                              </div>
                              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 sm:justify-end lg:shrink-0">
                                {item.publicInviteUrl.startsWith("/") ? (
                                  <Link
                                    href={item.publicInviteUrl}
                                    className="btn-primary inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-px sm:min-w-[9.5rem] sm:flex-none"
                                  >
                                    {copy.openInvite}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.publicInviteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-px sm:min-w-[9.5rem] sm:flex-none"
                                  >
                                    {copy.openInvite}
                                    <span className="ml-1 text-xs opacity-90" aria-hidden>
                                      ↗
                                    </span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={() => void copyPublicUrl(item.id, item.publicInviteUrl)}
                                  className={`inline-flex flex-1 items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-200 sm:min-w-[9.5rem] sm:flex-none ${
                                    isDark
                                      ? "border-white/14 text-white/88 hover:bg-white/[0.08]"
                                      : "border-[var(--color-ink)]/14 text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
                                  }`}
                                >
                                  {copiedId === item.id ? copy.copied : copy.copyLink}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div
              className={`mx-auto mt-12 max-w-2xl rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 ${
                isDark
                  ? "border-[var(--color-sage)]/20 bg-[var(--color-sage)]/[0.06]"
                  : "border-[var(--color-sage)]/25 bg-[var(--color-sage)]/[0.08]"
              }`}
            >
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${
                  isDark ? "text-[var(--color-sage)]" : "text-[var(--color-sage)]"
                }`}
              >
                {copy.futureHintTitle}
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${mutedSoft}`}>{copy.futureHintBody}</p>
              <Link
                href="/#templates"
                className={`mt-4 inline-flex text-sm font-semibold underline-offset-4 transition hover:underline ${
                  isDark ? "text-white/80" : "text-[var(--color-ink)]/85"
                }`}
              >
                {copy.ctaBrowse}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
