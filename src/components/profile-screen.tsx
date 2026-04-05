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
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import {
  PROFILE_MAX_AVATAR_DATA_URL_LENGTH,
  fetchProfileRequest,
  isFakeAuthEnabled,
  normalizeProfileInput,
  updateProfileRequest,
  type ProfileGender,
  type UserProfile,
} from "@/lib/auth-client";

const MAX_AVATAR_FILE_BYTES = 512 * 1024;

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
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const demoMode = isFakeAuthEnabled();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [draft, setDraft] = useState<UserProfile | null>(null);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "error">("idle");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            backHome: "Quay về trang chủ",
            badge: "Không gian cá nhân",
            title: "Hồ sơ",
            subtitle: "Chỉnh sửa gọn gàng — ảnh đại diện và thông tin liên hệ của bạn.",
            body: demoMode
              ? "Đang bản demo: dữ liệu lưu trên trình duyệt. Kết nối backend để đồng bộ máy chủ."
              : "Lưu thay đổi để cập nhật tài khoản trên hệ thống.",
            demoPill: "Demo",
            sectionPhoto: "Ảnh đại diện",
            sectionDetails: "Chi tiết",
            email: "Email",
            name: "Họ tên",
            phone: "Điện thoại",
            age: "Tuổi",
            gender: "Giới tính",
            changePhoto: "Tải ảnh lên",
            avatarUrlHint: "Dán URL ảnh (https://…)",
            genderMale: "Nam",
            genderFemale: "Nữ",
            genderOther: "Khác",
            genderUnspecified: "Không nêu",
            save: "Lưu",
            saving: "Đang lưu…",
            saved: "Đã lưu",
            reset: "Hoàn tác",
            loading: "Đang tải…",
            retry: "Thử lại",
            logout: "Đăng xuất",
            needLogin: "Đăng nhập để xem hồ sơ.",
            goLogin: "Đăng nhập",
            imageTooBig: "Ảnh quá lớn (tối đa ~500KB).",
            imageType: "Chọn file ảnh.",
            dataUrlTooLong: "Ảnh mã hoá quá lớn.",
            previewHint: "Ảnh hiển thị trên tài khoản của bạn.",
          }
        : {
            backHome: "Back to home",
            badge: "Personal space",
            title: "Profile",
            subtitle: "A calm place to refine your photo and contact details.",
            body: demoMode
              ? "Demo: data stays in this browser. Connect your API to sync with the server."
              : "Save to update your account on our systems.",
            demoPill: "Demo",
            sectionPhoto: "Photo",
            sectionDetails: "Details",
            email: "Email",
            name: "Full name",
            phone: "Phone",
            age: "Age",
            gender: "Gender",
            changePhoto: "Upload image",
            avatarUrlHint: "Or paste image URL (https://…)",
            genderMale: "Male",
            genderFemale: "Female",
            genderOther: "Other",
            genderUnspecified: "Prefer not to say",
            save: "Save",
            saving: "Saving…",
            saved: "Saved",
            reset: "Reset",
            loading: "Loading…",
            retry: "Try again",
            logout: "Log out",
            needLogin: "Sign in to view your profile.",
            goLogin: "Sign in",
            imageTooBig: "Image too large (max ~500KB).",
            imageType: "Please pick an image file.",
            dataUrlTooLong: "Encoded image too large.",
            previewHint: "Shown on your account.",
          },
    [language, demoMode],
  );

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
    if (!signedIn) {
      router.replace("/login");
      return;
    }
    void loadProfile();
  }, [signedIn, router, loadProfile]);

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";

  const fieldLabel = `text-[11px] font-medium uppercase tracking-[0.32em] text-[var(--color-sage)]`;

  const inputClass =
    `w-full rounded-2xl border px-4 py-3.5 text-[15px] outline-none transition ` +
    `focus:border-[var(--color-rose)]/45 focus:ring-2 focus:ring-[var(--color-rose)]/15 ` +
    (isDark
      ? "border-white/12 bg-white/[0.06] text-white placeholder:text-white/30"
      : "border-[var(--color-ink)]/[0.08] bg-white/90 text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/35");

  const panelInner = isDark
    ? "border border-white/10 bg-[linear-gradient(165deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_55%,rgba(255,255,255,0.04)_100%)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    : "border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.95)_0%,rgba(247,242,236,0.88)_100%)] shadow-[0_20px_56px_rgba(49,42,40,0.07)]";

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

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!draft) return;
    setFormError(null);
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
  };

  const displayName = draft?.name?.trim() || draft?.email?.split("@")[0] || "—";

  if (!signedIn) {
    return (
      <main className={`relative isolate min-h-screen ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}>
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-6 px-6 py-28 text-center">
          <p className={`font-display text-2xl ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
            {copy.needLogin}
          </p>
          <Link href="/login" className="btn-primary rounded-full px-8 py-3.5 text-sm font-medium">
            {copy.goLogin}
          </Link>
        </div>
      </main>
    );
  }

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

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-80 ${muted}`}
            >
              <span aria-hidden="true" className="text-base opacity-70">
                ←
              </span>
              {copy.backHome}
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-[var(--color-sage)]">
                {copy.badge}
              </p>
              {demoMode ? (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isDark ? "bg-[var(--color-rose)]/20 text-[var(--color-rose)]" : "bg-[var(--color-rose)]/15 text-[#6b4f52]"
                  }`}
                >
                  {copy.demoPill}
                </span>
              ) : null}
            </div>
            <h1 className="mt-3 font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {copy.title}
            </h1>
            <p className={`mt-3 max-w-md text-base leading-relaxed sm:text-[15px] ${muted}`}>
              {copy.subtitle}
            </p>
          </div>
        </div>

        {loadState === "loading" ? (
          <div
            className={`grid gap-8 rounded-[2rem] border p-8 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12 ${panelInner}`}
          >
            <div className="animate-pulse space-y-4 lg:col-span-5">
              <div className={`mx-auto h-44 w-44 rounded-full ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/8"}`} />
              <div className={`mx-auto h-4 w-40 rounded-full ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/8"}`} />
              <div className={`mx-auto h-3 w-56 rounded-full ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
            </div>
            <div className="space-y-4 lg:col-span-7">
              <div className={`h-12 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
              <div className={`h-12 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
              <div className="grid grid-cols-2 gap-4">
                <div className={`h-12 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                <div className={`h-12 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
              </div>
            </div>
          </div>
        ) : null}

        {loadState === "error" && errorMessage ? (
          <div
            className={`rounded-[2rem] border px-8 py-10 sm:px-10 ${panelInner} ${
              isDark ? "border-red-400/25" : "border-red-200/60"
            }`}
          >
            <p
              role="alert"
              className={`text-sm leading-relaxed ${
                isDark ? "text-red-200/95" : "text-red-800"
              }`}
            >
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={() => void loadProfile()}
              className="btn-secondary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-medium"
            >
              {copy.retry}
            </button>
          </div>
        ) : null}

        {loadState === "idle" && draft ? (
          <form onSubmit={onSubmit}>
            <div className={`grid gap-8 rounded-[2rem] border p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12 ${panelInner}`}>
              <aside
                className={`flex flex-col lg:col-span-5 lg:pr-10 ${
                  isDark ? "lg:border-r lg:border-white/[0.08]" : "lg:border-r lg:border-[var(--color-ink)]/[0.06]"
                }`}
              >
                <p className={fieldLabel}>{copy.sectionPhoto}</p>
                <div className="mt-5 flex flex-col items-center text-center lg:items-stretch lg:text-left">
                  <div className="relative">
                    <div
                      className="rounded-full p-[3px] shadow-[0_12px_40px_rgba(197,167,161,0.25)]"
                      style={{
                        background: isDark
                          ? "linear-gradient(135deg, rgba(209,177,171,0.5), rgba(125,140,121,0.35))"
                          : "linear-gradient(135deg, rgba(197,167,161,0.85), rgba(125,140,121,0.45))",
                      }}
                    >
                      <div
                        className={`flex h-36 w-36 items-center justify-center overflow-hidden rounded-full sm:h-40 sm:w-40 ${
                          isDark ? "bg-[#141416]" : "bg-[var(--color-cream)]"
                        }`}
                      >
                        {draft.avatarUrl ? (
                          <img
                            src={draft.avatarUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span
                            className={`font-display text-5xl sm:text-6xl ${mutedSoft}`}
                            aria-hidden="true"
                          >
                            {(draft.name?.trim()?.[0] ?? draft.email?.[0] ?? "?").toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`mt-6 font-display text-2xl tracking-tight sm:text-3xl ${
                      isDark ? "text-white/92" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {displayName}
                  </p>
                  {draft.email ? (
                    <p className={`mt-1.5 text-sm ${muted}`}>{draft.email}</p>
                  ) : null}
                  <p className={`mt-4 max-w-xs text-xs leading-relaxed ${mutedSoft}`}>{copy.previewHint}</p>

                  <div className="mt-8 w-full max-w-sm space-y-3">
                    <label
                      className={`flex cursor-pointer items-center justify-center rounded-2xl border border-dashed px-4 py-4 text-sm font-medium transition hover:border-[var(--color-rose)]/40 ${
                        isDark
                          ? "border-white/14 bg-white/[0.04] text-white/85"
                          : "border-[var(--color-ink)]/12 bg-white/50 text-[var(--color-ink)]/85"
                      }`}
                    >
                      <span>{copy.changePhoto}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onAvatarFile}
                        disabled={saveState === "saving"}
                      />
                    </label>
                    <input
                      type="url"
                      value={draft.avatarUrl?.startsWith("data:") ? "" : draft.avatarUrl ?? ""}
                      onChange={(e) =>
                        setDraft((d) =>
                          d ? { ...d, avatarUrl: e.target.value.trim() || null } : d,
                        )
                      }
                      disabled={saveState === "saving"}
                      placeholder={copy.avatarUrlHint}
                      className={inputClass}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </aside>

              <div className="flex min-w-0 flex-col lg:col-span-7">
                <div className="lg:pl-4 lg:pt-0">
                  <p className={`${fieldLabel} lg:mt-8`}>{copy.sectionDetails}</p>
                  <p className={`mt-2 text-sm ${muted}`}>{copy.body}</p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <label className={fieldLabel} htmlFor="profile-name">
                        {copy.name}
                      </label>
                      <input
                        id="profile-name"
                        type="text"
                        value={draft.name ?? ""}
                        onChange={(e) => setDraft((d) => (d ? { ...d, name: e.target.value } : d))}
                        disabled={saveState === "saving"}
                        className={`${inputClass} mt-2.5`}
                        autoComplete="name"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className={fieldLabel} htmlFor="profile-age">
                          {copy.age}
                        </label>
                        <input
                          id="profile-age"
                          type="number"
                          min={0}
                          max={150}
                          value={draft.age ?? ""}
                          onChange={(e) => {
                            const v = e.target.value;
                            setDraft((d) =>
                              d
                                ? {
                                    ...d,
                                    age:
                                      v === ""
                                        ? null
                                        : Math.min(150, Math.max(0, parseInt(v, 10) || 0)),
                                  }
                                : d,
                            );
                          }}
                          disabled={saveState === "saving"}
                          className={`${inputClass} mt-2.5`}
                        />
                      </div>
                      <div>
                        <label className={fieldLabel} htmlFor="profile-gender">
                          {copy.gender}
                        </label>
                        <select
                          id="profile-gender"
                          value={draft.gender ?? "unspecified"}
                          onChange={(e) =>
                            setDraft((d) =>
                              d ? { ...d, gender: e.target.value as ProfileGender } : d,
                            )
                          }
                          disabled={saveState === "saving"}
                          className={`${inputClass} mt-2.5 cursor-pointer`}
                        >
                          <option value="unspecified">{copy.genderUnspecified}</option>
                          <option value="male">{copy.genderMale}</option>
                          <option value="female">{copy.genderFemale}</option>
                          <option value="other">{copy.genderOther}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={fieldLabel} htmlFor="profile-email">
                        {copy.email}
                      </label>
                      <input
                        id="profile-email"
                        type="email"
                        value={draft.email ?? ""}
                        onChange={(e) => setDraft((d) => (d ? { ...d, email: e.target.value } : d))}
                        disabled={saveState === "saving"}
                        className={`${inputClass} mt-2.5`}
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className={fieldLabel} htmlFor="profile-phone">
                        {copy.phone}
                      </label>
                      <input
                        id="profile-phone"
                        type="tel"
                        value={draft.phone ?? ""}
                        onChange={(e) => setDraft((d) => (d ? { ...d, phone: e.target.value } : d))}
                        disabled={saveState === "saving"}
                        className={`${inputClass} mt-2.5`}
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {formError ? (
                    <p
                      role="alert"
                      className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                        isDark
                          ? "border-amber-400/30 bg-amber-500/[0.12] text-amber-100"
                          : "border-amber-200/80 bg-amber-50 text-amber-950"
                      }`}
                    >
                      {formError}
                    </p>
                  ) : null}

                  <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-current/10 pt-8">
                    <button
                      type="submit"
                      disabled={saveState === "saving"}
                      className="btn-primary inline-flex min-w-[8.5rem] items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-55"
                    >
                      {saveState === "saving"
                        ? copy.saving
                        : saveState === "saved"
                          ? copy.saved
                          : copy.save}
                    </button>
                    <button
                      type="button"
                      onClick={resetDraft}
                      disabled={saveState === "saving"}
                      className={`inline-flex rounded-full border px-7 py-3.5 text-sm font-medium transition hover:opacity-90 disabled:opacity-45 ${
                        isDark
                          ? "border-white/16 bg-white/[0.06] text-white"
                          : "border-[var(--color-ink)]/10 bg-white/70 text-[var(--color-ink)]"
                      }`}
                    >
                      {copy.reset}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : null}

        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            type="button"
            onClick={() => logout()}
            className={`text-sm font-medium underline decoration-current/25 underline-offset-[6px] transition hover:decoration-current/50 ${
              isDark ? "text-white/55" : "text-[var(--color-ink)]/50"
            }`}
          >
            {copy.logout}
          </button>
        </div>
      </div>
    </main>
  );
}
