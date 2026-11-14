import type { AppLanguage } from "@/components/global-preferences-provider";

export type SocialProofMessages = {
  justCreated: string;
  justNow: string;
  close: string;
  regionAria: string;
};

export const socialProofMessages: Record<AppLanguage, SocialProofMessages> = {
  vi: {
    justCreated: "vừa tạo xong thiệp",
    justNow: "Vừa xong",
    close: "Đóng thông báo",
    regionAria: "Hoạt động gần đây",
  },
  en: {
    justCreated: "just created an invitation with",
    justNow: "Just now",
    close: "Dismiss notification",
    regionAria: "Recent activity",
  },
};
