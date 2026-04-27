import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Couple({ preview, images }: { preview: any, images: any }) {
  return (
    <section className="relative w-full py-24 md:py-48 px-6 bg-[#F9F9F9] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-24 lg:gap-40 items-start">
          
          {/* Groom Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex flex-col gap-12"
          >
            <div className="relative aspect-[3/4] bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-[#E8E8E8]">
              <img 
                src={images.groomPortraitImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt="Chú Rể" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-10 right-[-20px] bg-black text-white px-6 py-2">
                <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${sans.className}`}>Chú Rể</span>
              </div>
            </div>
            <div className="max-w-sm pl-6">
              <h3 className={`text-4xl md:text-5xl lg:text-6xl mb-6 font-light ${serif.className}`}>
                {preview.groom}
              </h3>
              <p className={`text-[#7A756D] text-sm md:text-base font-light leading-relaxed ${sans.className}`}>
                {preview.groomBio || "Người đàn ông mang trong mình trái tim nồng cháy và tâm hồn tự do."}
              </p>
            </div>
          </motion.div>

          {/* Bride Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex flex-col gap-12 md:mt-32"
          >
            <div className="relative aspect-[3/4] bg-white p-6 shadow-[0_40px_80px_rgba(0,0,0,0.04)] border border-[#E8E8E8]">
              <img 
                src={images.bridePortraitImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt="Cô Dâu" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-10 left-[-20px] bg-black text-white px-6 py-2">
                <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${sans.className}`}>Cô Dâu</span>
              </div>
            </div>
            <div className="max-w-sm pl-6 md:pl-0 md:pr-6">
              <h3 className={`text-4xl md:text-5xl lg:text-6xl mb-6 font-light ${serif.className}`}>
                {preview.bride}
              </h3>
              <p className={`text-[#7A756D] text-sm md:text-base font-light leading-relaxed ${sans.className}`}>
                {preview.brideBio || "Vẻ đẹp của sự tinh tế và sức mạnh. Cô ấy là ngọn lửa sưởi ấm tâm hồn anh."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
