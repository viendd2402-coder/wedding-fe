"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { socialProofMessages } from "@/i18n/messages/social-proof";
import { isTemplateDetailPath } from "@/lib/is-template-detail-path";
import { getTemplateDisplayName, weddingTemplates } from "@/lib/templates";

/**
 * Thông báo "khách vừa tạo thiệp" ở góc trái dưới — dữ liệu GIẢ LẬP (marketing),
 * không lấy từ backend. Hiện ~5s, nghỉ 8–16s rồi hiện tiếp; bấm X thì tắt trong phiên.
 */

const SHOW_MS = 5000;
const FIRST_DELAY_MS = 6000;
const GAP_MIN_MS = 8000;
const GAP_MAX_MS = 16000;
const DISMISS_KEY = "lumiere-social-proof-dismissed";

/** Không hiện trên trang thiệp khách mời / đăng nhập / thanh toán. */
const HIDDEN_PREFIXES = [
  "/invite/",
  "/login",
  "/register",
  "/forgot-password",
  "/auth/",
  "/payment/",
];

const FAMILY_NAMES = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ", "Ngô", "Dương", "Lý"];
const GIVEN_NAMES = ["Anh", "Linh", "Trang", "Hương", "Ngọc", "Thảo", "Mai", "Vy", "Hà", "Nhung", "Minh", "Tuấn", "Hùng", "Nam", "Dũng", "Quân", "Phương", "Hải", "Khánh", "Long"];
const CITIES = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Huế", "Nha Trang", "Vũng Tàu", "Biên Hòa", "Bắc Ninh", "Nghệ An", "Thanh Hóa", "Quảng Ninh", "Đà Lạt"];

type FakeActivity = {
  id: number;
  customer: string;
  city: string;
  slug: string;
  templateLabel: string;
};

const pick = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];

/** "Nguyễn T. Linh" — viết tắt tên đệm cho giống thật mà không lộ tên đầy đủ. */
function randomCustomer(): string {
  const middle = pick(GIVEN_NAMES)[0];
  return `${pick(FAMILY_NAMES)} ${middle}. ${pick(GIVEN_NAMES)}`;
}

function randomActivity(id: number, language: "vi" | "en"): FakeActivity {
  const template = pick(weddingTemplates);
  return {
    id,
    customer: randomCustomer(),
    city: pick(CITIES),
    slug: template.slug,
    templateLabel: getTemplateDisplayName(template, language),
  };
}

function readDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export default function SocialProofToast() {
  const pathname = usePathname();
  const { language } = useGlobalPreferences();
  const t = socialProofMessages[language];

  const [activity, setActivity] = useState<FakeActivity | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const hiddenOnRoute = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));
  const onTemplateDetail = isTemplateDetailPath(pathname);

  useEffect(() => {
    if (hiddenOnRoute || readDismissed()) return;

    let timer: ReturnType<typeof setTimeout>;
    let counter = 0;

    const show = () => {
      counter += 1;
      setActivity(randomActivity(counter, language));
      timer = setTimeout(hide, SHOW_MS);
    };
    const hide = () => {
      setActivity(null);
      timer = setTimeout(show, GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS));
    };

    timer = setTimeout(show, FIRST_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setActivity(null);
    };
  }, [hiddenOnRoute, language]);

  if (hiddenOnRoute || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    setActivity(null);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };


  return (
    <div
      className={`pointer-events-none fixed z-40 ${
        onTemplateDetail
          ? "bottom-[5.5rem] left-3 sm:bottom-[6rem] sm:left-4"
          : "bottom-4 left-4 sm:bottom-6 sm:left-5"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
      role="status"
      aria-live="polite"
      aria-label={t.regionAria}
    >
      <AnimatePresence>
        {activity ? (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative flex w-[min(20rem,calc(100vw-6.5rem))] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--background)_86%,#fff)] p-3 pr-8 shadow-[var(--shadow-lift)] backdrop-blur-xl dark:bg-[color-mix(in_srgb,#121110_82%,transparent)]"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-soft)] font-display text-lg font-semibold text-[var(--color-gold)]"
              aria-hidden="true"
            >
              {activity.customer.split(" ").pop()?.[0]}
            </span>
            <Link href={`/templates/${activity.slug}`} className="min-w-0 flex-1 text-[13px] leading-snug text-[var(--color-ink)]">
              <span className="font-semibold">{activity.customer}</span>{" "}
              <span className="text-[var(--color-muted)]">({activity.city})</span>{" "}
              {t.justCreated}{" "}
              <span className="font-semibold text-[var(--color-gold)]">{activity.templateLabel}</span>
              <span className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {t.justNow}
              </span>
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t.close}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-[var(--color-line)] hover:text-[var(--color-ink)]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
