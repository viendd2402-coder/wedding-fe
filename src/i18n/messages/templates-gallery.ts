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
  body: "Toàn bộ mẫu dưới đây có thể xem demo trực tiếp. Liên hệ khi bạn muốn triển khai theo mẫu đã chọn.",
  demo: "Xem demo",
  useTemplate: "Dùng mẫu này",
};

const freeEn: TemplatesGalleryFreeMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Free templates",
  body: "Open any card for a full live demo. Reach out when you are ready to launch with your chosen design.",
  demo: "View demo",
  useTemplate: "Use this template",
};

const premiumVi: TemplatesGalleryPremiumMessages = {
  back: "Về trang chủ",
  eyebrow: "Bộ sưu tập",
  title: "Mẫu trả phí",
  body: "Các mẫu cao cấp với bố cục và trải nghiệm đầy đủ hơn — mở demo để xem chi tiết, xem bảng giá khi bạn muốn chốt gói.",
  demo: "Xem demo",
  seePricing: "Xem bảng giá",
};

const premiumEn: TemplatesGalleryPremiumMessages = {
  back: "Back to home",
  eyebrow: "Gallery",
  title: "Premium templates",
  body: "Elevated layouts and a richer guest experience — open any demo for the full preview, then check pricing when you are ready.",
  demo: "View demo",
  seePricing: "See pricing",
};

export const templatesGalleryFree: Record<AppLanguage, TemplatesGalleryFreeMessages> =
  { vi: freeVi, en: freeEn };

export const templatesGalleryPremium: Record<
  AppLanguage,
  TemplatesGalleryPremiumMessages
> = { vi: premiumVi, en: premiumEn };
