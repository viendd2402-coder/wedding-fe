import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mẫu miễn phí | Lumiere Wedding Websites",
  description:
    "Danh sách mẫu website cưới miễn phí — xem demo đầy đủ và chọn phong cách phù hợp.",
};

export default function FreeTemplatesLayout({ children }: { children: ReactNode }) {
  return children;
}
