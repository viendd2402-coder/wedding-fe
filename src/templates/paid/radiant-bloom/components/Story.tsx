import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Story({ preview }: { preview: any }) {
  return (
    <section className="relative w-full py-24 md:py-48 px-6 md:px-12 bg-white flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-4xl border-l border-[#1a1a1a]/10 pl-8 md:pl-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className={`text-[#A4A7A5] text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-12 block ${sans.className}`}>
            Ghi Chú Triển Lãm / 01
          </span>

          <h2 className={`text-4xl md:text-6xl lg:text-7xl text-[#1a1a1a] leading-tight mb-16 font-light ${serif.className}`}>
            {preview.rbWelcomeTitle || "Yêu và được yêu là cảm nhận ánh mặt trời từ cả hai phía."}
          </h2>

          <div className="max-w-2xl">
            <p className={`text-base md:text-lg text-[#7A756D] leading-relaxed font-light ${sans.className}`}>
              {preview.rbWelcomeText || "Chúng tôi bắt đầu hành trình bằng một lời chào đơn giản, và giờ đây là hàng triệu khoảnh khắc không thể quên. Đây là câu chuyện của chúng tôi, tự nhiên và chân thật."}
            </p>
          </div>
          
          <div className="mt-16 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#1a1a1a]" />
            <span className={`text-[10px] uppercase tracking-[0.4em] text-[#1a1a1a] font-bold ${sans.className}`}>Giới thiệu bởi {preview.groom} & {preview.bride}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
