import type { AppLanguage } from "@/components/global-preferences-provider";

export type FooterMessages = {
  eyebrow: string;
  brand: string;
  body: string;
  navExploreTitle: string;
  navSupportTitle: string;
  home: string;
  templates: string;
  savedTemplates: string;
  whyUs: string;
  free: string;
  premium: string;
  features: string;
  pricing: string;
  feedback: string;
  contact: string;
  login: string;
  rights: string;
  contactTitle: string;
  labelZalo: string;
  labelTiktok: string;
  labelEmail: string;
  labelPhone: string;
  tagline: string;
};

const vi: FooterMessages = {
  eyebrow: "Thiệp mời trực tuyến",
  brand: "Lumiere",
  body: "Nền tảng giúp hai bạn dựng website mời cưới với mẫu giao diện độc lập, hỗ trợ song ngữ và chế độ sáng hoặc tối — một link để khách mời xem lịch, địa điểm và xác nhận tham dự ngay trên điện thoại.",
  navExploreTitle: "Khám phá",
  navSupportTitle: "Dịch vụ",
  home: "Trang chủ",
  templates: "Mẫu giao diện",
  savedTemplates: "Mẫu đã lưu",
  whyUs: "Vì sao chọn chúng tôi",
  free: "Mẫu miễn phí",
  premium: "Mẫu trả phí",
  features: "Trải nghiệm",
  pricing: "Bảng giá",
  feedback: "Phản hồi",
  contact: "Liên hệ",
  login: "Đăng nhập",
  rights: "Bảo lưu mọi quyền.",
  contactTitle: "Liên hệ trực tiếp",
  labelZalo: "Zalo",
  labelTiktok: "TikTok",
  labelEmail: "Email",
  labelPhone: "Điện thoại",
  tagline: "Tinh tế trên mọi thiết bị.",
};

const en: FooterMessages = {
  eyebrow: "Online wedding invitations",
  brand: "Lumiere",
  body: "Build your wedding website with distinct templates, bilingual support, and light or dark UI—one link gives guests the schedule, venues, and RSVP on mobile.",
  navExploreTitle: "Explore",
  navSupportTitle: "Service",
  home: "Home",
  templates: "Templates",
  savedTemplates: "Saved templates",
  whyUs: "Why Lumiere",
  free: "Free templates",
  premium: "Premium templates",
  features: "Experience",
  pricing: "Pricing",
  feedback: "Feedback",
  contact: "Contact",
  login: "Login",
  rights: "All rights reserved.",
  contactTitle: "Get in touch",
  labelZalo: "Zalo",
  labelTiktok: "TikTok",
  labelEmail: "Email",
  labelPhone: "Phone",
  tagline: "Refined on every screen.",
};

export const footerMessages: Record<AppLanguage, FooterMessages> = {
  vi,
  en,
};
