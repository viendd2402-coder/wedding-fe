"use client";

import React, { useMemo } from "react";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { defaultGalleryImages, meta } from "./data";
import { sans } from "./components/SharedFonts";

import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Couple } from "./components/Couple";
import { Events } from "./components/Events";
import { Gallery } from "./components/Gallery";
import { Rsvp } from "./components/Rsvp";
import { Gift } from "./components/Gift";
import { Footer } from "./components/Footer";
import { Menu } from "./components/Menu";

export function RadiantBloomPreview({
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot,
}: TemplatePreviewProps) {
  const cover = images.coverImage || meta.image;
  
  const gallery = useMemo(() => {
    const list = [...images.galleryImages];
    while (list.length < 6) {
      list.push(defaultGalleryImages[list.length % defaultGalleryImages.length]);
    }
    return list;
  }, [images.galleryImages]);
  
  return (
    <div className={`min-h-screen text-[#1a1a1a] bg-[#FDFBF7] relative overflow-hidden ${sans.className} selection:bg-[#FF4D4D] selection:text-white`}>
      {/* Editorial Abstract Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Abstract "Bloom" gradient meshes */}
        <div className="absolute top-[-20vh] right-[-10vw] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#FF4D4D]/20 to-[#FF8C42]/20 blur-[120px] mix-blend-multiply opacity-60" />
        <div className="absolute top-[40vh] left-[-20vw] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#FF1493]/10 to-[#FF4D4D]/10 blur-[100px] mix-blend-multiply opacity-50" />
      </div>

      <Menu isPublicInviteSnapshot={isPublicInviteSnapshot} />

      <Hero preview={preview} cover={cover} />
      <div id="story"><Story preview={preview} /></div>
      <div id="couple"><Couple preview={preview} images={images} /></div>
      <div id="events"><Events preview={preview} /></div>
      <div id="gallery"><Gallery preview={preview} gallery={gallery} onPreviewImage={onPreviewImage} /></div>
      <div id="rsvp"><Rsvp preview={preview} /></div>
      <div id="gift"><Gift preview={preview} /></div>
      <Footer preview={preview} />
    </div>
  );
}
