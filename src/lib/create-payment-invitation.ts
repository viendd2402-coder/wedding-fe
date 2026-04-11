import type { PreviewData, PreviewImages } from "@/templates/preview-types";

/** Khớp schema Nest `CreatePaymentInvitationDto` (độ dài class-validator). */
export const PAYMENT_INVITATION_LIMITS = {
  templateSlug: 120,
  brideName: 255,
  groomName: 255,
  venue: 500,
  albumUrl: 2048,
} as const;

/** Phiên bản payload thiệp gửi kèm thanh toán (số nguyên ≥ 1 trên BE). */
export const PAYMENT_INVITATION_SCHEMA_VERSION = 1;

export type PaymentInvitationAlbumItemDto = {
  url: string;
};

export type CreatePaymentInvitationDto = {
  templateSlug: string;
  version: number;
  brideName: string;
  groomName: string;
  weddingDate: string;
  venue: string;
  album?: PaymentInvitationAlbumItemDto[] | null;
};

function clip(s: string, max: number): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max);
}

/** Chuẩn hoá thành ISO 8601 cho `@IsDateString()` trên Nest. */
export function weddingDateToIsoString(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const d = new Date(t);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function collectAlbumFromImages(images: PreviewImages): PaymentInvitationAlbumItemDto[] | undefined {
  const urls = [images.coverImage, ...images.galleryImages].filter(
    (u): u is string => typeof u === "string" && /^https?:\/\//i.test(u.trim()),
  );
  if (!urls.length) return undefined;
  return urls.map((u) => ({ url: clip(u, PAYMENT_INVITATION_LIMITS.albumUrl) }));
}

/** Dùng trên client trước khi POST `/api/payments/payment-link`. */
export function buildPaymentInvitationFromPreview(
  templateSlug: string,
  preview: PreviewData,
  images: PreviewImages,
): CreatePaymentInvitationDto | null {
  const groomName = clip(preview.groom, PAYMENT_INVITATION_LIMITS.groomName);
  const brideName = clip(preview.bride, PAYMENT_INVITATION_LIMITS.brideName);
  if (!groomName || !brideName) return null;

  const venueRaw = preview.venue.trim() || preview.location.trim();
  const venue = clip(venueRaw, PAYMENT_INVITATION_LIMITS.venue);
  if (!venue) return null;

  const weddingDate = weddingDateToIsoString(preview.countdownTarget);
  if (!weddingDate) return null;

  const slug = clip(templateSlug, PAYMENT_INVITATION_LIMITS.templateSlug);
  if (!slug) return null;

  const album = collectAlbumFromImages(images);
  const invitation: CreatePaymentInvitationDto = {
    templateSlug: slug,
    version: PAYMENT_INVITATION_SCHEMA_VERSION,
    brideName,
    groomName,
    weddingDate,
    venue,
  };
  if (album?.length) invitation.album = album;
  return invitation;
}

function parseVersion(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isInteger(raw) && raw >= 1) return raw;
  if (typeof raw === "string" && /^\d+$/.test(raw)) {
    const v = Number.parseInt(raw, 10);
    if (v >= 1) return v;
  }
  return null;
}

/**
 * Chuẩn hoá object `invitation` từ request (chống bypass độ dài / kiểu).
 * Trả `null` nếu thiếu trường bắt buộc hoặc `weddingDate` không parse được.
 */
export function sanitizePaymentInvitation(input: unknown): CreatePaymentInvitationDto | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;

  const templateSlug =
    typeof o.templateSlug === "string" ? clip(o.templateSlug, PAYMENT_INVITATION_LIMITS.templateSlug) : "";
  const brideName =
    typeof o.brideName === "string" ? clip(o.brideName, PAYMENT_INVITATION_LIMITS.brideName) : "";
  const groomName =
    typeof o.groomName === "string" ? clip(o.groomName, PAYMENT_INVITATION_LIMITS.groomName) : "";
  const venue = typeof o.venue === "string" ? clip(o.venue, PAYMENT_INVITATION_LIMITS.venue) : "";

  const weddingDateRaw = typeof o.weddingDate === "string" ? o.weddingDate.trim() : "";
  const weddingDate = weddingDateRaw ? weddingDateToIsoString(weddingDateRaw) : null;

  const version = parseVersion(o.version);
  if (!templateSlug || !brideName || !groomName || !venue || !weddingDate || version === null) return null;

  let album: PaymentInvitationAlbumItemDto[] | undefined;
  if (Array.isArray(o.album)) {
    const items: PaymentInvitationAlbumItemDto[] = [];
    for (const row of o.album) {
      if (!row || typeof row !== "object") continue;
      const urlRaw = (row as { url?: unknown }).url;
      if (typeof urlRaw !== "string") continue;
      const u = urlRaw.trim();
      if (!/^https?:\/\//i.test(u)) continue;
      items.push({ url: clip(u, PAYMENT_INVITATION_LIMITS.albumUrl) });
    }
    if (items.length) album = items;
  }

  const out: CreatePaymentInvitationDto = {
    templateSlug,
    version,
    brideName,
    groomName,
    weddingDate,
    venue,
  };
  if (album?.length) out.album = album;
  return out;
}
