"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
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
import type { WeddingTemplate } from "@/lib/templates/types";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";

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
  isCollapsed,
  onToggleCollapsed,
}: {
  template: WeddingTemplate;
  preview: PreviewData;
  onChange: (key: keyof PreviewData, value: string) => void;
  images: PreviewImages;
  onCoverImageChange: (file: File | null) => void;
  onGalleryImageChange: (index: number, file: File | null) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const { theme } = useGlobalPreferences();
  const { templateWorkspace } = useMessages();
  const copy = templateWorkspace.panel;
  const isDark = theme === "dark";

  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

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
    setPayLoading(true);
    try {
      const res = await fetch("/api/payos/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: payBuyerName,
          templateSlug: template.slug,
          clientNote,
        }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok) {
        if (data.error === "payment_config") {
          setPayError(copy.paymentNotConfigured);
        } else if (data.error === "not_premium") {
          setPayError(copy.paymentFailed);
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
  }, [clientNote, copy.paymentFailed, copy.paymentNotConfigured, payBuyerName, template.slug]);

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

  const inputClass = `rounded-2xl px-4 py-3.5 outline-none ${
    isDark
      ? "border border-white/10 bg-white/6 text-white placeholder:text-white/35"
      : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)] placeholder:text-[var(--color-ink)]/35"
  }`;

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
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid gap-3.5">
        <input className={inputClass} value={preview.groom} onChange={(event) => onChange("groom", event.target.value)} placeholder={copy.groomName} />
        <input className={inputClass} value={preview.bride} onChange={(event) => onChange("bride", event.target.value)} placeholder={copy.brideName} />
        <input className={inputClass} value={preview.dateLabel} onChange={(event) => onChange("dateLabel", event.target.value)} placeholder={copy.dateLabel} />
        <input className={inputClass} value={preview.location} onChange={(event) => onChange("location", event.target.value)} placeholder={copy.location} />
        <div className="grid grid-cols-1 gap-3.5 min-[400px]:grid-cols-2">
          <input className={inputClass} value={preview.ceremonyTime} onChange={(event) => onChange("ceremonyTime", event.target.value)} placeholder={copy.ceremonyTime} />
          <input className={inputClass} value={preview.partyTime} onChange={(event) => onChange("partyTime", event.target.value)} placeholder={copy.partyTime} />
        </div>
        <input className={inputClass} value={preview.venue} onChange={(event) => onChange("venue", event.target.value)} placeholder={copy.venue} />
        <input className={inputClass} value={preview.bankName} onChange={(event) => onChange("bankName", event.target.value)} placeholder={copy.bankName} />
        <input className={inputClass} value={preview.accountName} onChange={(event) => onChange("accountName", event.target.value)} placeholder={copy.accountName} />
        <input className={inputClass} value={preview.accountNumber} onChange={(event) => onChange("accountNumber", event.target.value)} placeholder={copy.accountNumber} />
        <label className={`rounded-2xl border border-dashed px-4 py-3 text-sm ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]"}`}>
          <span className="block font-medium">{copy.coverImage}</span>
          <span className="mt-1 block text-xs opacity-70">
            {images.coverImage ? copy.coverSelected : copy.coverEmpty}
          </span>
          <input type="file" accept="image/*" className="mt-3 block w-full text-xs" onChange={(event) => onCoverImageChange(event.target.files?.[0] ?? null)} />
        </label>
        <div className="rounded-2xl border border-dashed px-4 py-3 text-sm">
          <span className="block font-medium">{copy.gallery}</span>
          <div className="mt-3 grid gap-3.5">
            {[0, 1, 2, 3].map((index) => (
              <label key={index} className={`rounded-xl border px-3 py-2 text-xs ${isDark ? "border-white/14 bg-white/4" : "border-[var(--color-ink)]/10 bg-[var(--color-cream)]"}`}>
                <span className="block font-medium">
                  {copy.imageLabel} {index + 1}
                </span>
                <span className="mt-1 block opacity-70">
                  {images.galleryImages[index] ? copy.imageSelected : copy.imageDefault}
                </span>
                <input type="file" accept="image/*" className="mt-2 block w-full" onChange={(event) => onGalleryImageChange(index, event.target.files?.[0] ?? null)} />
              </label>
            ))}
          </div>
        </div>
        </div>
      </div>

      <div
        className={`shrink-0 space-y-3 border-t pt-4 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-rose)]">{copy.paymentEyebrow}</p>
        <p className={`text-sm font-medium ${isDark ? "text-white/90" : "text-[var(--color-ink)]"}`}>
          {copy.paymentTitle}
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
        {payError ? (
          <p className="text-xs text-red-600 dark:text-red-400" role="alert">
            {payError}
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
            <p className={`text-xs leading-relaxed ${isDark ? "text-white/65" : "text-[var(--color-ink)]/65"}`}>
              {copy.paymentFreeHint}
            </p>
            <button
              type="button"
              onClick={sendConsultEmail}
              className={`w-full rounded-full border px-4 py-3 text-sm font-medium transition ${
                isDark
                  ? "border-white/15 text-white/88 hover:bg-white/8"
                  : "border-[var(--color-ink)]/15 text-[var(--color-ink)]/88 hover:bg-[var(--color-ink)]/[0.04]"
              }`}
            >
              {copy.paymentEmailCta}
            </button>
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
  const [preview, setPreview] = useState<PreviewData>(defaultPreviewData);
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
        isCollapsed={isConfiguratorCollapsed}
        onToggleCollapsed={() =>
          setIsConfiguratorCollapsed((current) => !current)
        }
      />
    </div>
  );
}
