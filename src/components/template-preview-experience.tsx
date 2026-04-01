"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import CityChicPreview from "@/components/template-previews/city-chic-preview";
import AzurePromisePreview from "@/components/template-previews/azure-promise-preview";
import EditorialBloomPreview from "@/components/template-previews/editorial-bloom-preview";
import GardenNotePreview from "@/components/template-previews/garden-note-preview";
import HeritageVowsPreview from "@/components/template-previews/heritage-vows-preview";
import MinimalMusePreview from "@/components/template-previews/minimal-muse-preview";
import ModernMonogramPreview from "@/components/template-previews/modern-monogram-preview";
import type { WeddingTemplate } from "@/lib/templates";

type TemplatePageData = WeddingTemplate;

type PreviewData = {
  bride: string;
  groom: string;
  dateLabel: string;
  location: string;
  countdownTarget: string;
  ceremonyTime: string;
  partyTime: string;
  venue: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
};

type PreviewImages = {
  coverImage: string;
  galleryImages: string[];
};

type LightboxImage = {
  src: string;
  alt: string;
};

const defaultPreviewData: PreviewData = {
  bride: "Linh",
  groom: "Minh",
  dateLabel: "Chủ nhật, 20 tháng 10 năm 2026",
  location: "Đà Nẵng",
  countdownTarget: "2026-10-20T09:00",
  ceremonyTime: "09:00",
  partyTime: "18:00",
  venue: "Riverside Garden, Đà Nẵng",
  bankName: "ACB - Ngân hàng Á Châu",
  accountName: "LINH MINH STUDIO",
  accountNumber: "1234 5678 9999",
};

const timeline = [
  {
    year: "2021",
    title: "Lần đầu gặp nhau",
    description:
      "Chúng mình gặp nhau trong một buổi chiều rất bình thường, nhưng cuộc trò chuyện hôm đó lại mở ra một hành trình đặc biệt.",
  },
  {
    year: "2023",
    title: "Cùng nhau trưởng thành",
    description:
      "Từ những chuyến đi ngắn cho đến những dự định dài lâu, cả hai học cách đồng hành và thấu hiểu nhau hơn mỗi ngày.",
  },
  {
    year: "2026",
    title: "Lời hứa trăm năm",
    description:
      "Sau nhiều kỷ niệm đẹp, chúng mình quyết định viết tiếp câu chuyện này bằng một đám cưới ấm áp và gần gũi.",
  },
];

