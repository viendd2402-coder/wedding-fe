"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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
  const cover = images.coverImage || template.thumbnailUrl || defaultCover;
  
  const gallery = useMemo(() => {
    const list = [...images.galleryImages];
    while (list.length < 6) {
      list.push(defaultGalleryImages[list.length % defaultGalleryImages.length]);
    }
    return list.slice(0, 6);
  }, [images.galleryImages]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft(preview.countdownTarget));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(preview.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, [preview.countdownTarget]);

  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const brideGift = useMemo(
    () => ({
      bankName: preview.tlBrideBankName?.trim() || preview.bankName,
      accountName: preview.tlBrideAccountName?.trim() || preview.accountName,
      accountNumber: preview.tlBrideAccountNumber?.trim() || preview.accountNumber,
    }),
    [preview]
  );

  const [copied, setCopied] = useState<"groom" | "bride" | null>(null);

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
      className={`${serifFont.variable} ${sansFont.variable} ${scriptFont.variable} bg-[#F9F8F6] text-[#3D3935] scroll-smooth min-h-screen relative selection:bg-[#BCA37F] selection:text-white overflow-x-hidden`}
      style={{ fontFamily: "var(--font-tl-sans)" }}
    >
      {/* Delicate Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#F9F8F6]/80 backdrop-blur-md border-b border-[#EBE7DF]"
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
          <div className="hidden md:flex space-x-10">
            <a href="#couple" className="hover:text-[#BCA37F] transition-colors duration-300">{copy.navCouple}</a>
            <a href="#events" className="hover:text-[#BCA37F] transition-colors duration-300">{copy.navEvents}</a>
          </div>
          <div className="font-script text-3xl text-[#BCA37F] lowercase" style={{ fontFamily: "var(--font-tl-script)" }}>
            {preview.groom.charAt(0)} & {preview.bride.charAt(0)}
          </div>
          <div className="hidden md:flex space-x-10 items-center">
            <a href="#gallery" className="hover:text-[#BCA37F] transition-colors duration-300">{copy.navGallery}</a>
            <a href="#rsvp" className="hover:text-[#BCA37F] transition-colors duration-300">{copy.navRsvp}</a>
            <a href="#registry" className="hover:text-[#BCA37F] transition-colors duration-300">{copy.navGift}</a>
            {!isPublicInviteSnapshot && (
              <Link href="/" className="ml-4 px-4 py-2 border border-[#3D3935] hover:bg-[#3D3935] hover:text-white transition-colors duration-300 rounded-full">
                Trang chủ
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Framed Hero Section with Arch */}
        <section className="relative w-full min-h-[95vh] pt-24 pb-8 px-4 md:px-8 flex flex-col items-center justify-center bg-[#F9F8F6]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full max-w-5xl aspect-[3/4] md:aspect-[16/9] overflow-hidden rounded-t-[50vw] md:rounded-t-[30vw] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-8 border-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.p variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-light mb-8 text-[#F9F8F6]">
                  {preview.tlHeroSubtitle?.trim() || copy.tlHeroSubtitle}
                </motion.p>
                <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 font-normal" style={{ fontFamily: "var(--font-tl-serif)" }}>
                  {preview.groom}
                </motion.h1>
                <motion.div variants={fadeUp} className="text-4xl md:text-6xl text-[#E8DAC2] mb-4" style={{ fontFamily: "var(--font-tl-script)" }}>
                  and
                </motion.div>
                <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-12 font-normal" style={{ fontFamily: "var(--font-tl-serif)" }}>
                  {preview.bride}
                </motion.h1>
                <motion.div variants={fadeUp} className="w-px h-16 bg-white/50 mx-auto mb-8"></motion.div>
                <motion.p variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light text-[#F9F8F6]">
                  {preview.dateLabel} <span className="mx-3">•</span> {preview.location}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Welcome & Countdown - Soft Floral Layout */}
        <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto text-center relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-4xl md:text-5xl text-[#BCA37F] mb-6" style={{ fontFamily: "var(--font-tl-script)" }}>
              Join us to celebrate
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-serif text-[#3D3935] mb-10 leading-[1.4]" style={{ fontFamily: "var(--font-tl-serif)" }}>
              {preview.tlWelcomeTitle?.trim() || copy.tlWelcomeTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm md:text-base text-[#7A756D] leading-loose font-light max-w-2xl mx-auto mb-20">
              {preview.tlWelcomeText?.trim() || copy.tlWelcomeText}
            </motion.p>

            {/* Countdown Circles */}
            {isClient && (
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 md:gap-12">
                {[
                  { label: "Ngày", value: timeLeft.days },
                  { label: "Giờ", value: timeLeft.hours },
                  { label: "Phút", value: timeLeft.minutes },
                  { label: "Giây", value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#EBE7DF] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                    <span className="text-2xl md:text-4xl font-serif text-[#BCA37F]" style={{ fontFamily: "var(--font-tl-serif)" }}>{item.value}</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#7A756D] mt-1">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* The Couple - Romantic Overlapping Arches */}
        <section id="couple" className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#EBE7DF] to-transparent"></div>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-20 md:mb-32"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-[#3D3935]" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlCoupleTitle?.trim() || "Hai tâm hồn"}
              </h3>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-12 lg:gap-24">
              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center text-center w-full max-w-[320px]"
              >
                <div className="relative w-full aspect-[3/4] mb-8 rounded-t-[1000px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] border-[6px] border-white group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images.groomPortraitImage || gallery[0]}
                    alt="Groom"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl font-serif mb-2 text-[#3D3935]" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.groom}</h3>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#BCA37F] mb-4 block">{copy.groom}</span>
                <p className="text-[#7A756D] text-sm font-light leading-loose">
                  {preview.groomBio || "Một nửa tuyệt vời, người mang đến sự bình yên và yêu thương mỗi ngày."}
                </p>
              </motion.div>

              {/* Decorative & */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-7xl text-[#EBE7DF]" 
                style={{ fontFamily: "var(--font-tl-script)" }}
              >
                &
              </motion.div>

              {/* Bride */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center text-center w-full max-w-[320px] md:mt-24"
              >
                <div className="relative w-full aspect-[3/4] mb-8 rounded-t-[1000px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] border-[6px] border-white group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images.bridePortraitImage || gallery[1]}
                    alt="Bride"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <h3 className="text-3xl font-serif mb-2 text-[#3D3935]" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.bride}</h3>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#BCA37F] mb-4 block">{copy.bride}</span>
                <p className="text-[#7A756D] text-sm font-light leading-loose">
                  {preview.brideBio || "Cô gái hay cười, luôn tìm thấy niềm vui trong những điều giản dị."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wedding Events - Timeline Style */}
        <section id="events" className="py-24 md:py-32 bg-[#F9F8F6] relative">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-24"
            >
              <p className="text-3xl md:text-4xl text-[#BCA37F] mb-4" style={{ fontFamily: "var(--font-tl-script)" }}>When & Where</p>
              <h3 className="text-3xl md:text-5xl font-serif text-[#3D3935] mb-6" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlEventsTitle?.trim() || copy.tlEventsTitle}
              </h3>
              <p className="text-[#7A756D] font-light text-sm max-w-xl mx-auto">{preview.tlEventsLead?.trim() || copy.tlEventsLead}</p>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#EBE7DF]"></div>
              
              <div className="space-y-16 md:space-y-0">
                {/* Ceremony */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/2 md:pr-16 text-center md:text-right relative"
                >
                  <div className="hidden md:block absolute top-8 -right-[5px] w-[11px] h-[11px] rounded-full bg-[#BCA37F] shadow-[0_0_0_4px_#F9F8F6]"></div>
                  
                  <div className="bg-white p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#EBE7DF]">
                    <p className="text-[#BCA37F] font-serif text-2xl mb-2" style={{ fontFamily: "var(--font-tl-serif)" }}>{copy.ceremony}</p>
                    <p className="text-xl text-[#3D3935] mb-4 font-light">{ceremTime}</p>
                    <div className="text-[#7A756D] text-sm leading-relaxed mb-6">
                      <p className="font-medium text-[#3D3935] mb-1">{ceremVenue}</p>
                      <p>{ceremLocation}</p>
                    </div>
                    <button className="text-[9px] uppercase tracking-[0.2em] text-[#3D3935] border border-[#EBE7DF] rounded-full px-6 py-2 hover:border-[#BCA37F] hover:text-[#BCA37F] transition-colors">
                      {copy.addCalendar}
                    </button>
                  </div>
                </motion.div>

                {/* Reception */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:w-1/2 md:ml-auto md:pl-16 text-center md:text-left relative md:mt-32"
                >
                  <div className="hidden md:block absolute top-8 -left-[6px] w-[11px] h-[11px] rounded-full bg-[#BCA37F] shadow-[0_0_0_4px_#F9F8F6]"></div>
                  
                  <div className="bg-white p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#EBE7DF]">
                    <p className="text-[#BCA37F] font-serif text-2xl mb-2" style={{ fontFamily: "var(--font-tl-serif)" }}>{copy.reception}</p>
                    <p className="text-xl text-[#3D3935] mb-4 font-light">{recTime}</p>
                    <div className="text-[#7A756D] text-sm leading-relaxed mb-6">
                      <p className="font-medium text-[#3D3935] mb-1">{recVenue}</p>
                      <p>{recLocation}</p>
                    </div>
                    <button className="text-[9px] uppercase tracking-[0.2em] text-[#3D3935] border border-[#EBE7DF] rounded-full px-6 py-2 hover:border-[#BCA37F] hover:text-[#BCA37F] transition-colors">
                      {copy.mapCta}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery - Elegant Masonry */}
        <section id="gallery" className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-20"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-[#3D3935] mb-6" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlGalleryTitle?.trim() || copy.tlGalleryTitle}
              </h3>
              <p className="text-[#7A756D] font-light text-sm max-w-xl mx-auto">{preview.tlGalleryLead?.trim() || copy.tlGalleryLead}</p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            >
              {gallery.map((src, idx) => {
                // Mix of arches and rectangles
                let shapeClass = "rounded-lg";
                let spanClass = "col-span-1";
                let aspectClass = "aspect-[3/4]";
                
                if (idx === 0) { shapeClass = "rounded-t-[500px] rounded-b-lg"; spanClass = "col-span-2 md:col-span-1 row-span-2"; aspectClass = "aspect-[3/4] md:h-full"; }
                if (idx === 1) { aspectClass = "aspect-square"; }
                if (idx === 3) { shapeClass = "rounded-t-[500px] rounded-b-lg"; aspectClass = "aspect-[3/4] md:aspect-[4/5]"; }
                if (idx === 4) { spanClass = "col-span-2 md:col-span-1"; aspectClass = "aspect-[16/9] md:aspect-[4/5]"; }

                return (
                  <motion.div 
                    variants={fadeUp}
                    key={idx} 
                    className={`relative cursor-pointer overflow-hidden group ${spanClass} ${shapeClass}`}
                    onClick={() => onPreviewImage({ src, alt: `Gallery image ${idx + 1}` })}
                  >
                    <div className={`${aspectClass} w-full bg-[#F9F8F6]`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={src} 
                        alt="" 
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#BCA37F]/0 group-hover:bg-[#BCA37F]/10 transition-colors duration-500"></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* RSVP Form - Floating Card */}
        <section id="rsvp" className="py-24 md:py-32 bg-[#F9F8F6] relative">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-white p-10 md:p-16 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#EBE7DF] text-center" 
            >
              <h3 className="text-4xl text-[#BCA37F] mb-4" style={{ fontFamily: "var(--font-tl-script)" }}>
                We'd love for you to come
              </h3>
              <h4 className="text-3xl font-serif text-[#3D3935] mb-4" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlRsvpTitle?.trim() || copy.tlRsvpTitle}
              </h4>
              <p className="text-[#7A756D] font-light text-sm mb-12">{preview.tlRsvpLead?.trim() || copy.tlRsvpLead}</p>

              <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder={copy.namePh} className="w-full bg-[#F9F8F6] rounded-lg border-none py-4 px-6 text-[#3D3935] focus:outline-none focus:ring-1 focus:ring-[#BCA37F] transition-all placeholder:text-[#A0A0A0] text-sm" />
                </div>
                <div>
                  <input type="text" placeholder={copy.contactPh} className="w-full bg-[#F9F8F6] rounded-lg border-none py-4 px-6 text-[#3D3935] focus:outline-none focus:ring-1 focus:ring-[#BCA37F] transition-all placeholder:text-[#A0A0A0] text-sm" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setAttending("yes")}
                    className={`flex-1 py-4 px-6 rounded-lg text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${attending === "yes" ? "bg-[#3D3935] text-white" : "bg-[#F9F8F6] text-[#7A756D] hover:bg-[#EBE7DF]"}`}
                  >
                    {copy.attending}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setAttending("no")}
                    className={`flex-1 py-4 px-6 rounded-lg text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${attending === "no" ? "bg-[#BCA37F] text-white" : "bg-[#F9F8F6] text-[#7A756D] hover:bg-[#EBE7DF]"}`}
                  >
                    {copy.decline}
                  </button>
                </div>

                <div>
                  <textarea placeholder={copy.wishPh} rows={3} className="w-full bg-[#F9F8F6] rounded-lg border-none py-4 px-6 text-[#3D3935] focus:outline-none focus:ring-1 focus:ring-[#BCA37F] transition-all resize-none placeholder:text-[#A0A0A0] mt-2 text-sm"></textarea>
                </div>
                
                <div className="pt-6 text-center">
                  <button type="submit" className="bg-[#3D3935] text-white px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-[#BCA37F] transition-colors duration-500 w-full md:w-auto">
                    {copy.submit}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Registry / Gifts */}
        <section id="registry" className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h3 className="text-3xl md:text-5xl font-serif text-[#3D3935] mb-6" style={{ fontFamily: "var(--font-tl-serif)" }}>
                {preview.tlGiftTitle?.trim() || copy.tlGiftTitle}
              </h3>
              <p className="text-[#7A756D] mb-16 font-light text-sm max-w-xl mx-auto">{preview.tlGiftLead?.trim() || copy.tlGiftLead}</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Groom's Bank */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="bg-[#F9F8F6] p-10 md:p-14 rounded-3xl flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-[#BCA37F]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A756D] mb-6">{copy.giftGroom}</span>
                <p className="text-xl font-serif text-[#3D3935] mb-2" style={{ fontFamily: "var(--font-tl-serif)" }}>{preview.bankName}</p>
                <p className="text-[#7A756D] font-light mb-6 text-sm">{preview.accountName}</p>
                <p className="text-xl md:text-2xl font-light text-[#3D3935] mb-8 tracking-[0.1em]">{preview.accountNumber}</p>
                <button 
                  onClick={() => handleCopy("groom", preview.accountNumber)}
                  className="mt-auto bg-white border border-[#EBE7DF] text-[#3D3935] px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:border-[#BCA37F] hover:text-[#BCA37F] transition-colors duration-300"
                >
                  {copied === "groom" ? copy.copied : copy.copyNumber}
                </button>
              </motion.div>

              {/* Bride's Bank */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="bg-[#F9F8F6] p-10 md:p-14 rounded-3xl flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-[#BCA37F]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A756D] mb-6">{copy.giftBride}</span>
                <p className="text-xl font-serif text-[#3D3935] mb-2" style={{ fontFamily: "var(--font-tl-serif)" }}>{brideGift.bankName}</p>
                <p className="text-[#7A756D] font-light mb-6 text-sm">{brideGift.accountName}</p>
                <p className="text-xl md:text-2xl font-light text-[#3D3935] mb-8 tracking-[0.1em]">{brideGift.accountNumber}</p>
                <button 
                  onClick={() => handleCopy("bride", brideGift.accountNumber)}
                  className="mt-auto bg-white border border-[#EBE7DF] text-[#3D3935] px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] hover:border-[#BCA37F] hover:text-[#BCA37F] transition-colors duration-300"
                >
                  {copied === "bride" ? copy.copied : copy.copyNumber}
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 bg-[#3D3935] text-center px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="text-4xl md:text-6xl text-[#BCA37F] mb-6" style={{ fontFamily: "var(--font-tl-script)" }}>
            Thank You
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 font-light" style={{ fontFamily: "var(--font-tl-serif)" }}>
            {preview.groom} & {preview.bride}
          </h2>
          <p className="text-white/60 font-light tracking-[0.05em] text-sm max-w-lg mx-auto leading-loose">
            {preview.tlFooterThanks?.trim() || copy.tlFooterThanks}
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
