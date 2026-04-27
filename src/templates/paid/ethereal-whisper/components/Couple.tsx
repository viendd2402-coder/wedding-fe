import React from "react";
import { motion } from "framer-motion";
import { serif, script, sans } from "./SharedFonts";

export function Couple({ preview, images }: { preview: any, images: any }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const groomImg = images.groomPortraitImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop";
  const brideImg = images.bridePortraitImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop";

  return (
    <section id="couple" className="relative py-20 md:py-32 px-6">
      <div className="max-w-[85rem] mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-24 md:mb-32"
        >
          <p className={`text-xs uppercase tracking-[0.5em] text-[#8C7A7A] mb-4 ${sans.className}`}>The Couple</p>
          <h2 className={`text-5xl md:text-7xl text-[#5A5050] italic ${serif.className}`}>
            {preview.ewCoupleTitle || "Groom & Bride"}
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A9A9]/40 mx-auto mt-8" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
          {/* Groom */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center flex-1 w-full"
          >
            <div className="relative w-full max-w-sm aspect-[3/4] mb-12 group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#C9A9A9]/20 rounded-[3rem] translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
              
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl">
                <img 
                  src={groomImg} 
                  alt="Groom" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                />
              </div>

              {/* Bio Card Overlap */}
              <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white/60 backdrop-blur-xl border border-white/80 p-8 md:p-10 rounded-[2rem] shadow-xl max-w-[280px] group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className={`text-2xl md:text-3xl text-[#5A5050] mb-3 ${serif.className}`}>{preview.groom}</h3>
                <p className={`text-[11px] md:text-xs text-[#6B6161] font-light leading-relaxed tracking-wider ${sans.className}`}>
                  {preview.ewGroomBio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }}
            className="flex flex-col items-center flex-1 w-full"
          >
            <div className="relative w-full max-w-sm aspect-[3/4] mb-12 group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#C9A9A9]/20 rounded-[3rem] -translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
              
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl">
                <img 
                  src={brideImg} 
                  alt="Bride" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                />
              </div>

              {/* Bio Card Overlap */}
              <div className="absolute -bottom-10 -left-4 md:-left-10 bg-white/60 backdrop-blur-xl border border-white/80 p-8 md:p-10 rounded-[2rem] shadow-xl max-w-[280px] group-hover:-translate-y-2 transition-transform duration-500 text-right md:text-left">
                <h3 className={`text-2xl md:text-3xl text-[#5A5050] mb-3 ${serif.className}`}>{preview.bride}</h3>
                <p className={`text-[11px] md:text-xs text-[#6B6161] font-light leading-relaxed tracking-wider ${sans.className}`}>
                  {preview.ewBrideBio}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
