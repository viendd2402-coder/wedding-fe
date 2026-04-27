import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Hero({ preview, cover }: { preview: any, cover: string }) {
  const { scrollYProgress } = useScroll();
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img 
          style={{ scale: scaleImage }}
          src={cover} 
          alt="Wedding Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center text-white"
      >
        <span className={`text-[10px] md:text-xs uppercase tracking-[0.8em] font-bold mb-12 opacity-80 ${sans.className}`}>
          {preview.rbHeroSubtitle || "Một Triển Lãm Của Tình Yêu"}
        </span>
        
        <h1 className={`text-[4rem] md:text-[8rem] lg:text-[12rem] leading-none mb-12 tracking-tight flex flex-col md:flex-row items-center gap-4 md:gap-12 ${serif.className}`}>
          <span className="font-light">{preview.groom}</span>
          <span className="text-xl md:text-4xl italic opacity-50">&</span>
          <span className="font-light">{preview.bride}</span>
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="w-px h-24 bg-white/30" />
          <p className={`text-sm md:text-base tracking-[0.4em] font-light uppercase ${sans.className}`}>
            {preview.dateLabel}
          </p>
        </div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-[10px] uppercase tracking-[0.4em]"
      >
        Cuộn Xuống
      </motion.div>
    </section>
  );
}
