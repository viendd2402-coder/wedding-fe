import type { WeddingTemplate } from "@/lib/templates/types";

export const minimalMuseTemplate: WeddingTemplate = {
  slug: "minimal-muse",
  name: "Minimal Muse",
  style: "Tối giản hiện đại",
  tier: "Miễn phí",
  family: "minimal",
  mood: "minimal",
  badge: "Dễ bắt đầu",
  description:
    "Tông màu kem, typography thanh lịch, phù hợp các cặp đôi thích giao diện tinh gọn.",
  image:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2400&q=92",
  accent: "#7d8c79",
  heroTitle: "Một website cưới tinh gọn với màu sắc dịu nhẹ và bố cục thanh lịch.",
  heroSubtitle:
    "Mẫu miễn phí để bạn cho khách xem nhanh một website cưới gọn gàng, đẹp và dễ sử dụng trên mobile.",
  previewLabel: "Tinh gọn, sáng và dễ gửi",
  sectionProfile: "6-8 section cốt lõi, dễ setup, phù hợp gửi nhanh cho khách mời.",
  countdownVariant: "minimal",
  sections: [
    "Hero với ảnh cưới lớn",
    "Thiệp mời kỹ thuật số",
    "Lịch cưới & đếm ngược",
    "Timeline câu chuyện cơ bản",
    "Thông tin lịch cưới",
    "Google Maps",
    "RSVP form",
    "Footer tinh gọn",
  ],
};
