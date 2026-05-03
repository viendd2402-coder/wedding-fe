import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Story({ preview }: { preview: any }) {
  const fadeUp: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeInOut" } }
  };

  return (
    <section id="story" className="relative py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-md border border-white/50 p-12 md:p-20 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
        >
          <motion.h2 
            variants={fadeUp} 
            className={`text-4xl md:text-5xl text-[#5A5050] mb-8 leading-tight ${serif.className}`}
          >
            <span className="italic">"{preview.ewWelcomeTitle || "Câu Chuyện Tình Yêu"}"</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp} 
            className={`text-sm md:text-base font-light leading-loose text-[#6B6161] max-w-2xl tracking-wide ${sans.className}`}
          >
            {preview.ewWelcomeText || "Từ những người lạ lướt qua nhau giữa phố đông, chúng tôi đã tìm thấy nhau và quyết định gắn kết cuộc đời này. Cảm ơn bạn đã là một phần trong hành trình tuyệt vời ấy."}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
