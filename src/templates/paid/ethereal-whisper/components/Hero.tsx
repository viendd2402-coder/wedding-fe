import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serif, script, sans } from "./SharedFonts";

export function Hero({ preview, cover }: { preview: any, cover: string }) {
  const { scrollYProgress, scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden pt-24">
      
      <motion.div 
        style={{ opacity: heroOpacity, y: yContent }}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl"
      >
        {/* Save the date label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          className={`text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-8 md:mb-12 font-medium ${sans.className}`}
        >
          {preview.ewHeroSubtitle || "Save the Date"}
        </motion.div>

        {/* Center Wide Rectangular Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="relative w-[90vw] max-w-6xl aspect-[4/3] md:aspect-[16/9] p-3 md:p-4 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-12 rounded-2xl md:rounded-[2rem]"
        >
          <div className="w-full h-full overflow-hidden border border-white/60 relative group rounded-xl md:rounded-3xl">
            <img 
              src={cover} 
              alt="Cover" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[4s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
          
          {/* Floating Names overlapping the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] flex flex-col items-center pointer-events-none text-center">
            <motion.h1
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.8 }}
              className={`text-6xl md:text-[7rem] leading-none text-[#5A5050] drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] ${serif.className}`}
            >
              {preview.groom}
            </motion.h1>
            
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
               className={`text-5xl md:text-7xl text-[#C9A9A9] my-2 md:-my-4 z-10 ${script.className} drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]`}
            >
               &
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 1 }}
              className={`text-6xl md:text-[7rem] leading-none text-[#5A5050] drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] ${serif.className}`}
            >
              {preview.bride}
            </motion.h1>
          </div>
        </motion.div>

        {/* Date */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }}
          className="flex items-center gap-6 mt-6"
        >
          <div className="w-16 h-px bg-[#8C7A7A]/30" />
          <span className={`text-[9px] md:text-xs uppercase tracking-[0.3em] text-[#5A5050] font-medium bg-white/40 backdrop-blur-sm py-3 px-8 rounded-full border border-white/60 shadow-sm ${sans.className}`}>
            {preview.dateLabel}
          </span>
          <div className="w-16 h-px bg-[#8C7A7A]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
