import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serif, script, sans } from "./SharedFonts";

export function Hero({ preview, cover }: { preview: any, cover: string }) {
  const { scrollYProgress, scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-[#FDFCFD]">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7]/30 to-transparent" />
      
      <motion.div 
        style={{ opacity: heroOpacity, y: yContent }}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-6xl"
      >
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-8 font-medium ${sans.className}`}
        >
          {preview.ewHeroSubtitle || "Save the Date"}
        </motion.div>

        {/* Main Image Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.5, delay: 0.4 }}
          className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-xl border border-white/60 mb-12 md:mb-16"
        >
          <motion.img 
            style={{ scale: imageScale }}
            src={cover} 
            alt="Wedding Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* Names & Date */}
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-2 md:gap-8"
          >
            <h1 className={`text-5xl md:text-8xl text-[#5A5050] ${serif.className}`}>
              {preview.groom}
            </h1>
            <div className={`text-4xl md:text-6xl text-[#C9A9A9] ${script.className}`}>
              &
            </div>
            <h1 className={`text-5xl md:text-8xl text-[#5A5050] ${serif.className}`}>
              {preview.bride}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="w-12 h-px bg-[#C9A9A9]/50" />
            <div className={`text-xl md:text-3xl text-[#8C7A7A] font-light tracking-[0.2em] ${serif.className}`}>
               {preview.dateLabel?.split(' - ')[0] || "20.12.2024"}
            </div>
            <div className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#C9A9A9] font-medium ${sans.className}`}>
              Tại {preview.ewCeremonyVenue || preview.venue || "Trung tâm tiệc cưới"}
            </div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 md:mt-24 opacity-30"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#8C7A7A] to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  );
}
