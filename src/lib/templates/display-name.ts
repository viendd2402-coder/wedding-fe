import { freeTemplates, premiumTemplates } from "@/templates/template-registry";
import type { WeddingTemplate } from "./types";

type DisplayLanguage = "vi" | "en";

/**
 * Số thứ tự trong nhóm (miễn phí / trả phí), theo thứ tự đăng ký ở template-registry.
 * Lưu ý: thêm mẫu mới nên đặt CUỐI danh sách để số của các mẫu cũ không bị đổi.
 */
export function getTemplateNumber(template: Pick<WeddingTemplate, "slug" | "tier">): string {
  const list = template.tier === "Trả phí" ? premiumTemplates : freeTemplates;
  const index = list.findIndex((t) => t.slug === template.slug);
  return String(index >= 0 ? index + 1 : 0).padStart(2, "0");
}

/**
 * Slug công khai trên URL, khớp tên hiển thị: `mau-premium-so-01` / `mau-mien-phi-so-01`.
 * `template.slug` (vd. `soft-serenity`) vẫn là khoá nội bộ cho API, thanh toán, dữ liệu đã lưu.
 */
export function getTemplatePublicSlug(template: Pick<WeddingTemplate, "slug" | "tier">): string {
  const n = getTemplateNumber(template);
  return template.tier === "Trả phí" ? `mau-premium-so-${n}` : `mau-mien-phi-so-${n}`;
}

/** Link tới trang demo của mẫu (dùng slug công khai). */
export function getTemplateHref(template: Pick<WeddingTemplate, "slug" | "tier">): string {
  return `/templates/${getTemplatePublicSlug(template)}`;
}

/**
 * Nhận slug từ URL (công khai hoặc slug cũ) → slug nội bộ.
 * `legacy: true` khi URL dùng slug cũ — trang demo sẽ chuyển hướng sang slug công khai.
 */
export function resolveTemplateSlug(param: string): { slug: string; legacy: boolean } | null {
  const key = decodeURIComponent(param).trim().toLowerCase();
  const all = [...premiumTemplates, ...freeTemplates];
  const byPublic = all.find((t) => getTemplatePublicSlug(t) === key);
  if (byPublic) return { slug: byPublic.slug, legacy: false };
  const byInternal = all.find((t) => t.slug === key);
  if (byInternal) return { slug: byInternal.slug, legacy: true };
  return null;
}

/** Tên hiển thị cho khách: "Mẫu miễn phí số 01" / "Mẫu Premium số 01". */
export function getTemplateDisplayName(
  template: Pick<WeddingTemplate, "slug" | "tier">,
  language: DisplayLanguage = "vi",
): string {
  const n = getTemplateNumber(template);
  const premium = template.tier === "Trả phí";
  if (language === "en") {
    return premium ? `Premium template No. ${n}` : `Free template No. ${n}`;
  }
  return premium ? `Mẫu Premium số ${n}` : `Mẫu miễn phí số ${n}`;
}
