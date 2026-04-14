"use client";

import { useSyncExternalStore } from "react";
import {
  getSavedTemplateSlugsSnapshot,
  SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT,
  SAVED_TEMPLATES_CHANGE_EVENT,
  SAVED_TEMPLATE_SLUGS_STORAGE_KEY,
} from "@/lib/saved-template-slugs";

function subscribe(onChange: () => void): () => void {
  const onCustom = () => onChange();
  const onStorage = (e: StorageEvent) => {
    if (e.key === SAVED_TEMPLATE_SLUGS_STORAGE_KEY || e.key === null) onChange();
  };
  window.addEventListener(SAVED_TEMPLATES_CHANGE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(SAVED_TEMPLATES_CHANGE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string[] {
  return getSavedTemplateSlugsSnapshot();
}

function getServerSnapshot(): string[] {
  return SAVED_TEMPLATE_SLUGS_EMPTY_SNAPSHOT;
}

export function useSavedTemplateSlugs(): string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
