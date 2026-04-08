import type { AppLanguage } from "@/components/global-preferences-provider";

export type SiteMetaMessages = {
  title: string;
  description: string;
};

export const siteMetaByLocale: Record<AppLanguage, SiteMetaMessages> = {
  vi: {
    title: "Lumiere Wedding Websites",
    description:
      "Thiệp mời trực tuyến tinh tế — chọn phong cách phù hợp, chia sẻ dễ dàng và hoàn thiện cùng đội ngũ Lumiere.",
  },
  en: {
    title: "Lumiere Wedding Websites",
    description:
      "Refined online wedding invitations—choose a style that fits, share effortlessly, and polish your site with the Lumiere team.",
  },
};
