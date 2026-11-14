"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, type MouseEvent, type ReactNode } from "react";
import { useMessages } from "@/i18n/use-messages";
import { IconTiktokBrand, IconZaloBrand } from "@/components/icons-social-brands";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";
import { isTemplateDetailPath } from "@/lib/is-template-detail-path";
import { siteContact, siteTiktokUrl, siteZaloUrl } from "@/lib/site-contact";

function isPublicInviteSharePath(pathname: string | null): boolean {
  return Boolean(pathname?.startsWith("/invite/"));
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
  const { footer: copy } = useMessages();

  const exploreLinks = useMemo(
    () =>
      [
        { href: "/", label: copy.home },
        { href: "/#templates", label: copy.templates },
        { href: "/saved-templates", label: copy.savedTemplates },
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

  if (isTemplateDetailPath(pathname) || isPublicInviteSharePath(pathname)) {
    return null;
  }

  const year = new Date().getFullYear();

  const renderNavLink = (href: string, label: string) => (
    <li key={href + label}>
      <Link
        href={href}
        className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
        onClick={href === "/" ? handleHomeLinkClick : undefined}
      >
        {label}
      </Link>
    </li>
  );

  const contactItems: { href: string; label: string; value: string; icon: ReactNode; external?: boolean }[] = [
    { href: siteZaloUrl, label: copy.labelZalo, value: siteContact.phoneDisplay, icon: <IconZaloBrand className="h-[1.1rem] w-[1.1rem]" />, external: true },
    ...(siteTiktokUrl
      ? [{ href: siteTiktokUrl, label: copy.labelTiktok, value: siteContact.tiktokDisplay, icon: <IconTiktokBrand className="h-[1.1rem] w-[1.1rem]" />, external: true }]
      : []),
    { href: `mailto:${siteContact.email}`, label: copy.labelEmail, value: siteContact.email, icon: <IconMail className="h-[1.1rem] w-[1.1rem]" /> },
    { href: `tel:${siteContact.phoneE164}`, label: copy.labelPhone, value: siteContact.phoneDisplay, icon: <IconPhone className="h-[1.1rem] w-[1.1rem]" /> },
  ];

  const columnTitle = "text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]";

  return (
    <footer className="relative mt-auto border-t border-[var(--color-line)] bg-[var(--color-surface-2)]">
      <div className="mx-auto w-full max-w-[88rem] px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-display text-4xl font-medium uppercase tracking-[0.16em] sm:text-5xl">{copy.brand}</p>
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
              {copy.eyebrow}
            </p>
            <p className="lux-muted mt-6 max-w-sm text-sm leading-[1.8]">{copy.body}</p>
          </div>

          <div className="lg:col-span-4">
            <p className={columnTitle}>{copy.contactTitle}</p>
            <ul className="mt-6 space-y-1">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--color-surface)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink)] transition group-hover:border-[var(--color-gold)] group-hover:text-[var(--color-gold)]">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {item.label}
                      </span>
                      <span className="block break-all text-sm font-medium">{item.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <p className={columnTitle}>{copy.navExploreTitle}</p>
              <ul className="mt-6 space-y-3.5">{exploreLinks.map(({ href, label }) => renderNavLink(href, label))}</ul>
            </div>
            <div>
              <p className={columnTitle}>{copy.navSupportTitle}</p>
              <ul className="mt-6 space-y-3.5">{supportLinks.map(({ href, label }) => renderNavLink(href, label))}</ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-muted)]">
            © {year} {copy.brand}. {copy.rights}
          </p>
          <p className="font-display text-lg italic text-[var(--color-muted)]">{copy.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
