"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLogout } from "@/components/auth-session";
import type { AppTheme } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import {
  LUMIERE_AUTH_CHANGE_EVENT,
  LUMIERE_PROFILE_UPDATED_EVENT,
  fetchProfileRequest,
  getAuthSessionMarker,
} from "@/lib/auth-client";

type HeaderAccountMenuProps = {
  theme: AppTheme;
  className?: string;
};

export default function HeaderAccountMenu({
  theme,
  className = "",
}: HeaderAccountMenuProps) {
  const logout = useLogout();
  const { headerAccount: copy } = useMessages();
  const menuId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initial, setInitial] = useState("?");

  const isDark = theme === "dark";

  const syncAccountChip = useCallback(async () => {
    if (!getAuthSessionMarker()) {
      setAvatarUrl(null);
      setInitial("?");
      return;
    }
    const r = await fetchProfileRequest();
    if (!r.ok) return;
    setAvatarUrl(r.profile.avatarUrl);
    const letter =
      r.profile.name?.trim()?.[0] ?? r.profile.email?.trim()?.[0] ?? "?";
    setInitial(letter.toUpperCase());
  }, []);

  useEffect(() => {
    void syncAccountChip();
  }, [syncAccountChip]);

  useEffect(() => {
    const onUpdated = () => void syncAccountChip();
    window.addEventListener(LUMIERE_PROFILE_UPDATED_EVENT, onUpdated);
    window.addEventListener(LUMIERE_AUTH_CHANGE_EVENT, onUpdated);
    return () => {
      window.removeEventListener(LUMIERE_PROFILE_UPDATED_EVENT, onUpdated);
      window.removeEventListener(LUMIERE_AUTH_CHANGE_EVENT, onUpdated);
    };
  }, [syncAccountChip]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const btnClass = `relative flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center overflow-hidden rounded-full border transition sm:h-10 sm:w-10 ${
    isDark
      ? "border-white/16 bg-white/[0.08] text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:border-white/24 hover:bg-white/[0.12]"
      : "border-[var(--color-ink)]/16 bg-white text-[var(--color-ink)] shadow-[0_2px_8px_rgba(49,42,40,0.1)] hover:border-[var(--color-ink)]/22 max-lg:border-[var(--color-ink)]/22 max-lg:shadow-[0_3px_12px_rgba(49,42,40,0.14)]"
  } ${open ? (isDark ? "ring-2 ring-white/25" : "ring-2 ring-[var(--color-rose)]/45") : ""}`;

  const panelClass = isDark
    ? "border border-white/12 bg-[linear-gradient(180deg,rgba(28,28,30,0.98),rgba(18,18,20,0.98))] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
    : "border border-[var(--color-ink)]/14 bg-white text-[var(--color-ink)] shadow-[0_16px_40px_rgba(49,42,40,0.14)] max-lg:border-[var(--color-ink)]/18 max-lg:shadow-[0_12px_32px_rgba(49,42,40,0.16)]";

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
          className={`absolute right-0 z-[120] mt-2 min-w-[15.5rem] overflow-hidden rounded-2xl py-1.5 ${panelClass}`}
        >
          <Link
            role="menuitem"
            href="/profile"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--color-cream)]"
            }`}
            onClick={() => setOpen(false)}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                isDark
                  ? "border-white/10 bg-white/[0.06] text-white/75"
                  : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/80 text-[var(--color-ink)]/70"
              }`}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <circle cx="12" cy="9" r="3.25" />
                <path d="M6.5 19.25c.84-2.8 3.53-4.5 5.5-4.5s4.66 1.7 5.5 4.5" />
              </svg>
            </span>
            <span className="min-w-0 leading-snug">{copy.viewProfile}</span>
          </Link>
          <Link
            role="menuitem"
            href="/my-invitations"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--color-cream)]"
            }`}
            onClick={() => setOpen(false)}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                isDark
                  ? "border-white/10 bg-white/[0.06] text-[var(--color-rose)]/85"
                  : "border-[var(--color-ink)]/10 bg-[var(--color-rose)]/[0.08] text-[var(--color-rose)]"
              }`}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M4 7.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-10Z" />
                <path d="M8 5.5V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5" />
                <path d="M4 9.5h16" />
              </svg>
            </span>
            <span className="min-w-0 leading-snug">{copy.myInvitations}</span>
          </Link>
          <button
            role="menuitem"
            type="button"
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium transition ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--color-cream)]"
            }`}
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
                isDark
                  ? "border-white/10 bg-white/[0.06] text-white/55"
                  : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/80 text-[var(--color-ink)]/55"
              }`}
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </span>
            <span className="leading-snug">{copy.logout}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
