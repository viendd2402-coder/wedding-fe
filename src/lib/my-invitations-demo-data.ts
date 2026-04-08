import type { AppLanguage } from "@/components/global-preferences-provider";
import { brightlyBasicGallery } from "@/templates/free/brightly-basic/data";
import { slideFlexGallery } from "@/templates/free/slide-flex/data";

export type DemoInvitationStatus = "published" | "draft";

/** Gói mẫu minh họa — khi có BE, map theo trường thanh toán / license. */
export type DemoInvitationTier = "free" | "premium";

export type DemoInvitation = {
  id: string;
  templateSlug: string;
  templateName: Record<AppLanguage, string>;
  coupleLine: Record<AppLanguage, string>;
  updatedAtISO: string;
  status: DemoInvitationStatus;
  tier: DemoInvitationTier;
  /** Ảnh minh họa trên thẻ (cùng nguồn với gallery mẫu khi có thể). */
  previewImageUrl: string;
  previewImageAlt: Record<AppLanguage, string>;
  eventSummary: Record<AppLanguage, string>;
  venueLine: Record<AppLanguage, string>;
  /** Link thiệp công khai (minh họa — thay bằng URL thật khi có BE). */
  publicInviteUrl: string;
};

const minimalMusePreviewImage =
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80";

export const MY_INVITATIONS_DEMO_DATA: DemoInvitation[] = [
  {
    id: "xk7m2n8q",
    templateSlug: "slide-flex",
    templateName: { vi: "SlideFlex", en: "SlideFlex" },
    coupleLine: { vi: "Lê Minh & Linh Lan", en: "Minh Le & Linh Lan" },
    updatedAtISO: "2026-03-28T14:22:00.000Z",
    status: "published",
    tier: "free",
    previewImageUrl: slideFlexGallery[4] ?? slideFlexGallery[0] ?? "",
    previewImageAlt: {
      vi: "Ảnh xem thử thiệp SlideFlex — Lê Minh và Linh Lan",
      en: "SlideFlex invitation preview — Minh and Linh Lan",
    },
    eventSummary: {
      vi: "Thứ bảy, 18 tháng 4 năm 2026 · Đà Nẵng",
      en: "Saturday, 18 April 2026 · Da Nang",
    },
    venueLine: {
      vi: "Furama Resort Đà Nẵng — Hội trường Biển",
      en: "Furama Resort Da Nang — Ocean Ballroom",
    },
    publicInviteUrl: "/invite/xk7m2n8q",
  },
  {
    id: "h3jw5q9f",
    templateSlug: "minimal-muse",
    templateName: { vi: "Minimal Muse", en: "Minimal Muse" },
    coupleLine: { vi: "Quốc Anh · Thu Hà", en: "Quoc Anh & Thu Ha" },
    updatedAtISO: "2026-04-02T09:05:00.000Z",
    status: "draft",
    tier: "premium",
    previewImageUrl: minimalMusePreviewImage,
    previewImageAlt: {
      vi: "Ảnh xem thử thiệp Minimal Muse — Quốc Anh và Thu Hà",
      en: "Minimal Muse invitation preview — Quoc Anh and Thu Ha",
    },
    eventSummary: {
      vi: "Chủ nhật, 10 tháng 5 năm 2026 · Hà Nội",
      en: "Sunday, 10 May 2026 · Hanoi",
    },
    venueLine: {
      vi: "JW Marriott Hanoi — Grand Ballroom",
      en: "JW Marriott Hanoi — Grand Ballroom",
    },
    publicInviteUrl: "/invite/h3jw5q9f",
  },
  {
    id: "f9dcv6p2",
    templateSlug: "brightly-basic",
    templateName: { vi: "Neela Classic", en: "Neela Classic" },
    coupleLine: { vi: "Hoàng Phúc & Ngọc Trâm", en: "Hoang Phuc & Ngoc Tram" },
    updatedAtISO: "2026-04-07T18:40:00.000Z",
    status: "published",
    tier: "free",
    previewImageUrl: brightlyBasicGallery[2] ?? brightlyBasicGallery[0] ?? "",
    previewImageAlt: {
      vi: "Ảnh xem thử thiệp Neela Classic — Hoàng Phúc và Ngọc Trâm",
      en: "Neela Classic invitation preview — Hoang Phuc and Ngoc Tram",
    },
    eventSummary: {
      vi: "Thứ bảy, 6 tháng 6 năm 2026 · TP. Hồ Chí Minh",
      en: "Saturday, 6 June 2026 · Ho Chi Minh City",
    },
    venueLine: {
      vi: "The Reverie Saigon — Crystal Ballroom",
      en: "The Reverie Saigon — Crystal Ballroom",
    },
    publicInviteUrl: "/invite/f9dcv6p2",
  },
];
