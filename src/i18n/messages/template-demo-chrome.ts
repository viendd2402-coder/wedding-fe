import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplateDemoChromeMessages = {
  backToHome: string;
  contactCta: string;
  musicMute: string;
  musicPlay: string;
};

const vi: TemplateDemoChromeMessages = {
  backToHome: "Quay lại trang chủ",
  contactCta: "Nhận tư vấn mẫu này",
  musicMute: "Tắt nhạc nền",
  musicPlay: "Bật nhạc nền",
};

const en: TemplateDemoChromeMessages = {
  backToHome: "Back to home",
  contactCta: "Get consultation",
  musicMute: "Mute music",
  musicPlay: "Play music",
};

export const templateDemoChromeMessages: Record<AppLanguage, TemplateDemoChromeMessages> =
  { vi, en };
