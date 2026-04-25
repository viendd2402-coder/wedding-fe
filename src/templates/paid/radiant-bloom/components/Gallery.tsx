import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Gallery({ preview, gallery, onPreviewImage }: { preview: any, gallery: string[], onPreviewImage: any }) {
  return (
    <section className="relative w-full py-24 md:py-40 bg-[#FDFBF7]">
      <div className="w-full max-w-7xl mx-auto px-6 mb-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <h2 className={`text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a] tracking-tighter ${serif.className}`}>
          {preview.rbGalleryTitle || "Gallery."}
        </h2>
        <div className="w-full md:w-1/3">
          <p className={`text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed font-light ${sans.className}`}>
            {preview.rbGalleryLead || "Moments suspended in time. A collection of stolen glances, raw emotions, and pure joy."}
          </p>
        </div>
      </div>

      <div className="w-full px-6 flex flex-col gap-12 md:gap-32">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-3/5 aspect-[4/3] relative group cursor-pointer overflow-hidden"
            onClick={() => onPreviewImage({ src: gallery[0], alt: "Gallery 1" })}
          >
            <img src={gallery[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-2/5 aspect-[3/4] relative group cursor-pointer overflow-hidden"
            onClick={() => onPreviewImage({ src: gallery[1], alt: "Gallery 2" })}
          >
            <img src={gallery[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:-mt-24">
          <div className="hidden md:block w-1/5" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-2/5 aspect-square relative group cursor-pointer overflow-hidden"
            onClick={() => onPreviewImage({ src: gallery[2], alt: "Gallery 3" })}
          >
            <img src={gallery[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/3 aspect-[4/5] relative group cursor-pointer overflow-hidden md:mt-48"
            onClick={() => onPreviewImage({ src: gallery[3], alt: "Gallery 4" })}
          >
            <img src={gallery[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
