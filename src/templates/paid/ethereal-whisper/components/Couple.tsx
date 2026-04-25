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
    <section id="couple" className="relative py-12 md:py-20 px-6">
      <div className="max-w-[90rem] mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-16 md:mb-24"
        >
          <p className={`text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-4 ${sans.className}`}>The Couple</p>
          <h2 className={`text-5xl md:text-6xl text-[#5A5050] italic ${serif.className}`}>
            {preview.ewCoupleTitle || "Hai Mảnh Ghép"}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          {/* Groom */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col items-center flex-1 max-w-sm"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8 rounded-[100px] overflow-hidden border-4 border-white/50 shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <img 
                src={groomImg} 
                alt="Groom" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]" 
              />
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl text-center shadow-lg w-full relative -mt-20 z-20">
              <h3 className={`text-3xl text-[#5A5050] mb-4 ${serif.className}`}>{preview.groom}</h3>
              <p className={`text-sm text-[#6B6161] font-light leading-relaxed tracking-wide ${sans.className}`}>
                {preview.ewGroomBio}
              </p>
            </div>
          </motion.div>

          {/* & */}
          <motion.div 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className={`text-6xl text-[#C9A9A9] my-8 md:my-0 ${script.className}`}
          >
            &
          </motion.div>

          {/* Bride */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
            className="flex flex-col items-center flex-1 max-w-sm"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8 rounded-[100px] overflow-hidden border-4 border-white/50 shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <img 
                src={brideImg} 
                alt="Bride" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]" 
              />
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-3xl text-center shadow-lg w-full relative -mt-20 z-20">
              <h3 className={`text-3xl text-[#5A5050] mb-4 ${serif.className}`}>{preview.bride}</h3>
              <p className={`text-sm text-[#6B6161] font-light leading-relaxed tracking-wide ${sans.className}`}>
                {preview.ewBrideBio}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
