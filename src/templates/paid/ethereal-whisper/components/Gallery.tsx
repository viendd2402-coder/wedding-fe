import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Gallery({ preview, gallery, onPreviewImage }: { preview: any, gallery: string[], onPreviewImage: any }) {
  const fadeUp: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <section id="gallery" className="py-12 md:py-20 px-6">
      <div className="max-w-[100rem] mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16 md:mb-24">
          <p className={`text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-4 ${sans.className}`}>Memories</p>
          <h2 className={`text-5xl md:text-6xl text-[#5A5050] italic mb-6 ${serif.className}`}>
            {preview.ewGalleryTitle || "Kỉ Niệm"}
          </h2>
          <p className={`text-[#6B6161] font-light tracking-wide text-sm ${sans.className}`}>
            {preview.ewGalleryLead || "Những khoảnh khắc đáng nhớ nhất của chúng tôi"}
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {gallery.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
              className="relative break-inside-avoid overflow-hidden cursor-pointer group rounded-[2rem] border-2 border-white/40 shadow-sm"
              onClick={() => onPreviewImage({ src, alt: `Gallery ${idx}` })}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
              <img
                src={src}
                alt={`Album ${idx}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
