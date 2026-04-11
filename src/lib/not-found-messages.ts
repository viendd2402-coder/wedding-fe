import type { AppLanguage } from "@/components/global-preferences-provider";

export const notFoundCopy: Record<
  AppLanguage,
  {
    brand: string;
    kicker: string;
    title: string;
    body: string;
    home: string;
    templates: string;
    whisper: string;
  }
> = {
  vi: {
    brand: "Lumiere",
    kicker: "Lỗi 404",
    title: "Trang này đã lạc đường",
    body:
      "Đường dẫn có thể đã đổi, thiệp đã gỡ, hoặc chỉ là một nhịp gõ nhầm. Hãy quay về nơi ánh sáng dịu — chúng tôi vẫn ở đây cho ngày trọng đại của hai bạn.",
    home: "Về trang chủ",
    templates: "Khám phá mẫu thiệp",
    whisper: "Một khoảnh khắc nhỏ trên hành trình lớn",
  },
  en: {
    brand: "Lumiere",
    kicker: "Error 404",
    title: "This page has wandered off",
    body:
      "The link may have changed, the invitation may have been removed, or the path might hold a small typo. Step back into the light — we are still here for the day you say “I do.”",
    home: "Back to home",
    templates: "Explore templates",
    whisper: "A small pause on a long journey together",
  },
};
