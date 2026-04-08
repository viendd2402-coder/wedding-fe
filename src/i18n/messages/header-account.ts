import type { AppLanguage } from "@/components/global-preferences-provider";

export type HeaderAccountMessages = {
  openMenu: string;
  viewProfile: string;
  myInvitations: string;
  logout: string;
};

const vi: HeaderAccountMessages = {
  openMenu: "Menu tài khoản",
  viewProfile: "Xem hồ sơ",
  myInvitations: "Mẫu thiệp cưới đã tạo",
  logout: "Đăng xuất",
};

const en: HeaderAccountMessages = {
  openMenu: "Account menu",
  viewProfile: "View profile",
  myInvitations: "Wedding invitations I created",
  logout: "Log out",
};

export const headerAccountMessages: Record<AppLanguage, HeaderAccountMessages> = {
  vi,
  en,
};
