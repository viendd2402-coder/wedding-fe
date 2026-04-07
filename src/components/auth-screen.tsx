"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useAuthSession } from "@/components/auth-session";
import { IconFacebookBrand } from "@/components/icons-auth-social";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import {
  getPublicFacebookAppId,
  getPublicGoogleOAuthClientId,
  loginRequest,
  verifySocialLoginWithBackend,
} from "@/lib/auth-client";
import { navigateAfterLoginSpa } from "@/lib/auth-app-navigation";
import {
  LOGIN_PASSWORD_MIN_LENGTH,
  isValidLoginEmail,
  validateLoginDtoInput,
  type LoginFieldErrors,
} from "@/lib/login-validation";
import {
  ensureFacebookSdk,
  ensureGoogleIdentityScript,
  renderGoogleFedCmSignInButton,
  requestFacebookAccessToken,
} from "@/lib/social-oauth-browser";

type AuthMode = "login" | "register";

type AuthScreenProps = {
  mode: AuthMode;
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loginFieldErrors, setLoginFieldErrors] = useState<LoginFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const googleButtonHostRef = useRef<HTMLDivElement>(null);
  const googleIdTokenHandlerRef = useRef<(idToken: string) => void>(() => {});
  const [browserOrigin, setBrowserOrigin] = useState("");
  const [originCopiedFlash, setOriginCopiedFlash] = useState(false);
  /** Tránh redirect trong lúc hydrate (cùng ý tưởng profile-screen). */
  const [authClientReady, setAuthClientReady] = useState(false);

  const showGoogleOriginHint =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_GOOGLE_SIGNIN_SETUP_HINT === "1";

  useEffect(() => {
    setBrowserOrigin(typeof window !== "undefined" ? window.location.origin : "");
  }, []);

  useEffect(() => {
    setAuthClientReady(true);
  }, []);

  useEffect(() => {
    if (!authClientReady || mode !== "login" || !signedIn) return;
    navigateAfterLoginSpa(router, "/");
  }, [authClientReady, mode, router, signedIn]);

  useEffect(() => {
    setLoginFieldErrors({});
    setError(null);
  }, [mode]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (mode !== "login") return;

    setLoginFieldErrors({});
    const validated = validateLoginDtoInput({ email, password });
    if (!validated.ok) {
      setLoginFieldErrors(validated.errors);
      return;
    }

    setLoading(true);
    const result = await loginRequest({
      email: validated.email,
      password: validated.password,
    });

    if (!result.ok) {
      setLoading(false);
      setError(result.message);
      return;
    }

    setLoading(false);
    /* Điều hướng chỉ qua effect khi signedIn — tránh đua replace + refresh với hydrate sau F5 */
  }

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
                ? "Chào mừng trở lại"
                : "Bắt đầu cùng Lumiere",
            lead:
              mode === "login"
                ? "Đăng nhập để tiếp tục hoàn thiện website cưới của bạn."
                : "Tạo tài khoản để bắt đầu hành trình thiệp mời trực tuyến.",
            body:
              mode === "login"
                ? "Cập nhật nội dung, theo dõi chỉnh sửa và tiến độ — gọn trong một không gian."
                : "Lưu mẫu yêu thích, khởi tạo dự án và nhận thông tin bàn giao rõ ràng.",
            asideKicker: "Lumiere",
            asideTitle: "Không gian riêng cho thiệp mời trực tuyến của hai bạn.",
            email: "Email",
            password: "Mật khẩu",
            confirmPassword: "Nhập lại mật khẩu",
            forgotPassword: "Quên mật khẩu?",
            rememberMe: "Ghi nhớ đăng nhập",
            submit: mode === "login" ? "Đăng nhập" : "Tạo tài khoản",
            switchPrompt:
              mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?",
            switchAction:
              mode === "login" ? "Đăng ký ngay" : "Đăng nhập ngay",
            switchHref: mode === "login" ? "/register" : "/login",
            feature1: "Lưu mẫu giao diện bạn đã chọn",
            feature2: "Theo dõi yêu cầu chỉnh sửa và phản hồi",
            feature3: "Xem tiến độ hoàn thiện minh bạch",
            submitting: "Đang đăng nhập…",
            socialContinue: "Hoặc tiếp tục với",
            socialEmail: "Hoặc dùng email",
            socialFacebook: "Facebook",
            socialNeedApi:
              "Chưa cấu hình API. Đặt NEXT_PUBLIC_API_URL để bật đăng nhập mạng xã hội.",
            socialNeedGoogleClientId:
              "Chưa cấu hình Google: đặt NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID (OAuth 2.0 Client ID kiểu Web).",
            socialNeedFacebookAppId:
              "Chưa cấu hình Facebook: đặt NEXT_PUBLIC_FACEBOOK_APP_ID.",
            googleOrigin403Hint:
              "Nếu console báo origin is not allowed hoặc gsi/button 403: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client ID (Web) → Authorized JavaScript origins → thêm đúng origin dưới (không có / ở cuối, đúng http/https và port).",
            googleOrigin403Note127:
              "localhost và 127.0.0.1 là hai origin khác nhau — phải trùng với URL trên thanh địa chỉ.",
            googleOriginCopy: "Sao chép origin",
            googleOriginCopied: "Đã chép",
            loginEmailRequired: "Vui lòng nhập email.",
            loginEmailInvalid: "Email không hợp lệ.",
            loginPasswordRequired: "Vui lòng nhập mật khẩu.",
            loginPasswordMin: `Mật khẩu tối thiểu ${LOGIN_PASSWORD_MIN_LENGTH} ký tự.`,
          }
        : {
            backHome: "Back to home",
            badge: mode === "login" ? "Sign in" : "Create account",
            title: mode === "login" ? "Welcome back" : "Start with Lumiere",
            lead:
              mode === "login"
                ? "Sign in to continue shaping your wedding website."
                : "Create an account to begin your online invitation journey.",
            body:
              mode === "login"
                ? "Update copy, follow revisions, and see delivery progress in one calm workspace."
                : "Save favorite templates, start projects, and stay informed as your site comes together.",
            asideKicker: "Lumiere",
            asideTitle: "A private space to refine your online wedding invitation.",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm password",
            forgotPassword: "Forgot password?",
            rememberMe: "Keep me signed in",
            submit: mode === "login" ? "Sign in" : "Create account",
            switchPrompt:
              mode === "login" ? "Don't have an account?" : "Already have an account?",
            switchAction:
              mode === "login" ? "Register now" : "Sign in now",
            switchHref: mode === "login" ? "/register" : "/login",
            feature1: "Save the templates you love",
            feature2: "Follow revision requests and feedback",
            feature3: "See clear, transparent delivery progress",
            submitting: "Signing in…",
            socialContinue: "Or continue with",
            socialEmail: "Or use email",
            socialFacebook: "Facebook",
            socialNeedApi:
              "API base URL is not set. Add NEXT_PUBLIC_API_URL to enable social sign-in.",
            socialNeedGoogleClientId:
              "Google is not configured: set NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID (Web OAuth 2.0 client ID).",
            socialNeedFacebookAppId:
              "Facebook is not configured: set NEXT_PUBLIC_FACEBOOK_APP_ID.",
            googleOrigin403Hint:
              "If the console shows origin is not allowed or gsi/button returns 403: Google Cloud Console → APIs & Services → Credentials → your Web OAuth 2.0 Client → Authorized JavaScript origins → add the exact origin below (no trailing slash, correct scheme and port).",
            googleOrigin403Note127:
              "localhost and 127.0.0.1 are different origins — they must match what you see in the address bar.",
            googleOriginCopy: "Copy origin",
            googleOriginCopied: "Copied",
            loginEmailRequired: "Please enter your email.",
            loginEmailInvalid: "Please enter a valid email address.",
            loginPasswordRequired: "Please enter your password.",
            loginPasswordMin: `Password must be at least ${LOGIN_PASSWORD_MIN_LENGTH} characters.`,
          },
    [language, mode],
  );

  const resolveLoginFieldMessage = useCallback(
    (code: string | undefined): string => {
      if (!code) return "";
      if (code === "__EMAIL_REQUIRED__") return copy.loginEmailRequired;
      if (code === "__EMAIL_INVALID__") return copy.loginEmailInvalid;
      if (code === "__PASSWORD_REQUIRED__") return copy.loginPasswordRequired;
      if (code === "__PASSWORD_MIN__") return copy.loginPasswordMin;
      return code;
    },
    [copy],
  );

  const loginInputErrorRing = isDark
    ? "ring-2 ring-rose-400/45 border-rose-400/35"
    : "ring-2 ring-[var(--color-rose)]/40 border-[var(--color-rose)]/35";

  googleIdTokenHandlerRef.current = async (idToken: string) => {
    setSocialBusy(true);
    setError(null);
    try {
      const result = await verifySocialLoginWithBackend({
        provider: "google",
        idToken,
        redirectTo: "/",
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSocialBusy(false);
    }
  };

  /** Google: nút chính thức + FedCM (`use_fedcm_for_button`); Facebook giữ popup SDK. */
  useEffect(() => {
    const host = googleButtonHostRef.current;
    if (!host) return;

    const apiBase = getPublicApiBaseUrl();
    const clientId = getPublicGoogleOAuthClientId();
    if (!apiBase || !clientId) {
      host.innerHTML = "";
      return;
    }

    let cancelled = false;

    const mount = () => {
      void (async () => {
        try {
          await ensureGoogleIdentityScript();
          if (cancelled || !googleButtonHostRef.current) return;
          renderGoogleFedCmSignInButton(googleButtonHostRef.current, clientId, {
            isDark,
            locale: language === "vi" ? "vi" : "en",
            onCredential: (token) => {
              void googleIdTokenHandlerRef.current(token);
            },
          });
        } catch (e) {
          if (!cancelled) {
            setError(e instanceof Error ? e.message : String(e));
          }
        }
      })();
    };

    requestAnimationFrame(() => requestAnimationFrame(mount));

    return () => {
      cancelled = true;
      host.innerHTML = "";
    };
  }, [isDark, language]);

  const startFacebookLogin = useCallback(async () => {
    setError(null);
    if (!getPublicApiBaseUrl()) {
      setError(copy.socialNeedApi);
      return;
    }

    setSocialBusy(true);
    try {
      const appId = getPublicFacebookAppId();
      if (!appId) {
        setError(copy.socialNeedFacebookAppId);
        return;
      }
      await ensureFacebookSdk(appId);
      const accessToken = await requestFacebookAccessToken();
      const result = await verifySocialLoginWithBackend({
        provider: "facebook",
        accessToken,
        redirectTo: "/",
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSocialBusy(false);
    }
  }, [copy.socialNeedApi, copy.socialNeedFacebookAppId]);

  const formBusy = (mode === "login" && loading) || socialBusy;

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";

  const panelOuter = isDark
    ? "border border-white/[0.09] shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_32px_80px_rgba(0,0,0,0.42),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    : "border border-[var(--color-ink)]/[0.06] shadow-[0_4px_0_0_rgba(49,42,40,0.03),0_28px_70px_rgba(49,42,40,0.09),inset_0_1px_0_0_rgba(255,255,255,0.85)]";

  const panelInner = isDark
    ? "bg-[linear-gradient(168deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_38%,rgba(22,22,24,0.96)_72%)] backdrop-blur-xl"
    : "bg-[linear-gradient(168deg,rgba(255,255,255,0.98)_0%,rgba(255,252,248,0.96)_35%,rgba(247,242,236,0.92)_100%)] backdrop-blur-sm";

  const heroBanner = isDark
    ? "bg-[linear-gradient(135deg,rgba(232,196,190,0.42)_0%,rgba(125,140,121,0.24)_40%,rgba(24,24,26,0.96)_85%,#121214_100%)]"
    : "bg-[linear-gradient(135deg,rgba(214,180,174,0.58)_0%,rgba(255,245,238,0.78)_38%,rgba(252,248,242,0.96)_72%,#faf6f1_100%)]";

  const heroShine = isDark
    ? "bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.07)_48%,transparent_58%)]"
    : "bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.7)_50%,transparent_65%)]";

  const inputClass =
    `w-full rounded-2xl border px-4 py-3.5 text-[15px] outline-none transition duration-200 ` +
    `focus:border-[var(--color-rose)]/55 focus:ring-[3px] focus:ring-[var(--color-rose)]/14 ` +
    (isDark
      ? "border-white/10 bg-white/[0.05] text-white placeholder:text-white/28 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      : "border-[var(--color-ink)]/[0.07] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/30 shadow-[0_1px_2px_rgba(49,42,40,0.04)]");

  const labelClass = `text-[13px] font-semibold tracking-tight ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`;

  const featureDot =
    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-rose)] shadow-[0_0_0_3px_rgba(197,167,161,0.2)]";

  const features = [copy.feature1, copy.feature2, copy.feature3];

  return (
    <main
      className={`relative isolate min-h-screen overflow-hidden transition-colors ${
        isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(209,177,171,0.14),transparent),radial-gradient(circle_at_100%_0%,rgba(125,140,121,0.08),transparent_40%),linear-gradient(180deg,#0a0a0b,#111113)]"
            : "bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,rgba(197,167,161,0.45),transparent),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.9),transparent_45%),linear-gradient(180deg,#fffcf8,#f7f2ec)]"
        }`}
      />
      <div
        className={`pointer-events-none absolute -top-24 right-[-18%] h-72 w-72 rounded-full blur-3xl ${
          isDark ? "bg-[var(--color-rose)]/10" : "bg-white/60"
        }`}
      />
      <div
        className={`pointer-events-none absolute bottom-[-10%] left-[-12%] h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-[var(--color-sage)]/8" : "bg-[var(--color-sage)]/12"
        }`}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-lg items-center px-5 py-12 sm:max-w-2xl sm:px-8 lg:max-w-5xl lg:py-16 xl:max-w-6xl xl:px-12">
        <div className={`w-full overflow-hidden rounded-[2rem] lg:rounded-[2.25rem] ${panelOuter} ${panelInner} lg:grid lg:min-h-[min(32rem,85vh)] lg:grid-cols-[minmax(17rem,42%)_1fr]`}>
          {/* Cột thương hiệu */}
          <div className="relative flex flex-col lg:min-h-0">
            <div
              className={`relative h-40 shrink-0 overflow-hidden sm:h-44 lg:absolute lg:inset-0 lg:h-full ${heroBanner}`}
              aria-hidden="true"
            >
              <div className={`pointer-events-none absolute inset-0 ${heroShine}`} />
              <div
                className={`pointer-events-none absolute -bottom-12 left-1/2 h-28 w-[130%] -translate-x-1/2 rounded-[100%] blur-2xl ${
                  isDark ? "bg-[var(--color-rose)]/14" : "bg-white/75"
                }`}
              />
            </div>
            <div className="relative z-[1] flex flex-col justify-end px-6 pb-8 pt-4 sm:px-8 lg:flex-1 lg:justify-center lg:px-10 lg:pb-12 lg:pt-12 xl:px-12">
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
                  isDark ? "text-white/55" : "text-[var(--color-ink)]/55"
                }`}
              >
                {copy.asideKicker}
              </p>
              <h2
                className={`mt-3 font-display text-2xl leading-tight tracking-tight sm:text-3xl lg:text-[1.85rem] lg:leading-snug ${
                  isDark ? "text-white/[0.94]" : "text-[var(--color-ink)]"
                }`}
              >
                {copy.asideTitle}
              </h2>
              <ul className={`mt-6 hidden space-y-3.5 text-sm leading-relaxed lg:block ${muted}`}>
                {features.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className={featureDot} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div
            className={`border-t px-6 py-9 sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12 xl:px-14 ${
              isDark ? "border-white/[0.08]" : "border-[var(--color-ink)]/[0.07]"
            }`}
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-80 ${muted}`}
            >
              <span aria-hidden="true" className="text-base opacity-70">
                ←
              </span>
              {copy.backHome}
            </Link>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-sage)]">
              {copy.badge}
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{copy.title}</h1>
            <p className={`mt-2 text-[15px] font-medium ${isDark ? "text-white/80" : "text-[var(--color-ink)]/85"}`}>
              {copy.lead}
            </p>
            <p className={`mt-3 max-w-md text-sm leading-relaxed ${mutedSoft}`}>{copy.body}</p>

            <ul className={`mt-6 space-y-2.5 text-sm lg:hidden ${muted}`}>
              {features.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className={featureDot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/10"}`} />
                  <span
                    className={`shrink-0 text-center text-[10px] font-semibold uppercase tracking-[0.22em] ${mutedSoft}`}
                  >
                    {copy.socialContinue}
                  </span>
                  <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/10"}`} />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div
                    className={`flex min-h-[48px] w-full items-center justify-center [&>div]:w-full ${
                      formBusy ? "pointer-events-none opacity-55" : ""
                    }`}
                  >
                    <div ref={googleButtonHostRef} className="flex w-full justify-center" />
                  </div>
                  <button
                    type="button"
                    disabled={formBusy}
                    onClick={() => {
                      void startFacebookLogin();
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-transparent bg-[#1877F2] py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-55"
                  >
                    <IconFacebookBrand className="h-5 w-5 shrink-0 text-white" />
                    {copy.socialFacebook}
                  </button>
                </div>
                {showGoogleOriginHint &&
                getPublicGoogleOAuthClientId() &&
                browserOrigin ? (
                  <div
                    className={`rounded-2xl border px-3 py-2.5 text-left text-[11px] leading-snug ${
                      isDark
                        ? "border-amber-400/30 bg-amber-500/[0.12] text-amber-50/95"
                        : "border-amber-200/90 bg-amber-50/95 text-amber-950"
                    }`}
                  >
                    <p>{copy.googleOrigin403Hint}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <code
                        className={`rounded-lg px-2 py-1 font-mono text-[11px] ${
                          isDark ? "bg-black/35 text-amber-100" : "bg-white/90 text-amber-950"
                        }`}
                      >
                        {browserOrigin}
                      </code>
                      <button
                        type="button"
                        className={`shrink-0 rounded-lg px-2 py-1 text-[11px] font-semibold underline decoration-current/30 underline-offset-2 hover:opacity-90 ${
                          isDark ? "text-amber-100" : "text-amber-900"
                        }`}
                        onClick={() => {
                          void navigator.clipboard.writeText(browserOrigin).then(() => {
                            setOriginCopiedFlash(true);
                            window.setTimeout(() => setOriginCopiedFlash(false), 2000);
                          });
                        }}
                      >
                        {originCopiedFlash ? copy.googleOriginCopied : copy.googleOriginCopy}
                      </button>
                    </div>
                    <p className={`mt-1.5 ${isDark ? "text-amber-100/75" : "text-amber-900/75"}`}>
                      {copy.googleOrigin403Note127}
                    </p>
                  </div>
                ) : null}
                <div className="flex items-center gap-3 pt-1">
                  <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/10"}`} />
                  <span
                    className={`shrink-0 text-center text-[10px] font-semibold uppercase tracking-[0.22em] ${mutedSoft}`}
                  >
                    {copy.socialEmail}
                  </span>
                  <div className={`h-px flex-1 ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/10"}`} />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="auth-email">
                  {copy.email}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => {
                    const v = ev.target.value;
                    setEmail(v);
                    if (mode === "login") {
                      const t = v.trim();
                      if (t && isValidLoginEmail(t)) {
                        setLoginFieldErrors((prev) => {
                          if (!prev.email) return prev;
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                      setError(null);
                    }
                  }}
                  placeholder="name@email.com"
                  disabled={formBusy}
                  aria-invalid={mode === "login" && Boolean(loginFieldErrors.email)}
                  aria-describedby={
                    mode === "login" && loginFieldErrors.email ? "auth-email-err" : undefined
                  }
                  className={`${inputClass} mt-2 disabled:opacity-55 ${
                    mode === "login" && loginFieldErrors.email ? loginInputErrorRing : ""
                  }`.trim()}
                />
                {mode === "login" && loginFieldErrors.email ? (
                  <p
                    id="auth-email-err"
                    className="mt-1.5 text-xs text-rose-500 dark:text-rose-300"
                  >
                    {resolveLoginFieldMessage(loginFieldErrors.email)}
                  </p>
                ) : null}
              </div>
              <div>
                <label className={labelClass} htmlFor="auth-password">
                  {copy.password}
                </label>
                <input
                  id="auth-password"
                  type="password"
                  name="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(ev) => {
                    const v = ev.target.value;
                    setPassword(v);
                    if (mode === "login") {
                      if (v.length >= LOGIN_PASSWORD_MIN_LENGTH) {
                        setLoginFieldErrors((prev) => {
                          if (!prev.password) return prev;
                          const next = { ...prev };
                          delete next.password;
                          return next;
                        });
                      }
                      setError(null);
                    }
                  }}
                  placeholder="••••••••"
                  disabled={formBusy}
                  aria-invalid={mode === "login" && Boolean(loginFieldErrors.password)}
                  aria-describedby={
                    mode === "login" && loginFieldErrors.password ? "auth-password-err" : undefined
                  }
                  className={`${inputClass} mt-2 disabled:opacity-55 ${
                    mode === "login" && loginFieldErrors.password ? loginInputErrorRing : ""
                  }`.trim()}
                />
                {mode === "login" && loginFieldErrors.password ? (
                  <p
                    id="auth-password-err"
                    className="mt-1.5 text-xs text-rose-500 dark:text-rose-300"
                  >
                    {resolveLoginFieldMessage(loginFieldErrors.password)}
                  </p>
                ) : null}
              </div>
              {mode === "register" ? (
                <div>
                  <label className={labelClass} htmlFor="auth-confirm">
                    {copy.confirmPassword}
                  </label>
                  <input
                    id="auth-confirm"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(ev) => setConfirmPassword(ev.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} mt-2`}
                  />
                </div>
              ) : null}

              {error ? (
                <p
                  role="alert"
                  className={`rounded-2xl border px-4 py-3.5 text-sm ${
                    isDark
                      ? "border-red-400/30 bg-red-500/[0.1] text-red-100"
                      : "border-red-200/90 bg-red-50 text-red-900"
                  }`}
                >
                  {error}
                </p>
              ) : null}

              <div className={`flex flex-wrap items-center justify-between gap-3 text-sm ${muted}`}>
                <label className="inline-flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    className={`h-4 w-4 rounded border shadow-sm ${
                      isDark
                        ? "border-white/20 bg-white/5 accent-[var(--color-rose)]"
                        : "border-[var(--color-ink)]/15 bg-white accent-[var(--color-rose)]"
                    }`}
                    disabled={formBusy}
                  />
                  <span>{copy.rememberMe}</span>
                </label>
                {mode === "login" ? (
                  <button
                    type="button"
                    className="cursor-pointer font-medium text-[var(--color-sage)] transition hover:opacity-80"
                  >
                    {copy.forgotPassword}
                  </button>
                ) : (
                  <span className="min-w-[1px]" aria-hidden="true" />
                )}
              </div>

              <button
                type="submit"
                disabled={formBusy}
                className="btn-primary mt-1 w-full cursor-pointer rounded-full px-8 py-3.5 text-sm font-semibold shadow-[0_14px_36px_rgba(197,167,161,0.38)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-55 dark:shadow-[0_16px_40px_rgba(0,0,0,0.38)] sm:w-auto sm:min-w-[12rem]"
              >
                {mode === "login" && loading ? copy.submitting : copy.submit}
              </button>
            </form>

            <p className={`mt-8 text-sm ${muted}`}>
              {copy.switchPrompt}{" "}
              <Link
                href={copy.switchHref}
                className="font-semibold text-[var(--color-sage)] underline decoration-current/20 underline-offset-4 transition hover:decoration-current/40"
              >
                {copy.switchAction}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
