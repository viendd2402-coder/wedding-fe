"use client";

import Link from "next/link";
import { useMessages } from "@/i18n/use-messages";
import { TemplateListCard } from "@/components/template-list-card";
import TemplatePreviewHint from "@/components/template-preview-hint";
import { freeTemplates } from "@/lib/templates";

export default function FreeTemplatesPage() {
  const { templatesFree: copy } = useMessages();

  return (
    <main className="lux-page-bg min-h-screen flex-1 text-[var(--color-ink)] transition-colors">
      <div className="mx-auto w-full max-w-[88rem] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
        >
          <span aria-hidden="true">←</span>
          {copy.back}
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="lux-eyebrow">{copy.eyebrow}</p>
          <h1 className="lux-title mt-5 text-4xl sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="lux-muted mt-5 text-base leading-relaxed sm:text-lg">{copy.body}</p>
        </header>

        {freeTemplates.length === 0 ? (
          <p className="lux-muted mt-14 max-w-2xl text-base leading-relaxed">{copy.emptyList}</p>
        ) : (
          <>
            <TemplatePreviewHint className="mt-10 justify-start" />
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {freeTemplates.map((item) => (
                <TemplateListCard
                  key={item.slug}
                  item={item}
                  demoLabel={copy.viewDemo}
                  secondarySaveSlug={item.slug}
                  secondaryLabel={copy.saveTemplate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
