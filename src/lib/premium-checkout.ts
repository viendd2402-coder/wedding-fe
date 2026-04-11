/** Giá gói Premium (VND) — khớp bảng giá / CTA trên site. Phải ≥ 1000 theo API thanh toán. */
export const PREMIUM_AMOUNT_VND = 2_490_000;

/**
 * Nội dung đơn gửi VNPay (thường map `vnp_OrderInfo`).
 * Giữ ASCII + dấu gạch thường để tránh lệch checksum khi VNPay encode URL và backend decode/verify.
 */
export function buildPremiumPaymentDescription(templateName: string, slug: string): string {
  const safeSlug = slug.replace(/[^\w-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  const asciiLabel = templateName
    .replace(/[\u2013\u2014\u2212]/g, "-") // en dash, em dash, minus → ASCII hyphen
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const label = asciiLabel.length > 0 ? asciiLabel : safeSlug;
  const line = `Lumiere Premium - Template: ${label} - Slug: ${safeSlug}`;
  return line.length <= 255 ? line : line.slice(0, 255);
}
