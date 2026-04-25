import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Couple({ preview, images }: { preview: any, images: any }) {
  return (
    <section className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-32">
        
        {/* Groom */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 aspect-[3/4] relative"
          >
            <img 
              src={images.groomPortraitImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt="Groom" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -inset-4 border border-[#1a1a1a]/20 pointer-events-none translate-x-4 -translate-y-4" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-start"
          >
            <p className={`text-[#FF4D4D] text-xs uppercase tracking-[0.4em] font-medium mb-4 ${sans.className}`}>
              The Groom
            </p>
            <h3 className={`text-5xl md:text-7xl mb-8 ${serif.className}`}>
              {preview.groom}
            </h3>
            <p className={`text-[#1a1a1a]/70 font-light leading-relaxed max-w-md ${sans.className}`}>
              {preview.groomBio || "His heart is wild and his soul is free. He brings the calm to her storm."}
            </p>
          </motion.div>
        </div>

        {/* Bride */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className={`text-[#FF4D4D] text-xs uppercase tracking-[0.4em] font-medium mb-4 ${sans.className}`}>
              The Bride
            </p>
            <h3 className={`text-5xl md:text-7xl mb-8 ${serif.className}`}>
              {preview.bride}
            </h3>
            <p className={`text-[#1a1a1a]/70 font-light leading-relaxed max-w-md ${sans.className}`}>
              {preview.brideBio || "A vision of elegance and strength. She is the fire that keeps him warm."}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full md:w-1/2 aspect-[3/4] relative"
          >
            <img 
              src={images.bridePortraitImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
              alt="Bride" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute -inset-4 border border-[#1a1a1a]/20 pointer-events-none -translate-x-4 translate-y-4" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
