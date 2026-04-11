/** Giá trị enum từ backend Nest — giữ rộng để tương thích khi BE thêm giá trị. */
export type PaymentStatus = string;
export type UserPaymentProductType = string;
export type InvitationPublicationStatus = string;

export type UserPaymentListItemResponse = {
  id: number;
  paymentStatus: PaymentStatus;
  paymentType: UserPaymentProductType;
  thumbnailUrl: string | null;
  templateName: string;
  publicationStatus: InvitationPublicationStatus;
  updatedAt: string;
  eventTitle: string | null;
  eventDateIso: string | null;
  eventDateLabel: string | null;
  venueDetail: string | null;
  invitePath: string | null;
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

function parseItem(o: Record<string, unknown>): UserPaymentListItemResponse | null {
  const id = parseNumericId(o.id);
  if (id === null) return null;
  const templateName = pickTrimmedString(o, "templateName", "template_name");
  if (!templateName) return null;
  const updatedAt = pickTrimmedString(o, "updatedAt", "updated_at");
  if (!updatedAt) return null;

  const paymentStatus = asStringField(
    o.paymentStatus ?? o.payment_status ?? o.paymentStatusEnum,
  );
  const paymentType = asStringField(o.paymentType ?? o.payment_type ?? o.productType);
  const publicationStatus = asStringField(
    o.publicationStatus ?? o.publication_status ?? o.invitationPublicationStatus,
  );

  return {
    id,
    paymentStatus: paymentStatus || "unknown",
    paymentType: paymentType || "unknown",
    thumbnailUrl:
      asNullableString(o.thumbnailUrl) ??
      asNullableString(o.thumbnail_url) ??
      asNullableString(o.previewImageUrl),
    templateName,
    publicationStatus: publicationStatus || "unknown",
    updatedAt,
    eventTitle: asNullableString(o.eventTitle) ?? asNullableString(o.event_title),
    eventDateIso: asNullableString(o.eventDateIso) ?? asNullableString(o.event_date_iso),
    eventDateLabel: asNullableString(o.eventDateLabel) ?? asNullableString(o.event_date_label),
    venueDetail: asNullableString(o.venueDetail) ?? asNullableString(o.venue_detail),
    invitePath: asNullableString(o.invitePath) ?? asNullableString(o.invite_path),
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
