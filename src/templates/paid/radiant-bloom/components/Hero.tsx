import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Hero({ preview, cover }: { preview: any, cover: string }) {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col md:flex-row items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden pt-24 md:pt-32">
      <div className="w-full max-w-7xl relative flex flex-col md:flex-row items-center">
        
        {/* Left Side: Dramatic Typography */}
        <motion.div 
          style={{ y: yText }}
          className="relative z-20 w-full md:w-1/2 flex flex-col items-start md:-mr-24 mix-blend-difference text-[#FDFBF7]"
        >
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`uppercase tracking-[0.4em] text-xs md:text-sm font-medium mb-8 pl-1 md:pl-2 ${sans.className}`}
          >
            {preview.rbHeroSubtitle || "The Wedding Celebration"}
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter ${serif.className}`}
          >
            <span className="block">{preview.groom}</span>
            <span className="block text-[#FF4D4D] italic">&</span>
            <span className="block">{preview.bride}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="w-12 h-px bg-[#FDFBF7]" />
            <p className={`text-sm md:text-base tracking-[0.2em] font-light ${sans.className}`}>
              {preview.dateLabel}
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: Cinematic Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full md:w-2/3 aspect-[3/4] md:aspect-[4/5] mt-12 md:mt-0"
        >
          <div className="w-full h-full overflow-hidden relative">
            <motion.img 
              style={{ y: yImage }}
              src={cover} 
              alt="Hero Cover" 
              className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
            />
            {/* Edge gradient for a raw, filmic look */}
            <div className="absolute inset-0 border-[1px] border-[#1a1a1a]/10 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
