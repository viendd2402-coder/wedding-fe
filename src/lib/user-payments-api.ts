/** Giá trị enum từ backend Nest — giữ rộng để tương thích khi BE thêm giá trị. */
export type PaymentStatus = string;
export type UserPaymentProductType = string;
export type InvitationPublicationStatus = string;

export type UserPaymentListItemResponse = {
  id: number;
  paymentStatus: PaymentStatus;
  paymentType: UserPaymentProductType;
  thumbnailUrl: string | null;
  /**
   * Ảnh đại diện từ `payment-invitation-detail.thumbnailImage` (nếu BE trả tách khỏi `thumbnailUrl`).
   */
  thumbnailImage: string | null;
  /** JSON từ `payment-invitation-detail.details` (object hoặc đã parse từ chuỗi). */
  details: unknown | null;
  templateName: string;
  /** Slug mẫu thiệp (vd. gentle-drift) — dùng link `/templates/[slug]`. */
  templateSlug: string | null;
  publicationStatus: InvitationPublicationStatus;
  updatedAt: string;
  /** Thời điểm tạo đơn / link — dùng cộng 15 phút khi không có `checkoutUrlExpireAt`. */
  createdAt: string | null;
  /** Hết hạn link cổng thanh toán (ISO) — ưu tiên so với thời gian hiện tại. */
  checkoutUrlExpireAt: string | null;
  eventTitle: string | null;
  eventDateIso: string | null;
  eventDateLabel: string | null;
  venueDetail: string | null;
  invitePath: string | null;
  checkoutUrl: string | null;
};

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function asNullableString(x: unknown): string | null {
  if (x === null || x === undefined) return null;
  if (typeof x === "string") return x;
  return null;
}

/** Chuỗi hoá enum/ID từ JSON (Nest có thể trả number cho enum). */
function asStringField(x: unknown): string {
  if (x === null || x === undefined) return "";
  if (typeof x === "string") return x;
  if (typeof x === "number" && Number.isFinite(x)) return String(x);
  if (typeof x === "boolean") return x ? "true" : "false";
  if (typeof x === "bigint") return x.toString();
  return "";
}

function parseNumericId(x: unknown): number | null {
  if (typeof x === "number" && Number.isFinite(x)) return x;
  if (typeof x === "string") {
    const t = x.trim();
    if (!t) return null;
    const n = Number(t);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

function pickTrimmedString(o: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}

/** Cột `templateSlug` hoặc slug lồng trong `template` / `invitation` (Nest thường serialize quan hệ). */
function pickTemplateSlug(o: Record<string, unknown>): string | null {
  const direct = pickTrimmedString(
    o,
    "templateSlug",
    "template_slug",
    "inviteTemplateSlug",
    "invite_template_slug",
  );
  if (direct) return direct;

  const template = o.template;
  if (isRecord(template)) {
    const nested = pickTrimmedString(
      template,
      "slug",
      "templateSlug",
      "template_slug",
    );
    if (nested) return nested;
  }

  const invitation = o.invitation;
  if (isRecord(invitation)) {
    const nested = pickTrimmedString(
      invitation,
      "templateSlug",
      "template_slug",
      "slug",
    );
    if (nested) return nested;
    const invTemplate = invitation.template;
    if (isRecord(invTemplate)) {
      const fromInvTpl = pickTrimmedString(
        invTemplate,
        "slug",
        "templateSlug",
        "template_slug",
      );
      if (fromInvTpl) return fromInvTpl;
    }
  }

  return null;
}

/** Khối `payment-invitation-detail` phẳng hoặc lồng trong `invitation`. */
function pickPaymentInvitationDetail(o: Record<string, unknown>): Record<string, unknown> | null {
  const direct = o.paymentInvitationDetail ?? o.payment_invitation_detail;
  if (isRecord(direct)) return direct;

  const invitation = o.invitation;
  if (isRecord(invitation)) {
    const nested = invitation.paymentInvitationDetail ?? invitation.payment_invitation_detail;
    if (isRecord(nested)) return nested;
  }

  return null;
}

function parseDetailsFromApi(raw: unknown): unknown | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return null;
    try {
      return JSON.parse(t) as unknown;
    } catch {
      return null;
    }
  }
  return raw;
}

