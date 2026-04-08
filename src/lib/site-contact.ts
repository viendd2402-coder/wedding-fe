/** Thông tin liên hệ hiển thị ở footer — cập nhật khi có số/email chính thức. */
export const siteContact = {
  phoneDisplay: "0329 161 198",
  phoneE164: "+84329161198",
  email: "hello@lumierewedding.vn",
  /** TikTok mặc định (nút nổi). Để `""` nếu chưa có kênh. `NEXT_PUBLIC_TIKTOK_URL` ghi đè khi có. */
  tiktokUrl: "https://www.tiktok.com/@lumierewedding",
  /** Dòng phụ dưới nhãn TikTok ở footer (đổi khi đổi @). */
  tiktokDisplay: "@lumierewedding",
} as const;

export const siteZaloUrl = `https://zalo.me/${siteContact.phoneE164.replace("+", "")}`;

export const sitePhoneTel = `tel:${siteContact.phoneE164}`;

const tiktokFromEnv = (process.env.NEXT_PUBLIC_TIKTOK_URL ?? "").trim();

/** Ưu tiên env; không có env thì dùng `siteContact.tiktokUrl` (rỗng = ẩn nút TikTok). */
export const siteTiktokUrl = tiktokFromEnv || siteContact.tiktokUrl.trim();
