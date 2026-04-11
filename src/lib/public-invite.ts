import { cache } from "react";
import { getPublicApiBaseUrl } from "@/lib/api-base";
import type {
  LoadPublicInvitePageDataResult,
  ParsedPublicInvite,
  PublicInvitePersonalization,
} from "@/lib/public-invite-types";
import {
  emptySlideFlexPreviewExtra,
  type PreviewData,
  type PreviewImages,
} from "@/templates/preview-types";

export type {
  InviteSnapshotPayload,
  LoadPublicInvitePageDataResult,
  ParsedPublicInvite,
  PublicInvitePersonalization,
} from "@/lib/public-invite-types";

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function pickTrimmedString(o: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/** Gom các object JSON có thể chứa trường thiệp (root, data, preview, …). */
function collectCandidateRecords(body: unknown): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  if (!isRecord(body)) return out;
  out.push(body);

  const data = body.data;
  if (isRecord(data)) {
    out.push(data);
    const inv = data.invitation ?? data.invite ?? data.snapshot;
    if (isRecord(inv)) out.push(inv);
  }

  for (const key of ["invitation", "invite", "snapshot", "preview", "payload"]) {
    const v = body[key];
    if (isRecord(v)) out.push(v);
  }

  const pers = body.personalization ?? body.personal ?? body.guest;
  if (isRecord(pers)) out.push(pers);

  return out;
}

function firstPick(candidates: Record<string, unknown>[], keys: string[]): string {
  for (const o of candidates) {
    const s = pickTrimmedString(o, keys);
    if (s) return s;
  }
  return "";
}

