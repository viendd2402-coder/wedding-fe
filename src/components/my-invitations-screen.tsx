"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { useAuthSession } from "@/components/auth-session";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";

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

export default function MyInvitationsScreen() {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { theme } = useGlobalPreferences();
  const { myInvitations: copy } = useMessages();
  const isDark = theme === "dark";
  const isClient = useIsClient();

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
          <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div className="mx-auto max-w-xl text-center">
              <div
                className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border-2 border-dashed ${
                  isDark
                    ? "border-white/18 bg-white/[0.03] text-white/55"
                    : "border-[var(--color-ink)]/16 bg-white/60 text-[var(--color-ink)]/45"
                }`}
              >
                <InvitationsGlyph className="h-11 w-11" />
              </div>
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">{copy.emptyTitle}</h2>
              <p className={`mx-auto mt-4 max-w-md text-sm leading-relaxed ${muted}`}>{copy.emptyBody}</p>
              <Link
                href="/#templates"
                className="btn-primary mt-10 inline-flex rounded-full px-9 py-3.5 text-sm font-medium transition hover:-translate-y-0.5"
              >
                {copy.ctaBrowse}
              </Link>
            </div>

            <div
              className={`mx-auto mt-14 max-w-2xl rounded-2xl border px-5 py-5 sm:px-6 sm:py-6 ${
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
