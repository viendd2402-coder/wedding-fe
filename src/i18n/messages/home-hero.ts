import type { AppLanguage } from "@/components/global-preferences-provider";

export type HomeHeroSpotlightMessages = {
  eyebrow: string;
  title: string;
  body: string;
  openLabel: string;
  viewAll: string;
  tierFree: string;
  tierPremium: string;
  /** Dùng `__N__` cho thứ hạng số. */
  rankLabelTpl: string;
};

const vi: HomeHeroSpotlightMessages = {
  eyebrow: "Phổ biến",
  title: "Mẫu được chọn nhiều nhất",
  body: "Theo lượt chọn của các cặp đôi.",
  openLabel: "Xem mẫu",
  viewAll: "Xem tất cả mẫu giao diện",
  tierFree: "Miễn phí",
  tierPremium: "Trả phí",
  rankLabelTpl: "Hạng __N__",
};

const en: HomeHeroSpotlightMessages = {
  eyebrow: "Popular",
  title: "Most-chosen templates",
  body: "Ranked by couples' choices.",
  openLabel: "Open",
  viewAll: "Browse all templates",
  tierFree: "Free",
  tierPremium: "Premium",
  rankLabelTpl: "#__N__",
};

export const homeHeroSpotlightMessages: Record<AppLanguage, HomeHeroSpotlightMessages> =
  { vi, en };
