import type { AppLanguage } from "@/components/global-preferences-provider";

export type MyInvitationsMessages = {
  pageTitle: string;
  pageDescription: string;
  title: string;
  subtitle: string;
  backHome: string;
  needLogin: string;
  goLogin: string;
  loading: string;
  emptyTitle: string;
  emptyBody: string;
  ctaBrowse: string;
  futureHintTitle: string;
  futureHintBody: string;
  step1: string;
  step2: string;
  step3: string;
  listHeading: string;
  inviteLinkLabel: string;
  openInvite: string;
  copyLink: string;
  copied: string;
  updatedPrefix: string;
  statusPublished: string;
  statusDraft: string;
  tierFree: string;
  tierPremium: string;
  previewPhotoCaption: string;
  eventSummaryLabel: string;
  venueLabel: string;
  listLoadError: string;
  retryList: string;
  noPublicLinkYet: string;
  paymentStatusLabel: string;
  eventUntitled: string;
  venueTbd: string;
  eventTbd: string;
};

const vi: MyInvitationsMessages = {
  pageTitle: "Mẫu thiệp cưới đã tạo | Lumiere Wedding Websites",
  pageDescription: "Danh sách thiệp cưới bạn đã tạo và chỉnh sửa trên Lumiere.",
  title: "Mẫu thiệp cưới đã tạo",
  subtitle:
    "Mỗi dự án thiệp bạn lưu sẽ hiển thị tại đây — mở lại để chỉnh hoặc tải gói triển khai khi sẵn sàng.",
  backHome: "Về trang chủ",
  needLogin: "Bạn cần đăng nhập để xem thiệp đã tạo.",
  goLogin: "Đăng nhập",
  loading: "Đang tải…",
  emptyTitle: "Chưa có thiệp nào",
  emptyBody:
    "Bắt đầu bằng cách chọn một mẫu, điền tên cô dâu chú rể và ngày cưới trong phần xem thử. Khi hệ thống lưu dự án của bạn, chúng sẽ xuất hiện ở đây.",
  ctaBrowse: "Khám phá mẫu thiệp",
  futureHintTitle: "Sắp tới",
  futureHintBody: "Tải gói nguồn triển khai sẽ có trong bản cập nhật tiếp theo.",
  step1: "Chọn mẫu",
  step2: "Chỉnh nội dung",
  step3: "Lưu & triển khai",
  listHeading: "Thiệp của bạn",
  inviteLinkLabel: "Link thiệp cưới",
  openInvite: "Mở thiệp",
  copyLink: "Sao chép link",
  copied: "Đã sao chép",
  updatedPrefix: "Cập nhật",
  statusPublished: "Đã xuất bản",
  statusDraft: "Bản nháp",
  tierFree: "Miễn phí",
  tierPremium: "Trả phí",
  previewPhotoCaption: "Ảnh xem thử",
  eventSummaryLabel: "Thời gian & địa điểm",
  venueLabel: "Địa điểm tổ chức",
  listLoadError: "Không tải được danh sách thiệp. Vui lòng thử lại.",
  retryList: "Thử lại",
  noPublicLinkYet: "Chưa có liên kết công khai cho thiệp này.",
  paymentStatusLabel: "Thanh toán",
  eventUntitled: "Chưa đặt tên sự kiện",
  venueTbd: "Chưa có địa điểm",
  eventTbd: "Ngày giờ chưa cập nhật",
};

const en: MyInvitationsMessages = {
  pageTitle: "Your wedding invitations | Lumiere Wedding Websites",
  pageDescription: "Invitations you have created and customized on Lumiere.",
  title: "Your wedding invitations",
  subtitle:
    "Every saved project shows up here — reopen to edit or download your delivery package when it is ready.",
  backHome: "Back to home",
  needLogin: "Sign in to see invitations you have created.",
  goLogin: "Sign in",
  loading: "Loading…",
  emptyTitle: "No invitations yet",
  emptyBody:
    "Pick a template and fill in names, date, and venue in the live preview. Once your projects are saved on our servers, they will appear in this list.",
  ctaBrowse: "Browse templates",
  futureHintTitle: "Coming soon",
  futureHintBody: "Downloadable source bundles for your invitation will arrive in a later update.",
  step1: "Pick a template",
  step2: "Customize",
  step3: "Save & deploy",
  listHeading: "Your invitations",
  inviteLinkLabel: "Invitation link",
  openInvite: "Open invitation",
  copyLink: "Copy link",
  copied: "Copied",
  updatedPrefix: "Updated",
  statusPublished: "Published",
  statusDraft: "Draft",
  tierFree: "Free",
  tierPremium: "Premium",
  previewPhotoCaption: "Preview image",
  eventSummaryLabel: "When & where",
  venueLabel: "Venue",
  listLoadError: "Could not load your invitations. Please try again.",
  retryList: "Try again",
  noPublicLinkYet: "No public link is available for this invitation yet.",
  paymentStatusLabel: "Payment",
  eventUntitled: "Untitled event",
  venueTbd: "No venue yet",
  eventTbd: "Date and time TBD",
};

export const myInvitationsMessages: Record<AppLanguage, MyInvitationsMessages> = {
  vi,
  en,
};
