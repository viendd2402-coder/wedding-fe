"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "../santorini-dream.module.css";
import { Heart } from "./Icons";

export function GreekEnvelope({ onOpen, bride, groom }: { onOpen: () => void, bride: string, groom: string }) {
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center"
      >
        <span className="text-white/60 uppercase tracking-[0.6em] text-[10px] font-bold mb-8">Exclusive Invitation</span>
        
        <div 
          className={styles.greekTile}
          onClick={handleOpen}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Heart className="mx-auto text-cobalt/20 mb-8" size={32} />
          </motion.div>
          
          <h3 className={`${styles.playfair} text-3xl md:text-4xl text-cobalt mb-6 italic`}>
            {groom} <br/> <span className="text-gold serif">&</span> <br/> {bride}
          </h3>
          
          <div className="w-12 h-[1px] bg-gold/30 mb-8" />
          
          <p className="text-[9px] text-cobalt/60 uppercase tracking-[0.5em] font-bold mb-2">Our Wedding Story</p>
          <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-light">Open Invitation</p>
          
          {/* Subtle patterns */}
          <div className="absolute inset-4 border border-gold/10 pointer-events-none" />
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 uppercase tracking-[0.5em] text-white/40 text-[9px] font-bold"
        >
          Click to explore
        </motion.p>
      </motion.div>
    </div>
  );
}

