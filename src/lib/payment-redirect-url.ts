/**
 * Lấy URL chuyển hướng VNPay / cổng thanh toán từ body JSON backend (tên field có thể khác nhau).
 */
export function extractPaymentRedirectUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const keys = ["paymentUrl", "checkoutUrl", "url", "vnpUrl", "paymentLink"] as const;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && /^https?:\/\//i.test(v.trim())) return v.trim();
  }
  const inner = o.data;
  if (inner && typeof inner === "object") {
    return extractPaymentRedirectUrl(inner);
  }
  return null;
}
