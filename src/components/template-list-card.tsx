"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { useSavedTemplateSlugs } from "@/hooks/use-saved-template-slugs";
import { addSavedTemplateSlug, removeSavedTemplateSlug } from "@/lib/saved-template-slugs";
import {
  getTemplateCardImage,
  getTemplateDisplayName,
  getTemplateHref,
  getTemplateNumber,
  getTemplateScrollPreview,
  type WeddingTemplate,
} from "@/lib/templates";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop";

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

/** Nút lưu / bỏ lưu dạng icon tròn nằm trên ảnh — bấm lần nữa để bỏ lưu. */
function TemplateCardSaveButton({ slug, secondaryLabel }: { slug: string; secondaryLabel: string }) {
  const { savedTemplates: savedCopy } = useMessages();
  const slugs = useSavedTemplateSlugs();
  const [flash, setFlash] = useState<"added" | "removed" | null>(null);
  const flashTimer = useRef<number | undefined>(undefined);
  const isSaved = slugs.includes(slug);
  const labelText = isSaved ? savedCopy.removeLabel : secondaryLabel;

  useEffect(() => () => window.clearTimeout(flashTimer.current), []);

  return (
    <button
      type="button"
      onClick={() => {
        if (isSaved) {
          removeSavedTemplateSlug(slug);
          setFlash("removed");
        } else {
          addSavedTemplateSlug(slug);
          setFlash("added");
        }
        window.clearTimeout(flashTimer.current);
        flashTimer.current = window.setTimeout(() => setFlash(null), 1500);
      }}
      aria-label={labelText}
      aria-pressed={isSaved}
      title={labelText}
      className={`pointer-events-auto absolute right-3 top-3 z-[3] inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.12)] backdrop-blur-md transition duration-300 hover:scale-105 ${
        isSaved ? "bg-[#17130f] text-[#e8cf9f]" : "bg-white/90 text-[#1c1917] hover:bg-white"
      }`}
    >
      <SaveBookmarkIcon filled={isSaved} className="h-[1.05rem] w-[1.05rem]" />
      {flash ? (
        <span
          className="absolute right-full mr-2 whitespace-nowrap rounded-full bg-[#17130f] px-3 py-1 text-xs font-medium text-white"
          role="status"
        >
          {flash === "added" ? savedCopy.toastAdded : savedCopy.toastRemoved}
        </span>
      ) : null}
    </button>
  );
}

type TemplateListCardProps = {
  item: WeddingTemplate;
  isDark?: boolean;
  /** Giữ để tương thích; thẻ dùng nhãn chuẩn của design system. */
  badgeClassName?: string;
  /** Nhãn hành động chính (cả thẻ là link tới trang demo). */
  demoLabel: string;
  /** Bỏ qua khi dùng `secondarySaveSlug`. */
  secondaryHref?: string;
  secondaryLabel: string;
  secondaryClassName?: string;
  /** Khi có: icon lưu slug vào danh sách trên trình duyệt (`/saved-templates`). */
  secondarySaveSlug?: string;
  cardClassName?: string;
  /** Ghi đè link mặc định của mẫu (vd. thiệp thật trong mục phổ biến). */
  href?: string;
  /** Ghi đè tên hiển thị (vd. tên sự kiện). */
  title?: string;
  /** Thứ hạng — hiện số "01" trước tên (mục "được chọn nhiều nhất"). */
  rank?: number;
};

