"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { Heart } from "./Icons";

export function Envelope({ onOpen, bride, groom }: { onOpen: () => void, bride: string, groom: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div className={`${styles.envelopeOverlay} ${isOpen ? styles.envelopeOpened : ""}`}>
      <div className={styles.envelopeWrapper}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.envelope} ${isOpen ? styles.open : ""}`}
          onClick={handleOpen}
        >
          <div className={styles.flap} />
          
          <div className={styles.pocket} />
          
          <div className={styles.letter}>
            <p className={`${styles.serif} text-[10px] text-[#B8860B] mb-4 uppercase tracking-[0.3em] font-bold`}>The Wedding of</p>
            <h3 className={`${styles.serif} text-2xl text-[#6D0E0E] italic font-bold leading-tight`}>{groom} <br/> & <br/> {bride}</h3>
            <div className="w-12 h-px bg-[#B8860B]/30 my-4 mx-auto" />
            <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] font-bold">Bấm để mở lời mời</p>
          </div>

          <div className={styles.waxSeal}>
            <Heart className="text-white" size={32} />
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0 : [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 text-center text-[10px] uppercase tracking-[0.6em] text-white/60 font-bold"
        >
          Khám phá câu chuyện tình yêu
        </motion.p>
      </div>
    </div>
  );
}
