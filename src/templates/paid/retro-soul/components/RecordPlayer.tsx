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
        <p className={`${styles.groovy} text-dark mb-12 text-4xl -rotate-2`}>Spin the record of love!</p>
        
        <div 
          className={styles.recordSleeve}
          onClick={handleOpen}
        >
          <div className={styles.vinyl} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white border-4 border-dark">
            <div className="w-24 h-24 rounded-full border-4 border-primary mb-8 flex items-center justify-center bg-accent/20">
              <Heart className="text-primary" size={48} />
            </div>
            <h3 className={`${styles.groovy} text-4xl text-dark mb-4`}>{groom} & {bride}</h3>
            <p className="text-[12px] text-dark/60 uppercase tracking-[0.4em] font-black">70s Soul — Limited Edition</p>
          </div>
        </div>

        <p className="mt-16 font-black uppercase tracking-[0.4em] text-sm text-dark bg-accent inline-block px-6 py-2 border-2 border-dark animate-bounce">Click to Play</p>
      </motion.div>
    </div>
  );
}
