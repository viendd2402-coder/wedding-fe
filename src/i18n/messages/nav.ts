import type { AppLanguage } from "@/components/global-preferences-provider";

export type NavMessages = {
  mainNavAria: string;
  mobileMenuAria: string;
  brandEyebrow: string;
  brandName: string;
  navHome: string;
  navTemplates: string;
  navWhyUs: string;
  navFeatures: string;
  navPricing: string;
  navFeedback: string;
  navContact: string;
  navLogin: string;
  lightLabel: string;
  darkLabel: string;
  openMenu: string;
  closeMenu: string;
  accountChipAriaSignedOut: string;
};

const vi: NavMessages = {
  mainNavAria: "Điều hướng chính",
  mobileMenuAria: "Menu di động",
  brandEyebrow: "Thiệp mời trực tuyến",
  brandName: "Lumiere",
  navHome: "Trang chủ",
  navTemplates: "Mẫu giao diện",
  navWhyUs: "Vì sao chọn chúng tôi",
  navFeatures: "Trải nghiệm",
  navPricing: "Bảng giá",
  navFeedback: "Phản hồi",
  navContact: "Liên hệ",
  navLogin: "Đăng nhập",
  lightLabel: "Trắng",
  darkLabel: "Đen",
  openMenu: "Mở menu",
  closeMenu: "Đóng menu",
  accountChipAriaSignedOut: "Đăng nhập hoặc tạo tài khoản",
};

const en: NavMessages = {
  mainNavAria: "Main navigation",
  mobileMenuAria: "Mobile menu",
  brandEyebrow: "Online wedding invitations",
  brandName: "Lumiere",
  navHome: "Home",
  navTemplates: "Templates",
  navWhyUs: "Why Lumiere",
  navFeatures: "Experience",
  navPricing: "Pricing",
  navFeedback: "Feedback",
  navContact: "Contact",
  navLogin: "Login",
  lightLabel: "Light",
  darkLabel: "Dark",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  accountChipAriaSignedOut: "Sign in or create an account",
};

export const navMessages: Record<AppLanguage, NavMessages> = {
  vi,
  en,
};