function parseItem(o: Record<string, unknown>): UserPaymentListItemResponse | null {
  const id = parseNumericId(o.id);
  if (id === null) return null;
  const templateName = pickTrimmedString(o, "templateName", "template_name");
  if (!templateName) return null;
  const templateSlug = pickTemplateSlug(o);
  const updatedAt = pickTrimmedString(o, "updatedAt", "updated_at");
  if (!updatedAt) return null;

  const createdAtRaw = pickTrimmedString(o, "createdAt", "created_at");
  const createdAtNorm = createdAtRaw || null;

  const checkoutUrlExpireAtRaw = pickTrimmedString(
    o,
    "checkoutUrlExpireAt",
    "checkout_url_expire_at",
    "checkoutUrlExprireAt",
    "checkout_url_exprire_at",
  );
  const checkoutUrlExpireAt = checkoutUrlExpireAtRaw || null;

  const paymentStatus = asStringField(
    o.paymentStatus ?? o.payment_status ?? o.paymentStatusEnum,
  );
  const paymentType = asStringField(o.paymentType ?? o.payment_type ?? o.productType);
  const publicationStatus = asStringField(
    o.publicationStatus ?? o.publication_status ?? o.invitationPublicationStatus,
  );

  const invitationDetail = pickPaymentInvitationDetail(o);
  const detailsFromDetail = invitationDetail
    ? parseDetailsFromApi(invitationDetail.details ?? invitationDetail.detail)
    : null;
  const detailsTop = parseDetailsFromApi(o.details ?? o.detail);
  const details = detailsFromDetail ?? detailsTop;

  const thumbnailImageFromDetail = invitationDetail
    ? asNullableString(invitationDetail.thumbnailImage) ??
      asNullableString(invitationDetail.thumbnail_image)
    : null;
  const thumbnailImageTop =
    asNullableString(o.thumbnailImage) ?? asNullableString(o.thumbnail_image);
  const thumbnailImage = thumbnailImageFromDetail ?? thumbnailImageTop ?? null;

  return {
    id,
    paymentStatus: paymentStatus || "unknown",
    paymentType: paymentType || "unknown",
    thumbnailUrl:
      asNullableString(o.thumbnailUrl) ??
      asNullableString(o.thumbnail_url) ??
      asNullableString(o.previewImageUrl) ??
      thumbnailImage,
    thumbnailImage,
    details,
    templateName,
    templateSlug: templateSlug ?? null,
    publicationStatus: publicationStatus || "unknown",
    updatedAt,
    createdAt: createdAtNorm,
    checkoutUrlExpireAt,
    eventTitle: asNullableString(o.eventTitle) ?? asNullableString(o.event_title),
    eventDateIso: asNullableString(o.eventDateIso) ?? asNullableString(o.event_date_iso),
    eventDateLabel: asNullableString(o.eventDateLabel) ?? asNullableString(o.event_date_label),
    venueDetail: asNullableString(o.venueDetail) ?? asNullableString(o.venue_detail),
    invitePath: asNullableString(o.invitePath) ?? asNullableString(o.invite_path),
    checkoutUrl:
      asNullableString(o.checkoutUrl) ??
      asNullableString(o.checkout_url) ??
      asNullableString(o.paymentUrl) ??
      asNullableString(o.payment_url) ??
      asNullableString(o.vnpUrl) ??
      asNullableString(o.vnp_url),
  };
}

function firstArrayInRecord(r: Record<string, unknown>): unknown[] | null {
  const keys = [
    "data",
    "items",
    "payments",
    "results",
    "result",
    "list",
    "content",
    "rows",
    "records",
    "invitations",
    "value",
    "payload",
    "body",
  ] as const;
  for (const k of keys) {
    const v = r[k];
    if (Array.isArray(v)) return v;
  }
  /** `{ data: { items: [...] } }` hoặc tương tự */
  const data = r.data;
  if (isRecord(data)) {
    for (const k of keys) {
      const v = data[k];
      if (Array.isArray(v)) return v;
    }
  }
  return null;
}

/** Tìm mảng đầu tiên lồng tối đa vài cấp (BE bọc `{ meta, response: { rows } }` v.v.). */
function findFirstNestedArray(x: unknown, maxDepth: number): unknown[] | null {
  if (maxDepth < 0) return null;
  if (Array.isArray(x)) return x;
  if (!isRecord(x)) return null;
  for (const v of Object.values(x)) {
    const found = findFirstNestedArray(v, maxDepth - 1);
    if (found) return found;
  }
  return null;
}

