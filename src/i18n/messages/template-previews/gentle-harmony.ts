import type { AppLanguage } from "@/components/global-preferences-provider";

export type GentleHarmonyPreviewCopy = {
  back: string;
  navIntro: string;
  navCouple: string;
  navEvents: string;
  navAlbum: string;
  navRsvp: string;
  welcome: string;
  saveDate: string;
  invitation: string;
  inviteBody: string;
  groom: string;
  bride: string;
  eventsTitle: string;
  ceremony: string;
  reception: string;
  viewMap: string;
  albumTitle: string;
  rsvpTitle: string;
  rsvpName: string;
  rsvpAttend: string;
  rsvpDecline: string;
  rsvpSubmit: string;
  thanks: string;
};

const vi: GentleHarmonyPreviewCopy = {
  back: "Về trang chủ",
  navIntro: "Lời mời",
  navCouple: "Cặp đôi",
  navEvents: "Sự kiện",
  navAlbum: "Album",
  navRsvp: "Xác nhận",
  welcome: "Chào mừng bạn",
  saveDate: "Save the Date",
  invitation: "Lời mời chân thành",
  inviteBody: "Sự hiện diện của bạn là niềm hạnh phúc lớn lao nhất đối với chúng mình. Hãy cùng chia sẻ khoảnh khắc trọng đại này nhé!",
  groom: "Chú rể",
  bride: "Cô dâu",
  eventsTitle: "Sự kiện cưới",
  ceremony: "Lễ thành hôn",
  reception: "Tiệc cưới",
  viewMap: "Xem bản đồ",
  albumTitle: "Album kỷ niệm",
  rsvpTitle: "Xác nhận tham dự",
  rsvpName: "Tên của bạn",
  rsvpAttend: "Tôi sẽ tham dự",
  rsvpDecline: "Rất tiếc, tôi không thể",
  rsvpSubmit: "Gửi xác nhận",
  thanks: "Trân trọng cảm ơn",
};

const en: GentleHarmonyPreviewCopy = {
  back: "Back Home",
  navIntro: "Invite",
  navCouple: "Couple",
  navEvents: "Events",
  navAlbum: "Album",
  navRsvp: "RSVP",
  welcome: "Welcome",
  saveDate: "Save the Date",
  invitation: "Sincere Invitation",
  inviteBody: "Your presence will make our wedding day truly special. We look forward to celebrating this big day with you!",
  groom: "Groom",
  bride: "Bride",
  eventsTitle: "Wedding Events",
  ceremony: "Wedding Ceremony",
  reception: "Wedding Reception",
  viewMap: "View Map",
  albumTitle: "Our Album",
  rsvpTitle: "RSVP",
  rsvpName: "Your Name",
  rsvpAttend: "I'll be there",
  rsvpDecline: "Sorry, I can't come",
  rsvpSubmit: "Submit RSVP",
  thanks: "With Gratitude",
};

export const gentleHarmonyPreviewMessages: Record<AppLanguage, GentleHarmonyPreviewCopy> = { vi, en };
