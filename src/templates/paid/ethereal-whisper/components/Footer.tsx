import React from "react";
import { motion } from "framer-motion";
import { serif, script, sans } from "./SharedFonts";

export function Footer({ preview }: { preview: any }) {
  const fadeUp: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <footer className="relative min-h-[50svh] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
      
      <motion.div 
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="w-16 h-16 md:w-24 md:h-24 mb-12 rounded-full border border-[#C9A9A9] flex items-center justify-center relative"
        >
          <div className="absolute inset-2 rounded-full border border-[#C9A9A9]/30" />
          <span className={`text-[#C9A9A9] text-3xl md:text-5xl ${script.className}`}>&</span>
        </motion.div>

        <h2 className={`text-5xl md:text-7xl lg:text-[6rem] text-[#5A5050] leading-none tracking-tight mb-8 ${serif.className}`}>
          {preview.groom} <span className="mx-4 text-[#C9A9A9] font-light">&</span> {preview.bride}
        </h2>
        
        <p className={`text-lg md:text-2xl text-[#6B6161] font-light italic mb-16 ${serif.className}`}>
          {preview.ewFooterThanks || "Chân thành cảm ơn sự hiện diện của quý khách!"}
        </p>
        
        <div className={`flex items-center gap-8 ${sans.className}`}>
          <div className="w-12 h-px bg-[#8C7A7A]/30" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#8C7A7A]">Forever & Always</span>
          <div className="w-12 h-px bg-[#8C7A7A]/30" />
        </div>
      </motion.div>
    </footer>
  );
}
