"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Copy, Check } from "./Icons";

export function Gift({ preview }: { preview: any }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const hasBrideBankInfo =
    preview.rbBrideBankName ||
    preview.rbBrideAccountName ||
    preview.rbBrideAccountNumber;

  return (
    <section className="relative w-full py-24 md:py-48 px-6 bg-white text-[#1a1a1a] overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#FF4D4D]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24 md:mb-40"
        >
          <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.6em] font-bold block mb-8 ${sans.className}`}>
            Quà Cưới
          </span>
          <h2 className={`text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-12 ${serif.className}`}>
            {preview.rbGiftTitle || "Hộp Mừng Cưới."}
          </h2>
          <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-12" />
          <p className={`text-[#7A756D] font-light max-w-xl mx-auto text-lg leading-relaxed ${sans.className}`}>
            {preview.rbGiftLead || "Sự hiện diện của bạn là món quà lớn nhất đối với chúng tôi. Tuy nhiên, nếu bạn muốn gửi quà mừng, có thể tham khảo thông tin dưới đây."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-5xl mx-auto">
          {/* Groom Bank */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group"
          >
            <div className="relative p-10 md:p-16 border border-[#F4F1EA] bg-[#FDFBF7] shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
              <span className={`text-[#FF4D4D] text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block ${sans.className}`}>Mừng Cưới Chú Rể</span>
              <h3 className={`text-4xl md:text-5xl mb-12 ${serif.className}`}>{preview.groom}</h3>
              
              <div className={`space-y-10 ${sans.className}`}>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Ngân hàng</span>
                  <span className="text-xl font-light">{preview.bankName || "Ngân hàng"}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Chủ tài khoản</span>
                  <span className="text-xl font-light">{preview.accountName || preview.groom}</span>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => handleCopy(preview.accountNumber || "0000 0000 0000")}
                    className="w-full flex items-center justify-between group-hover:text-[#FF4D4D] transition-colors border-b border-[#D8D4CC] pb-4"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Số tài khoản</span>
                      <span className="text-2xl font-medium tracking-[0.1em]">{preview.accountNumber || "0000 0000 0000"}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {copied === (preview.accountNumber || "0000 0000 0000") ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="group-hover:text-[#FF4D4D] transition-colors">
                          <Copy className="w-6 h-6 opacity-30 group-hover:opacity-100" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bride Bank */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="group"
          >
            <div className="relative p-10 md:p-16 border border-[#F4F1EA] bg-[#FDFBF7] shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
              <span className={`text-[#FF4D4D] text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block ${sans.className}`}>Mừng Cưới Cô Dâu</span>
              <h3 className={`text-4xl md:text-5xl mb-12 ${serif.className}`}>{preview.bride}</h3>
              
              <div className={`space-y-10 ${sans.className}`}>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Ngân hàng</span>
                  <span className="text-xl font-light">{hasBrideBankInfo ? preview.rbBrideBankName : preview.bankName || "Ngân hàng"}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Chủ tài khoản</span>
                  <span className="text-xl font-light">{hasBrideBankInfo ? preview.rbBrideAccountName : preview.accountName || preview.bride}</span>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => handleCopy(hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber || "0000 0000 0000")}
                    className="w-full flex items-center justify-between group-hover:text-[#FF4D4D] transition-colors border-b border-[#D8D4CC] pb-4"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#A4A7A5]">Số tài khoản</span>
                      <span className="text-2xl font-medium tracking-[0.1em]">{hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber || "0000 0000 0000"}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {copied === (hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber || "0000 0000 0000") ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} className="group-hover:text-[#FF4D4D] transition-colors">
                          <Copy className="w-6 h-6 opacity-30 group-hover:opacity-100" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
