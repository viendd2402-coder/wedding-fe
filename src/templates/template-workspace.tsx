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
import { buildPaymentInvitationFromPreview } from "@/lib/create-payment-invitation";
import type { TemplateWorkspacePanelMessages } from "@/i18n/messages/template-workspace-ui";

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
  inventory: string;
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
      <p
        className={`whitespace-pre-line text-[11px] font-medium leading-relaxed ${isDark ? "text-white/68" : "text-[var(--color-sage)]"}`}
      >
        {inventory}
      </p>
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
  onPick,
}: {
  label: string;
  tag: string;
  hasImage: boolean;
  selectedLabel: string;
  emptyLabel: string;
  isDark: boolean;
  onPick: (file: File | null) => void;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}
    >
      <PanelFieldBlock label={label} tag={tag} isDark={isDark}>
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
    </div>
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
  /** Số ô upload album (Gentle Drift = 12, mặc định 6). */
  gallerySlotCount?: number;
  fieldGroup?: TemplateWorkspaceCommonFieldGroup;
  /** Khi nhóm ảnh của gentle-drift: thẻ vị trí riêng, không dùng mô tả slide-flex. */
  photoFieldTags?: { coverImage: string; gallerySection: string };
}) {
  const g = fieldGroup;
  const show = (part: Exclude<TemplateWorkspaceCommonFieldGroup, "all">) =>
    g === "all" || g === part;
  const coverTag = photoFieldTags?.coverImage ?? copy.tagCoverImage;
  const gallerySectionTag = photoFieldTags?.gallerySection ?? copy.tagGallerySection;

  return (
    <>
      {show("gentle-drift-names") ? (
        <>
          <PanelFieldBlock label={copy.groomName} tag={copy.tagGroom} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.groom}
              onChange={(event) => onChange("groom", event.target.value)}
              placeholder={copy.groomName}
            />
          </PanelFieldBlock>
          <PanelFieldBlock label={copy.brideName} tag={copy.tagBride} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.bride}
              onChange={(event) => onChange("bride", event.target.value)}
              placeholder={copy.brideName}
            />
          </PanelFieldBlock>
          <PanelFieldBlock label={copy.dateLabel} tag={copy.tagDateLabel} isDark={isDark}>
            <input
              className={inputClass}
              value={preview.dateLabel}
              onChange={(event) => onChange("dateLabel", event.target.value)}
              placeholder={copy.dateLabel}
            />
          </PanelFieldBlock>
          <PanelFieldBlock
            label={copy.countdownTarget}
            tag={copy.tagCountdownTarget}
            isDark={isDark}
          >
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
          </PanelFieldBlock>
        </>
      ) : null}
      {show("gentle-drift-venue") ? (
      <div className="grid grid-cols-1 gap-3.5">
        <PanelFieldBlock label={copy.ceremonyTime} tag={copy.tagCeremonyTime} isDark={isDark}>
          <input
            className={inputClass}
            value={preview.ceremonyTime}
            onChange={(event) => onChange("ceremonyTime", event.target.value)}
            placeholder={copy.ceremonyTime}
          />
        </PanelFieldBlock>
        <PanelFieldBlock label={copy.partyTime} tag={copy.tagPartyTime} isDark={isDark}>
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
      <PanelFieldBlock label={copy.venue} tag={copy.tagVenue} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.venue}
          onChange={(event) => onChange("venue", event.target.value)}
          placeholder={copy.venue}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-venue") ? (
      <PanelFieldBlock label={copy.location} tag={copy.tagLocation} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.location}
          onChange={(event) => onChange("location", event.target.value)}
          placeholder={copy.location}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.bankName} tag={copy.tagBankName} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.bankName}
          onChange={(event) => onChange("bankName", event.target.value)}
          placeholder={copy.bankName}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.accountName} tag={copy.tagAccountName} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.accountName}
          onChange={(event) => onChange("accountName", event.target.value)}
          placeholder={copy.accountName}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-bank") ? (
      <PanelFieldBlock label={copy.accountNumber} tag={copy.tagAccountNumber} isDark={isDark}>
        <input
          className={inputClass}
          value={preview.accountNumber}
          onChange={(event) => onChange("accountNumber", event.target.value)}
          placeholder={copy.accountNumber}
        />
      </PanelFieldBlock>
      ) : null}
      {show("gentle-drift-cover") ? (
      <div
        className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}
      >
        <PanelFieldBlock label={copy.coverImage} tag={coverTag} isDark={isDark}>
          <span
            className={`block text-xs ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}
          >
            {images.coverImage ? copy.coverSelected : copy.coverEmpty}
          </span>
          <input
            type="file"
            accept="image/*"
            className="mt-3 block w-full min-w-0 text-xs"
            onChange={(event) => onCoverImageChange(event.target.files?.[0] ?? null)}
          />
        </PanelFieldBlock>
      </div>
      ) : null}
      {show("gentle-drift-album") ? (
      <div className="rounded-2xl border border-dashed px-4 py-3 text-sm">
        <PanelFieldBlock label={copy.gallery} tag={gallerySectionTag} isDark={isDark}>
          <div className="mt-3 grid gap-3.5">
            {Array.from({ length: gallerySlotCount }, (_, index) => (
              <div
                key={index}
                className={`rounded-xl border px-3 py-2 text-xs ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"}`}
              >
                <PanelFieldBlock
                  label={`${copy.imageLabel} ${index + 1}`}
                  tag={gallerySlotTags[index] ?? `${copy.imageLabel} ${index + 1}`}
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
                    className="mt-2 block w-full min-w-0"
                    onChange={(event) =>
                      onGalleryImageChange(index, event.target.files?.[0] ?? null)
                    }
                  />
                </PanelFieldBlock>
              </div>
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

  const sendConsultEmail = useCallback(() => {
    const body = [`Template: ${template.name} (${template.slug})`, "", clientNote].join("\n");
    window.location.href = `mailto:${siteContact.email}?subject=${encodeURIComponent(copy.paymentMailSubject)}&body=${encodeURIComponent(body)}`;
  }, [clientNote, copy.paymentMailSubject, template.name, template.slug]);

  const startPremiumCheckout = useCallback(async () => {
    setPayError(null);
    const invitation = buildPaymentInvitationFromPreview(template.slug, preview, images);
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
    clientNote,
    copy.paymentFailed,
    copy.paymentInviteIncomplete,
    copy.paymentNotConfigured,
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
  const sf = copy.slideFlex;
  const gd = copy.gentleDrift;
  const gallerySlotTags = useMemo((): readonly string[] => {
    const six = [
      copy.tagGallerySlot1,
      copy.tagGallerySlot2,
      copy.tagGallerySlot3,
      copy.tagGallerySlot4,
      copy.tagGallerySlot5,
      copy.tagGallerySlot6,
    ] as const;
    if (!isGentleDrift) return six;
    return [
      ...six,
      gd.tagGallerySlot7,
      gd.tagGallerySlot8,
      gd.tagGallerySlot9,
      gd.tagGallerySlot10,
      gd.tagGallerySlot11,
      gd.tagGallerySlot12,
    ];
  }, [copy, gd, isGentleDrift]);

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
                  gallerySlotCount={12}
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
          )}

          {isSlideFlex ? (
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
      const nextGalleryImages =
        current.galleryImages.length > 0
          ? [...current.galleryImages]
          : [...defaultGalleryImages];
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
        isCollapsed={isConfiguratorCollapsed}
        onToggleCollapsed={() =>
          setIsConfiguratorCollapsed((current) => !current)
        }
      />
    </div>
  );
}
