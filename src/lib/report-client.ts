import { extractApiErrorMessage, fetchPublicApi } from "@/lib/api-fetch";
import {
  CONTACT_PHONE_MAX_LENGTH,
  formatPhoneForApi,
  isValidContactPhone,
} from "@/lib/phone";

/** Khớp CreateReportDto (NestJS class-validator). */
export const REPORT_FULL_NAME_MAX = 100;
export const REPORT_PHONE_MAX = CONTACT_PHONE_MAX_LENGTH;
export const REPORT_DESCRIPTION_MAX = 3000;

export type CreateReportPayload = {
  fullName: string;
  phone: string;
  type: number;
  description?: string;
};

export type ReportFieldKey = keyof CreateReportPayload;

export type ReportFieldErrors = Partial<Record<ReportFieldKey, string>>;

/**
 * Validate phía FE — cùng giới hạn với CreateReportDto.
 * `type`: số nguyên ≥ 1 (form dùng 1 | 2 | 3 theo từng lựa chọn).
 */
export function validateCreateReportInput(input: {
  fullName: string;
  phone: string;
  type: number | "";
  description: string;
}): { ok: true; payload: CreateReportPayload } | { ok: false; errors: ReportFieldErrors } {
  const errors: ReportFieldErrors = {};
  const fullName = input.fullName.trim();
  const phoneRaw = input.phone.trim();
  const description = input.description.trim();

  if (!fullName) {
    errors.fullName = "__FULL_NAME_REQUIRED__";
  } else if (fullName.length > REPORT_FULL_NAME_MAX) {
    errors.fullName = "__FULL_NAME_MAX__";
  }

  if (!phoneRaw) {
    errors.phone = "__PHONE_REQUIRED__";
  } else if (phoneRaw.replace(/[\s.\-()]/g, "").length > REPORT_PHONE_MAX) {
    errors.phone = "__PHONE_MAX__";
  } else if (!isValidContactPhone(phoneRaw)) {
    errors.phone = "__PHONE_INVALID__";
  }

  const typeNum = input.type === "" ? NaN : Number(input.type);
  if (!Number.isInteger(typeNum) || typeNum < 1) {
    errors.type = "__TYPE_REQUIRED__";
  }

  if (description.length > REPORT_DESCRIPTION_MAX) {
    errors.description = "__DESCRIPTION_MAX__";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const payload: CreateReportPayload = {
    fullName,
    phone: formatPhoneForApi(phoneRaw),
    type: typeNum,
  };
  if (description.length > 0) {
    payload.description = description;
  }
  return { ok: true, payload };
}

export type SubmitReportResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

/** POST `{NEXT_PUBLIC_API_URL}/reports` — public, không bắt buộc cookie. */
export async function submitReportRequest(payload: CreateReportPayload): Promise<SubmitReportResult> {
  const body: Record<string, unknown> = {
    fullName: payload.fullName,
    phone: payload.phone,
    type: payload.type,
  };
  if (payload.description != null && payload.description.length > 0) {
    body.description = payload.description;
  }

  const r = await fetchPublicApi("reports", { method: "POST", json: body });

  if (!r.ok) {
    if (r.networkError) {
      return { ok: false, status: 0, message: "__NETWORK__" };
    }
    if (r.status === 0) {
      return { ok: false, status: 0, message: "__MISSING_API__" };
    }
    return {
      ok: false,
      status: r.status,
      message: extractApiErrorMessage(r.data, `Request failed (${r.status})`),
    };
  }

  return { ok: true };
}
