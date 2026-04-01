export type TemplateTier = "Miễn phí" | "Trả phí";

export type WeddingTemplate = {
  slug: string;
  name: string;
  style: string;
  tier: TemplateTier;
  description: string;
  image: string;
  accent: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: string[];
};

export const weddingTemplates: WeddingTemplate[] = [
  {
    slug: "minimal-muse",
    name: "Minimal Muse",
    style: "Tối giản hiện đại",
    tier: "Miễn phí",
    description:
      "Tông màu kem, typography thanh lịch, phù hợp các cặp đôi thích giao diện tinh gọn.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    accent: "#7d8c79",
    heroTitle: "Một website cưới tinh gọn với màu sắc dịu nhẹ và bố cục thanh lịch.",
    heroSubtitle:
      "Mẫu miễn phí để bạn cho khách xem nhanh một website cưới gọn gàng, đẹp và dễ sử dụng trên mobile.",
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
    slug: "editorial-bloom",
    name: "Editorial Bloom",
    style: "Editorial cao cấp",
    tier: "Trả phí",
    description:
      "Ảnh lớn, bố cục giống tạp chí, rất hợp phong cách sang trọng và hiện đại.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    accent: "#c5a7a1",
    heroTitle: "Phong cách editorial lãng mạn dành cho các cặp đôi muốn một thiệp cưới số cao cấp.",
    heroSubtitle:
      "Mẫu trả phí hướng đến trải nghiệm cao cấp hơn với gallery đẹp, section sang trọng và bố cục mang tính thương hiệu.",
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
    slug: "soft-romance",
    name: "Soft Romance",
    style: "Lãng mạn pastel",
    tier: "Trả phí",
    description:
      "Màu dusty rose và sage nhẹ nhàng, mang lại cảm giác mềm mại, trẻ trung.",
    image:
      "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
    accent: "#b89098",
    heroTitle: "Tông pastel nhẹ cho một website cưới mềm mại, trẻ trung và giàu cảm xúc.",
    heroSubtitle:
      "Mẫu này phù hợp các cặp đôi thích tông màu mềm, ảnh đẹp và cảm giác lãng mạn nhưng vẫn hiện đại.",
    sections: [
      "Hero pastel",
      "Thiệp mời phong cách lãng mạn",
      "Calendar & đếm ngược",
      "Story section mềm mại",
      "Section đếm ngược",
      "Album ảnh couple",
      "RSVP và gửi lời chúc",
      "Thông tin mừng cưới",
    ],
  },
  {
    slug: "sage-vows",
    name: "Sage Vows",
    style: "Tối giản thiên nhiên",
    tier: "Miễn phí",
    description:
      "Phong cách nhẹ nhàng với tông xanh sage và bố cục thoáng, phù hợp khách thích cảm giác tinh tế.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    accent: "#8c9b8a",
    heroTitle: "Một mẫu giao diện dịu mắt, hiện đại và thân thiện với khách xem trên mobile.",
    heroSubtitle:
      "Mẫu miễn phí phù hợp để khách thử nhanh trước khi quyết định nâng cấp lên gói cao hơn.",
    sections: [
      "Hero ảnh lớn",
      "Thiệp cưới số",
      "Countdown",
      "Calendar",
      "Story ngắn",
      "Thông tin sự kiện",
      "Gallery cơ bản",
      "RSVP",
    ],
  },
  {
    slug: "ivory-day",
    name: "Ivory Day",
    style: "Kem thanh lịch",
    tier: "Miễn phí",
    description:
      "Tông màu ivory và typography mềm mại, phù hợp các cặp đôi yêu vẻ đẹp cổ điển pha hiện đại.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    accent: "#d7cab8",
    heroTitle: "Mẫu website cưới nhẹ nhàng giúp khách cảm nhận sự chỉn chu ngay từ cái nhìn đầu tiên.",
    heroSubtitle:
      "Thiết kế tập trung vào ảnh đẹp, lời mời số và các thông tin cần thiết để chia sẻ nhanh.",
    sections: [
      "Hero cổ điển",
      "Invitation card",
      "Save the date",
      "Lịch cưới",
      "Bản đồ",
      "Gallery",
      "Wishes",
      "RSVP cơ bản",
    ],
  },
  {
    slug: "modern-pearl",
    name: "Modern Pearl",
    style: "Hiện đại tinh gọn",
    tier: "Miễn phí",
    description:
      "Bố cục gọn gàng, nhấn mạnh tính dễ xem và dễ gửi cho khách mời trên điện thoại.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    accent: "#cfc8c2",
    heroTitle: "Thiết kế phù hợp những cặp đôi muốn một website cưới tối giản nhưng vẫn sang trọng.",
    heroSubtitle:
      "Mẫu miễn phí giúp khách hình dung ngay sản phẩm hoàn chỉnh với các section phổ biến nhất.",
    sections: [
      "Hero",
      "Countdown",
      "Calendar",
      "Thông tin cặp đôi",
      "Timeline",
      "Gallery nhỏ",
      "Lời chúc",
      "RSVP",
    ],
  },
  {
    slug: "golden-letter",
    name: "Golden Letter",
    style: "Luxury ánh vàng",
    tier: "Trả phí",
    description:
      "Phù hợp khách hàng cao cấp muốn giao diện có chiều sâu, hình ảnh lớn và cảm giác sang trọng rõ rệt.",
    image:
      "https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21d?auto=format&fit=crop&w=1200&q=80",
    accent: "#b89a62",
    heroTitle: "Thiệp cưới số cao cấp với cảm hứng ánh vàng, editorial và nhiều khoảng trắng tinh tế.",
    heroSubtitle:
      "Mẫu trả phí dành cho các cặp đôi muốn thể hiện phong cách riêng và trải nghiệm mượt trên mọi thiết bị.",
    sections: [
      "Hero luxury",
      "Thiệp mời mở đầu",
      "Countdown nổi bật",
      "Story spread",
      "Event details",
      "Large gallery",
      "Gift info",
      "RSVP nâng cao",
    ],
  },
  {
    slug: "moonlight-sonnet",
    name: "Moonlight Sonnet",
    style: "Đêm lãng mạn",
    tier: "Trả phí",
    description:
      "Tông màu đậm sang trọng, hợp với concept tiệc tối hoặc wedding dinner hiện đại.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    accent: "#5b5366",
    heroTitle: "Một mẫu giao diện mang cảm giác huyền ảo, sâu lắng và đậm chất đêm tiệc cưới.",
    heroSubtitle:
      "Thích hợp cho khách hàng muốn website khác biệt rõ so với các mẫu phổ thông trên thị trường.",
    sections: [
      "Hero dark mood",
      "Save the date",
      "Countdown",
      "Story cột mốc",
      "Gallery cinematic",
      "Dress code",
      "Thông tin tiệc",
      "RSVP",
    ],
  },
  {
    slug: "terracotta-notes",
    name: "Terracotta Notes",
    style: "Boho hiện đại",
    tier: "Trả phí",
    description:
      "Bảng màu terracotta ấm áp mang lại cảm giác cá tính, nghệ thuật và rất hợp wedding outdoor.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80",
    accent: "#b46f52",
    heroTitle: "Mẫu website cưới mang cảm hứng boho hiện đại dành cho các cặp đôi thích sự khác biệt.",
    heroSubtitle:
      "Thiết kế tập trung vào ảnh lớn, typography rõ và những mảng màu có cá tính mạnh hơn.",
    sections: [
      "Hero boho",
      "Thiệp mời số",
      "Calendar",
      "Story section",
      "Thông tin venue",
      "Gallery mix layout",
      "QR mừng cưới",
      "RSVP",
    ],
  },
  {
    slug: "blush-signature",
    name: "Blush Signature",
    style: "Pastel cao cấp",
    tier: "Trả phí",
    description:
      "Màu blush nhẹ, typography mềm và nhiều card layer giúp giao diện nhìn như một bộ nhận diện mini.",
    image:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
    accent: "#d2a1a7",
    heroTitle: "Thiết kế sang, mềm và giàu cảm xúc cho những wedding website hướng tới trải nghiệm cao cấp.",
    heroSubtitle:
      "Mẫu phù hợp để upsell cho khách hàng muốn website vừa đẹp vừa có cảm giác được thiết kế riêng.",
    sections: [
      "Hero pastel deluxe",
      "Invitation layer",
      "Countdown đẹp",
      "Album ảnh",
      "Lịch sự kiện",
      "Guest wishes",
      "Gift section",
      "RSVP cao cấp",
    ],
  },
];

export const freeTemplates = weddingTemplates.filter(
  (template) => template.tier === "Miễn phí",
);

export const premiumTemplates = weddingTemplates.filter(
  (template) => template.tier === "Trả phí",
);
