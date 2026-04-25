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

  const fadeIn = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
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
                <p className="font-black uppercase tracking-[0.4em] text-sm mb-8 text-green">A Love Like No Other</p>
                <h1 className={styles.groovy}>
                  {groom} <br />
                  <span className="text-4xl md:text-6xl text-black/20 italic block my-4">and</span>
                  {bride}
                </h1>
                <div className="mt-16 inline-block p-6 border-4 border-black bg-mustard shadow-[10px_10px_0_var(--orange)]">
                  <p className="font-black text-2xl uppercase tracking-tighter">{dateLabel}</p>
                </div>
              </motion.div>
            </section>

            {/* Intro */}
            <section className={`${styles.sectionPadding} text-center bg-orange text-white`}>
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeIn}>
                  <Heart className="mx-auto text-mustard mb-12 w-20 h-20" />
                  <h2 className={`${styles.groovy} ${styles.sectionTitle} text-white`}>Chào Mừng!</h2>
                  <p className="text-xl leading-relaxed font-black italic mb-16">
                    "{preview.rsWelcomeText || "Lên xe đi, chúng mình cùng về một nhà! Sự hiện diện của bạn là bản nhạc tuyệt vời nhất trong bữa tiệc hôm nay."}"
                  </p>
                  <div className="w-32 h-2 bg-white mx-auto" />
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
                    <h3 className={`${styles.groovy} text-5xl mb-4 text-orange`}>{groom}</h3>
                    <p className="font-black uppercase tracking-widest text-xs text-green mb-6">The Groom</p>
                    <p className="text-gray-600 font-medium italic max-w-sm mx-auto">
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
                    <h3 className={`${styles.groovy} text-5xl mb-4 text-orange`}>{bride}</h3>
                    <p className="font-black uppercase tracking-widest text-xs text-green mb-6">The Bride</p>
                    <p className="text-gray-600 font-medium italic max-w-sm mx-auto">
                      {preview.rsBrideBio || "Cô gái yêu những chiếc đầm cổ điển, tâm hồn mộng mơ và là mảnh ghép hoàn hảo của anh."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Story Timeline */}
            <section id="story" className={`${styles.sectionPadding} bg-mustard/10`}>
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 {...fadeIn} className={`${styles.groovy} ${styles.sectionTitle}`}>Bản Tình Ca</motion.h2>
                </div>
                
                <div className="space-y-4">
                  {retroSoulStoryVi.map((item, index) => (
                    <motion.div
                      key={index}
                      {...fadeIn}
                      transition={{ delay: index * 0.1 }}
                      className={styles.timelineItem}
                    >
                      <h4 className="text-2xl font-black text-orange mb-2">{item.title}</h4>
                      <p className="text-green font-black uppercase text-xs mb-4">{item.year}</p>
                      <p className="text-gray-600 font-medium italic">{item.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Events */}
            <section id="events" className={`${styles.sectionPadding}`}>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div {...fadeIn} className={styles.card}>
                  <Calendar className="text-orange mb-8 w-12 h-12" />
                  <h3 className={`${styles.groovy} text-4xl mb-8`}>Tiệc Nhà Trai</h3>
                  <div className="space-y-4 font-black uppercase text-sm">
                    <p className="flex items-center gap-4"><Clock className="w-5 h-5" /> 09:00 — {dateLabel}</p>
                    <p className="flex items-center gap-4"><MapPin className="w-5 h-5" /> Nhà văn hóa Thanh Niên</p>
                  </div>
                  <button className={`${styles.retroButton} mt-12 w-full`}>Xem Bản Đồ</button>
                </motion.div>

                <motion.div {...fadeIn} transition={{ delay: 0.2 }} className={styles.card}>
                  <Calendar className="text-orange mb-8 w-12 h-12" />
                  <h3 className={`${styles.groovy} text-4xl mb-8`}>Tiệc Nhà Gái</h3>
                  <div className="space-y-4 font-black uppercase text-sm">
                    <p className="flex items-center gap-4"><Clock className="w-5 h-5" /> 18:00 — {dateLabel}</p>
                    <p className="flex items-center gap-4"><MapPin className="w-5 h-5" /> Khách sạn Continental</p>
                  </div>
                  <button className={`${styles.retroButton} mt-12 w-full`}>Xem Bản Đồ</button>
                </motion.div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className={`${styles.sectionPadding} bg-green text-white`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <motion.h2 {...fadeIn} className={`${styles.groovy} ${styles.sectionTitle} text-white`}>Album</motion.h2>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                  {(images.galleryImages.length > 0 ? images.galleryImages : retroSoulGallery).map((img, idx) => (
                    <motion.div
                      key={idx}
                      {...fadeIn}
                      className="mb-8 break-inside-avoid"
                    >
                      <div className={styles.retroFrame}>
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
            <section id="gift" className={`${styles.sectionPadding} text-center`}>
              <motion.div {...fadeIn}>
                <Gift className="mx-auto text-orange mb-12 w-20 h-20" />
                <h2 className={`${styles.groovy} ${styles.sectionTitle}`}>Mừng Cưới</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                  <div className="p-12 border-4 border-black bg-white shadow-[12px_12px_0_var(--mustard)]">
                    <h4 className="font-black uppercase text-orange mb-8">Nhà Trai</h4>
                    <p className="text-xl font-black mb-2">{preview.bankName || "BIDV"}</p>
                    <p className="text-3xl font-black tracking-tighter mb-4">{preview.accountNumber || "123 456 789"}</p>
                    <p className="font-black uppercase text-xs text-gray-400">{preview.accountName || "NGUYEN THANH TUNG"}</p>
                  </div>
                  <div className="p-12 border-4 border-black bg-white shadow-[12px_12px_0_var(--mustard)]">
                    <h4 className="font-black uppercase text-orange mb-8">Nhà Gái</h4>
                    <p className="text-xl font-black mb-2">{preview.rsBrideBankName || "Vietcombank"}</p>
                    <p className="text-3xl font-black tracking-tighter mb-4">{preview.rsBrideAccountNumber || "987 654 321"}</p>
                    <p className="font-black uppercase text-xs text-gray-400">{preview.rsBrideAccountName || "LE MINH THU"}</p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Guestbook */}
            <Guestbook preview={preview} />

            {/* Footer */}
            <footer className="py-24 bg-black text-white text-center">
              <h2 className={`${styles.groovy} text-6xl text-mustard mb-6`}>{groom} & {bride}</h2>
              <p className="font-black uppercase tracking-[0.3em] text-xs">Vĩnh Kết Đồng Tâm — 2026</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
