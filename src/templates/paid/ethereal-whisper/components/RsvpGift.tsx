import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Heart } from "./Icons";

export function RsvpGift({ preview }: { preview: any }) {
  const fadeUp: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <section id="rsvp" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Wish Form */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/40 backdrop-blur-md border border-white/60 p-10 md:p-14 rounded-[3rem] shadow-lg text-center flex flex-col items-center">
            <Heart className="w-8 h-8 text-[#C9A9A9] mb-6" />
            <h2 className={`text-3xl md:text-4xl text-[#5A5050] italic mb-4 ${serif.className}`}>
              {preview.ewRsvpTitle || "Lời Hồi Đáp"}
            </h2>
            <p className={`text-[#6B6161] mb-10 text-sm font-light leading-relaxed ${sans.className}`}>
              {preview.ewRsvpLead || "Sự hiện diện của bạn là niềm vinh hạnh."}
            </p>
            <div className={`w-full space-y-6 ${sans.className}`}>
              <input type="text" placeholder="Tên của bạn" className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-sm text-[#5A5050] placeholder-[#8C7A7A] focus:outline-none focus:border-[#C9A9A9] transition-colors shadow-inner" disabled />
              <textarea placeholder="Gửi lời chúc..." rows={3} className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-sm text-[#5A5050] placeholder-[#8C7A7A] focus:outline-none focus:border-[#C9A9A9] transition-colors resize-none shadow-inner" disabled />
              <button disabled className="w-full py-4 bg-[#C9A9A9] text-white rounded-2xl hover:bg-[#B59595] transition-colors text-[10px] uppercase tracking-[0.3em] mt-4 font-medium shadow-md">
                Gửi lời chúc
              </button>
            </div>
          </motion.div>

          {/* Gift */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/40 backdrop-blur-md border border-white/60 p-10 md:p-14 rounded-[3rem] shadow-lg text-center flex flex-col justify-center">
            <h2 className={`text-3xl md:text-4xl text-[#5A5050] italic mb-4 ${serif.className}`}>
              {preview.ewGiftTitle || "Hộp Quà Cưới"}
            </h2>
            <p className={`text-[#6B6161] mb-10 text-sm font-light leading-relaxed ${sans.className}`}>
              {preview.ewGiftLead || "Gửi gắm yêu thương đến cô dâu chú rể"}
            </p>
            
            <div className={`space-y-8 text-left w-full ${sans.className}`}>
              <div className="bg-white/50 border border-white/80 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[9px] text-[#8C7A7A] uppercase tracking-[0.3em] mb-2">Nhà Trai</p>
                <p className="font-medium text-[#5A5050] text-lg">{preview.bankName}</p>
                <p className="text-[#6B6161] text-sm mt-1 mb-4">{preview.accountName}</p>
                <p className="text-xl tracking-[0.1em] text-[#5A5050]">{preview.accountNumber}</p>
              </div>

              {(preview.ewBrideBankName || preview.ewBrideAccountNumber) && (
                <div className="bg-white/50 border border-white/80 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[9px] text-[#8C7A7A] uppercase tracking-[0.3em] mb-2">Nhà Gái</p>
                  <p className="font-medium text-[#5A5050] text-lg">{preview.ewBrideBankName}</p>
                  <p className="text-[#6B6161] text-sm mt-1 mb-4">{preview.ewBrideAccountName}</p>
                  <p className="text-xl tracking-[0.1em] text-[#5A5050]">{preview.ewBrideAccountNumber}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
