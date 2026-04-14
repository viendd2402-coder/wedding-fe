"use client";

import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { TemplateListCard } from "@/components/template-list-card";
import { premiumTemplates } from "@/lib/templates";

export default function PremiumTemplatesPage() {
  const { theme } = useGlobalPreferences();
  const { templatesPremium: copy } = useMessages();
  const isDark = theme === "dark";

  const badgeClassName =
    "rounded-full bg-[var(--color-rose)]/12 px-3 py-1 text-xs font-medium text-[var(--color-rose)]";

  const mainClass = isDark
    ? "bg-[#090909] text-white"
    : "bg-[var(--color-cream)] text-[var(--color-ink)]";

  return (
    <main className={`min-h-screen flex-1 transition-colors ${mainClass}`}>
      <div className="mx-auto w-full max-w-[min(100%,92rem)] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-medium transition hover:underline ${isDark ? "text-white/72 hover:text-white" : "text-[var(--color-ink)]/72 hover:text-[var(--color-ink)]"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          {copy.back}
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className={`mt-5 text-base leading-8 sm:text-lg ${isDark ? "text-white/70" : "text-[var(--color-ink)]/72"}`}>
            {copy.body}
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {premiumTemplates.map((item) => (
            <TemplateListCard
              key={item.slug}
              item={item}
              isDark={isDark}
              badgeClassName={badgeClassName}
              demoLabel={copy.viewDemo}
              secondarySaveSlug={item.slug}
              secondaryLabel={copy.saveTemplate}
              secondaryClassName="btn-secondary inline-flex rounded-full px-4 py-3 text-sm font-medium transition"
              cardClassName="h-full"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
