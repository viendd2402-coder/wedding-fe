import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Gallery({ preview, gallery, onPreviewImage }: { preview: any, gallery: string[], onPreviewImage: any }) {
  return (
    <section className="relative w-full py-24 md:py-48 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 mb-24 md:mb-40 flex flex-col items-center text-center">
        <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.5em] font-bold mb-8 block ${sans.className}`}>
          Nhật Ký Hình Ảnh
        </span>
        <h2 className={`text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tighter mb-12 ${serif.className}`}>
          {preview.rbGalleryTitle || "Khoảnh Khắc."}
        </h2>
        <div className="w-16 h-px bg-[#D4AF37] mb-12" />
        <p className={`text-lg md:text-xl text-[#7A756D] leading-relaxed font-light italic max-w-2xl ${serif.className}`}>
          {preview.rbGalleryLead || "Những khoảnh khắc ngưng đọng trong thời gian. Một bộ sưu tập của những ánh nhìn, những cảm xúc chân thật và niềm vui thuần khiết."}
        </p>
      </div>

      <div className="w-full px-6 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[3/4] relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[0], alt: "Gallery 0" })}
            >
              <img src={gallery[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="aspect-square relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[4], alt: "Gallery 4" })}
            >
              <img src={gallery[4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 md:gap-8 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="aspect-square relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[1], alt: "Gallery 1" })}
            >
              <img src={gallery[1]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="aspect-[3/5] relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[5], alt: "Gallery 5" })}
            >
              <img src={gallery[5]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="aspect-[4/5] relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[2], alt: "Gallery 2" })}
            >
              <img src={gallery[2]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="aspect-square relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[6], alt: "Gallery 6" })}
            >
              <img src={gallery[6]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-4 md:gap-8 md:mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="aspect-square relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[3], alt: "Gallery 3" })}
            >
              <img src={gallery[3]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="aspect-[3/4] relative group cursor-pointer overflow-hidden bg-[#F4F1EA]"
              onClick={() => onPreviewImage({ src: gallery[7], alt: "Gallery 7" })}
            >
              <img src={gallery[7]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
