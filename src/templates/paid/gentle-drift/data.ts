import type { PreviewData } from "@/templates/preview-types";

/**
 * Ảnh mặc định cho album bento — tối đa 30 ô upload (khuyến nghị tối thiểu 10 ảnh).
 * Mỗi URL chỉ dùng cho một ô album, không tái dùng cho intro / hero / thẻ cặp đôi.
 */
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
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1460978815337-b1bab7f75554?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1532712938310-34cb4482f358?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583939003579-55e2be026b56?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1591604466107-ec64de5843fc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1494200109408-757f2b4bbd41?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1544070748-de54a68b0e97?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1530026502884-8913dade4e61?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1468811480171-015a29c34d0b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1470229722913-6c99f74115b9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1464366400605-3981fbcd0cf7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1510074378860-e8e3efe48c0a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606800053252-fa7a77afbdcb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1578965339229-8277a1e4ef03?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099663?auto=format&fit=crop&w=900&q=80",
] as const;

/** Ảnh màn chào mặc định — không trùng URL trong `gentleDriftGallery` hay ảnh bìa mẫu. */
export const gentleDriftIntroBannerDefault =
  "https://images.unsplash.com/photo-1556125574-ff697c72fdbb?auto=format&fit=crop&w=1400&q=82";

/** Ảnh thẻ chú rể mặc định — không trùng album / intro / các ô khác. */
export const gentleDriftGroomPortraitDefault =
  "https://images.unsplash.com/photo-1529634551435-365992c7ab02?auto=format&fit=crop&w=900&q=82";

/** Ảnh thẻ cô dâu mặc định — không trùng album / intro / các ô khác. */
export const gentleDriftBridePortraitDefault =
  "https://images.unsplash.com/photo-1537907796426-43cdb426cddd?auto=format&fit=crop&w=900&q=82";

/** Ảnh footer cảm ơn mặc định (full-bleed, tông ấm — khi chưa upload). */
export const gentleDriftFooterPhotoDefault =
  "https://images.unsplash.com/photo-1599462616558-2b75fd26a283?auto=format&fit=crop&w=1800&q=82";

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
