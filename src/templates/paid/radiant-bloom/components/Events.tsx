import React from "react";
import { motion } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Events({ preview }: { preview: any }) {
  const events = [
    {
      id: "01",
      title: preview.rbVuQuyTitle || "Lễ Vu Quy",
      time: preview.rbVuQuyTime || preview.ceremonyTime || "09:00",
      venue: preview.rbVuQuyVenue || "Tư gia nữ",
      location: preview.rbVuQuyLocation || preview.location || "Đà Nẵng",
    },
    {
      id: "02",
      title: preview.rbGroomEventTitle || "Lễ Thành Hôn",
      time: preview.rbGroomEventTime || preview.partyTime || "11:00",
      venue: preview.rbGroomEventVenue || "Tư gia nam",
      location: preview.rbGroomEventLocation || preview.location || "Đà Nẵng",
    },
    {
      id: "03",
      title: preview.rbReceptionTitle || "Tiệc Cưới",
      time: preview.rbReceptionTime || preview.partyTime || "18:00",
      venue: preview.rbReceptionVenue || preview.venue || "Riverside Garden",
      location: preview.rbReceptionLocation || preview.location || "Đà Nẵng",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-48 px-6 bg-white overflow-hidden border-y border-[#F4F1EA]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className={`p-12 md:p-16 flex flex-col items-center text-center border-b md:border-b-0 ${
                idx !== events.length - 1 ? "md:border-r border-[#F4F1EA]" : ""
              }`}
            >
              <span className={`text-[#A4A7A5] text-[10px] uppercase tracking-[0.4em] font-bold mb-12 block ${sans.className}`}>
                Sự Kiện {event.id}
              </span>
              
              <h3 className={`text-4xl md:text-5xl mb-12 font-light text-[#1a1a1a] ${serif.className}`}>
                {event.title}
              </h3>

              <div className={`space-y-10 w-full ${sans.className}`}>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#A4A7A5] font-bold">Thời gian</span>
                  <span className="text-xl text-[#1a1a1a] font-light">{event.time}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#A4A7A5] font-bold">Địa điểm</span>
                  <span className="text-lg text-[#1a1a1a] font-light">{event.venue}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#A4A7A5] font-bold">Vị trí</span>
                  <span className="text-sm text-[#7A756D]">{event.location}</span>
                </div>
              </div>

              <div className="mt-16">
                <button className="text-[9px] uppercase tracking-[0.4em] font-bold text-black border-b border-black pb-1 hover:text-[#7A756D] hover:border-[#7A756D] transition-colors">
                  Thêm vào Lịch
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
