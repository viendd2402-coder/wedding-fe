import type { WeddingTemplate } from "@/lib/templates/types";

export const brightlyBasicTemplate: WeddingTemplate = {
  slug: "brightly-basic",
  name: "Neela Classic",
  style: "iWedding · Neela template",
  tier: "Miễn phí",
  family: "romance",
  mood: "classic",
  badge: "Giống iWedding",
  description:
    "Bố cục và màu Neela (#8eaeba) như template iWedding phổ biến: hero full màn, cặp đôi hai cột, thiệp Save the Date, album, sự kiện parallax, sổ lưu bút và hộp mừng cưới.",
  image:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  accent: "#8eaeba",
  heroTitle:
    "Giao diện quen thuộc kiểu iWedding: xanh Neela dịu, chữ Marmelad, khung thiệp và album ảnh rõ ràng.",
  heroSubtitle:
    "Tái cấu trúc trong React + CSS Module — không copy bootstrap/jquery gốc, nhưng giữ nhận diện và luồng section tương đương trang mẫu bạn gửi.",
  previewLabel: "Neela / Classic",
  sectionProfile:
    "Header + hero, cặp đôi, The Big Day + countdown, album lưới, sự kiện cưới parallax, RSVP, mừng cưới, footer.",
  countdownVariant: "minimal",
  sections: [
    "Hero Save the Date",
    "Giới thiệu cô dâu & chú rể",
    "Thiệp mời + đếm ngược",
    "Album hình",
    "Sự kiện cưới",
    "Sổ lưu bút",
    "Hộp mừng cưới",
    "Footer chữ ký",
  ],
};
