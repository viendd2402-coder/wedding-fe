import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplatesGalleryFreeMessages = {
  back: string;
  eyebrow: string;
  title: string;
  body: string;
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
  viewDemo: "Xem demo",
  saveTemplate: "Lưu mẫu này",
};

const freeEn: TemplatesGalleryFreeMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Free templates",
  body: "",
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
