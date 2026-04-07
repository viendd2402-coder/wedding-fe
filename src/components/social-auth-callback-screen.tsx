"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuthSession } from "@/components/auth-session";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { navigateAfterLoginSpa } from "@/lib/auth-app-navigation";
import { completeSocialAuthFromLocation } from "@/lib/auth-client";

export default function SocialAuthCallbackScreen() {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const [error, setError] = useState<string | null>(null);
  /** Tránh replace trong lúc hydrate; đồng bộ với auth-screen (email). */
  const [authClientReady, setAuthClientReady] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            title: "Đang hoàn tất đăng nhập",
            subtitle: "Vui lòng đợi trong giây lát…",
            failedTitle: "Không thể đăng nhập mạng xã hội",
            backLogin: "Quay lại đăng nhập",
          }
        : {
            title: "Finishing sign in",
            subtitle: "Please wait a moment…",
            failedTitle: "Social sign-in failed",
            backLogin: "Back to sign in",
          },
    [language],
  );

  useEffect(() => {
    setAuthClientReady(true);
  }, []);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const result = await completeSocialAuthFromLocation(
        window.location.search,
        window.location.hash,
      );
      if (!mounted) return;
      if (result.ok) {
        setPendingRedirect(result.redirectTo);
        return;
      }
      setError(result.message);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!authClientReady || !signedIn || pendingRedirect == null) return;
    navigateAfterLoginSpa(router, pendingRedirect);
  }, [authClientReady, pendingRedirect, router, signedIn]);

  return (
    <main
      className={`flex min-h-[70vh] items-center justify-center px-6 py-14 ${
        isDark ? "bg-[#090909] text-white" : "bg-[var(--color-cream)] text-[var(--color-ink)]"
      }`}
    >
      <section
        className={`w-full max-w-md rounded-3xl border px-6 py-8 text-center shadow-xl ${
          isDark
            ? "border-white/10 bg-white/[0.04]"
            : "border-[var(--color-ink)]/10 bg-white"
        }`}
      >
        <h1 className="font-display text-3xl tracking-tight">
          {error ? copy.failedTitle : copy.title}
        </h1>
        <p className={`mt-3 text-sm ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
          {error ?? copy.subtitle}
        </p>
        {error ? (
          <Link
            href="/login"
            className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
          >
            {copy.backLogin}
          </Link>
        ) : null}
      </section>
    </main>
  );
}
