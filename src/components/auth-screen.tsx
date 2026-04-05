"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";

type AuthMode = "login" | "register";

type AuthScreenProps = {
  mode: AuthMode;
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            backHome: "Quay về trang chủ",
            badge:
              mode === "login"
                ? "Đăng nhập tài khoản"
                : "Tạo tài khoản mới",
            title:
              mode === "login"
                ? "Đăng nhập để tiếp tục hoàn thiện website cưới của bạn."
                : "Tạo tài khoản để bắt đầu hành trình thiệp mời trực tuyến.",
            body:
              mode === "login"
                ? "Cập nhật nội dung, theo dõi yêu cầu chỉnh sửa và xem tiến độ hoàn thiện — tất cả tại một nơi."
                : "Lưu mẫu yêu thích, khởi tạo dự án mới và nhận thông tin tiến độ bàn giao rõ ràng.",
            email: "Email",
            password: "Mật khẩu",
            confirmPassword: "Nhập lại mật khẩu",
            forgotPassword: "Quên mật khẩu?",
            rememberMe: "Ghi nhớ tôi",
            submit: mode === "login" ? "Đăng nhập" : "Tạo tài khoản",
            switchPrompt:
              mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?",
            switchAction:
              mode === "login" ? "Đăng ký ngay" : "Đăng nhập ngay",
            switchHref: mode === "login" ? "/register" : "/login",
            feature1: "Lưu mẫu giao diện bạn đã chọn",
            feature2: "Theo dõi yêu cầu chỉnh sửa và phản hồi",
            feature3: "Xem tiến độ hoàn thiện minh bạch",
          }
        : {
            backHome: "Back to home",
            badge: mode === "login" ? "Sign in" : "Create account",
            title:
              mode === "login"
                ? "Sign in to continue shaping your wedding website."
                : "Create an account to begin your online invitation journey.",
            body:
              mode === "login"
                ? "Update your copy, follow revision requests, and see delivery progress—all in one calm workspace."
                : "Save favorite templates, start new projects, and stay informed as your site comes together.",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm password",
            forgotPassword: "Forgot password?",
            rememberMe: "Remember me",
            submit: mode === "login" ? "Sign in" : "Create account",
            switchPrompt:
              mode === "login" ? "Don't have an account?" : "Already have an account?",
            switchAction:
              mode === "login" ? "Register now" : "Sign in now",
            switchHref: mode === "login" ? "/register" : "/login",
            feature1: "Save the templates you love",
            feature2: "Follow revision requests and feedback",
            feature3: "See clear, transparent delivery progress",
          },
    [language, mode],
  );

  const shellClassName = isDark
    ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
    : "border border-white/70 bg-white/70 text-[var(--color-ink)] shadow-[0_24px_70px_rgba(49,42,40,0.08)]";

  const inputClassName = isDark
    ? "border-white/10 bg-white/6 text-white placeholder:text-white/35"
    : "border-[var(--color-ink)]/10 bg-[var(--color-cream)] text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/35";

  const mutedTextClassName = isDark ? "text-white/68" : "text-[var(--color-ink)]/72";
  const asideClassName = isDark
    ? "border border-white/10 bg-[radial-gradient(circle_at_top,rgba(209,177,171,0.12),transparent_45%),rgba(255,255,255,0.04)]"
    : "border border-[var(--color-ink)]/8 bg-[linear-gradient(180deg,rgba(197,167,161,0.16),rgba(255,255,255,0.84))]";

  return (
    <main className={`relative isolate min-h-screen overflow-hidden transition-colors ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}>
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_top,_rgba(209,177,171,0.12),_transparent_32%),linear-gradient(135deg,_rgba(9,9,9,0.96),_rgba(17,17,19,0.94))]"
            : "bg-[radial-gradient(circle_at_top,_rgba(197,167,161,0.35),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.82),_rgba(233,221,209,0.88))]"
        }`}
      />
      <div className={`absolute -top-24 right-[-100px] h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-white/8" : "bg-white/40"}`} />
      <div
        className={`absolute bottom-[-30px] left-[-60px] h-64 w-64 rounded-full blur-3xl ${
          isDark ? "bg-[rgba(155,168,150,0.08)]" : "bg-[rgba(125,140,121,0.14)]"
        }`}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className={`rounded-[2.5rem] p-8 sm:p-10 lg:p-12 ${shellClassName}`}>
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-sm ${mutedTextClassName}`}
            >
              <span aria-hidden="true">←</span>
              {copy.backHome}
            </Link>

            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
              {copy.badge}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-none sm:text-6xl">
              {copy.title}
            </h1>
            <p className={`mt-6 max-w-xl text-base leading-8 ${mutedTextClassName}`}>
              {copy.body}
            </p>

            <form className="mt-10 grid gap-4">
              <input
                type="email"
                placeholder={copy.email}
                className={`rounded-2xl border px-5 py-4 outline-none transition ${inputClassName}`}
              />
              <input
                type="password"
                placeholder={copy.password}
                className={`rounded-2xl border px-5 py-4 outline-none transition ${inputClassName}`}
              />
              {mode === "register" ? (
                <input
                  type="password"
                  placeholder={copy.confirmPassword}
                  className={`rounded-2xl border px-5 py-4 outline-none transition ${inputClassName}`}
                />
              ) : null}

              <div className={`flex items-center justify-between gap-4 text-sm ${mutedTextClassName}`}>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-current" />
                  <span>{copy.rememberMe}</span>
                </label>
                {mode === "login" ? (
                  <button type="button" className="text-[var(--color-sage)] transition hover:opacity-80">
                    {copy.forgotPassword}
                  </button>
                ) : <span />}
              </div>

              <button
                type="button"
                className="btn-primary mt-2 inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-medium transition"
              >
                {copy.submit}
              </button>
            </form>

            <p className={`mt-8 text-sm ${mutedTextClassName}`}>
              {copy.switchPrompt}{" "}
              <Link href={copy.switchHref} className="font-medium text-[var(--color-sage)]">
                {copy.switchAction}
              </Link>
            </p>
          </section>

          <aside className={`rounded-[2.5rem] p-8 sm:p-10 lg:p-12 ${asideClassName}`}>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">
              Lumiere account
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {language === "vi"
                ? "Không gian riêng để hoàn thiện thiệp mời trực tuyến của hai bạn."
                : "A private space to refine your online wedding invitation."}
            </h2>
            <div className="mt-8 space-y-4">
              {[copy.feature1, copy.feature2, copy.feature3].map((item) => (
                <div
                  key={item}
                  className={`rounded-[1.75rem] px-5 py-4 text-sm ${
                    isDark
                      ? "bg-[rgba(255,255,255,0.05)] text-white/78"
                      : "bg-white/72 text-[var(--color-ink)]/78"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
