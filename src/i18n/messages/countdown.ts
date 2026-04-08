import type { AppLanguage } from "@/components/global-preferences-provider";

export type CountdownMessages = {
  day: string;
  hour: string;
  minute: string;
  second: string;
};

const vi: CountdownMessages = {
  day: "Ngày",
  hour: "Giờ",
  minute: "Phút",
  second: "Giây",
};

const en: CountdownMessages = {
  day: "Days",
  hour: "Hours",
  minute: "Minutes",
  second: "Seconds",
};

export const countdownMessages: Record<AppLanguage, CountdownMessages> = {
  vi,
  en,
};
