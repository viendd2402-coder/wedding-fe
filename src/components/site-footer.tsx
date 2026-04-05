"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, type MouseEvent } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { IconZaloBrand } from "@/components/icons-social-brands";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";
import { siteContact, siteZaloUrl } from "@/lib/site-contact";
import { weddingTemplates } from "@/lib/templates";

const templateDemoSlugs = new Set(weddingTemplates.map((t) => t.slug));

function pathnameIsTemplateDemo(pathname: string | null): boolean {
  if (!pathname?.startsWith("/templates/")) return false;
  const slug = pathname.slice("/templates/".length).split("/")[0];
  if (!slug) return false;
  return templateDemoSlugs.has(slug);
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.38 3.79c.85-.16 1.73.21 2.21 1.02l1.56 2.6a2 2 0 0 1-.22 2.32l-.86 1.03a12 12 0 0 0 5.24 5.24l1.03-.86a2 2 0 0 1 2.32-.22l2.6 1.56c.81.48 1.18 1.36 1.02 2.21l-.42 2.18a2 2 0 0 1-1.85 1.62A18 18 0 0 1 3 5.24a2 2 0 0 1 1.62-1.85l1.76-.6Z"
      />
    </svg>
  );
}

export default function SiteFooter() {
  const pathname = usePathname();
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            eyebrow: "Thiệp mời trực tuyến",
            brand: "Lumiere",
            body: "Nền tảng giúp hai bạn dựng website mời cưới với mẫu giao diện độc lập, hỗ trợ song ngữ và chế độ sáng hoặc tối — một link để khách mời xem lịch, địa điểm và xác nhận tham dự ngay trên điện thoại.",
            navExploreTitle: "Khám phá",
            navSupportTitle: "Dịch vụ",
            home: "Trang chủ",
            templates: "Mẫu giao diện",
            whyUs: "Vì sao chọn chúng tôi",
            free: "Mẫu miễn phí",
            premium: "Mẫu trả phí",
            features: "Trải nghiệm",
            pricing: "Bảng giá",
            feedback: "Phản hồi",
            contact: "Liên hệ",
            login: "Đăng nhập",
            rights: "Bảo lưu mọi quyền.",
            contactTitle: "Liên hệ trực tiếp",
            labelZalo: "Zalo",
            labelEmail: "Email",
            labelPhone: "Điện thoại",
            tagline: "Tinh tế trên mọi thiết bị.",
          }
        : {
            eyebrow: "Online wedding invitations",
            brand: "Lumiere",
            body: "Build your wedding website with distinct templates, bilingual support, and light or dark UI—one link gives guests the schedule, venues, and RSVP on mobile.",
            navExploreTitle: "Explore",
            navSupportTitle: "Service",
            home: "Home",
            templates: "Templates",
            whyUs: "Why Lumiere",
            free: "Free templates",
            premium: "Premium templates",
            features: "Experience",
            pricing: "Pricing",
            feedback: "Feedback",
            contact: "Contact",
            login: "Login",
            rights: "All rights reserved.",
            contactTitle: "Get in touch",
            labelZalo: "Zalo",
            labelEmail: "Email",
            labelPhone: "Phone",
            tagline: "Refined on every screen.",
          },
    [language],
  );

  const exploreLinks = useMemo(
    () =>
      [
        { href: "/", label: copy.home },
        { href: "/#templates", label: copy.templates },
        { href: "/#why-us", label: copy.whyUs },
        { href: "/templates/free", label: copy.free },
        { href: "/templates/premium", label: copy.premium },
        { href: "/#features", label: copy.features },
      ] as const,
    [copy],
  );

  const supportLinks = useMemo(
    () =>
      [
        { href: "/#pricing", label: copy.pricing },
        { href: "/#feedback", label: copy.feedback },
        { href: "/#contact", label: copy.contact },
        { href: "/login", label: copy.login },
      ] as const,
    [copy],
  );

  const handleHomeLinkClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (pathname === "/") {
        e.preventDefault();
        if (typeof window !== "undefined" && window.location.hash) {
          window.history.replaceState(null, "", "/");
        }
        forceDocumentScrollTop();
      }
    },
    [pathname],
  );

  if (pathnameIsTemplateDemo(pathname)) {
    return null;
  }

  const year = new Date().getFullYear();

  const panelMuted = isDark
    ? "border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
    : "border-[var(--color-ink)]/[0.06] bg-white/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)]";

  const navLinkClass = `group inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] transition ${
    isDark
      ? "text-white/65 hover:text-white"
      : "text-[var(--color-ink)]/62 hover:text-[var(--color-ink)]"
  }`;

  const contactCardClass = `group flex items-start gap-3.5 rounded-2xl border px-4 py-3.5 transition duration-300 ${panelMuted} ${
    isDark
      ? "hover:border-[var(--color-sage)]/35 hover:bg-white/[0.06]"
      : "hover:border-[var(--color-sage)]/30 hover:bg-white/80"
  }`;

  const iconWrap = `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition duration-300 ${
    isDark
      ? "border-white/10 bg-white/[0.06] text-[var(--color-sage)] group-hover:border-[var(--color-sage)]/40 group-hover:text-[var(--color-sage)]"
      : "border-[var(--color-ink)]/8 bg-[var(--color-cream)]/80 text-[var(--color-sage)] group-hover:border-[var(--color-sage)]/35"
  }`;

  const renderNavLink = (href: string, label: string) => (
    <li key={href + label}>
      <Link
        href={href}
        className={navLinkClass}
        onClick={href === "/" ? handleHomeLinkClick : undefined}
      >
        <span className="h-px w-0 bg-current transition-all duration-300 group-hover:w-3" aria-hidden="true" />
        {label}
      </Link>
    </li>
  );

  return (
    <footer
      className={`relative mt-auto overflow-hidden border-t ${isDark ? "border-white/10 bg-[#080808]" : "border-[var(--color-ink)]/8 bg-[var(--color-cream)]"}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(209,177,171,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(125,140,121,0.08),transparent)]"
            : "bg-[radial-gradient(ellipse_90%_55%_at_50%_-30%,rgba(197,167,161,0.22),transparent),radial-gradient(ellipse_50%_45%_at_0%_100%,rgba(125,140,121,0.12),transparent)]"
        }`}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5">
            <div className="flex items-start gap-5">
              <span
                className="mt-1.5 hidden h-12 w-1 shrink-0 rounded-full sm:block"
                style={{
                  background: isDark
                    ? "linear-gradient(180deg, rgba(155,168,150,0.85), rgba(209,177,171,0.45))"
                    : "linear-gradient(180deg, rgba(125,140,121,0.75), rgba(197,167,161,0.5))",
                }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-sage)]">{copy.eyebrow}</p>
                <p className="mt-3 font-display text-4xl tracking-[0.06em] sm:text-5xl">{copy.brand}</p>
                <p className={`mt-6 max-w-md text-[15px] leading-[1.75] ${isDark ? "text-white/66" : "text-[var(--color-ink)]/70"}`}>
                  {copy.body}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-sage)]">{copy.contactTitle}</p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={siteZaloUrl} className={contactCardClass} target="_blank" rel="noopener noreferrer">
                <span className={iconWrap}>
                  <IconZaloBrand className="h-5 w-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/42" : "text-[var(--color-ink)]/45"}`}>
                    {copy.labelZalo}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${isDark ? "text-white/88" : "text-[var(--color-ink)]/88"}`}>
                    {siteContact.phoneDisplay}
                  </p>
                </div>
              </a>
              <a href={`mailto:${siteContact.email}`} className={contactCardClass}>
                <span className={iconWrap}>
                  <IconMail className="h-5 w-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/42" : "text-[var(--color-ink)]/45"}`}>
                    {copy.labelEmail}
                  </p>
                  <p className={`mt-1 break-all text-sm font-medium ${isDark ? "text-white/88" : "text-[var(--color-ink)]/88"}`}>
                    {siteContact.email}
                  </p>
                </div>
              </a>
              <a href={`tel:${siteContact.phoneE164}`} className={contactCardClass}>
                <span className={iconWrap}>
                  <IconPhone className="h-5 w-5" />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? "text-white/42" : "text-[var(--color-ink)]/45"}`}>
                    {copy.labelPhone}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${isDark ? "text-white/88" : "text-[var(--color-ink)]/88"}`}>
                    {siteContact.phoneDisplay}
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-12 lg:col-span-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-sage)]">{copy.navExploreTitle}</p>
              <ul className="mt-5 space-y-3">{exploreLinks.map(({ href, label }) => renderNavLink(href, label))}</ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--color-sage)]">{copy.navSupportTitle}</p>
              <ul className="mt-5 space-y-3">{supportLinks.map(({ href, label }) => renderNavLink(href, label))}</ul>
            </div>
          </div>
        </div>

        <div
          className={`mt-16 flex flex-col gap-5 border-t pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 ${
            isDark ? "border-white/[0.08]" : "border-[var(--color-ink)]/[0.08]"
          }`}
        >
          <p className={`text-[13px] ${isDark ? "text-white/48" : "text-[var(--color-ink)]/48"}`}>
            © {year} {copy.brand}. {copy.rights}
          </p>
          <p
            className={`font-display text-lg tracking-[0.04em] sm:text-right ${isDark ? "text-white/32" : "text-[var(--color-ink)]/38"}`}
          >
            {copy.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
