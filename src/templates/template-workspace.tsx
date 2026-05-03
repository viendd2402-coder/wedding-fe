"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { useMessages } from "@/i18n/use-messages";
import { siteContact } from "@/lib/site-contact";
import {
  defaultPreviewData,
  defaultPreviewImages,
  type LightboxImage,
  type PreviewData,
  type PreviewImages,
  type TemplatePreviewProps,
} from "@/templates/preview-types";
import { gentleDriftWorkspaceInitialPreview } from "@/templates/paid/gentle-drift/data";
import type { WeddingTemplate } from "@/lib/templates/types";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";
import { getStoredAuthToken } from "@/lib/auth-client";
import {
  buildPaymentInvitationFromPreview,
  parsePaymentInvitationSubdomain,
} from "@/lib/create-payment-invitation";
import type { TemplateWorkspacePanelMessages } from "@/i18n/messages/template-workspace-ui";
import GentleDriftWorkspaceCountdown from "@/components/gentle-drift-workspace-countdown";

/** Phần cố định sau subdomain (chỉ gửi label subdomain lên API). */
const INVITE_SUBDOMAIN_PUBLIC_SUFFIX = ".lumiere-wedding.com";

/** Gợi ý placeholder từ tên chú rể + cô dâu (chuẩn hoá ASCII cho hostname). */
function suggestedSubdomainPlaceholderFromNames(groom: string, bride: string): string {
  const parts = [groom.trim(), bride.trim()].filter(Boolean);
  if (!parts.length) return "";
  let s = parts.join("-").replace(/\s+/g, "-");
  s = s
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 63);
  return s;
}

function PanelFieldBlock({
  label,
  tag,
  isDark,
  children,
}: {
  label: string;
  tag: string;
  isDark: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <span
        className={`text-sm font-medium ${isDark ? "text-white/92" : "text-[var(--color-ink)]"}`}
      >
        {label}
      </span>
      {tag ? (
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-sage)]">
          {tag}
        </span>
      ) : null}
      {children}
    </div>
  );
}

/** Khối tuỳ chỉnh slide-flex: tiêu đề + danh sách giá trị (inventory) + nội dung. */
function SlideFlexWorkspaceSection({
  title,
  inventory,
  isDark,
  children,
}: {
  title: string;
  inventory?: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex min-w-0 flex-col gap-4 rounded-2xl border px-3 py-4 sm:px-4 ${
        isDark ? "border-white/12 bg-white/[0.04]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/80"
      }`}
    >
      <h3
        className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-[var(--color-ink)]"}`}
      >
        {title}
      </h3>
      {inventory && (
        <p
          className={`whitespace-pre-line text-[11px] font-medium leading-relaxed ${isDark ? "text-white/68" : "text-[var(--color-sage)]"}`}
        >
          {inventory}
        </p>
      )}
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
    </section>
  );
}

function SlideFlexPortraitUpload({
  label,
  tag,
  hasImage,
  selectedLabel,
  emptyLabel,
  isDark,
  hideTags,
  onPick,
}: {
  label: string;
  tag: string;
  hasImage: boolean;
  selectedLabel: string;
  emptyLabel: string;
  isDark: boolean;
  hideTags?: boolean;
  onPick: (file: File | null) => void;
}) {
  return (
    <label
      className={`block rounded-2xl border border-dashed px-4 py-3 text-sm cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}
    >
      <PanelFieldBlock label={label} tag={hideTags ? "" : tag} isDark={isDark}>
        <span
          className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
        >
          {hasImage ? selectedLabel : emptyLabel}
        </span>
        <input
          type="file"
          accept="image/*"
          className="mt-3 block w-full min-w-0 cursor-pointer text-xs"
          onChange={(event) => onPick(event.target.files?.[0] ?? null)}
        />
      </PanelFieldBlock>
    </label>
  );
}

type TemplateWorkspaceCommonFieldGroup =
  | "all"
  | "gentle-drift-names"
  | "gentle-drift-venue"
  | "gentle-drift-bank"
  | "gentle-drift-cover"
  | "gentle-drift-album";

function TemplateWorkspaceCommonFields({
  copy,
  inputClass,
  preview,
  onChange,
  images,
  onCoverImageChange,
  onGalleryImageChange,
  isDark,
  gallerySlotTags,
  gallerySlotCount = 6,
  fieldGroup = "all",
  photoFieldTags,
  gentleDriftCountdownPicker = false,
  gentleDriftCountdownWorkspaceHint = "",
  hideCountdown = false,
  hideTags = false,
}: {
  copy: TemplateWorkspacePanelMessages;
  inputClass: string;
  preview: PreviewData;
  onChange: (key: keyof PreviewData, value: string) => void;
  images: PreviewImages;
  onCoverImageChange: (file: File | null) => void;
  onGalleryImageChange: (index: number, file: File | null) => void;
  isDark: boolean;
  gallerySlotTags: readonly string[];
  /** Số ô upload album (Gentle Drift = 30, mặc định 6). */
  gallerySlotCount?: number;
  fieldGroup?: TemplateWorkspaceCommonFieldGroup;
  /** Khi nhóm ảnh của gentle-drift: thẻ vị trí riêng, không dùng mô tả slide-flex. */
  photoFieldTags?: { coverImage: string; gallerySection: string };
  /** Gentle Drift: ô chọn ngày giờ thay vì gõ chuỗi ISO thuần. */
  gentleDriftCountdownPicker?: boolean;
  gentleDriftCountdownWorkspaceHint?: string;
  hideCountdown?: boolean;
  hideTags?: boolean;
}) {
  const { language } = useGlobalPreferences();
  const g = fieldGroup;
  const show = (part: Exclude<TemplateWorkspaceCommonFieldGroup, "all">) =>
    g === "all" || g === part;
  const coverTag = photoFieldTags?.coverImage ?? copy.tagCoverImage;
  const gallerySectionTag = photoFieldTags?.gallerySection ?? copy.tagGallerySection;

  return (
    <>
      {show("gentle-drift-names") ? (
        <>
          <PanelFieldBlock label={copy.groomName} tag={hideTags ? "" : copy.tagGroom} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.groom}
              onChange={(event) => onChange("groom", event.target.value)}
              placeholder={copy.groomName}
            />
          </PanelFieldBlock>
          <PanelFieldBlock label={copy.brideName} tag={hideTags ? "" : copy.tagBride} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.bride}
              onChange={(event) => onChange("bride", event.target.value)}
              placeholder={copy.brideName}
            />
          </PanelFieldBlock>
          <PanelFieldBlock label={copy.dateLabel} tag={hideTags ? "" : copy.tagDateLabel} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.dateLabel}
              onChange={(event) => onChange("dateLabel", event.target.value)}
              placeholder={copy.dateLabel}
            />
          </PanelFieldBlock>
      {show("gentle-drift-names") && !hideCountdown ? (
        <PanelFieldBlock
          label={copy.countdownTarget}
          tag={hideTags ? "" : copy.tagCountdownTarget}
          isDark={isDark}
        >
          {gentleDriftCountdownPicker ? (
            <GentleDriftWorkspaceCountdown
              value={preview.countdownTarget}
              onChange={(next) => onChange("countdownTarget", next)}
              language={language}
              isDark={isDark}
              hint={gentleDriftCountdownWorkspaceHint || copy.countdownTargetHint}
            />
          ) : (
            <>
              <input
                className={inputClass}
                value={preview.countdownTarget}
                onChange={(event) => onChange("countdownTarget", event.target.value)}
                placeholder="2026-10-20T09:00"
                autoComplete="off"
              />
              <p
                className={`text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
              >
                {copy.countdownTargetHint}
              </p>
            </>
          )}
        </PanelFieldBlock>
      ) : null}
        </>
      ) : null}
      {show("gentle-drift-venue") ? (
      <div className="grid grid-cols-1 gap-3.5">
        <PanelFieldBlock label={copy.ceremonyTime} tag={hideTags ? "" : copy.tagCeremonyTime} isDark={isDark}>
          <input
            className={inputClass}
            value={preview.ceremonyTime}
            onChange={(event) => onChange("ceremonyTime", event.target.value)}
            placeholder={copy.ceremonyTime}
          />
        </PanelFieldBlock>
        <PanelFieldBlock label={copy.partyTime} tag={hideTags ? "" : copy.tagPartyTime} isDark={isDark}>
          <input
            className={inputClass}
            value={preview.partyTime}
            onChange={(event) => onChange("partyTime", event.target.value)}
            placeholder={copy.partyTime}
          />
        </PanelFieldBlock>
      </div>
      ) : null}
      {show("gentle-drift-venue") ? (
      <PanelFieldBlock label={copy.venue} tag={hideTags ? "" : copy.tagVenue} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.venue}
          onChange={(event) => onChange("venue", event.target.value)}
          placeholder={copy.venue}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-venue") ? (
      <PanelFieldBlock label={copy.location} tag={hideTags ? "" : copy.tagLocation} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.location}
          onChange={(event) => onChange("location", event.target.value)}
          placeholder={copy.location}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.bankName} tag={hideTags ? "" : copy.tagBankName} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.bankName}
          onChange={(event) => onChange("bankName", event.target.value)}
          placeholder={copy.bankName}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.accountName} tag={hideTags ? "" : copy.tagAccountName} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.accountName}
          onChange={(event) => onChange("accountName", event.target.value)}
          placeholder={copy.accountName}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.accountNumber} tag={hideTags ? "" : copy.tagAccountNumber} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.accountNumber}
          onChange={(event) => onChange("accountNumber", event.target.value)}
          placeholder={copy.accountNumber}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-cover") ? (
      <label
        className={`block rounded-2xl border border-dashed px-4 py-3 text-sm cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}
      >
        <PanelFieldBlock label={copy.coverImage} tag={hideTags ? "" : coverTag} isDark={isDark}>
          <span
            className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
          >
            {images.coverImage ? copy.coverSelected : copy.coverEmpty}
          </span>
          <input
            type="file"
            accept="image/*"
            className="mt-3 block w-full min-w-0 cursor-pointer text-xs"
            onChange={(event) => onCoverImageChange(event.target.files?.[0] ?? null)}
          />
        </PanelFieldBlock>
      </label>
      ) : null}
      {show("gentle-drift-album") ? (
      <div className="rounded-2xl border border-dashed px-4 py-3 text-sm">
        <PanelFieldBlock label={copy.gallery} tag={hideTags ? "" : gallerySectionTag} isDark={isDark}>
          <div className="mt-3 grid gap-3.5">
            {Array.from({ length: gallerySlotCount }, (_, index) => (
              <label
                key={index}
                className={`rounded-xl border border-dashed px-3 py-2 text-sm cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${
                  isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"
                }`}
              >
                <PanelFieldBlock
                  label={`${copy.imageLabel} ${index + 1}`}
                  tag={hideTags ? "" : (gallerySlotTags[index] ?? `${copy.imageLabel} ${index + 1}`)}
                  isDark={isDark}
                >
                  <span
                    className={`block text-[11px] ${isDark ? "text-white/60" : "text-[var(--color-ink)]/60"}`}
                  >
                    {images.galleryImages[index] ? copy.imageSelected : copy.imageDefault}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full min-w-0 cursor-pointer"
                    onChange={(event) =>
                      onGalleryImageChange(index, event.target.files?.[0] ?? null)
                    }
                  />
                </PanelFieldBlock>
              </label>
            ))}
          </div>
        </PanelFieldBlock>
      </div>
      ) : null}
    </>
  );
}

function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null;
  onClose: () => void;
}) {
  const { theme } = useGlobalPreferences();
  const { templateWorkspace } = useMessages();
  const copy = templateWorkspace.lightbox;
  const isDark = theme === "dark";

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/82 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl min-w-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-2 top-[max(0.5rem,env(safe-area-inset-top))] z-10 inline-flex h-10 w-10 items-center justify-center rounded-full shadow transition cursor-pointer sm:right-3 sm:top-3 ${
            isDark
              ? "bg-white/12 text-white hover:bg-white/18"
              : "bg-white/90 text-[var(--color-ink)] hover:bg-white"
          }`}
          aria-label={copy.close}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <div className="relative h-[min(85dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] max-h-[85vh] w-full overflow-hidden rounded-[1.4rem] bg-white/10 sm:rounded-[1.8rem]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

