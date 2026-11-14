"use client";

import Link from "next/link";
import AccountPageShell, { AccountEmptyState, TemplateSuggestions } from "@/components/account-page-shell";
import { TemplateListCard } from "@/components/template-list-card";
import TemplatePreviewHint from "@/components/template-preview-hint";
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
      strokeWidth="1.5"
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
  const { savedTemplates: copy, home, account } = useMessages();
  const slugs = useSavedTemplateSlugs();

  const templateBySlug = new Map(weddingTemplates.map((t) => [t.slug, t]));
  const known = slugs.flatMap((slug) => {
    const meta = templateBySlug.get(slug);
    return meta ? [meta] : [];
  });
  const unknownSlugs = slugs.filter((slug) => !templateBySlug.has(slug));

  return (
    <AccountPageShell
      backLabel={copy.backHome}
      title={copy.title}
      subtitle={account.savedSubtitle}
      aside={
        slugs.length > 0 ? (
          <span className="lux-chip">
            {slugs.length} {copy.countSuffix}
          </span>
        ) : null
      }
    >
      {slugs.length === 0 ? (
        <AccountEmptyState
          icon={<BookmarkGlyph className="h-7 w-7" />}
          title={copy.emptyTitle}
          body={copy.emptyBody}
          action={
            <Link href="/#templates" className="btn-primary inline-flex rounded-full px-8 py-3.5 text-sm font-medium">
              {copy.ctaBrowse}
            </Link>
          }
        />
      ) : (
        <>
          <TemplatePreviewHint className="mb-8 justify-start" />
          {/* Cùng thẻ với trang chủ — bấm icon đánh dấu trên ảnh để bỏ lưu */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {known.map((item) => (
              <TemplateListCard
                key={item.slug}
                item={item}
                demoLabel={copy.openDemo}
                secondarySaveSlug={item.slug}
                secondaryLabel={home.templateCardSave}
              />
            ))}
          </div>

          {/* Slug không còn trong kho mẫu (mẫu đã gỡ) — vẫn cho phép xoá khỏi danh sách */}
          {unknownSlugs.length > 0 ? (
            <ul className="mt-12 flex flex-col gap-3">
              {unknownSlugs.map((slug) => (
                <li
                  key={slug}
                  className="lux-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-muted)]">
                      <BookmarkGlyph className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-xl font-medium">{copy.unknownTemplateTitle}</p>
                      <p className="lux-muted text-sm">{copy.unknownTemplateBody}</p>
                      <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{slug}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSavedTemplateSlug(slug)}
                    className="btn-secondary inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium"
                  >
                    {copy.removeLabel}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-14 text-center text-xs leading-relaxed text-[var(--color-muted)]">{copy.localStorageNote}</p>
        </>
      )}

      <TemplateSuggestions excludeSlugs={slugs} />
    </AccountPageShell>
  );
}
