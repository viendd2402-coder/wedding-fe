import type { PreviewData } from "@/templates/preview-types";

export const softSerenityGallery = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1550784718-990c6de52adf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1563808599481-34a342e44508?auto=format&fit=crop&w=900&q=80",
] as const;

export const softSerenityStoryVi = [
  {
    year: "2020",
    title: "Chạm mặt lần đầu",
    body: "Giữa phố đông người, ánh mắt vô tình chạm nhau, mở đầu cho một câu chuyện tình yêu dịu dàng.",
  },
  {
    year: "2022",
    title: "Lời ngỏ lời yêu",
    body: "Dưới ánh hoàng hôn, lời hứa cùng nhau đi hết đoạn đường còn lại đã được thốt ra chân thành.",
  },
  {
    year: "2026",
    title: "Mùa chung đôi",
    body: "Chúng mình cùng bước sang một trang mới, nơi tình yêu được kết tinh bằng một tổ ấm nhỏ.",
  },
];

export const softSerenityWorkspaceInitialPreview: Partial<PreviewData> = {
  ssHeroLead: "Cùng chúng mình viết tiếp chương mới của hạnh phúc.",
  ssInviteBody: "Trân trọng kính mời quý khách đến dự buổi tiệc thành hôn của chúng mình. Sự hiện diện của bạn là niềm vinh hạnh lớn lao nhất.",
  ssCoupleQuote: "Tình yêu không chỉ là nhìn nhau, mà là cùng nhìn về một hướng.",
  ssStoryLead: "Hành trình từ người lạ thành người thương.",
  ssAlbumLead: "Lưu giữ những khoảnh khắc ngọt ngào nhất.",
  ssVuQuyTime: "08:30",
  ssVuQuyVenue: "Tư gia nhà gái - Quận 1, TP. Hồ Chí Minh",
  ssVuQuyLocation: "TP. Hồ Chí Minh",
  ssBrideEventTime: "11:30",
  ssBrideEventVenue: "White Palace, Quận Phú Nhuận",
  ssBrideEventLocation: "TP. Hồ Chí Minh",
  ssGroomEventTime: "18:00",
  ssGroomEventVenue: "Gem Center, Quận 1",
  ssGroomEventLocation: "TP. Hồ Chí Minh",
  ssBrideBankName: "Vietcombank",
  ssBrideAccountName: "NGUYEN THI TUYET",
  ssBrideAccountNumber: "1234567890",
  ssGroomBankName: "Techcombank",
  ssGroomAccountName: "TRAN HOANG ANH",
  ssGroomAccountNumber: "0987654321",
  groomParentLine1: "Ông Trần Văn A",
  groomParentLine2: "Bà Nguyễn Thị B",
  brideParentLine1: "Ông Lê Văn C",
  brideParentLine2: "Bà Phạm Thị D",
  groomBio: "Một người đàn ông điềm đạm, yêu thích sự giản đơn và luôn sẵn sàng che chở cho người mình thương.",
  brideBio: "Cô gái nhẹ nhàng, yêu hoa cỏ và luôn mang lại năng lượng tích cực cho mọi người xung quanh.",
  ...softSerenityStoryVi.reduce(
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
