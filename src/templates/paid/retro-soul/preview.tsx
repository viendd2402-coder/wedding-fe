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
import { RecordPlayer } from "./components/RecordPlayer";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import styles from "./retro-soul.module.css";
import { retroSoulGallery, retroSoulStoryVi } from "./data";

export function RetroSoulPreview({
  preview,
  images,
  isPublicInviteSnapshot,
}: TemplatePreviewProps) {
  const [isOpened, setIsOpened] = useState(false);

  const {
    groom = "Thanh Tùng",
    bride = "Minh Thư",
    dateLabel = "10 tháng 10 năm 2026",
  } = preview;

  const fadeIn: import("framer-motion").HTMLMotionProps<"div"> = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const [visibleGallery, setVisibleGallery] = useState(images.galleryImages.length > 0 ? images.galleryImages : retroSoulGallery);

  const handleImageError = (index: number) => {
    setVisibleGallery(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <RecordPlayer onOpen={() => setIsOpened(true)} bride={bride} groom={groom} />

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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={styles.heroContent}
              >
                <p className="font-black uppercase tracking-[0.4em] text-sm mb-4">You're Invited to</p>
                <h1 className={styles.groovy}>
                  {groom} <br />
                  <span className="text-4xl md:text-6xl text-dark italic block my-4">and</span>
                  {bride}
                </h1>
                <div className="mt-16 inline-block p-8 border-4 border-dark bg-accent shadow-[10px_10px_0_var(--primary)]">
                  <p className="font-black text-3xl uppercase tracking-tighter">{dateLabel}</p>
                </div>
              </motion.div>
            </section>

            {/* Intro */}
            <section className={`${styles.sectionPadding} text-center bg-secondary text-dark`}>
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeIn}>
                  <Heart className="mx-auto text-primary mb-12 w-24 h-24" />
                  <h2 className={`${styles.groovy} ${styles.sectionTitle}`}>Welcome!</h2>
                  <p className="text-2xl md:text-4xl leading-relaxed font-black italic mb-16">
                    "{preview.rsWelcomeText || "Lên xe đi, chúng mình cùng về một nhà! Sự hiện diện của bạn là bản nhạc tuyệt vời nhất trong bữa tiệc hôm nay."}"
                  </p>
                  <div className="w-32 h-4 bg-dark mx-auto" />
                </motion.div>
              </div>
            </section>

            {/* Couple Profile */}
            <section id="couple" className={`${styles.sectionPadding}`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                <motion.div {...fadeIn}>
                  <div className={styles.retroFrame}>
                    <img
                      src={images.groomPortraitImage || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"}
                      alt="Groom"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="mt-10 text-center">
                    <h3 className={`${styles.groovy} text-6xl mb-4 text-primary`}>{groom}</h3>
                    <p className="font-black uppercase tracking-widest text-xs mb-6 bg-accent inline-block px-4 py-1 border-2 border-dark">The Groom</p>
                    <p className="text-gray-600 font-bold italic max-w-sm mx-auto">
                      {preview.rsGroomBio || "Tín đồ của nhạc Trịnh, thích cà phê vỉa hè và yêu vợ nhất trần đời."}
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                  <div className={styles.retroFrame}>
                    <img
                      src={images.bridePortraitImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
                      alt="Bride"
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="mt-10 text-center">
                    <h3 className={`${styles.groovy} text-6xl mb-4 text-primary`}>{bride}</h3>
                    <p className="font-black uppercase tracking-widest text-xs mb-6 bg-accent inline-block px-4 py-1 border-2 border-dark">The Bride</p>
                    <p className="text-gray-600 font-bold italic max-w-sm mx-auto">
                      {preview.rsBrideBio || "Cô gái yêu những chiếc đầm cổ điển, tâm hồn mộng mơ và là mảnh ghép hoàn hảo của anh."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Story Timeline */}
            <section id="story" className={`${styles.sectionPadding} bg-pink/20`}>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 {...fadeIn} className={`${styles.groovy} ${styles.sectionTitle}`}>Our Story</motion.h2>
                </div>
                
                <div className="space-y-4">
                  {retroSoulStoryVi.map((item, index) => (
                    <motion.div
                      key={index}
                      {...fadeIn}
                      transition={{ delay: index * 0.1 }}
                      className={styles.timelineItem}
                    >
                      <h4 className="text-3xl font-black text-primary mb-2 uppercase tracking-tighter">{item.title}</h4>
                      <p className="text-dark font-black uppercase text-sm mb-4 px-3 py-1 bg-accent inline-block border-2 border-dark">{item.year}</p>
                      <p className="text-gray-700 font-bold text-lg italic">{item.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Events */}
            <section id="events" className={`${styles.sectionPadding}`}>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 {...fadeIn} className={`${styles.groovy} ${styles.sectionTitle}`}>When & Where</motion.h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div {...fadeIn} className={styles.card}>
                    <Calendar className="text-primary mb-8 w-12 h-12" />
                    <h3 className={`${styles.groovy} text-4xl mb-8`}>Lễ Vu Quy</h3>
                    <div className="space-y-4 font-black uppercase text-xs">
                      <p className="flex items-center gap-4"><Clock className="w-4 h-4" /> 09:00 — {dateLabel}</p>
                      <p className="flex items-center gap-4"><MapPin className="w-4 h-4" /> Tư gia nhà gái</p>
                    </div>
                    <button className={`${styles.retroButton} mt-12 w-full text-xs`}>Bản Đồ</button>
                  </motion.div>

                  <motion.div {...fadeIn} transition={{ delay: 0.1 }} className={styles.card}>
                    <Calendar className="text-primary mb-8 w-12 h-12" />
                    <h3 className={`${styles.groovy} text-4xl mb-8`}>Tiệc Nhà Trai</h3>
                    <div className="space-y-4 font-black uppercase text-xs">
                      <p className="flex items-center gap-4"><Clock className="w-4 h-4" /> 11:30 — {dateLabel}</p>
                      <p className="flex items-center gap-4"><MapPin className="w-4 h-4" /> Nhà hàng Diamond</p>
                    </div>
                    <button className={`${styles.retroButton} mt-12 w-full text-xs`}>Bản Đồ</button>
                  </motion.div>

                  <motion.div {...fadeIn} transition={{ delay: 0.2 }} className={styles.card}>
                    <Calendar className="text-primary mb-8 w-12 h-12" />
                    <h3 className={`${styles.groovy} text-4xl mb-8`}>Tiệc Nhà Gái</h3>
                    <div className="space-y-4 font-black uppercase text-xs">
                      <p className="flex items-center gap-4"><Clock className="w-4 h-4" /> 18:00 — {dateLabel}</p>
                      <p className="flex items-center gap-4"><MapPin className="w-4 h-4" /> Khách sạn Continental</p>
                    </div>
                    <button className={`${styles.retroButton} mt-12 w-full text-xs`}>Bản Đồ</button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className={`${styles.sectionPadding} bg-white`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 {...fadeIn} className={`${styles.groovy} ${styles.sectionTitle}`}>Our Album</motion.h2>
                </div>
                
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {visibleGallery.map((img, idx) => (
                    <motion.div
                      key={`${img}-${idx}`}
                      {...fadeIn}
                      transition={{ delay: idx * 0.1 }}
                      className="break-inside-avoid"
                    >
                      <div className={styles.retroFrame}>
                        <img 
                          src={img} 
                          alt={`Gallery ${idx}`} 
                          className={styles.galleryImg} 
                          onError={() => handleImageError(idx)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* RSVP */}
            <RsvpForm preview={preview} />

            {/* Gifts */}
            <section id="gift" className={`${styles.sectionPadding} text-center bg-accent`}>
              <motion.div {...fadeIn}>
                <Gift className="mx-auto text-primary mb-12 w-24 h-24" />
                <h2 className={`${styles.groovy} ${styles.sectionTitle}`}>Mừng Cưới</h2>
                <p className="max-w-2xl mx-auto mb-20 text-dark font-bold italic text-lg">
                  Sự hiện diện của bạn đã là món quà quý giá nhất. Nếu bạn muốn gửi lời chúc mừng qua hiện kim, có thể tham khảo thông tin dưới đây:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                  <div className="p-12 border-4 border-dark bg-white shadow-[12px_12px_0_var(--primary)]">
                    <h4 className="font-black uppercase text-primary mb-8 tracking-widest text-xl">Nhà Trai</h4>
                    <p className="text-xl font-black mb-2">{preview.bankName || "BIDV"}</p>
                    <p className="text-4xl font-black tracking-tighter mb-4 text-dark">{preview.accountNumber || "123 456 789"}</p>
                    <p className="font-black uppercase text-xs text-gray-400">{preview.accountName || "NGUYEN THANH TUNG"}</p>
                  </div>
                  <div className="p-12 border-4 border-dark bg-white shadow-[12px_12px_0_var(--secondary)]">
                    <h4 className="font-black uppercase text-secondary mb-8 tracking-widest text-xl">Nhà Gái</h4>
                    <p className="text-xl font-black mb-2">{preview.rsBrideBankName || "Vietcombank"}</p>
                    <p className="text-4xl font-black tracking-tighter mb-4 text-dark">{preview.rsBrideAccountNumber || "987 654 321"}</p>
                    <p className="font-black uppercase text-xs text-gray-400">{preview.rsBrideAccountName || "LE MINH THU"}</p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Guestbook */}
            <Guestbook preview={preview} />

            {/* Footer */}
            <footer className="py-24 bg-[#FF6B6B] text-dark text-center">
              <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-dark bg-white">
                <Heart className="text-[#FF6B6B] w-12 h-12" />
              </div>
              <h2 className={`${styles.groovy} text-7xl text-white mb-6 -rotate-2 drop-shadow-[4px_4px_0_var(--dark)]`}>{groom} & {bride}</h2>
              <p className="font-black uppercase tracking-[0.4em] text-sm mb-4 text-dark/60">Vĩnh Kết Đồng Tâm — 2026</p>
              <div className="w-20 h-1 bg-dark mx-auto" />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
