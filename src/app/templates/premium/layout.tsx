import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mẫu trả phí | Lumiere Wedding Websites",
  description:
    "Danh sách mẫu website cưới cao cấp — xem demo đầy đủ và tham khảo bảng giá khi sẵn sàng.",
};

export default function PremiumTemplatesLayout({ children }: { children: ReactNode }) {
  return children;
}
