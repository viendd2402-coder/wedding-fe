import type { AppLanguage } from "@/components/global-preferences-provider";

export type SavedTemplatesMessages = {
  pageTitle: string;
  pageDescription: string;
  title: string;
  subtitle: string;
  backHome: string;
  listHeading: string;
  emptyTitle: string;
  emptyBody: string;
  ctaBrowse: string;
  removeLabel: string;
  openDemo: string;
  unknownTemplateTitle: string;
  unknownTemplateBody: string;
  toastAdded: string;
  countSuffix: string;
  localStorageNote: string;
};

const vi: SavedTemplatesMessages = {
  pageTitle: "Mẫu thiệp đã lưu | Lumiere",
  pageDescription: "Các mẫu giao diện bạn đã lưu trên trình duyệt — mở lại để xem demo hoặc bắt đầu chỉnh.",
  title: "Mẫu thiệp đã lưu",
  subtitle:
    "Danh sách được lưu cục bộ trên thiết bị này. Đăng nhập và tạo thiệp để đồng bộ dự án lên tài khoản.",
  backHome: "Về trang chủ",
  listHeading: "Đã lưu",
  emptyTitle: "Chưa có mẫu nào",
  emptyBody: "Trên thẻ mẫu ở trang chủ hoặc trang bộ sưu tập, bấm « Lưu mẫu này » để ghim mẫu vào đây.",
  ctaBrowse: "Xem mẫu giao diện",
  removeLabel: "Bỏ lưu",
  openDemo: "Xem demo",
  unknownTemplateTitle: "Mẫu không còn trong danh mục",
  unknownTemplateBody: "Bạn vẫn có thể bỏ khỏi danh sách đã lưu.",
  toastAdded: "Đã lưu",
  countSuffix: "mẫu",
  localStorageNote:
    "Dữ liệu chỉ nằm trên trình duyệt này — xóa cookie hoặc dùng chế độ ẩn danh sẽ làm mất danh sách.",
};

const en: SavedTemplatesMessages = {
  pageTitle: "Saved invitation templates | Lumiere",
  pageDescription: "Templates you saved in this browser—open again to preview or start editing.",
  title: "Saved invitation templates",
  subtitle:
    "This list is stored locally on this device. Sign in and create an invitation to sync projects to your account.",
  backHome: "Back to home",
  listHeading: "Saved",
  emptyTitle: "Nothing saved yet",
  emptyBody: 'On any template card on the home page or gallery, tap "Save this template" to pin it here.',
  ctaBrowse: "Browse templates",
  removeLabel: "Remove",
  openDemo: "View demo",
  unknownTemplateTitle: "Template no longer listed",
  unknownTemplateBody: "You can still remove it from your saved list.",
  toastAdded: "Saved",
  countSuffix: "templates",
  localStorageNote:
    "Data stays in this browser only—clearing site data or using a private window will remove this list.",
};

export const savedTemplatesMessages: Record<AppLanguage, SavedTemplatesMessages> = {
  vi,
  en,
};
