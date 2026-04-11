"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, type MouseEvent } from "react";
import {
  useGlobalPreferences,
  type AppLanguage,
  type AppTheme,
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
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-[1.15rem] w-[1.15rem] shrink-0"}
      aria-hidden="true"
    >
      <circle cx="12" cy="9" r="3.25" />
      <path d="M6.5 19.25c.84-2.8 3.53-4.5 5.5-4.5s4.66 1.7 5.5 4.5" />
    </svg>
  );
}

export default function GlobalDashboardControls() {
  const pathname = usePathname();
  const { signedIn } = useAuthSession();
  const { language, theme, setLanguage, setTheme } = useGlobalPreferences();
  const { nav: copy, headerAccount: accountCopy } = useMessages();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accountChipClass = `inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition hover:opacity-90 ${
    theme === "dark"
      ? "border-white/18 bg-white/8 text-white"
      : "border-[var(--color-ink)]/22 bg-white text-[var(--color-ink)] shadow-[0_1px_3px_rgba(49,42,40,0.08)] max-lg:border-[var(--color-ink)]/26 max-lg:shadow-[0_2px_8px_rgba(49,42,40,0.1)]"
  }`;

  const shellClass =
    theme === "dark"
      ? "border-white/[0.09] bg-[linear-gradient(180deg,rgba(20,20,22,0.94),rgba(12,12,14,0.9))] text-white shadow-[0_12px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.05)]"
      : "border-[var(--color-ink)]/14 bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(247,242,236,0.96))] text-[var(--color-ink)] shadow-[0_8px_28px_rgba(49,42,40,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] max-lg:border-[var(--color-ink)]/20 max-lg:bg-white max-lg:shadow-[0_4px_20px_rgba(49,42,40,0.12),0_0_0_1px_rgba(49,42,40,0.05)_inset] max-lg:backdrop-blur-md";

  const groupClass =
    theme === "dark"
      ? "border-white/12 bg-white/[0.06] text-white/78"
      : "border-[var(--color-ink)]/20 bg-white text-[var(--color-ink)]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(49,42,40,0.06)] max-lg:border-[var(--color-ink)]/24 max-lg:shadow-[0_1px_3px_rgba(49,42,40,0.08)]";

  const navLinkClass = (active: boolean) =>
    `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
      theme === "dark"
        ? active
          ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          : "text-white/72 hover:bg-white/[0.07] hover:text-white"
        : active
          ? "bg-[var(--color-ink)]/[0.08] text-[var(--color-ink)] shadow-[inset_0_0_0_1px_rgba(49,42,40,0.1)]"
          : "text-[var(--color-ink)]/75 hover:bg-[var(--color-ink)]/[0.06] hover:text-[var(--color-ink)]"
    }`;

  const mobileNavTile = (active: boolean) =>
    `flex w-full items-center justify-center rounded-xl border px-3 py-2.5 text-center text-xs font-medium transition sm:py-3 sm:text-sm ${
      theme === "dark"
        ? active
          ? "border-white/16 bg-white/14 text-white shadow-sm"
          : "border-white/10 bg-white/[0.06] text-white/85 hover:border-white/14 hover:bg-white/10"
        : active
          ? "border-[var(--color-ink)]/22 bg-[var(--color-sand)]/55 text-[var(--color-ink)] shadow-[0_2px_6px_rgba(49,42,40,0.08)]"
          : "border-[var(--color-ink)]/18 bg-white text-[var(--color-ink)] shadow-[0_1px_3px_rgba(49,42,40,0.07)] hover:border-[var(--color-ink)]/24 hover:bg-[var(--color-cream)]"
    }`;

  const closeMobile = () => setIsMobileMenuOpen(false);

  const templatesActive = pathname.startsWith("/templates");
  const homeActive = pathname === "/";
  const profileActive = pathname === "/profile";
  const myInvitationsActive = pathname === "/my-invitations";

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

  const renderOption = <T extends AppLanguage | AppTheme>(
    value: T,
    current: T,
    onSelect: (value: T) => void,
    label: string,
  ) => (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`rounded-full px-3 py-1.5 transition ${
        current === value
          ? theme === "dark"
            ? "bg-white text-[#111113] shadow-[0_6px_16px_rgba(255,255,255,0.08)]"
            : "bg-[var(--color-ink)] text-white shadow-sm"
          : theme === "dark"
            ? "text-white/76 hover:bg-white/8"
            : "text-[var(--color-ink)]/82 hover:bg-[var(--color-ink)]/[0.07]"
      }`}
    >
      {label}
    </button>
  );

  const prefsControls = (
    <>
      <div
        className={`flex min-w-0 items-center gap-2 rounded-[1.2rem] border p-1 text-xs font-medium sm:rounded-full ${groupClass}`}
      >
        <div className="inline-flex items-center gap-1">
          {renderOption("vi", language, setLanguage, "VI")}
          {renderOption("en", language, setLanguage, "EN")}
        </div>
      </div>
      <div
        className={`flex min-w-0 items-center gap-2 rounded-[1.2rem] border p-1 text-xs font-medium sm:rounded-full ${groupClass}`}
      >
        <div className="inline-flex items-center gap-1">
          {renderOption("light", theme, setTheme, copy.lightLabel)}
          {renderOption("dark", theme, setTheme, copy.darkLabel)}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`overflow-visible rounded-2xl border px-3 py-2.5 backdrop-blur-xl backdrop-saturate-150 sm:rounded-[1.35rem] sm:px-4 sm:py-3 ${shellClass}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
          onClick={handleHomeLinkClick}
        >
          <span
            className="hidden h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-[var(--color-sage)]/50 to-transparent sm:block"
            aria-hidden
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={`text-[9px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.36em] ${
                theme === "dark" ? "text-[var(--color-sage)]" : "text-[var(--color-sage)] max-lg:text-[var(--color-ink)]/55"
              }`}
            >
              {copy.brandEyebrow}
            </span>
            <span
              className={`font-display text-base tracking-[0.14em] sm:text-lg sm:tracking-[0.16em] md:text-xl md:tracking-[0.14em] ${
                theme === "dark" ? "" : "text-[var(--color-ink)] max-lg:font-medium"
              }`}
            >
              {copy.brandName}
            </span>
          </span>
        </Link>

        <nav
          className="mx-auto hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-2 lg:flex xl:gap-1"
          aria-label={copy.mainNavAria}
        >
          <Link href="/" className={navLinkClass(false)} onClick={handleHomeLinkClick}>
            {copy.navHome}
          </Link>
          <Link href="/#templates" className={navLinkClass(false)}>
            {copy.navTemplates}
          </Link>
          <Link href="/#features" className={navLinkClass(false)}>
            {copy.navFeatures}
          </Link>
          <Link href="/#pricing" className={navLinkClass(false)}>
            {copy.navPricing}
          </Link>
          <Link href="/#contact" className={navLinkClass(false)}>
            {copy.navContact}
          </Link>
        </nav>

        <div className="relative z-[1] ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">{prefsControls}</div>
          {signedIn ? (
            <HeaderAccountMenu theme={theme} />
          ) : (
            <Link
              href="/login"
              className={`${accountChipClass} hidden lg:inline-flex`}
              aria-label={copy.accountChipAriaSignedOut}
            >
              <UserCircleIcon />
              <span className="max-w-[7.5rem] truncate sm:max-w-none">{copy.navLogin}</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition lg:hidden ${
              theme === "dark"
                ? "border-white/12 bg-white/[0.07] text-white hover:bg-white/12"
                : "border-[var(--color-ink)]/22 bg-white text-[var(--color-ink)] shadow-[0_2px_6px_rgba(49,42,40,0.1)] hover:border-[var(--color-ink)]/28 hover:bg-[var(--color-cream)]"
            }`}
            aria-label={isMobileMenuOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out lg:hidden ${
          isMobileMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`mt-3 border-t pt-3 sm:mt-4 sm:pt-4 ${
              theme === "dark" ? "border-white/10" : "border-[var(--color-ink)]/14 max-lg:border-[var(--color-ink)]/18"
            }`}
          >
            <nav
              className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2"
              aria-label={copy.mobileMenuAria}
            >
              <Link
                href="/"
                className={mobileNavTile(homeActive)}
                onClick={(e) => {
                  handleHomeLinkClick(e);
                  closeMobile();
                }}
              >
                {copy.navHome}
              </Link>
              <Link href="/#templates" className={mobileNavTile(templatesActive)} onClick={closeMobile}>
                {copy.navTemplates}
              </Link>
              <Link href="/#features" className={mobileNavTile(false)} onClick={closeMobile}>
                {copy.navFeatures}
              </Link>
              <Link href="/#pricing" className={mobileNavTile(false)} onClick={closeMobile}>
                {copy.navPricing}
              </Link>
              <Link
                href="/#contact"
                className={`${mobileNavTile(false)} min-[400px]:col-span-2`}
                onClick={closeMobile}
              >
                {copy.navContact}
              </Link>
            </nav>
            {signedIn ? (
              <div
                className={`mt-4 grid grid-cols-1 gap-2 border-t pt-4 min-[400px]:grid-cols-2 ${
                  theme === "dark" ? "border-white/10" : "border-[var(--color-ink)]/14 max-lg:border-[var(--color-ink)]/18"
                }`}
              >
                <Link
                  href="/profile"
                  className={mobileNavTile(profileActive)}
                  onClick={closeMobile}
                >
                  {accountCopy.viewProfile}
                </Link>
                <Link
                  href="/my-invitations"
                  className={mobileNavTile(myInvitationsActive)}
                  onClick={closeMobile}
                >
                  {accountCopy.myInvitations}
                </Link>
              </div>
            ) : null}
            <div
              className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                theme === "dark" ? "border-white/10" : "border-[var(--color-ink)]/14 max-lg:border-[var(--color-ink)]/18"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">{prefsControls}</div>
              {signedIn ? null : (
                <Link
                  href="/login"
                  className={accountChipClass}
                  onClick={closeMobile}
                  aria-label={copy.accountChipAriaSignedOut}
                >
                  <UserCircleIcon />
                  <span className="max-w-[10rem] truncate">{copy.navLogin}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
