"use client";

import type { WeddingTemplate } from "@/lib/templates/types";

export type TemplatePageData = WeddingTemplate;

export type PreviewData = {
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

export type PreviewImages = {
  coverImage: string;
  galleryImages: string[];
};

export type LightboxImage = {
  src: string;
  alt: string;
};

export type TemplatePreviewProps = {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
};

export const defaultPreviewData: PreviewData = {
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

export const defaultPreviewImages: PreviewImages = {
  coverImage: "",
  galleryImages: [],
};
