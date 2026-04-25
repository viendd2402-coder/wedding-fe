import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Events({ preview }: { preview: any }) {
  return (
    <section className="relative w-full py-24 md:py-40 px-6 bg-[#1a1a1a] text-[#FDFBF7]">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div>
            <span className={`text-[#FF4D4D] text-xs uppercase tracking-[0.4em] font-medium block mb-4 ${sans.className}`}>
              The Details
            </span>
            <h2 className={`text-6xl md:text-8xl lg:text-9xl tracking-tighter ${serif.className}`}>
              {preview.rbEventsTitle || "Events."}
            </h2>
          </div>
          <p className={`text-[#FDFBF7]/60 font-light max-w-sm ${sans.className}`}>
            {preview.rbEventsLead || "Join us in celebrating a night of love, laughter, and unforgettable memories."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-24">
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group"
          >
            <div className="flex items-baseline gap-6 mb-8 border-b border-[#FDFBF7]/20 pb-8">
              <span className={`text-[#FF4D4D] text-sm uppercase tracking-[0.3em] font-medium ${sans.className}`}>01</span>
              <h3 className={`text-4xl md:text-5xl ${serif.className}`}>Lễ Vu Quy</h3>
            </div>
            
            <div className={`space-y-6 text-[#FDFBF7]/80 font-light ${sans.className}`}>
              <div className="flex justify-between items-center group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Time</span>
                <span className="text-2xl">{preview.rbCeremonyTime || preview.ceremonyTime || "09:00"}</span>
              </div>
              <div className="flex flex-col gap-2 group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Venue</span>
                <span className="text-xl">{preview.rbCeremonyVenue || "Tư gia nữ"}</span>
              </div>
              <div className="flex flex-col gap-2 group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Location</span>
                <span className="text-lg">{preview.rbCeremonyLocation || preview.location || "Đà Nẵng"}</span>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="group"
          >
            <div className="flex items-baseline gap-6 mb-8 border-b border-[#FDFBF7]/20 pb-8">
              <span className={`text-[#FF4D4D] text-sm uppercase tracking-[0.3em] font-medium ${sans.className}`}>02</span>
              <h3 className={`text-4xl md:text-5xl ${serif.className}`}>Tiệc Cưới</h3>
            </div>
            
            <div className={`space-y-6 text-[#FDFBF7]/80 font-light ${sans.className}`}>
              <div className="flex justify-between items-center group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Time</span>
                <span className="text-2xl">{preview.rbReceptionTime || preview.partyTime || "18:00"}</span>
              </div>
              <div className="flex flex-col gap-2 group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Venue</span>
                <span className="text-xl">{preview.rbReceptionVenue || preview.venue || "Riverside Garden"}</span>
              </div>
              <div className="flex flex-col gap-2 group-hover:text-white transition-colors">
                <span className="text-xs uppercase tracking-widest text-[#FDFBF7]/50">Location</span>
                <span className="text-lg">{preview.rbReceptionLocation || preview.location || "Đà Nẵng"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
