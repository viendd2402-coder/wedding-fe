function sanitizeAuthPath(path: string | null | undefined): string {
  const raw = (path ?? "").trim();
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export type AppRouterLike = {
  replace: (href: string) => void;
  /** Tuỳ chọn — sau `replace` gọi `refresh` có thể gây race (vẫn refetch cây RSC của route cũ). */
  refresh?: () => void;
};

/**
 * SPA sau đăng nhập: chỉ `replace` đồng bộ (không `startTransition` / `queueMicrotask`).
 * Session nằm ở client (localStorage / cookie qua fetch) — trang đích là client component thì không cần `refresh` ngay.
 */
export function navigateAfterLoginSpa(router: AppRouterLike, path?: string | null): void {
  router.replace(sanitizeAuthPath(path));
}
