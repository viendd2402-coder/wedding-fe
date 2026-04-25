import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Calendar, MapPin } from "./Icons";

export function Events({ preview }: { preview: any }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <section id="events" className="py-12 md:py-20 px-6">
      <div className="max-w-[90rem] mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16 md:mb-24">
          <p className={`text-xs uppercase tracking-[0.4em] text-[#8C7A7A] mb-4 ${sans.className}`}>The Details</p>
          <h2 className={`text-5xl md:text-6xl text-[#5A5050] italic ${serif.className}`}>
            {preview.ewEventsTitle || "Sự Kiện"}
          </h2>
          <p className={`text-[#6B6161] font-light max-w-md mx-auto mt-6 text-sm leading-loose ${sans.className}`}>
            {preview.ewEventsLead || "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi tại các sự kiện sau:"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Ceremony */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative group">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-10 md:p-14 rounded-3xl h-full shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col hover:bg-white/50 transition-colors duration-500">
              <h3 className={`text-3xl md:text-4xl text-[#5A5050] mb-8 ${serif.className}`}>Tiệc Cưới Nhà Gái</h3>
              
              <div className={`mt-auto space-y-6 font-light text-[#6B6161] text-sm tracking-wide ${sans.className}`}>
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-[#C9A9A9] shrink-0" />
                  <div>
                    <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[10px]">{preview.dateLabel}</p>
                    <p className="text-[#5A5050]">{preview.ewCeremonyTime || preview.ceremonyTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C9A9A9] shrink-0" />
                  <div>
                    <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[10px]">{preview.ewCeremonyVenue || preview.venue}</p>
                    <p className="leading-relaxed text-[#5A5050]">{preview.ewCeremonyLocation || preview.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reception */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group">
            <div className="bg-white/40 backdrop-blur-md border border-white/60 p-10 md:p-14 rounded-3xl h-full shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col hover:bg-white/50 transition-colors duration-500">
              <h3 className={`text-3xl md:text-4xl text-[#5A5050] mb-8 ${serif.className}`}>Tiệc Cưới Nhà Trai</h3>
              
              <div className={`mt-auto space-y-6 font-light text-[#6B6161] text-sm tracking-wide ${sans.className}`}>
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-[#C9A9A9] shrink-0" />
                  <div>
                    <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[10px]">{preview.dateLabel}</p>
                    <p className="text-[#5A5050]">{preview.ewReceptionTime || preview.partyTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C9A9A9] shrink-0" />
                  <div>
                    <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[10px]">{preview.ewReceptionVenue || preview.venue}</p>
                    <p className="leading-relaxed text-[#5A5050]">{preview.ewReceptionLocation || preview.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
