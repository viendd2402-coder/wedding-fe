import type { AppLanguage } from "@/components/global-preferences-provider";

export type InviteSnapshotMessages = {
  pageTitleSuffix: string;
  banner: string;
  homeLink: string;
  closeLightbox: string;
  unknownTemplate: string;
  /** Ghép trước `recipientName` khi BE không gửi `greetingLine` đủ câu. */
  inviteRecipientPrefix: string;
  personalBlockAria: string;
};

const vi: InviteSnapshotMessages = {
  pageTitleSuffix: "Thiệp cưới (bản lưu) | Lumiere",
  banner: "Bản xem đã lưu tại thời điểm mua — không phải trang chỉnh sửa mẫu.",
  homeLink: "Về Lumiere",
  closeLightbox: "Đóng ảnh",
  unknownTemplate: "Không tìm thấy mẫu thiệp cho bản lưu này.",
  inviteRecipientPrefix: "Kính mời",
  personalBlockAria: "Lời mời dành riêng cho bạn",
};

const en: InviteSnapshotMessages = {
  pageTitleSuffix: "Wedding invitation (saved copy) | Lumiere",
  banner: "Saved view from the time of purchase — not the template editor.",
  homeLink: "Lumiere home",
  closeLightbox: "Close image",
  unknownTemplate: "No template is registered for this saved invitation.",
  inviteRecipientPrefix: "Dear",
  personalBlockAria: "Personal invitation message",
};

export const inviteSnapshotMessages: Record<AppLanguage, InviteSnapshotMessages> = {
  vi,
  en,
};
