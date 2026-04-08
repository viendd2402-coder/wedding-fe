import type { AppLanguage } from "@/components/global-preferences-provider";

export type SocialCallbackMessages = {
  title: string;
  subtitle: string;
  failedTitle: string;
  backLogin: string;
};

const vi: SocialCallbackMessages = {
  title: "Đang hoàn tất đăng nhập",
  subtitle: "Vui lòng đợi trong giây lát…",
  failedTitle: "Không thể đăng nhập mạng xã hội",
  backLogin: "Quay lại đăng nhập",
};

const en: SocialCallbackMessages = {
  title: "Finishing sign in",
  subtitle: "Please wait a moment…",
  failedTitle: "Social sign-in failed",
  backLogin: "Back to sign in",
};

export const socialCallbackMessages: Record<AppLanguage, SocialCallbackMessages> = {
  vi,
  en,
};
