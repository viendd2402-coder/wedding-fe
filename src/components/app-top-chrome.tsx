"use client";

import { usePathname } from "next/navigation";
import GlobalDashboardControls from "@/components/global-dashboard-controls";
import { resolveTemplateSlug } from "@/lib/templates";

function pathnameIsTemplateDemo(pathname: string | null): boolean {
  if (!pathname?.startsWith("/templates/")) return false;
  const slug = pathname.slice("/templates/".length).split("/")[0];
  if (!slug) return false;
  return resolveTemplateSlug(slug) !== null;
}

/** Thiệp xem bản lưu (không phải studio chỉnh mẫu). */
function pathnameIsInviteSnapshot(pathname: string | null): boolean {
  return Boolean(pathname?.startsWith("/invite/"));
}

/** Ẩn nav studio trên trang xem demo từng mẫu; giữ nav ở các trang như /templates/free. */
export default function AppTopChrome() {
  const pathname = usePathname();
  if (pathnameIsTemplateDemo(pathname) || pathnameIsInviteSnapshot(pathname)) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-[70] border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--background)_82%,transparent)] pt-[env(safe-area-inset-top)] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] backdrop-blur-xl backdrop-saturate-150 sm:pl-6 sm:pr-6 lg:px-10"
      role="banner"
    >
      <div className="mx-auto w-full max-w-[88rem]">
        <GlobalDashboardControls />
      </div>
    </header>
  );
}
