"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../retro-soul.module.css";
import { Heart } from "./Icons";

export function RecordPlayer({ onOpen, bride, groom }: { onOpen: () => void, bride: string, groom: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`${styles.recordOverlay} ${isOpen ? styles.recordOpened : ""}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className={`${styles.groovy} text-black mb-12 text-2xl`}>Spin the record of love!</p>
        
        <div 
          className={styles.recordSleeve}
          onClick={handleOpen}
        >
          <div className={styles.vinyl} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#2d2d2d] border-4 border-black">
            <div className="w-20 h-20 rounded-full border-4 border-mustard mb-6 flex items-center justify-center">
              <Heart className="text-mustard" size={40} />
            </div>
            <h3 className={`${styles.groovy} text-2xl text-mustard mb-2`}>{groom} & {bride}</h3>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Collector's Edition</p>
          </div>
        </div>

        <p className="mt-12 font-bold uppercase tracking-[0.2em] text-black">Click to start the melody</p>
      </motion.div>
    </div>
  );
}
