"use client";

import { type FormEvent, useCallback, useMemo, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { isValidContactPhone } from "@/lib/phone";
import {
  REPORT_DESCRIPTION_MAX,
  REPORT_FULL_NAME_MAX,
  REPORT_PHONE_MAX,
  submitReportRequest,
  validateCreateReportInput,
  type ReportFieldErrors,
} from "@/lib/report-client";

type HomeContactReportFormProps = {
  fieldClassName: string;
};

export function HomeContactReportForm({ fieldClassName }: HomeContactReportFormProps) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ReportFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            typePlaceholder: "Chọn nhu cầu của bạn",
            option1: "Tôi muốn xem các mẫu có sẵn",
            option2: "Tôi muốn đặt website theo mẫu",
            option3: "Tôi muốn tư vấn thêm (gói, tên miền, v.v.)",
            opiton4: "Khác",
            nameLabel: "Họ và tên",
            phoneLabel: "Số điện thoại",
            needLabel: "Nhu cầu",
            messageLabel: "Nội dung (tuỳ chọn)",
            messageHint: `${REPORT_DESCRIPTION_MAX} ký tự tối đa`,
            submit: "Gửi yêu cầu tư vấn",
            submitting: "Đang gửi…",
            fullNameRequired: "Vui lòng nhập họ và tên.",
            fullNameMax: `Họ và tên tối đa ${REPORT_FULL_NAME_MAX} ký tự.`,
            phoneRequired: "Vui lòng nhập số điện thoại.",
            phoneMax: `Số điện thoại tối đa ${REPORT_PHONE_MAX} ký tự.`,
            phoneInvalid:
              "Nhập số di động Việt Nam (vd 09…, 03…) hoặc số quốc tế có mã vùng (+…).",
            typeRequired: "Vui lòng chọn một nhu cầu.",
            descriptionMax: `Nội dung tối đa ${REPORT_DESCRIPTION_MAX} ký tự.`,
            successTitle: "Đã gửi thành công",
            successBody:
              "Cảm ơn bạn đã liên hệ. Đội ngũ Lumiere sẽ đọc yêu cầu và phản hồi sớm qua số điện thoại hoặc kênh bạn để lại.",
            sendAnother: "Gửi yêu cầu khác",
            errorGeneric: "Không gửi được. Vui lòng thử lại sau.",
            errorNetwork: "Lỗi mạng. Kiểm tra kết nối và thử lại.",
            errorConfig: "Chưa cấu hình API (NEXT_PUBLIC_API_URL).",
          }
        : {
            typePlaceholder: "What do you need help with?",
            option1: "I want to browse ready-made templates",
            option2: "I want a website based on a template",
            option3: "I want more guidance (plans, domain, etc.)",
            opiton4: "Other",
            nameLabel: "Full name",
            phoneLabel: "Phone number",
            needLabel: "Request type",
            messageLabel: "Message (optional)",
            messageHint: `Up to ${REPORT_DESCRIPTION_MAX} characters`,
            submit: "Send my request",
            submitting: "Sending…",
            fullNameRequired: "Please enter your full name.",
            fullNameMax: `Full name must be at most ${REPORT_FULL_NAME_MAX} characters.`,
            phoneRequired: "Please enter your phone number.",
            phoneMax: `Phone must be at most ${REPORT_PHONE_MAX} characters.`,
            phoneInvalid:
              "Use a valid Vietnamese mobile (e.g. 09…, 03…) or international format with country code (+…).",
            typeRequired: "Please choose a request type.",
            descriptionMax: `Message must be at most ${REPORT_DESCRIPTION_MAX} characters.`,
            successTitle: "Thank you — we received it",
            successBody:
              "Our team will review your request and get back to you soon using the contact details you shared.",
            sendAnother: "Send another request",
            errorGeneric: "We could not send your request. Please try again.",
            errorNetwork: "Network error. Check your connection and try again.",
            errorConfig: "API URL is not configured (NEXT_PUBLIC_API_URL).",
          },
    [language],
  );

  const resolveFieldMessage = useCallback(
    (code: string | undefined): string => {
      if (!code) return "";
      if (code === "__FULL_NAME_REQUIRED__") return copy.fullNameRequired;
      if (code === "__FULL_NAME_MAX__") return copy.fullNameMax;
      if (code === "__PHONE_REQUIRED__") return copy.phoneRequired;
      if (code === "__PHONE_MAX__") return copy.phoneMax;
      if (code === "__PHONE_INVALID__") return copy.phoneInvalid;
      if (code === "__TYPE_REQUIRED__") return copy.typeRequired;
      if (code === "__DESCRIPTION_MAX__") return copy.descriptionMax;
      return code;
    },
    [copy],
  );

  const fieldRingError = isDark
    ? "ring-2 ring-rose-400/45 border-rose-400/35"
    : "ring-2 ring-[var(--color-rose)]/40 border-[var(--color-rose)]/35";

  const inputClass = (name: keyof ReportFieldErrors) =>
    `${fieldClassName} ${fieldErrors[name] ? fieldRingError : ""}`.trim();

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setType("");
    setDescription("");
    setFieldErrors({});
    setBannerMessage(null);
    setStatus("idle");
  };

  const dismissServerBanner = useCallback(() => {
    setBannerMessage((m) => (m ? null : m));
    setStatus((s) => (s === "error" ? "idle" : s));
  }, []);

  const clearFullNameErrorIfOk = useCallback((value: string) => {
    const t = value.trim();
    if (t.length > 0 && t.length <= REPORT_FULL_NAME_MAX) {
      setFieldErrors((prev) => {
        if (!prev.fullName) return prev;
        const next = { ...prev };
        delete next.fullName;
        return next;
      });
    }
  }, []);

  const clearPhoneErrorIfOk = useCallback((value: string) => {
    if (isValidContactPhone(value)) {
      setFieldErrors((prev) => {
        if (!prev.phone) return prev;
        const next = { ...prev };
        delete next.phone;
        return next;
      });
    }
  }, []);

  const clearTypeErrorIfOk = useCallback((value: number | "") => {
    if (value !== "" && Number.isInteger(value) && value >= 1) {
      setFieldErrors((prev) => {
        if (!prev.type) return prev;
        const next = { ...prev };
        delete next.type;
        return next;
      });
    }
  }, []);

  const clearDescriptionErrorIfOk = useCallback((value: string) => {
    if (value.length <= REPORT_DESCRIPTION_MAX) {
      setFieldErrors((prev) => {
        if (!prev.description) return prev;
        const next = { ...prev };
        delete next.description;
        return next;
      });
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBannerMessage(null);
    setFieldErrors({});

    const validated = validateCreateReportInput({ fullName, phone, type, description });
    if (!validated.ok) {
      const next: ReportFieldErrors = {};
      (Object.keys(validated.errors) as (keyof ReportFieldErrors)[]).forEach((k) => {
        const code = validated.errors[k];
        if (code) next[k] = code;
      });
      setFieldErrors(next);
      setStatus("idle");
      setBannerMessage(null);
      return;
    }

    setStatus("loading");
    const result = await submitReportRequest(validated.payload);

    if (result.ok) {
      setStatus("success");
      setBannerMessage(null);
      return;
    }

    setStatus("error");
    if (result.message === "__NETWORK__") {
      setBannerMessage(copy.errorNetwork);
      return;
    }
    if (result.message === "__MISSING_API__") {
      setBannerMessage(copy.errorConfig);
      return;
    }
    setBannerMessage(result.message || copy.errorGeneric);
  }

  if (status === "success") {
    return (
      <div
        className={`mx-auto mt-8 w-full min-w-0 max-w-3xl sm:mt-10 ${
          isDark
            ? "rounded-[1.25rem] border border-emerald-400/25 bg-[linear-gradient(145deg,rgba(52,211,153,0.12)_0%,rgba(24,24,26,0.95)_55%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:rounded-[1.5rem] sm:p-8"
            : "rounded-[1.25rem] border border-[color-mix(in_srgb,var(--color-sage)_45%,transparent)] bg-[linear-gradient(145deg,rgba(125,140,121,0.14)_0%,rgba(255,252,248,0.98)_48%,#faf6f1_100%)] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.08)] sm:rounded-[1.5rem] sm:p-8"
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-6">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
              isDark
                ? "bg-emerald-500/20 text-emerald-200"
                : "bg-[var(--color-sage)]/20 text-[var(--color-sage)]"
            }`}
            aria-hidden
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div className="mt-4 min-w-0 flex-1 sm:mt-0">
            <h3
              className={`font-display text-xl tracking-tight sm:text-2xl ${
                isDark ? "text-white" : "text-[var(--color-ink)]"
              }`}
            >
              {copy.successTitle}
            </h3>
            <p
              className={`mt-2 text-sm leading-relaxed sm:text-base sm:leading-7 ${
                isDark ? "text-white/75" : "text-[var(--color-ink)]/80"
              }`}
            >
              {copy.successBody}
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="btn-primary mt-6 cursor-pointer rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
            >
              {copy.sendAnother}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      className="mx-auto mt-8 grid w-full min-w-0 max-w-3xl grid-cols-1 gap-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-4"
      onSubmit={onSubmit}
      noValidate
    >
      {bannerMessage ? (
        <div
          className={`col-span-1 rounded-2xl border px-4 py-3 text-sm leading-relaxed sm:col-span-2 ${
            isDark
              ? "border-rose-400/30 bg-rose-500/10 text-rose-50/95"
              : "border-[var(--color-rose)]/25 bg-[color-mix(in_srgb,var(--color-rose)_08%,white)] text-[var(--color-ink)]"
          }`}
          role="alert"
        >
          {bannerMessage}
        </div>
      ) : null}

      <div className="col-span-1 sm:col-span-1">
        <label className="sr-only" htmlFor="contact-fullName">
          {copy.nameLabel}
        </label>
        <input
          id="contact-fullName"
          name="fullName"
          className={inputClass("fullName")}
          placeholder={copy.nameLabel}
          autoComplete="name"
          maxLength={REPORT_FULL_NAME_MAX + 5}
          value={fullName}
          onChange={(ev) => {
            const v = ev.target.value;
            setFullName(v);
            clearFullNameErrorIfOk(v);
            dismissServerBanner();
          }}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={fieldErrors.fullName ? "contact-fullName-err" : undefined}
        />
        {fieldErrors.fullName ? (
          <p id="contact-fullName-err" className="mt-1.5 text-xs text-rose-500 dark:text-rose-300">
            {resolveFieldMessage(fieldErrors.fullName)}
          </p>
        ) : null}
      </div>

      <div className="col-span-1 sm:col-span-1">
        <label className="sr-only" htmlFor="contact-phone">
          {copy.phoneLabel}
        </label>
        <input
          id="contact-phone"
          name="phone"
          className={inputClass("phone")}
          placeholder={copy.phoneLabel}
          autoComplete="tel"
          inputMode="tel"
          maxLength={REPORT_PHONE_MAX + 5}
          value={phone}
          onChange={(ev) => {
            const v = ev.target.value;
            setPhone(v);
            clearPhoneErrorIfOk(v);
            dismissServerBanner();
          }}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "contact-phone-err" : undefined}
        />
        {fieldErrors.phone ? (
          <p id="contact-phone-err" className="mt-1.5 text-xs text-rose-500 dark:text-rose-300">
            {resolveFieldMessage(fieldErrors.phone)}
          </p>
        ) : null}
      </div>

      <div className="col-span-1 sm:col-span-2">
        <label className="sr-only" htmlFor="contact-type">
          {copy.needLabel}
        </label>
        <select
          id="contact-type"
          name="type"
          className={inputClass("type")}
          value={type === "" ? "" : String(type)}
          onChange={(ev) => {
            const v = ev.target.value;
            const num = v === "" ? "" : Number(v);
            setType(num);
            clearTypeErrorIfOk(num);
            dismissServerBanner();
          }}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.type)}
          aria-describedby={fieldErrors.type ? "contact-type-err" : undefined}
        >
          <option value="" disabled>
            {copy.typePlaceholder}
          </option>
          <option value="1">{copy.option1}</option>
          <option value="2">{copy.option2}</option>
          <option value="3">{copy.option3}</option>
          <option value="4">{copy.opiton4}</option>
        </select>
        {fieldErrors.type ? (
          <p id="contact-type-err" className="mt-1.5 text-xs text-rose-500 dark:text-rose-300">
            {resolveFieldMessage(fieldErrors.type)}
          </p>
        ) : null}
      </div>

      <div className="col-span-1 sm:col-span-2">
        <label className="sr-only" htmlFor="contact-description">
          {copy.messageLabel}
        </label>
        <textarea
          id="contact-description"
          name="description"
          className={`min-h-28 resize-y sm:min-h-32 ${inputClass("description")}`}
          placeholder={copy.messageLabel}
          rows={5}
          maxLength={REPORT_DESCRIPTION_MAX}
          value={description}
          onChange={(ev) => {
            const v = ev.target.value;
            setDescription(v);
            clearDescriptionErrorIfOk(v);
            dismissServerBanner();
          }}
          disabled={status === "loading"}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby="contact-desc-hint contact-desc-err"
        />
        <p
          id="contact-desc-hint"
          className={`mt-1.5 text-xs ${isDark ? "text-white/45" : "text-[var(--color-ink)]/50"}`}
        >
          {copy.messageHint}
          {description.length > 0
            ? ` · ${description.length}/${REPORT_DESCRIPTION_MAX}`
            : null}
        </p>
        {fieldErrors.description ? (
          <p id="contact-desc-err" className="mt-1 text-xs text-rose-500 dark:text-rose-300">
            {resolveFieldMessage(fieldErrors.description)}
          </p>
        ) : null}
      </div>

      <div className="col-span-1 flex justify-center sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full cursor-pointer rounded-full px-6 py-3.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto sm:px-7 sm:py-4"
        >
          {status === "loading" ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
