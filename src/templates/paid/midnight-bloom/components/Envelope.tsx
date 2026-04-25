"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { Heart } from "./Icons";

export function Envelope({ onOpen, bride, groom }: { onOpen: () => void, bride: string, groom: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`${styles.envelopeOverlay} ${isOpen ? styles.envelopeOpened : ""}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <p className={`${styles.serif} text-white mb-12 tracking-[0.5em] text-sm uppercase italic`}>Lễ Thành Hôn Hoàng Gia</p>
        
        <div 
          className={`${styles.envelope} ${isOpen ? styles.open : ""}`}
          onClick={handleOpen}
        >
          <div className={styles.waxSeal}>
            <Heart className="text-white" size={28} />
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FDF5E6]">
            <p className={`${styles.serif} text-xs text-[#B8860B] mb-5 uppercase tracking-[0.3em] font-bold`}>The Wedding of</p>
            <h3 className={`${styles.serif} text-3xl text-[#6D0E0E] italic font-bold`}>{groom} & {bride}</h3>
            <div className="w-16 h-px bg-[#B8860B]/30 my-5 mx-auto" />
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold">Bấm để mở lời mời</p>
          </div>
        </div>

        <motion.p 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 text-[10px] uppercase tracking-[0.6em] text-white/60 font-bold"
        >
          Khám phá câu chuyện tình yêu
        </motion.p>
      </motion.div>
    </div>
  );
}