export function TemplateListCard({
  item,
  demoLabel,
  secondaryHref,
  secondaryLabel,
  secondaryClassName = "btn-secondary",
  secondarySaveSlug,
  cardClassName = "",
  href,
  title,
  rank,
}: TemplateListCardProps) {
  const { home } = useMessages();
  const { language } = useGlobalPreferences();
  const displayName = title || getTemplateDisplayName(item, language);
  const detailHref = href || getTemplateHref(item);
  const isPremium = item.tier === "Trả phí";
  const image = getTemplateCardImage(item) || FALLBACK_IMAGE;
  const scrollPreview = getTemplateScrollPreview(item);

  return (
    <article className={`group relative flex flex-col ${cardClassName}`}>
      <Link
        href={detailHref}
        className="absolute inset-0 z-[1] rounded-[1.5rem]"
        aria-label={`${demoLabel} — ${displayName}. ${item.previewLabel}`}
      >
        <span className="sr-only">
          {displayName}. {item.previewLabel}
        </span>
      </Link>

      {/* Sân khấu: ảnh nền mờ theo màu mẫu + khung điện thoại hiển thị thiệp */}
      <div
        className="relative aspect-[5/7] overflow-hidden rounded-[1.5rem] border border-[var(--color-line)] transition-[box-shadow,border-color] duration-500 group-hover:border-[color-mix(in_srgb,var(--color-gold)_45%,var(--color-line))] group-hover:shadow-[var(--shadow-lift)]"
        style={{ backgroundColor: `color-mix(in srgb, ${item.accent} 22%, var(--color-surface-2))` }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="scale-125 object-cover opacity-45 blur-2xl"
          quality={30}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_srgb,var(--color-surface-2)_55%,transparent))]" aria-hidden="true" />

        <div className="absolute left-1/2 top-[8%] w-[60%] -translate-x-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
          <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2rem] border-[6px] border-[#151311] bg-[#151311] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
            {scrollPreview ? (
              <>
                {/* Bản thu nhỏ trang demo — đứng yên ở đầu trang, rê chuột vào thẻ mới cuộn (object-position 0% → 100%) */}
                {/* unoptimized: ảnh rất dài (~14.000px) — bộ tối ưu của Next có thể trả bản bị thu nhỏ/cắt */}
                <Image
                  src={scrollPreview}
                  alt=""
                  fill
                  unoptimized
                  className="animate-lux-phone-scroll object-cover object-top"
                />
                <span className="absolute left-1/2 top-2 z-[1] h-[1.05rem] w-[34%] -translate-x-1/2 rounded-full bg-[#151311]" aria-hidden="true" />
                <span className="absolute bottom-2.5 left-1/2 z-[1] -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-2.5 py-1 font-display text-xs italic text-white backdrop-blur-sm">
                  Nº {getTemplateNumber(item)}
                </span>
              </>
            ) : (
              <>
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 55vw, 200px"
                  className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" aria-hidden="true" />
                <span className="absolute left-1/2 top-2 h-[1.05rem] w-[34%] -translate-x-1/2 rounded-full bg-[#151311]" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 px-3 pb-4 text-center text-white">
                  <p className="whitespace-nowrap text-[0.42rem] font-semibold uppercase tracking-[0.24em] opacity-80">Save the date</p>
                  <p className="mt-1 font-display text-[1.6rem] italic leading-none sm:text-[1.9rem]">
                    Nº {getTemplateNumber(item)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <span
          className={`absolute left-3 top-3 z-[2] inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${
            isPremium ? "bg-[#17130f]/85 text-[#e8cf9f]" : "bg-white/90 text-[#1c1917]"
          }`}
        >
          {isPremium ? <span aria-hidden="true">✦</span> : null}
          {item.tier}
        </span>

        {secondarySaveSlug ? (
          <TemplateCardSaveButton slug={secondarySaveSlug} secondaryLabel={secondaryLabel} />
        ) : null}

      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h2 className="truncate font-display text-[1.5rem] font-medium leading-tight text-[var(--color-ink)] sm:text-[1.6rem]">
          {rank ? (
            <span className="mr-2 italic text-[var(--color-gold)] tabular-nums">{String(rank).padStart(2, "0")}</span>
          ) : null}
          {displayName}
        </h2>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <p className="inline-flex items-center gap-1 text-[0.8rem] font-medium text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]">
            {demoLabel}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </p>
          <p className={`shrink-0 text-[0.8rem] font-semibold tabular-nums ${isPremium ? "text-[var(--color-gold)]" : "text-[var(--color-sage)]"}`}>
            {isPremium ? home.galleryPremiumPrice : home.galleryFreePrice}
          </p>
        </div>
        {!secondarySaveSlug && secondaryHref ? (
          <a
            href={secondaryHref}
            className={`${secondaryClassName} relative z-[2] mt-4 inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-medium`}
          >
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </article>
  );
}
