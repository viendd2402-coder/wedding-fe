import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Copy } from "./Icons";

export function Gift({ preview }: { preview: any }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const fadeUp: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const bankAccounts = [
    {
      id: "groom",
      title: "Mừng cưới Chú rể",
      bank: preview.bankName || "Ngân hàng ACB",
      name: preview.accountName || "NGUYEN VAN A",
      number: preview.accountNumber || "123456789",
      accent: "#E8EEF5",
      icon: "G"
    },
    {
      id: "bride",
      title: "Mừng cưới Cô dâu",
      bank: preview.ewBrideBankName || "Ngân hàng VCB",
      name: preview.ewBrideAccountName || "TRAN THI B",
      number: preview.ewBrideAccountNumber || "987654321",
      accent: "#FAF0F5",
      icon: "B"
    }
  ];

  return (
    <section id="gift" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#FFF5F7]/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-20 md:mb-28">
          <p className={`text-xs uppercase tracking-[0.5em] text-[#8C7A7A] mb-4 ${sans.className}`}>Gift Registry</p>
          <h2 className={`text-5xl md:text-7xl text-[#5A5050] italic mb-8 ${serif.className}`}>
            {preview.ewGiftTitle || "Hộp Quà Cưới"}
          </h2>
          <div className="w-16 h-[1px] bg-[#C9A9A9]/40 mx-auto mb-8" />
          <p className={`text-[#6B6161] text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto ${sans.className}`}>
            {preview.ewGiftLead || "Sự hiện diện của quý khách là món quà vô giá nhất. Nếu quý khách muốn gửi trao thêm tình cảm, gia đình xin chân thành cảm ơn."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {bankAccounts.map((acc, index) => (
            <motion.div 
              key={acc.id}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative pt-12">
                {/* Floating Avatar/Icon */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white border border-white shadow-xl z-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                   <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white to-[#F8F9FB] flex items-center justify-center border border-[#C9A9A9]/10 shadow-inner">
                      <span className={`text-[#C9A9A9] text-4xl ${serif.className}`}>{acc.icon}</span>
                   </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-10 md:p-14 text-center shadow-[0_30px_60px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 group-hover:-translate-y-2">
                  <div className="mt-8 space-y-2 mb-10">
                    <p className={`text-[10px] text-[#8C7A7A] uppercase tracking-[0.4em] ${sans.className}`}>{acc.title}</p>
                    <h3 className={`text-2xl md:text-3xl text-[#5A5050] ${serif.className}`}>{acc.bank}</h3>
                    <p className={`text-[#8C7A7A] text-[11px] font-medium uppercase tracking-widest pt-2 ${sans.className}`}>{acc.name}</p>
                  </div>

                  {/* Account Number Box */}
                  <div 
                    onClick={() => handleCopy(acc.number, acc.id)}
                    className="relative w-full bg-gradient-to-r from-white/60 to-white/30 border border-white/80 py-6 px-4 rounded-2xl cursor-pointer hover:bg-white/80 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center group/btn"
                  >
                    <span className={`text-xl md:text-2xl tracking-[0.2em] text-[#5A5050] font-light mb-1 ${sans.className}`}>{acc.number}</span>
                    
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {copied === acc.id ? (
                          <motion.span 
                            key="copied"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className={`text-[9px] text-[#C9A9A9] uppercase tracking-widest font-bold ${sans.className}`}
                          >
                            Đã sao chép!
                          </motion.span>
                        ) : (
                          <motion.div 
                            key="copy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-[#8C7A7A]/60 group-hover/btn:text-[#C9A9A9] transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span className={`text-[9px] uppercase tracking-widest font-medium ${sans.className}`}>Sao chép</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress Bar for copied state */}
                    <AnimatePresence>
                      {copied === acc.id && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2 }}
                          className="absolute bottom-0 left-0 h-[2px] bg-[#C9A9A9]/40"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
