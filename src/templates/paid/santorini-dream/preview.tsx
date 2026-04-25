"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Gift, 
  MessageCircle, 
  Clock 
} from "./components/Icons";
import { Menu } from "./components/Menu";
import { Guestbook } from "./components/Guestbook";
import { RsvpForm } from "./components/RsvpForm";
import { GreekEnvelope } from "./components/GreekEnvelope";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import styles from "./santorini-dream.module.css";
import { santoriniDreamGallery, santoriniDreamStoryVi } from "./data";

export function SantoriniDreamPreview({
  preview,
  images,
  isPublicInviteSnapshot,
}: TemplatePreviewProps) {
  const [isOpened, setIsOpened] = useState(false);

  const {
    groom = "Thanh Nam",
    bride = "Thảo Nguyên",
    dateLabel = "02 tháng 09 năm 2026",
  } = preview;

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className={styles.container}>
      <GreekEnvelope onOpen={() => setIsOpened(true)} bride={bride} groom={groom} />

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Menu isPublicInviteSnapshot={isPublicInviteSnapshot} />

            {/* Hero Section */}
            <section className={styles.heroSection}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="max-w-4xl mx-auto"
              >
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-cobalt/40 mb-12">The Union of Two Souls</p>
                <div className="flex justify-center mb-16">
                  <div className={`${styles.archFrame} w-64 md:w-80`}>
                    <img
                      src={images.coverImage || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"}
                      alt="Hero"
                      className="w-full aspect-[2/3] object-cover"
                    />
                  </div>
                </div>
                <h1 className={`${styles.garamond} italic font-bold`}>
                  {groom} <span className="text-3xl md:text-5xl font-light mx-4 text-cobalt/30">&</span> {bride}
                </h1>
                <div className="flex items-center justify-center gap-6 mt-12">
                  <div className="w-10 h-px bg-cobalt/20" />
                  <p className="text-lg tracking-[0.4em] font-light text-cobalt">{dateLabel}</p>
                  <div className="w-10 h-px bg-cobalt/20" />
                </div>
              </motion.div>
            </section>

            {/* Welcome */}
            <section className={`${styles.sectionPadding} text-center bg-[#FAF9F6]`}>
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeIn}>
                  <div className="mb-12 flex justify-center">
                    <div className="w-16 h-16 border-2 border-cobalt rotate-45 flex items-center justify-center">
                      <Heart className="text-cobalt -rotate-45" size={32} />
                    </div>
                  </div>
                  <h2 className={`${styles.garamond} ${styles.sectionTitle} italic`}>Lời Chào</h2>
                  <p className="text-2xl text-gray-400 leading-relaxed font-light italic mb-16 px-6">
                    "{preview.sdWelcomeText || "Giữa biển trời xanh ngắt và nắng vàng rực rỡ, chúng mình muốn mời bạn cùng chứng kiến khoảnh khắc khởi đầu cho một hành trình vĩnh cửu."}"
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Couple Profile */}
            <section id="couple" className={`${styles.sectionPadding}`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32">
                <motion.div {...fadeIn}>
                  <div className={`${styles.archFrame}`}>
                    <img
                      src={images.groomPortraitImage || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"}
                      alt="Groom"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <div className="mt-12 text-center">
                    <span className="text-cobalt/40 uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">Chú rể</span>
                    <h3 className={`${styles.garamond} text-5xl mb-6 italic`}>{groom}</h3>
                    <div className="text-gray-400 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
                      <p>{preview.sdGroomParent1 || "Con trai Ông Nguyễn Văn A"}</p>
                      <p>{preview.sdGroomParent2 || "& Bà Lê Thị B"}</p>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-sm mx-auto font-light text-sm italic">
                      {preview.sdGroomBio || "Một tâm hồn tự do như gió biển, luôn hướng về phía chân trời nơi có em chờ đợi."}
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                  <div className={`${styles.archFrame}`}>
                    <img
                      src={images.bridePortraitImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
                      alt="Bride"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <div className="mt-12 text-center">
                    <span className="text-cobalt/40 uppercase tracking-[0.6em] text-[10px] font-bold block mb-4">Cô dâu</span>
                    <h3 className={`${styles.garamond} text-5xl mb-6 italic`}>{bride}</h3>
                    <div className="text-gray-400 mb-8 text-[10px] uppercase tracking-[0.3em] font-bold">
                      <p>{preview.sdBrideParent1 || "Con gái Ông Phạm Văn C"}</p>
                      <p>{preview.sdBrideParent2 || "& Bà Trương Thị D"}</p>
                    </div>
                    <p className="text-gray-400 leading-relaxed max-w-sm mx-auto font-light text-sm italic">
                      {preview.sdBrideBio || "Rạng rỡ như nắng mai vùng Địa Trung Hải, cô gái mang trong mình hơi thở của sự bình yên."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Story Timeline */}
            <section id="story" className={`${styles.sectionPadding} bg-[#f0f4f8]`}>
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-24">
                  <motion.h2 {...fadeIn} className={`${styles.garamond} ${styles.sectionTitle} italic`}>Câu Chuyện Tình</motion.h2>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  {santoriniDreamStoryVi.map((item, index) => (
                    <motion.div
                      key={index}
                      {...fadeIn}
                      transition={{ delay: index * 0.2 }}
                      className={styles.timelineItem}
                    >
                      <span className="text-cobalt font-bold tracking-widest uppercase text-xs block mb-4">{item.year}</span>
                      <h4 className={`${styles.garamond} text-3xl font-bold italic mb-4`}>{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed font-light italic">{item.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Events */}
            <section id="events" className={`${styles.sectionPadding}`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                <motion.div {...fadeIn} className={styles.card}>
                  <Calendar className="text-cobalt mb-8 w-12 h-12" />
                  <h3 className={`${styles.garamond} text-4xl mb-12 italic`}>Lễ Đính Hôn</h3>
                  <div className="space-y-6 text-xs uppercase tracking-[0.3em] font-bold">
                    <div className="flex items-center gap-6">
                      <Clock className="w-5 h-5 text-cobalt" />
                      <span>{preview.sdCeremonyTime || "09:00"} — {dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <MapPin className="w-5 h-5 text-cobalt" />
                      <span className="leading-relaxed">{preview.sdCeremonyVenue || "White Villa Resort, Vũng Tàu"}</span>
                    </div>
                  </div>
                  <button className={`${styles.cobaltButton} mt-16 w-full`}>Xem Chỉ Đường</button>
                </motion.div>

                <motion.div {...fadeIn} transition={{ delay: 0.2 }} className={styles.card}>
                  <Calendar className="text-cobalt mb-8 w-12 h-12" />
                  <h3 className={`${styles.garamond} text-4xl mb-12 italic`}>Tiệc Cưới</h3>
                  <div className="space-y-6 text-xs uppercase tracking-[0.3em] font-bold">
                    <div className="flex items-center gap-6">
                      <Clock className="w-5 h-5 text-cobalt" />
                      <span>{preview.sdReceptionTime || "18:30"} — {dateLabel}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <MapPin className="w-5 h-5 text-cobalt" />
                      <span className="leading-relaxed">{preview.sdReceptionVenue || "The Marina Convention Center"}</span>
                    </div>
                  </div>
                  <button className={`${styles.cobaltButton} mt-16 w-full`}>Xem Chỉ Đường</button>
                </motion.div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className={`${styles.sectionPadding} bg-cobalt text-white`}>
              <div className="max-w-7xl mx-auto text-center">
                <motion.h2 {...fadeIn} className={`${styles.garamond} ${styles.sectionTitle} text-white italic mb-32`}>Thư Viện Ảnh</motion.h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-12">
                  {(images.galleryImages.length > 0 ? images.galleryImages : santoriniDreamGallery).map((img, idx) => (
                    <motion.div
                      key={idx}
                      {...fadeIn}
                      className="mb-12 break-inside-avoid"
                    >
                      <div className={styles.blueFrame}>
                        <img src={img} alt={`Gallery ${idx}`} className={styles.galleryImg} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* RSVP */}
            <RsvpForm preview={preview} />

            {/* Gifts */}
            <section id="gift" className={`${styles.sectionPadding} bg-[#FAF9F6] text-center`}>
              <motion.div {...fadeIn}>
                <Gift className="mx-auto text-cobalt mb-12 w-16 h-16 opacity-40" />
                <h2 className={`${styles.garamond} ${styles.sectionTitle} italic`}>Gửi Lời Chúc Mừng</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                  <div className="p-16 border-2 border-cobalt bg-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cobalt/5 rotate-45 translate-x-12 -translate-y-12" />
                    <h4 className="text-cobalt mb-10 uppercase tracking-[0.5em] text-[10px] font-bold">Mừng Cưới Chú Rể</h4>
                    <div className="space-y-6">
                      <p className="font-bold text-cobalt text-2xl tracking-widest italic">{preview.bankName || "Techcombank"}</p>
                      <p className="text-4xl font-light tracking-tighter text-cobalt">{preview.accountNumber || "0987 654 321"}</p>
                      <p className="uppercase text-[10px] tracking-[0.4em] text-gray-400 font-bold">{preview.accountName || "NGUYEN THANH NAM"}</p>
                    </div>
                  </div>
                  <div className="p-16 border-2 border-cobalt bg-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cobalt/5 rotate-45 translate-x-12 -translate-y-12" />
                    <h4 className="text-cobalt mb-10 uppercase tracking-[0.5em] text-[10px] font-bold">Mừng Cưới Cô Dâu</h4>
                    <div className="space-y-6">
                      <p className="font-bold text-cobalt text-2xl tracking-widest italic">{preview.sdBrideBankName || "Vietcombank"}</p>
                      <p className="text-4xl font-light tracking-tighter text-cobalt">{preview.sdBrideAccountNumber || "1234 567 890"}</p>
                      <p className="uppercase text-[10px] tracking-[0.4em] text-gray-400 font-bold">{preview.sdBrideAccountName || "LE THAO NGUYEN"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Guestbook */}
            <Guestbook preview={preview} />

            {/* Footer */}
            <footer className="py-32 bg-cobalt text-white text-center">
              <h2 className={`${styles.garamond} text-6xl mb-8 italic`}>{groom} & {bride}</h2>
              <div className="w-24 h-px bg-white/20 mx-auto mb-8" />
              <p className="text-white/60 text-[10px] uppercase tracking-[0.8em] font-bold">Ocean Breeze Wedding</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
