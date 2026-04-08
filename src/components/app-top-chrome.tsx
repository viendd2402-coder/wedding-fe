"use client";

import { usePathname } from "next/navigation";
import GlobalDashboardControls from "@/components/global-dashboard-controls";
import { weddingTemplates } from "@/lib/templates";

const templateDemoSlugs = new Set(weddingTemplates.map((t) => t.slug));

function pathnameIsTemplateDemo(pathname: string | null): boolean {
  if (!pathname?.startsWith("/templates/")) return false;
  const slug = pathname.slice("/templates/".length).split("/")[0];
  if (!slug) return false;
  return templateDemoSlugs.has(slug);
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
      className="sticky top-0 z-[70] pt-[max(0.65rem,env(safe-area-inset-top))] pb-2 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:pb-3 sm:pl-6 sm:pr-6 lg:px-8"
      role="banner"
    >
      <div className="mx-auto w-full max-w-7xl">
        <GlobalDashboardControls />
      </div>
    </header>
  );
}
