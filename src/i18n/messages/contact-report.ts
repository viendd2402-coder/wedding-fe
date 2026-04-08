import type { AppLanguage } from "@/components/global-preferences-provider";

export type HomeContactReportCopy = {
  typePlaceholder: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  nameLabel: string;
  phoneLabel: string;
  needLabel: string;
  messageLabel: string;
  messageHint: string;
  submit: string;
  submitting: string;
  fullNameRequired: string;
  fullNameMax: string;
  phoneRequired: string;
  phoneMax: string;
  phoneInvalid: string;
  typeRequired: string;
  descriptionMax: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  errorGeneric: string;
  errorNetwork: string;
  errorConfig: string;
};

type Bundle = {
  typePlaceholder: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  nameLabel: string;
  phoneLabel: string;
  needLabel: string;
  messageLabel: string;
  messageHintTpl: string;
  submit: string;
  submitting: string;
  fullNameRequired: string;
  fullNameMaxTpl: string;
  phoneRequired: string;
  phoneMaxTpl: string;
  phoneInvalid: string;
  typeRequired: string;
  descriptionMaxTpl: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  errorGeneric: string;
  errorNetwork: string;
  errorConfig: string;
};

const vi: Bundle = {
  typePlaceholder: "Chọn nhu cầu của bạn",
  option1: "Tôi muốn xem các mẫu có sẵn",
  option2: "Tôi muốn đặt website theo mẫu",
  option3: "Tôi muốn tư vấn thêm (gói, tên miền, v.v.)",
  option4: "Khác",
  nameLabel: "Họ và tên",
  phoneLabel: "Số điện thoại",
  needLabel: "Nhu cầu",
  messageLabel: "Nội dung (tuỳ chọn)",
  messageHintTpl: "__MAX__ ký tự tối đa",
  submit: "Gửi yêu cầu tư vấn",
  submitting: "Đang gửi…",
  fullNameRequired: "Vui lòng nhập họ và tên.",
  fullNameMaxTpl: "Họ và tên tối đa __MAX__ ký tự.",
  phoneRequired: "Vui lòng nhập số điện thoại.",
  phoneMaxTpl: "Số điện thoại tối đa __MAX__ ký tự.",
  phoneInvalid:
    "Nhập số di động Việt Nam (vd 09…, 03…) hoặc số quốc tế có mã vùng (+…).",
  typeRequired: "Vui lòng chọn một nhu cầu.",
  descriptionMaxTpl: "Nội dung tối đa __MAX__ ký tự.",
  successTitle: "Đã gửi thành công",
  successBody:
    "Cảm ơn bạn đã liên hệ. Đội ngũ Lumiere sẽ đọc yêu cầu và phản hồi sớm qua số điện thoại hoặc kênh bạn để lại.",
  sendAnother: "Gửi yêu cầu khác",
  errorGeneric: "Không gửi được. Vui lòng thử lại sau.",
  errorNetwork: "Lỗi mạng. Kiểm tra kết nối và thử lại.",
  errorConfig: "Chưa cấu hình API (NEXT_PUBLIC_API_URL).",
};

const en: Bundle = {
  typePlaceholder: "What do you need help with?",
  option1: "I want to browse ready-made templates",
  option2: "I want a website based on a template",
  option3: "I want more guidance (plans, domain, etc.)",
  option4: "Other",
  nameLabel: "Full name",
  phoneLabel: "Phone number",
  needLabel: "Request type",
  messageLabel: "Message (optional)",
  messageHintTpl: "Up to __MAX__ characters",
  submit: "Send my request",
  submitting: "Sending…",
  fullNameRequired: "Please enter your full name.",
  fullNameMaxTpl: "Full name must be at most __MAX__ characters.",
  phoneRequired: "Please enter your phone number.",
  phoneMaxTpl: "Phone must be at most __MAX__ characters.",
  phoneInvalid:
    "Use a valid Vietnamese mobile (e.g. 09…, 03…) or international format with country code (+…).",
  typeRequired: "Please choose a request type.",
  descriptionMaxTpl: "Message must be at most __MAX__ characters.",
  successTitle: "Thank you — we received it",
  successBody:
    "Our team will review your request and get back to you soon using the contact details you shared.",
  sendAnother: "Send another request",
  errorGeneric: "We could not send your request. Please try again.",
  errorNetwork: "Network error. Check your connection and try again.",
  errorConfig: "API URL is not configured (NEXT_PUBLIC_API_URL).",
};

const bundles: Record<AppLanguage, Bundle> = { vi, en };

export function getHomeContactReportCopy(
  language: AppLanguage,
  limits: {
    fullNameMax: number;
    phoneMax: number;
    descriptionMax: number;
  },
): HomeContactReportCopy {
  const m = bundles[language];
  return {
    typePlaceholder: m.typePlaceholder,
    option1: m.option1,
    option2: m.option2,
    option3: m.option3,
    option4: m.option4,
    nameLabel: m.nameLabel,
    phoneLabel: m.phoneLabel,
    needLabel: m.needLabel,
    messageLabel: m.messageLabel,
    messageHint: m.messageHintTpl.replace("__MAX__", String(limits.descriptionMax)),
    submit: m.submit,
    submitting: m.submitting,
    fullNameRequired: m.fullNameRequired,
    fullNameMax: m.fullNameMaxTpl.replace("__MAX__", String(limits.fullNameMax)),
    phoneRequired: m.phoneRequired,
    phoneMax: m.phoneMaxTpl.replace("__MAX__", String(limits.phoneMax)),
    phoneInvalid: m.phoneInvalid,
    typeRequired: m.typeRequired,
    descriptionMax: m.descriptionMaxTpl.replace("__MAX__", String(limits.descriptionMax)),
    successTitle: m.successTitle,
    successBody: m.successBody,
    sendAnother: m.sendAnother,
    errorGeneric: m.errorGeneric,
    errorNetwork: m.errorNetwork,
    errorConfig: m.errorConfig,
  };
}
