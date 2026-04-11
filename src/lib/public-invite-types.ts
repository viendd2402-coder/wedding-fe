import type { PreviewData, PreviewImages } from "@/templates/preview-types";

export type InviteSnapshotPayload = {
  templateSlug: string;
  preview: PreviewData;
  images: PreviewImages;
};

/** Thông tin cá nhân hoá (khách) — hiển thị phía trên snapshot. */
export type PublicInvitePersonalization = {
  greetingLine?: string;
  recipientName?: string;
  note?: string;
};

export type ParsedPublicInvite = {
  snapshot: InviteSnapshotPayload;
  personalization?: PublicInvitePersonalization;
};

export type LoadPublicInvitePageDataResult =
  | { kind: "ok"; parsed: ParsedPublicInvite }
  | { kind: "not_found" }
  | { kind: "bad_body" }
  | { kind: "no_api" }
  | { kind: "network" }
  | { kind: "upstream"; status: number };
