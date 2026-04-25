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
        className="text-center"
      >
        <p className={`${styles.garamond} text-white mb-12 text-3xl italic`}>Welcome to our Greek Wedding</p>
        
        <div 
          className={styles.greekTile}
          onClick={handleOpen}
        >
          <div className="text-center p-8 border-4 border-cobalt">
            <Heart className="mx-auto text-cobalt mb-6" size={40} />
            <h3 className={`${styles.garamond} text-3xl text-cobalt mb-2 font-bold italic`}>{groom} & {bride}</h3>
            <div className="w-16 h-px bg-cobalt my-6 mx-auto" />
            <p className="text-[10px] text-cobalt uppercase tracking-[0.4em] font-bold">Open our story</p>
          </div>
          
          {/* Decorative Greek pattern in corners */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cobalt opacity-30" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-cobalt opacity-30" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-cobalt opacity-30" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-cobalt opacity-30" />
        </div>

        <p className="mt-12 uppercase tracking-[0.4em] text-white/60 text-xs">Tap the tile to enter</p>
      </motion.div>
    </div>
  );
}
