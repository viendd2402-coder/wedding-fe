"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useGlobalPreferences,
  type AppLanguage,
  type AppTheme,
} from "@/components/global-preferences-provider";

export default function GlobalDashboardControls() {
  const { language, theme, setLanguage, setTheme } = useGlobalPreferences();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            brandEyebrow: "Studio Website Cưới",
            brandName: "Lumiere",
            navHome: "Trang chủ",
            navTemplates: "Mẫu giao diện",
            navFeatures: "Tính năng",
            navPricing: "Bảng giá",
            navContact: "Liên hệ",
            navLogin: "Đăng nhập",
            lightLabel: "Trắng",
            darkLabel: "Đen",
            openMenu: "Mở menu",
            closeMenu: "Đóng menu",
          }
        : {
            brandEyebrow: "Wedding Website Studio",
            brandName: "Lumiere",
            navHome: "Home",
            navTemplates: "Templates",
            navFeatures: "Features",
            navPricing: "Pricing",
            navContact: "Contact",
            navLogin: "Login",
            lightLabel: "Light",
            darkLabel: "Dark",
            openMenu: "Open menu",
            closeMenu: "Close menu",
          },
    [language],
  );

  const panelClass =
    theme === "dark"
      ? "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
      : "border-white/70 bg-white/68 text-[var(--color-ink)] shadow-[0_18px_50px_rgba(49,42,40,0.08)]";

  const groupClass =
    theme === "dark"
      ? "border-white/10 bg-white/6 text-white/72"
      : "border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-ink)]/56";

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

  return (
    <div className={`rounded-[2rem] border px-4 py-4 backdrop-blur sm:px-5 ${panelClass}`}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 xl:flex-1">
          <div className="flex items-start justify-between gap-4 lg:items-center">
            <Link href="/" className="min-w-0 shrink-0">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--color-sage)]">
                {copy.brandEyebrow}
              </p>
              <p className="font-display text-xl tracking-[0.12em] sm:text-2xl">
                {copy.brandName}
              </p>
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
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
            </div>
            <nav className={`hidden items-center gap-6 text-sm lg:flex ${theme === "dark" ? "text-white/72" : "text-[var(--color-ink)]/70"}`}>
              <Link href="/">{copy.navHome}</Link>
              <Link href="/#templates">{copy.navTemplates}</Link>
              <Link href="/#features">{copy.navFeatures}</Link>
              <Link href="/#pricing">{copy.navPricing}</Link>
              <Link href="/#contact">{copy.navContact}</Link>
              <Link
                href="/login"
                className={`rounded-full px-4 py-2 ${
                  theme === "dark"
                    ? "!bg-white text-[#111113]"
                    : "bg-[var(--color-ink)] !text-white"
                }`}
                style={theme === "dark" ? { WebkitTextFillColor: "#111113" } : undefined}
              >
                {copy.navLogin}
              </Link>
            </nav>
          </div>
        </div>
        <div className="hidden gap-2 sm:grid-cols-2 lg:hidden xl:flex xl:flex-wrap xl:justify-end">
          <div className={`flex min-w-0 items-center gap-2 rounded-[1.2rem] border p-1 text-xs font-medium sm:rounded-full ${groupClass}`}>
            <div className="inline-flex items-center gap-1">
              {renderOption("vi", language, setLanguage, "VI")}
              {renderOption("en", language, setLanguage, "EN")}
            </div>
          </div>
          <div className={`flex min-w-0 items-center gap-2 rounded-[1.2rem] border p-1 text-xs font-medium sm:rounded-full ${groupClass}`}>
            <div className="inline-flex items-center gap-1">
              {renderOption("light", theme, setTheme, copy.lightLabel)}
              {renderOption("dark", theme, setTheme, copy.darkLabel)}
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex xl:hidden">
          <div className={`flex min-w-0 items-center gap-2 rounded-full border p-1 text-xs font-medium ${groupClass}`}>
            <div className="inline-flex items-center gap-1">
              {renderOption("vi", language, setLanguage, "VI")}
              {renderOption("en", language, setLanguage, "EN")}
            </div>
          </div>
          <div className={`flex min-w-0 items-center gap-2 rounded-full border p-1 text-xs font-medium ${groupClass}`}>
            <div className="inline-flex items-center gap-1">
              {renderOption("light", theme, setTheme, copy.lightLabel)}
              {renderOption("dark", theme, setTheme, copy.darkLabel)}
            </div>
          </div>
        </div>
        <nav
          className={`${
            isMobileMenuOpen ? "grid" : "hidden"
          } gap-3 text-sm lg:hidden ${
            theme === "dark" ? "text-white/72" : "text-[var(--color-ink)]/70"
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className={`flex items-center justify-center rounded-[1.2rem] border p-1 text-xs font-medium ${groupClass}`}>
              <div className="inline-flex items-center gap-1">
                {renderOption("vi", language, setLanguage, "VI")}
                {renderOption("en", language, setLanguage, "EN")}
              </div>
            </div>
            <div className={`flex items-center justify-center rounded-[1.2rem] border p-1 text-xs font-medium ${groupClass}`}>
              <div className="inline-flex items-center gap-1">
                {renderOption("light", theme, setTheme, copy.lightLabel)}
                {renderOption("dark", theme, setTheme, copy.darkLabel)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
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
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`rounded-[1rem] px-3 py-2 text-center ${theme === "dark" ? "bg-white/6" : "bg-[var(--color-cream)]"}`}
          >
            {copy.navContact}
          </Link>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-primary rounded-[1rem] px-3 py-2 text-center"
          >
            {copy.navLogin}
          </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
