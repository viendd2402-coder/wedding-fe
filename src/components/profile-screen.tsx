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
  /** Tránh coi là chưa đăng nhập trong lúc hydrate (SSR snapshot rỗng → signedIn false một nhịp). */
  const [clientReady, setClientReady] = useState(false);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            backHome: "Quay về trang chủ",
            title: "Hồ sơ",
            subtitle: "Chỉnh sửa gọn gàng — ảnh đại diện và thông tin liên hệ của bạn.",
            body: demoMode
              ? "Đang bản demo: dữ liệu lưu trên trình duyệt. Kết nối backend để đồng bộ máy chủ."
              : "Lưu thay đổi để cập nhật tài khoản trên hệ thống.",
            demoPill: "Demo",
            sectionDetails: "Thông tin tài khoản",
            sectionOptional: "Liên hệ thêm",
            additionalContact: "Liên hệ bổ sung",
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
            changeAvatarShort: "Đổi ảnh",
          }
        : {
            backHome: "Back to home",
            title: "Profile",
            subtitle: "A calm place to refine your photo and contact details.",
            body: demoMode
              ? "Demo: data stays in this browser. Connect your API to sync with the server."
              : "Save to update your account on our systems.",
            demoPill: "Demo",
            sectionDetails: "Account details",
            sectionOptional: "Extra contact",
            additionalContact: "Additional contact",
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
            changeAvatarShort: "Change photo",
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

  const muted = isDark ? "text-white/62" : "text-[var(--color-ink)]/62";
  const mutedSoft = isDark ? "text-white/48" : "text-[var(--color-ink)]/48";

  /** Ô nhập dạng “sheet”: nhãn trái — điều khiển phải */
  const inputSheet =
    `w-full rounded-2xl border px-4 py-3 text-[15px] outline-none transition duration-200 ` +
    `focus:border-[var(--color-rose)]/55 focus:ring-[3px] focus:ring-[var(--color-rose)]/14 ` +
    (isDark
      ? "border-white/10 bg-white/[0.05] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] placeholder:text-white/26"
      : "border-[var(--color-ink)]/[0.07] bg-white text-[var(--color-ink)] shadow-[0_1px_2px_rgba(49,42,40,0.04)] placeholder:text-[var(--color-ink)]/30");

  const rowLabel = `text-[15px] font-semibold tracking-tight ${isDark ? "text-white/90" : "text-[var(--color-ink)]"}`;
  const rowHint = `mt-1 text-xs leading-snug ${mutedSoft}`;

  const formSheetBorder = isDark ? "border-white/[0.1]" : "border-[var(--color-ink)]/[0.07]";
  const formSheetBg = isDark
    ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)]"
    : "bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,252,248,0.75)_100%)]";
  const formSheetRing = isDark ? "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]" : "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95)]";
  const formDivide = isDark ? "divide-white/[0.07]" : "divide-[var(--color-ink)]/[0.07]";

  const formRowGrid =
    "grid gap-3 py-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-10 sm:py-5 sm:items-start lg:grid-cols-[minmax(0,13.5rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] 2xl:gap-16";
  const formRowPad = "px-5 sm:px-6 lg:px-8 xl:px-9 2xl:px-10 min-[1800px]:px-12";

  const panelOuter = isDark
    ? "border border-white/[0.09] shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_32px_80px_rgba(0,0,0,0.42),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
    : "border border-[var(--color-ink)]/[0.06] shadow-[0_4px_0_0_rgba(49,42,40,0.03),0_28px_70px_rgba(49,42,40,0.09),inset_0_1px_0_0_rgba(255,255,255,0.85)]";

  const panelInner = isDark
    ? "bg-[linear-gradient(168deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_38%,rgba(22,22,24,0.96)_72%)] backdrop-blur-xl"
    : "bg-[linear-gradient(168deg,rgba(255,255,255,0.98)_0%,rgba(255,252,248,0.96)_35%,rgba(247,242,236,0.92)_100%)] backdrop-blur-sm";

  const profileBanner = isDark
    ? "bg-[linear-gradient(135deg,rgba(232,196,190,0.38)_0%,rgba(125,140,121,0.22)_38%,rgba(30,28,32,0.95)_78%,#121214_100%)]"
    : "bg-[linear-gradient(135deg,rgba(214,180,174,0.55)_0%,rgba(255,245,238,0.75)_35%,rgba(252,248,242,0.95)_70%,#faf6f1_100%)]";

  const profileBannerShine = isDark
    ? "bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.06)_48%,transparent_56%)]"
    : "bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.65)_50%,transparent_65%)]";

  const avatarRingOuter = isDark
    ? "bg-gradient-to-br from-[var(--color-rose)]/75 via-white/15 to-[var(--color-sage)]/55 p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]"
    : "bg-gradient-to-br from-[var(--color-rose)]/55 via-[#fff8f5] to-[var(--color-sage)]/45 p-[3px] shadow-[0_18px_44px_rgba(49,42,40,0.12),0_0_0_1px_rgba(255,255,255,0.8)]";

  const avatarRingInner = isDark ? "bg-[#161618] p-1" : "bg-[linear-gradient(180deg,#fffefb,#f7f2ec)] p-1";

  const sectionHead = `flex items-center gap-3`;
  const sectionAccent = `h-9 w-1 shrink-0 rounded-full bg-gradient-to-b from-[var(--color-rose)] to-[var(--color-sage)]/80 shadow-[0_2px_8px_rgba(197,167,161,0.35)]`;

  const genderPillBase =
    "rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-45";
  const genderPillOff = isDark
    ? "border border-white/12 bg-white/[0.04] text-white/78 hover:border-white/20 hover:bg-white/[0.07] focus-visible:outline-white/40"
    : "border border-[var(--color-ink)]/8 bg-white/80 text-[var(--color-ink)]/80 hover:border-[var(--color-ink)]/14 hover:bg-white focus-visible:outline-[var(--color-rose)]/40";
  const genderPillOn = isDark
    ? "border border-[var(--color-rose)]/50 bg-[var(--color-rose)]/22 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_14px_rgba(0,0,0,0.2)] focus-visible:outline-[var(--color-rose)]/55"
    : "border border-[var(--color-rose)]/45 bg-[var(--color-rose)]/14 text-[var(--color-ink)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_6px_18px_rgba(197,167,161,0.2)] focus-visible:outline-[var(--color-rose)]/45";

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
      <main className={`relative isolate min-h-screen ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}>
        <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-4 px-6 py-28 text-center">
          <p className={`text-sm font-medium ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
            {copy.loading}
          </p>
        </div>
      </main>
    );
  }

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

      <div className="relative mx-auto w-full max-w-lg px-5 py-10 sm:max-w-3xl sm:px-8 lg:max-w-[58rem] lg:px-10 xl:max-w-[76rem] xl:px-12 2xl:max-w-[min(calc(100vw-4rem),96rem)] 2xl:px-16 min-[1800px]:max-w-[min(calc(100vw-5rem),112rem)] min-[1800px]:px-20 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10">
          <Link
            href="/"
            className={`inline-flex w-fit items-center gap-2 text-sm font-medium transition hover:opacity-80 ${muted}`}
          >
            <span aria-hidden="true" className="text-base opacity-70">
              ←
            </span>
            {copy.backHome}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl tracking-tight sm:text-4xl">{copy.title}</h1>
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
          <p className={`text-sm leading-relaxed ${muted}`}>{copy.subtitle}</p>
        </div>

        {loadState === "loading" ? (
          <div
            className={`overflow-hidden rounded-[2rem] lg:rounded-[2.25rem] ${panelOuter} ${panelInner} lg:grid lg:min-h-[28rem] lg:grid-cols-[minmax(15rem,26%)_1fr] xl:grid-cols-[minmax(16rem,22%)_1fr] 2xl:grid-cols-[minmax(17rem,17%)_1fr] min-[1800px]:grid-cols-[minmax(18rem,15%)_1fr]`}
          >
            <div className="relative flex flex-col lg:h-full lg:min-h-[22rem]">
              <div
                className={`relative h-36 shrink-0 overflow-hidden sm:h-44 lg:absolute lg:inset-0 lg:h-full lg:rounded-none ${profileBanner}`}
              >
                <div className={`absolute inset-0 ${profileBannerShine}`} />
              </div>
              <div className="relative z-[1] flex flex-col items-center px-6 pb-8 pt-0 sm:px-8 lg:flex-1 lg:justify-center lg:px-6 lg:pb-12 lg:pt-12">
                <div
                  className={`-mt-[4.25rem] flex h-[8rem] w-[8rem] items-center justify-center rounded-full lg:mt-0 lg:h-[9.25rem] lg:w-[9.25rem] ${avatarRingOuter}`}
                >
                  <div className={`flex h-full w-full rounded-full ${avatarRingInner}`}>
                    <div
                      className={`h-full w-full rounded-full ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/8"}`}
                    />
                  </div>
                </div>
                <div className={`mt-6 h-7 w-44 rounded-lg lg:mt-8 ${isDark ? "bg-white/10" : "bg-[var(--color-ink)]/8"}`} />
                <div className={`mt-2.5 h-4 w-56 rounded-lg ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
              </div>
            </div>
            <div
              className={`border-t px-6 py-7 sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-10 xl:px-12 2xl:px-16 min-[1800px]:px-20 ${
                isDark ? "border-white/[0.08]" : "border-[var(--color-ink)]/[0.07]"
              }`}
            >
              <div className={`overflow-hidden rounded-2xl border ${formSheetBorder} ${formSheetBg} ${formSheetRing}`}>
                <div className={`divide-y ${formDivide}`}>
                  <div className={`${formRowGrid} ${formRowPad}`}>
                    <div className={`h-4 w-28 rounded-md ${isDark ? "bg-white/12" : "bg-[var(--color-ink)]/10"}`} />
                    <div className={`h-11 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                  </div>
                  <div className={`${formRowGrid} ${formRowPad}`}>
                    <div className={`h-4 w-24 rounded-md ${isDark ? "bg-white/12" : "bg-[var(--color-ink)]/10"}`} />
                    <div className={`h-11 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                  </div>
                  <div className={`${formRowGrid} ${formRowPad}`}>
                    <div className={`h-4 w-20 rounded-md ${isDark ? "bg-white/12" : "bg-[var(--color-ink)]/10"}`} />
                    <div className={`h-11 max-w-[7.5rem] rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                  </div>
                  <div className={`${formRowGrid} ${formRowPad}`}>
                    <div className={`h-4 w-32 rounded-md ${isDark ? "bg-white/12" : "bg-[var(--color-ink)]/10"}`} />
                    <div className="flex flex-wrap gap-2">
                      <div className={`h-9 w-[4.25rem] rounded-full ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                      <div className={`h-9 w-[4.25rem] rounded-full ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                    </div>
                  </div>
                  <div className={`${formRowGrid} ${formRowPad}`}>
                    <div className={`h-4 w-36 rounded-md ${isDark ? "bg-white/12" : "bg-[var(--color-ink)]/10"}`} />
                    <div className={`h-11 rounded-2xl ${isDark ? "bg-white/8" : "bg-[var(--color-ink)]/6"}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {loadState === "error" && errorMessage ? (
          <div
            className={`rounded-[2rem] px-6 py-8 sm:px-8 ${panelOuter} ${panelInner} ${
              isDark ? "ring-1 ring-red-400/20" : "ring-1 ring-red-200/50"
            }`}
          >
            <p
              role="alert"
              className={`text-sm leading-relaxed ${isDark ? "text-red-200/95" : "text-red-800"}`}
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
            <div
              className={`overflow-hidden rounded-[2rem] lg:rounded-[2.25rem] ${panelOuter} ${panelInner} lg:grid lg:grid-cols-[minmax(15rem,26%)_1fr] xl:grid-cols-[minmax(16rem,22%)_1fr] 2xl:grid-cols-[minmax(17rem,17%)_1fr] min-[1800px]:grid-cols-[minmax(18rem,15%)_1fr]`}
            >
              <div className="relative flex flex-col lg:h-full lg:min-h-[22rem]">
                <div
                  className={`relative h-36 shrink-0 overflow-hidden sm:h-44 lg:absolute lg:inset-0 lg:h-full ${profileBanner}`}
                  aria-hidden="true"
                >
                  <div className={`pointer-events-none absolute inset-0 ${profileBannerShine}`} />
                  <div
                    className={`pointer-events-none absolute -bottom-16 left-1/2 h-32 w-[140%] -translate-x-1/2 rounded-[100%] blur-2xl lg:opacity-80 ${
                      isDark ? "bg-[var(--color-rose)]/15" : "bg-white/70"
                    }`}
                  />
                </div>

                <div className="relative z-[1] flex flex-col items-center px-6 pb-2 pt-0 sm:px-8 lg:flex-1 lg:justify-center lg:px-6 lg:pb-10 lg:pt-10">
                  <div
                    className={`pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 -translate-y-[55%] rounded-full blur-3xl lg:h-44 lg:w-44 lg:-translate-y-[40%] ${
                      isDark ? "bg-[var(--color-rose)]/12" : "bg-[var(--color-rose)]/20"
                    }`}
                  />
                  <div className="relative -mt-[4.25rem] sm:-mt-[4.5rem] lg:mt-0">
                    <div className={`rounded-full ${avatarRingOuter}`}>
                      <div className={`rounded-full ${avatarRingInner}`}>
                        <div className="flex h-[7.5rem] w-[7.5rem] items-center justify-center overflow-hidden rounded-full sm:h-[8.5rem] sm:w-[8.5rem] lg:h-[9.25rem] lg:w-[9.25rem]">
                          <div
                            className={`flex h-full w-full items-center justify-center ${
                              isDark ? "bg-[#1c1c1f]" : "bg-[linear-gradient(160deg,#fffefb,#f0ebe4)]"
                            }`}
                          >
                            {draft.avatarUrl ? (
                              <img src={draft.avatarUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <span className={`font-display text-4xl sm:text-5xl lg:text-6xl ${mutedSoft}`} aria-hidden="true">
                                {(draft.name?.trim()?.[0] ?? draft.email?.[0] ?? "?").toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <label
                      className={`absolute bottom-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border shadow-lg transition hover:scale-[1.06] active:scale-95 lg:bottom-3 lg:right-3 lg:h-12 lg:w-12 ${
                        isDark
                          ? "border-white/12 bg-[var(--color-rose)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                          : "border-white/90 bg-[var(--color-rose)] text-white shadow-[0_10px_28px_rgba(197,167,161,0.45)]"
                      }`}
                      title={copy.changeAvatarShort}
                    >
                      <span className="sr-only">{copy.changePhoto}</span>
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onAvatarFile}
                        disabled={saveState === "saving"}
                      />
                    </label>
                  </div>
                  <p
                    className={`mt-6 text-center font-display text-[1.65rem] tracking-tight sm:text-[1.85rem] lg:mt-8 lg:text-[2rem] ${
                      isDark ? "text-white/[0.96]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {displayName}
                  </p>
                  {draft.email ? (
                    <p className={`mt-1.5 text-center text-[15px] lg:text-base ${muted}`}>{draft.email}</p>
                  ) : (
                    <p className={`mt-1.5 text-center text-[15px] italic ${mutedSoft}`}>—</p>
                  )}
                  <p className={`mt-3 max-w-[20rem] text-center text-[11px] leading-relaxed lg:text-xs ${mutedSoft}`}>
                    {copy.previewHint}
                  </p>
                </div>
              </div>

              <div
                className={`space-y-6 border-t px-6 py-8 sm:space-y-7 sm:px-8 sm:py-9 lg:border-l lg:border-t-0 lg:px-10 lg:py-10 xl:space-y-8 xl:px-12 xl:py-11 2xl:px-16 2xl:py-12 min-[1800px]:px-20 min-[1800px]:py-14 ${
                  isDark ? "border-white/[0.08]" : "border-[var(--color-ink)]/[0.07]"
                }`}
              >
                <div className={sectionHead}>
                  <span className={sectionAccent} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-display text-lg tracking-tight lg:text-xl ${isDark ? "text-white/92" : "text-[var(--color-ink)]"}`}
                    >
                      {copy.sectionDetails}
                    </p>
                    <p className={`mt-1.5 max-w-prose text-xs leading-relaxed lg:text-[13px] ${mutedSoft}`}>
                      {copy.body}
                    </p>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-2xl border ${formSheetBorder} ${formSheetBg} ${formSheetRing}`}>
                  <div className={`divide-y ${formDivide}`}>
                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <label className={rowLabel} htmlFor="profile-name">
                          {copy.name}
                        </label>
                      </div>
                      <input
                        id="profile-name"
                        type="text"
                        value={draft.name ?? ""}
                        onChange={(e) => setDraft((d) => (d ? { ...d, name: e.target.value } : d))}
                        disabled={saveState === "saving"}
                        className={inputSheet}
                        autoComplete="name"
                      />
                    </div>

                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <label className={rowLabel} htmlFor="profile-email">
                          {copy.email}
                        </label>
                      </div>
                      <input
                        id="profile-email"
                        type="email"
                        value={draft.email ?? ""}
                        onChange={(e) => setDraft((d) => (d ? { ...d, email: e.target.value } : d))}
                        disabled={saveState === "saving"}
                        className={inputSheet}
                        autoComplete="email"
                      />
                    </div>

                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <label className={rowLabel} htmlFor="profile-age">
                          {copy.age}
                        </label>
                      </div>
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
                                  age: v === "" ? null : Math.min(150, Math.max(0, parseInt(v, 10) || 0)),
                                }
                              : d,
                          );
                        }}
                        disabled={saveState === "saving"}
                        className={`${inputSheet} max-w-full sm:max-w-[8rem]`}
                      />
                    </div>

                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <p className={rowLabel} id="profile-gender-label">
                          {copy.gender}
                        </p>
                      </div>
                      <div
                        className="flex flex-wrap gap-2.5"
                        role="group"
                        aria-labelledby="profile-gender-label"
                      >
                        {genderChoices.map(({ value: gv, label }) => {
                          const on = (draft.gender ?? "unspecified") === gv;
                          return (
                            <button
                              key={gv}
                              type="button"
                              aria-pressed={on}
                              disabled={saveState === "saving"}
                              onClick={() => setDraft((d) => (d ? { ...d, gender: gv } : d))}
                              className={`${genderPillBase} ${on ? genderPillOn : genderPillOff}`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <label className={rowLabel} htmlFor="profile-avatar-url">
                          {copy.avatarUrlHint}
                        </label>
                      </div>
                      <input
                        id="profile-avatar-url"
                        type="url"
                        value={draft.avatarUrl?.startsWith("data:") ? "" : draft.avatarUrl ?? ""}
                        onChange={(e) =>
                          setDraft((d) => (d ? { ...d, avatarUrl: e.target.value.trim() || null } : d))
                        }
                        disabled={saveState === "saving"}
                        placeholder="https://…"
                        className={inputSheet}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-hidden rounded-2xl border border-dashed ${formSheetBorder} ${formSheetBg} ${formSheetRing}`}
                >
                  <div className={`divide-y ${formDivide}`}>
                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <p className={rowLabel}>{copy.sectionOptional}</p>
                        <p className={rowHint}>{language === "vi" ? "Không bắt buộc." : "Optional."}</p>
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="profile-phone">
                          {copy.phone}
                        </label>
                        <input
                          id="profile-phone"
                          type="tel"
                          value={draft.phone ?? ""}
                          onChange={(e) => setDraft((d) => (d ? { ...d, phone: e.target.value } : d))}
                          disabled={saveState === "saving"}
                          className={inputSheet}
                          autoComplete="tel"
                          placeholder={copy.phone}
                        />
                      </div>
                    </div>
                    <div className={`${formRowGrid} ${formRowPad}`}>
                      <div>
                        <p className={rowLabel}>{copy.additionalContact}</p>
                        <p className={rowHint}>{language === "vi" ? "Ví dụ Zalo, Telegram." : "e.g. Zalo, Telegram."}</p>
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="profile-additional-contact">
                          {copy.additionalContact}
                        </label>
                        <input
                          id="profile-additional-contact"
                          type="text"
                          value={draft.additionalContact ?? ""}
                          onChange={(e) =>
                            setDraft((d) =>
                              d ? { ...d, additionalContact: e.target.value.trim() || null } : d,
                            )
                          }
                          disabled={saveState === "saving"}
                          className={inputSheet}
                          autoComplete="off"
                          placeholder={copy.additionalContact}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {formError ? (
                  <p
                    role="alert"
                    className={`rounded-2xl border px-4 py-3.5 text-sm lg:px-5 ${
                      isDark
                        ? "border-amber-400/28 bg-amber-500/[0.1] text-amber-50"
                        : "border-amber-200/90 bg-amber-50/95 text-amber-950"
                    }`}
                  >
                    {formError}
                  </p>
                ) : null}

                <div
                  className={`flex flex-wrap items-center gap-3 border-t pt-6 sm:pt-7 lg:gap-4 lg:pt-8 ${
                    isDark ? "border-white/[0.06]" : "border-[var(--color-ink)]/[0.06]"
                  }`}
                >
                  <button
                    type="submit"
                    disabled={saveState === "saving"}
                    className="btn-primary inline-flex min-w-[10rem] items-center justify-center rounded-full px-10 py-3.5 text-sm font-semibold shadow-[0_14px_36px_rgba(197,167,161,0.38)] transition hover:brightness-[1.03] disabled:pointer-events-none disabled:opacity-55 dark:shadow-[0_16px_40px_rgba(0,0,0,0.38)]"
                  >
                    {saveState === "saving" ? copy.saving : saveState === "saved" ? copy.saved : copy.save}
                  </button>
                  <button
                    type="button"
                    onClick={resetDraft}
                    disabled={saveState === "saving"}
                    className={`inline-flex rounded-full border px-9 py-3.5 text-sm font-medium transition hover:opacity-90 disabled:opacity-45 ${
                      isDark
                        ? "border-white/14 bg-white/[0.06] text-white/92"
                        : "border-[var(--color-ink)]/10 bg-white text-[var(--color-ink)] shadow-sm"
                    }`}
                  >
                    {copy.reset}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}

        <div className="mt-10 flex justify-center sm:mt-14">
          <button
            type="button"
            onClick={() => logout()}
            className={`rounded-full border px-8 py-3 text-sm font-medium transition hover:opacity-90 ${
              isDark
                ? "border-white/12 bg-transparent text-white/55 hover:border-white/20 hover:bg-white/[0.04] hover:text-white/75"
                : "border-[var(--color-ink)]/10 bg-white/40 text-[var(--color-ink)]/55 hover:border-[var(--color-ink)]/18 hover:bg-white/70 hover:text-[var(--color-ink)]/75"
            }`}
          >
            {copy.logout}
          </button>
        </div>
      </div>
    </main>
  );
}
