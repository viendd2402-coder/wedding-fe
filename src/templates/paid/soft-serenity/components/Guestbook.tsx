import React from "react";
import { motion } from "framer-motion";
import styles from "../soft-serenity.module.css";
import { MessageCircle } from "./Icons";

const mockWishes = [
  { name: "Minh Thư", message: "Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử nhé!" },
  { name: "Thanh Tùng", message: "Mãi yêu nhau như ngày đầu tiên nha hai bạn của tôi." },
  { name: "Gia Hân", message: "Đám cưới tuyệt vời quá. Chúc mừng hạnh phúc hai bạn!" }
];

export function Guestbook({ preview }: { preview: any }) {
  return (
    <section id="rsvp" className={`${styles.sectionPadding} bg-white`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-8">
              <MessageCircle className="text-[#c5a059] w-12 h-12 opacity-60" />
            </div>
            <h2 className={`${styles.serif} ${styles.sectionTitle}`}>Lưu Bút & Chúc Phúc</h2>
            <p className={styles.sectionLead}>{preview.tlRsvpLead || "Hãy để lại những lời chúc ngọt ngào nhất dành cho chúng mình nhé!"}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={styles.card}
          >
            <form className="space-y-8">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Tên của bạn</label>
                <input 
                  type="text" 
                  placeholder="Nhập tên..."
                  className="w-full bg-transparent border-b border-[#c5a059]/30 py-3 text-lg outline-none focus:border-[#c5a059] transition-colors font-light"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Lời chúc</label>
                <textarea 
                  rows={4}
                  placeholder="Viết lời chúc tại đây..."
                  className="w-full bg-transparent border-b border-[#c5a059]/30 py-3 text-lg outline-none focus:border-[#c5a059] transition-colors font-light resize-none"
                />
              </div>

              <button type="button" className={`${styles.rsvpButton} w-full`}>
                Gửi Lời Chúc
              </button>
            </form>
          </motion.div>

          {/* Messages Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-[#c5a059] uppercase tracking-[0.4em] text-xs font-bold mb-8">Lời chúc từ bạn bè</h4>
            <div className="max-h-[500px] overflow-y-auto pr-4 space-y-6 custom-scrollbar">
              {mockWishes.map((wish, idx) => (
                <div key={idx} className="p-6 bg-[#FDFBF7] border-l-4 border-[#c5a059] relative">
                  <p className="text-gray-800 font-medium mb-2">{wish.name}</p>
                  <p className="text-gray-500 font-light text-sm italic">"{wish.message}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
