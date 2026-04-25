"use client";

import React from "react";
import { motion } from "framer-motion";
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
import type { TemplatePreviewProps } from "@/templates/preview-types";
import styles from "./soft-serenity.module.css";
import { softSerenityGallery, softSerenityStoryVi } from "./data";

export const SoftSerenityPreview: React.FC<TemplatePreviewProps> = ({
  preview,
  images,
  isPublicInviteSnapshot,
}) => {
  const {
    groom = "Hoàng Anh",
    bride = "Tuyết Nhi",
    dateLabel = "20 tháng 10 năm 2026",
  } = preview;

  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className={styles.container}>
      <Menu isPublicInviteSnapshot={isPublicInviteSnapshot} />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          src={images.coverImage || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80"}
          alt="Hero"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            <p className="uppercase text-xs md:text-sm mb-8 font-semibold text-[#e6d5b8]">The Celebration of Love</p>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.5 }}
            className={styles.serif}
          >
            {groom} <br />
            <span className="text-2xl md:text-4xl italic font-light block my-4">&</span>
            {bride}
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className={styles.accentLine}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="text-sm md:text-lg mt-10 font-medium tracking-[0.4em] text-[#e6d5b8] uppercase"
          >
            {dateLabel}
          </motion.p>
        </div>
      </section>

      {/* Welcome / Intro */}
      <section id="intro" className={`${styles.sectionPadding} text-center bg-white`}>
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="mb-10 flex justify-center">
              <div className="w-12 h-12 rotate-45 border border-[#c5a059] flex items-center justify-center">
                <Heart className="text-[#c5a059] w-6 h-6 -rotate-45" />
              </div>
            </div>
            <h2 className={`${styles.serif} ${styles.sectionTitle}`}>Thư Ngỏ</h2>
            <p className={styles.sectionLead}>
              "{preview.ssInviteBody || "Tình yêu không chỉ là nhìn nhau, mà là cùng nhìn về một hướng. Chúng mình trân trọng kính mời bạn đến chia sẻ khoảnh khắc khởi đầu cho hành trình mới này."}"
            </p>
            <div className="flex justify-center gap-4">
              <div className="w-2 h-2 bg-[#c5a059] rotate-45" />
              <div className="w-2 h-2 bg-[#c5a059] rotate-45 opacity-50" />
              <div className="w-2 h-2 bg-[#c5a059] rotate-45 opacity-20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Couple Profiles */}
      <section id="couple" className={`${styles.sectionPadding} bg-[#FDFBF7]`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            {/* Groom */}
            <motion.div {...fadeIn}>
              <div className={styles.luxuryFrame}>
                <img
                  src={images.groomPortraitImage || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"}
                  alt="Groom"
                  className="w-full aspect-[4/5] object-cover filter brightness-90 shadow-2xl"
                />
              </div>
              <div className="mt-12 text-center">
                <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">The Groom</span>
                <h3 className={`${styles.serif} text-5xl mb-6`}>{groom}</h3>
                <div className="text-gray-400 mb-8 text-xs uppercase tracking-widest font-semibold">
                  <p>{preview.ssGroomParentLine1 || "Trưởng nam của Ông Trần Văn A"}</p>
                  <p>{preview.ssGroomParentLine2 || "& Bà Nguyễn Thị B"}</p>
                </div>
                <p className="text-gray-500 leading-relaxed max-w-md mx-auto font-light text-sm italic">
                  "{preview.ssGroomBio || "Một tâm hồn trầm lặng nhưng đầy khát vọng, luôn dành trọn vẹn tình cảm cho những người thân yêu."}"
                </p>
              </div>
            </motion.div>

            {/* Bride */}
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }}>
              <div className={styles.luxuryFrame}>
                <img
                  src={images.bridePortraitImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
                  alt="Bride"
                  className="w-full aspect-[4/5] object-cover filter brightness-90 shadow-2xl"
                />
              </div>
              <div className="mt-12 text-center">
                <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold block mb-4">The Bride</span>
                <h3 className={`${styles.serif} text-5xl mb-6`}>{bride}</h3>
                <div className="text-gray-400 mb-8 text-xs uppercase tracking-widest font-semibold">
                  <p>{preview.ssBrideParentLine1 || "Út nữ của Ông Lê Văn C"}</p>
                  <p>{preview.ssBrideParentLine2 || "& Bà Phạm Thị D"}</p>
                </div>
                <p className="text-gray-500 leading-relaxed max-w-md mx-auto font-light text-sm italic">
                  "{preview.ssBrideBio || "Nét dịu dàng hòa quyện cùng sự thông tuệ, cô gái mang trong mình nguồn năng lượng chữa lành."}"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section id="story" className={`${styles.sectionPadding} bg-white`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 {...fadeIn} className={`${styles.serif} ${styles.sectionTitle}`}>Chương Tiếp Theo</motion.h2>
            <p className={styles.sectionLead}>{preview.ssStoryLead || "Mỗi trang viết trong cuốn sách tình yêu của chúng mình đều là những kỷ niệm vô giá."}</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {softSerenityStoryVi.map((item, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: index * 0.2 }}
                className={styles.timelineItem}
              >
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-[#c5a059] font-bold text-3xl serif italic leading-none">{item.year}</span>
                  <div className="h-px flex-1 bg-[#e6d5b8]/30" />
                </div>
                <h4 className="text-xl font-semibold mb-4 text-gray-800 tracking-wide uppercase">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light text-sm italic">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Events */}
      <section id="events" className={`${styles.sectionPadding} bg-[#FDFBF7]`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Event 1 */}
            <motion.div {...fadeIn} className={styles.card}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-4 border border-[#c5a059]/20 shadow-lg">
                <Calendar className="w-8 h-8 text-[#c5a059]" />
              </div>
              <h3 className={`${styles.serif} text-4xl text-center mb-12`}>Lễ Vu Quy</h3>
              <div className="space-y-8">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Thời gian</span>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-xl font-medium">{preview.ssVuQuyTime || "08:30"} — {dateLabel}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Địa điểm</span>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-xl font-medium text-center">{preview.ssVuQuyVenue || "Tư gia nhà gái"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-center">
                <button className={styles.rsvpButton}>Chỉ đường</button>
              </div>
            </motion.div>

            {/* Event 2 */}
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className={styles.card}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white p-4 border border-[#c5a059]/20 shadow-lg">
                <Calendar className="w-8 h-8 text-[#c5a059]" />
              </div>
              <h3 className={`${styles.serif} text-4xl text-center mb-12`}>Tiệc Cưới</h3>
              <div className="space-y-8">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Thời gian</span>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-xl font-medium">{preview.ssBrideEventTime || "11:30"} — {dateLabel}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Địa điểm</span>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#c5a059]" />
                    <span className="text-xl font-medium text-center">{preview.ssBrideEventVenue || "Diamond Plaza Convention Center"}</span>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-center">
                <button className={styles.rsvpButton}>Chỉ đường</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className={`${styles.sectionPadding} bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 {...fadeIn} className={`${styles.serif} ${styles.sectionTitle}`}>Thư Viện Ảnh</motion.h2>
            <p className={styles.sectionLead}>{preview.ssAlbumLead || "Những lát cắt hạnh phúc được lưu giữ vĩnh cửu qua ống kính."}</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {(images.galleryImages.length > 0 ? images.galleryImages : softSerenityGallery).map((img, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: idx * 0.1 }}
                className="mb-8 break-inside-avoid group cursor-pointer"
              >
                <div className={styles.luxuryFrame}>
                  <img src={img} alt={`Gallery ${idx}`} className={styles.galleryImg} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Confirmation Form */}
      <RsvpForm preview={preview} />

      {/* Gift Box */}
      <section id="gift" className={`${styles.sectionPadding} bg-[#0c0c0c] text-white`}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn}>
            <div className="mb-12 flex justify-center">
              <Gift className="text-[#c5a059] w-16 h-16 opacity-80" />
            </div>
            <h2 className={`${styles.serif} text-5xl mb-8 text-[#e6d5b8] text-center`}>Hộp Mừng Cưới</h2>
            <p className="text-gray-400 mb-20 text-center max-w-2xl mx-auto font-light tracking-wide">
              Nếu bạn muốn dành tặng một món quà ý nghĩa để chúc phúc cho tổ ấm mới của chúng mình.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-12 border border-[#c5a059]/30 bg-[#1a1a1a] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 -rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="font-bold text-[#c5a059] mb-10 uppercase tracking-[0.4em] text-xs">Mừng cưới Chú rể</h4>
                <div className="space-y-4">
                  <p className="font-semibold text-[#e6d5b8] text-2xl">{preview.ssGroomBankName || "Techcombank"}</p>
                  <p className="text-3xl font-light tracking-tighter text-white">{preview.ssGroomAccountNumber || "0987 654 321"}</p>
                  <p className="uppercase text-[10px] tracking-[0.3em] text-gray-500 font-bold">{preview.ssGroomAccountName || "TRAN HOANG ANH"}</p>
                </div>
              </div>
              <div className="p-12 border border-[#c5a059]/30 bg-[#1a1a1a] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 -rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="font-bold text-[#c5a059] mb-10 uppercase tracking-[0.4em] text-xs">Mừng cưới Cô dâu</h4>
                <div className="space-y-4">
                  <p className="font-semibold text-[#e6d5b8] text-2xl">{preview.ssBrideBankName || "Vietcombank"}</p>
                  <p className="text-3xl font-light tracking-tighter text-white">{preview.ssBrideAccountNumber || "1234 567 890"}</p>
                  <p className="uppercase text-[10px] tracking-[0.3em] text-gray-500 font-bold">{preview.ssBrideAccountName || "NGUYEN THI TUYET"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guestbook Section */}
      <Guestbook preview={preview} />

      {/* Footer */}
      <footer className="py-24 bg-[#0c0c0c] text-center">
        <p className={`${styles.serif} text-4xl mb-6 text-[#e6d5b8]`}>{groom} & {bride}</p>
        <div className="w-12 h-px bg-[#c5a059]/40 mx-auto mb-6" />
        <p className="text-[#c5a059] text-[10px] uppercase tracking-[0.5em] font-bold">Vĩnh Kết Đồng Tâm</p>
      </footer>
    </div>
  );
};
