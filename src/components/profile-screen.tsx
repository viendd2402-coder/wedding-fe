"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useAuthSession, useLogout } from "@/components/auth-session";
import AccountPageShell, { AccountEmptyState } from "@/components/account-page-shell";
import { FullscreenLoading } from "@/components/common/fullscreen-loading";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import {
  PROFILE_MAX_AVATAR_DATA_URL_LENGTH,
  fetchProfileRequest,
  normalizeProfileInput,
  updateProfileRequest,
  type UserProfile,
} from "@/lib/auth-client";

const MAX_AVATAR_FILE_BYTES = 512 * 1024;
const PROFILE_FULL_NAME_MAX = 100;
const PROFILE_PHONE_MAX = 20;
const PROFILE_AGE_MIN = 0;
const PROFILE_AGE_MAX = 120;
const PROFILE_GENDER_MAX = 20;
const PROFILE_ADDITIONAL_CONTACT_MAX = 255;
type ProfileField = "name" | "phone" | "age" | "gender" | "additionalContact";
type ProfileFieldErrors = Partial<Record<ProfileField, string>>;

function profileToDraft(p: UserProfile): UserProfile {
  return normalizeProfileInput({
    ...p,
    gender: p.gender ?? "unspecified",
  });
}

export default function ProfileScreen() {
  const router = useRouter();
  const { signedIn } = useAuthSession();
  const logout = useLogout();
  const { theme } = useGlobalPreferences();
  const { profile: copy, account } = useMessages();
  const isDark = theme === "dark";

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [draft, setDraft] = useState<UserProfile | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "error">("idle");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  /** Tránh coi là chưa đăng nhập trong lúc hydrate (SSR snapshot rỗng → signedIn false một nhịp). */
  const [clientReady, setClientReady] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoadState("loading");
    setErrorMessage(null);
    const result = await fetchProfileRequest();
    if (!result.ok) {
      setLoadState("error");
      setErrorMessage(result.message);
      setProfile(null);
      setDraft(null);
      return;
    }
    const p = result.profile;
    setProfile(p);
    setDraft(profileToDraft(p));
    setLoadState("idle");
    setSaveState("idle");
  }, []);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (!clientReady) return;
    if (!signedIn) {
      router.replace("/login");
      return;
    }
    void loadProfile();
  }, [clientReady, signedIn, router, loadProfile]);

  // Style theo design token (sáng/tối tự đổi qua biến CSS — không cần nhánh isDark)
  const muted = "text-[var(--color-muted)]";
  const mutedSoft = "text-[var(--color-muted)] opacity-80";
  const fieldErrorText = "mt-2 text-xs text-[var(--color-rose)]";

  /** Ô nhập — nhãn đặt phía trên */
  const inputSheet =
    "w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-surface)] px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition duration-200 placeholder:text-[var(--color-muted)] focus:border-[var(--color-gold)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-gold)_16%,transparent)]";

  const fieldLabel = "mb-2 block text-sm font-medium text-[var(--color-ink)]";
  const fieldHint = `mt-2 text-xs leading-snug ${mutedSoft}`;

  const panelOuter = "lux-card";

  const genderPillBase =
    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition disabled:opacity-45";
  const genderPillOff =
    "border-[var(--color-line-strong)] text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]";
  const genderPillOn =
    "border-[color-mix(in_srgb,var(--color-gold)_60%,transparent)] bg-[var(--color-gold-soft)] text-[var(--color-ink)]";

  const skeleton = "rounded-lg bg-[color-mix(in_srgb,var(--color-ink)_7%,transparent)]";

  const onAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setFormError(copy.imageType);
      return;
    }
    if (f.size > MAX_AVATAR_FILE_BYTES) {
      setFormError(copy.imageTooBig);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result ?? "");
      if (s.length > PROFILE_MAX_AVATAR_DATA_URL_LENGTH) {
        setFormError(copy.dataUrlTooLong);
        return;
      }
      setDraft((d) => (d ? { ...d, avatarUrl: s } : d));
    };
    reader.readAsDataURL(f);
  };

  const validateField = (field: ProfileField, candidate: UserProfile): string | null => {
    if (field === "name") {
      const fullName = candidate.name?.trim() ?? "";
      if (fullName.length > PROFILE_FULL_NAME_MAX) return copy.fullNameTooLong;
      return null;
    }
    if (field === "phone") {
      const phone = candidate.phone?.trim() ?? "";
      if (phone.length > PROFILE_PHONE_MAX) return copy.phoneTooLong;
      return null;
    }
    if (field === "age") {
      const ageValue = candidate.age;
      if (ageValue !== null) {
        if (!Number.isInteger(ageValue) || ageValue < PROFILE_AGE_MIN || ageValue > PROFILE_AGE_MAX) {
          return copy.ageInvalid;
        }
      }
      return null;
    }
    if (field === "gender") {
      const gender = candidate.gender?.trim() ?? "";
      if (gender.length > PROFILE_GENDER_MAX) return copy.genderTooLong;
      return null;
    }
    const additionalContact = candidate.additionalContact?.trim() ?? "";
    if (additionalContact.length > PROFILE_ADDITIONAL_CONTACT_MAX) return copy.additionalContactTooLong;
    return null;
  };

  const setOrClearFieldError = (
    prev: ProfileFieldErrors,
    field: ProfileField,
    nextError: string | null,
  ): ProfileFieldErrors => {
    if (!nextError) {
      const rest = { ...prev };
      delete rest[field];
      return rest;
    }
    return { ...prev, [field]: nextError };
  };

  const validateDraft = (candidate: UserProfile): ProfileFieldErrors => {
    const nextErrors: ProfileFieldErrors = {};
    const fields: ProfileField[] = ["name", "phone", "age", "gender", "additionalContact"];
    for (const field of fields) {
      const err = validateField(field, candidate);
      if (err) nextErrors[field] = err;
    }
    return nextErrors;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!draft) return;
    setFormError(null);
    const nextErrors = validateDraft(draft);
    setFieldErrors(nextErrors);
    const firstError = Object.values(nextErrors)[0] ?? null;
    if (firstError) {
      setFormError(firstError);
      return;
    }
    setSaveState("saving");
    const result = await updateProfileRequest(draft);
    if (!result.ok) {
      setSaveState("idle");
      setFormError(result.message);
      return;
    }
    await loadProfile();
    setSaveState("saved");
    window.setTimeout(() => setSaveState("idle"), 2200);
  };

  const resetDraft = () => {
    if (profile) setDraft(profileToDraft(profile));
    setFormError(null);
    setFieldErrors({});
  };

  const displayName = draft?.name?.trim() || draft?.email?.split("@")[0] || "—";

  const genderChoices = useMemo(
    () =>
      [
        { value: "male" as const, label: copy.genderMale },
        { value: "female" as const, label: copy.genderFemale },
        { value: "other" as const, label: copy.genderOther },
        { value: "unspecified" as const, label: copy.genderUnspecified },
      ] as const,
    [copy.genderFemale, copy.genderMale, copy.genderOther, copy.genderUnspecified],
  );

  if (!clientReady) {
    return (
      <main className="lux-page-bg min-h-screen flex-1">
        <p className="lux-muted px-6 py-28 text-center text-sm font-medium">{copy.loading}</p>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className="lux-page-bg min-h-screen flex-1 px-4 py-24">
        <AccountEmptyState
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7" aria-hidden="true">
              <circle cx="12" cy="9" r="3.25" />
              <path strokeLinecap="round" d="M6.5 19.25c.84-2.8 3.53-4.5 5.5-4.5s4.66 1.7 5.5 4.5" />
            </svg>
          }
          title={copy.needLogin}
          body=""
          action={
            <Link href="/login" className="btn-primary inline-flex rounded-full px-8 py-3.5 text-sm font-medium">
              {copy.goLogin}
            </Link>
          }
        />
      </main>
    );
  }

  // Mức độ hoàn thiện hồ sơ + trường còn thiếu (gợi ý thân thiện cho khách)
  const completionChecks = draft
    ? [
        { done: Boolean(draft.name?.trim()), label: copy.name },
        { done: Boolean(draft.avatarUrl), label: account.fieldAvatar },
        { done: Boolean(draft.phone?.trim()), label: copy.phone },
        { done: draft.age !== null, label: copy.age },
        { done: Boolean(draft.gender && draft.gender !== "unspecified"), label: copy.gender },
        { done: Boolean(draft.additionalContact?.trim()), label: copy.additionalContact },
      ]
    : [];
  const completionPct = completionChecks.length
    ? Math.round((completionChecks.filter((c) => c.done).length / completionChecks.length) * 100)
    : 0;
  const missingLabels = completionChecks
    .filter((c) => !c.done)
    .slice(0, 2)
    .map((c) => c.label.toLocaleLowerCase());
  const isDirty = Boolean(profile && draft && JSON.stringify(profileToDraft(profile)) !== JSON.stringify(draft));

  /** Cập nhật draft + kiểm tra lại riêng trường vừa sửa. */
  const patchDraft = (patch: Partial<UserProfile>, field: ProfileField) =>
    setDraft((d) => {
      if (!d) return d;
      const next = { ...d, ...patch };
      setFormError(null);
      setFieldErrors((prev) => setOrClearFieldError(prev, field, validateField(field, next)));
      return next;
    });

  const sectionTitle = (title: string, hint: string) => (
    <div className="mb-6">
      <p className="font-display text-2xl font-medium">{title}</p>
      <p className={`mt-1 text-sm ${muted}`}>{hint}</p>
    </div>
  );

  const errorText = (id: string, msg?: string) =>
    msg ? (
      <p id={id} className={fieldErrorText}>
        {msg}
      </p>
    ) : null;

  return (
    <AccountPageShell backLabel={copy.backHome} title={copy.title} subtitle={account.profileSubtitle}>
      <FullscreenLoading
        show={loadState === "loading" || saveState === "saving"}
        isDark={isDark}
        label={saveState === "saving" ? copy.saving : copy.loading}
      />

      {loadState === "loading" ? (
        <div className="flex flex-col gap-6" aria-hidden="true">
          <div className={`${panelOuter} flex items-center gap-6 rounded-[2rem] p-8`}>
            <div className={`h-28 w-28 shrink-0 rounded-full ${skeleton}`} />
            <div className="flex-1">
              <div className={`h-7 w-48 ${skeleton}`} />
              <div className={`mt-3 h-4 w-64 ${skeleton}`} />
            </div>
          </div>
          <div className={`${panelOuter} grid gap-5 rounded-[1.75rem] p-8 sm:grid-cols-2`}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <div className={`h-4 w-24 ${skeleton}`} />
                <div className={`mt-3 h-12 rounded-xl ${skeleton}`} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {loadState === "error" && errorMessage ? (
        <div className={`${panelOuter} rounded-[1.75rem] px-6 py-8 sm:px-8`}>
          <p role="alert" className="text-sm leading-relaxed text-[var(--color-rose)]">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={() => void loadProfile()}
            className="btn-secondary mt-6 inline-flex cursor-pointer rounded-full px-6 py-3 text-sm font-medium"
          >
            {copy.retry}
          </button>
        </div>
      ) : null}

      {loadState === "idle" && draft ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* ── Thẻ hồ sơ ngang ── */}
          <section className={`${panelOuter} overflow-hidden rounded-[2rem]`}>
            <div
              className="h-24 bg-[linear-gradient(120deg,var(--color-gold-soft),color-mix(in_srgb,var(--color-rose)_14%,var(--color-surface-2)))] sm:h-28"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-6 px-6 pb-7 sm:px-8 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:text-left">
                <div className="-mt-14 shrink-0 rounded-full border-4 border-[var(--color-surface)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] sm:-mt-16">
                  <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--color-gold-soft)] sm:h-32 sm:w-32">
                    {draft.avatarUrl ? (
                      <img src={draft.avatarUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="font-display text-5xl italic text-[var(--color-gold)]" aria-hidden="true">
                        {(draft.name?.trim()?.[0] ?? draft.email?.[0] ?? "?").toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="min-w-0 pb-1">
                  <p className="font-display text-3xl font-medium leading-tight sm:text-4xl">{displayName}</p>
                  <p className={`mt-1 break-all text-sm ${muted}`}>{draft.email ?? "—"}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <label
                      className="btn-secondary inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                      title={copy.changeAvatarShort}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
                        <circle cx="12" cy="13" r="3.25" />
                      </svg>
                      {copy.changePhoto}
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onAvatarFile}
                        disabled={saveState === "saving"}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => void logout()}
                      className="inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]"
                    >
                      {copy.logout}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mức độ hoàn thiện */}
              <div className="w-full rounded-2xl bg-[var(--color-surface-2)] p-4 md:mt-7 md:w-80 md:self-center">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    {account.completionTitle}
                  </p>
                  <p className="font-display text-2xl font-medium text-[var(--color-gold)]">{completionPct}%</p>
                </div>
                <div
                  className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]"
                  role="progressbar"
                  aria-valuenow={completionPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={account.completionTitle}
                >
                  <div
                    className="h-full rounded-full bg-[var(--color-gold)] transition-[width] duration-700"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <p className={`mt-2.5 text-xs leading-relaxed ${muted}`}>
                  {completionPct === 100
                    ? account.completionDone
                    : account.completionHintTpl.replace("__FIELDS__", missingLabels.join(", "))}
                </p>
              </div>
            </div>
          </section>

          {/* ── Form thông tin ── */}
          <section className={`${panelOuter} rounded-[1.75rem] p-6 sm:p-8`}>
            {sectionTitle(account.groupPersonal, account.groupPersonalHint)}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={fieldLabel} htmlFor="profile-name">
                  {copy.name}
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={draft.name ?? ""}
                  onChange={(e) => patchDraft({ name: e.target.value }, "name")}
                  disabled={saveState === "saving"}
                  className={inputSheet}
                  maxLength={PROFILE_FULL_NAME_MAX}
                  autoComplete="name"
                  aria-invalid={fieldErrors.name ? true : undefined}
                  aria-describedby={fieldErrors.name ? "profile-name-error" : undefined}
                />
                {errorText("profile-name-error", fieldErrors.name)}
              </div>

              <div>
                <label className={fieldLabel} htmlFor="profile-email">
                  {copy.email}
                </label>
                <div className="relative">
                  <input
                    id="profile-email"
                    type="email"
                    value={draft.email ?? ""}
                    disabled
                    readOnly
                    className={`${inputSheet} cursor-not-allowed bg-[var(--color-surface-2)] pr-11 text-[var(--color-muted)]`}
                    autoComplete="email"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
                    aria-hidden="true"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>
              </div>

              <div>
                <label className={fieldLabel} htmlFor="profile-age">
                  {copy.age}
                </label>
                <input
                  id="profile-age"
                  type="number"
                  inputMode="numeric"
                  min={PROFILE_AGE_MIN}
                  max={PROFILE_AGE_MAX}
                  value={draft.age ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    patchDraft(
                      {
                        age:
                          v === "" ? null : Math.min(PROFILE_AGE_MAX, Math.max(PROFILE_AGE_MIN, parseInt(v, 10) || 0)),
                      },
                      "age",
                    );
                  }}
                  disabled={saveState === "saving"}
                  className={inputSheet}
                  aria-invalid={fieldErrors.age ? true : undefined}
                  aria-describedby={fieldErrors.age ? "profile-age-error" : undefined}
                />
                {errorText("profile-age-error", fieldErrors.age)}
              </div>

              <div>
                <p className={fieldLabel} id="profile-gender-label">
                  {copy.gender}
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="profile-gender-label">
                  {genderChoices.map(({ value: gv, label }) => {
                    const on = (draft.gender ?? "unspecified") === gv;
                    return (
                      <button
                        key={gv}
                        type="button"
                        aria-pressed={on}
                        disabled={saveState === "saving"}
                        onClick={() => patchDraft({ gender: gv }, "gender")}
                        className={`${genderPillBase} py-2.5 ${on ? genderPillOn : genderPillOff}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                {errorText("profile-gender-error", fieldErrors.gender)}
              </div>
            </div>

            <div className="my-8 h-px bg-[var(--color-line)]" />

            {sectionTitle(account.groupContact, account.groupContactHint)}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={fieldLabel} htmlFor="profile-phone">
                  {copy.phone}
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  inputMode="tel"
                  value={draft.phone ?? ""}
                  onChange={(e) => patchDraft({ phone: e.target.value }, "phone")}
                  disabled={saveState === "saving"}
                  className={inputSheet}
                  maxLength={PROFILE_PHONE_MAX}
                  autoComplete="tel"
                  placeholder="0901 234 567"
                  aria-invalid={fieldErrors.phone ? true : undefined}
                  aria-describedby={fieldErrors.phone ? "profile-phone-error" : "profile-phone-hint"}
                />
                {fieldErrors.phone ? (
                  errorText("profile-phone-error", fieldErrors.phone)
                ) : (
                  <p id="profile-phone-hint" className={fieldHint}>
                    {copy.optionalFieldHint}
                  </p>
                )}
              </div>

              <div>
                <label className={fieldLabel} htmlFor="profile-additional-contact">
                  {copy.additionalContact}
                </label>
                <input
                  id="profile-additional-contact"
                  type="text"
                  value={draft.additionalContact ?? ""}
                  onChange={(e) => patchDraft({ additionalContact: e.target.value.trim() || null }, "additionalContact")}
                  disabled={saveState === "saving"}
                  className={inputSheet}
                  maxLength={PROFILE_ADDITIONAL_CONTACT_MAX}
                  autoComplete="off"
                  placeholder={copy.additionalContact}
                  aria-invalid={fieldErrors.additionalContact ? true : undefined}
                  aria-describedby={
                    fieldErrors.additionalContact ? "profile-additional-contact-error" : "profile-additional-contact-hint"
                  }
                />
                {fieldErrors.additionalContact ? (
                  errorText("profile-additional-contact-error", fieldErrors.additionalContact)
                ) : (
                  <p id="profile-additional-contact-hint" className={fieldHint}>
                    {copy.messengerExampleHint}
                  </p>
                )}
              </div>
            </div>
          </section>

          {formError ? (
            <p
              role="alert"
              className="rounded-xl border border-[color-mix(in_srgb,var(--color-rose)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-rose)_10%,var(--color-surface))] px-4 py-3.5 text-sm"
            >
              {formError}
            </p>
          ) : null}

          {/* Thanh lưu — dính đáy màn hình khi có thay đổi chưa lưu */}
          <div
            className={`z-20 flex flex-wrap items-center justify-end gap-3 transition-all duration-300 ${
              isDirty ? "lux-card sticky bottom-4 rounded-full py-2 pl-5 pr-2 shadow-[var(--shadow-lift)]" : ""
            }`}
          >
            {isDirty ? (
              <span className="mr-auto flex items-center gap-2 text-sm font-medium">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                {account.unsavedChanges}
              </span>
            ) : saveState === "saved" ? (
              <span className="mr-auto text-sm font-medium text-[var(--color-sage)]" role="status">
                ✓ {copy.saved}
              </span>
            ) : null}
            <button
              type="button"
              onClick={resetDraft}
              disabled={saveState === "saving" || !isDirty}
              className="btn-secondary inline-flex cursor-pointer rounded-full px-7 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45"
            >
              {copy.reset}
            </button>
            <button
              type="submit"
              disabled={saveState === "saving" || !isDirty}
              className="btn-primary inline-flex min-w-[9rem] cursor-pointer items-center justify-center rounded-full px-9 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-45"
            >
              {copy.save}
            </button>
          </div>
        </form>
      ) : null}
    </AccountPageShell>
  );
}
