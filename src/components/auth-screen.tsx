"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useAuthSession } from "@/components/auth-session";
import { FullscreenLoading } from "@/components/common/fullscreen-loading";
import { IconFacebookBrand } from "@/components/icons-auth-social";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import {
  forgotPasswordRequest,
  getPublicFacebookAppId,
  getPublicGoogleOAuthClientId,
  loginRequest,
  registerRequest,
  verifySocialLoginWithBackend,
} from "@/lib/auth-client";
import { navigateAfterLoginSpa } from "@/lib/auth-app-navigation";
import { getAuthScreenCopy } from "@/i18n/messages/auth";
import {
  LOGIN_PASSWORD_MIN_LENGTH,
  isValidLoginEmail,
  validateLoginDtoInput,
} from "@/lib/login-validation";
import {
  ensureFacebookSdk,
  ensureGoogleIdentityScript,
  renderGoogleFedCmSignInButton,
  requestFacebookAccessToken,
} from "@/lib/social-oauth-browser";

type AuthMode = "login" | "register" | "forgot";

type AuthScreenProps = {
  mode: AuthMode;
};
type AuthFieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const PASSWORD_MAX_LENGTH = 255;
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [registerToast, setRegisterToast] = useState<string | null>(null);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [socialBusy, setSocialBusy] = useState(false);
  const googleButtonHostRef = useRef<HTMLDivElement>(null);
  const googleIdTokenHandlerRef = useRef<(idToken: string) => void>(() => {});
  /** Tránh redirect trong lúc hydrate (cùng ý tưởng profile-screen). */
  const [authClientReady, setAuthClientReady] = useState(false);

  useEffect(() => {
    setAuthClientReady(true);
  }, []);

  useEffect(() => {
    if (!authClientReady || mode !== "login" || !signedIn) return;
    navigateAfterLoginSpa(router, "/");
  }, [authClientReady, mode, router, signedIn]);

  useEffect(() => {
    setFieldErrors({});
    setError(null);
    setRegisterToast(null);
    setForgotMessage(null);
  }, [mode]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setRegisterToast(null);

    setFieldErrors({});
    if (mode === "login") {
      const validated = validateLoginDtoInput({ email, password });
      if (!validated.ok) {
        setFieldErrors(validated.errors);
        return;
      }

      setLoading(true);
      const result = await loginRequest({
        email: validated.email,
        password: validated.password,
      });

      if (!result.ok) {
        setLoading(false);
        setError(
          result.status === 0
            ? copy.authNetworkError
            : result.status === 401
              ? copy.loginFailedCredentials
              : copy.authRequestFailed,
        );
        return;
      }

      setLoading(false);
      /* Điều hướng chỉ qua effect khi signedIn — tránh đua replace + refresh với hydrate sau F5 */
      return;
    }

    const registerErrors: AuthFieldErrors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      registerErrors.email = "__EMAIL_REQUIRED__";
    } else if (!isValidLoginEmail(trimmedEmail)) {
      registerErrors.email = "__EMAIL_INVALID__";
    }
    if (!password) {
      registerErrors.password = "__PASSWORD_REQUIRED__";
    } else if (password.length < LOGIN_PASSWORD_MIN_LENGTH) {
      registerErrors.password = "__PASSWORD_MIN__";
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      registerErrors.password = "__PASSWORD_MAX__";
    }
    if (!confirmPassword) {
      registerErrors.confirmPassword = "__PASSWORD_CONFIRM_REQUIRED__";
    } else if (confirmPassword.length < LOGIN_PASSWORD_MIN_LENGTH) {
      registerErrors.confirmPassword = "__PASSWORD_CONFIRM_MIN__";
    } else if (confirmPassword.length > PASSWORD_MAX_LENGTH) {
      registerErrors.confirmPassword = "__PASSWORD_CONFIRM_MAX__";
    } else if (confirmPassword !== password) {
      registerErrors.confirmPassword = "__PASSWORD_CONFIRM_MISMATCH__";
    }

    if (Object.keys(registerErrors).length > 0) {
      setFieldErrors(registerErrors);
      return;
    }

    setLoading(true);
    const registerResult = await registerRequest({
      email: trimmedEmail,
      password,
      passwordConfirmation: confirmPassword,
    });

    if (!registerResult.ok) {
      setLoading(false);
      setError(registerResult.status === 0 ? copy.authNetworkError : copy.registerFailedGeneric);
      return;
    }

    const loginAfterRegister = await loginRequest({
      email: trimmedEmail,
      password,
    });
    setLoading(false);

    if (!loginAfterRegister.ok) {
      setError(
        loginAfterRegister.status === 0
          ? copy.authNetworkError
          : loginAfterRegister.status === 401
            ? copy.loginFailedCredentials
            : copy.authRequestFailed,
      );
      return;
    }

    navigateAfterLoginSpa(router, "/");
  }

  const copy = useMemo(
    () => getAuthScreenCopy(language, mode, LOGIN_PASSWORD_MIN_LENGTH),
    [language, mode],
  );

  const handleForgotPassword = useCallback(async () => {
    const trimmedEmail = email.trim();
    setError(null);
    setForgotMessage(null);
    setFieldErrors((prev) => {
      if (!prev.email) return prev;
      const next = { ...prev };
      delete next.email;
      return next;
    });
    if (!trimmedEmail) {
      setFieldErrors((prev) => ({ ...prev, email: "__EMAIL_REQUIRED__" }));
      return;
    }
    if (!isValidLoginEmail(trimmedEmail)) {
      setFieldErrors((prev) => ({ ...prev, email: "__EMAIL_INVALID__" }));
      return;
    }

    setLoading(true);
    const result = await forgotPasswordRequest({ email: trimmedEmail });
    setLoading(false);
    if (!result.ok) {
      setError(result.status === 0 ? copy.authNetworkError : copy.forgotFailedGeneric);
      return;
    }
    setForgotMessage(copy.forgotSuccessGeneric);
  }, [
    copy.authNetworkError,
    copy.forgotFailedGeneric,
    copy.forgotSuccessGeneric,
    email,
  ]);

  const resolveLoginFieldMessage = useCallback(
    (code: string | undefined): string => {
      if (!code) return "";
      if (code === "__EMAIL_REQUIRED__") return copy.loginEmailRequired;
      if (code === "__EMAIL_INVALID__") return copy.loginEmailInvalid;
      if (code === "__PASSWORD_REQUIRED__") return copy.loginPasswordRequired;
      if (code === "__PASSWORD_MIN__") return copy.loginPasswordMin;
      if (code === "__PASSWORD_MAX__") return copy.registerPasswordMax;
      if (code === "__PASSWORD_CONFIRM_REQUIRED__") return copy.registerPasswordConfirmationRequired;
      if (code === "__PASSWORD_CONFIRM_MIN__") return copy.registerPasswordConfirmationMin;
      if (code === "__PASSWORD_CONFIRM_MAX__") return copy.registerPasswordConfirmationMax;
      if (code === "__PASSWORD_CONFIRM_MISMATCH__") return copy.registerPasswordConfirmationMismatch;
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
        setError(copy.socialLoginFailed);
        return;
      }
    } catch {
      setError(copy.socialLoginFailed);
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
        setError(copy.socialLoginFailed);
        return;
      }
    } catch {
      setError(copy.socialLoginFailed);
    } finally {
      setSocialBusy(false);
    }
  }, [copy.socialLoginFailed, copy.socialNeedApi, copy.socialNeedFacebookAppId]);

  const formBusy = loading || socialBusy;
  const inForgotView = mode === "forgot";

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";
  const errorCardClass = isDark
    ? "border-red-400/35 bg-[linear-gradient(140deg,rgba(248,113,113,0.2)_0%,rgba(239,68,68,0.08)_55%,rgba(127,29,29,0.2)_100%)] text-red-50 shadow-[0_14px_34px_rgba(127,29,29,0.28)]"
    : "border-red-200/90 bg-[linear-gradient(140deg,rgba(254,226,226,0.92)_0%,rgba(254,242,242,0.96)_100%)] text-red-900 shadow-[0_10px_24px_rgba(153,27,27,0.12)]";
  const successCardClass = isDark
    ? "border-emerald-400/30 bg-[linear-gradient(140deg,rgba(16,185,129,0.2)_0%,rgba(16,185,129,0.08)_58%,rgba(6,78,59,0.2)_100%)] text-emerald-50 shadow-[0_12px_30px_rgba(6,95,70,0.3)]"
    : "border-emerald-200 bg-[linear-gradient(140deg,rgba(236,253,245,0.95)_0%,rgba(240,253,250,0.98)_100%)] text-emerald-900 shadow-[0_10px_22px_rgba(6,95,70,0.1)]";

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
      <FullscreenLoading show={formBusy} isDark={isDark} label={copy.submitting} />
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
            <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
              {inForgotView ? copy.forgotTitle : copy.title}
            </h1>
            <p className={`mt-2 text-[15px] font-medium ${isDark ? "text-white/80" : "text-[var(--color-ink)]/85"}`}>
              {inForgotView ? copy.forgotLead : copy.lead}
            </p>
            <p className={`mt-3 max-w-md text-sm leading-relaxed ${mutedSoft}`}>
              {inForgotView ? copy.forgotBody : copy.body}
            </p>

            <ul className={`mt-6 space-y-2.5 text-sm lg:hidden ${muted}`}>
              {features.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className={featureDot} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                if (inForgotView) {
                  e.preventDefault();
                  void handleForgotPassword();
                  return;
                }
                void handleSubmit(e);
              }}
              noValidate
            >
              {inForgotView ? null : (
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
              )}

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
                    if (mode === "login" || mode === "register" || mode === "forgot") {
                      const t = v.trim();
                      if (t && isValidLoginEmail(t)) {
                        setFieldErrors((prev) => {
                          if (!prev.email) return prev;
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                      setError(null);
                      setRegisterToast(null);
                      setForgotMessage(null);
                    }
                  }}
                  placeholder="name@email.com"
                  disabled={formBusy}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "auth-email-err" : undefined}
                  className={`${inputClass} mt-2 disabled:opacity-55 ${
                    fieldErrors.email ? loginInputErrorRing : ""
                  }`.trim()}
                />
                {fieldErrors.email ? (
                  <p
                    id="auth-email-err"
                    className="mt-1.5 text-xs text-rose-500 dark:text-rose-300"
                  >
                    {resolveLoginFieldMessage(fieldErrors.email)}
                  </p>
                ) : null}
              </div>
              {inForgotView ? null : (
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
                      if (mode === "login" || mode === "register") {
                        if (v.length >= LOGIN_PASSWORD_MIN_LENGTH) {
                          setFieldErrors((prev) => {
                            if (!prev.password) return prev;
                            const next = { ...prev };
                            delete next.password;
                            return next;
                          });
                        }
                        setError(null);
                        setRegisterToast(null);
                        setForgotMessage(null);
                      }
                    }}
                    placeholder="••••••••"
                    disabled={formBusy}
                    aria-invalid={Boolean(fieldErrors.password)}
                    aria-describedby={fieldErrors.password ? "auth-password-err" : undefined}
                    className={`${inputClass} mt-2 disabled:opacity-55 ${
                      fieldErrors.password ? loginInputErrorRing : ""
                    }`.trim()}
                  />
                  {fieldErrors.password ? (
                    <p
                      id="auth-password-err"
                      className="mt-1.5 text-xs text-rose-500 dark:text-rose-300"
                    >
                      {resolveLoginFieldMessage(fieldErrors.password)}
                    </p>
                  ) : null}
                </div>
              )}
              {mode === "register" && !inForgotView ? (
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
                    onChange={(ev) => {
                      setConfirmPassword(ev.target.value);
                      setError(null);
                      setRegisterToast(null);
                      setForgotMessage(null);
                      setFieldErrors((prev) => {
                        if (!prev.confirmPassword) return prev;
                        const next = { ...prev };
                        delete next.confirmPassword;
                        return next;
                      });
                    }}
                    placeholder="••••••••"
                    disabled={formBusy}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    aria-describedby={fieldErrors.confirmPassword ? "auth-confirm-err" : undefined}
                    className={`${inputClass} mt-2 disabled:opacity-55 ${
                      fieldErrors.confirmPassword ? loginInputErrorRing : ""
                    }`.trim()}
                  />
                  {fieldErrors.confirmPassword ? (
                    <p
                      id="auth-confirm-err"
                      className="mt-1.5 text-xs text-rose-500 dark:text-rose-300"
                    >
                      {resolveLoginFieldMessage(fieldErrors.confirmPassword)}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {error ? (
                <div
                  role="alert"
                  className={`rounded-2xl border px-4 py-3.5 text-sm ${errorCardClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                        isDark ? "bg-red-300/18 text-red-100" : "bg-red-200/75 text-red-900"
                      }`}
                    >
                      !
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-red-100/85" : "text-red-800/80"}`}>
                        Error
                      </p>
                      <p className="mt-1 leading-relaxed">{error}</p>
                    </div>
                  </div>
                </div>
              ) : null}
              {forgotMessage ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-2xl border px-4 py-3.5 text-sm ${successCardClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                        isDark ? "bg-emerald-300/18 text-emerald-100" : "bg-emerald-200/75 text-emerald-900"
                      }`}
                    >
                      ✓
                    </span>
                    <div className="min-w-0">
                      <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-emerald-100/85" : "text-emerald-800/80"}`}>
                        Success
                      </p>
                      <p className="mt-1 leading-relaxed">{forgotMessage}</p>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className={`flex flex-wrap items-center justify-between gap-3 text-sm ${muted}`}>
                {mode === "login" ? (
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
                ) : (
                  <span className="min-w-[1px]" aria-hidden="true" />
                )}
                {mode === "login" ? (
                  <Link
                    href="/forgot-password"
                    className="cursor-pointer font-medium text-[var(--color-sage)] transition hover:opacity-80"
                  >
                    {copy.forgotPassword}
                  </Link>
                ) : inForgotView ? (
                  <Link
                    href="/login"
                    className="cursor-pointer font-medium text-[var(--color-sage)] transition hover:opacity-80"
                  >
                    {copy.forgotBackToLogin}
                  </Link>
                ) : (
                  <span className="min-w-[1px]" aria-hidden="true" />
                )}
              </div>

              {inForgotView ? (
                <button
                  type="submit"
                  disabled={formBusy}
                  className="btn-primary mt-1 w-full cursor-pointer rounded-full px-8 py-3.5 text-sm font-semibold shadow-[0_14px_36px_rgba(197,167,161,0.38)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-55 dark:shadow-[0_16px_40px_rgba(0,0,0,0.38)] sm:w-auto sm:min-w-[12rem]"
                >
                  {copy.forgotSubmit}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={formBusy}
                  className="btn-primary mt-1 w-full cursor-pointer rounded-full px-8 py-3.5 text-sm font-semibold shadow-[0_14px_36px_rgba(197,167,161,0.38)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-55 dark:shadow-[0_16px_40px_rgba(0,0,0,0.38)] sm:w-auto sm:min-w-[12rem]"
                >
                  {mode === "login" && loading ? copy.submitting : copy.submit}
                </button>
              )}
            </form>

            {inForgotView ? null : (
              <p className={`mt-8 text-sm ${muted}`}>
                {copy.switchPrompt}{" "}
                <Link
                  href={copy.switchHref}
                  className="font-semibold text-[var(--color-sage)] underline decoration-current/20 underline-offset-4 transition hover:decoration-current/40"
                >
                  {copy.switchAction}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
      {registerToast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-5 left-1/2 z-[240] w-[min(92vw,34rem)] -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm ${successCardClass}`}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                isDark ? "bg-emerald-300/18 text-emerald-100" : "bg-emerald-200/75 text-emerald-900"
              }`}
            >
              ✓
            </span>
            <div className="min-w-0">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-emerald-100/85" : "text-emerald-800/80"}`}>
                Success
              </p>
              <p className="mt-1 leading-relaxed">{registerToast ?? copy.registerSuccess}</p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