function isoToCountdownTarget(iso: string, ceremonyTimeFallback: string): string {
  const raw = iso.trim();
  if (!raw) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const t = ceremonyTimeFallback.trim() || "09:00";
    const m = /^(\d{1,2}):(\d{2})/.exec(t);
    const hh = m ? m[1].padStart(2, "0") : "09";
    const mm = m ? m[2] : "00";
    return `${raw}T${hh}:${mm}`;
  }

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${mo}-${da}T${h}:${mi}`;
}

function formatDateLabelVi(isoOrDate: string): string {
  const d = new Date(isoOrDate.trim());
  if (Number.isNaN(d.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

/** Ảnh portrait slide-flex từ JSON (chỉ chấp nhận URL https — không dùng blob). */
function portraitHttpsFromCandidates(candidates: Record<string, unknown>[]): {
  groomPortraitImage: string;
  bridePortraitImage: string;
} {
  const groom = firstPick(candidates, [
    "groomPortraitImage",
    "groom_portrait_image",
    "groomPortraitUrl",
    "groom_portrait_url",
  ]);
  const bride = firstPick(candidates, [
    "bridePortraitImage",
    "bride_portrait_image",
    "bridePortraitUrl",
    "bride_portrait_url",
  ]);
  const g = groom && /^https?:\/\//i.test(groom) ? groom : "";
  const b = bride && /^https?:\/\//i.test(bride) ? bride : "";
  return { groomPortraitImage: g, bridePortraitImage: b };
}

function collectImageUrls(candidates: Record<string, unknown>[]): PreviewImages {
  const portraits = portraitHttpsFromCandidates(candidates);
  for (const o of candidates) {
    const coverDirect = pickTrimmedString(o, [
      "coverImage",
      "cover_image",
      "coverImageUrl",
      "cover_url",
      "coverUrl",
    ]);
    const galleryRaw = o.galleryImages ?? o.gallery_images ?? o.gallery ?? o.photos;
    if (coverDirect && /^https?:\/\//i.test(coverDirect)) {
      const gallery: string[] = [];
      if (Array.isArray(galleryRaw)) {
        for (const item of galleryRaw) {
          if (typeof item === "string" && /^https?:\/\//i.test(item.trim())) {
            gallery.push(item.trim());
          } else if (isRecord(item)) {
            const u = pickTrimmedString(item, ["url", "src", "imageUrl", "image_url"]);
            if (u && /^https?:\/\//i.test(u)) gallery.push(u);
          }
        }
      }
      return {
        coverImage: coverDirect,
        galleryImages: gallery,
        groomPortraitImage: portraits.groomPortraitImage,
        bridePortraitImage: portraits.bridePortraitImage,
      };
    }

    const album = o.album ?? o.images;
    if (Array.isArray(album) && album.length > 0) {
      const urls: string[] = [];
      for (const item of album) {
        if (typeof item === "string" && /^https?:\/\//i.test(item.trim())) {
          urls.push(item.trim());
        } else if (isRecord(item)) {
          const u = pickTrimmedString(item, ["url", "src", "imageUrl", "image_url"]);
          if (u && /^https?:\/\//i.test(u)) urls.push(u);
        }
      }
      if (urls.length) {
        return {
          coverImage: urls[0] ?? "",
          galleryImages: urls.slice(1),
          groomPortraitImage: portraits.groomPortraitImage,
          bridePortraitImage: portraits.bridePortraitImage,
        };
      }
    }
  }
  return {
    coverImage: "",
    galleryImages: [],
    groomPortraitImage: portraits.groomPortraitImage,
    bridePortraitImage: portraits.bridePortraitImage,
  };
}

function camelToSnakeKey(key: string): string {
  return key.replace(/[A-Z]/g, (ch) => `_${ch.toLowerCase()}`);
}

/** Bổ sung trường tuỳ chỉnh slide-flex từ JSON (camelCase / snake_case). */
function overlaySlideFlexExtraFromCandidates(
  preview: PreviewData,
  candidates: Record<string, unknown>[],
) {
  for (const key of Object.keys(emptySlideFlexPreviewExtra) as (keyof typeof emptySlideFlexPreviewExtra)[]) {
    const v = firstPick(candidates, [key, camelToSnakeKey(key)]);
    if (v) (preview as Record<string, string>)[key] = v;
  }
}

function parsePersonalization(candidates: Record<string, unknown>[]): PublicInvitePersonalization | undefined {
  const greetingLine = firstPick(candidates, [
    "greetingLine",
    "greeting_line",
    "honorificLine",
    "honorific_line",
    "salutation",
    "greeting",
    "recipientLine",
    "recipient_line",
  ]);
  const recipientName = firstPick(candidates, [
    "recipientName",
    "recipient_name",
    "inviteeName",
    "invitee_name",
    "guestName",
    "guest_name",
    "toName",
    "to_name",
    "displayName",
    "display_name",
  ]);
  const note = firstPick(candidates, [
    "personalMessage",
    "personal_message",
    "message",
    "note",
    "notes",
    "memo",
  ]);

  if (!greetingLine && !recipientName && !note) return undefined;
  return { greetingLine: greetingLine || undefined, recipientName: recipientName || undefined, note: note || undefined };
}

/**
 * Map JSON `GET /invites/{code}` → payload preview + ảnh + tuỳ chọn khối cá nhân hoá.
 * Chấp nhận camelCase / snake_case và vài lớp bọc (`data`, `invitation`, …).
 */
export function parsePublicInviteBody(body: unknown): ParsedPublicInvite | null {
  const candidates = collectCandidateRecords(body);

  const templateSlug = firstPick(candidates, ["templateSlug", "template_slug", "slug", "template"]);
  const bride = firstPick(candidates, ["bride", "brideName", "bride_name"]);
  const groom = firstPick(candidates, ["groom", "groomName", "groom_name"]);
  const weddingDateRaw = firstPick(candidates, [
    "weddingDate",
    "wedding_date",
    "countdownTarget",
    "countdown_target",
    "eventDate",
    "eventDateIso",
    "event_date",
    "event_date_iso",
  ]);
  const venue = firstPick(candidates, ["venue", "venueDetail", "venue_detail", "venueName", "venue_name"]);
  const location = firstPick(candidates, ["location", "city", "place"]);
  const dateLabel = firstPick(candidates, ["dateLabel", "date_label", "eventDateLabel", "event_date_label"]);
  const ceremonyTime = firstPick(candidates, ["ceremonyTime", "ceremony_time"]);
  const partyTime = firstPick(candidates, ["partyTime", "party_time", "receptionTime", "reception_time"]);
  const bankName = firstPick(candidates, ["bankName", "bank_name", "bank"]);
  const accountName = firstPick(candidates, ["accountName", "account_name", "bankAccountName", "bank_account_name"]);
  const accountNumber = firstPick(candidates, ["accountNumber", "account_number", "bankAccountNumber", "bank_account_number"]);

  if (!templateSlug || !bride || !groom) return null;
  if (!weddingDateRaw) return null;

  const venueResolved = venue || location;
  if (!venueResolved) return null;

  const countdownTarget = isoToCountdownTarget(weddingDateRaw, ceremonyTime);
  if (!countdownTarget) return null;

  const dateLabelResolved =
    dateLabel || formatDateLabelVi(weddingDateRaw) || formatDateLabelVi(countdownTarget);
  const ceremonyResolved = ceremonyTime || countdownTarget.slice(11, 16) || "09:00";
  const partyResolved = partyTime || ceremonyResolved;

  const preview: PreviewData = {
    bride,
    groom,
    dateLabel: dateLabelResolved || "—",
    location: location || venueResolved,
    countdownTarget,
    ceremonyTime: ceremonyResolved,
    partyTime: partyResolved,
    venue: venueResolved,
    bankName: bankName || "—",
    accountName: accountName || "—",
    accountNumber: accountNumber || "—",
    ...emptySlideFlexPreviewExtra,
  };

  overlaySlideFlexExtraFromCandidates(preview, candidates);

  const images = collectImageUrls(candidates);
  const personalization = parsePersonalization(candidates);

  return {
    snapshot: { templateSlug, preview, images },
    personalization,
  };
}

export type FetchPublicInviteResult =
  | { ok: true; data: unknown }
  | { ok: false; status: number; reason: "not_found" | "upstream" | "network" | "no_api" | "empty_code" };

/** Gọi trực tiếp backend `GET /invites/{code}` (SSR / Route Handler). */
export async function fetchPublicInviteByCode(code: string): Promise<FetchPublicInviteResult> {
  const trimmed = code.trim();
  if (!trimmed) return { ok: false, status: 400, reason: "empty_code" };

  const base = getPublicApiBaseUrl();
  if (!base) return { ok: false, status: 503, reason: "no_api" };

  const url = `${base}/invites/${encodeURIComponent(trimmed)}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "omit",
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: 0, reason: "network" };
  }

  const text = await res.text();
  let data: unknown = null;
  if (text.trim()) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = null;
    }
  }

  if (res.status === 404) return { ok: false, status: 404, reason: "not_found" };
  if (!res.ok) return { ok: false, status: res.status, reason: "upstream" };
  return { ok: true, data };
}

/**
 * Một lần fetch + parse cho mỗi request (dùng chung `generateMetadata` và `page`).
 */
export const loadPublicInvitePageData = cache(async (code: string): Promise<LoadPublicInvitePageDataResult> => {
  const fetched = await fetchPublicInviteByCode(code);
  if (!fetched.ok) {
    if (fetched.reason === "not_found" || fetched.reason === "empty_code") return { kind: "not_found" };
    if (fetched.reason === "no_api") return { kind: "no_api" };
    if (fetched.reason === "network") return { kind: "network" };
    return { kind: "upstream", status: fetched.status };
  }
  const parsed = parsePublicInviteBody(fetched.data);
  if (!parsed) return { kind: "bad_body" };
  return { kind: "ok", parsed };
});
