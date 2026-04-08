"use client";

import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { messagesByLocale, type Messages } from "@/i18n/catalog";

export function useMessages(): Messages {
  const { language } = useGlobalPreferences();
  return messagesByLocale[language];
}
