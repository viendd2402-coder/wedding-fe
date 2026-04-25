"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMessages } from "@/i18n/use-messages";
import { useSavedTemplateSlugs } from "@/hooks/use-saved-template-slugs";
import { addSavedTemplateSlug } from "@/lib/saved-template-slugs";
import type { SavedTemplatesMessages } from "@/i18n/messages/saved-templates";
import type { WeddingTemplate } from "@/lib/templates";

function SaveBookmarkIcon({ filled, className }: { filled: boolean; className?: string }) {
  if (filled) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M6 3h12a2 2 0 0 1 2 2v17.05a1 1 0 0 1-1.45.89L12 18.11l-6.55 3.83A1 1 0 0 1 4 21.05V5a2 2 0 0 1 2-2Z"
        />
      </svg>
    );
  }
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

function TemplateCardSaveButton({
  slug,
  secondaryLabel,
  secondaryClassName,
  savedCopy,
}: {
  slug: string;
  secondaryLabel: string;
  secondaryClassName: string;
  savedCopy: SavedTemplatesMessages;
}) {
  const slugs = useSavedTemplateSlugs();
  const [saveFlash, setSaveFlash] = useState(false);
  const isSaved = slugs.includes(slug);
  const showSaved = saveFlash || isSaved;
  const labelText = showSaved ? savedCopy.toastAdded : secondaryLabel;

  return (
    <button
      type="button"
      onClick={() => {
        addSavedTemplateSlug(slug);
        setSaveFlash(true);
        window.setTimeout(() => setSaveFlash(false), 1500);
      }}
      aria-label={labelText}
      className={`${secondaryClassName} relative z-[2] inline-flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 px-3 text-center text-[13px] font-medium whitespace-nowrap pointer-events-auto`}
    >
      <SaveBookmarkIcon filled={showSaved} className="h-4 w-4 shrink-0 opacity-90" />
      <span className="min-w-0 truncate">{labelText}</span>
    </button>
  );
}

type TemplateListCardProps = {
  item: WeddingTemplate;
  isDark: boolean;
  badgeClassName: string;
  /** Nhãn nút demo (thẻ có link phủ; nút trái chỉ nhấn mạnh « Xem demo »). */
  demoLabel: string;
  /** Bỏ qua khi dùng `secondarySaveSlug`. */
  secondaryHref?: string;
  secondaryLabel: string;
  secondaryClassName: string;
  /** Khi có: nút phụ lưu slug vào danh sách trên trình duyệt (`/saved-templates`). */
  secondarySaveSlug?: string;
  /** Ví dụ `w-[400px] shrink-0` cho carousel ngang. */
  cardClassName?: string;
};

export function TemplateListCard({
  item,
  isDark,
  badgeClassName,
  demoLabel,
  secondaryHref,
  secondaryLabel,
  secondaryClassName,
  secondarySaveSlug,
  cardClassName = "",
}: TemplateListCardProps) {
  const { savedTemplates: savedCopy } = useMessages();
  const detailHref = `/templates/${item.slug}`;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[2rem] ${
        isDark
          ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
          : "border-2 border-[color-mix(in_srgb,#b8925c_48%,#c4a099)] bg-[linear-gradient(165deg,rgba(255,253,251,0.98),rgba(252,244,238,0.92))] shadow-[0_22px_52px_rgba(46,36,32,0.1)] ring-1 ring-white/80"
      } ${cardClassName}`}
    >
      <Link
        href={detailHref}
        className={`absolute inset-0 z-0 rounded-[2rem] outline-offset-4 focus-visible:outline focus-visible:outline-2 ${
          isDark ? "focus-visible:outline-white/50" : "focus-visible:outline-[var(--color-rose)]/60"
        }`}
        aria-label={`${demoLabel} — ${item.name}. ${item.previewLabel}`}
      >
        <span className="sr-only">
          {item.name}. {item.previewLabel}
        </span>
      </Link>
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col pointer-events-none">
        <div className="relative h-80 fshrink-0 overflow-hidden sm:h-96">
          <Image
            src={item.image || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, min(440px, 100vw)"
            className="object-cover object-center"
            quality={92}
            priority={false}
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="min-w-0 flex-1 font-display text-3xl leading-tight">{item.name}</h2>
            <span className={`shrink-0 ${badgeClassName}`}>{item.tier}</span>
          </div>
          <p
            className={`mt-2 line-clamp-2 break-words text-sm leading-snug tracking-tight ${
              isDark ? "text-white/65" : "text-[var(--color-ink)]/62"
            }`}
          >
            {item.previewLabel}
          </p>
          <div className="mt-auto flex gap-3 pt-5">
            <span
              className={`btn-primary inline-flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-full px-4 py-3 text-center text-sm font-medium whitespace-nowrap select-none ${
                isDark ? "opacity-95 group-hover:opacity-100" : "group-hover:brightness-[1.02]"
              }`}
              aria-hidden="true"
            >
              {demoLabel}
            </span>
            {secondarySaveSlug ? (
              <TemplateCardSaveButton
                slug={secondarySaveSlug}
                secondaryLabel={secondaryLabel}
                secondaryClassName={secondaryClassName}
                savedCopy={savedCopy}
              />
            ) : (
              <a
                href={secondaryHref ?? "#"}
                className={`${secondaryClassName} relative z-[2] inline-flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center px-4 text-center text-[13px] font-medium whitespace-nowrap pointer-events-auto`}
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
