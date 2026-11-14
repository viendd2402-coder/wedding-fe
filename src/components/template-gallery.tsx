"use client";

import { useMemo, useState } from "react";
import { useMessages } from "@/i18n/use-messages";
import { TemplateListCard } from "@/components/template-list-card";
import TemplatePreviewHint from "@/components/template-preview-hint";
import type { WeddingTemplate } from "@/lib/templates";

type TierFilter = "all" | "free" | "premium";

/** Số thẻ hiển thị trước khi bấm "Xem thêm" (2 hàng × 4 cột trên desktop). */
const INITIAL_VISIBLE = 8;

type TemplateGalleryProps = {
  freeTemplates: WeddingTemplate[];
  premiumTemplates: WeddingTemplate[];
};

export default function TemplateGallery({ freeTemplates, premiumTemplates }: TemplateGalleryProps) {
  const { home: copy } = useMessages();
  const [tier, setTier] = useState<TierFilter>("all");
  const [expanded, setExpanded] = useState(false);

  const all = useMemo(() => [...premiumTemplates, ...freeTemplates], [freeTemplates, premiumTemplates]);

  const filtered = tier === "free" ? freeTemplates : tier === "premium" ? premiumTemplates : all;
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const tierTabs: { id: TierFilter; label: string; count: number }[] = [
    { id: "all", label: copy.galleryFilterAll, count: all.length },
    { id: "free", label: copy.freeTitle, count: freeTemplates.length },
    { id: "premium", label: copy.premiumTitle, count: premiumTemplates.length },
  ];

  return (
    <div className="mt-12">
      <div className="flex justify-center">
        <div
          role="group"
          aria-label={copy.galleryFilterTierAria}
          className="inline-flex w-full rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 shadow-[var(--shadow-soft)] sm:w-auto"
        >
          {tierTabs.map((tab) => {
            const active = tier === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTier(tab.id);
                  setExpanded(false);
                }}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition sm:flex-none sm:px-6 ${
                  active
                    ? "bg-[var(--color-ink)] text-[var(--background)] shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {tab.label}
                <span className="text-xs tabular-nums opacity-60">{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <TemplatePreviewHint className="mt-8" />

      {filtered.length === 0 ? (
        <p className="lux-muted mt-10 text-center">{copy.galleryEmpty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <TemplateListCard
              key={item.slug}
              item={item}
              demoLabel={copy.templateCardDemo}
              secondarySaveSlug={item.slug}
              secondaryLabel={copy.templateCardSave}
            />
          ))}
        </div>
      )}

      {hasMore ? (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn-secondary inline-flex cursor-pointer items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium"
          >
            {expanded ? copy.galleryShowLess : `${copy.galleryShowMore} (${filtered.length - INITIAL_VISIBLE})`}
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
