"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { forceDocumentScrollTop } from "@/lib/force-document-scroll-top";

/** Chạy sớm trong segment /templates/* (trước preview) để không giữ scroll từ trang trước. */
export default function TemplatesRouteScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    forceDocumentScrollTop();
  }, [pathname]);

  return null;
}