function PreviewConfigurator({
  template,
  preview,
  onChange,
  images,
  onCoverImageChange,
  onGalleryImageChange,
  onIntroBannerImageChange,
  onGroomPortraitImageChange,
  onBridePortraitImageChange,
  onGdFooterImageChange,
  onBbInvitationBgChange,
  onBbEventsBgChange,
  onBbFooterBgChange,
  onCoverImage2Change,
  onCoverImage3Change,
  onCoverImage4Change,
  isCollapsed,
  onToggleCollapsed,
}: {
  template: WeddingTemplate;
  preview: PreviewData;
  onChange: (key: keyof PreviewData, value: string) => void;
  images: PreviewImages;
  onCoverImageChange: (file: File | null) => void;
  onGalleryImageChange: (index: number, file: File | null) => void;
  onIntroBannerImageChange: (file: File | null) => void;
  onGroomPortraitImageChange: (file: File | null) => void;
  onBridePortraitImageChange: (file: File | null) => void;
  onGdFooterImageChange: (file: File | null) => void;
  onBbInvitationBgChange: (file: File | null) => void;
  onBbEventsBgChange: (file: File | null) => void;
  onBbFooterBgChange: (file: File | null) => void;
  onCoverImage2Change: (file: File | null) => void;
  onCoverImage3Change: (file: File | null) => void;
  onCoverImage4Change: (file: File | null) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const router = useRouter();
  const { theme } = useGlobalPreferences();
  const { templateWorkspace } = useMessages();
  const copy = templateWorkspace.panel;
  const isDark = theme === "dark";

  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [freeLoading, setFreeLoading] = useState(false);
  const [freeError, setFreeError] = useState<string | null>(null);
  const isPremium = template.tier === "Trả phí";
  const [subdomainManuallyEdited, setSubdomainManuallyEdited] = useState(false);
  const [desiredSubdomain, setDesiredSubdomain] = useState(() =>
    isPremium ? suggestedSubdomainPlaceholderFromNames(preview.groom, preview.bride) : "",
  );

  const clientNote = useMemo(
    () =>
      [
        `Template: ${template.name} (${template.slug})`,
        preview.groom && preview.bride ? `${preview.groom} & ${preview.bride}` : "",
        preview.dateLabel,
        preview.location,
      ]
        .filter(Boolean)
        .join(" · "),
    [preview.bride, preview.dateLabel, preview.groom, preview.location, template.name, template.slug],
  );

  const payBuyerName = useMemo(() => {
    const g = preview.groom.trim();
    const b = preview.bride.trim();
    if (g && b) return `${g} & ${b}`;
    if (g) return g;
    if (b) return b;
    return "";
  }, [preview.bride, preview.groom]);

  const autoSubdomain = useMemo(
    () => suggestedSubdomainPlaceholderFromNames(preview.groom, preview.bride),
    [preview.bride, preview.groom],
  );

  useEffect(() => {
    if (!isPremium) return;
    if (subdomainManuallyEdited) return;
    setDesiredSubdomain(autoSubdomain);
  }, [autoSubdomain, isPremium, subdomainManuallyEdited]);

  const sendConsultEmail = useCallback(() => {
    const body = [`Template: ${template.name} (${template.slug})`, "", clientNote].join("\n");
    window.location.href = `mailto:${siteContact.email}?subject=${encodeURIComponent(copy.paymentMailSubject)}&body=${encodeURIComponent(body)}`;
  }, [clientNote, copy.paymentMailSubject, template.name, template.slug]);

  const startPremiumCheckout = useCallback(async () => {
    setPayError(null);
    const subParsed = parsePaymentInvitationSubdomain(desiredSubdomain);
    if (!subParsed.ok) {
      setPayError(copy.paymentSubdomainInvalid);
      return;
    }
    const invitation = buildPaymentInvitationFromPreview(
      template.slug,
      preview,
      images,
      subParsed.value ? { subdomain: subParsed.value } : undefined,
    );
    if (!invitation) {
      setPayError(copy.paymentInviteIncomplete);
      return;
    }
    setPayLoading(true);
    try {
      const token = getStoredAuthToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch("/api/payments/payment-link", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          invitation,
        }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok) {
        if (data.error === "payment_config") {
          setPayError(copy.paymentNotConfigured);
        } else if (data.error === "not_premium") {
          setPayError(copy.paymentFailed);
        } else if (data.error === "invalid_invitation") {
          setPayError(copy.paymentInviteIncomplete);
        } else {
          setPayError(copy.paymentFailed);
        }
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setPayError(copy.paymentFailed);
    } catch {
      setPayError(copy.paymentFailed);
    } finally {
      setPayLoading(false);
    }
  }, [
    copy.paymentFailed,
    copy.paymentInviteIncomplete,
    copy.paymentNotConfigured,
    copy.paymentSubdomainInvalid,
    desiredSubdomain,
    images,
    preview,
    template.slug,
  ]);

  const startFreeInvitation = useCallback(async () => {
    setFreeError(null);
    const invitation = buildPaymentInvitationFromPreview(template.slug, preview, images);
    if (!invitation) {
      setFreeError(copy.paymentInviteIncomplete);
      return;
    }
    setFreeLoading(true);
    try {
      const token = getStoredAuthToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch("/api/payments/free-invitation", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ invitation }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok) {
        if (data.error === "payment_config") {
          setFreeError(copy.paymentNotConfigured);
        } else if (data.error === "not_free") {
          setFreeError(copy.paymentNotFree);
        } else if (data.error === "invalid_invitation") {
          setFreeError(copy.paymentInviteIncomplete);
        } else {
          setFreeError(copy.paymentFreeFailed);
        }
        return;
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      router.push("/my-invitations");
    } catch {
      setFreeError(copy.paymentFreeFailed);
    } finally {
      setFreeLoading(false);
    }
  }, [
    copy.paymentFreeFailed,
    copy.paymentInviteIncomplete,
    copy.paymentNotConfigured,
    copy.paymentNotFree,
    images,
    preview,
    router,
    template.slug,
  ]);

  const isSlideFlex = template.slug === "slide-flex";
  const isGentleDrift = template.slug === "gentle-drift";
  const isBrightlyBasic = template.slug === "brightly-basic";
  const isTimelessLove = template.slug === "timeless-love";
  const isGentleHarmony = template.slug === "gentle-harmony";
  const isRusticBreeze = template.slug === "rustic-breeze";
  const isModernPulse = template.slug === "modern-pulse";
  const isNoirEditorial = template.slug === "noir-editorial";
  const isSereneCanvas = template.slug === "serene-canvas";
  const isSoftSerenity = template.slug === "soft-serenity";
  const isFreeMinimalist =
    isGentleHarmony ||
    isRusticBreeze ||
    isModernPulse ||
    isNoirEditorial ||
    isSereneCanvas ||
    isSoftSerenity;


  const sf = copy.slideFlex;
  const gd = copy.gentleDrift;
  const bb = copy.brightlyBasic;
  // Fallback to brightlyBasic copy for timelessLove since there's no dedicated workspace copy, or use common ones
  const tl = copy.brightlyBasic;
  const gentleDriftAlbumSlotCount = useMemo(() => {
    if (!isGentleDrift) return 30;
    const n = Number.parseInt(preview.gdAlbumVisibleCount?.trim() ?? "", 10);
    if (!Number.isFinite(n)) return 15;
    return Math.min(30, Math.max(1, n));
  }, [isGentleDrift, preview.gdAlbumVisibleCount]);

  const freeAlbumSlotCount = useMemo(() => {
    if (!isFreeMinimalist) return 15;
    const n = Number.parseInt(preview.ghAlbumVisibleCount?.trim() ?? "", 10);
    if (!Number.isFinite(n)) return isSoftSerenity ? 10 : 6; 
    return Math.min(30, Math.max(1, n));
  }, [isFreeMinimalist, isSoftSerenity, preview.ghAlbumVisibleCount]);
  const gallerySlotTags = useMemo((): readonly string[] => {
    const six = [
      copy.tagGallerySlot1,
      copy.tagGallerySlot2,
      copy.tagGallerySlot3,
      copy.tagGallerySlot4,
      copy.tagGallerySlot5,
      copy.tagGallerySlot6,
    ] as const;
    if (isBrightlyBasic) {
      return [
        bb.tagGallerySlot1,
        bb.tagGallerySlot2,
        bb.tagGallerySlot3,
        bb.tagGallerySlot4,
        bb.tagGallerySlot5,
        bb.tagGallerySlot6,
      ] as const;
    }
    if (!isGentleDrift) return six;
    const extra = [
      gd.tagGallerySlot7,
      gd.tagGallerySlot8,
      gd.tagGallerySlot9,
      gd.tagGallerySlot10,
      gd.tagGallerySlot11,
      gd.tagGallerySlot12,
    ];
    for (let slot = 13; slot <= 30; slot++) {
      extra.push(gd.albumSlotTagFromIndex.replace("{n}", String(slot)));
    }
    return [...six, ...extra];
  }, [bb, copy, gd, isBrightlyBasic, isGentleDrift]);

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={onToggleCollapsed}
        className={`fixed bottom-[max(0.25rem,env(safe-area-inset-bottom))] right-[max(0.25rem,env(safe-area-inset-right))] z-50 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full backdrop-blur transition ${
          isDark
            ? "border border-white/10 bg-white/10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:bg-white/14"
            : "border border-[var(--color-ink)]/10 bg-white/92 text-[var(--color-ink)] shadow-[0_24px_60px_rgba(49,42,40,0.14)] hover:bg-white"
        }`}
        aria-label={copy.openPreview}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    );
  }

  const inputClass = `w-full min-w-0 rounded-2xl px-4 py-3.5 outline-none ${
    isDark
      ? "border border-white/10 bg-white/6 text-white placeholder:text-white/35"
      : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)] placeholder:text-[var(--color-ink)]/35"
  }`;

  const textareaClass = `${inputClass} min-h-[5.5rem] resize-y`;

  const gdBeatCount = isGentleDrift
    ? Math.min(8, Math.max(3, Number.parseInt(preview.gdTimelineBeatCount || "3", 10) || 3))
    : 3;
  const gdBeatSlots = Array.from({ length: gdBeatCount }, (_, i) => i + 1);

  return (
    <div
      className={`fixed bottom-[max(0.25rem,env(safe-area-inset-bottom))] left-[max(0.5rem,env(safe-area-inset-left))] right-[max(0.5rem,env(safe-area-inset-right))] z-50 flex max-h-[min(90vh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-0.5rem))] flex-col rounded-[1.8rem] p-4 backdrop-blur sm:bottom-[max(0.25rem,env(safe-area-inset-bottom))] sm:left-auto sm:right-[max(0rem,env(safe-area-inset-right))] sm:w-[min(440px,calc(100vw-env(safe-area-inset-left)-env(safe-area-inset-right)))] sm:rounded-l-[1.8rem] sm:rounded-r-none sm:p-6 md:w-[min(480px,calc(100vw-env(safe-area-inset-left)-env(safe-area-inset-right)))] ${
        isDark
          ? "border border-white/10 bg-[#0f0f10]/92 text-white shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
          : "border border-[var(--color-ink)]/10 bg-white/92 shadow-[0_24px_60px_rgba(49,42,40,0.14)]"
      }`}
    >
      <div className="flex shrink-0 items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-sage)]">
            {copy.titleEyebrow}
          </p>
          <h2 className="mt-3 min-w-0 font-display text-2xl leading-snug sm:text-3xl">{copy.title}</h2>
        </div>
        <button
          type="button"
          onClick={onToggleCollapsed}
          className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full shadow transition ${
            isDark
              ? "border border-white/10 bg-white/8 text-white hover:bg-white/12"
              : "border border-[var(--color-ink)]/10 bg-white/90 text-[var(--color-ink)] hover:bg-white"
          }`}
          aria-label={copy.closePreview}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="mt-4 min-h-0 min-w-0 flex-1 overflow-y-auto pr-1">
        <div className="grid min-w-0 gap-3.5">
          {isPremium ? (
            <PanelFieldBlock
              label={copy.desiredSubdomainLabel}
              tag={copy.tagDesiredSubdomain}
              isDark={isDark}
            >
              <div
                className={`flex min-w-0 items-stretch overflow-hidden rounded-2xl border ${
                  isDark
                    ? "border-white/10 bg-white/6"
                    : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
                }`}
              >
                <input
                  type="text"
                  className={`min-w-0 flex-1 border-0 bg-transparent px-4 py-3.5 outline-none ${
                    isDark
                      ? "text-white placeholder:text-white/35"
                      : "text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/35"
                  }`}
                  value={desiredSubdomain}
                  onChange={(e) => {
                    setSubdomainManuallyEdited(true);
                    setDesiredSubdomain(e.target.value);
                  }}
                  placeholder={autoSubdomain || undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
                <input
                  type="text"
                  readOnly
                  tabIndex={-1}
                  value={INVITE_SUBDOMAIN_PUBLIC_SUFFIX}
                  aria-label={copy.desiredSubdomainSuffixAria}
                  className={`pointer-events-none shrink-0 cursor-default border-0 border-l bg-transparent py-3.5 pl-2 pr-3 font-mono text-[10px] leading-tight outline-none sm:pl-3 sm:text-xs ${
                    isDark
                      ? "border-white/10 text-white/55"
                      : "border-[var(--color-ink)]/10 text-[var(--color-ink)]/60"
                  }`}
                />
              </div>
              <p
                className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
              >
                {copy.desiredSubdomainHint}
              </p>
            </PanelFieldBlock>
          ) : null}
          {isGentleDrift ? (
            <>
              <div
                className={`min-w-0 rounded-2xl border px-3 py-3.5 sm:px-4 ${isDark ? "border-white/12 bg-white/[0.04]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/85"}`}
              >
                <p className="text-xs font-bold tracking-tight text-[var(--color-rose)]">
                  {gd.deepSectionTitle}
                </p>
                <p
                  className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/72" : "text-[var(--color-ink)]/75"}`}
                >
                  {gd.deepSectionLead}
                </p>
              </div>
              <SlideFlexWorkspaceSection
                title={gd.bannerHeroSectionTitle}
                inventory={gd.bannerHeroSectionInventory}
                isDark={isDark}
              >
                <div
                  className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}
                >
                  <PanelFieldBlock label={gd.introBannerLabel} tag={gd.tagIntroBanner} isDark={isDark}>
                    <span
                      className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
                    >
                      {images.introBannerImage ? copy.coverSelected : gd.introBannerHint}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-3 block w-full min-w-0 text-xs"
                      onChange={(event) =>
                        onIntroBannerImageChange(event.target.files?.[0] ?? null)
                      }
                    />
                  </PanelFieldBlock>
                </div>
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-cover"
                  photoFieldTags={{
                    coverImage: gd.tagCoverImage,
                    gallerySection: gd.tagGallerySection,
                  }}
                />
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-names"
                  gentleDriftCountdownPicker
                  gentleDriftCountdownWorkspaceHint={gd.countdownWorkspaceHint}
                />
                <PanelFieldBlock label={gd.heroLeadLabel} tag={gd.tagHeroLead} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdHeroLead}
                    onChange={(event) => onChange("gdHeroLead", event.target.value)}
                    rows={3}
                    placeholder={gd.heroLeadLabel}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.heroLeadHint}
                  </p>
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.inviteWorkspaceSectionTitle}
                inventory={gd.inviteWorkspaceSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={gd.inviteBodyLabel} tag={gd.tagInviteBody} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdInviteBody}
                    onChange={(event) => onChange("gdInviteBody", event.target.value)}
                    rows={4}
                    placeholder={gd.inviteBodyLabel}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.coupleDetailsSectionTitle}
                inventory={gd.coupleDetailsSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={gd.coupleQuoteLabel} tag={gd.tagCoupleQuote} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdCoupleQuote}
                    onChange={(event) => onChange("gdCoupleQuote", event.target.value)}
                    rows={3}
                    placeholder={gd.coupleQuoteLabel}
                  />
                </PanelFieldBlock>
                <SlideFlexPortraitUpload
                  label={gd.groomCouplePortraitLabel}
                  tag={gd.tagGroomCouplePortrait}
                  hasImage={Boolean(images.groomPortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onGroomPortraitImageChange}
                />
                <SlideFlexPortraitUpload
                  label={gd.brideCouplePortraitLabel}
                  tag={gd.tagBrideCouplePortrait}
                  hasImage={Boolean(images.bridePortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onBridePortraitImageChange}
                />
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {copy.groomName}
                </p>
                <PanelFieldBlock label={sf.groomParentLine1} tag={sf.tagGroomParentLine1} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.groomParentLine1}
                    onChange={(event) => onChange("groomParentLine1", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.groomParentLine2} tag={sf.tagGroomParentLine2} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.groomParentLine2}
                    onChange={(event) => onChange("groomParentLine2", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.groomBio} tag={sf.tagGroomBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.groomBio}
                    onChange={(event) => onChange("groomBio", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {copy.brideName}
                </p>
                <PanelFieldBlock label={sf.brideParentLine1} tag={sf.tagBrideParentLine1} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.brideParentLine1}
                    onChange={(event) => onChange("brideParentLine1", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.brideParentLine2} tag={sf.tagBrideParentLine2} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.brideParentLine2}
                    onChange={(event) => onChange("brideParentLine2", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.brideBio} tag={sf.tagBrideBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.brideBio}
                    onChange={(event) => onChange("brideBio", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.timelineSectionTitle}
                inventory={gd.timelineSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={gd.storyLeadLabel} tag={gd.tagStoryLead} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdStoryLead}
                    onChange={(event) => onChange("gdStoryLead", event.target.value)}
                    rows={3}
                    placeholder={gd.storyLeadLabel}
                  />
                </PanelFieldBlock>
                {gdBeatSlots.map((n) => (
                  <div
                    key={n}
                    className={`grid gap-2.5 rounded-xl border px-3 py-3 text-xs ${isDark ? "border-white/12 bg-white/[0.03]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-sage)]">
                      {sf.storySlotLabel} {n}
                    </p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-sage)]/90">
                      {sf.tagStorySlot}
                    </span>
                    <PanelFieldBlock label={gd.timelineYearFieldLabel} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`timeline${n}Title` as keyof PreviewData] as string}
                        onChange={(event) =>
                          onChange(`timeline${n}Title` as keyof PreviewData, event.target.value)
                        }
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={gd.timelineTitleFieldLabel} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`timeline${n}Date` as keyof PreviewData] as string}
                        onChange={(event) =>
                          onChange(`timeline${n}Date` as keyof PreviewData, event.target.value)
                        }
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={gd.timelineBodyFieldLabel} tag="" isDark={isDark}>
                      <textarea
                        className={textareaClass}
                        value={preview[`timeline${n}Body` as keyof PreviewData] as string}
                        onChange={(event) =>
                          onChange(`timeline${n}Body` as keyof PreviewData, event.target.value)
                        }
                        rows={3}
                      />
                    </PanelFieldBlock>
                  </div>
                ))}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    disabled={gdBeatCount >= 8}
                    onClick={() =>
                      onChange("gdTimelineBeatCount", String(Math.min(8, gdBeatCount + 1)))
                    }
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-semibold leading-none transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark
                        ? "border-white/14 bg-white/8 text-white hover:bg-white/12"
                        : "border-[var(--color-ink)]/12 bg-white text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
                    }`}
                    aria-label={gd.addTimelineBeatLabel}
                    title={gd.addTimelineBeatLabel}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    disabled={gdBeatCount <= 3}
                    onClick={() =>
                      onChange("gdTimelineBeatCount", String(Math.max(3, gdBeatCount - 1)))
                    }
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-semibold leading-none transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark
                        ? "border-white/14 bg-white/8 text-white hover:bg-white/12"
                        : "border-[var(--color-ink)]/12 bg-white text-[var(--color-ink)] hover:bg-[var(--color-cream)]"
                    }`}
                    aria-label={gd.removeTimelineBeatLabel}
                    title={gd.removeTimelineBeatLabel}
                  >
                    −
                  </button>
                  <p
                    className={`min-w-0 flex-1 text-[11px] leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.timelineBeatCountHint}
                  </p>
                </div>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.venueScheduleSectionTitle}
                inventory={gd.venueScheduleSectionInventory}
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-venue"
                />
                <PanelFieldBlock label={gd.eventsQuoteLabel} tag={gd.tagEventsQuote} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdEventsQuote}
                    onChange={(event) => onChange("gdEventsQuote", event.target.value)}
                    rows={2}
                    placeholder={gd.eventsQuoteLabel}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.eventsQuoteHint}
                  </p>
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.eventsLeadLabel} tag={gd.tagEventsLead} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdEventsLead}
                    onChange={(event) => onChange("gdEventsLead", event.target.value)}
                    rows={3}
                    placeholder={gd.eventsLeadLabel}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.eventsLeadHint}
                  </p>
                </PanelFieldBlock>
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {gd.vuQuyEventFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {gd.vuQuyEventFieldsHint}
                </p>
                <PanelFieldBlock label={gd.vuQuyEventTimeLabel} tag={gd.tagVuQuyEventTime} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdVuQuyTime}
                    onChange={(event) => onChange("gdVuQuyTime", event.target.value)}
                    placeholder={copy.ceremonyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.vuQuyEventVenueLabel} tag={gd.tagVuQuyEventVenue} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdVuQuyVenue}
                    onChange={(event) => onChange("gdVuQuyVenue", event.target.value)}
                    placeholder={copy.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={gd.vuQuyEventLocationLabel}
                  tag={gd.tagVuQuyEventLocation}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.gdVuQuyLocation}
                    onChange={(event) => onChange("gdVuQuyLocation", event.target.value)}
                    placeholder={copy.location}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.vuQuyWhenLineLabel} tag={gd.tagVuQuyWhenLine} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdVuQuyWhenLine}
                    onChange={(event) => onChange("gdVuQuyWhenLine", event.target.value)}
                    placeholder={gd.vuQuyWhenLinePlaceholder}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.vuQuyWhenLineHint}
                  </p>
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {gd.groomEventFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {gd.groomEventFieldsHint}
                </p>
                <PanelFieldBlock label={gd.groomEventTimeLabel} tag={gd.tagGroomEventTime} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdGroomEventTime}
                    onChange={(event) => onChange("gdGroomEventTime", event.target.value)}
                    placeholder={copy.partyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.groomEventVenueLabel} tag={gd.tagGroomEventVenue} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdGroomEventVenue}
                    onChange={(event) => onChange("gdGroomEventVenue", event.target.value)}
                    placeholder={copy.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={gd.groomEventLocationLabel}
                  tag={gd.tagGroomEventLocation}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.gdGroomEventLocation}
                    onChange={(event) => onChange("gdGroomEventLocation", event.target.value)}
                    placeholder={copy.location}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.groomWhenLineLabel} tag={gd.tagGroomWhenLine} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdGroomEventWhenLine}
                    onChange={(event) => onChange("gdGroomEventWhenLine", event.target.value)}
                    placeholder={gd.groomWhenLinePlaceholder}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.groomWhenLineHint}
                  </p>
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {gd.brideEventFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {gd.brideEventFieldsHint}
                </p>
                <PanelFieldBlock label={gd.brideEventTimeLabel} tag={gd.tagBrideEventTime} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideEventTime}
                    onChange={(event) => onChange("gdBrideEventTime", event.target.value)}
                    placeholder={copy.partyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.brideEventVenueLabel} tag={gd.tagBrideEventVenue} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideEventVenue}
                    onChange={(event) => onChange("gdBrideEventVenue", event.target.value)}
                    placeholder={copy.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={gd.brideEventLocationLabel}
                  tag={gd.tagBrideEventLocation}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.gdBrideEventLocation}
                    onChange={(event) => onChange("gdBrideEventLocation", event.target.value)}
                    placeholder={copy.location}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={gd.brideWhenLineLabel} tag={gd.tagBrideWhenLine} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideEventWhenLine}
                    onChange={(event) => onChange("gdBrideEventWhenLine", event.target.value)}
                    placeholder={gd.brideWhenLinePlaceholder}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.brideWhenLineHint}
                  </p>
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.albumGridSectionTitle}
                inventory={gd.albumGridSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={gd.albumLeadLabel} tag={gd.tagAlbumLead} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.gdAlbumLead}
                    onChange={(event) => onChange("gdAlbumLead", event.target.value)}
                    rows={2}
                    placeholder={gd.albumLeadLabel}
                  />
                </PanelFieldBlock>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {gd.albumGridMinMaxHint}
                </p>
                <div
                  className={`mt-3 flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                    isDark ? "border-white/12 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
                  }`}
                >
                  <span
                    className={`min-w-0 flex-1 font-medium ${isDark ? "text-white/85" : "text-[var(--color-ink)]/90"}`}
                  >
                    {gd.albumVisibleSlotsSummary.replace("{n}", String(gentleDriftAlbumSlotCount))}
                  </span>
                  <button
                    type="button"
                    disabled={gentleDriftAlbumSlotCount >= 30}
                    onClick={() =>
                      onChange("gdAlbumVisibleCount", String(Math.min(30, gentleDriftAlbumSlotCount + 1)))
                    }
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark
                        ? "bg-white/12 text-white hover:bg-white/16"
                        : "bg-[#b8956a]/18 text-[var(--color-ink)] hover:bg-[#b8956a]/28"
                    }`}
                  >
                    {gd.addAlbumPhotoSlotLabel}
                  </button>
                  <button
                    type="button"
                    disabled={gentleDriftAlbumSlotCount <= 1}
                    onClick={() =>
                      onChange("gdAlbumVisibleCount", String(Math.max(1, gentleDriftAlbumSlotCount - 1)))
                    }
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark ? "bg-white/8 text-white/90 hover:bg-white/12" : "bg-black/6 text-[var(--color-ink)] hover:bg-black/10"
                    }`}
                  >
                    {gd.removeAlbumPhotoSlotLabel}
                  </button>
                </div>
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={gentleDriftAlbumSlotCount}
                  fieldGroup="gentle-drift-album"
                  photoFieldTags={{
                    coverImage: gd.tagCoverImage,
                    gallerySection: gd.tagGallerySection,
                  }}
                />
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.giftSectionTitle}
                inventory={gd.giftSectionInventory}
                isDark={isDark}
              >
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {gd.groomBankFieldsTitle}
                </p>
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-bank"
                />
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {gd.brideBankFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {gd.brideBankFieldsHint}
                </p>
                <PanelFieldBlock label={copy.bankName} tag={gd.tagBrideBankName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideBankName}
                    onChange={(event) => onChange("gdBrideBankName", event.target.value)}
                    placeholder={copy.bankName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountName} tag={gd.tagBrideAccountName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideAccountName}
                    onChange={(event) => onChange("gdBrideAccountName", event.target.value)}
                    placeholder={copy.accountName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountNumber} tag={gd.tagBrideAccountNumber} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.gdBrideAccountNumber}
                    onChange={(event) => onChange("gdBrideAccountNumber", event.target.value)}
                    placeholder={copy.accountNumber}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={gd.footerThanksSectionTitle}
                inventory={gd.footerThanksSectionInventory}
                isDark={isDark}
              >
                <div
                  className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}
                >
                  <PanelFieldBlock
                    label={gd.footerThanksImageLabel}
                    tag={gd.tagFooterThanksImage}
                    isDark={isDark}
                  >
                    <span
                      className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
                    >
                      {images.gdFooterImage ? copy.coverSelected : gd.footerThanksImageHint}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-3 block w-full min-w-0 cursor-pointer text-xs"
                      onChange={(event) => onGdFooterImageChange(event.target.files?.[0] ?? null)}
                    />
                  </PanelFieldBlock>
                </div>
                <PanelFieldBlock
                  label={sf.footerThanksHeadline}
                  tag={gd.tagFooterThanksHeadline}
                  isDark={isDark}
                >
                  <textarea
                    className={textareaClass}
                    value={preview.footerThanksHeadline}
                    onChange={(event) => onChange("footerThanksHeadline", event.target.value)}
                    rows={2}
                    placeholder={sf.footerThanksHeadline}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.footerThanksHeadlineHint}
                  </p>
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={sf.footerThanksBody}
                  tag={gd.tagFooterThanksBody}
                  isDark={isDark}
                >
                  <textarea
                    className={textareaClass}
                    value={preview.footerThanksBody}
                    onChange={(event) => onChange("footerThanksBody", event.target.value)}
                    rows={3}
                    placeholder={sf.footerThanksBody}
                  />
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${isDark ? "text-white/55" : "text-[var(--color-ink)]/60"}`}
                  >
                    {gd.footerThanksBodyHint}
                  </p>
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
            </>
          ) : isSlideFlex ? (
            <SlideFlexWorkspaceSection
              title={sf.baseWorkspaceSectionTitle}
              inventory={sf.baseWorkspaceSectionInventory}
              isDark={isDark}
            >
              <TemplateWorkspaceCommonFields
                copy={copy}
                inputClass={inputClass}
                preview={preview}
                onChange={onChange}
                images={images}
                onCoverImageChange={onCoverImageChange}
                onGalleryImageChange={onGalleryImageChange}
                isDark={isDark}
                gallerySlotTags={gallerySlotTags}
              />
            </SlideFlexWorkspaceSection>
          ) : isTimelessLove ? (
            <>
              <div
                className={`min-w-0 rounded-2xl border px-3 py-3.5 sm:px-4 ${isDark ? "border-white/12 bg-white/[0.04]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/85"}`}
              >
                <p className="text-xs font-bold tracking-tight text-[#b8956e]">
                  Timeless Love
                </p>
                <p
                  className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/72" : "text-[var(--color-ink)]/75"}`}
                >
                  Tuỳ chỉnh thông tin chi tiết cho mẫu Timeless Love.
                </p>
              </div>
              <SlideFlexWorkspaceSection
                title="Ảnh & Tên"
                inventory="Ảnh bìa, Ảnh cặp đôi, Tên cô dâu chú rể"
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-cover"
                />
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-names"
                />
                <PanelFieldBlock label="Phụ đề bìa" tag="COVER_SUBTITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlHeroSubtitle}
                    onChange={(event) => onChange("tlHeroSubtitle", event.target.value)}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              
              <SlideFlexWorkspaceSection
                title="Lời chào"
                inventory="Tiêu đề và nội dung chào mừng"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề lời chào" tag="WELCOME_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlWelcomeTitle}
                    onChange={(event) => onChange("tlWelcomeTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Nội dung lời chào" tag="WELCOME_TEXT" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlWelcomeText}
                    onChange={(event) => onChange("tlWelcomeText", event.target.value)}
                    rows={4}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Cặp đôi"
                inventory="Tiêu đề phần giới thiệu cặp đôi"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề cặp đôi" tag="COUPLE_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlCoupleTitle}
                    onChange={(event) => onChange("tlCoupleTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <SlideFlexPortraitUpload
                  label={sf.groomPortraitUpload}
                  tag={sf.tagGroomPortraitUpload}
                  hasImage={Boolean(images.groomPortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onGroomPortraitImageChange}
                />
                <PanelFieldBlock label={sf.groomBio} tag={sf.tagGroomBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.groomBio}
                    onChange={(event) => onChange("groomBio", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
                <SlideFlexPortraitUpload
                  label={sf.bridePortraitUpload}
                  tag={sf.tagBridePortraitUpload}
                  hasImage={Boolean(images.bridePortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onBridePortraitImageChange}
                />
                <PanelFieldBlock label={sf.brideBio} tag={sf.tagBrideBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.brideBio}
                    onChange={(event) => onChange("brideBio", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Sự kiện"
                inventory="Tiêu đề, mô tả và thông tin thời gian địa điểm"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề sự kiện" tag="EVENTS_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlEventsTitle}
                    onChange={(event) => onChange("tlEventsTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Mô tả sự kiện" tag="EVENTS_LEAD" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlEventsLead}
                    onChange={(event) => onChange("tlEventsLead", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
                
                <p className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
                  Lễ cưới (Ceremony)
                </p>
                <PanelFieldBlock label={copy.ceremonyTime} tag="CEREMONY_TIME" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlCeremonyTime}
                    onChange={(event) => onChange("tlCeremonyTime", event.target.value)}
                    placeholder={preview.ceremonyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.venue} tag="CEREMONY_VENUE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlCeremonyVenue}
                    onChange={(event) => onChange("tlCeremonyVenue", event.target.value)}
                    placeholder={preview.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.location} tag="CEREMONY_LOCATION" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlCeremonyLocation}
                    onChange={(event) => onChange("tlCeremonyLocation", event.target.value)}
                    placeholder={preview.location}
                  />
                </PanelFieldBlock>

                <p className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
                  Tiệc cưới (Reception)
                </p>
                <PanelFieldBlock label={copy.partyTime} tag="RECEPTION_TIME" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlReceptionTime}
                    onChange={(event) => onChange("tlReceptionTime", event.target.value)}
                    placeholder={preview.partyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.venue} tag="RECEPTION_VENUE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlReceptionVenue}
                    onChange={(event) => onChange("tlReceptionVenue", event.target.value)}
                    placeholder={preview.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.location} tag="RECEPTION_LOCATION" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlReceptionLocation}
                    onChange={(event) => onChange("tlReceptionLocation", event.target.value)}
                    placeholder={preview.location}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Thư viện ảnh"
                inventory="Tiêu đề, mô tả và album 6 ảnh"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề Gallery" tag="GALLERY_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlGalleryTitle}
                    onChange={(event) => onChange("tlGalleryTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Mô tả Gallery" tag="GALLERY_LEAD" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlGalleryLead}
                    onChange={(event) => onChange("tlGalleryLead", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-album"
                />
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Xác nhận tham dự"
                inventory="Tiêu đề và mô tả phần RSVP"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề RSVP" tag="RSVP_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlRsvpTitle}
                    onChange={(event) => onChange("tlRsvpTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Mô tả RSVP" tag="RSVP_LEAD" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlRsvpLead}
                    onChange={(event) => onChange("tlRsvpLead", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Quà tặng"
                inventory="Thông tin tài khoản ngân hàng"
                isDark={isDark}
              >
                <PanelFieldBlock label="Tiêu đề Quà tặng" tag="GIFT_TITLE" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlGiftTitle}
                    onChange={(event) => onChange("tlGiftTitle", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Mô tả Quà tặng" tag="GIFT_LEAD" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlGiftLead}
                    onChange={(event) => onChange("tlGiftLead", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>

                <p className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
                  Nhà trai
                </p>
                <PanelFieldBlock label={copy.bankName} tag={tl.tagGroomBankName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bankName}
                    onChange={(event) => onChange("bankName", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountName} tag={tl.tagGroomAccountName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.accountName}
                    onChange={(event) => onChange("accountName", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountNumber} tag={tl.tagGroomAccountNumber} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.accountNumber}
                    onChange={(event) => onChange("accountNumber", event.target.value)}
                  />
                </PanelFieldBlock>

                <p className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}>
                  Nhà gái
                </p>
                <PanelFieldBlock label={copy.bankName} tag={tl.tagBrideBankName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlBrideBankName}
                    onChange={(event) => onChange("tlBrideBankName", event.target.value)}
                    placeholder={preview.bankName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountName} tag={tl.tagBrideAccountName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlBrideAccountName}
                    onChange={(event) => onChange("tlBrideAccountName", event.target.value)}
                    placeholder={preview.accountName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountNumber} tag={tl.tagBrideAccountNumber} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.tlBrideAccountNumber}
                    onChange={(event) => onChange("tlBrideAccountNumber", event.target.value)}
                    placeholder={preview.accountNumber}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Lời cảm ơn"
                inventory="Lời cảm ơn cuối trang"
                isDark={isDark}
              >
                <PanelFieldBlock label="Nội dung lời cảm ơn" tag="FOOTER_THANKS" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.tlFooterThanks}
                    onChange={(event) => onChange("tlFooterThanks", event.target.value)}
                    rows={3}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
            </>
          ) : isBrightlyBasic ? (
            <>
              <div
                className={`min-w-0 rounded-2xl border px-3 py-3.5 sm:px-4 ${isDark ? "border-white/12 bg-white/[0.04]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/85"}`}
              >
                <p className="text-xs font-bold tracking-tight text-[var(--color-rose)]">
                  {bb.deepSectionTitle}
                </p>
                <p
                  className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/72" : "text-[var(--color-ink)]/75"}`}
                >
                  {bb.deepSectionLead}
                </p>
              </div>
              <SlideFlexWorkspaceSection
                title={bb.heroSectionTitle}
                inventory={bb.heroSectionInventory}
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-cover"
                  photoFieldTags={{
                    coverImage: bb.tagCoverImage,
                    gallerySection: bb.tagGallerySection,
                  }}
                />
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-names"
                />
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.coupleSectionTitle}
                inventory={isFreeMinimalist ? undefined : bb.coupleSectionInventory}
                isDark={isDark}
              >
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {copy.groomName}
                </p>
                <p className="text-[11px] font-medium leading-snug text-[var(--color-sage)]">
                  {sf.couplePhotosSection}
                </p>
                <SlideFlexPortraitUpload
                  label={sf.groomPortraitUpload}
                  tag={sf.tagGroomPortraitUpload}
                  hasImage={Boolean(images.groomPortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onGroomPortraitImageChange}
                />
                <PanelFieldBlock label={sf.groomParentLine1} tag={sf.tagGroomParentLine1} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.groomParentLine1}
                    onChange={(event) => onChange("groomParentLine1", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.groomParentLine2} tag={sf.tagGroomParentLine2} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.groomParentLine2}
                    onChange={(event) => onChange("groomParentLine2", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.groomBio} tag={sf.tagGroomBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.groomBio}
                    onChange={(event) => onChange("groomBio", event.target.value)}
                    rows={3}
                    placeholder={sf.groomBio}
                  />
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {copy.brideName}
                </p>
                <SlideFlexPortraitUpload
                  label={sf.bridePortraitUpload}
                  tag={sf.tagBridePortraitUpload}
                  hasImage={Boolean(images.bridePortraitImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onBridePortraitImageChange}
                />
                <PanelFieldBlock label={sf.brideParentLine1} tag={sf.tagBrideParentLine1} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.brideParentLine1}
                    onChange={(event) => onChange("brideParentLine1", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.brideParentLine2} tag={sf.tagBrideParentLine2} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.brideParentLine2}
                    onChange={(event) => onChange("brideParentLine2", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.brideBio} tag={sf.tagBrideBio} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.brideBio}
                    onChange={(event) => onChange("brideBio", event.target.value)}
                    rows={3}
                    placeholder={sf.brideBio}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.parallaxBgSectionTitle}
                inventory={bb.parallaxBgSectionInventory}
                isDark={isDark}
              >
                <SlideFlexPortraitUpload
                  label={bb.invitationBgUploadLabel}
                  tag={bb.tagInvitationBg}
                  hasImage={Boolean(images.bbInvitationBgImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onBbInvitationBgChange}
                />
                <SlideFlexPortraitUpload
                  label={bb.eventsBgUploadLabel}
                  tag={bb.tagEventsBg}
                  hasImage={Boolean(images.bbEventsBgImage)}
                  selectedLabel={copy.imageSelected}
                  emptyLabel={copy.imageDefault}
                  isDark={isDark}
                  onPick={onBbEventsBgChange}
                />
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.copywritingSectionTitle}
                inventory={bb.copywritingSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={bb.copyHeroSaveDateLabel} tag={bb.tagBbHeroSaveDateLine} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbHeroSaveDateLine}
                    onChange={(event) => onChange("bbHeroSaveDateLine", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={bb.copyGettingMarriedLabel}
                  tag={bb.tagBbGettingMarriedTitle}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbGettingMarriedTitle}
                    onChange={(event) => onChange("bbGettingMarriedTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyThanksBodyLabel} tag={bb.tagBbThanksBody} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.bbThanksBody}
                    onChange={(event) => onChange("bbThanksBody", event.target.value)}
                    rows={4}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyBigDayLabel} tag={bb.tagBbBigDayTitle} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbBigDayTitle}
                    onChange={(event) => onChange("bbBigDayTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyInviteLeadLabel} tag={bb.tagBbInviteLead} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.bbInviteLead}
                    onChange={(event) => onChange("bbInviteLead", event.target.value)}
                    rows={3}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyGalleryTitleLabel} tag={bb.tagBbGalleryTitle} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbGalleryTitle}
                    onChange={(event) => onChange("bbGalleryTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyEventsTitleLabel} tag={bb.tagBbEventsTitle} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbEventsTitle}
                    onChange={(event) => onChange("bbEventsTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyEventsDescLabel} tag={bb.tagBbEventsDesc} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.bbEventsDesc}
                    onChange={(event) => onChange("bbEventsDesc", event.target.value)}
                    rows={3}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={bb.copyGuestbookTitleLabel}
                  tag={bb.tagBbGuestbookTitle}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbGuestbookTitle}
                    onChange={(event) => onChange("bbGuestbookTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyGiftTitleLabel} tag={bb.tagBbGiftTitle} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbGiftTitle}
                    onChange={(event) => onChange("bbGiftTitle", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={bb.copyFooterEyebrowLabel}
                  tag={bb.tagBbFooterThanksEyebrow}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbFooterThanksEyebrow}
                    onChange={(event) => onChange("bbFooterThanksEyebrow", event.target.value)}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={bb.copyFooterThanksLabel} tag={bb.tagBbFooterThanks} isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.bbFooterThanks}
                    onChange={(event) => onChange("bbFooterThanks", event.target.value)}
                    rows={3}
                    placeholder={bb.copyFieldPlaceholder}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.gallerySectionTitle}
                inventory={isFreeMinimalist ? undefined : bb.gallerySectionInventory}
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-album"
                  photoFieldTags={{
                    coverImage: bb.tagCoverImage,
                    gallerySection: bb.tagGallerySection,
                  }}
                />
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.eventsSectionTitle}
                inventory={isFreeMinimalist ? undefined : bb.eventsSectionInventory}
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={6}
                  fieldGroup="gentle-drift-venue"
                />
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {bb.groomReceptionFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {bb.groomReceptionFieldsHint}
                </p>
                <PanelFieldBlock
                  label={copy.partyTime}
                  tag={bb.tagBbGroomReceptionTime}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbGroomReceptionTime}
                    onChange={(event) => onChange("bbGroomReceptionTime", event.target.value)}
                    placeholder={copy.partyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={copy.venue}
                  tag={bb.tagBbGroomReceptionVenue}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbGroomReceptionVenue}
                    onChange={(event) => onChange("bbGroomReceptionVenue", event.target.value)}
                    placeholder={copy.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={copy.location}
                  tag={bb.tagBbGroomReceptionLocation}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbGroomReceptionLocation}
                    onChange={(event) => onChange("bbGroomReceptionLocation", event.target.value)}
                    placeholder={copy.location}
                  />
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {bb.brideReceptionFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {bb.brideReceptionFieldsHint}
                </p>
                <PanelFieldBlock
                  label={copy.partyTime}
                  tag={bb.tagBbBrideReceptionTime}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbBrideReceptionTime}
                    onChange={(event) => onChange("bbBrideReceptionTime", event.target.value)}
                    placeholder={copy.partyTime}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={copy.venue}
                  tag={bb.tagBbBrideReceptionVenue}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbBrideReceptionVenue}
                    onChange={(event) => onChange("bbBrideReceptionVenue", event.target.value)}
                    placeholder={copy.venue}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock
                  label={copy.location}
                  tag={bb.tagBbBrideReceptionLocation}
                  isDark={isDark}
                >
                  <input
                    className={inputClass}
                    value={preview.bbBrideReceptionLocation}
                    onChange={(event) => onChange("bbBrideReceptionLocation", event.target.value)}
                    placeholder={copy.location}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.wishSectionTitle}
                inventory={bb.wishSectionInventory}
                isDark={isDark}
              >
                <PanelFieldBlock label={sf.wishSuggestion1} tag={sf.tagWishSuggestion1} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.wishSuggestion1}
                    onChange={(event) => onChange("wishSuggestion1", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.wishSuggestion2} tag={sf.tagWishSuggestion2} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.wishSuggestion2}
                    onChange={(event) => onChange("wishSuggestion2", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={sf.wishSuggestion3} tag={sf.tagWishSuggestion3} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.wishSuggestion3}
                    onChange={(event) => onChange("wishSuggestion3", event.target.value)}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.giftSectionTitle}
                inventory={bb.giftSectionInventory}
                isDark={isDark}
              >
                <p
                  className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {bb.groomBankFieldsTitle}
                </p>
                <PanelFieldBlock label={copy.bankName} tag={bb.tagGroomBankName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bankName}
                    onChange={(event) => onChange("bankName", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountName} tag={bb.tagGroomAccountName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.accountName}
                    onChange={(event) => onChange("accountName", event.target.value)}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountNumber} tag={bb.tagGroomAccountNumber} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.accountNumber}
                    onChange={(event) => onChange("accountNumber", event.target.value)}
                  />
                </PanelFieldBlock>
                <p
                  className={`mt-2 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                >
                  {bb.brideBankFieldsTitle}
                </p>
                <p
                  className={`text-xs leading-relaxed ${isDark ? "text-white/60" : "text-[var(--color-ink)]/65"}`}
                >
                  {bb.brideBankFieldsHint}
                </p>
                <PanelFieldBlock label={copy.bankName} tag={bb.tagBrideBankName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbBrideBankName}
                    onChange={(event) => onChange("bbBrideBankName", event.target.value)}
                    placeholder={copy.bankName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountName} tag={bb.tagBrideAccountName} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbBrideAccountName}
                    onChange={(event) => onChange("bbBrideAccountName", event.target.value)}
                    placeholder={copy.accountName}
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label={copy.accountNumber} tag={bb.tagBrideAccountNumber} isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.bbBrideAccountNumber}
                    onChange={(event) => onChange("bbBrideAccountNumber", event.target.value)}
                    placeholder={copy.accountNumber}
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
              <SlideFlexWorkspaceSection
                title={bb.footerBgSectionTitle}
                inventory={bb.footerBgSectionInventory}
                isDark={isDark}
              >
                <div
                  className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}
                >
                  <PanelFieldBlock label={bb.footerBgUploadLabel} tag={bb.tagFooterBg} isDark={isDark}>
                    <span
                      className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
                    >
                  {images.bbFooterBgImage ? copy.coverSelected : copy.imageDefault}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-3 block w-full min-w-0 cursor-pointer text-xs"
                      onChange={(event) =>
                        onBbFooterBgChange(event.target.files?.[0] ?? null)
                      }
                    />
                  </PanelFieldBlock>
                </div>
              </SlideFlexWorkspaceSection>
            </>
          ) : isFreeMinimalist ? (
            <>
              {isGentleHarmony ? (
                <div className="mb-6 px-1">
                  <p
                    className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                  >
                    Ảnh bìa Carousel (4 ảnh)
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className={`block rounded-xl border border-dashed px-3 py-2 cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}>
                      <PanelFieldBlock label="Ảnh bìa 1" tag="" isDark={isDark}>
                        <span className="text-[10px] text-white/50">{images.coverImage ? copy.coverSelected : copy.coverEmpty}</span>
                        <input type="file" accept="image/*" className="mt-2 block w-full text-[10px] cursor-pointer" onChange={(e) => onCoverImageChange(e.target.files?.[0] ?? null)} />
                      </PanelFieldBlock>
                    </label>
                    <label className={`block rounded-xl border border-dashed px-3 py-2 cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}>
                      <PanelFieldBlock label="Ảnh bìa 2" tag="" isDark={isDark}>
                        <span className="text-[10px] text-white/50">{images.coverImage2 ? copy.coverSelected : copy.coverEmpty}</span>
                        <input type="file" accept="image/*" className="mt-2 block w-full text-[10px] cursor-pointer" onChange={(e) => onCoverImage2Change(e.target.files?.[0] ?? null)} />
                      </PanelFieldBlock>
                    </label>
                    <label className={`block rounded-xl border border-dashed px-3 py-2 cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}>
                      <PanelFieldBlock label="Ảnh bìa 3" tag="" isDark={isDark}>
                        <span className="text-[10px] text-white/50">{images.coverImage3 ? copy.coverSelected : copy.coverEmpty}</span>
                        <input type="file" accept="image/*" className="mt-2 block w-full text-[10px] cursor-pointer" onChange={(e) => onCoverImage3Change(e.target.files?.[0] ?? null)} />
                      </PanelFieldBlock>
                    </label>
                    <label className={`block rounded-xl border border-dashed px-3 py-2 cursor-pointer transition-colors hover:border-[var(--color-sage)]/40 ${isDark ? "border-white/14 bg-white/4 hover:bg-white/6" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)] hover:bg-[var(--color-cream)]/80"}`}>
                      <PanelFieldBlock label="Ảnh bìa 4" tag="" isDark={isDark}>
                        <span className="text-[10px] text-white/50">{images.coverImage4 ? copy.coverSelected : copy.coverEmpty}</span>
                        <input type="file" accept="image/*" className="mt-2 block w-full text-[10px] cursor-pointer" onChange={(e) => onCoverImage4Change(e.target.files?.[0] ?? null)} />
                      </PanelFieldBlock>
                    </label>
                  </div>
                </div>
              ) : (
                <SlideFlexWorkspaceSection
                  title="Ảnh bìa"
                  isDark={isDark}
                >
                  <TemplateWorkspaceCommonFields
                    copy={copy}
                    inputClass={inputClass}
                    preview={preview}
                    onChange={onChange}
                    images={images}
                    onCoverImageChange={onCoverImageChange}
                    onGalleryImageChange={onGalleryImageChange}
                    isDark={isDark}
                    gallerySlotTags={gallerySlotTags}
                    fieldGroup="gentle-drift-cover"
                    hideTags={isFreeMinimalist}
                  />
                </SlideFlexWorkspaceSection>
              )}

              <SlideFlexWorkspaceSection
                title="Thông tin chung"
                isDark={isDark}
              >
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  fieldGroup="gentle-drift-names"
                  hideTags={isFreeMinimalist}
                  hideCountdown={isFreeMinimalist}
                />
                {isNoirEditorial && (
                  <PanelFieldBlock label="Phụ đề Hero (Noir)" tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview.neHeroEyebrow}
                      onChange={(e) => onChange("neHeroEyebrow", e.target.value)}
                      placeholder="Editorial Issue Vol. 01"
                    />
                  </PanelFieldBlock>
                )}
                {isSereneCanvas && (
                  <PanelFieldBlock label="Phụ đề Hero (Serene)" tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview.scHeroEyebrow}
                      onChange={(e) => onChange("scHeroEyebrow", e.target.value)}
                      placeholder="Save the Date"
                    />
                  </PanelFieldBlock>
                )}
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Lời mời"
                isDark={isDark}
              >
                <PanelFieldBlock label="Lời mời chân thành" tag="" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.ghIntroText}
                    onChange={(e) => onChange("ghIntroText", e.target.value)}
                    rows={3}
                    placeholder="Nhập lời mời của bạn..."
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Cặp đôi"
                isDark={isDark}
              >
                {isNoirEditorial && (
                  <PanelFieldBlock label="Tiêu đề Cặp đôi (Noir)" tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview.neProtagonistsTitle}
                      onChange={(e) => onChange("neProtagonistsTitle", e.target.value)}
                      placeholder="The Protagonists"
                    />
                  </PanelFieldBlock>
                )}
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <p
                      className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                    >
                      {copy.groomName}
                    </p>
                    <SlideFlexPortraitUpload
                      label={sf.groomPortraitUpload}
                      tag=""
                      hasImage={Boolean(images.groomPortraitImage)}
                      selectedLabel={copy.imageSelected}
                      emptyLabel={copy.imageDefault}
                      isDark={isDark}
                      onPick={onGroomPortraitImageChange}
                      hideTags={isFreeMinimalist}
                    />
                    <PanelFieldBlock label="Tiểu sử Chú rể" tag="" isDark={isDark}>
                      <textarea
                        className={textareaClass}
                        value={preview.ghGroomBio}
                        onChange={(e) => onChange("ghGroomBio", e.target.value)}
                        rows={2}
                      />
                    </PanelFieldBlock>
                    {isSoftSerenity && (
                      <div className="mt-3 flex flex-col gap-3">
                        <PanelFieldBlock label="Thông tin Cha mẹ Chú rể (Dòng 1)" tag="" isDark={isDark}>
                          <input
                            className={inputClass}
                            value={preview.ssGroomParentLine1}
                            onChange={(e) => onChange("ssGroomParentLine1", e.target.value)}
                            placeholder="Trưởng nam của Ông Trần Văn A"
                          />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Thông tin Cha mẹ Chú rể (Dòng 2)" tag="" isDark={isDark}>
                          <input
                            className={inputClass}
                            value={preview.ssGroomParentLine2}
                            onChange={(e) => onChange("ssGroomParentLine2", e.target.value)}
                            placeholder="& Bà Nguyễn Thị B"
                          />
                        </PanelFieldBlock>
                      </div>
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
                    >
                      {copy.brideName}
                    </p>
                    <SlideFlexPortraitUpload
                      label={sf.bridePortraitUpload}
                      tag=""
                      hasImage={Boolean(images.bridePortraitImage)}
                      selectedLabel={copy.imageSelected}
                      emptyLabel={copy.imageDefault}
                      isDark={isDark}
                      onPick={onBridePortraitImageChange}
                      hideTags={isFreeMinimalist}
                    />
                    <PanelFieldBlock label="Tiểu sử Cô dâu" tag="" isDark={isDark}>
                      <textarea
                        className={textareaClass}
                        value={preview.ghBrideBio}
                        onChange={(e) => onChange("ghBrideBio", e.target.value)}
                        rows={2}
                      />
                    </PanelFieldBlock>
                    {isSoftSerenity && (
                      <div className="mt-3 flex flex-col gap-3">
                        <PanelFieldBlock label="Thông tin Cha mẹ Cô dâu (Dòng 1)" tag="" isDark={isDark}>
                          <input
                            className={inputClass}
                            value={preview.ssBrideParentLine1}
                            onChange={(e) => onChange("ssBrideParentLine1", e.target.value)}
                            placeholder="Út nữ của Ông Lê Văn C"
                          />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Thông tin Cha mẹ Cô dâu (Dòng 2)" tag="" isDark={isDark}>
                          <input
                            className={inputClass}
                            value={preview.ssBrideParentLine2}
                            onChange={(e) => onChange("ssBrideParentLine2", e.target.value)}
                            placeholder="& Bà Phạm Thị D"
                          />
                        </PanelFieldBlock>
                      </div>
                    )}
                  </div>
                </div>
              </SlideFlexWorkspaceSection>

              {isSoftSerenity && (
                <SlideFlexWorkspaceSection
                  title="Chương Tiếp Theo"
                  isDark={isDark}
                >
                  <PanelFieldBlock label="Mô tả Chương Tiếp Theo" tag="" isDark={isDark}>
                    <textarea
                      className={textareaClass}
                      value={preview.ssStoryLead}
                      onChange={(e) => onChange("ssStoryLead", e.target.value)}
                      rows={2}
                      placeholder="Nhập mô tả cho chương tiếp theo..."
                    />
                  </PanelFieldBlock>
                  <div className="grid gap-4 mt-2">
                    <div className={`p-3 rounded-xl border ${isDark ? "border-white/10 bg-white/4" : "border-[var(--color-ink)]/10 bg-white/60"}`}>
                      <p className="text-xs font-bold text-[#c5a059] mb-2">Sự kiện 1</p>
                      <div className="grid gap-2">
                        <PanelFieldBlock label="Năm" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline1Title} onChange={(e) => onChange("timeline1Title", e.target.value)} placeholder="2020" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Tiêu đề" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline1Date} onChange={(e) => onChange("timeline1Date", e.target.value)} placeholder="Tiêu đề sự kiện" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Nội dung" tag="" isDark={isDark}>
                          <textarea className={textareaClass} value={preview.timeline1Body} onChange={(e) => onChange("timeline1Body", e.target.value)} rows={2} placeholder="Nội dung sự kiện..." />
                        </PanelFieldBlock>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? "border-white/10 bg-white/4" : "border-[var(--color-ink)]/10 bg-white/60"}`}>
                      <p className="text-xs font-bold text-[#c5a059] mb-2">Sự kiện 2</p>
                      <div className="grid gap-2">
                        <PanelFieldBlock label="Năm" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline2Title} onChange={(e) => onChange("timeline2Title", e.target.value)} placeholder="2022" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Tiêu đề" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline2Date} onChange={(e) => onChange("timeline2Date", e.target.value)} placeholder="Tiêu đề sự kiện" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Nội dung" tag="" isDark={isDark}>
                          <textarea className={textareaClass} value={preview.timeline2Body} onChange={(e) => onChange("timeline2Body", e.target.value)} rows={2} placeholder="Nội dung sự kiện..." />
                        </PanelFieldBlock>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? "border-white/10 bg-white/4" : "border-[var(--color-ink)]/10 bg-white/60"}`}>
                      <p className="text-xs font-bold text-[#c5a059] mb-2">Sự kiện 3</p>
                      <div className="grid gap-2">
                        <PanelFieldBlock label="Năm" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline3Title} onChange={(e) => onChange("timeline3Title", e.target.value)} placeholder="2026" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Tiêu đề" tag="" isDark={isDark}>
                          <input className={inputClass} value={preview.timeline3Date} onChange={(e) => onChange("timeline3Date", e.target.value)} placeholder="Tiêu đề sự kiện" />
                        </PanelFieldBlock>
                        <PanelFieldBlock label="Nội dung" tag="" isDark={isDark}>
                          <textarea className={textareaClass} value={preview.timeline3Body} onChange={(e) => onChange("timeline3Body", e.target.value)} rows={2} placeholder="Nội dung sự kiện..." />
                        </PanelFieldBlock>
                      </div>
                    </div>
                  </div>
                </SlideFlexWorkspaceSection>
              )}

              <SlideFlexWorkspaceSection
                title="Sự kiện"
                isDark={isDark}
              >
                {isSereneCanvas && (
                  <PanelFieldBlock label="Tiêu đề Sự kiện (Serene)" tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview.scBigDayTitle}
                      onChange={(e) => onChange("scBigDayTitle", e.target.value)}
                      placeholder="The Big Day"
                    />
                  </PanelFieldBlock>
                )}
                <div className="flex flex-col gap-5">
                  {/* Lễ cưới */}
                  <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/50"}`}>
                    <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/88" : "text-[var(--color-ink)]/80"}`}>01. Lễ cưới (Ceremony)</p>
                    <div className="grid gap-3">
                      <PanelFieldBlock label="Thời gian" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghCeremonyTime || preview.ceremonyTime} onChange={(e) => onChange("ghCeremonyTime", e.target.value)} placeholder="10:00 - 20/10/2026" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Tên địa điểm" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghCeremonyVenue || preview.venue} onChange={(e) => onChange("ghCeremonyVenue", e.target.value)} placeholder="Tư gia nhà gái" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Link bản đồ (Google Maps)" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghCeremonyLocation || preview.location} onChange={(e) => onChange("ghCeremonyLocation", e.target.value)} placeholder="https://maps.app.goo.gl/..." />
                      </PanelFieldBlock>
                    </div>
                  </div>

                  {/* Tiệc Nhà Trai */}
                  <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/50"}`}>
                    <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/88" : "text-[var(--color-ink)]/80"}`}>02. Tiệc Nhà Trai (Groom's Party)</p>
                    <div className="grid gap-3">
                      <PanelFieldBlock label="Thời gian" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomPartyTime || preview.partyTime} onChange={(e) => onChange("ghGroomPartyTime", e.target.value)} placeholder="18:00 - 20/10/2026" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Tên địa điểm" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomPartyVenue || preview.venue} onChange={(e) => onChange("ghGroomPartyVenue", e.target.value)} placeholder="Trung tâm tiệc cưới" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Link bản đồ (Google Maps)" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomPartyLocation || preview.location} onChange={(e) => onChange("ghGroomPartyLocation", e.target.value)} placeholder="https://maps.app.goo.gl/..." />
                      </PanelFieldBlock>
                    </div>
                  </div>

                  {/* Tiệc Nhà Gái */}
                  <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/50"}`}>
                    <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/88" : "text-[var(--color-ink)]/80"}`}>03. Tiệc Nhà Gái (Bride's Party)</p>
                    <div className="grid gap-3">
                      <PanelFieldBlock label="Thời gian" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBridePartyTime || preview.partyTime} onChange={(e) => onChange("ghBridePartyTime", e.target.value)} placeholder="18:00 - 21/10/2026" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Tên địa điểm" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBridePartyVenue || preview.venue} onChange={(e) => onChange("ghBridePartyVenue", e.target.value)} placeholder="Tư gia nhà gái" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Link bản đồ (Google Maps)" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBridePartyLocation || preview.location} onChange={(e) => onChange("ghBridePartyLocation", e.target.value)} placeholder="https://maps.app.goo.gl/..." />
                      </PanelFieldBlock>
                    </div>
                  </div>
                </div>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Thư viện ảnh"
                isDark={isDark}
              >
                {isSereneCanvas && (
                  <PanelFieldBlock label="Tiêu đề Album (Serene)" tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview.scMomentsTitle}
                      onChange={(e) => onChange("scMomentsTitle", e.target.value)}
                      placeholder="Moments Captured"
                    />
                  </PanelFieldBlock>
                )}
                <div
                  className={`mb-4 flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                    isDark ? "border-white/12 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
                  }`}
                >
                  <span
                    className={`min-w-0 flex-1 font-medium ${isDark ? "text-white/85" : "text-[var(--color-ink)]/90"}`}
                  >
                    Số lượng ảnh hiển thị: {freeAlbumSlotCount}
                  </span>
                  <button
                    type="button"
                    disabled={freeAlbumSlotCount >= 30}
                    onClick={() =>
                      onChange("ghAlbumVisibleCount", String(Math.min(30, freeAlbumSlotCount + 1)))
                    }
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark
                        ? "bg-white/12 text-white hover:bg-white/16"
                        : "bg-[#b8956a]/18 text-[var(--color-ink)] hover:bg-[#b8956a]/28"
                    }`}
                  >
                    + Thêm ảnh
                  </button>
                  <button
                    type="button"
                    disabled={freeAlbumSlotCount <= 1}
                    onClick={() =>
                      onChange("ghAlbumVisibleCount", String(Math.max(1, freeAlbumSlotCount - 1)))
                    }
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      isDark ? "bg-white/8 text-white/90 hover:bg-white/12" : "bg-black/6 text-[var(--color-ink)] hover:bg-black/10"
                    }`}
                  >
                    − Bớt ảnh
                  </button>
                </div>
                <TemplateWorkspaceCommonFields
                  copy={copy}
                  inputClass={inputClass}
                  preview={preview}
                  onChange={onChange}
                  images={images}
                  onCoverImageChange={onCoverImageChange}
                  onGalleryImageChange={onGalleryImageChange}
                  isDark={isDark}
                  gallerySlotTags={gallerySlotTags}
                  gallerySlotCount={freeAlbumSlotCount}
                  fieldGroup="gentle-drift-album"
                  hideTags={isFreeMinimalist}
                />
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Mừng cưới"
                isDark={isDark}
              >
                <div className="flex flex-col gap-5">
                  {/* Bank Chú rể */}
                  <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/50"}`}>
                    <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/88" : "text-[var(--color-ink)]/80"}`}>Tài khoản Chú rể</p>
                    <div className="grid gap-3">
                      <PanelFieldBlock label="Ngân hàng" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomBankName || preview.bankName} onChange={(e) => onChange("ghGroomBankName", e.target.value)} placeholder="VD: Vietcombank" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Tên chủ tài khoản" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomAccountName || preview.accountName} onChange={(e) => onChange("ghGroomAccountName", e.target.value)} placeholder="VD: NGUYEN VAN A" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Số tài khoản" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghGroomAccountNumber || preview.accountNumber} onChange={(e) => onChange("ghGroomAccountNumber", e.target.value)} placeholder="VD: 123456789" />
                      </PanelFieldBlock>
                    </div>
                  </div>

                  {/* Bank Cô dâu */}
                  <div className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-white/5" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]/50"}`}>
                    <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${isDark ? "text-white/88" : "text-[var(--color-ink)]/80"}`}>Tài khoản Cô dâu</p>
                    <div className="grid gap-3">
                      <PanelFieldBlock label="Ngân hàng" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBrideBankName || preview.bankName} onChange={(e) => onChange("ghBrideBankName", e.target.value)} placeholder="VD: Techcombank" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Tên chủ tài khoản" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBrideAccountName || preview.accountName} onChange={(e) => onChange("ghBrideAccountName", e.target.value)} placeholder="VD: TRAN THI B" />
                      </PanelFieldBlock>
                      <PanelFieldBlock label="Số tài khoản" tag="" isDark={isDark}>
                        <input className={inputClass} value={preview.ghBrideAccountNumber || preview.accountNumber} onChange={(e) => onChange("ghBrideAccountNumber", e.target.value)} placeholder="VD: 987654321" />
                      </PanelFieldBlock>
                    </div>
                  </div>
                </div>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title="Chân trang"
                isDark={isDark}
              >
                <PanelFieldBlock label="Lời cảm ơn footer" tag="" isDark={isDark}>
                  <textarea
                    className={textareaClass}
                    value={preview.ghFooterThanks || ""}
                    onChange={(e) => onChange("ghFooterThanks", e.target.value)}
                    rows={2}
                    placeholder="VD: Cảm ơn vì sự hiện diện của bạn là món quà lớn nhất cho chúng mình."
                  />
                </PanelFieldBlock>
                <PanelFieldBlock label="Tagline footer" tag="" isDark={isDark}>
                  <input
                    className={inputClass}
                    value={preview.ghFooterTagline || ""}
                    onChange={(e) => onChange("ghFooterTagline", e.target.value)}
                    placeholder="VD: See you there"
                  />
                </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
            </>
          ) : (
            <TemplateWorkspaceCommonFields
              copy={copy}
              inputClass={inputClass}
              preview={preview}
              onChange={onChange}
              images={images}
              onCoverImageChange={onCoverImageChange}
              onGalleryImageChange={onGalleryImageChange}
              isDark={isDark}
              gallerySlotTags={gallerySlotTags}
            />
          )}          {isSlideFlex ? (
            <div
              className={`flex min-w-0 flex-col gap-5 border-t pt-5 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-rose)]">
                  {sf.sectionTitle}
                </p>
                <p
                  className={`mt-2 text-xs leading-relaxed ${isDark ? "text-white/70" : "text-[var(--color-ink)]/72"}`}
                >
                  {sf.sectionLead}
                </p>
              </div>

              <SlideFlexWorkspaceSection
                title={sf.coupleSection}
                inventory={sf.coupleSectionInventory}
                isDark={isDark}
              >
              <p
                className={`text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
              >
                {copy.groomName}
              </p>
              <p className="text-[11px] font-medium leading-snug text-[var(--color-sage)]">
                {sf.couplePhotosSection}
              </p>
              <SlideFlexPortraitUpload
                label={sf.groomPortraitUpload}
                tag={sf.tagGroomPortraitUpload}
                hasImage={Boolean(images.groomPortraitImage)}
                selectedLabel={copy.imageSelected}
                emptyLabel={copy.imageDefault}
                isDark={isDark}
                onPick={onGroomPortraitImageChange}
              />
              <PanelFieldBlock
                label={sf.groomParentLine1}
                tag={sf.tagGroomParentLine1}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.groomParentLine1}
                  onChange={(e) => onChange("groomParentLine1", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.groomParentLine2}
                tag={sf.tagGroomParentLine2}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.groomParentLine2}
                  onChange={(e) => onChange("groomParentLine2", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock label={sf.groomBio} tag={sf.tagGroomBio} isDark={isDark}>
                <textarea
                  className={textareaClass}
                  value={preview.groomBio}
                  onChange={(e) => onChange("groomBio", e.target.value)}
                  rows={3}
                />
              </PanelFieldBlock>

              <p
                className={`mt-1 text-xs font-semibold ${isDark ? "text-white/88" : "text-[var(--color-ink)]"}`}
              >
                {copy.brideName}
              </p>
              <SlideFlexPortraitUpload
                label={sf.bridePortraitUpload}
                tag={sf.tagBridePortraitUpload}
                hasImage={Boolean(images.bridePortraitImage)}
                selectedLabel={copy.imageSelected}
                emptyLabel={copy.imageDefault}
                isDark={isDark}
                onPick={onBridePortraitImageChange}
              />
              <PanelFieldBlock
                label={sf.brideParentLine1}
                tag={sf.tagBrideParentLine1}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.brideParentLine1}
                  onChange={(e) => onChange("brideParentLine1", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.brideParentLine2}
                tag={sf.tagBrideParentLine2}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.brideParentLine2}
                  onChange={(e) => onChange("brideParentLine2", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock label={sf.brideBio} tag={sf.tagBrideBio} isDark={isDark}>
                <textarea
                  className={textareaClass}
                  value={preview.brideBio}
                  onChange={(e) => onChange("brideBio", e.target.value)}
                  rows={3}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.heroCopySection}
                inventory={sf.heroSectionInventory}
                isDark={isDark}
              >
              <PanelFieldBlock label={sf.heroEyebrow} tag={sf.tagHeroEyebrow} isDark={isDark}>
                <input
                  className={inputClass}
                  value={preview.heroEyebrow}
                  onChange={(e) => onChange("heroEyebrow", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.heroGettingMarried}
                tag={sf.tagHeroGettingMarried}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.heroGettingMarried}
                  onChange={(e) => onChange("heroGettingMarried", e.target.value)}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.sectionHeadingsGroup}
                inventory={sf.sectionHeadingsInventory}
                isDark={isDark}
              >
              <PanelFieldBlock
                label={sf.sectionCoupleTitle}
                tag={sf.tagSectionCoupleTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionCoupleTitle}
                  onChange={(e) => onChange("sectionCoupleTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionStoryTitle}
                tag={sf.tagSectionStoryTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionStoryTitle}
                  onChange={(e) => onChange("sectionStoryTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionPartyTitle}
                tag={sf.tagSectionPartyTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionPartyTitle}
                  onChange={(e) => onChange("sectionPartyTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionPartyLead}
                tag={sf.tagSectionPartyLead}
                isDark={isDark}
              >
                <textarea
                  className={textareaClass}
                  value={preview.sectionPartyLead}
                  onChange={(e) => onChange("sectionPartyLead", e.target.value)}
                  rows={2}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionEventsTitle}
                tag={sf.tagSectionEventsTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionEventsTitle}
                  onChange={(e) => onChange("sectionEventsTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionEventsLead}
                tag={sf.tagSectionEventsLead}
                isDark={isDark}
              >
                <textarea
                  className={textareaClass}
                  value={preview.sectionEventsLead}
                  onChange={(e) => onChange("sectionEventsLead", e.target.value)}
                  rows={2}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionGalleryTitle}
                tag={sf.tagSectionGalleryTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionGalleryTitle}
                  onChange={(e) => onChange("sectionGalleryTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionVideoTitle}
                tag={sf.tagSectionVideoTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionVideoTitle}
                  onChange={(e) => onChange("sectionVideoTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionGuestbookTitle}
                tag={sf.tagSectionGuestbookTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionGuestbookTitle}
                  onChange={(e) => onChange("sectionGuestbookTitle", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionGuestbookLead}
                tag={sf.tagSectionGuestbookLead}
                isDark={isDark}
              >
                <textarea
                  className={textareaClass}
                  value={preview.sectionGuestbookLead}
                  onChange={(e) => onChange("sectionGuestbookLead", e.target.value)}
                  rows={2}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.sectionGiftTitle}
                tag={sf.tagSectionGiftTitle}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.sectionGiftTitle}
                  onChange={(e) => onChange("sectionGiftTitle", e.target.value)}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.storySection}
                inventory={sf.storySectionInventory}
                isDark={isDark}
              >
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`grid gap-2.5 rounded-xl border px-3 py-3 text-xs ${isDark ? "border-white/12 bg-white/[0.03]" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-sage)]">
                    {sf.storySlotLabel} {n}
                  </p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-sage)]/90">
                    {sf.tagStorySlot}
                  </span>
                  <PanelFieldBlock label={sf.timelineTitle} tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview[`timeline${n}Title` as keyof PreviewData]}
                      onChange={(e) =>
                        onChange(`timeline${n}Title` as keyof PreviewData, e.target.value)
                      }
                    />
                  </PanelFieldBlock>
                  <PanelFieldBlock label={sf.timelineDate} tag="" isDark={isDark}>
                    <input
                      className={inputClass}
                      value={preview[`timeline${n}Date` as keyof PreviewData]}
                      onChange={(e) =>
                        onChange(`timeline${n}Date` as keyof PreviewData, e.target.value)
                      }
                    />
                  </PanelFieldBlock>
                  <PanelFieldBlock label={sf.timelineBody} tag="" isDark={isDark}>
                    <textarea
                      className={textareaClass}
                      value={preview[`timeline${n}Body` as keyof PreviewData]}
                      onChange={(e) =>
                        onChange(`timeline${n}Body` as keyof PreviewData, e.target.value)
                      }
                      rows={3}
                    />
                  </PanelFieldBlock>
                </div>
              ))}
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.partySection}
                inventory={sf.partySectionInventory}
                isDark={isDark}
              >
              <p className="text-xs font-medium text-[var(--color-sage)]">{sf.bridesmaidBlock}</p>
              {[1, 2].map((n) => (
                <div
                  key={`bm-${n}`}
                  className={`grid gap-2 rounded-xl border px-3 py-3 ${isDark ? "border-white/12" : "border-[var(--color-ink)]/10"}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-sage)]">
                    {sf.tagPartyPerson}
                  </span>
                  <div className="grid min-w-0 grid-cols-1 gap-3">
                    <PanelFieldBlock label={sf.personRole} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`bm${n}Role` as keyof PreviewData]}
                        onChange={(e) => onChange(`bm${n}Role` as keyof PreviewData, e.target.value)}
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={sf.personName} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`bm${n}Name` as keyof PreviewData]}
                        onChange={(e) => onChange(`bm${n}Name` as keyof PreviewData, e.target.value)}
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={sf.personBio} tag="" isDark={isDark}>
                      <textarea
                        className={textareaClass}
                        value={preview[`bm${n}Bio` as keyof PreviewData]}
                        onChange={(e) =>
                          onChange(`bm${n}Bio` as keyof PreviewData, e.target.value)
                        }
                        rows={2}
                      />
                    </PanelFieldBlock>
                  </div>
                </div>
              ))}
              <p className="text-xs font-medium text-[var(--color-sage)]">{sf.groomsmenBlock}</p>
              {[1, 2].map((n) => (
                <div
                  key={`gm-${n}`}
                  className={`grid gap-2 rounded-xl border px-3 py-3 ${isDark ? "border-white/12" : "border-[var(--color-ink)]/10"}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-sage)]">
                    {sf.tagPartyPerson}
                  </span>
                  <div className="grid min-w-0 grid-cols-1 gap-3">
                    <PanelFieldBlock label={sf.personRole} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`gm${n}Role` as keyof PreviewData]}
                        onChange={(e) => onChange(`gm${n}Role` as keyof PreviewData, e.target.value)}
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={sf.personName} tag="" isDark={isDark}>
                      <input
                        className={inputClass}
                        value={preview[`gm${n}Name` as keyof PreviewData]}
                        onChange={(e) => onChange(`gm${n}Name` as keyof PreviewData, e.target.value)}
                      />
                    </PanelFieldBlock>
                    <PanelFieldBlock label={sf.personBio} tag="" isDark={isDark}>
                      <textarea
                        className={textareaClass}
                        value={preview[`gm${n}Bio` as keyof PreviewData]}
                        onChange={(e) =>
                          onChange(`gm${n}Bio` as keyof PreviewData, e.target.value)
                        }
                        rows={2}
                      />
                    </PanelFieldBlock>
                  </div>
                </div>
              ))}
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.wishSection}
                inventory={sf.wishSectionInventory}
                isDark={isDark}
              >
              <PanelFieldBlock
                label={sf.wishSuggestion1}
                tag={sf.tagWishSuggestion1}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.wishSuggestion1}
                  onChange={(e) => onChange("wishSuggestion1", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.wishSuggestion2}
                tag={sf.tagWishSuggestion2}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.wishSuggestion2}
                  onChange={(e) => onChange("wishSuggestion2", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock
                label={sf.wishSuggestion3}
                tag={sf.tagWishSuggestion3}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.wishSuggestion3}
                  onChange={(e) => onChange("wishSuggestion3", e.target.value)}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.mediaSection}
                inventory={sf.mediaSectionInventory}
                isDark={isDark}
              >
              <PanelFieldBlock label={sf.videoCaption} tag={sf.tagVideoCaption} isDark={isDark}>
                <textarea
                  className={textareaClass}
                  value={preview.videoCaption}
                  onChange={(e) => onChange("videoCaption", e.target.value)}
                  rows={2}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>

              <SlideFlexWorkspaceSection
                title={sf.footerSection}
                inventory={sf.footerSectionInventory}
                isDark={isDark}
              >
              <PanelFieldBlock
                label={sf.footerThanksHeadline}
                tag={sf.tagFooterHeadline}
                isDark={isDark}
              >
                <input
                  className={inputClass}
                  value={preview.footerThanksHeadline}
                  onChange={(e) => onChange("footerThanksHeadline", e.target.value)}
                />
              </PanelFieldBlock>
              <PanelFieldBlock label={sf.footerThanksBody} tag={sf.tagFooterBody} isDark={isDark}>
                <textarea
                  className={textareaClass}
                  value={preview.footerThanksBody}
                  onChange={(e) => onChange("footerThanksBody", e.target.value)}
                  rows={3}
                />
              </PanelFieldBlock>
              </SlideFlexWorkspaceSection>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={`shrink-0 space-y-3 border-t pt-4 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-rose)]">
          {isPremium ? copy.paymentEyebrow : copy.paymentFreeEyebrow}
        </p>
        <p className={`text-sm font-medium ${isDark ? "text-white/90" : "text-[var(--color-ink)]"}`}>
          {isPremium ? copy.paymentTitle : copy.paymentFreeTitle}
        </p>
        <p className={`text-xs leading-relaxed ${isDark ? "text-white/70" : "text-[var(--color-ink)]/72"}`}>
          {payBuyerName ? (
            <>
              {copy.paymentBuyerLine}{" "}
              <span className="font-medium text-[var(--color-rose)]/95">{payBuyerName}</span>
            </>
          ) : (
            copy.paymentBuyerUnset
          )}
        </p>
        {isPremium && payError ? (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {payError}
          </p>
        ) : null}
        {!isPremium && freeError ? (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {freeError}
          </p>
        ) : null}
        {isPremium ? (
          <button
            type="button"
            disabled={payLoading}
            onClick={startPremiumCheckout}
            className="btn-primary w-full rounded-full px-4 py-3 text-sm font-medium disabled:opacity-60"
          >
            {payLoading ? copy.paymentLoading : copy.paymentPay}
          </button>
        ) : (
          <>
            <button
              type="button"
              disabled={freeLoading}
              onClick={startFreeInvitation}
              className="btn-primary w-full rounded-full px-4 py-3 text-sm font-medium disabled:opacity-60"
            >
              {freeLoading ? copy.paymentFreeLoading : copy.paymentFreeCta}
            </button>
            <p className={`text-xs leading-relaxed ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}>
              {copy.paymentFreeHint}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function TemplateWorkspace({
  template,
  PreviewComponent,
  defaultGalleryImages,
}: {
  template: WeddingTemplate;
  PreviewComponent: React.ComponentType<TemplatePreviewProps>;
  defaultGalleryImages: string[];
}) {
  const pathname = usePathname();
  const { theme } = useGlobalPreferences();
  const [preview, setPreview] = useState<PreviewData>(() =>
    template.slug === "gentle-drift"
      ? { ...defaultPreviewData, ...gentleDriftWorkspaceInitialPreview }
      : defaultPreviewData,
  );
  const [images, setImages] = useState<PreviewImages>(defaultPreviewImages);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [isConfiguratorCollapsed, setIsConfiguratorCollapsed] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    forceDocumentScrollTop();
  }, [pathname, template.slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    forceDocumentScrollTop();
    const t0 = window.setTimeout(forceDocumentScrollTop, 0);
    const raf = requestAnimationFrame(forceDocumentScrollTop);
    const t1 = window.setTimeout(forceDocumentScrollTop, 50);
    const t2 = window.setTimeout(forceDocumentScrollTop, 200);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, [pathname, template.slug]);

  const handlePreviewChange = (key: keyof PreviewData, value: string) => {
    setPreview((current) => ({ ...current, [key]: value }));
  };

  const handleCoverImageChange = (file: File | null) => {
    if (!file) return;
    const nextImage = URL.createObjectURL(file);
    setImages((current) => ({ ...current, coverImage: nextImage }));
  };

  const handleGalleryImageChange = (index: number, file: File | null) => {
    if (!file) return;
    const nextImage = URL.createObjectURL(file);
    setImages((current) => {
      const base =
        current.galleryImages.length > 0 ? [...current.galleryImages] : [...defaultGalleryImages];
      const nextGalleryImages = [...base];
      while (nextGalleryImages.length <= index) {
        nextGalleryImages.push("");
      }
      nextGalleryImages[index] = nextImage;
      return { ...current, galleryImages: nextGalleryImages };
    });
  };

  const revokeObjectUrlIfBlob = useCallback((url: string) => {
    if (url.startsWith("blob:")) URL.revokeObjectURL(url);
  }, []);

  const handleIntroBannerImageChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.introBannerImage);
        if (!file) return { ...current, introBannerImage: "" };
        return { ...current, introBannerImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleGroomPortraitImageChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.groomPortraitImage);
        if (!file) return { ...current, groomPortraitImage: "" };
        return { ...current, groomPortraitImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleBridePortraitImageChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.bridePortraitImage);
        if (!file) return { ...current, bridePortraitImage: "" };
        return { ...current, bridePortraitImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleGdFooterImageChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.gdFooterImage);
        if (!file) return { ...current, gdFooterImage: "" };
        return { ...current, gdFooterImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleBbInvitationBgChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.bbInvitationBgImage);
        if (!file) return { ...current, bbInvitationBgImage: "" };
        return { ...current, bbInvitationBgImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleBbEventsBgChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.bbEventsBgImage);
        if (!file) return { ...current, bbEventsBgImage: "" };
        return { ...current, bbEventsBgImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleBbFooterBgChange = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.bbFooterBgImage);
        if (!file) return { ...current, bbFooterBgImage: "" };
        return { ...current, bbFooterBgImage: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleCoverImage2Change = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.coverImage2);
        if (!file) return { ...current, coverImage2: "" };
        return { ...current, coverImage2: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleCoverImage3Change = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.coverImage3);
        if (!file) return { ...current, coverImage3: "" };
        return { ...current, coverImage3: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const handleCoverImage4Change = useCallback(
    (file: File | null) => {
      setImages((current) => {
        revokeObjectUrlIfBlob(current.coverImage4);
        if (!file) return { ...current, coverImage4: "" };
        return { ...current, coverImage4: URL.createObjectURL(file) };
      });
    },
    [revokeObjectUrlIfBlob],
  );

  const previewProps = useMemo(
    () => ({
      template,
      preview,
      images,
      onPreviewImage: (image: LightboxImage) => setLightboxImage(image),
    }),
    [images, preview, template],
  );

  return (
    <div
      className={`${theme === "dark" ? "text-white" : ""}${
        isConfiguratorCollapsed
          ? ""
          : " pb-[max(6rem,min(40dvh,22rem))] sm:pb-8 md:pb-10"
      }`.trim()}
    >
      <PreviewComponent {...previewProps} />
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <PreviewConfigurator
        template={template}
        preview={preview}
        onChange={handlePreviewChange}
        images={images}
        onCoverImageChange={handleCoverImageChange}
        onGalleryImageChange={handleGalleryImageChange}
        onIntroBannerImageChange={handleIntroBannerImageChange}
        onGroomPortraitImageChange={handleGroomPortraitImageChange}
        onBridePortraitImageChange={handleBridePortraitImageChange}
        onGdFooterImageChange={handleGdFooterImageChange}
        onBbInvitationBgChange={handleBbInvitationBgChange}
        onBbEventsBgChange={handleBbEventsBgChange}
        onBbFooterBgChange={handleBbFooterBgChange}
        onCoverImage2Change={handleCoverImage2Change}
        onCoverImage3Change={handleCoverImage3Change}
        onCoverImage4Change={handleCoverImage4Change}
        isCollapsed={isConfiguratorCollapsed}
        onToggleCollapsed={() =>
          setIsConfiguratorCollapsed((current) => !current)
        }
      />
    </div>
  );
}