const events = [
  {
    label: "Lễ thành hôn",
    timeKey: "ceremonyTime" as const,
    place: "Nhà thờ Chính Tòa Đà Nẵng",
    address: "156 Trần Phú, Hải Châu, Đà Nẵng",
  },
  {
    label: "Tiệc cưới",
    timeKey: "partyTime" as const,
    place: "Riverside Garden",
    address: "02 Bạch Đằng, Hải Châu, Đà Nẵng",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
];

const defaultPreviewImages: PreviewImages = {
  coverImage: "",
  galleryImages: [],
};

const wishes = [
  {
    name: "Khánh & Vy",
    message:
      "Chúc hai bạn luôn giữ được sự dịu dàng và hạnh phúc như ngày hôm nay. Mong rằng mọi điều tốt đẹp nhất sẽ luôn ở bên hai bạn.",
  },
  {
    name: "Gia đình hai bên",
    message:
      "Chúc các con có một cuộc sống hôn nhân thật trọn vẹn, yêu thương, sẻ chia và đồng hành cùng nhau đến suốt đời.",
  },
  {
    name: "Hội bạn thân",
    message:
      "Cuối cùng ngày này cũng đến. Chúc cô dâu chú rể thật rực rỡ, vui hết mình và có một hành trình mới thật tuyệt vời.",
  },
];

const weddingCountdownTimeline = [
  {
    label: "Cầu hôn",
    date: "12.03.2026",
    description: "Khoảnh khắc đánh dấu lời hứa cho một chặng đường mới.",
  },
  {
    label: "Chụp ảnh cưới",
    date: "02.07.2026",
    description: "Lưu lại những khung hình đẹp nhất trước ngày trọng đại.",
  },
  {
    label: "Gửi thiệp mời",
    date: "15.09.2026",
    description: "Thiệp cưới số được gửi đến gia đình, bạn bè và người thân.",
  },
  {
    label: "Ngày cưới",
    date: "20.10.2026",
    description: "Ngày chúng mình chính thức về chung một nhà.",
  },
];

const calendarDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const calendarDates = ["13", "14", "15", "16", "17", "18", "19", "20"];

function TemplateHeader({ tier }: { tier: string }) {
  const { language } = useGlobalPreferences();
  const copy =
    language === "vi"
      ? {
          back: "Quay lại trang chủ",
          contact: "Nhận tư vấn mẫu này",
          free: "Miễn phí",
          premium: "Trả phí",
        }
      : {
          back: "Back to home",
          contact: "Get consultation",
          free: "Free",
          premium: "Premium",
        };

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="btn-secondary inline-flex w-fit rounded-full px-5 py-3 text-sm font-medium backdrop-blur"
        >
          {copy.back}
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.25em]"
            style={{
              backgroundColor:
                tier === "Miễn phí"
                  ? "rgba(125, 140, 121, 0.12)"
                  : "rgba(197, 167, 161, 0.16)",
              color:
                tier === "Miễn phí"
                  ? "var(--color-sage)"
                  : "var(--color-rose)",
            }}
          >
            {tier === "Miễn phí" ? copy.free : copy.premium}
          </span>
          <Link
            href="/#contact"
            className="btn-primary inline-flex rounded-full px-5 py-3 text-sm font-medium"
          >
            {copy.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}

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
      ? {
          close: "Đóng preview",
        }
      : {
          close: "Close preview",
        };

  if (!image) {
    return null;
  }

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
  defaultCoverImage,
  defaultGalleryImages,
  isCollapsed,
  onToggleCollapsed,
}: {
  preview: PreviewData;
  onChange: (key: keyof PreviewData, value: string) => void;
  images: PreviewImages;
  onCoverImageChange: (file: File | null) => void;
  onGalleryImageChange: (index: number, file: File | null) => void;
  defaultCoverImage: string;
  defaultGalleryImages: string[];
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
        className={`fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full backdrop-blur transition sm:h-14 sm:w-14 ${
          isDark
            ? "border border-white/10 bg-white/10 text-white shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:bg-white/14"
            : "border border-[var(--color-ink)]/10 bg-white/92 text-[var(--color-ink)] shadow-[0_24px_60px_rgba(49,42,40,0.14)] hover:bg-white"
        }`}
        aria-label={copy.openPreview}
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
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    );
  }

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
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="mt-4 grid max-h-[55vh] gap-3 overflow-y-auto pr-1 sm:max-h-[60vh]">
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.groom}
          onChange={(e) => onChange("groom", e.target.value)}
          placeholder={copy.groomName}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.bride}
          onChange={(e) => onChange("bride", e.target.value)}
          placeholder={copy.brideName}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.dateLabel}
          onChange={(e) => onChange("dateLabel", e.target.value)}
          placeholder={copy.dateLabel}
        />
        <input
          type="datetime-local"
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark ? "border border-white/10 bg-white/6" : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.countdownTarget}
          onChange={(e) => onChange("countdownTarget", e.target.value)}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder={copy.location}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            className={`rounded-2xl px-4 py-3 outline-none ${
              isDark
                ? "border border-white/10 bg-white/6 placeholder:text-white/35"
                : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
            }`}
            value={preview.ceremonyTime}
            onChange={(e) => onChange("ceremonyTime", e.target.value)}
            placeholder={copy.ceremonyTime}
          />
          <input
            className={`rounded-2xl px-4 py-3 outline-none ${
              isDark
                ? "border border-white/10 bg-white/6 placeholder:text-white/35"
                : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
            }`}
            value={preview.partyTime}
            onChange={(e) => onChange("partyTime", e.target.value)}
            placeholder={copy.partyTime}
          />
        </div>
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.venue}
          onChange={(e) => onChange("venue", e.target.value)}
          placeholder={copy.venue}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.bankName}
          onChange={(e) => onChange("bankName", e.target.value)}
          placeholder={copy.bankName}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.accountName}
          onChange={(e) => onChange("accountName", e.target.value)}
          placeholder={copy.accountName}
        />
        <input
          className={`rounded-2xl px-4 py-3 outline-none ${
            isDark
              ? "border border-white/10 bg-white/6 placeholder:text-white/35"
              : "border border-[var(--color-ink)]/10 bg-[var(--color-cream)]"
          }`}
          value={preview.accountNumber}
          onChange={(e) => onChange("accountNumber", e.target.value)}
          placeholder={copy.accountNumber}
        />
        <div className={`rounded-[1.4rem] border border-dashed p-4 ${
          isDark
            ? "border-white/12 bg-white/4"
            : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]/80"
        }`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-sage)]">
            {copy.coverImage}
          </p>
          <div
            className="mt-3 h-32 rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url(${images.coverImage || defaultCoverImage})`,
            }}
          />
          <input
            type="file"
            accept="image/*"
            className="mt-3 block w-full text-sm"
            onChange={(e) => onCoverImageChange(e.target.files?.[0] ?? null)}
          />
          <p className={`mt-2 text-xs ${isDark ? "text-white/55" : "text-[var(--color-ink)]/55"}`}>
            {images.coverImage ? copy.coverSelected : copy.coverEmpty}
          </p>
        </div>
        <div className={`rounded-[1.4rem] border border-dashed p-4 ${
          isDark
            ? "border-white/12 bg-white/4"
            : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]/80"
        }`}>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-sage)]">
            {copy.gallery}
          </p>
          <div className="mt-3 grid gap-3">
            {[0, 1, 2, 3].map((index) => (
              <label
                key={index}
                className={`rounded-2xl px-4 py-3 text-sm ${
                  isDark
                    ? "border border-white/10 bg-white/6"
                    : "border border-[var(--color-ink)]/8 bg-white/70"
                }`}
              >
                <span className={`block text-xs uppercase tracking-[0.2em] ${isDark ? "text-white/55" : "text-[var(--color-ink)]/55"}`}>
                  {copy.imageLabel} {index + 1}
                </span>
                <div
                  className="mt-3 h-24 rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      images.galleryImages[index] || defaultGalleryImages[index]
                    })`,
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 block w-full text-sm"
                  onChange={(e) =>
                    onGalleryImageChange(index, e.target.files?.[0] ?? null)
                  }
                />
                <span className={`mt-2 block text-xs ${isDark ? "text-white/55" : "text-[var(--color-ink)]/55"}`}>
                  {images.galleryImages[index]
                    ? copy.imageSelected
                    : copy.imageDefault}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MinimalTemplate({
  template,
  preview,
  images,
  onPreviewImage,
}: {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,140,121,0.18),_transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,242,236,0.96))]" />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_0.92fr] lg:px-16 lg:py-18">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
              {template.style}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none sm:text-7xl">
              {preview.groom} & {preview.bride}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-ink)]/76">
              {template.heroTitle}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink)]/62">
              {preview.dateLabel} • {preview.location}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#calendar" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                Xem ngày cưới
              </a>
              <a href="#rsvp" className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                Xác nhận tham dự
              </a>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-[var(--color-ink)]/8 bg-white/88 p-5 shadow-[0_22px_60px_rgba(49,42,40,0.08)]">
            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Cover ${template.name}`,
                })
              }
              className="block w-full cursor-pointer text-left"
            >
            <div
              className="min-h-[460px] rounded-[1.8rem] bg-cover bg-center p-6 sm:min-h-[620px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.1), rgba(49,42,40,0.28)), url(${images.coverImage || template.image})`,
              }}
            >
              <div className="flex h-full flex-col justify-between rounded-[1.4rem] border border-white/35 bg-[rgba(255,255,255,0.12)] p-6 backdrop-blur-sm">
                <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/76">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                </div>
                <div className="rounded-[1.6rem] bg-white/88 p-6 text-center text-[var(--color-ink)] sm:p-8">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-sage)]">
                    Save the date
                  </p>
                  <p className="mt-6 font-display text-5xl leading-none sm:text-6xl">
                    {preview.groom}
                    <span className="px-3 text-[var(--color-rose)]/80">&</span>
                    {preview.bride}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-[var(--color-ink)]/68">
                    {template.description}
                  </p>
                  <div className="mx-auto mt-8 h-px w-24 bg-[var(--color-sand)]" />
                  <p className="mt-8 font-display text-3xl">{preview.dateLabel}</p>
                  <p className="mt-3 text-sm text-[var(--color-ink)]/62">
                    {preview.location}
                  </p>
                </div>
              </div>
            </div>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/82 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Thiệp mời</p>
            <div className="mt-6 rounded-[2rem] bg-[var(--color-cream)] p-6">
              <div className="rounded-[1.7rem] bg-white p-6 text-center shadow-[0_12px_30px_rgba(49,42,40,0.06)] sm:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-sage)]">Trân trọng kính mời</p>
                <p className="mt-6 font-display text-4xl leading-none sm:text-5xl">
                  {preview.groom}
                  <span className="px-3 text-[var(--color-rose)]/80">&</span>
                  {preview.bride}
                </p>
                <p className="mt-5 text-sm leading-7 text-[var(--color-ink)]/68">
                  Đến chung vui cùng chúng mình trong ngày hạnh phúc.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] bg-[var(--color-cream)] p-4 text-left">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Lễ thành hôn</p>
                    <p className="mt-3 font-medium">{preview.ceremonyTime}</p>
                  </div>
                  <div className="rounded-[1.3rem] bg-[var(--color-cream)] p-4 text-left">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Tiệc cưới</p>
                    <p className="mt-3 font-medium">{preview.partyTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="calendar" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/82 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Calendar & Countdown</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Save the date</h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="minimal" />
            </div>
            <div className="mt-8 rounded-[2rem] bg-[var(--color-cream)] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">Tháng 10</p>
                  <p className="mt-2 font-display text-4xl">2026</p>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-sm text-[var(--color-ink)]/70">
                  {preview.dateLabel}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-1 text-center sm:gap-2">
                {calendarDays.map((day) => (
                  <div key={day} className="py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-sage)]">
                    {day}
                  </div>
                ))}
                {calendarDates.map((date) => (
                  <div
                    key={date}
                    className={`rounded-2xl py-3 text-sm ${
                      date === "20"
                        ? "bg-[var(--color-rose)] text-white shadow-[0_12px_24px_rgba(197,167,161,0.28)]"
                        : "bg-white text-[var(--color-ink)]/70"
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/82 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Câu chuyện</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Hành trình của chúng mình</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {timeline.map((item) => (
              <div key={item.year} className="rounded-[1.8rem] bg-[var(--color-cream)] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{item.year}</p>
                <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.94fr]">
          <div className="rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(209,177,171,0.12),_transparent_28%),linear-gradient(135deg,#211d1c,#364035)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:px-8 sm:py-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]/82">Lịch sự kiện</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Ngày vui của chúng mình</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
              Bố cục ưu tiên sự rõ ràng: khách nhìn nhanh là biết cần đến đâu, lúc nào và theo đúng flow của ngày cưới.
            </p>
            <div className="mt-8 grid gap-4">
              {events.map((event) => (
                <article key={event.label} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] p-6 shadow-[0_16px_36px_rgba(0,0,0,0.14)]">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-sand)]">{event.label}</p>
                  <p className="mt-4 font-display text-4xl">
                    {event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}
                  </p>
                  <p className="mt-4 text-lg text-white/88">
                    {event.place === "Riverside Garden" ? preview.venue : event.place}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/58">{event.address}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {(images.galleryImages.length ? images.galleryImages : gallery).map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() =>
                  onPreviewImage({
                    src: image,
                    alt: `Gallery ${index + 1} ${template.name}`,
                  })
                }
                className={`overflow-hidden rounded-[2rem] ${
                  index === 0 || index === 3 ? "md:h-[420px]" : "md:h-[320px]"
                } h-72 cursor-pointer`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.28)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/82 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Lời chúc</p>
            <div className="mt-8 grid gap-4">
              {wishes.map((wish) => (
                <article key={wish.name} className="rounded-[1.7rem] bg-[var(--color-cream)] p-5">
                  <p className="font-display text-3xl">{wish.name}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{wish.message}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="rsvp" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/82 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">RSVP</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Xác nhận tham dự</h2>
            <form className="mt-8 grid gap-4">
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Họ và tên" />
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Số điện thoại" />
              <select className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none">
                <option>Tôi sẽ tham dự</option>
                <option>Tôi tham dự cùng người thân</option>
                <option>Rất tiếc, tôi không thể tham dự</option>
              </select>
              <textarea className="min-h-32 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function EditorialTemplate({
  template,
  preview,
  images,
  onPreviewImage,
}: {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f1e7df,#f8f4f1)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,167,161,0.28),_transparent_34%)]" />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-10 sm:px-10 lg:px-16 lg:pb-18">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="pb-4">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">{template.style}</p>
              <h1 className="mt-5 font-display text-5xl leading-none sm:text-8xl">
                {preview.groom}
                <br />
                <span className="text-[var(--color-rose)]/90">&</span> {preview.bride}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--color-ink)]/72">{template.heroTitle}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#story" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  Khám phá câu chuyện
                </a>
                <a href="#rsvp" className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  RSVP
                </a>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-[var(--color-ink)]/8 bg-white/75 p-5 shadow-[0_20px_48px_rgba(49,42,40,0.07)]">
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-rose)]">Save the date</p>
                <p className="mt-4 font-display text-5xl leading-none">20<span className="px-2 text-[var(--color-rose)]/70">/</span>10</p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-ink)]/66">{preview.dateLabel}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onPreviewImage({
                    src: images.coverImage || template.image,
                    alt: `Cover ${template.name}`,
                  })
                }
                className="block min-h-[460px] cursor-pointer rounded-[2.2rem] text-left shadow-[0_24px_70px_rgba(49,42,40,0.12)] sm:min-h-[640px]"
              >
              <div
                className="min-h-[460px] rounded-[2.2rem] bg-cover bg-center p-6 shadow-[0_24px_70px_rgba(49,42,40,0.12)] sm:min-h-[640px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.04), rgba(49,42,40,0.35)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.8rem] border border-white/26 bg-[rgba(255,255,255,0.08)] p-6 backdrop-blur-sm">
                  <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/80">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div className="rounded-[1.8rem] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] p-7 text-white backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/70">Wedding Editorial</p>
                    <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                      {preview.groom}
                      <span className="px-3 text-white/70">&</span>
                      {preview.bride}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/85">{template.description}</p>
                  </div>
                </div>
              </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div id="story" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/84 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Story</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">Hành trình yêu theo nhịp kể của một editorial spread</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
              {timeline.map((item) => (
                <article key={item.year} className="rounded-[1.8rem] border border-[var(--color-ink)]/8 bg-white p-5 shadow-[0_16px_40px_rgba(49,42,40,0.05)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">{item.year}</p>
                  <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-[linear-gradient(180deg,rgba(197,167,161,0.14),rgba(255,255,255,0.95))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Thiệp mời</p>
            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Invitation ${template.name}`,
                })
              }
              className="mt-8 block w-full cursor-pointer rounded-[2rem] text-left"
            >
            <div
              className="mt-8 rounded-[2rem] bg-cover bg-center p-5"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06)), url(${images.coverImage || template.image})`,
              }}
            >
              <div className="rounded-[1.8rem] border border-white/22 bg-[rgba(255,255,255,0.12)] p-8 text-white backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-white/72">Save the date</p>
                <p className="mt-6 font-display text-4xl leading-none sm:text-6xl">
                  {preview.groom}
                  <span className="px-3 text-white/72">&</span>
                  {preview.bride}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/84">Chúng mình hân hạnh được đón tiếp bạn trong ngày trọng đại.</p>
                <div className="mt-8 grid gap-3">
                  <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.12)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/66">Ngày</p>
                    <p className="mt-3 font-display text-3xl">{preview.dateLabel}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-[rgba(255,255,255,0.12)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/66">Địa điểm</p>
                    <p className="mt-3 text-sm leading-7 text-white/84">{preview.venue}</p>
                  </div>
                </div>
              </div>
            </div>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(233,221,209,0.72))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Countdown</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Đếm ngược đến ngày cưới</h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="editorial" />
            </div>
            <div className="mt-8 space-y-4">
              {weddingCountdownTimeline.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[24px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-rose)]" />
                    {index < weddingCountdownTimeline.length - 1 ? <div className="mt-2 h-full w-px bg-[var(--color-ink)]/12" /> : null}
                  </div>
                  <div className="rounded-[1.5rem] bg-white/78 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">{item.date}</p>
                    <p className="mt-2 font-display text-3xl">{item.label}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-ink)]/72">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: (images.galleryImages.length ? images.galleryImages : gallery)[0],
                  alt: `Gallery hero ${template.name}`,
                })
              }
              className="block min-h-[380px] cursor-pointer rounded-[2.3rem] text-left sm:min-h-[540px]"
            >
            <div
              className="min-h-[380px] rounded-[2.3rem] bg-cover bg-center p-6 sm:min-h-[540px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.1), rgba(49,42,40,0.38)), url(${(images.galleryImages.length ? images.galleryImages : gallery)[0]})`,
              }}
            >
              <div className="flex h-full items-end">
                <div className="rounded-[1.7rem] border border-white/20 bg-white/12 p-6 text-white backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/70">Editorial spread</p>
                  <p className="mt-3 font-display text-3xl sm:text-5xl">Khoảng trắng, ảnh lớn và typography là linh hồn của mẫu này.</p>
                </div>
              </div>
            </div>
            </button>
            <div className="grid gap-5">
              {(images.galleryImages.length ? images.galleryImages : gallery)
                .slice(1)
                .map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    onPreviewImage({
                      src: image,
                      alt: `Gallery ${template.name}`,
                    })
                  }
                  className="h-[220px] cursor-pointer rounded-[2rem] bg-cover bg-center sm:h-[250px]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.28)), url(${image})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.94fr]">
          <div className="rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_24%),linear-gradient(135deg,#1d181a,#4a3a37)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.24)] sm:px-8 sm:py-10">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sand)]/82">Lịch sự kiện</p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">Ceremony, dinner và nhịp đêm cưới</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
              Cảm giác premium đến từ việc mỗi điểm chạm trong ngày được trình bày rõ, sang và có chủ đích.
            </p>
            <div className="mt-8 grid gap-4">
              {events.map((event) => (
                <article key={event.label} className="rounded-[1.8rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
                  <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-sand)]">{event.label}</p>
                  <p className="mt-4 font-display text-4xl">
                    {event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}
                  </p>
                  <p className="mt-4 text-lg text-white/90">{event.place === "Riverside Garden" ? preview.venue : event.place}</p>
                  <p className="mt-3 text-sm leading-7 text-white/60">{event.address}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="rsvp" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/84 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">RSVP</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Xác nhận tham dự</h2>
            <form className="mt-8 grid gap-4">
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Họ và tên" />
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Số điện thoại" />
              <select className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none">
                <option>Tôi sẽ tham dự</option>
                <option>Tôi tham dự cùng người thân</option>
                <option>Rất tiếc, tôi không thể tham dự</option>
              </select>
              <textarea className="min-h-32 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function RomanceTemplate({
  template,
  preview,
  images,
  onPreviewImage,
}: {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#fff8f8,#f7f2ec)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(184,144,152,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(197,167,161,0.2),_transparent_34%)]" />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">{template.style}</p>
              <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">
                {preview.groom}
                <span className="px-3 text-[var(--color-rose)]/80">&</span>
                {preview.bride}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-ink)]/74">{template.heroTitle}</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink)]/62">
                {preview.dateLabel} • {preview.location}
              </p>
            </div>

            <div className="rounded-[2.4rem] border border-[var(--color-rose)]/16 bg-white/68 p-5 shadow-[0_24px_70px_rgba(184,144,152,0.12)] backdrop-blur">
              <button
                type="button"
                onClick={() =>
                  onPreviewImage({
                    src: images.coverImage || template.image,
                    alt: `Cover ${template.name}`,
                  })
                }
                className="block w-full cursor-pointer rounded-[2rem] text-left"
              >
              <div
                className="min-h-[460px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[640px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(184,144,152,0.1), rgba(49,42,40,0.28)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.7rem] border border-white/24 bg-[rgba(255,255,255,0.12)] p-6 backdrop-blur-sm">
                  <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/78">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div className="rounded-[2rem] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.08))] p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/72">Save the date</p>
                    <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                      {preview.groom}
                      <span className="px-3 text-white/72">&</span>
                      {preview.bride}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/84">{template.description}</p>
                  </div>
                </div>
              </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(197,167,161,0.12))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Thiệp mời</p>
            <div className="mt-8 rounded-[2rem] bg-white/66 p-5">
              <div className="rounded-[1.8rem] border border-[var(--color-rose)]/14 bg-white/82 p-6 text-center sm:p-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">Trân trọng kính mời</p>
                <p className="mt-6 font-display text-5xl leading-none sm:text-6xl">
                  {preview.groom}
                  <span className="px-3 text-[var(--color-rose)]/70">&</span>
                  {preview.bride}
                </p>
                <p className="mt-5 text-sm leading-7 text-[var(--color-ink)]/68">
                  Sự hiện diện của bạn sẽ là niềm hạnh phúc lớn nhất trong ngày đặc biệt này.
                </p>
                <div className="mt-8 rounded-[1.5rem] bg-[rgba(184,144,152,0.1)] p-5">
                  <p className="font-display text-3xl">{preview.dateLabel}</p>
                  <p className="mt-3 text-sm text-[var(--color-ink)]/66">{preview.venue}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="calendar" className="rounded-[2.3rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(197,167,161,0.12))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Calendar & Countdown</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Đếm ngược đến ngày mình gặp nhau trong bộ váy cưới</h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="romance" />
            </div>
            <div className="mt-8 rounded-[2rem] bg-white/72 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">October</p>
                  <p className="mt-2 font-display text-4xl">2026</p>
                </div>
                <div className="rounded-full bg-[rgba(184,144,152,0.12)] px-4 py-2 text-sm text-[var(--color-ink)]/70">
                  {preview.dateLabel}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-1 text-center sm:gap-2">
                {calendarDays.map((day) => (
                  <div key={day} className="py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-rose)]">
                    {day}
                  </div>
                ))}
                {calendarDates.map((date) => (
                  <div
                    key={date}
                    className={`rounded-2xl py-3 text-sm ${
                      date === "20"
                        ? "bg-[var(--color-rose)] text-white shadow-[0_12px_24px_rgba(197,167,161,0.28)]"
                        : "bg-white text-[var(--color-ink)]/70"
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(197,167,161,0.08))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Câu chuyện</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {timeline.map((item) => (
                <article key={item.year} className="rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(197,167,161,0.12))] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">{item.year}</p>
                  <p className="mt-3 font-display text-3xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2.3rem] bg-[linear-gradient(135deg,#75545f,#b89098)] px-6 py-8 text-white sm:px-8 sm:py-10">
            <p className="text-sm uppercase tracking-[0.35em] text-white/58">Cột mốc</p>
            <div className="mt-8 space-y-4">
              {weddingCountdownTimeline.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[24px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-white" />
                    {index < weddingCountdownTimeline.length - 1 ? <div className="mt-2 h-full w-px bg-white/20" /> : null}
                  </div>
                  <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/68">{item.date}</p>
                    <p className="mt-2 font-display text-3xl">{item.label}</p>
                    <p className="mt-2 text-sm leading-7 text-white/82">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-2">
          {(images.galleryImages.length ? images.galleryImages : gallery).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: image,
                  alt: `Gallery ${index + 1} ${template.name}`,
                })
              }
              className={`overflow-hidden rounded-[2rem] ${
                index === 0 || index === 3 ? "md:h-[420px]" : "md:h-[320px]"
              } h-72 cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.28)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(197,167,161,0.08))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Lời chúc</p>
            <div className="mt-8 grid gap-4">
              {wishes.map((wish) => (
                <article key={wish.name} className="rounded-[1.8rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(197,167,161,0.08))] p-5">
                  <p className="font-display text-3xl">{wish.name}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{wish.message}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="rsvp" className="rounded-[2.3rem] border border-[var(--color-rose)]/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(197,167,161,0.12))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">RSVP</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Xác nhận tham dự</h2>
            <form className="mt-8 grid gap-4">
              <input className="rounded-2xl border border-[var(--color-rose)]/14 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Họ và tên" />
              <input className="rounded-2xl border border-[var(--color-rose)]/14 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Số điện thoại" />
              <select className="rounded-2xl border border-[var(--color-rose)]/14 bg-white/80 px-5 py-4 outline-none">
                <option>Tôi sẽ tham dự</option>
                <option>Tôi tham dự cùng người thân</option>
                <option>Rất tiếc, tôi không thể tham dự</option>
              </select>
              <textarea className="min-h-32 rounded-2xl border border-[var(--color-rose)]/14 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function DarkLuxuryTemplate({
  template,
  preview,
  images,
  onPreviewImage,
}: {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
}) {
  const galleryImages = images.galleryImages.length ? images.galleryImages : gallery;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#171214,#241c20)] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,91,80,0.28),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(91,83,102,0.24),_transparent_34%)]" />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[rgba(255,255,255,0.58)]">
                {template.style}
              </p>
              <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">
                {preview.groom}
                <span className="px-3 text-[rgba(255,255,255,0.58)]">&</span>
                {preview.bride}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/74">
                {template.heroTitle}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                {template.heroSubtitle}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#weekend-flow" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  Xem lịch tiệc
                </a>
                <a href="#rsvp" className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  RSVP cao cấp
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Cover ${template.name}`,
                })
              }
              className="block cursor-pointer rounded-[2.4rem] border border-white/10 bg-white/6 p-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
            >
              <div
                className="min-h-[500px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[640px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.5)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.7rem] border border-white/14 bg-black/18 p-6 backdrop-blur-sm">
                  <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/70">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div className="rounded-[1.8rem] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/62">
                      Candlelight reception
                    </p>
                    <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                      {preview.groom}
                      <span className="px-3 text-white/66">&</span>
                      {preview.bride}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/80">
                      {template.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.3rem] bg-[linear-gradient(180deg,#241c20,#34272a)] p-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-white/56">Dress code</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Black tie, nến ấm và một đêm cưới đầy nhịp điệu</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Tông màu đen, champagne hoặc nâu trầm",
                "Lễ đón khách với cocktail và string quartet",
                "Dinner seating sang, nhiều điểm nhấn ánh sáng",
                "After party tinh gọn nhưng có dấu ấn",
              ].map((item) => (
                <div key={item} className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div id="weekend-flow" className="rounded-[2.3rem] border border-[var(--color-ink)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(91,83,102,0.12))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Countdown</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Đếm ngược tới buổi tối trọng đại</h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="dark" />
            </div>
            <div className="mt-8 grid gap-4">
              {[
                { time: "17:00", title: "Đón khách", copy: "Cocktail, champagne tower và khu chụp hình." },
                { time: "18:00", title: "Làm lễ", copy: "Ceremony riêng tư với ánh nến và âm nhạc live." },
                { time: "19:00", title: "Dinner", copy: "Set menu, speeches và phần mời rượu." },
                { time: "21:00", title: "After party", copy: "Không gian chuyển sang lounge và dance floor." },
              ].map((item) => (
                <article key={item.time} className="rounded-[1.6rem] border border-[var(--color-ink)]/8 bg-white/86 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">{item.time}</p>
                  <p className="mt-2 font-display text-3xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-2">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: image,
                  alt: `Gallery ${index + 1} ${template.name}`,
                })
              }
              className={`overflow-hidden rounded-[2rem] ${index === 0 ? "md:col-span-2 md:h-[460px]" : "md:h-[280px]"} h-72 cursor-pointer`}
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.42)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(122,91,80,0.08))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">Section profile</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Vì sao đây là mẫu premium</h2>
            <p className="mt-6 text-sm leading-7 text-[var(--color-ink)]/72">{template.sectionProfile}</p>
            <div className="mt-8 grid gap-3">
              {template.sections.map((section) => (
                <div key={section} className="rounded-[1.5rem] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)]/78">
                  {section}
                </div>
              ))}
            </div>
          </div>
          <div id="rsvp" className="rounded-[2.3rem] bg-[linear-gradient(180deg,#241c20,#34272a)] p-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-white/56">RSVP premium</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Xác nhận tham dự</h2>
            <form className="mt-8 grid gap-4">
              <input className="rounded-2xl border border-white/12 bg-white/8 px-5 py-4 outline-none placeholder:text-white/42" placeholder="Họ và tên" />
              <input className="rounded-2xl border border-white/12 bg-white/8 px-5 py-4 outline-none placeholder:text-white/42" placeholder="Số điện thoại" />
              <select className="rounded-2xl border border-white/12 bg-white/8 px-5 py-4 outline-none">
                <option>Tôi sẽ tham dự</option>
                <option>Tôi tham dự cùng người thân</option>
                <option>Rất tiếc, tôi không thể tham dự</option>
              </select>
              <textarea className="min-h-32 rounded-2xl border border-white/12 bg-white/8 px-5 py-4 outline-none placeholder:text-white/42" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function DestinationTemplate({
  template,
  preview,
  images,
  onPreviewImage,
}: {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
}) {
  const galleryImages = images.galleryImages.length ? images.galleryImages : gallery;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f4fbfc,#eef5f6)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(123,168,184,0.22),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(125,140,121,0.16),_transparent_34%)]" />
        <TemplateHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-20">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{template.style}</p>
              <h1 className="mt-5 font-display text-5xl leading-none sm:text-7xl">
                {preview.groom} & {preview.bride}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-ink)]/74">{template.heroTitle}</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink)]/62">{template.heroSubtitle}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#itinerary" className="btn-primary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  Xem lịch trình
                </a>
                <a href="#travel" className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  Travel & venue
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Cover ${template.name}`,
                })
              }
              className="block cursor-pointer rounded-[2.4rem] border border-white/70 bg-white/72 p-5 text-left shadow-[0_24px_70px_rgba(49,42,40,0.12)]"
            >
              <div
                className="min-h-[500px] rounded-[2rem] bg-cover bg-center p-6 sm:min-h-[640px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(49,42,40,0.22)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-[1.7rem] border border-white/24 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/76">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div className="rounded-[1.8rem] border border-white/20 bg-white/14 p-7 text-white shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/70">Wedding weekend</p>
                    <p className="mt-4 font-display text-5xl leading-none sm:text-6xl">
                      {preview.groom}
                      <span className="px-3 text-white/72">&</span>
                      {preview.bride}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/84">{template.description}</p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div id="itinerary" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/84 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Weekend itinerary</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Một wedding weekend rõ ràng cho khách ở xa</h2>
            <div className="mt-8 grid gap-4">
              {[
                { day: "Thứ sáu", title: "Welcome dinner", copy: "Đón khách thân thiết tại resort và dùng bữa tối nhẹ." },
                { day: "Thứ bảy", title: "Ceremony & dinner", copy: "Làm lễ bên bờ biển, sau đó là dinner reception." },
                { day: "Chủ nhật", title: "Farewell brunch", copy: "Bữa sáng nhẹ và lời cảm ơn trước khi khách trở về." },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.6rem] bg-[var(--color-cream)] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{item.day}</p>
                  <p className="mt-2 font-display text-3xl">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-[linear-gradient(180deg,rgba(123,168,184,0.12),rgba(255,255,255,0.94))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Countdown</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Đếm ngược tới ngày cả cuối tuần bắt đầu</h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="coastal" />
            </div>
            <div className="mt-8 rounded-[1.8rem] bg-white/80 p-5">
              <p className="text-sm leading-7 text-[var(--color-ink)]/72">{template.sectionProfile}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <div id="travel" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/84 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Travel & venue</p>
            <div className="mt-8 grid gap-4">
              {[
                { title: "Venue", copy: preview.venue },
                { title: "Lưu trú", copy: "Gợi ý resort, shuttle và check-in time cho khách mời." },
                { title: "Di chuyển", copy: "Thông tin sân bay, xe đưa đón và chỉ đường nhanh." },
                { title: "FAQ", copy: "Trang phục, thời tiết, trẻ em và lịch trình cuối tuần." },
              ].map((item) => (
                <article key={item.title} className="rounded-[1.6rem] border border-[var(--color-ink)]/8 bg-[var(--color-cream)] p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]/72">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() =>
                  onPreviewImage({
                    src: image,
                    alt: `Gallery ${index + 1} ${template.name}`,
                  })
                }
                className={`overflow-hidden rounded-[2rem] ${index === 0 ? "md:col-span-2 md:h-[420px]" : "md:h-[300px]"} h-72 cursor-pointer`}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.06), rgba(49,42,40,0.24)), url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-white/84 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">Included sections</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {template.sections.map((section) => (
                <div key={section} className="rounded-[1.5rem] bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)]/78">
                  {section}
                </div>
              ))}
            </div>
          </div>
          <div id="rsvp" className="rounded-[2.3rem] border border-[var(--color-ink)]/8 bg-[linear-gradient(180deg,rgba(123,168,184,0.14),rgba(255,255,255,0.96))] p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">RSVP</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Xác nhận tham dự</h2>
            <form className="mt-8 grid gap-4">
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Họ và tên" />
              <input className="rounded-2xl border border-[var(--color-ink)]/10 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Số điện thoại" />
              <select className="rounded-2xl border border-[var(--color-ink)]/10 bg-white/80 px-5 py-4 outline-none">
                <option>Tôi sẽ tham dự</option>
                <option>Tôi tham dự cùng người thân</option>
                <option>Rất tiếc, tôi không thể tham dự</option>
              </select>
              <textarea className="min-h-32 rounded-2xl border border-[var(--color-ink)]/10 bg-white/80 px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35" placeholder="Gửi lời nhắn tới cô dâu chú rể" />
              <button type="button" className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition">
                Gửi xác nhận
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default function TemplatePreviewExperience({
  template,
}: {
  template: TemplatePageData;
}) {
  const { theme } = useGlobalPreferences();
  const [preview, setPreview] = useState<PreviewData>(defaultPreviewData);
  const [images, setImages] = useState<PreviewImages>(defaultPreviewImages);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [isConfiguratorCollapsed, setIsConfiguratorCollapsed] = useState(false);

  const handlePreviewChange = (key: keyof PreviewData, value: string) => {
    setPreview((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleCoverImageChange = (file: File | null) => {
    if (!file) {
      return;
    }

    const nextImage = URL.createObjectURL(file);

    setImages((current) => ({
      ...current,
      coverImage: nextImage,
    }));
  };

  const handleGalleryImageChange = (index: number, file: File | null) => {
    if (!file) {
      return;
    }

    const nextImage = URL.createObjectURL(file);

    setImages((current) => {
      const nextGalleryImages =
        current.galleryImages.length > 0 ? [...current.galleryImages] : [...gallery];

      nextGalleryImages[index] = nextImage;

      return {
        ...current,
        galleryImages: nextGalleryImages,
      };
    });
  };

  const handlePreviewImage = (image: LightboxImage) => {
    setLightboxImage(image);
  };

  const selectedTemplate = useMemo(() => {
    const templateProps = {
      template,
      preview,
      images,
      onPreviewImage: handlePreviewImage,
    };

    const featuredRenderers = {
      "minimal-muse": <MinimalMusePreview {...templateProps} />,
      "azure-promise": <AzurePromisePreview {...templateProps} />,
      "modern-monogram": <ModernMonogramPreview {...templateProps} />,
      "garden-note": <GardenNotePreview {...templateProps} />,
      "city-chic": <CityChicPreview {...templateProps} />,
      "editorial-bloom": <EditorialBloomPreview {...templateProps} />,
      "heritage-vows": <HeritageVowsPreview {...templateProps} />,
    } as const;

    if (template.slug in featuredRenderers) {
      return featuredRenderers[template.slug as keyof typeof featuredRenderers];
    }

    const familyRenderers = {
      minimal: <MinimalTemplate {...templateProps} />,
      editorial: <EditorialTemplate {...templateProps} />,
      romance: <RomanceTemplate {...templateProps} />,
      "dark-luxury": <DarkLuxuryTemplate {...templateProps} />,
      destination: <DestinationTemplate {...templateProps} />,
    } as const;

    return familyRenderers[template.family];
  }, [images, preview, template]);

  return (
    <div className={theme === "dark" ? "text-white" : ""}>
      {selectedTemplate}
      <ImageLightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <PreviewConfigurator
        preview={preview}
        onChange={handlePreviewChange}
        images={images}
        onCoverImageChange={handleCoverImageChange}
        onGalleryImageChange={handleGalleryImageChange}
        defaultCoverImage={template.image}
        defaultGalleryImages={gallery}
        isCollapsed={isConfiguratorCollapsed}
        onToggleCollapsed={() =>
          setIsConfiguratorCollapsed((current) => !current)
        }
      />
    </div>
  );
}
