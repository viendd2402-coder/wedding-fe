"use client";

import React, { useMemo } from "react";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { etherealWhisperPreviewImages } from "./data";
import { sans } from "./components/SharedFonts";

// Sub-components
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Couple } from "./components/Couple";
import { Countdown } from "./components/Countdown";
import { Events } from "./components/Events";
import { Gallery } from "./components/Gallery";
import { Rsvp } from "./components/Rsvp";
import { Gift } from "./components/Gift";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";

export default function EtherealWhisperPreview({
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot,
}: TemplatePreviewProps) {
  const cover = images.coverImage || etherealWhisperPreviewImages.coverImage;
  const gallery = useMemo(() => {
    const list = [...images.galleryImages];
    while (list.length < 5) {
      list.push(etherealWhisperPreviewImages.galleryImages[list.length % etherealWhisperPreviewImages.galleryImages.length]);
    }
    return list;
  }, [images.galleryImages]);

  return (
    <div className={`min-h-screen text-[#4A4F55] relative overflow-hidden ${sans.className} selection:bg-white/50 selection:text-[#4A4F55]`}>
      {/* Fixed Ethereal Background */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src={cover}
          alt="Background"
          className="w-full h-full object-cover object-center filter blur-[100px] scale-125 opacity-60 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F7]/80 via-[#F3F6FA]/90 to-[#FAF0F5]/80" />
      </div>

      <Menu isPublicInviteSnapshot={isPublicInviteSnapshot} />

      <Hero preview={preview} cover={cover} />
      <Story preview={preview} />
      {preview.countdownTarget && <Countdown targetDate={preview.countdownTarget} />}
      <Couple preview={preview} images={images} />
      <Events preview={preview} />
      <Gallery preview={preview} gallery={gallery} onPreviewImage={onPreviewImage} />
      <Rsvp preview={preview} />
      <Gift preview={preview} />
      <Footer preview={preview} />
    </div>
  );
}
