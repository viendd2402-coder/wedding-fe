import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplatesGalleryFreeMessages = {
  back: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Hiển thị khi chưa có mẫu tier Miễn phí trong registry. */
  emptyList: string;
  viewDemo: string;
  saveTemplate: string;
};

export type TemplatesGalleryPremiumMessages = {
  back: string;
  eyebrow: string;
  title: string;
  body: string;
  viewDemo: string;
  saveTemplate: string;
};

const freeVi: TemplatesGalleryFreeMessages = {
  back: "Về trang chủ",
  eyebrow: "Bộ sưu tập",
  title: "Mẫu miễn phí",
  body: "",
  emptyList:
    "Hiện chưa có mẫu miễn phí trong bộ sưu tập — xem các mẫu trả phí hoặc quay lại sau.",
  viewDemo: "Xem demo",
  saveTemplate: "Lưu mẫu này",
};

const freeEn: TemplatesGalleryFreeMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Free templates",
  body: "",
  emptyList:
    "There are no free templates in the gallery right now — browse premium templates or check back later.",
  viewDemo: "View demo",
  saveTemplate: "Save this template",
};

const premiumVi: TemplatesGalleryPremiumMessages = {
  back: "Về trang chủ",
  eyebrow: "Bộ sưu tập",
  title: "Mẫu trả phí",
  body: "",
  viewDemo: "Xem demo",
  saveTemplate: "Lưu mẫu này",
};

const premiumEn: TemplatesGalleryPremiumMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Premium templates",
  body: "",
  viewDemo: "View demo",
  saveTemplate: "Save this template",
};

export const templatesGalleryFree: Record<AppLanguage, TemplatesGalleryFreeMessages> =
  { vi: freeVi, en: freeEn };

export const templatesGalleryPremium: Record<
  AppLanguage,
  TemplatesGalleryPremiumMessages
> = { vi: premiumVi, en: premiumEn };
