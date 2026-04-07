"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";

export type { TemplatePreviewProps } from "@/templates/preview-types";

export const minimalMuseTimeline = [
  {
    year: "2021",
    title: "Lần đầu gặp nhau",
    description:
      "Chúng mình gặp nhau trong một buổi chiều rất bình thường, nhưng cuộc trò chuyện hôm đó lại mở ra một hành trình đặc biệt.",
  },
  {
    year: "2023",
    title: "Cùng nhau trưởng thành",
    description:
      "Từ những chuyến đi ngắn cho đến những dự định dài lâu, cả hai học cách đồng hành và thấu hiểu nhau hơn mỗi ngày.",
  },
  {
    year: "2026",
    title: "Lời hứa trăm năm",
    description:
      "Sau nhiều kỷ niệm đẹp, chúng mình quyết định viết tiếp câu chuyện này bằng một đám cưới ấm áp và gần gũi.",
  },
];

export const minimalMuseEvents = [
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

export const minimalMuseGallery = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
];

const heartParticles = [
  { left: "4%", delay: "0s", duration: "10s", size: "24px", opacity: 0.28 },
  { left: "12%", delay: "1.5s", duration: "12s", size: "18px", opacity: 0.22 },
  { left: "24%", delay: "4s", duration: "11s", size: "28px", opacity: 0.26 },
  { left: "36%", delay: "2.25s", duration: "13s", size: "20px", opacity: 0.18 },
  { left: "48%", delay: "6s", duration: "10.5s", size: "30px", opacity: 0.24 },
  { left: "61%", delay: "3.2s", duration: "12.5s", size: "22px", opacity: 0.22 },
  { left: "72%", delay: "0.8s", duration: "11.5s", size: "18px", opacity: 0.2 },
  { left: "83%", delay: "5.4s", duration: "13.5s", size: "26px", opacity: 0.26 },
  { left: "92%", delay: "2.8s", duration: "10.8s", size: "21px", opacity: 0.18 },
];

export function MinimalMuseHeader({ tier }: { tier: string }) {
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

export function MinimalMuseMusicPlayer({
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

    if (!audio) {
      return;
    }

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

    if (!audio) {
      return;
    }

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

export function MinimalMuseFallingHearts({ color }: { color: string }) {
  return (
    <>
      <style jsx global>{`
        @keyframes falling-heart-minimal-muse {
          0% {
            transform: translate3d(0, -12vh, 0) rotate(0deg) scale(0.9);
          }
          100% {
            transform: translate3d(18px, 110vh, 0) rotate(18deg) scale(1.08);
          }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {heartParticles.map((heart, index) => (
          <span
            key={`${heart.left}-${index}`}
            className="absolute -top-16 select-none"
            style={{
              left: heart.left,
              animationName: "falling-heart-minimal-muse",
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              fontSize: heart.size,
              opacity: heart.opacity + 0.18,
              color,
              textShadow: "0 4px 12px rgba(255,255,255,0.35)",
            }}
          >
            ♥
          </span>
        ))}
      </div>
    </>
  );
}
