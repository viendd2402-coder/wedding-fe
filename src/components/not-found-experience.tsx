"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect } from "react";
import type { AppLanguage } from "@/components/global-preferences-provider";
import { notFoundCopy } from "@/lib/not-found-messages";

/** Next / trình duyệt có thể khôi phục scroll sau paint — gọi nhiều nhịp để luôn về đầu trang. */
function scrollViewportToTop() {
  const root = document.scrollingElement ?? document.documentElement;
  root.scrollTop = 0;
  root.scrollLeft = 0;
  if (document.body) {
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
  }
  window.scrollTo(0, 0);
}

function useForce404ScrollToTop() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    const prevRestoration =
      typeof window !== "undefined" ? window.history.scrollRestoration : "auto";

    html.style.scrollBehavior = "auto";
    try {
      window.history.scrollRestoration = "manual";
    } catch {
      /* ignore */
    }

    scrollViewportToTop();
    let rafInner = 0;
    const rafOuter = requestAnimationFrame(() => {
      scrollViewportToTop();
      rafInner = requestAnimationFrame(scrollViewportToTop);
    });

    return () => {
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      html.style.scrollBehavior = prevBehavior;
      try {
        window.history.scrollRestoration = prevRestoration as ScrollRestoration;
      } catch {
        /* ignore */
      }
    };
  }, []);

  useEffect(() => {
    scrollViewportToTop();
    const t0 = window.setTimeout(scrollViewportToTop, 0);
    const t1 = window.setTimeout(scrollViewportToTop, 32);
    const t2 = window.setTimeout(scrollViewportToTop, 120);

    let ticks = 0;
    const interval = window.setInterval(() => {
      scrollViewportToTop();
      ticks += 1;
      if (ticks >= 10) window.clearInterval(interval);
    }, 48);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(interval);
    };
  }, []);
}

function CornerFrame({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 20V8a4 4 0 0 1 4-4h12M36 4h12a4 4 0 0 1 4 4v12M52 36v12a4 4 0 0 1-4 4H36M20 52H8a4 4 0 0 1-4-4V36"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function MonogramGlow({ className, gradId }: { className?: string; gradId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-rose)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" stroke={`url(#${gradId})`} strokeWidth="0.65" />
      <circle cx="60" cy="60" r="40" stroke={`url(#${gradId})`} strokeWidth="0.5" opacity="0.65" />
      <circle cx="60" cy="60" r="26" stroke={`url(#${gradId})`} strokeWidth="0.45" opacity="0.45" />
    </svg>
  );
}

