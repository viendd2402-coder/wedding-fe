"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, type MouseEvent } from "react";
import {
  useGlobalPreferences,
  type AppLanguage,
} from "@/components/global-preferences-provider";
import HeaderAccountMenu from "@/components/header-account-menu";
import { useMessages } from "@/i18n/use-messages";
import { useAuthSession } from "@/components/auth-session";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";

function UserCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-[1.1rem] w-[1.1rem] shrink-0"}
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="3.25" />
      <path d="M6.5 19.25c.84-2.8 3.53-4.5 5.5-4.5s4.66 1.7 5.5 4.5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </svg>
  );
}

export default function GlobalDashboardControls() {
  const pathname = usePathname();
  const { signedIn } = useAuthSession();
  const { language, theme, setLanguage, setTheme } = useGlobalPreferences();
  const { nav: copy, headerAccount: accountCopy } = useMessages();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const iconBtnClass =
    "inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition hover:border-[var(--color-line-strong)] hover:bg-[color-mix(in_srgb,var(--color-ink)_5%,transparent)]";

  const navLinkClass =
    "relative px-3 py-2 text-[0.84rem] font-medium tracking-[0.01em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] after:absolute after:inset-x-3 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-gold)] after:transition-transform after:duration-300 hover:after:scale-x-100";

  const mobileLinkClass = (active: boolean) =>
    `flex items-center justify-between border-b border-[var(--color-line)] py-4 font-display text-2xl transition-colors ${
      active ? "text-[var(--color-gold)]" : "text-[var(--color-ink)] hover:text-[var(--color-gold)]"
    }`;

  const closeMobile = () => setIsMobileMenuOpen(false);

  const templatesActive = pathname.startsWith("/templates");
  const homeActive = pathname === "/";
  const profileActive = pathname === "/profile";
  const myInvitationsActive = pathname === "/my-invitations";
  const savedTemplatesActive = pathname === "/saved-templates";

  /** Đang ở trang chủ: click logo / Trang chủ → về đầu trang (và bỏ hash). */
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

  const renderLanguage = (value: AppLanguage, label: string) => (
    <button
      type="button"
      onClick={() => setLanguage(value)}
      aria-pressed={language === value}
      className={`cursor-pointer rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.12em] transition ${
        language === value
          ? "bg-[var(--color-ink)] text-[var(--background)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      }`}
    >
      {label}
    </button>
  );

  const prefsControls = (
    <>
      <div className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-line)] p-1">
        {renderLanguage("vi", "VI")}
        {renderLanguage("en", "EN")}
      </div>
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={iconBtnClass}
        aria-label={isDark ? copy.lightLabel : copy.darkLabel}
        title={isDark ? copy.lightLabel : copy.darkLabel}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );

  const navItems = [
    { href: "/#templates", label: copy.navTemplates },
    { href: "/#why-us", label: copy.navFeatures },
    { href: "/#pricing", label: copy.navPricing },
    { href: "/#contact", label: copy.navContact },
  ];

  return (
    <div className="overflow-visible">
      <div className="flex h-16 items-center gap-3 sm:h-[4.5rem]">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-3"
          onClick={handleHomeLinkClick}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-gold)_55%,transparent)] font-display text-lg italic text-[var(--color-gold)] transition group-hover:bg-[var(--color-gold-soft)]"
            aria-hidden="true"
          >
            L
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-[1.35rem] font-medium tracking-[0.18em] text-[var(--color-ink)] uppercase">
              {copy.brandName}
            </span>
            <span className="mt-1 hidden text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)] sm:block">
              {copy.brandEyebrow}
            </span>
          </span>
        </Link>

        <nav
          className="mx-auto hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
          aria-label={copy.mainNavAria}
        >
          <Link href="/" className={navLinkClass} onClick={handleHomeLinkClick}>
            {copy.navHome}
          </Link>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-[1] ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">{prefsControls}</div>
          {signedIn ? (
            <HeaderAccountMenu theme={theme} />
          ) : (
            <Link
              href="/login"
              className="btn-primary hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.84rem] font-medium lg:inline-flex"
              aria-label={copy.accountChipAriaSignedOut}
            >
              <UserCircleIcon />
              <span>{copy.navLogin}</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className={`${iconBtnClass} lg:hidden`}
            aria-label={isMobileMenuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M8 16h12" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6">
            <nav className="flex flex-col" aria-label={copy.mobileMenuAria}>
              <Link
                href="/"
                className={mobileLinkClass(homeActive)}
                onClick={(e) => {
                  handleHomeLinkClick(e);
                  closeMobile();
                }}
              >
                {copy.navHome}
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileLinkClass(item.href === "/#templates" && templatesActive)}
                  onClick={closeMobile}
                >
                  {item.label}
                  <span className="text-base text-[var(--color-gold)]" aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
            {signedIn ? (
              <div className="mt-5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                {[
                  { href: "/profile", label: accountCopy.viewProfile, active: profileActive },
                  { href: "/my-invitations", label: accountCopy.myInvitations, active: myInvitationsActive },
                  { href: "/saved-templates", label: accountCopy.savedTemplates, active: savedTemplatesActive },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`rounded-full px-4 py-2.5 text-center text-sm font-medium ${
                      item.active ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">{prefsControls}</div>
              {signedIn ? null : (
                <Link
                  href="/login"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                  onClick={closeMobile}
                  aria-label={copy.accountChipAriaSignedOut}
                >
                  <UserCircleIcon />
                  <span>{copy.navLogin}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
