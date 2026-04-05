"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { weddingTemplates } from "@/lib/templates";
import { IconTiktokBrand, IconZaloBrand } from "@/components/icons-social-brands";
import {
  siteContact,
  sitePhoneTel,
  siteTiktokUrl,
  siteZaloUrl,
} from "@/lib/site-contact";

const templateDemoSlugs = new Set(weddingTemplates.map((t) => t.slug));

function pathnameIsTemplateDemo(pathname: string | null): boolean {
  if (!pathname?.startsWith("/templates/")) return false;
  const slug = pathname.slice("/templates/".length).split("/")[0];
  if (!slug) return false;
  return templateDemoSlugs.has(slug);
}

const iconStroke = 1.5;

/** Cùng kích thước khung — icon fill/stroke cân quang học trong ô tròn. */
const dockIconClass = "h-[26px] w-[26px] shrink-0";

/** Rung liên tục từ lúc vào trang (CSS infinite, không cần hover) — transform chỉ trên wrapper. */
const dockIconWiggle =
  "inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center animate-floating-contact-wiggle";

/** Máy cầm tay — nét, đồng bộ footer. */
function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={iconStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.38 3.79c.85-.16 1.73.21 2.21 1.02l1.56 2.6a2 2 0 0 1-.22 2.32l-.86 1.03a12 12 0 0 0 5.24 5.24l1.03-.86a2 2 0 0 1 2.32-.22l2.6 1.56c.81.48 1.18 1.36 1.02 2.21l-.42 2.18a2 2 0 0 1-1.85 1.62A18 18 0 0 1 3 5.24a2 2 0 0 1 1.62-1.85l1.76-.6Z" />
    </svg>
  );
}

/** Dock theo tone site: nền mờ, viền nhẹ, icon giữ nhận diện thương hiệu từng kênh. */
const dockShell =
  "flex flex-col gap-2 rounded-[1.625rem] border border-[color-mix(in_srgb,var(--color-ink)_7%,transparent)] bg-[color-mix(in_srgb,var(--background)_82%,#fff)] p-2.5 shadow-[0_10px_38px_rgba(49,42,40,0.06),0_2px_10px_rgba(49,42,40,0.03)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.09] dark:bg-[color-mix(in_srgb,#121110_78%,transparent)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]";

const dockItem =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-ink)_6%,transparent)] bg-[color-mix(in_srgb,var(--color-cream)_70%,#fff)] transition-[transform,box-shadow,border-color,background-color] duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_8px_22px_rgba(197,167,161,0.18)] motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-white/[0.08] dark:bg-white/[0.06] dark:motion-safe:hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] dark:motion-safe:hover:border-[color-mix(in_srgb,var(--color-rose)_35%,transparent)]";

export default function FloatingContactRail() {
  const pathname = usePathname();
  const { language, theme } = useGlobalPreferences();

  if (pathnameIsTemplateDemo(pathname)) {
    return null;
  }

  const labels =
    language === "vi"
      ? {
          zalo: "Chat Zalo",
          tiktok: "TikTok Lumiere",
          phone: `Gọi ${siteContact.phoneDisplay}`,
        }
      : {
          zalo: "Chat on Zalo",
          tiktok: "Lumiere on TikTok",
          phone: `Call ${siteContact.phoneDisplay}`,
        };

  const ringFocus =
    theme === "dark" ? "focus-visible:outline-white/60" : "focus-visible:outline-[var(--color-rose)]/50";

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-5"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className={`pointer-events-auto ${dockShell}`}>
        <Link
          href={siteZaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${dockItem} motion-safe:hover:border-[#0068FF]/25 ${ringFocus}`}
          aria-label={labels.zalo}
          title={labels.zalo}
        >
          <span className={dockIconWiggle}>
            <IconZaloBrand className={dockIconClass} />
          </span>
        </Link>
        {siteTiktokUrl ? (
          <Link
            href={siteTiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${dockItem} motion-safe:hover:border-black/12 dark:motion-safe:hover:border-white/15 ${ringFocus}`}
            aria-label={labels.tiktok}
            title={labels.tiktok}
          >
            <span className={`${dockIconWiggle} animate-floating-contact-wiggle-delay-1`}>
              <IconTiktokBrand className={dockIconClass} />
            </span>
          </Link>
        ) : null}
        <a
          href={sitePhoneTel}
          className={`${dockItem} motion-safe:hover:border-[#15803d]/35 dark:motion-safe:hover:border-[#4ade80]/35 ${ringFocus}`}
          aria-label={labels.phone}
          title={labels.phone}
        >
          <span className={`${dockIconWiggle} animate-floating-contact-wiggle-delay-2`}>
            <IconPhone
              className={`${dockIconClass} text-[#15803d] dark:text-[#4ade80]`}
            />
          </span>
        </a>
      </div>
    </div>
  );
}
