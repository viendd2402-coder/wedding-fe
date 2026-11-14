"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAuthSession } from "@/components/auth-session";
import { TemplateListCard } from "@/components/template-list-card";
import { fetchProfileRequest } from "@/lib/auth-client";
import { useMessages } from "@/i18n/use-messages";
import { freeTemplates, premiumTemplates } from "@/lib/templates";
import { siteZaloUrl } from "@/lib/site-contact";

/** "Chào Minh Anh" khi đã đăng nhập (dùng API hồ sơ có cache), ngược lại "Chào bạn". */
export function useAccountGreeting(): string {
  const { signedIn } = useAuthSession();
  const { account: copy } = useMessages();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    void fetchProfileRequest().then((r) => {
      if (cancelled || !r.ok) return;
      const n = r.profile.name?.trim() || r.profile.email?.split("@")[0] || null;
      setName(n);
    });
    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  return signedIn && name ? copy.greetingTpl.replace("__NAME__", name) : copy.greetingFallback;
}

type AccountPageShellProps = {
  backHref?: string;
  backLabel: string;
  /** Nhãn nhỏ phía trên tiêu đề. Mặc định: lời chào theo tên người dùng. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Nút / thông tin phụ bên phải tiêu đề (vd. số lượng, nút tạo mới). */
  aside?: ReactNode;
  /** Bề rộng nội dung: `wide` cho lưới thẻ, `narrow` cho form. */
  width?: "wide" | "narrow";
  children: ReactNode;
};

/** Tab chuyển nhanh giữa 3 trang tài khoản. */
function AccountTabs() {
  const pathname = usePathname();
  const { account: copy } = useMessages();
  const tabs = [
    { href: "/my-invitations", label: copy.tabInvitations },
    { href: "/saved-templates", label: copy.tabSaved },
    { href: "/profile", label: copy.tabProfile },
  ];

  return (
    <nav
      aria-label={copy.tabsAria}
      className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <div className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 shadow-[var(--shadow-soft)]">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[var(--color-ink)] text-[var(--background)] shadow-sm"
                  : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** Khung chung cho các trang tài khoản (/profile, /my-invitations, /saved-templates). */
export default function AccountPageShell({
  backHref = "/",
  backLabel,
  eyebrow,
  title,
  subtitle,
  aside,
  width = "wide",
  children,
}: AccountPageShellProps) {
  const greeting = useAccountGreeting();
  return (
    <main className="lux-page-bg min-h-screen flex-1 text-[var(--color-ink)] transition-colors">
      <div
        className={`mx-auto w-full px-4 pb-24 pt-8 sm:px-6 lg:px-10 lg:pt-12 ${
          width === "wide" ? "max-w-[88rem]" : "max-w-6xl"
        }`}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={backHref}
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>
          <AccountTabs />
        </div>

        <header className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="lux-eyebrow">{eyebrow ?? greeting}</p>
            <h1 className="lux-title mt-4 text-4xl sm:text-5xl">{title}</h1>
            {subtitle ? <p className="lux-muted mt-4 text-[0.95rem] leading-relaxed sm:text-base">{subtitle}</p> : null}
          </div>
          {aside ? <div className="flex shrink-0 flex-wrap items-center gap-3">{aside}</div> : null}
        </header>

        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}

/** Ô trống dùng chung (chưa có dữ liệu). */
export function AccountEmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="lux-card relative mx-auto flex max-w-2xl flex-col items-center overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_18%,transparent),transparent_70%)]"
        aria-hidden="true"
      />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold)_45%,transparent)] bg-[var(--color-gold-soft)] text-[var(--color-gold)]">
        {icon}
      </span>
      <p className="relative mt-7 font-display text-3xl font-medium sm:text-4xl">{title}</p>
      {body ? <p className="lux-muted relative mt-3 max-w-md text-[0.95rem] leading-relaxed">{body}</p> : null}
      {action ? <div className="relative mt-8 flex flex-wrap justify-center gap-3">{action}</div> : null}
    </div>
  );
}

/** Mẫu gợi ý — hiện dưới trạng thái trống để khách bắt đầu ngay. */
export function TemplateSuggestions({ excludeSlugs = [] }: { excludeSlugs?: string[] }) {
  const { account: copy, home } = useMessages();
  // Ưu tiên 3 mẫu Premium + 1 mẫu miễn phí; bỏ mẫu đã có, bù bằng mẫu kế tiếp để luôn đủ 4 thẻ
  const preferred = [...premiumTemplates.slice(0, 3), ...freeTemplates.slice(0, 1)];
  const rest = [...premiumTemplates, ...freeTemplates].filter((t) => !preferred.includes(t));
  const picks = [...preferred, ...rest].filter((t) => !excludeSlugs.includes(t.slug)).slice(0, 4);
  if (picks.length === 0) return null;

  return (
    <section className="mt-20" aria-labelledby="account-suggestions-title">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="lux-eyebrow">{copy.suggestionsTitle}</p>
          <h2 id="account-suggestions-title" className="lux-title mt-3 text-2xl sm:text-3xl">
            {copy.suggestionsBody}
          </h2>
        </div>
        <Link href="/#templates" className="lux-link w-fit text-sm">
          {copy.suggestionsCta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {picks.map((item) => (
          <TemplateListCard
            key={item.slug}
            item={item}
            demoLabel={home.templateCardDemo}
            secondarySaveSlug={item.slug}
            secondaryLabel={home.templateCardSave}
          />
        ))}
      </div>
    </section>
  );
}

/** Thẻ "Cần hỗ trợ?" — mở Zalo. */
export function AccountHelpCard({ className = "" }: { className?: string }) {
  const { account: copy } = useMessages();
  return (
    <div
      className={`lux-inverse flex flex-col gap-5 rounded-[1.75rem] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8 ${className}`}
    >
      <div>
        <p className="font-display text-2xl font-medium">{copy.helpTitle}</p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">{copy.helpBody}</p>
      </div>
      <a
        href={siteZaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium"
      >
        {copy.helpCta}
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
