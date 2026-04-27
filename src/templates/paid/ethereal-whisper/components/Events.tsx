import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Calendar, MapPin } from "./Icons";

export function Events({ preview }: { preview: any }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  const events = [
    {
      title: "Lễ Vu Quy",
      time: preview.ewEngagementTime || "09:00 - 20/12/2024",
      venue: preview.ewEngagementVenue || "Tư gia nhà gái",
      location: preview.ewEngagementLocation || "Số 123, Đường Hoa Hồng, TP. HCM",
      icon: <Calendar className="w-5 h-5 text-[#C9A9A9] shrink-0" />
    },
    {
      title: "Tiệc Cưới Nhà Gái",
      time: preview.ewCeremonyTime || preview.ceremonyTime || "11:00 - 21/12/2024",
      venue: preview.ewCeremonyVenue || preview.venue || "Trung tâm tiệc cưới Gem Center",
      location: preview.ewCeremonyLocation || preview.location || "Số 8 Nguyễn Bỉnh Khiêm, Quận 1, TP. HCM",
      icon: <Calendar className="w-5 h-5 text-[#C9A9A9] shrink-0" />
    },
    {
      title: "Tiệc Cưới Nhà Trai",
      time: preview.ewReceptionTime || preview.partyTime || "18:00 - 22/12/2024",
      venue: preview.ewReceptionVenue || preview.venue || "Adora Luxury",
      location: preview.ewReceptionLocation || preview.location || "198 Hoàng Văn Thụ, Quận Phú Nhuận, TP. HCM",
      icon: <Calendar className="w-5 h-5 text-[#C9A9A9] shrink-0" />
    }
  ];

  return (
    <section id="events" className="py-20 md:py-32 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF5F7] rounded-full blur-[100px] opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F3F6FA] rounded-full blur-[100px] opacity-50 -z-10" />

      <div className="max-w-[90rem] mx-auto">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
          className="text-center mb-20 md:mb-28"
        >
          <p className={`text-xs uppercase tracking-[0.5em] text-[#8C7A7A] mb-4 ${sans.className}`}>The Celebration</p>
          <h2 className={`text-5xl md:text-7xl text-[#5A5050] italic ${serif.className}`}>
            {preview.ewEventsTitle || "Sự Kiện"}
          </h2>
          <div className="w-20 h-[1px] bg-[#C9A9A9]/40 mx-auto mt-8 mb-6" />
          <p className={`text-[#6B6161] font-light max-w-lg mx-auto text-sm md:text-base leading-relaxed ${sans.className}`}>
            {preview.ewEventsLead || "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi tại các buổi lễ quan trọng:"}
          </p>
        </motion.div>

        <motion.div 
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={fadeUp} className="group relative">
              <div className="h-full bg-white/40 backdrop-blur-xl border border-white/80 p-8 md:p-12 rounded-[2.5rem] shadow-[0_15px_45px_rgba(0,0,0,0.03)] flex flex-col hover:bg-white/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] transition-all duration-700 ease-out group-hover:-translate-y-2">
                <div className="mb-10">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#FFF5F7] border border-[#C9A9A9]/20 text-[10px] uppercase tracking-widest text-[#8C7A7A] mb-6 ${sans.className}">
                    Wedding Event
                  </div>
                  <h3 className={`text-3xl md:text-4xl text-[#5A5050] leading-tight ${serif.className}`}>{event.title}</h3>
                </div>
                
                <div className={`mt-auto space-y-8 font-light text-[#6B6161] text-sm tracking-wide ${sans.className}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/50 border border-white flex items-center justify-center shadow-sm group-hover:bg-[#FFF5F7] transition-colors duration-500">
                      <Calendar className="w-4 h-4 text-[#C9A9A9]" />
                    </div>
                    <div>
                      <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[9px] font-medium">Thời gian</p>
                      <p className="text-[#5A5050] font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/50 border border-white flex items-center justify-center shadow-sm group-hover:bg-[#FFF5F7] transition-colors duration-500">
                      <MapPin className="w-4 h-4 text-[#C9A9A9]" />
                    </div>
                    <div>
                      <p className="text-[#8C7A7A] uppercase tracking-widest mb-1 text-[9px] font-medium">{event.venue}</p>
                      <p className="leading-relaxed text-[#5A5050] line-clamp-2 group-hover:line-clamp-none transition-all duration-500">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[#C9A9A9]/10">
                   <button className={`w-full py-3 px-6 rounded-full border border-[#C9A9A9]/30 text-[#8C7A7A] text-[10px] uppercase tracking-widest hover:bg-[#C9A9A9] hover:text-white hover:border-[#C9A9A9] transition-all duration-500 ${sans.className}`}>
                     Xem bản đồ
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
