"use client";

import { usePathname } from "next/navigation";
import { ContactDock } from "@/components/contact-dock";
import { isTemplateDetailPath } from "@/lib/is-template-detail-path";

/**
 * z-40 — thấp hơn panel xem thử / nút mở form (z-50) trên trang chi tiết mẫu:
 * khi form mở thì dock nằm phía dưới panel; khi thu gọn form mới thấy icon.
 * Trên trang mẫu đặt dock cao hơn mép đáy để không bị nút tròn z-50 che.
 */
export default function FloatingContactRail() {
  const pathname = usePathname();
  const onTemplateDetail = isTemplateDetailPath(pathname);

  return (
    <div
      className={`pointer-events-none fixed z-40 flex flex-col items-end ${
        onTemplateDetail
          ? "bottom-[5.5rem] right-3 sm:bottom-[6rem] sm:right-4"
          : "bottom-4 right-4 sm:bottom-6 sm:right-5"
      }`}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="pointer-events-auto">
        <ContactDock orientation="vertical" />
      </div>
    </div>
  );
}
