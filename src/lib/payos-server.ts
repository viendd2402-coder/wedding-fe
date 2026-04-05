import { PayOS } from "@payos/node";

/** Giá gói Premium (VND) — khớp bảng giá trên trang chủ. */
export const PREMIUM_AMOUNT_VND = 1;

/** Mô tả đơn hàng (một số kênh giới hạn 9 ký tự — giữ ngắn). */
export const PAYOS_PREMIUM_DESCRIPTION = "Premium";

export function createPayOSClient(): PayOS | null {
  const clientId = process.env.PAYOS_CLIENT_ID;
  const apiKey = process.env.PAYOS_API_KEY;
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
  if (!clientId?.trim() || !apiKey?.trim() || !checksumKey?.trim()) {
    return null;
  }
  return new PayOS({ clientId, apiKey, checksumKey });
}

/** URL gốc của app (redirect sau thanh toán). Ưu tiên NEXT_PUBLIC_APP_URL. */
export function appBaseUrlFromRequest(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  return host ? `${proto}://${host}` : "http://localhost:3000";
}
