/**
 * Thứ tự slug theo mức độ được chọn (cao → thấp), dùng cho hero “top templates”.
 * Khi có API/backend thống kê, thay bằng dữ liệu thật và giữ thứ tự động sort theo `usageCount`.
 */
export const TOP_TEMPLATE_SLUGS_BY_USAGE = [
  "brightly-basic",
  "slide-flex",
  "minimal-muse",
  "azure-promise",
] as const;

export const TOP_TEMPLATE_SPOTLIGHT_LIMIT = 4;
