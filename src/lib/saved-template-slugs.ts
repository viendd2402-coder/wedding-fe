/** Lưu slug mẫu thiệp trên trình duyệt (không cần đăng nhập). */

export const SAVED_TEMPLATE_SLUGS_STORAGE_KEY = "lumiere-saved-template-slugs-v1";

export const SAVED_TEMPLATES_CHANGE_EVENT = "lumiere-saved-templates-change";

/** Tham chiếu cố định cho danh sách rỗng — dùng với `useSyncExternalStore` (so sánh `Object.is`). */
export const SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT: string[] = [];

let snapshotCacheRaw: string | undefined;
let snapshotCacheList: string[] = SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT;

/**
 * Đọc slug đã lưu với cache theo chuỗi raw trong localStorage,
 * tránh trả về mảng mới mỗi lần gọi khi dữ liệu không đổi.
 */
export function getSavedTemplateSlugsSnapshot(): string[] {
  if (typeof window === "undefined") {
    return SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT;
  }
  const raw = window.localStorage.getItem(SAVED_TEMPLATE_SLUGS_STORAGE_KEY);
  const rawKey = raw === null ? "" : raw;
  if (snapshotCacheRaw === rawKey) {
    return snapshotCacheList;
  }
  snapshotCacheRaw = rawKey;
  const parsed = parseStored(raw);
  snapshotCacheList =
    parsed.length === 0 ? SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT : parsed;
  return snapshotCacheList;
}

function parseStored(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw) as unknown;
    if (!Array.isArray(v)) return [];
    return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0).map((s) => s.trim());
  } catch {
    return [];
  }
}

export function readSavedTemplateSlugsFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  return getSavedTemplateSlugsSnapshot();
}

function writeSlugs(slugs: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_TEMPLATE_SLUGS_STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(SAVED_TEMPLATES_CHANGE_EVENT));
}

export function getSavedTemplateSlugs(): string[] {
  return readSavedTemplateSlugsFromStorage();
}

export function isTemplateSlugSaved(slug: string): boolean {
  const s = slug.trim();
  if (!s) return false;
  return readSavedTemplateSlugsFromStorage().includes(s);
}

/** Thêm lên đầu danh sách; không trùng slug. */
export function addSavedTemplateSlug(slug: string): void {
  const s = slug.trim();
  if (!s) return;
  const current = readSavedTemplateSlugsFromStorage();
  const next = [s, ...current.filter((x) => x !== s)];
  writeSlugs(next);
}

export function removeSavedTemplateSlug(slug: string): void {
  const s = slug.trim();
  if (!s) return;
  const next = readSavedTemplateSlugsFromStorage().filter((x) => x !== s);
  writeSlugs(next);
}
