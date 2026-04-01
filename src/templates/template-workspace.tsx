"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import {
  defaultPreviewData,
  defaultPreviewImages,
  type LightboxImage,
  type PreviewData,
  type PreviewImages,
  type TemplatePreviewProps,
} from "@/templates/preview-types";
import type { WeddingTemplate } from "@/lib/templates/types";

function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null;
  onClose: () => void;
}) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const copy =
    language === "vi"
      ? { close: "Đóng preview" }
      : { close: "Close preview" };

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/82 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full shadow transition cursor-pointer ${
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
        <div className="relative h-[85vh] w-full overflow-hidden rounded-[1.8rem] bg-white/10">
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
  preview,
  onChange,
  images,
  onCoverImageChange,
  onGalleryImageChange,
  isCollapsed,
  onToggleCollapsed,
}: {
  preview: PreviewData;
  onChange: (key: keyof PreviewData, value: string) => void;
  images: PreviewImages;
  onCoverImageChange: (file: File | null) => void;
  onGalleryImageChange: (index: number, file: File | null) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const copy =
    language === "vi"
      ? {
          openPreview: "Mở phần xem thử thông tin",
          closePreview: "Ẩn phần xem thử thông tin",
          titleEyebrow: "Xem thử thông tin",
          title: "Điền và apply ngay",
          groomName: "Tên chú rể",
          brideName: "Tên cô dâu",
          dateLabel: "Ngày cưới hiển thị",
          location: "Địa điểm / thành phố",
          ceremonyTime: "Giờ lễ",
          partyTime: "Giờ tiệc",
          venue: "Địa điểm tiệc",
          bankName: "Tên ngân hàng",
          accountName: "Tên chủ tài khoản",
          accountNumber: "Số tài khoản",
          coverImage: "Ảnh cover",
          coverSelected: "Đã chọn ảnh cover mới.",
          coverEmpty: "Chưa chọn ảnh cover.",
          gallery: "Album gallery",
          imageLabel: "Ảnh",
          imageSelected: "Đã chọn ảnh.",
          imageDefault: "Đang dùng ảnh mặc định.",
        }
      : {
          openPreview: "Open preview configurator",
          closePreview: "Hide preview configurator",
          titleEyebrow: "Preview editor",
          title: "Edit and apply instantly",
          groomName: "Groom name",
          brideName: "Bride name",
          dateLabel: "Displayed wedding date",
          location: "Location / city",
          ceremonyTime: "Ceremony time",
          partyTime: "Reception time",
          venue: "Reception venue",
          bankName: "Bank name",
          accountName: "Account holder",
          accountNumber: "Account number",
          coverImage: "Cover image",
          coverSelected: "New cover image selected.",
          coverEmpty: "No custom cover image selected.",
          gallery: "Gallery album",
          imageLabel: "Image",
          imageSelected: "Image selected.",
          imageDefault: "Using default image.",
        };

  if (isCollapsed) {
    return (
      <button
        type="button"
        onClick={onToggleCollapsed}
        className={`fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full backdrop-blur transition ${
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

  const inputClass = `rounded-2xl px-4 py-3 outline-none ${
    isDark
      ? "border border-white/10 bg-white/6 text-white placeholder:text-white/35"
      : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)] placeholder:text-[var(--color-ink)]/35"
  }`;

  return (
    <div
      className={`fixed bottom-3 left-3 right-3 z-50 rounded-[1.8rem] p-4 backdrop-blur sm:bottom-5 sm:left-auto sm:right-5 sm:w-[min(380px,calc(100vw-24px))] sm:p-5 ${
        isDark
          ? "border border-white/10 bg-[#0f0f10]/92 text-white shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
          : "border border-[var(--color-ink)]/10 bg-white/92 shadow-[0_24px_60px_rgba(49,42,40,0.14)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-sage)]">
            {copy.titleEyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl">{copy.title}</h2>
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
      <div className="mt-4 grid max-h-[55vh] gap-3 overflow-y-auto pr-1 sm:max-h-[60vh]">
        <input className={inputClass} value={preview.groom} onChange={(event) => onChange("groom", event.target.value)} placeholder={copy.groomName} />
        <input className={inputClass} value={preview.bride} onChange={(event) => onChange("bride", event.target.value)} placeholder={copy.brideName} />
        <input className={inputClass} value={preview.dateLabel} onChange={(event) => onChange("dateLabel", event.target.value)} placeholder={copy.dateLabel} />
        <input className={inputClass} value={preview.location} onChange={(event) => onChange("location", event.target.value)} placeholder={copy.location} />
        <div className="grid grid-cols-2 gap-3">
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
          <div className="mt-3 grid gap-3">
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
  const { theme } = useGlobalPreferences();
  const [preview, setPreview] = useState<PreviewData>(defaultPreviewData);
  const [images, setImages] = useState<PreviewImages>(defaultPreviewImages);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [isConfiguratorCollapsed, setIsConfiguratorCollapsed] = useState(false);

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
    <div className={theme === "dark" ? "text-white" : ""}>
      <PreviewComponent {...previewProps} />
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <PreviewConfigurator
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
