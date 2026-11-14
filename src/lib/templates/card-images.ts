import type { WeddingTemplate } from "./types";

/**
 * Ảnh đại diện cho thẻ mẫu / banner / Top 3 — ảnh cưới phong cách Việt Nam.
 * Tách riêng khỏi `meta.image` vì preview bên trong từng mẫu thiệp vẫn dùng `meta.image`.
 * Nguồn: Pexels License & Unsplash License (miễn phí, dùng thương mại, không bắt buộc ghi nguồn).
 */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const cardImageBySlug: Record<string, string> = {
  // Premium
  "soft-serenity": unsplash("1793345241942-a680bdc00a8f"), // unsplash.com/photos/X8sQS0z88ig — áo dài đỏ, hoa tulip
  "gentle-drift": pexels(10568538), // áo dài vàng, cổng hoa
  "brightly-basic": pexels(38650033), // váy cưới & vest trắng, tiệc trong nhà (TP.HCM)
  "slide-flex": pexels(34481898), // áo dài đỏ dưới cổng hoa
  "timeless-love": pexels(13111923), // áo dài trước cổng đình cổ
  "radiant-bloom": pexels(27670876), // cô dâu áo dài đỏ, khăn vấn
  "ethereal-whisper": unsplash("1652494268816-8e3d0282cf2f"), // unsplash.com/photos/JGrpx4ZLY80 — voan cưới, tuxedo
  "midnight-bloom": unsplash("1793345243005-c90bd84dd471"), // unsplash.com/photos/WoMkXRSwRqQ — áo dài đỏ, phông hoa
  "retro-soul": pexels(9951899), // áo dài đỏ, pháo giấy trên phố
  "santorini-dream": pexels(32242313), // váy cưới trong hẻm phố
  // Miễn phí
  "gentle-harmony": pexels(34481895), // áo dài đỏ lễ vu quy
  "rustic-breeze": pexels(10568554), // rước dâu áo dài vàng
  "modern-pulse": pexels(38765155), // lễ gia tiên
  "noir-editorial": pexels(33793585), // cận cảnh áo dài & hoa cưới
  "serene-canvas": unsplash("1793345243093-b7b30c9473d1"), // unsplash.com/photos/TfCuH8rV9sQ — áo dài đỏ, cổng hoa
};

/**
 * Ảnh chụp toàn trang (khổ điện thoại) của trang demo — thẻ tự cuộn ảnh này.
 * Mẫu chưa có ảnh sẽ dùng ảnh tĩnh ở trên. Santorini Dream là dạng lật trang (không cuộn dọc) nên giữ ảnh tĩnh.
 * Khi chụp lại, đặt tên file mới (-v2, -v3…) để tránh Next.js dùng bản cache cũ.
 */
const scrollPreviewBySlug: Record<string, string> = {
  // Premium
  "soft-serenity": "/template-previews/soft-serenity-v3.jpg",
  "gentle-drift": "/template-previews/gentle-drift-v1.jpg",
  "brightly-basic": "/template-previews/brightly-basic-v2.jpg",
  "slide-flex": "/template-previews/slide-flex-v2.jpg",
  "timeless-love": "/template-previews/timeless-love-v1.jpg",
  "radiant-bloom": "/template-previews/radiant-bloom-v1.jpg",
  "ethereal-whisper": "/template-previews/ethereal-whisper-v1.jpg",
  "midnight-bloom": "/template-previews/midnight-bloom-v1.jpg",
  "retro-soul": "/template-previews/retro-soul-v1.jpg",
  // Miễn phí
  "gentle-harmony": "/template-previews/gentle-harmony-v1.jpg",
  "rustic-breeze": "/template-previews/rustic-breeze-v1.jpg",
  "modern-pulse": "/template-previews/modern-pulse-v1.jpg",
  "noir-editorial": "/template-previews/noir-editorial-v1.jpg",
  "serene-canvas": "/template-previews/serene-canvas-v1.jpg",
};

export function getTemplateScrollPreview(template: Pick<WeddingTemplate, "slug">): string | null {
  return scrollPreviewBySlug[template.slug] ?? null;
}

export function getTemplateCardImage(template: Pick<WeddingTemplate, "slug" | "image">): string {
  return cardImageBySlug[template.slug] ?? template.image;
}
