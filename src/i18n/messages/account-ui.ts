import type { AppLanguage } from "@/components/global-preferences-provider";

/** Chuỗi dùng chung cho các trang tài khoản: /profile, /my-invitations, /saved-templates. */
export type AccountUiMessages = {
  tabsAria: string;
  tabProfile: string;
  tabInvitations: string;
  tabSaved: string;
  /** `__NAME__` = tên hiển thị */
  greetingTpl: string;
  greetingFallback: string;

  profileSubtitle: string;
  invitationsSubtitle: string;
  savedSubtitle: string;

  completionTitle: string;
  completionDone: string;
  /** `__FIELDS__` = danh sách trường còn thiếu */
  completionHintTpl: string;
  groupPersonal: string;
  groupPersonalHint: string;
  groupContact: string;
  groupContactHint: string;
  unsavedChanges: string;
  fieldAvatar: string;

  statTotal: string;
  statPublished: string;
  statDraft: string;
  nextStepDraft: string;
  nextStepPublished: string;
  nextStepPayment: string;
  share: string;
  copiedToast: string;

  suggestionsTitle: string;
  suggestionsBody: string;
  suggestionsCta: string;

  helpTitle: string;
  helpBody: string;
  helpCta: string;
};

const vi: AccountUiMessages = {
  tabsAria: "Tài khoản của bạn",
  tabProfile: "Hồ sơ",
  tabInvitations: "Thiệp của tôi",
  tabSaved: "Mẫu đã lưu",
  greetingTpl: "Chào __NAME__",
  greetingFallback: "Chào bạn",

  profileSubtitle: "Cập nhật thông tin để chúng tôi hỗ trợ bạn nhanh hơn.",
  invitationsSubtitle: "Theo dõi, chia sẻ và hoàn thiện các thiệp cưới của bạn tại đây.",
  savedSubtitle: "Những mẫu bạn đã đánh dấu. Bấm vào thẻ để xem demo, bấm biểu tượng 🔖 để bỏ lưu.",

  completionTitle: "Hồ sơ hoàn thiện",
  completionDone: "Tuyệt vời! Hồ sơ của bạn đã đầy đủ.",
  completionHintTpl: "Thêm __FIELDS__ để hoàn thiện hồ sơ.",
  groupPersonal: "Thông tin cá nhân",
  groupPersonalHint: "Tên sẽ hiển thị trên tài khoản của bạn.",
  groupContact: "Liên hệ",
  groupContactHint: "Giúp đội ngũ Lumiere liên hệ khi bạn cần hỗ trợ.",
  unsavedChanges: "Bạn có thay đổi chưa lưu",
  fieldAvatar: "ảnh đại diện",

  statTotal: "Tổng số thiệp",
  statPublished: "Đã xuất bản",
  statDraft: "Bản nháp",
  nextStepDraft: "Hoàn thiện nội dung và xuất bản để có link gửi khách.",
  nextStepPublished: "Thiệp đã sẵn sàng — gửi link cho khách mời thôi!",
  nextStepPayment: "Hoàn tất thanh toán để kích hoạt thiệp Premium.",
  share: "Chia sẻ",
  copiedToast: "Đã sao chép link thiệp",

  suggestionsTitle: "Gợi ý cho bạn",
  suggestionsBody: "Bắt đầu với một trong những mẫu được yêu thích nhất.",
  suggestionsCta: "Xem tất cả mẫu",

  helpTitle: "Cần hỗ trợ?",
  helpBody: "Đội ngũ Lumiere luôn sẵn sàng giúp bạn qua Zalo.",
  helpCta: "Nhắn Zalo",
};

const en: AccountUiMessages = {
  tabsAria: "Your account",
  tabProfile: "Profile",
  tabInvitations: "My invitations",
  tabSaved: "Saved templates",
  greetingTpl: "Hi __NAME__",
  greetingFallback: "Hi there",

  profileSubtitle: "Keep your details up to date so we can help you faster.",
  invitationsSubtitle: "Track, share and finish your wedding invitations here.",
  savedSubtitle: "Templates you bookmarked. Tap a card for the demo, tap 🔖 to remove.",

  completionTitle: "Profile completion",
  completionDone: "Great! Your profile is complete.",
  completionHintTpl: "Add __FIELDS__ to complete your profile.",
  groupPersonal: "Personal details",
  groupPersonalHint: "Your name is shown on your account.",
  groupContact: "Contact",
  groupContactHint: "Helps the Lumiere team reach you when you need support.",
  unsavedChanges: "You have unsaved changes",
  fieldAvatar: "a profile photo",

  statTotal: "Invitations",
  statPublished: "Published",
  statDraft: "Drafts",
  nextStepDraft: "Finish the content and publish to get a link for guests.",
  nextStepPublished: "Your invitation is ready — send the link to your guests!",
  nextStepPayment: "Complete payment to activate this Premium invitation.",
  share: "Share",
  copiedToast: "Invitation link copied",

  suggestionsTitle: "Picked for you",
  suggestionsBody: "Start with one of our most-loved templates.",
  suggestionsCta: "Browse all templates",

  helpTitle: "Need help?",
  helpBody: "The Lumiere team is happy to help on Zalo.",
  helpCta: "Chat on Zalo",
};

export const accountUiMessages: Record<AppLanguage, AccountUiMessages> = { vi, en };
