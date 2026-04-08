import type { AppLanguage } from "@/components/global-preferences-provider";

export type ContactDockMessages = {
  groupAria: string;
  zalo: string;
  tiktok: string;
  phone: string;
};

export function contactDockMessages(
  lang: AppLanguage,
  phoneDisplay: string,
): ContactDockMessages {
  if (lang === "vi") {
    return {
      groupAria: "Liên hệ nhanh",
      zalo: "Chat Zalo",
      tiktok: "TikTok Lumiere",
      phone: `Gọi ${phoneDisplay}`,
    };
  }
  return {
    groupAria: "Quick contact",
    zalo: "Chat on Zalo",
    tiktok: "Lumiere on TikTok",
    phone: `Call ${phoneDisplay}`,
  };
}
