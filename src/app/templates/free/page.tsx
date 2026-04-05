"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { TemplateListCard } from "@/components/template-list-card";
import { freeTemplates } from "@/lib/templates";

export default function FreeTemplatesPage() {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            back: "Về trang chủ",
            eyebrow: "Bộ sưu tập",
            title: "Mẫu miễn phí",
            body: "Toàn bộ mẫu dưới đây có thể xem demo trực tiếp. Liên hệ khi bạn muốn triển khai theo mẫu đã chọn.",
            demo: "Xem demo",
            useTemplate: "Dùng mẫu này",
          }
        : {
            back: "Back to home",
            eyebrow: "Gallery",
            title: "Free templates",
            body: "Open any card for a full live demo. Reach out when you are ready to launch with your chosen design.",
            demo: "View demo",
            useTemplate: "Use this template",
          },
    [language],
  );

  const badgeClassName =
    "rounded-full bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-medium text-[var(--color-sage)]";

  const mainClass = isDark
    ? "bg-[#090909] text-white"
    : "bg-[var(--color-cream)] text-[var(--color-ink)]";

  return (
    <main className={`min-h-screen flex-1 transition-colors ${mainClass}`}>
      <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
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
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className={`mt-5 text-base leading-8 sm:text-lg ${isDark ? "text-white/70" : "text-[var(--color-ink)]/72"}`}>
            {copy.body}
          </p>
        </header>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {freeTemplates.map((item) => (
            <TemplateListCard
              key={item.slug}
              item={item}
              isDark={isDark}
              badgeClassName={badgeClassName}
              demoLabel={copy.demo}
              secondaryHref="/#contact"
              secondaryLabel={copy.useTemplate}
              secondaryClassName="btn-ghost inline-flex rounded-full px-4 py-3 text-sm font-medium transition"
              cardClassName="h-full"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
