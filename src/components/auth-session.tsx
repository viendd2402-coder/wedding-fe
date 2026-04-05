"use client";

import { useRouter } from "next/navigation";
import { useCallback, useSyncExternalStore } from "react";
import {
  clearStoredAuthToken,
  getAuthSessionMarker,
  LUMIERE_AUTH_CHANGE_EVENT,
} from "@/lib/auth-client";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const run = () => onStoreChange();
  window.addEventListener("storage", run);
  window.addEventListener(LUMIERE_AUTH_CHANGE_EVENT, run);
  return () => {
    window.removeEventListener("storage", run);
    window.removeEventListener(LUMIERE_AUTH_CHANGE_EVENT, run);
  };
}

export function useAuthSession() {
  const marker = useSyncExternalStore(subscribe, getAuthSessionMarker, () => "");
  const signedIn = marker.length > 0;
  return { signedIn };
}

export function useLogout() {
  const router = useRouter();
  return useCallback(() => {
    clearStoredAuthToken();
    router.push("/");
    router.refresh();
  }, [router]);
}
