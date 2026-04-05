/**
 * Đưa viewport về 0 ngay lập tức. Tạm tắt scroll-behavior trên html/body vì class `scroll-smooth`
 * khiến scrollTo có thể animate từ vị trí cũ (vd. giữa dashboard) thay vì nhảy thẳng đầu trang.
 */
export function forceDocumentScrollTop(): void {
  if (typeof window === "undefined") return;
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  try {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  } catch {
    window.scrollTo(0, 0);
  }
  html.scrollTop = 0;
  body.scrollTop = 0;
  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
}
