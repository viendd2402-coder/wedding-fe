/** Trang chi tiết / xem thử một mẫu: `/templates/{slug}`, không gồm `/templates/free` hay `/templates/premium`. */
export function isTemplateDetailPath(pathname: string | null | undefined): boolean {
  if (!pathname?.startsWith("/templates/")) return false;
  const slug = pathname.slice("/templates/".length).split(/[/?#]/)[0];
  if (!slug || slug === "free" || slug === "premium") return false;
  return true;
}
