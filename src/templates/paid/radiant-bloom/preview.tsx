"use client";

import React, { useMemo } from "react";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { defaultGalleryImages, meta } from "./data";
import { serif, sans } from "./components/SharedFonts";

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
    while (list.length < 8) {
      list.push(defaultGalleryImages[list.length % defaultGalleryImages.length]);
    }
    return list.slice(0, 8);
  }, [images.galleryImages]);
  
  return (
    <div className={`min-h-screen text-[#1a1a1a] bg-white relative overflow-hidden ${sans.className} selection:bg-black selection:text-white ${serif.variable} ${sans.variable}`}>
      {/* Structural Background - Minimal lines */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-10">
        <div className="absolute left-[10%] top-0 w-[1px] h-full bg-[#1a1a1a]" />
        <div className="absolute right-[10%] top-0 w-[1px] h-full bg-[#1a1a1a]" />
      </div>

      <Menu isPublicInviteSnapshot={isPublicInviteSnapshot} />

      <Hero preview={preview} cover={cover} />
      <section id="story"><Story preview={preview} /></section>
      <section id="couple" className="bg-[#f9f9f9]"><Couple preview={preview} images={images} /></section>
      <section id="events"><Events preview={preview} /></section>
      <section id="gallery"><Gallery preview={preview} gallery={gallery} onPreviewImage={onPreviewImage} /></section>
      <section id="rsvp" className="bg-[#f9f9f9]"><Rsvp preview={preview} /></section>
      <section id="gift"><Gift preview={preview} /></section>
      <Footer preview={preview} cover={cover} />
    </div>
  );
}
