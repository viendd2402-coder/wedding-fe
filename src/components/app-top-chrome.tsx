"use client";

import { usePathname } from "next/navigation";
import GlobalDashboardControls from "@/components/global-dashboard-controls";

/** Ẩn nav studio trên trang xem thiệp (demo / detail) để preview full đầu trang. */
export default function AppTopChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/templates")) {
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
