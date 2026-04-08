import type { AppLanguage } from "@/components/global-preferences-provider";

export type MinimalMusePreviewCopy = {
  featureEyebrow: string;
  featureTitle: string;
  featureItems: readonly string[];
  valueNote: string;
  basicRsvp: string;
  basicAttend: string;
  basicDecline: string;
  submit: string;
  gift: string;
};

const vi: MinimalMusePreviewCopy = {
  featureEyebrow: "Free Essentials",
  featureTitle: "Những gì bản miễn phí đã đủ để dùng đẹp và gọn.",
  featureItems: [
    "Giới thiệu cô dâu chú rể với hero ảnh lớn",
    "Lịch cưới, countdown và timeline cơ bản",
    "Google Maps / thông tin địa điểm rõ ràng",
    "RSVP cơ bản và thông tin mừng cưới",
  ],
  valueNote:
    "Bản free tập trung vào trải nghiệm gọn, dễ gửi và đủ thông tin quan trọng thay vì thêm quá nhiều lớp tính năng.",
  basicRsvp: "RSVP cơ bản",
  basicAttend: "Tôi sẽ tham dự",
  basicDecline: "Tôi không thể tham dự",
  submit: "Gửi xác nhận",
  gift: "Mừng cưới",
};

const en: MinimalMusePreviewCopy = {
  featureEyebrow: "Free Essentials",
  featureTitle: "What the free version already does well.",
  featureItems: [
    "Bride and groom introduction with a large hero image",
    "Wedding schedule, countdown, and a basic story timeline",
    "Google Maps / clear venue information",
    "Basic RSVP and gift information",
  ],
  valueNote:
    "The free version focuses on being clean, easy to share, and clear on the important details instead of adding too many premium layers.",
  basicRsvp: "Basic RSVP",
  basicAttend: "I will attend",
  basicDecline: "I cannot attend",
  submit: "Send RSVP",
  gift: "Gift Information",
};

export const minimalMusePreviewMessages: Record<AppLanguage, MinimalMusePreviewCopy> =
  { vi, en };
