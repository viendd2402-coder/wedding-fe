import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplatesGalleryFreeMessages = {
  back: string;
  eyebrow: string;
  title: string;
  body: string;
  demo: string;
  useTemplate: string;
};

export type TemplatesGalleryPremiumMessages = {
  back: string;
  eyebrow: string;
  title: string;
  body: string;
  demo: string;
  seePricing: string;
};

const freeVi: TemplatesGalleryFreeMessages = {
  back: "Về trang chủ",
  eyebrow: "Bộ sưu tập",
  title: "Mẫu miễn phí",
  body: "",
  demo: "Xem demo",
  useTemplate: "Dùng mẫu này",
};

const freeEn: TemplatesGalleryFreeMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Free templates",
  body: "",
  demo: "View demo",
  useTemplate: "Use this template",
};

const premiumVi: TemplatesGalleryPremiumMessages = {
  back: "Về trang chủ",
  eyebrow: "Bộ sưu tập",
  title: "Mẫu trả phí",
  body: "",
  demo: "Xem demo",
  seePricing: "Xem bảng giá",
};

const premiumEn: TemplatesGalleryPremiumMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Premium templates",
  body: "",
  demo: "View demo",
  seePricing: "See pricing",
};

export const templatesGalleryFree: Record<AppLanguage, TemplatesGalleryFreeMessages> =
  { vi: freeVi, en: freeEn };

export const templatesGalleryPremium: Record<
  AppLanguage,
  TemplatesGalleryPremiumMessages
> = { vi: premiumVi, en: premiumEn };
