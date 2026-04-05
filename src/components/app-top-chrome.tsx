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

/** Ẩn nav studio trên trang xem demo từng mẫu; giữ nav ở các trang như /templates/free. */
export default function AppTopChrome() {
  const pathname = usePathname();
  if (pathnameIsTemplateDemo(pathname)) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[70] p-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <GlobalDashboardControls />
      </div>
    </div>
  );
}
