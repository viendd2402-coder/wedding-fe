import type { PreviewData, PreviewImages } from "@/templates/preview-types";
import { slideFlexGallery } from "@/templates/free/slide-flex/data";
import { brightlyBasicGallery } from "@/templates/free/brightly-basic/data";

/**
 * Public invite codes for `/invite/<code>` share links.
 *
 * **Collision handling:** The path is keyed only by this code, never by couple names.
 * In production, generate a unique value per invitation (e.g. nanoid, cuid, or UUID
 * fragment) when the invite is created. Two couples with the same names still get
 * different codes. Optional: store a separate “pretty slug” for marketing, but resolve
 * invites by unique code only.
 */
export const INVITE_PUBLIC_CODES = [
  "xk7m2n8q",
  "h3jw5q9f",
  "f9dcv6p2",
] as const;

export type InvitePublicCode = (typeof INVITE_PUBLIC_CODES)[number];

export function inviteSnapshotExists(code: string): code is InvitePublicCode {
  return (INVITE_PUBLIC_CODES as readonly string[]).includes(code);
}

/** Không import từ file `use client` — đồng bộ với gallery mặc định của mẫu. */
const minimalMuseGalleryUrls: string[] = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
];

function frozenImages(code: InvitePublicCode): PreviewImages {
  if (code === "xk7m2n8q") {
    const g = slideFlexGallery;
    return {
      coverImage: g[4] ?? "",
      galleryImages: [g[0], g[1], g[2], g[3]].filter(Boolean),
    };
  }
  if (code === "h3jw5q9f") {
    const g = minimalMuseGalleryUrls;
    return {
      coverImage: g[1] ?? g[0] ?? "",
      galleryImages: [g[0], g[2], g[3]].filter(Boolean),
    };
  }
  const g = brightlyBasicGallery;
  return {
    coverImage: g[2] ?? g[0] ?? "",
    galleryImages: [g[0], g[1], g[3], g[4]].filter(Boolean),
  };
}

const snapshots: Record<
  InvitePublicCode,
  { templateSlug: string; preview: PreviewData }
> = {
  xk7m2n8q: {
    templateSlug: "slide-flex",
    preview: {
      bride: "Linh Lan",
      groom: "Lê Minh",
      dateLabel: "Thứ bảy, 18 tháng 4 năm 2026",
      location: "Đà Nẵng",
      countdownTarget: "2026-04-18T15:30",
      ceremonyTime: "15:30",
      partyTime: "18:30",
      venue: "Furama Resort Đà Nẵng — Hội trường Biển",
      bankName: "Vietcombank (VCB)",
      accountName: "LE THI LINH LAN",
      accountNumber: "0123 4567 8901",
    },
  },
  h3jw5q9f: {
    templateSlug: "minimal-muse",
    preview: {
      bride: "Thu Hà",
      groom: "Quốc Anh",
      dateLabel: "Chủ nhật, 10 tháng 5 năm 2026",
      location: "Hà Nội",
      countdownTarget: "2026-05-10T10:00",
      ceremonyTime: "10:00",
      partyTime: "18:00",
      venue: "JW Marriott Hanoi — Grand Ballroom",
      bankName: "Techcombank",
      accountName: "NGUYEN QUOC ANH",
      accountNumber: "9988 7766 5544",
    },
  },
  f9dcv6p2: {
    templateSlug: "brightly-basic",
    preview: {
      bride: "Ngọc Trâm",
      groom: "Hoàng Phúc",
      dateLabel: "Thứ bảy, 6 tháng 6 năm 2026",
      location: "TP. Hồ Chí Minh",
      countdownTarget: "2026-06-06T16:00",
      ceremonyTime: "16:00",
      partyTime: "19:00",
      venue: "The Reverie Saigon — Crystal Ballroom",
      bankName: "ACB",
      accountName: "HOANG NGOC PHUC TRAM",
      accountNumber: "5566 7788 9900",
    },
  },
};

export type InviteSnapshotPayload = {
  templateSlug: string;
  preview: PreviewData;
  images: PreviewImages;
};

export function getInviteSnapshot(code: string): InviteSnapshotPayload | null {
  if (!inviteSnapshotExists(code)) return null;
  const row = snapshots[code];
  return {
    templateSlug: row.templateSlug,
    preview: row.preview,
    images: frozenImages(code),
  };
}
