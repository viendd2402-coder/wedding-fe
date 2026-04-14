import type { PreviewData } from "@/templates/preview-types";

/** Ảnh mặc định cho album bento (tông ấm / pastel, gần vibe Gentle) — tối đa 12 ô upload. */
export const gentleDriftGallery = [
  "https://images.unsplash.com/photo-1599462616558-2b75fd26a283?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1561287495-a3fe1fd28504?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1563808599481-34a342e44508?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-74fc796a73e6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221050-0f4caff5442a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b0c6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673602040-1b49001f936f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529636799528-921f4959f0a5?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
] as const;

export type GentleDriftStory = { year: string; title: string; body: string };

export const gentleDriftStoryVi: GentleDriftStory[] = [
  {
    year: "2021",
    title: "Gặp nhau thật nhẹ",
    body: "Một chiều không có gì đặc biệt, chỉ có tiếng cười và ánh mắt khiến ngày ấy trở nên khác biệt.",
  },
  {
    year: "2023",
    title: "Cùng nhau lớn lên",
    body: "Những chuyến đi ngắn, những bữa cơm ấm — chúng mình học cách yêu bằng sự kiên nhẫn và vui vẻ.",
  },
  {
    year: "2026",
    title: "Về chung một nhà",
    body: "Chúng mình chọn lưu lại ngày trọng đại theo cách dịu dàng, để gửi tới những người thân yêu nhất.",
  },
];

/**
 * Giá trị khởi tạo panel xem thử Gentle Drift (tiếng Việt, khớp copy mặc định trên thiệp).
 * Giúp các ô “thông tin cá nhân” / timeline không để trống khi mở trang mẫu.
 */
export const gentleDriftWorkspaceInitialPreview: Partial<PreviewData> = {
  gdHeroLead:
    "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình thêm một niềm hạnh phúc!",
  gdInviteBody:
    "Trân trọng kính mời quý khách đến chung vui trong ngày trọng đại của hai chúng mình. Rất mong được đón tiếp bạn.",
  gdCoupleQuote:
    "Tình yêu là điều kiện trong đó hạnh phúc của người khác là điều cần thiết cho chính bạn.",
  gdStoryLead: "Vài dòng kể về hành trình của hai đứa, thật nhẹ và thật lòng.",
  gdAlbumLead: "Những khoảnh khắc chúng mình muốn lưu lại cùng bạn.",
  gdVuQuyTime: "09:00",
  gdVuQuyVenue: "Tư gia nhà gái — 8 Lê Lợi, Đà Nẵng",
  gdVuQuyLocation: "Đà Nẵng",
  gdBrideEventTime: "11:30",
  gdBrideEventVenue: "Nhà hàng Hải Âu, Đà Nẵng",
  gdBrideEventLocation: "Đà Nẵng",
  gdGroomEventTime: "18:00",
  gdGroomEventVenue: "Sân vườn nhà trai — 12 Nguyễn Văn Linh, Đà Nẵng",
  gdGroomEventLocation: "Đà Nẵng",
  gdBrideBankName: "Vietcombank",
  gdBrideAccountName: "NGUYEN THI LINH",
  gdBrideAccountNumber: "9988 7766 5544",
  groomParentLine1: "Ông Nguyễn Văn Minh",
  groomParentLine2: "Bà Trần Thị Lan",
  brideParentLine1: "Ông Lê Hoàng Nam",
  brideParentLine2: "Bà Phạm Thu Hà",
  groomBio:
    "Một người đồng hành trầm ấm, luôn trân trọng tình cảm và yêu thương gia đình — và luôn nhường nhịn khi em “dỗi nhẹ”.",
  brideBio:
    "Cô gái hay cười, thích những điều nhỏ bình yên: một tách trà, một cuốn sách, và những chuyến đi cùng người mình yêu.",
  ...gentleDriftStoryVi.reduce(
    (acc, row, i) => {
      const n = i + 1;
      (acc as Record<string, string>)[`timeline${n}Title`] = row.year;
      (acc as Record<string, string>)[`timeline${n}Date`] = row.title;
      (acc as Record<string, string>)[`timeline${n}Body`] = row.body;
      return acc;
    },
    {} as Partial<PreviewData>,
  ),
};

export const gentleDriftStoryEn: GentleDriftStory[] = [
  {
    year: "2021",
    title: "A quiet hello",
    body: "An ordinary afternoon that somehow felt different — laughter, eye contact, and the start of something gentle.",
  },
  {
    year: "2023",
    title: "Growing side by side",
    body: "Small trips, shared meals, and patience taught us how to love a little more thoughtfully every day.",
  },
  {
    year: "2026",
    title: "Together, officially",
    body: "We want to celebrate this chapter softly and sincerely, surrounded by the people who shaped our story.",
  },
];
