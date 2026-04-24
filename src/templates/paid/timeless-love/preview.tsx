"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import { timelessLovePreviewMessages } from "@/i18n/messages/template-previews/timeless-love";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import { defaultGalleryImages } from "./data";

const serifFont = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-tl-serif",
});

const sansFont = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500"],
  variable: "--font-tl-sans",
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tl-script",
});

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const calculateTimeLeft = (target: string) => {
  const difference = +new Date(target) - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

// Utilities
const goldGradientText = "bg-gradient-to-r from-[#B99A5B] via-[#DBC286] to-[#B99A5B] bg-clip-text text-transparent";

export function TimelessLovePreview({
  template,
  preview,
  images,
  onPreviewImage,
  isPublicInviteSnapshot = false,
}: TemplatePreviewProps) {
  const { language } = useGlobalPreferences();
  const copy = timelessLovePreviewMessages[language];

  const defaultCover = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80";
  const cover = images.coverImage || defaultCover;
  
  const gallery = useMemo(() => {
    const list = [...images.galleryImages];
    while (list.length < 8) {
      list.push(defaultGalleryImages[list.length % defaultGalleryImages.length]);
    }
    return list.slice(0, 8);
  }, [images.galleryImages]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [copied, setCopied] = useState<"groom" | "bride" | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  // Scroll Parallax for Hero
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    setIsClient(true);
    // Simulate initial loading screen
    const timeout = setTimeout(() => setShowLoading(false), 2000);
    
    setTimeLeft(calculateTimeLeft(preview.countdownTarget));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(preview.countdownTarget));
    }, 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [preview.countdownTarget]);

  const brideGift = useMemo(
    () => ({
      bankName: preview.tlBrideBankName?.trim() || preview.bankName,
      accountName: preview.tlBrideAccountName?.trim() || preview.accountName,
      accountNumber: preview.tlBrideAccountNumber?.trim() || preview.accountNumber,
    }),
    [preview]
  );

  const handleCopy = async (side: "groom" | "bride", text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ""));
      setCopied(side);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const ceremTime = preview.tlCeremonyTime?.trim() || preview.ceremonyTime;
  const ceremVenue = preview.tlCeremonyVenue?.trim() || preview.venue;
  const ceremLocation = preview.tlCeremonyLocation?.trim() || preview.location;

  const recTime = preview.tlReceptionTime?.trim() || preview.partyTime;
  const recVenue = preview.tlReceptionVenue?.trim() || preview.venue;
  const recLocation = preview.tlReceptionLocation?.trim() || preview.location;

  return (
    <div
      className={`${serifFont.variable} ${sansFont.variable} ${scriptFont.variable} bg-[#FAF9F6] text-[#3D3935] scroll-smooth min-h-screen relative selection:bg-[#B99A5B] selection:text-white overflow-x-hidden`}
      style={{ fontFamily: "var(--font-tl-sans)" }}
    >
      <AnimatePresence>
        {showLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#FAF9F6] flex items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <div className="font-script text-6xl text-[#B99A5B] mb-4" style={{ fontFamily: "var(--font-tl-script)" }}>
                {preview.groom.charAt(0)} & {preview.bride.charAt(0)}
              </div>
              <div className="text-[#7A756D] text-[10px] uppercase tracking-[0.4em]">Forever & Always</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-xl border border-[#E8E4DA] rounded-full px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center space-x-8 text-[10px] uppercase tracking-[0.2em] text-[#7A756D]">
          <a href="#couple" className="hover:text-[#B99A5B] transition-colors duration-300 hidden md:block">{copy.navCouple}</a>
          <a href="#events" className="hover:text-[#B99A5B] transition-colors duration-300">{copy.navEvents}</a>
          <a href="#gallery" className="hover:text-[#B99A5B] transition-colors duration-300">{copy.navGallery}</a>
          <a href="#rsvp" className="hover:text-[#B99A5B] transition-colors duration-300">{copy.navRsvp}</a>
          <a href="#registry" className="hover:text-[#B99A5B] transition-colors duration-300 hidden md:block">{copy.navGift}</a>
          {!isPublicInviteSnapshot && (
            <Link href="/" className="ml-4 px-5 py-2 border border-[#B99A5B] text-[#B99A5B] hover:bg-[#B99A5B] hover:text-white transition-colors duration-300 rounded-full font-medium">
              Trang chủ
            </Link>
          )}
        </div>
      </motion.nav>

      <main>
        {/* Cinematic Hero Section */}
        <section className="relative w-full h-screen overflow-hidden bg-[#FAF9F6]">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="Cover" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#FAF9F6]" />
          </motion.div>
          
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pt-20">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-[#7A756D] text-[11px] uppercase tracking-[0.5em] font-light mb-12"
            >
              {preview.tlHeroSubtitle?.trim() || copy.tlHeroSubtitle}
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative"
            >
              <motion.h1 variants={fadeUp} className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-[#3D3935] font-light" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.groom}
              </motion.h1>
              <motion.div variants={fadeUp} className={`text-6xl md:text-8xl -my-4 md:-my-8 z-10 relative ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>
                &
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-none text-[#3D3935] font-light" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.bride}
              </motion.h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="mt-16 flex items-center space-x-6"
            >
              <div className="h-px w-16 bg-[#D8D4CC]"></div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#7A756D]">
                {preview.dateLabel} <span className="mx-2 opacity-30">|</span> {preview.location}
              </p>
              <div className="h-px w-16 bg-[#D8D4CC]"></div>
            </motion.div>
          </motion.div>
          
          {/* Decorative bottom mask */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent z-20"></div>
        </section>

        {/* Welcome & Premium Countdown */}
        <section className="py-24 md:py-40 px-6 max-w-5xl mx-auto text-center relative z-30 -mt-10 bg-[#FAF9F6] rounded-t-[50px] md:rounded-t-[100px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className={`text-5xl md:text-6xl mb-8 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>
              Celebrate with us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-[#3D3935] mb-12 leading-[1.3] max-w-3xl mx-auto" style={{ fontFamily: "var(--font-tl-serif)" }}>
              "{preview.tlWelcomeTitle?.trim() || copy.tlWelcomeTitle}"
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm md:text-base text-[#7A756D] leading-loose font-light max-w-2xl mx-auto mb-24">
              {preview.tlWelcomeText?.trim() || copy.tlWelcomeText}
            </motion.p>

            {/* Premium Countdown */}
            {isClient && (
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 md:gap-10">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="relative group w-24 h-32 md:w-32 md:h-40 flex flex-col items-center justify-center bg-white rounded-t-full shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#E8E4DA] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B99A5B]/5 group-hover:to-[#B99A5B]/10 transition-colors duration-500"></div>
                    <span className="text-4xl md:text-5xl font-serif text-[#3D3935] mb-2 z-10" style={{ fontFamily: "var(--font-tl-serif)" }}>{item.value}</span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#B99A5B] font-medium z-10">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* The Couple - Elegant Cards */}
        <section id="couple" className="py-24 md:py-32 bg-white relative">
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-24"
            >
               <h3 className={`text-5xl md:text-6xl mb-4 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>
                {preview.tlCoupleTitle?.trim() || "The Couple"}
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-full max-w-md aspect-[3/4] relative p-3 border border-[#E8E4DA] bg-[#FAF9F6] rounded-sm mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images.groomPortraitImage || gallery[0]} alt="Groom" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute -bottom-6 bg-white px-6 py-2 border border-[#E8E4DA] left-1/2 -translate-x-1/2 whitespace-nowrap shadow-sm">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99A5B]">{copy.groom}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-serif text-[#3D3935] mb-4" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.groom}</h3>
                <p className="text-[#7A756D] text-sm font-light leading-loose text-center max-w-sm">
                  {preview.tlGroomBio || "Một nửa tuyệt vời, người mang đến sự bình yên và yêu thương mỗi ngày."}
                </p>
              </motion.div>

              {/* Bride */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center md:mt-32"
              >
                <div className="w-full max-w-md aspect-[3/4] relative p-3 border border-[#E8E4DA] bg-[#FAF9F6] rounded-sm mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images.bridePortraitImage || gallery[1]} alt="Bride" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute -bottom-6 bg-white px-6 py-2 border border-[#E8E4DA] left-1/2 -translate-x-1/2 whitespace-nowrap shadow-sm">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99A5B]">{copy.bride}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-serif text-[#3D3935] mb-4" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.bride}</h3>
                <p className="text-[#7A756D] text-sm font-light leading-loose text-center max-w-sm">
                  {preview.tlBrideBio || "Cô gái hay cười, luôn tìm thấy niềm vui trong những điều giản dị."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wedding Events - Split Minimal */}
        <section id="events" className="py-24 md:py-40 bg-[#FAF9F6] relative border-y border-[#E8E4DA]">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#B99A5B] mb-6">Details</p>
              <h3 className="text-5xl md:text-7xl font-serif text-[#3D3935] mb-8 leading-[1.1]" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlEventsTitle?.trim() || copy.tlEventsTitle}
              </h3>
              <p className="text-[#7A756D] font-light text-lg max-w-md leading-loose">{preview.tlEventsLead?.trim() || copy.tlEventsLead}</p>
            </motion.div>

            <div className="space-y-8">
              {/* Ceremony Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="bg-white p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border-l-4 border-[#B99A5B] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B99A5B" strokeWidth="1"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                </div>
                <p className={`text-4xl mb-4 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>{copy.ceremony}</p>
                <p className="text-2xl text-[#3D3935] mb-4 font-serif" style={{ fontFamily: "var(--font-tl-serif)" }}>{ceremTime}</p>
                <div className="text-[#7A756D] text-sm leading-relaxed mb-8">
                  <p className="font-medium text-[#3D3935] mb-1 text-lg">{ceremVenue}</p>
                  <p>{ceremLocation}</p>
                </div>
                <button className="bg-[#3D3935] text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-[#B99A5B] transition-colors">
                  {copy.addCalendar}
                </button>
              </motion.div>

              {/* Reception Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="bg-white p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border-l-4 border-[#B99A5B] relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#B99A5B" strokeWidth="1"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"/></svg>
                </div>
                <p className={`text-4xl mb-4 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>{copy.reception}</p>
                <p className="text-2xl text-[#3D3935] mb-4 font-serif" style={{ fontFamily: "var(--font-tl-serif)" }}>{recTime}</p>
                <div className="text-[#7A756D] text-sm leading-relaxed mb-8">
                  <p className="font-medium text-[#3D3935] mb-1 text-lg">{recVenue}</p>
                  <p>{recLocation}</p>
                </div>
                <button className="bg-[#3D3935] text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-[#B99A5B] transition-colors">
                  {copy.mapCta}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery - Editorial Collage */}
        <section id="gallery" className="py-24 md:py-40 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-20"
            >
              <h3 className={`text-5xl md:text-6xl mb-4 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>
                {preview.tlGalleryTitle?.trim() || copy.tlGalleryTitle}
              </h3>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {gallery.map((src, idx) => {
                let spanClass = "col-span-1";
                let aspectClass = "aspect-[3/4]";
                
                if (idx === 0) { spanClass = "col-span-2 row-span-2"; aspectClass = "aspect-[3/4] md:h-full"; }
                if (idx === 3) { spanClass = "col-span-2"; aspectClass = "aspect-[16/9] md:aspect-[16/9]"; }
                if (idx === 4) { spanClass = "col-span-2"; aspectClass = "aspect-[16/9] md:aspect-[16/9]"; }
                if (idx === 7) { spanClass = "col-span-2 row-span-2"; aspectClass = "aspect-[3/4] md:h-full"; }

                return (
                  <motion.div 
                    variants={fadeUp}
                    key={idx} 
                    className={`relative cursor-pointer overflow-hidden group ${spanClass}`}
                    onClick={() => onPreviewImage({ src, alt: `Gallery image ${idx + 1}` })}
                  >
                    <div className={`${aspectClass} w-full bg-[#FAF9F6] p-2 border border-[#E8E4DA]`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={src} 
                        alt="" 
                        className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105 filter grayscale hover:grayscale-0"
                      />
                      <div className="absolute inset-0 border border-[#B99A5B]/40 z-20 m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* RSVP Form - Luxury Glass Card */}
        <section id="rsvp" className="py-32 md:py-48 bg-[#FAF9F6] relative border-y border-[#E8E4DA]">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-white p-10 md:p-20 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-[#E8E4DA] rounded-[40px] text-center" 
            >
              <h4 className="text-4xl md:text-6xl font-serif text-[#3D3935] mb-4" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlRsvpTitle?.trim() || copy.tlRsvpTitle}
              </h4>
              <p className="text-[#7A756D] font-light text-sm mb-16">{preview.tlRsvpLead?.trim() || copy.tlRsvpLead}</p>

              <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input type="text" id="name" placeholder=" " className="peer w-full bg-transparent border-b border-[#D8D4CC] py-4 text-[#3D3935] focus:outline-none focus:border-[#B99A5B] transition-all text-lg placeholder-transparent" />
                  <label htmlFor="name" className="absolute left-0 top-4 text-[#A4A7A5] text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B99A5B] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">{copy.namePh}</label>
                </div>
                <div className="relative">
                  <input type="text" id="contact" placeholder=" " className="peer w-full bg-transparent border-b border-[#D8D4CC] py-4 text-[#3D3935] focus:outline-none focus:border-[#B99A5B] transition-all text-lg placeholder-transparent" />
                  <label htmlFor="contact" className="absolute left-0 top-4 text-[#A4A7A5] text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#B99A5B] peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">{copy.contactPh}</label>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="button" onClick={() => setAttending("yes")} className={`flex-1 py-5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border ${attending === "yes" ? "bg-[#3D3935] text-white border-[#3D3935]" : "bg-transparent border-[#D8D4CC] text-[#3D3935] hover:border-[#3D3935]"}`}>
                    {copy.attending}
                  </button>
                  <button type="button" onClick={() => setAttending("no")} className={`flex-1 py-5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border ${attending === "no" ? "bg-[#B99A5B] text-white border-[#B99A5B]" : "bg-transparent border-[#D8D4CC] text-[#3D3935] hover:border-[#3D3935]"}`}>
                    {copy.decline}
                  </button>
                </div>

                <div className="pt-6">
                  <textarea placeholder={copy.wishPh} rows={3} className="w-full bg-[#FAF9F6] border border-[#D8D4CC] rounded-2xl py-4 px-6 text-[#3D3935] focus:outline-none focus:border-[#B99A5B] transition-all resize-none mt-2 text-sm"></textarea>
                </div>
                
                <div className="pt-8 text-center">
                  <button type="submit" className="bg-[#B99A5B] text-white px-16 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-[#3D3935] transition-colors duration-500 w-full md:w-auto shadow-[0_10px_30px_rgba(185,154,91,0.3)]">
                    {copy.submit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Registry / Gifts */}
        <section id="registry" className="py-24 md:py-32 bg-white relative">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h3 className={`text-5xl md:text-6xl mb-4 ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>
                {preview.tlGiftTitle?.trim() || copy.tlGiftTitle}
              </h3>
              <p className="text-[#7A756D] mb-20 font-light text-sm max-w-xl mx-auto">{preview.tlGiftLead?.trim() || copy.tlGiftLead}</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#FAF9F6] p-12 md:p-16 border border-[#E8E4DA] flex flex-col items-center relative overflow-hidden group">
                <div className="absolute inset-0 border-4 border-white m-2 pointer-events-none"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99A5B] mb-8 relative z-10">{copy.giftGroom}</span>
                <p className="text-2xl font-serif text-[#3D3935] mb-2 relative z-10" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.bankName}</p>
                <p className="text-[#7A756D] font-light mb-8 text-sm relative z-10">{preview.accountName}</p>
                <p className="text-xl md:text-2xl font-light text-[#3D3935] mb-12 tracking-[0.2em] relative z-10">{preview.accountNumber}</p>
                <button onClick={() => handleCopy("groom", preview.accountNumber)} className="mt-auto bg-white border border-[#E8E4DA] text-[#3D3935] px-10 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] hover:bg-[#B99A5B] hover:border-[#B99A5B] hover:text-white transition-colors duration-300 relative z-10">
                  {copied === "groom" ? copy.copied : copy.copyNumber}
                </button>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="bg-[#FAF9F6] p-12 md:p-16 border border-[#E8E4DA] flex flex-col items-center relative overflow-hidden group">
                <div className="absolute inset-0 border-4 border-white m-2 pointer-events-none"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B99A5B] mb-8 relative z-10">{copy.giftBride}</span>
                <p className="text-2xl font-serif text-[#3D3935] mb-2 relative z-10" style={{ fontFamily: "var(--font-tl-serif)" }}>{brideGift.bankName}</p>
                <p className="text-[#7A756D] font-light mb-8 text-sm relative z-10">{brideGift.accountName}</p>
                <p className="text-xl md:text-2xl font-light text-[#3D3935] mb-12 tracking-[0.2em] relative z-10">{brideGift.accountNumber}</p>
                <button onClick={() => handleCopy("bride", brideGift.accountNumber)} className="mt-auto bg-white border border-[#E8E4DA] text-[#3D3935] px-10 py-3 rounded-full text-[9px] uppercase tracking-[0.2em] hover:bg-[#B99A5B] hover:border-[#B99A5B] hover:text-white transition-colors duration-300 relative z-10">
                  {copied === "bride" ? copy.copied : copy.copyNumber}
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-32 text-center px-6 relative overflow-hidden bg-[#FAF9F6]">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt="Footer Background" className="w-full h-full object-cover opacity-30 filter grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/80 to-[#FAF9F6]/90"></div>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative z-10">
          <div className="w-12 h-12 border border-[#B99A5B] rotate-45 mx-auto mb-16 flex items-center justify-center">
            <div className="w-8 h-8 border border-[#B99A5B]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-[#3D3935] mb-10 font-light" style={{ fontFamily: "var(--font-tl-serif)" }}>
            {preview.groom} <span className={`text-6xl ${goldGradientText}`} style={{ fontFamily: "var(--font-tl-script)" }}>&</span> {preview.bride}
          </h2>
          <p className="text-[#7A756D] font-light tracking-[0.1em] text-sm max-w-lg mx-auto leading-loose uppercase">
            {preview.tlFooterThanks?.trim() || copy.tlFooterThanks}
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
