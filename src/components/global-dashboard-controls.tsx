"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState, type MouseEvent } from "react";
import {
  useGlobalPreferences,
  type AppLanguage,
  type AppTheme,
} from "@/components/global-preferences-provider";
import HeaderAccountMenu from "@/components/header-account-menu";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            brandEyebrow: "Thiệp mời trực tuyến",
            brandName: "Lumiere",
            navHome: "Trang chủ",
            navTemplates: "Mẫu giao diện",
            navWhyUs: "Vì sao chọn chúng tôi",
            navFeatures: "Trải nghiệm",
            navPricing: "Bảng giá",
            navFeedback: "Phản hồi",
            navContact: "Liên hệ",
            navLogin: "Đăng nhập",
            lightLabel: "Trắng",
            darkLabel: "Đen",
            openMenu: "Mở menu",
            closeMenu: "Đóng menu",
            accountChipAriaSignedOut: "Đăng nhập hoặc tạo tài khoản",
          }
        : {
            brandEyebrow: "Online wedding invitations",
            brandName: "Lumiere",
            navHome: "Home",
            navTemplates: "Templates",
            navWhyUs: "Why Lumiere",
            navFeatures: "Experience",
            navPricing: "Pricing",
            navFeedback: "Feedback",
            navContact: "Contact",
            navLogin: "Login",
            lightLabel: "Light",
            darkLabel: "Dark",
            openMenu: "Open menu",
            closeMenu: "Close menu",
            accountChipAriaSignedOut: "Sign in or create an account",
          },
    [language],
  );

  const accountChipClass = `inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition hover:opacity-90 ${
    theme === "dark"
      ? "border-white/18 bg-white/8 text-white"
      : "border-[var(--color-ink)]/14 bg-[var(--color-cream)] text-[var(--color-ink)]"
  }`;

  const panelClass =
    theme === "dark"
      ? "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
      : "border-white/70 bg-white/68 text-[var(--color-ink)] shadow-[0_18px_50px_rgba(49,42,40,0.08)]";

  const groupClass =
    theme === "dark"
      ? "border-white/10 bg-white/6 text-white/72"
      : "border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-ink)]/56";

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
            : "bg-[var(--color-ink)] text-white"
          : theme === "dark"
            ? "text-white/76 hover:bg-white/8"
            : ""
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
    <div className={`overflow-visible rounded-[2rem] border px-4 py-4 backdrop-blur sm:px-5 ${panelClass}`}>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex w-full items-center gap-3 sm:gap-4">
          <Link href="/" className="min-w-0 shrink-0" onClick={handleHomeLinkClick}>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage)]">
              {copy.brandEyebrow}
            </p>
            <p className="font-display text-xl tracking-[0.12em] sm:text-2xl">
              {copy.brandName}
            </p>
          </Link>
          <nav
            className={`hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm lg:flex ${theme === "dark" ? "text-white/72" : "text-[var(--color-ink)]/70"}`}
          >
            <Link href="/" onClick={handleHomeLinkClick}>
              {copy.navHome}
            </Link>
            <Link href="/#templates">{copy.navTemplates}</Link>
            {/* <Link href="/#why-us">{copy.navWhyUs}</Link> */}
            <Link href="/#features">{copy.navFeatures}</Link>
            <Link href="/#pricing">{copy.navPricing}</Link>
            {/* <Link href="/#feedback">{copy.navFeedback}</Link> */}
            <Link href="/#contact">{copy.navContact}</Link>
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border lg:hidden ${
                theme === "dark"
                  ? "border-white/10 bg-white/6 text-white"
                  : "border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-ink)]"
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
            <div className="hidden items-center gap-2 lg:flex">{prefsControls}</div>
            {signedIn ? (
              <HeaderAccountMenu
                theme={theme}
                language={language}
                className="hidden lg:block"
              />
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
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 lg:hidden">
          {prefsControls}
          {signedIn ? (
            <HeaderAccountMenu theme={theme} language={language} />
          ) : (
            <Link
              href="/login"
              className={accountChipClass}
              aria-label={copy.accountChipAriaSignedOut}
            >
              <UserCircleIcon />
              <span className="max-w-[7.5rem] truncate sm:max-w-none">{copy.navLogin}</span>
            </Link>
          )}
        </div>
        <nav
          className={`${
            isMobileMenuOpen ? "grid" : "hidden"
          } gap-3 text-sm lg:hidden ${
            theme === "dark" ? "text-white/72" : "text-[var(--color-ink)]/70"
          }`}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Link
            href="/"
            onClick={(e) => {
              handleHomeLinkClick(e);
              setIsMobileMenuOpen(false);
            }}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navHome}
          </Link>
          <Link
            href="/#templates"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navTemplates}
          </Link>
          <Link
            href="/#why-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navWhyUs}
          </Link>
          <Link
            href="/#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navFeatures}
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navPricing}
          </Link>
          <Link
            href="/#feedback"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navFeedback}
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navContact}
          </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
