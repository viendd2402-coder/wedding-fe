import type { PreviewData, PreviewImages } from "@/templates/preview-types";

/** Khớp schema Nest `CreatePaymentInvitationDto` (độ dài class-validator). */
export const PAYMENT_INVITATION_LIMITS = {
  templateSlug: 120,
  brideName: 255,
  groomName: 255,
  venue: 500,
  thumbnailImage: 2048,
  /** Giới hạn độ dài chuỗi hoá JSON `details` (bytes UTF-16 gần đúng = length). */
  detailsJsonChars: 500_000,
  /** Nhãn DNS cho subdomain (vd. `ten-cuoi` → `ten-cuoi.example.com`). */
  subdomain: 63,
} as const;

/** Phiên bản payload thiệp gửi kèm thanh toán (số nguyên ≥ 1 trên BE). */
export const PAYMENT_INVITATION_SCHEMA_VERSION = 1;

export type CreatePaymentInvitationDto = {
  templateSlug: string;
  version: number;
  brideName: string;
  groomName: string;
  weddingDate: string;
  venue: string;
  /** Tuỳ chọn — chỉ gửi khi khách nhập; backend có thể dùng để đặt URL công khai. */
  subdomain?: string;
  /**
   * JSON chi tiết thiệp (vd. preview + images) — BE map vào `payment-invitation-detail.details`.
   * Chỉ chấp nhận giá trị JSON-serialize được (object/array/primitive), có giới hạn kích thước.
   */
  details?: unknown | null;
  /** URL ảnh đại diện — BE map vào `payment-invitation-detail.thumbnailImage`. */
  thumbnailImage?: string | null;
};

/**
 * Chuẩn hoá & kiểm tra subdomain mong muốn (chữ thường, số, gạch ngang; 3–63 ký tự).
 * Chuỗi rỗng sau trim → hợp lệ (bỏ qua, không gửi subdomain).
 */
export function parsePaymentInvitationSubdomain(
  raw: string,
): { ok: true; value: string } | { ok: false } {
  const t = raw.trim().toLowerCase();
  if (!t) return { ok: true, value: "" };
  if (t.length < 3 || t.length > PAYMENT_INVITATION_LIMITS.subdomain) return { ok: false };
  if (!/^[a-z0-9-]+$/.test(t)) return { ok: false };
  if (t.startsWith("-") || t.endsWith("-")) return { ok: false };
  if (t.includes("--")) return { ok: false };
  return { ok: true, value: t };
}

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

function pickHttpsThumbnailFromImages(images: PreviewImages): string | undefined {
  const tryUrl = (u: string | undefined) => {
    const t = u?.trim();
    if (t && /^https?:\/\//i.test(t)) return clip(t, PAYMENT_INVITATION_LIMITS.thumbnailImage);
    return undefined;
  };
  const fromCover = tryUrl(images.coverImage);
  if (fromCover) return fromCover;
  for (const g of images.galleryImages) {
    const x = tryUrl(g);
    if (x) return x;
  }
  const extras = [
    images.introBannerImage,
    images.groomPortraitImage,
    images.bridePortraitImage,
    images.gdFooterImage,
    images.bbInvitationBgImage,
    images.bbEventsBgImage,
    images.bbFooterBgImage,
  ];
  for (const e of extras) {
    const x = tryUrl(e);
    if (x) return x;
  }
  return undefined;
}

/** Chuẩn hoá `details` từ client: JSON hợp lệ + giới hạn kích thước. */
function sanitizeDetailsJson(raw: unknown): unknown | null {
  if (raw === undefined || raw === null) return null;
  let normalized: unknown;
  try {
    normalized = JSON.parse(JSON.stringify(raw));
  } catch {
    return null;
  }
  const str = JSON.stringify(normalized);
  if (str.length > PAYMENT_INVITATION_LIMITS.detailsJsonChars) return null;
  return normalized;
}

/** Dùng trên client trước khi POST `/api/payments/payment-link`. */
export function buildPaymentInvitationFromPreview(
  templateSlug: string,
  preview: PreviewData,
  images: PreviewImages,
  options?: { subdomain?: string },
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

  const invitation: CreatePaymentInvitationDto = {
    templateSlug: slug,
    version: PAYMENT_INVITATION_SCHEMA_VERSION,
    brideName,
    groomName,
    weddingDate,
    venue,
  };
  const sub = options?.subdomain?.trim();
  if (sub) {
    const parsed = parsePaymentInvitationSubdomain(sub);
    if (parsed.ok && parsed.value) {
      invitation.subdomain = clip(parsed.value, PAYMENT_INVITATION_LIMITS.subdomain);
    }
  }

  const detailsPayload = sanitizeDetailsJson({ preview, images });
  if (detailsPayload !== null) {
    invitation.details = detailsPayload;
  }
  const thumb = pickHttpsThumbnailFromImages(images);
  if (thumb) invitation.thumbnailImage = thumb;

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

  const out: CreatePaymentInvitationDto = {
    templateSlug,
    version,
    brideName,
    groomName,
    weddingDate,
    venue,
  };

  const subRaw = o.subdomain;
  if (typeof subRaw === "string") {
    const parsed = parsePaymentInvitationSubdomain(subRaw);
    if (parsed.ok && parsed.value) {
      out.subdomain = clip(parsed.value, PAYMENT_INVITATION_LIMITS.subdomain);
    }
  }

  const detailsRaw = o.details;
  let detailsParsed: unknown = detailsRaw;
  if (typeof detailsRaw === "string") {
    const t = detailsRaw.trim();
    if (t) {
      try {
        detailsParsed = JSON.parse(t) as unknown;
      } catch {
        detailsParsed = undefined;
      }
    } else {
      detailsParsed = undefined;
    }
  }
  const detailsNorm = sanitizeDetailsJson(detailsParsed);
  if (detailsNorm !== null) out.details = detailsNorm;

  const thumbRaw = o.thumbnailImage ?? o.thumbnail_image;
  if (typeof thumbRaw === "string") {
    const t = thumbRaw.trim();
    if (/^https?:\/\//i.test(t)) {
      out.thumbnailImage = clip(t, PAYMENT_INVITATION_LIMITS.thumbnailImage);
    }
  }

  return out;
}
