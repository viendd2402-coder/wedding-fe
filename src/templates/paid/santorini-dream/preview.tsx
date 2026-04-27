"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Gift, 
  Clock,
  ChevronLeft,
  ChevronRight
} from "./components/Icons";
import { RsvpForm } from "./components/RsvpForm";
import { Guestbook } from "./components/Guestbook";
import type { TemplatePreviewProps } from "@/templates/preview-types";
import styles from "./santorini-dream.module.css";
import { santoriniDreamGallery } from "./data";

export function SantoriniDreamPreview({
  preview,
  images,
}: TemplatePreviewProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // Scroll to top of the page when changing pages
  React.useEffect(() => {
    // Small delay to ensure the page element is ready and the transition is starting
    const timer = setTimeout(() => {
      const pageElements = document.querySelectorAll(`.${styles.page}`);
      // Find the element that corresponds to the current page index
      // Since they are rendered in reverse order for z-index, we need to be careful
      // But they are in the DOM in a specific order. 
      // Let's use a simpler approach by just resetting all, but with better timing.
      pageElements.forEach(page => {
        page.scrollTo({ top: 0, behavior: 'instant' });
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const {
    groom = "Thanh Nam",
    bride = "Thảo Nguyên",
    dateLabel = "02 tháng 09 năm 2026",
  } = preview;

  const totalPages = 10;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(c => c + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(c => c - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.albumWrapper}>
        {/* Render pages in reverse order so the first pages are on top */}
        {[...Array(totalPages)].map((_, i) => (
          <Page 
            key={i} 
            index={i} 
            active={currentPage} 
            totalPages={totalPages}
          >
            {renderPageContent(i, preview, images, groom, bride, dateLabel)}
          </Page>
        )).reverse()}
      </div>

      {/* Navigation */}
      <div className={styles.navContainer}>
        <button onClick={prevPage} className={styles.navBtn} style={{ opacity: currentPage === 0 ? 0.3 : 1 }}>
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextPage} className={styles.navBtn} style={{ opacity: currentPage === totalPages - 1 ? 0.3 : 1 }}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function Page({ index, active, totalPages, children }: { index: number, active: number, totalPages: number, children: React.ReactNode }) {
  const isFlipped = index < active;
  const isCurrent = index === active;
  
  return (
    <motion.div
      className={`${styles.page} ${index === 0 ? styles.coverPage : ""}`}
      initial={false}
      animate={{ 
        rotateY: isFlipped ? -180 : 0,
        zIndex: isFlipped ? index : totalPages - index,
        display: (index < active - 1) ? "none" : "flex" // Optimization
      }}
      transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <div className="w-full flex flex-col items-center">
        {children}
        <div className={styles.pageIndicator}>
          {index + 1} / {totalPages}
        </div>
      </div>
    </motion.div>
  );
}

function renderPageContent(index: number, preview: any, images: any, groom: string, bride: string, dateLabel: string) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col items-center justify-center min-h-[500px] relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-[9px] text-gold uppercase tracking-[1em] mb-16 opacity-60">Save The Date</p>
            <h1 className={`${styles.coverTitle} ${styles.goldFoil} leading-tight`}>
              {groom}<br />
              <span className="text-3xl font-light italic text-white/40">&</span><br />
              {bride}
            </h1>
            <div className="w-12 h-px bg-gold/50 my-16" />
            <p className="text-[10px] text-white/50 uppercase tracking-[0.5em] font-light italic mb-2">The Wedding of</p>
            <p className="text-[11px] text-gold uppercase tracking-[0.3em] font-bold">{dateLabel}</p>
          </motion.div>
          <div className="absolute bottom-10 animate-pulse">
            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em]">Flip to Open</p>
          </div>
        </div>
      );
    case 1:
      return (
        <>
          <span className={styles.sectionLabel}>Introduction</span>
          <h2 className={styles.sectionTitle}>Chào Mừng</h2>
          <p className="text-xl text-gray-500 italic leading-relaxed text-center px-4">
            "{preview.sdWelcomeText || "Giữa biển trời xanh ngắt và nắng vàng rực rỡ, chúng mình muốn mời bạn cùng chứng kiến khoảnh khắc khởi đầu cho một hành trình vĩnh cửu."}"
          </p>
          <div className={`${styles.imageFrame} mt-12`}>
            <img src={images.coverImage || "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"} className="w-full h-full object-cover" />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <span className={styles.sectionLabel}>Groom</span>
          <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-white shadow-lg">
            <img src={images.groomPortraitImage || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80"} className="w-full h-full object-cover" />
          </div>
          <h3 className={styles.sectionTitle}>{groom}</h3>
          <p className="text-sm text-gray-400 italic text-center px-4">
            {preview.sdGroomBio || "Một tâm hồn tự do như gió biển, luôn hướng về phía chân trời nơi có em chờ đợi."}
          </p>
        </>
      );
    case 3:
      return (
        <>
          <span className={styles.sectionLabel}>Bride</span>
          <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-white shadow-lg">
            <img src={images.bridePortraitImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"} className="w-full h-full object-cover" />
          </div>
          <h3 className={styles.sectionTitle}>{bride}</h3>
          <p className="text-sm text-gray-400 italic text-center px-4">
            {preview.sdBrideBio || "Rạng rỡ như nắng mai vùng Địa Trung Hải, cô gái mang trong mình hơi thở của sự bình yên."}
          </p>
        </>
      );
    case 4:
      return (
        <>
          <span className={styles.sectionLabel}>Celebration</span>
          <h2 className={styles.sectionTitle}>Sự Kiện</h2>
          <div className="w-full space-y-12 mt-6">
            <div className="text-left border-l-2 border-gold/20 pl-6">
              <h4 className="text-xs font-bold text-gold uppercase mb-2">Lễ Đính Hôn</h4>
              <p className="text-sm text-cobalt font-bold">{preview.sdCeremonyTime || "09:00"} — {dateLabel}</p>
              <p className="text-xs text-gray-400 mt-1">{preview.sdCeremonyVenue || "White Villa Resort"}</p>
            </div>
            <div className="text-left border-l-2 border-gold/20 pl-6">
              <h4 className="text-xs font-bold text-gold uppercase mb-2">Tiệc Cưới</h4>
              <p className="text-sm text-cobalt font-bold">{preview.sdReceptionTime || "18:30"} — {dateLabel}</p>
              <p className="text-xs text-gray-400 mt-1">{preview.sdReceptionVenue || "The Marina Convention Center"}</p>
            </div>
          </div>
        </>
      );
    case 5:
      return (
        <>
          <span className={styles.sectionLabel}>Album</span>
          <h2 className={styles.sectionTitle}>Kỷ Niệm</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {santoriniDreamGallery.slice(0, 6).map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden shadow-sm">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </>
      );
    case 6:
      return (
        <>
          <span className={styles.sectionLabel}>RSVP</span>
          <h2 className={styles.sectionTitle}>Xác Nhận</h2>
          <div className="w-full scale-95 origin-top">
            <RsvpForm preview={preview} />
          </div>
        </>
      );
    case 7:
      return (
        <>
          <span className={styles.sectionLabel}>Mừng Cưới</span>
          <h2 className={styles.sectionTitle}>Quà Chúc Mừng</h2>
          <div className="w-full space-y-4">
            <div className={styles.giftCard}>
              <p className="text-[10px] font-bold text-gold uppercase mb-2">Chú Rể</p>
              <p className="text-sm font-bold text-cobalt">{preview.bankName || "Techcombank"}</p>
              <p className="text-md font-light text-cobalt mt-1 tracking-wider">{preview.accountNumber || "0987 654 321"}</p>
              <p className="text-[9px] text-gray-400 uppercase mt-1">{preview.accountName || "NGUYEN THANH NAM"}</p>
            </div>
            <div className={styles.giftCard}>
              <p className="text-[10px] font-bold text-gold uppercase mb-2">Cô Dâu</p>
              <p className="text-sm font-bold text-cobalt">{preview.sdBrideBankName || "Vietcombank"}</p>
              <p className="text-md font-light text-cobalt mt-1 tracking-wider">{preview.sdBrideAccountNumber || "1234 567 890"}</p>
              <p className="text-[9px] text-gray-400 uppercase mt-1">{preview.sdBrideAccountName || "LE THAO NGUYEN"}</p>
            </div>
          </div>
        </>
      );
    case 8:
      return (
        <>
          <span className={styles.sectionLabel}>Guestbook</span>
          <h2 className={styles.sectionTitle}>Lời Chúc</h2>
          <div className={styles.guestbookWrapper}>
            <Guestbook preview={preview} />
          </div>
        </>
      );
    case 9:
      return (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <Heart className="text-gold mb-10" size={80} />
          <h2 className={styles.sectionTitle}>Cảm Ơn & Hẹn Gặp Lại</h2>
          <p className="text-gray-400 italic text-center px-8 leading-relaxed">
            "{preview.sdThankYouText || "Sự hiện diện của bạn là món quà ý nghĩa nhất đối với chúng mình. Cảm ơn bạn đã là một phần trong câu chuyện tình yêu này."}"
          </p>
          <div className={styles.ornament} />
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-cobalt/40 mt-4">Forever Together</p>
        </div>
      );
    default:
      return null;
  }
}






