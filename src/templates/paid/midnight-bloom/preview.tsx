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
import { Envelope } from "./components/Envelope";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import styles from "./midnight-bloom.module.css";
import { midnightBloomGallery, midnightBloomStoryVi } from "./data";

export function MidnightBloomPreview({
  preview,
  images,
  isPublicInviteSnapshot,
}: TemplatePreviewProps) {
  const [isOpened, setIsOpened] = useState(false);

  const {
    groom = "Gia Bảo",
    bride = "Ngọc Diệp",
    dateLabel = "18 tháng 12 năm 2026",
  } = preview;

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className={styles.container}>
      <Envelope onOpen={() => setIsOpened(true)} bride={bride} groom={groom} />

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
              <div 
                className={styles.heroBg} 
                style={{ 
                  backgroundImage: `url(${images.heroImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"})` 
                }} 
              />
              <div className={styles.heroOverlay} />
              <div className={styles.heroContent}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={`${styles.serif} text-[#D4AF37] tracking-[0.8em] text-[10px] mb-10 uppercase font-bold`}>
                    The Union of Royal Hearts
                  </p>
                  <h1 className={`${styles.serif}`}>
                    {groom}
                    <span className={styles.to}>&</span>
                    {bride}
                  </h1>
                  <div className="flex items-center justify-center gap-6 mt-12">
                    <div className="w-12 h-px bg-[#D4AF37]/40" />
                    <p className={`${styles.serif} text-lg tracking-[0.4em] text-white font-light italic`}>
                      {dateLabel}
                    </p>
                    <div className="w-12 h-px bg-[#D4AF37]/40" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Intro / Welcome */}
            <section className={`${styles.sectionPadding} text-center bg-white`}>
              <div className="max-w-4xl mx-auto">
                <motion.div {...fadeIn}>
                  <div className="mb-14 flex justify-center">
                    <div className="w-20 h-20 border-2 border-[#B8860B]/20 rounded-full flex items-center justify-center">
                      <Heart className="text-[#6D0E0E] opacity-40" size={36} />
                    </div>
                  </div>
                  <h2 className={`${styles.serif} ${styles.sectionTitle} italic`}>Lời Kính Mời</h2>
                  <p className="text-2xl text-gray-400 leading-relaxed font-light italic mb-20 px-8">
                    "{preview.mbWelcomeText || "Trong không gian ngập tràn sắc đỏ nồng nàn và ánh vàng vương giả, chúng mình xin trân trọng mời bạn cùng chứng kiến lời thề nguyện vĩnh cửu."}"
                  </p>
                  <div className="flex justify-center gap-6">
                    <div className="w-2.5 h-2.5 bg-[#B8860B] rotate-45" />
                    <div className="w-2.5 h-2.5 bg-[#B8860B] rotate-45 opacity-50" />
                    <div className="w-2.5 h-2.5 bg-[#B8860B] rotate-45 opacity-20" />
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Couple Profile */}
            <section id="couple" className={`${styles.sectionPadding} bg-[#FDF5E6]`}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
                <motion.div {...fadeIn}>
                  <div className={styles.galleryFrame}>
                    <img
                      src={images.groomPortraitImage || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"}
                      alt="Groom"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <div className="mt-16 text-center">
                    <span className="text-[#B8860B] uppercase tracking-[0.6em] text-[10px] font-bold block mb-5">Vị hôn phu</span>
                    <h3 className={`${styles.serif} text-6xl mb-8 text-[#6D0E0E] italic font-bold`}>{groom}</h3>
                    <div className="text-gray-400 mb-12 text-[10px] uppercase tracking-[0.4em] font-bold">
                      <p>{preview.mbGroomParent1 || "Trưởng nam Ông Trần Gia A"}</p>
                      <p>{preview.mbGroomParent2 || "& Bà Nguyễn Thị B"}</p>
                    </div>
                    <p className="text-gray-500 leading-relaxed max-w-sm mx-auto font-light italic text-sm">
                      {preview.mbGroomBio || "Một quý ông lịch lãm với tâm hồn sâu sắc, luôn trân trọng những giá trị truyền thống và gia đình."}
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                  <div className={styles.galleryFrame}>
                    <img
                      src={images.bridePortraitImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
                      alt="Bride"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <div className="mt-16 text-center">
                    <span className="text-[#B8860B] uppercase tracking-[0.6em] text-[10px] font-bold block mb-5">Vị hôn thê</span>
                    <h3 className={`${styles.serif} text-6xl mb-8 text-[#6D0E0E] italic font-bold`}>{bride}</h3>
                    <div className="text-gray-400 mb-12 text-[10px] uppercase tracking-[0.4em] font-bold">
                      <p>{preview.mbBrideParent1 || "Út nữ Ông Lê Văn C"}</p>
                      <p>{preview.mbBrideParent2 || "& Bà Phạm Thị D"}</p>
                    </div>
                    <p className="text-gray-500 leading-relaxed max-w-sm mx-auto font-light italic text-sm">
                      {preview.mbBrideBio || "Nét đẹp kiêu sa tựa đóa hồng nhung, mang trong mình trái tim ấm áp và trí tuệ mẫn tiệp."}
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Story Timeline */}
            <section id="story" className={`${styles.sectionPadding} bg-white`}>
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-32">
                  <motion.h2 {...fadeIn} className={`${styles.serif} ${styles.sectionTitle} italic`}>Hành Trình Vĩnh Cửu</motion.h2>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  {midnightBloomStoryVi.map((item, index) => (
                    <motion.div
                      key={index}
                      {...fadeIn}
                      transition={{ delay: index * 0.2 }}
                      className={styles.timelineItem}
                    >
                      <span className={`${styles.serif} text-[#B8860B] font-bold text-5xl block mb-6 italic`}>{item.year}</span>
                      <h4 className="text-2xl font-bold mb-4 text-[#6D0E0E] tracking-wider uppercase italic">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-light italic">{item.body}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Events */}
            <section id="events" className={`${styles.sectionPadding} bg-[#FDF5E6]`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                  <motion.h2 {...fadeIn} className={`${styles.serif} ${styles.sectionTitle} italic`}>Sự Kiện Trọng Đại</motion.h2>
                  <div className="w-24 h-px bg-[#B8860B]/30 mx-auto" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <motion.div {...fadeIn} className={styles.card}>
                    <div className="mb-8 p-6 rounded-full border border-[#B8860B]/10 bg-white shadow-sm">
                      <Heart className="text-[#B8860B] w-8 h-8" />
                    </div>
                    <h3 className={`${styles.serif} text-3xl mb-8 tracking-wide text-[#6D0E0E] italic font-bold`}>Lễ Nhóm Họ</h3>
                    <div className="space-y-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Clock className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810]">{preview.mbEngagementTime || "10:00"} — 17.12.2026</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810] leading-relaxed max-w-[200px]">
                          {preview.mbEngagementVenue || "Tư gia họ nhà gái"}
                        </span>
                      </div>
                    </div>
                    <button className={`${styles.goldButton} mt-12 w-full`}>Xem Bản Đồ</button>
                  </motion.div>

                  <motion.div {...fadeIn} transition={{ delay: 0.1 }} className={styles.card}>
                    <div className="mb-8 p-6 rounded-full border border-[#B8860B]/10 bg-white shadow-sm">
                      <Calendar className="text-[#B8860B] w-8 h-8" />
                    </div>
                    <h3 className={`${styles.serif} text-3xl mb-8 tracking-wide text-[#6D0E0E] italic font-bold`}>Lễ Thành Hôn</h3>
                    <div className="space-y-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Clock className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810]">{preview.mbCeremonyTime || "09:00"} — {dateLabel}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810] leading-relaxed max-w-[200px]">
                          {preview.mbCeremonyVenue || "Khách sạn Continental Saigon"}
                        </span>
                      </div>
                    </div>
                    <button className={`${styles.goldButton} mt-12 w-full`}>Xem Bản Đồ</button>
                  </motion.div>

                  <motion.div {...fadeIn} transition={{ delay: 0.2 }} className={styles.card}>
                    <div className="mb-8 p-6 rounded-full border border-[#B8860B]/10 bg-white shadow-sm">
                      <Calendar className="text-[#B8860B] w-8 h-8" />
                    </div>
                    <h3 className={`${styles.serif} text-3xl mb-8 tracking-wide text-[#6D0E0E] italic font-bold`}>Tiệc Cưới</h3>
                    <div className="space-y-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Clock className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810]">{preview.mbReceptionTime || "18:30"} — {dateLabel}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#B8860B] opacity-60" />
                        <span className="text-sm font-bold italic text-[#2C1810] leading-relaxed max-w-[200px]">
                          {preview.mbReceptionVenue || "Park Hyatt Saigon Hotel"}
                        </span>
                      </div>
                    </div>
                    <button className={`${styles.goldButton} mt-12 w-full`}>Xem Bản Đồ</button>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className={`${styles.sectionPadding} bg-white`}>
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-32">
                  <motion.h2 {...fadeIn} className={`${styles.serif} ${styles.sectionTitle} italic`}>Thư Viện Ảnh Tộc</motion.h2>
                </div>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-12">
                  {(images.galleryImages.length > 0 ? images.galleryImages : midnightBloomGallery).map((img, idx) => (
                    <motion.div
                      key={idx}
                      {...fadeIn}
                      className="mb-12 break-inside-avoid"
                    >
                      <div className={styles.galleryFrame}>
                        <img src={img} alt={`Gallery ${idx}`} className="w-full" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* RSVP */}
            <RsvpForm preview={preview} />

            {/* Gifts */}
            <section id="gift" className={`${styles.sectionPadding} bg-[#6D0E0E] text-white`}>
              <div className="max-w-5xl mx-auto text-center">
                <motion.div {...fadeIn}>
                  <Gift className="mx-auto text-white mb-14 w-20 h-20 opacity-20" />
                  <h2 className={`${styles.serif} ${styles.sectionTitle} text-white italic`}>Quà Tặng Chúc Phúc</h2>
                  <p className="text-white/60 mb-24 max-w-2xl mx-auto font-light tracking-[0.2em] italic">
                    Sự hiện diện của quý khách là vinh hạnh vô bờ cho hai gia đình chúng mình.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="p-20 border border-white/10 bg-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16" />
                      <h4 className="text-[#B8860B] mb-12 uppercase tracking-[0.6em] text-[10px] font-bold">Mừng Cưới Chú Rể</h4>
                      <div className="space-y-8">
                        <p className="font-bold text-white text-3xl tracking-widest italic">{preview.bankName || "HSBC"}</p>
                        <p className="text-4xl font-light tracking-tighter text-white">{preview.accountNumber || "0987 654 321"}</p>
                        <p className="uppercase text-[10px] tracking-[0.5em] text-white/30 font-bold">{preview.accountName || "TRAN GIA BAO"}</p>
                      </div>
                    </div>
                    <div className="p-20 border border-white/10 bg-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16" />
                      <h4 className="text-[#B8860B] mb-12 uppercase tracking-[0.6em] text-[10px] font-bold">Mừng Cưới Cô Dâu</h4>
                      <div className="space-y-8">
                        <p className="font-bold text-white text-3xl tracking-widest italic">{preview.mbBrideBankName || "Standard Chartered"}</p>
                        <p className="text-4xl font-light tracking-tighter text-white">{preview.mbBrideAccountNumber || "1234 567 890"}</p>
                        <p className="uppercase text-[10px] tracking-[0.5em] text-white/30 font-bold">{preview.mbBrideAccountName || "HOANG NGOC DIEP"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Guestbook */}
            <Guestbook preview={preview} />

            {/* Footer */}
            <footer className="py-40 bg-[#FDF5E6] text-center">
              <p className={`${styles.serif} text-7xl mb-10 text-[#6D0E0E] italic font-bold`}>{groom} & {bride}</p>
              <div className="w-32 h-px bg-[#B8860B]/30 mx-auto mb-10" />
              <p className="text-[#B8860B] text-[12px] uppercase tracking-[1em] font-bold italic">Royal Heritage Collection</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
