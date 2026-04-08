import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplateWorkspaceLightboxMessages = {
  close: string;
};

export type TemplateWorkspacePanelMessages = {
  openPreview: string;
  closePreview: string;
  titleEyebrow: string;
  title: string;
  groomName: string;
  brideName: string;
  dateLabel: string;
  location: string;
  ceremonyTime: string;
  partyTime: string;
  venue: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  coverImage: string;
  coverSelected: string;
  coverEmpty: string;
  gallery: string;
  imageLabel: string;
  imageSelected: string;
  imageDefault: string;
  paymentEyebrow: string;
  paymentTitle: string;
  paymentBuyerLine: string;
  paymentBuyerUnset: string;
  paymentPay: string;
  paymentLoading: string;
  paymentNotConfigured: string;
  paymentFailed: string;
  paymentFreeHint: string;
  paymentEmailCta: string;
  paymentMailSubject: string;
};

export type TemplateWorkspaceMessages = {
  lightbox: TemplateWorkspaceLightboxMessages;
  panel: TemplateWorkspacePanelMessages;
};

const vi: TemplateWorkspaceMessages = {
  lightbox: { close: "Đóng preview" },
  panel: {
    openPreview: "Mở bảng tuỳ chỉnh xem thử",
    closePreview: "Thu gọn bảng tuỳ chỉnh",
    titleEyebrow: "Xem thử",
    title: "Nhập thông tin — cập nhật ngay trên thiệp",
    groomName: "Tên chú rể",
    brideName: "Tên cô dâu",
    dateLabel: "Ngày cưới hiển thị",
    location: "Địa điểm / thành phố",
    ceremonyTime: "Giờ lễ",
    partyTime: "Giờ tiệc",
    venue: "Địa điểm tiệc",
    bankName: "Tên ngân hàng",
    accountName: "Tên chủ tài khoản",
    accountNumber: "Số tài khoản",
    coverImage: "Ảnh bìa",
    coverSelected: "Đã chọn ảnh bìa mới.",
    coverEmpty: "Chưa chọn ảnh bìa.",
    gallery: "Album ảnh",
    imageLabel: "Ảnh",
    imageSelected: "Đã chọn ảnh.",
    imageDefault: "Đang dùng ảnh mặc định.",
    paymentEyebrow: "Thanh toán",
    paymentTitle: "Thanh toán gói Premium",
    paymentBuyerLine: "Tên trên đơn thanh toán:",
    paymentBuyerUnset:
      "Chưa nhập tên cô dâu / chú rể ở các ô phía trên — bạn vẫn có thể thanh toán; hệ thống ghi nhận theo tên mẫu.",
    paymentPay: "Thanh toán — 2.490.000đ",
    paymentLoading: "Đang tạo link…",
    paymentNotConfigured:
      "Cổng thanh toán chưa được cấu hình trên máy chủ. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
    paymentFailed: "Không tạo được link. Thử lại sau.",
    paymentFreeHint:
      "Đây là mẫu miễn phí — không cần thanh toán. Gửi nội dung đã nhập phía trên qua email để được tư vấn.",
    paymentEmailCta: "Gửi yêu cầu qua email",
    paymentMailSubject: "Yêu cầu mẫu Lumiere",
  },
};

const en: TemplateWorkspaceMessages = {
  lightbox: { close: "Close preview" },
  panel: {
    openPreview: "Open preview panel",
    closePreview: "Collapse preview panel",
    titleEyebrow: "Live preview",
    title: "Adjust details — your invitation updates instantly",
    groomName: "Groom name",
    brideName: "Bride name",
    dateLabel: "Displayed wedding date",
    location: "Location / city",
    ceremonyTime: "Ceremony time",
    partyTime: "Reception time",
    venue: "Reception venue",
    bankName: "Bank name",
    accountName: "Account holder",
    accountNumber: "Account number",
    coverImage: "Cover image",
    coverSelected: "New cover image selected.",
    coverEmpty: "No custom cover image selected.",
    gallery: "Photo album",
    imageLabel: "Image",
    imageSelected: "Image selected.",
    imageDefault: "Using default image.",
    paymentEyebrow: "Payment",
    paymentTitle: "Premium checkout",
    paymentBuyerLine: "Name on the payment request:",
    paymentBuyerUnset:
      "You have not filled in bride/groom names above — you can still pay; we will label the order from the template name.",
    paymentPay: "Pay — 2,490,000đ",
    paymentLoading: "Creating link…",
    paymentNotConfigured:
      "Checkout is not configured on the server yet. Please try again later or contact support.",
    paymentFailed: "Could not create the payment link.",
    paymentFreeHint:
      "This is a free template — no payment. Email us the details you entered above for setup help.",
    paymentEmailCta: "Send request by email",
    paymentMailSubject: "Lumiere template request",
  },
};

export const templateWorkspaceMessages: Record<AppLanguage, TemplateWorkspaceMessages> =
  { vi, en };
