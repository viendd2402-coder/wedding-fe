import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Footer({ preview, cover }: { preview: any, cover: string }) {
  return (
    <footer className="relative w-full py-32 md:py-48 px-6 flex flex-col items-center bg-white overflow-hidden border-t border-[#F4F1EA]">
      {/* Background Cinematic Image - Clearer */}
      <div className="absolute inset-0 z-0 opacity-[0.25] grayscale pointer-events-none">
        <img 
          src={cover} 
          alt="Footer Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center text-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className={`text-[10px] md:text-xs uppercase tracking-[0.8em] font-bold mb-16 opacity-40 ${sans.className}`}>
            Lời Kết
          </span>

          <h2 className={`text-6xl md:text-8xl lg:text-[10rem] leading-none mb-16 tracking-tight ${serif.className}`}>
            <span className="font-light italic block mb-4">{preview.rbFooterThanks || "Trân Trọng."}</span>
          </h2>

          <div className="flex flex-col items-center gap-12 pt-16 border-t border-[#F4F1EA] w-full max-w-2xl">
            <h3 className={`text-4xl md:text-6xl ${serif.className} flex items-center gap-6 md:gap-12`}>
              <span className="font-light">{preview.groom}</span>
              <span className="text-[#FF4D4D] italic text-3xl md:text-5xl font-medium">&</span>
              <span className="font-light">{preview.bride}</span>
            </h3>
            
            <div className="flex flex-col items-center gap-4">
              <p className={`text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold text-[#A4A7A5] ${sans.className}`}>
                {preview.dateLabel}
              </p>
              <div className="w-12 h-[1px] bg-[#D4AF37]" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center opacity-30">
        <p className={`text-[8px] uppercase tracking-[0.4em] font-bold text-[#A4A7A5] ${sans.className}`}>
          Love Wedding • Radiant Bloom Template
        </p>
      </div>
    </footer>
  );
}