export function NotFoundExperience({ lang }: { lang: AppLanguage }) {
  const t = notFoundCopy[lang];
  const monoA = useId().replace(/:/g, "");
  const monoB = useId().replace(/:/g, "");

  useForce404ScrollToTop();

  return (
    <main
      className="home-wedding-main-backdrop relative isolate flex min-h-0 flex-1 flex-col overflow-x-clip"
      style={{ overflowAnchor: "none" }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--color-rose)_18%,transparent)_0%,transparent_38%,color-mix(in_srgb,var(--color-sage)_14%,transparent)_72%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[20%] top-[-10%] h-[min(28rem,55vw)] w-[min(28rem,55vw)] rounded-full blur-[100px]"
        style={{ background: "color-mix(in srgb, var(--color-rose) 22%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[18%] bottom-[-8%] h-[min(32rem,60vw)] w-[min(32rem,60vw)] rounded-full blur-[110px]"
        style={{ background: "color-mix(in srgb, var(--color-sage) 18%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply [html[data-theme=dark]_&]:opacity-[0.18] [html[data-theme=dark]_&]:mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex w-full flex-1 flex-col items-center px-4 pb-20 pt-6 sm:px-10 sm:pb-24 sm:pt-10 md:px-12 md:pt-14 lg:px-16">
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 sm:top-8">
          <p
            className="select-none font-display text-[clamp(5.5rem,22vw,11rem)] font-medium leading-none tracking-[0.02em] text-[var(--foreground)] opacity-[0.055]"
            aria-hidden
          >
            404
          </p>
        </div>

        <div className="animate-[fade-up-soft_0.85s_ease-out_both] relative mt-4 w-full max-w-[min(36rem,calc(100vw-2rem))] sm:mt-6 sm:max-w-[min(42rem,calc(100vw-2.5rem))] md:max-w-[min(48rem,calc(100vw-3rem))] lg:max-w-[min(56rem,calc(100vw-4rem))]">
          <div
            className="pointer-events-none absolute -left-5 top-1/2 hidden h-32 w-32 -translate-y-1/2 text-[color-mix(in_srgb,var(--color-rose)_35%,transparent)] sm:block sm:-left-6 md:-left-10 md:h-40 md:w-40 lg:-left-14"
            aria-hidden
          >
            <MonogramGlow gradId={`nf-m-${monoA}`} className="h-full w-full opacity-90" />
          </div>
          <div
            className="pointer-events-none absolute -right-5 top-1/2 hidden h-32 w-32 -translate-y-1/2 scale-x-[-1] text-[color-mix(in_srgb,var(--color-rose)_35%,transparent)] sm:block sm:-right-6 md:-right-10 md:h-40 md:w-40 lg:-right-14"
            aria-hidden
          >
            <MonogramGlow gradId={`nf-m-${monoB}`} className="h-full w-full opacity-90" />
          </div>

          <article
            className="relative overflow-hidden rounded-[2rem] border border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-cream)_82%,#fff)] px-8 py-10 shadow-[0_4px_0_color-mix(in_srgb,var(--color-ink)_5%,transparent),0_28px_80px_rgba(49,42,40,0.11),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-xl [html[data-theme=dark]_&]:border-white/[0.09] [html[data-theme=dark]_&]:bg-[color-mix(in_srgb,var(--color-cream)_92%,transparent)] [html[data-theme=dark]_&]:shadow-[0_4px_0_rgba(0,0,0,0.4),0_36px_100px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-[2.25rem] sm:px-12 sm:py-12 md:px-16 md:py-14 lg:px-20 lg:py-16"
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-rose)_55%,var(--color-ink)_20%)] to-transparent opacity-80 [html[data-theme=dark]_&]:via-[color-mix(in_srgb,var(--color-rose)_48%,transparent)] sm:inset-x-12 md:inset-x-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-px -top-px h-14 w-14 text-[color-mix(in_srgb,var(--color-sage)_55%,var(--color-ink)_15%)] opacity-70 [html[data-theme=dark]_&]:text-[color-mix(in_srgb,var(--color-sage)_42%,transparent)]"
              aria-hidden
            >
              <CornerFrame className="h-full w-full" />
            </div>
            <div
              className="pointer-events-none absolute -bottom-px -right-px h-14 w-14 rotate-180 text-[color-mix(in_srgb,var(--color-sage)_55%,var(--color-ink)_15%)] opacity-70 [html[data-theme=dark]_&]:text-[color-mix(in_srgb,var(--color-sage)_42%,transparent)]"
              aria-hidden
            >
              <CornerFrame className="h-full w-full" />
            </div>

            <div className="relative text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[color-mix(in_srgb,var(--color-sage)_95%,var(--color-ink))] sm:text-[11px] sm:tracking-[0.44em]">
                {t.brand}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-ink)_52%,transparent)] [html[data-theme=dark]_&]:border-white/[0.12] [html[data-theme=dark]_&]:bg-white/[0.06] [html[data-theme=dark]_&]:text-white/55">
                  {t.kicker}
                </span>
                <span
                  className="hidden h-4 w-px bg-[color-mix(in_srgb,var(--color-ink)_12%,transparent)] sm:block [html[data-theme=dark]_&]:bg-white/[0.12]"
                  aria-hidden
                />
                <span className="max-w-[min(100%,22rem)] text-[11px] font-medium italic leading-snug text-[color-mix(in_srgb,var(--color-ink)_42%,transparent)] sm:max-w-[min(100%,28rem)] [html[data-theme=dark]_&]:text-white/45">
                  {t.whisper}
                </span>
              </div>

              <h1 className="font-display mt-9 text-[1.85rem] leading-[1.08] tracking-tight text-[var(--color-ink)] sm:mt-10 sm:text-[2.15rem] md:text-[2.45rem] lg:text-[2.65rem]">
                {t.title}
              </h1>

              <p className="mx-auto mt-6 max-w-[min(40rem,100%)] text-[0.9375rem] leading-[1.7] text-[color-mix(in_srgb,var(--color-ink)_58%,transparent)] sm:text-base md:text-[1.0625rem] md:leading-[1.72]">
                {t.body}
              </p>

              <div
                className="mx-auto mt-9 flex h-px max-w-[min(20rem,85%)] bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-rose)_50%,var(--color-ink)_15%)] to-transparent opacity-90 [html[data-theme=dark]_&]:via-white/22 sm:max-w-[min(28rem,90%)]"
                aria-hidden
              />

              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/"
                  className="btn-primary inline-flex min-h-[3.1rem] items-center justify-center rounded-full px-9 py-3 text-sm font-semibold shadow-[0_14px_40px_rgba(197,167,161,0.35)] transition duration-200 hover:brightness-[1.03] sm:min-h-[3.35rem] sm:px-11"
                >
                  {t.home}
                </Link>
                <Link
                  href="/#templates"
                  className="btn-secondary inline-flex min-h-[3.1rem] items-center justify-center rounded-full px-9 py-3 text-sm font-semibold transition duration-200 sm:min-h-[3.35rem] sm:px-11"
                >
                  {t.templates}
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
