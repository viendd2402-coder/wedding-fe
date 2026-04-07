/** Giới hạn khớp CreateReportDto.phone @MaxLength(20) */
export const CONTACT_PHONE_MAX_LENGTH = 20;

/**
 * Chuẩn hoá về dạng bắt đầu bằng 0 (mobile VN) khi nhập +84 / 84.
 */
export function normalizeVietnamPhoneInput(raw: string): string {
  let s = raw.trim().replace(/[\s.\-()]/g, "");
  if (s.startsWith("+84")) return `0${s.slice(3)}`;
  if (s.startsWith("84") && s.length >= 10) return `0${s.slice(2)}`;
  return s;
}

/**
 * Số điện thoại liên hệ: mobile VN (03/05/07/08/09 + 8 số) hoặc E.164 quốc tế (+ + mã nước).
 */
export function isValidContactPhone(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  const compact = trimmed.replace(/[\s.\-()]/g, "");
  if (compact.length > CONTACT_PHONE_MAX_LENGTH) return false;

  const vn = normalizeVietnamPhoneInput(trimmed);
  if (/^0(3|5|7|8|9)\d{8}$/.test(vn)) return true;

  if (/^\+[1-9]\d{7,14}$/.test(compact)) return true;

  return false;
}

/** Chuỗi gửi API: mobile VN đã chuẩn 0…; quốc tế giữ dạng compact. */
export function formatPhoneForApi(raw: string): string {
  const trimmed = raw.trim();
  const vn = normalizeVietnamPhoneInput(trimmed);
  if (/^0(3|5|7|8|9)\d{8}$/.test(vn)) return vn;
  return trimmed.replace(/[\s.\-()]/g, "");
}
