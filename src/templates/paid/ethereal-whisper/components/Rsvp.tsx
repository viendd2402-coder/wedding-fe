import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Heart } from "./Icons";

export function Rsvp({ preview }: { preview: any }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <section id="rsvp" className="py-12 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/40 backdrop-blur-md border border-white/60 p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center flex flex-col items-center">
          <Heart className="w-10 h-10 text-[#C9A9A9] mb-6" />
          <p className={`text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-4 ${sans.className}`}>RSVP</p>
          <h2 className={`text-4xl md:text-5xl text-[#5A5050] italic mb-6 ${serif.className}`}>
            {preview.ewRsvpTitle || "Lời Hồi Đáp"}
          </h2>
          <p className={`text-[#6B6161] mb-12 text-sm font-light leading-relaxed max-w-md ${sans.className}`}>
            {preview.ewRsvpLead || "Sự hiện diện của bạn là niềm vinh hạnh."}
          </p>
          
          <form className={`w-full space-y-6 ${sans.className}`} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Tên của bạn" 
              className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-sm text-[#5A5050] placeholder-[#8C7A7A] focus:outline-none focus:border-[#C9A9A9] focus:ring-2 focus:ring-[#C9A9A9]/20 transition-all shadow-inner" 
            />
            
            <div className="flex gap-4">
               <button type="button" className="flex-1 py-4 bg-white/60 border border-white/80 text-[#5A5050] rounded-2xl hover:bg-white hover:border-[#C9A9A9] transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm focus:ring-2 focus:ring-[#C9A9A9]/20">
                 Tham dự
               </button>
               <button type="button" className="flex-1 py-4 bg-white/60 border border-white/80 text-[#5A5050] rounded-2xl hover:bg-white hover:border-[#C9A9A9] transition-all text-[10px] uppercase tracking-[0.2em] shadow-sm focus:ring-2 focus:ring-[#C9A9A9]/20">
                 Không thể tới
               </button>
            </div>

            <textarea 
              placeholder="Gửi lời chúc..." 
              rows={3} 
              className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-sm text-[#5A5050] placeholder-[#8C7A7A] focus:outline-none focus:border-[#C9A9A9] focus:ring-2 focus:ring-[#C9A9A9]/20 transition-all resize-none shadow-inner" 
            />
            
            <button type="submit" className="w-full py-5 bg-[#C9A9A9] text-white rounded-2xl hover:bg-[#B59595] transition-all hover:shadow-lg text-[10px] uppercase tracking-[0.3em] mt-4 font-medium shadow-md">
              Gửi lời chúc
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
