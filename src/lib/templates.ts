export type TemplateTier = "Miễn phí" | "Trả phí";
export type TemplateFamily =
  | "minimal"
  | "editorial"
  | "romance"
  | "dark-luxury"
  | "destination";
export type TemplateMood =
  | "minimal"
  | "botanical"
  | "fashion"
  | "editorial"
  | "luxury"
  | "dark"
  | "destination"
  | "classic"
  | "boho"
  | "pastel";
export type CountdownVariant =
  | "minimal"
  | "editorial"
  | "romance"
  | "dark"
  | "coastal";

export type WeddingTemplate = {
  slug: string;
  name: string;
  style: string;
  tier: TemplateTier;
  family: TemplateFamily;
  mood: TemplateMood;
  badge: string;
  description: string;
  image: string;
  accent: string;
  heroTitle: string;
  heroSubtitle: string;
  previewLabel: string;
  sections: string[];
  sectionProfile: string;
  countdownVariant: CountdownVariant;
};

export const weddingTemplates: WeddingTemplate[] = [
  {
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
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
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
  },
  {
    slug: "azure-promise",
    name: "Azure Promise",
    style: "Tươi sáng, dịu nhẹ",
    tier: "Miễn phí",
    family: "minimal",
    mood: "pastel",
    badge: "Mobile friendly",
    description:
      "Mẫu sáng, nhẹ và dễ dùng với tinh thần trẻ trung, phù hợp các cặp đôi thích cảm giác thân thiện như những template cưới phổ biến.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    accent: "#7aa6c2",
    heroTitle:
      "Một website cưới sáng sủa, dễ nhìn và phù hợp gửi nhanh cho khách qua Zalo hoặc điện thoại.",
    heroSubtitle:
      "Lấy cảm hứng từ các mẫu gallery wedding phổ thông: tươi sáng, gọn gàng, dễ thao tác và ưu tiên hiển thị tốt trên mobile.",
    previewLabel: "Sáng, trẻ, dễ gửi",
    sectionProfile:
      "Bố cục dễ tiếp cận với lịch cưới, album, RSVP và bản đồ rõ ràng cho khách mời xem nhanh.",
    countdownVariant: "minimal",
    sections: [
      "Hero ảnh cưới sáng",
      "Thiệp mời đơn giản",
      "Thông tin cô dâu chú rể",
      "Lịch cưới & countdown",
      "Album ảnh cơ bản",
      "Google Maps",
      "RSVP dễ dùng",
      "Footer thân thiện",
    ],
  },
  {
    slug: "editorial-bloom",
    name: "Editorial Bloom",
    style: "Editorial cao cấp",
    tier: "Trả phí",
    family: "editorial",
    mood: "editorial",
    badge: "Best seller",
    description:
      "Ảnh lớn, bố cục giống tạp chí, rất hợp phong cách sang trọng và hiện đại.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    accent: "#c5a7a1",
    heroTitle: "Phong cách editorial lãng mạn dành cho các cặp đôi muốn một thiệp cưới số cao cấp.",
    heroSubtitle:
      "Mẫu trả phí hướng đến trải nghiệm cao cấp hơn với gallery đẹp, section sang trọng và bố cục mang tính thương hiệu.",
    previewLabel: "Magazine wedding",
    sectionProfile: "Hero lớn, story dạng spread, nhiều khoảng trắng và nhịp ảnh sang.",
    countdownVariant: "editorial",
    sections: [
      "Hero editorial toàn màn hình",
      "Thiệp mời mở đầu sang trọng",
      "Lịch cưới & countdown",
      "Story section dạng tạp chí",
      "Lịch sự kiện chi tiết",
      "Gallery dạng lưới lớn",
      "Section lời chúc",
      "RSVP nâng cao",
    ],
  },
  {
    slug: "heritage-vows",
    name: "Heritage Vows",
    style: "Thiệp cưới Việt sang trọng",
    tier: "Trả phí",
    family: "romance",
    mood: "classic",
    badge: "Premium Việt",
    description:
      "Lấy cảm hứng từ thiệp cưới truyền thống Việt Nam với bố cục hai họ, nghi lễ và cảm giác trang trọng hơn.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    accent: "#9f2d20",
    heroTitle:
      "Một mẫu premium mang tinh thần cưới Việt với sắc son, nhịp nghi lễ và cách trình bày trang trọng.",
    heroSubtitle:
      "Phù hợp cho cặp đôi muốn một website cưới có cảm giác gần gũi văn hóa Việt nhưng vẫn đủ hiện đại để tạo ấn tượng cao cấp.",
    previewLabel: "Nét Việt đương đại",
    sectionProfile:
      "Thiệp mở đầu trang trọng, timeline nghi lễ, hai bên gia đình, bản đồ nhà trai nhà gái và RSVP cao cấp.",
    countdownVariant: "romance",
    sections: [
      "Hero nghi lễ Việt",
      "Thiệp báo hỷ hai họ",
      "Lịch trình lễ vu quy - thành hôn - tiệc",
      "Bản đồ nhà trai / nhà gái",
      "QR check-in",
      "Lời chúc & mừng cưới",
      "RSVP premium",
    ],
  },
];

export const freeTemplates = weddingTemplates.filter(
  (template) => template.tier === "Miễn phí",
);

export const premiumTemplates = weddingTemplates.filter(
  (template) => template.tier === "Trả phí",
);
