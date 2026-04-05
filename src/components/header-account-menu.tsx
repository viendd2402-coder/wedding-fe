"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useLogout } from "@/components/auth-session";
import type {
  AppLanguage,
  AppTheme,
} from "@/components/global-preferences-provider";
import {
  LUMIERE_AUTH_CHANGE_EVENT,
  LUMIERE_PROFILE_UPDATED_EVENT,
  fetchProfileRequest,
} from "@/lib/auth-client";

type HeaderAccountMenuProps = {
  theme: AppTheme;
  language: AppLanguage;
  className?: string;
};

export default function HeaderAccountMenu({
  theme,
  language,
  className = "",
}: HeaderAccountMenuProps) {
  const logout = useLogout();
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initial, setInitial] = useState("?");

  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            openMenu: "Menu tài khoản",
            viewProfile: "Xem hồ sơ",
            logout: "Đăng xuất",
          }
        : {
            openMenu: "Account menu",
            viewProfile: "View profile",
            logout: "Log out",
          },
    [language],
  );

  const loadAvatar = useCallback(async () => {
    const r = await fetchProfileRequest();
    if (!r.ok) return;
    setAvatarUrl(r.profile.avatarUrl);
    const letter =
      r.profile.name?.trim()?.[0] ?? r.profile.email?.trim()?.[0] ?? "?";
    setInitial(letter.toUpperCase());
  }, []);

  useEffect(() => {
    void loadAvatar();
  }, [loadAvatar]);

  useEffect(() => {
    const onUpdated = () => void loadAvatar();
    window.addEventListener(LUMIERE_PROFILE_UPDATED_EVENT, onUpdated);
    window.addEventListener(LUMIERE_AUTH_CHANGE_EVENT, onUpdated);
    return () => {
      window.removeEventListener(LUMIERE_PROFILE_UPDATED_EVENT, onUpdated);
      window.removeEventListener(LUMIERE_AUTH_CHANGE_EVENT, onUpdated);
    };
  }, [loadAvatar]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const btnClass = `relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border transition ${
    isDark
      ? "border-white/16 bg-white/[0.08] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:border-white/24 hover:bg-white/[0.12]"
      : "border-[var(--color-ink)]/10 bg-white text-[var(--color-ink)] shadow-[0_4px_14px_rgba(49,42,40,0.08)] hover:border-[var(--color-ink)]/16"
  } ${open ? (isDark ? "ring-2 ring-white/25" : "ring-2 ring-[var(--color-rose)]/35") : ""}`;

  const panelClass = isDark
    ? "border border-white/12 bg-[linear-gradient(180deg,rgba(28,28,30,0.98),rgba(18,18,20,0.98))] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
    : "border border-[var(--color-ink)]/8 bg-white text-[var(--color-ink)] shadow-[0_20px_48px_rgba(49,42,40,0.12)]";

  return (
    <div className={`relative ${className}`.trim()} ref={wrapRef}>
      <button
        type="button"
        className={btnClass}
        aria-label={copy.openMenu}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-lg leading-none">{initial}</span>
        )}
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-orientation="vertical"
          className={`absolute right-0 z-[100] mt-2 min-w-[11.5rem] overflow-hidden rounded-2xl py-1.5 ${panelClass}`}
        >
          <Link
            role="menuitem"
            href="/profile"
            className={`block px-4 py-2.5 text-sm font-medium transition ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--color-cream)]"
            }`}
            onClick={() => setOpen(false)}
          >
            {copy.viewProfile}
          </Link>
          <button
            role="menuitem"
            type="button"
            className={`w-full px-4 py-2.5 text-left text-sm font-medium transition ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--color-cream)]"
            }`}
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            {copy.logout}
          </button>
        </div>
      ) : null}
    </div>
  );
}
