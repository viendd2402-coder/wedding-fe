"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";

export type { TemplatePreviewProps } from "@/templates/preview-types";

export const azurePromiseEvents = [
  {
    label: "Lễ thành hôn",
    timeKey: "ceremonyTime" as const,
    place: "Nhà thờ Chính Tòa Đà Nẵng",
    address: "156 Trần Phú, Hải Châu, Đà Nẵng",
  },
  {
    label: "Tiệc cưới",
    timeKey: "partyTime" as const,
    place: "Riverside Garden",
    address: "02 Bạch Đằng, Hải Châu, Đà Nẵng",
  },
];

export const azurePromiseGallery = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
];

export function AzurePromiseHeader({ tier }: { tier: string }) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const backLabel = language === "vi" ? "Quay lại trang chủ" : "Back to home";
  const contactLabel =
    language === "vi" ? "Nhận tư vấn mẫu này" : "Get consultation";

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-10 sm:py-8 lg:px-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="btn-secondary inline-flex w-fit rounded-full px-5 py-3 text-sm font-medium backdrop-blur"
        >
          {backLabel}
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.25em]"
            style={{
              backgroundColor:
                tier === "Miễn phí"
                  ? "rgba(125, 140, 121, 0.12)"
                  : "rgba(197, 167, 161, 0.16)",
              color:
                tier === "Miễn phí"
                  ? "var(--color-sage)"
                  : "var(--color-rose)",
            }}
          >
            {tier}
          </span>
          <Link
            href="/#contact"
            className="btn-primary inline-flex rounded-full px-5 py-3 text-sm font-medium"
            style={
              isDark
                ? {
                    boxShadow: "0 14px 32px rgba(0,0,0,0.28)",
                  }
                : undefined
            }
          >
            {contactLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AzurePromiseMusicPlayer({
  label,
  accentClassName,
}: {
  label: string;
  accentClassName: string;
}) {
  const { language } = useGlobalPreferences();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }
    audio.pause();
  };

  return (
    <div className="flex max-w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cb/A_Midsummer_Night%27s_Dream_Op._61_Wedding_March_%28Mendelssohn%29_European_Archive.ogg"
      />
      <button
        type="button"
        onClick={togglePlayback}
        className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/82 px-5 py-3 text-sm font-medium text-[var(--color-ink)] shadow-[0_12px_30px_rgba(49,42,40,0.08)] backdrop-blur transition hover:scale-[1.01]"
      >
        <span
          className={`inline-flex h-2.5 w-2.5 rounded-full ${
            isPlaying ? accentClassName : "bg-[var(--color-ink)]/20"
          }`}
        />
        <span>
          {language === "vi"
            ? isPlaying
              ? "Tắt nhạc nền"
              : "Bật nhạc nền"
            : isPlaying
              ? "Mute music"
              : "Play music"}
        </span>
      </button>
      <p className="hidden text-xs uppercase tracking-[0.22em] text-[var(--color-ink)]/48 sm:block">
        {label}
      </p>
    </div>
  );
}
