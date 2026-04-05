/** Thông tin liên hệ hiển thị ở footer — cập nhật khi có số/email chính thức. */
export const siteContact = {
  phoneDisplay: "090 712 78 90",
  phoneE164: "+84907127890",
  email: "hello@lumierewedding.vn",
} as const;

export const siteZaloUrl = `https://zalo.me/${siteContact.phoneE164.replace("+", "")}`;
