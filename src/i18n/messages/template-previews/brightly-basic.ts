import type { AppLanguage } from "@/components/global-preferences-provider";

export type BrightlyBasicPreviewCopy = {
  back: string;
  navCouple: string;
  navGallery: string;
  navEvents: string;
  navRsvp: string;
  navGift: string;
  saveDate: string;
  sendWish: string;
  confirmAttend: string;
  bigDay: string;
  inviteLead: string;
  gettingMarried: string;
  thanksBody: string;
  groom: string;
  bride: string;
  galleryTitle: string;
  eventsTitle: string;
  eventsDesc: string;
  ceremony: string;
  reception: string;
  addCal: string;
  viewMap: string;
  guestbook: string;
  namePh: string;
  emailPh: string;
  wishPh: string;
  wishHint: string;
  submitWish: string;
  giftTitle: string;
  giftToCouple: string;
  bank: string;
  accName: string;
  accNo: string;
  copyStk: string;
  copied: string;
  parentGroom: string;
  parentBride: string;
  sonOf: string;
  dauOf: string;
  tbd: string;
  calendarEyebrow: string;
  calendarWeddingDay: string;
  footerThanksEyebrow: string;
  footerThanks: string;
  countdownDay: string;
  countdownHour: string;
  countdownMinute: string;
  countdownSecond: string;
};

const vi: BrightlyBasicPreviewCopy = {
  back: "Về trang chủ",
  navCouple: "Cặp đôi",
  navGallery: "Album",
  navEvents: "Sự kiện",
  navRsvp: "Lưu bút",
  navGift: "Mừng cưới",
  saveDate: "Save the Date",
  sendWish: "Gửi lời chúc",
  confirmAttend: "Xác nhận tham dự",
  bigDay: "The Big Day!",
  inviteLead:
    "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng tôi có thêm một niềm hạnh phúc!",
  gettingMarried: "We are Getting Married",
  thanksBody:
    "Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt như đám cưới của chúng mình. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp!",
  groom: "Chú rể",
  bride: "Cô dâu",
  galleryTitle: "Album Hình Cưới",
  eventsTitle: "Sự Kiện Cưới",
  eventsDesc:
    "Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.",
  ceremony: "Lễ thành hôn",
  reception: "Tiệc cưới",
  addCal: "Thêm vào lịch",
  viewMap: "Xem bản đồ",
  guestbook: "Sổ Lưu Bút",
  namePh: "Tên của bạn*",
  emailPh: "E-mail",
  wishPh: "Nhập lời chúc của bạn*",
  wishHint: "Gợi ý lời chúc",
  submitWish: "Gửi lời chúc",
  giftTitle: "Hộp mừng cưới",
  giftToCouple: "Thông tin chuyển khoản",
  bank: "Ngân hàng",
  accName: "Tên tài khoản",
  accNo: "Số tài khoản",
  copyStk: "Sao chép STK",
  copied: "Đã sao chép",
  parentGroom: "Nhà trai",
  parentBride: "Nhà gái",
  sonOf: "Con ông",
  dauOf: "Con bà",
  tbd: "—",
  calendarEyebrow: "Lịch tháng",
  calendarWeddingDay: "Ngày cưới",
  footerThanksEyebrow: "Trân trọng cảm ơn",
  footerThanks:
    "Cảm ơn bạn đã dành thời gian cho chúng mình. Sự hiện diện và lời chúc của bạn là món quà quý giá nhất trong ngày trọng đại này — hẹn gặp bạn trong niềm vui của lễ cưới.",
  countdownDay: "Ngày",
  countdownHour: "Giờ",
  countdownMinute: "Phút",
  countdownSecond: "Giây",
};

const en: BrightlyBasicPreviewCopy = {
  back: "Back home",
  navCouple: "Couple",
  navGallery: "Album",
  navEvents: "Events",
  navRsvp: "Guestbook",
  navGift: "Gift",
  saveDate: "Save the Date",
  sendWish: "Send wishes",
  confirmAttend: "RSVP",
  bigDay: "The Big Day!",
  inviteLead:
    "Your kind wishes will mean the world to us on our wedding day.",
  gettingMarried: "We are Getting Married",
  thanksBody:
    "We are grateful to celebrate this special day with you. Thank you for your presence and your warm wishes!",
  groom: "The Groom",
  bride: "The Bride",
  galleryTitle: "Wedding Album",
  eventsTitle: "Wedding Events",
  eventsDesc:
    "True love stands together in good days and even closer in hard ones.",
  ceremony: "Ceremony",
  reception: "Reception",
  addCal: "Add to calendar",
  viewMap: "View map",
  guestbook: "Guestbook",
  namePh: "Your name*",
  emailPh: "E-mail",
  wishPh: "Your message*",
  wishHint: "Suggested wishes",
  submitWish: "Send wishes",
  giftTitle: "Wedding gift",
  giftToCouple: "Bank transfer",
  bank: "Bank",
  accName: "Account name",
  accNo: "Account number",
  copyStk: "Copy number",
  copied: "Copied",
  parentGroom: "Groom's family",
  parentBride: "Bride's family",
  sonOf: "Son of",
  dauOf: "Daughter of",
  tbd: "—",
  calendarEyebrow: "Month at a glance",
  calendarWeddingDay: "Wedding day",
  footerThanksEyebrow: "With gratitude",
  footerThanks:
    "Thank you for sharing this moment with us. Your presence and your wishes mean more than any gift — we can’t wait to celebrate with you.",
  countdownDay: "Days",
  countdownHour: "Hrs",
  countdownMinute: "Min",
  countdownSecond: "Sec",
};

export const brightlyBasicPreviewMessages: Record<AppLanguage, BrightlyBasicPreviewCopy> =
  { vi, en };
