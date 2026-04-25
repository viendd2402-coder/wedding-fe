import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Copy } from "./Icons";

export function Gift({ preview }: { preview: any }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const groomBank = preview.bankName || "Ngân hàng ACB";
  const groomAccName = preview.accountName || "NGUYEN VAN A";
  const groomAccNo = preview.accountNumber || "123456789";

  const brideBank = preview.ewBrideBankName || "Ngân hàng VCB";
  const brideAccName = preview.ewBrideAccountName || "TRAN THI B";
  const brideAccNo = preview.ewBrideAccountNumber || "987654321";

  return (
    <section id="gift" className="py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16 md:mb-24">
          <p className={`text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-4 ${sans.className}`}>Registry</p>
          <h2 className={`text-5xl md:text-6xl text-[#5A5050] italic mb-6 ${serif.className}`}>
            {preview.ewGiftTitle || "Hộp Quà Cưới"}
          </h2>
          <p className={`text-[#6B6161] text-sm font-light leading-relaxed max-w-md mx-auto ${sans.className}`}>
            {preview.ewGiftLead || "Sự hiện diện của quý khách là món quà vô giá nhất. Nếu quý khách muốn gửi trao thêm tình cảm, gia đình xin chân thành cảm ơn."}
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto w-full">
          {/* Groom Horizontal Card */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
            className="w-full flex flex-col md:flex-row items-center justify-between py-6 px-8 md:px-12 z-10 bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl md:rounded-[4rem] shadow-lg hover:bg-white/60 transition-colors duration-500"
          >
            <div className="flex items-center gap-6 mb-6 md:mb-0 w-full md:w-auto text-left">
              <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#FFF5F7] to-[#FAF0F5] border border-[#C9A9A9]/30 shadow-sm flex items-center justify-center">
                <span className={`text-[#C9A9A9] text-3xl ${serif.className}`}>{preview.groom?.charAt(0) || "G"}</span>
              </div>
              <div>
                <p className={`text-[10px] text-[#8C7A7A] uppercase tracking-[0.3em] mb-1 ${sans.className}`}>Mừng cưới Chú rể</p>
                <p className={`font-medium text-[#5A5050] text-lg md:text-xl ${sans.className}`}>{groomBank}</p>
                <p className={`text-[#6B6161] text-xs font-light uppercase tracking-wider ${sans.className}`}>{groomAccName}</p>
              </div>
            </div>
            
            <div className="bg-white/70 border border-[#C9A9A9]/20 py-3 md:py-4 px-6 md:px-8 rounded-full cursor-pointer hover:bg-white hover:shadow-md transition-all shadow-sm group flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-center">
              <p className={`text-xl md:text-2xl tracking-[0.2em] text-[#5A5050] ${sans.className}`}>{groomAccNo}</p>
              <div className="w-px h-6 bg-[#C9A9A9]/30" />
              <div className="flex items-center gap-2 text-[#8C7A7A] group-hover:text-[#C9A9A9] transition-colors">
                <Copy className="w-5 h-5" />
                <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] hidden md:block ${sans.className}`}>Copy</span>
              </div>
            </div>
          </motion.div>

          {/* Bride Horizontal Card */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="w-full flex flex-col md:flex-row items-center justify-between py-6 px-8 md:px-12 z-10 bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl md:rounded-[4rem] shadow-lg hover:bg-white/60 transition-colors duration-500"
          >
            <div className="flex items-center gap-6 mb-6 md:mb-0 w-full md:w-auto text-left">
              <div className="w-16 h-16 shrink-0 rounded-full bg-gradient-to-br from-[#FFF5F7] to-[#FAF0F5] border border-[#C9A9A9]/30 shadow-sm flex items-center justify-center">
                <span className={`text-[#C9A9A9] text-3xl ${serif.className}`}>{preview.bride?.charAt(0) || "B"}</span>
              </div>
              <div>
                <p className={`text-[10px] text-[#8C7A7A] uppercase tracking-[0.3em] mb-1 ${sans.className}`}>Mừng cưới Cô dâu</p>
                <p className={`font-medium text-[#5A5050] text-lg md:text-xl ${sans.className}`}>{brideBank}</p>
                <p className={`text-[#6B6161] text-xs font-light uppercase tracking-wider ${sans.className}`}>{brideAccName}</p>
              </div>
            </div>
            
            <div className="bg-white/70 border border-[#C9A9A9]/20 py-3 md:py-4 px-6 md:px-8 rounded-full cursor-pointer hover:bg-white hover:shadow-md transition-all shadow-sm group flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-center">
              <p className={`text-xl md:text-2xl tracking-[0.2em] text-[#5A5050] ${sans.className}`}>{brideAccNo}</p>
              <div className="w-px h-6 bg-[#C9A9A9]/30" />
              <div className="flex items-center gap-2 text-[#8C7A7A] group-hover:text-[#C9A9A9] transition-colors">
                <Copy className="w-5 h-5" />
                <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] hidden md:block ${sans.className}`}>Copy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