/**
 * Chuẩn hoá JSON từ `GET /api/payments` (mảng thuần hoặc bọc trong object phổ biến).
 */
export function parseUserPaymentsListResponse(raw: unknown): UserPaymentListItemResponse[] | null {
  let rows: unknown[] | null = null;
  if (Array.isArray(raw)) {
    rows = raw;
  } else if (isRecord(raw)) {
    rows = firstArrayInRecord(raw);
    if (!rows) {
      rows = findFirstNestedArray(raw, 5);
    }
    if (!rows && Object.keys(raw).length === 0) {
      rows = [];
    }
  } else {
    return null;
  }

  if (!rows) return null;

  const out: UserPaymentListItemResponse[] = [];
  for (const row of rows) {
    if (!isRecord(row)) continue;
    const parsed = parseItem(row);
    if (parsed) out.push(parsed);
  }
  return out;
}

export function isPublishedInvitationStatus(status: InvitationPublicationStatus): boolean {
  const s = status.trim().toUpperCase();
  return s === "PUBLISHED" || s === "PUBLISH" || s.endsWith("PUBLISHED");
}

export function isPremiumPaymentProductType(t: UserPaymentProductType): boolean {
  const u = t.trim().toUpperCase();
  return u.includes("PREMIUM") || u.includes("PAID") || u.includes("TRẢ PHÍ") || u.includes("TRẢ_PHÍ");
}

/** Trạng thái đã thanh toán thành công (chuỗi enum từ Nest / cổng thanh toán). */
export function isSuccessfulPaymentStatus(status: PaymentStatus): boolean {
  const s = status.trim().toUpperCase();
  if (!s || s === "UNKNOWN") return false;
  const terminalFail = ["FAILED", "CANCELLED", "CANCELED", "REFUNDED", "EXPIRED", "DECLINED", "VOID"];
  if (terminalFail.some((x) => s.includes(x))) return false;
  const paid = new Set([
    "PAID",
    "COMPLETED",
    "SUCCESS",
    "SUCCEEDED",
    "SETTLED",
    "CAPTURED",
    "DONE",
    "CONFIRMED",
  ]);
  if (paid.has(s)) return true;
  if (s.includes("UNPAID") || s.includes("NOT_PAID") || s === "NOTPAID") return false;
  if (/_PAID$/u.test(s) || /_COMPLETED$/u.test(s) || /_SUCCESS$/u.test(s)) return true;
  return false;
}

/** Có link thanh toán còn dùng được và chưa ghi nhận trạng thái thành công. */
export function shouldOfferCheckoutResume(item: UserPaymentListItemResponse): boolean {
  const url = item.checkoutUrl?.trim();
  if (!url) return false;
  return !isSuccessfulPaymentStatus(item.paymentStatus);
}

const CHECKOUT_RESUME_GRACE_MS = 15 * 60 * 1000;

function parseInstant(iso: string | null | undefined): number | null {
  if (!iso?.trim()) return null;
  const t = Date.parse(iso.trim());
  return Number.isNaN(t) ? null : t;
}

/**
 * Link thanh toán coi là hết hạn khi đã qua **mốc sớm nhất** trong các mốc sau (mỗi mốc chỉ tính nếu parse được):
 * - `createdAt` + 15 phút;
 * - `checkoutUrlExpireAt` (hạn từ cổng / BE).
 *
 * Không có mốc nào hợp lệ → chưa hết hạn (vẫn cho phép nút thanh toán nếu có URL).
 */
export function isPaymentCheckoutOfferExpired(
  item: UserPaymentListItemResponse,
  nowMs: number = Date.now(),
): boolean {
  const deadlines: number[] = [];
  const created = parseInstant(item.createdAt);
  if (created !== null) {
    deadlines.push(created + CHECKOUT_RESUME_GRACE_MS);
  }
  const expireAt = parseInstant(item.checkoutUrlExpireAt);
  if (expireAt !== null) {
    deadlines.push(expireAt);
  }
  if (!deadlines.length) return false;
  return nowMs >= Math.min(...deadlines);
}
