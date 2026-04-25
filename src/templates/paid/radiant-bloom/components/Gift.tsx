"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Copy, Check } from "./Icons";

export function Gift({ preview }: { preview: any }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const hasBrideBankInfo =
    preview.rbBrideBankName ||
    preview.rbBrideAccountName ||
    preview.rbBrideAccountNumber;

  return (
    <section className="relative w-full py-24 md:py-40 px-6 bg-[#1a1a1a] text-[#FDFBF7]">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.4em] font-medium block mb-4 ${sans.className}`}>
            Registry
          </span>
          <h2 className={`text-6xl md:text-8xl tracking-tighter ${serif.className}`}>
            {preview.rbGiftTitle || "Gifts."}
          </h2>
          <p className={`text-[#FDFBF7]/60 font-light max-w-xl mx-auto mt-6 ${sans.className}`}>
            {preview.rbGiftLead || "Your presence is our greatest gift. Should you wish to bless us further, you may use the details below."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Groom Bank */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col border-t border-[#FDFBF7]/20 pt-8"
          >
            <p className={`text-[#FF4D4D] text-sm uppercase tracking-[0.3em] font-medium mb-4 ${sans.className}`}>To The Groom</p>
            <h3 className={`text-3xl md:text-4xl mb-12 ${serif.className}`}>{preview.groom}</h3>
            
            <div className={`space-y-6 ${sans.className}`}>
              <div className="flex justify-between items-center border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Bank</span>
                <span className="text-right">{preview.bankName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Name</span>
                <span className="text-right">{preview.accountName}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Account</span>
                <button 
                  onClick={() => handleCopy(preview.accountNumber)}
                  className="flex items-center gap-4 text-xl tracking-widest hover:text-[#FF4D4D] transition-colors group"
                >
                  {preview.accountNumber}
                  <span className="text-[#FDFBF7]/30 group-hover:text-[#FF4D4D] transition-colors">
                    <AnimatePresence mode="wait">
                      {copied === preview.accountNumber ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check className="w-5 h-5 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Copy className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bride Bank */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col border-t border-[#FDFBF7]/20 pt-8"
          >
            <p className={`text-[#FF4D4D] text-sm uppercase tracking-[0.3em] font-medium mb-4 ${sans.className}`}>To The Bride</p>
            <h3 className={`text-3xl md:text-4xl mb-12 ${serif.className}`}>{preview.bride}</h3>
            
            <div className={`space-y-6 ${sans.className}`}>
              <div className="flex justify-between items-center border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Bank</span>
                <span className="text-right">{hasBrideBankInfo ? preview.rbBrideBankName : preview.bankName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#FDFBF7]/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Name</span>
                <span className="text-right">{hasBrideBankInfo ? preview.rbBrideAccountName : preview.accountName}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Account</span>
                <button 
                  onClick={() => handleCopy(hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber)}
                  className="flex items-center gap-4 text-xl tracking-widest hover:text-[#FF4D4D] transition-colors group"
                >
                  {hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber}
                  <span className="text-[#FDFBF7]/30 group-hover:text-[#FF4D4D] transition-colors">
                    <AnimatePresence mode="wait">
                      {copied === (hasBrideBankInfo ? preview.rbBrideAccountNumber : preview.accountNumber) ? (
                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check className="w-5 h-5 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Copy className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
