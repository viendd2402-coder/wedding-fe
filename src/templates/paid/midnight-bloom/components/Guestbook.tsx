"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { MessageCircle } from "./Icons";

const mockWishes = [
  { name: "Khánh Linh", message: "Một đám cưới mang phong cách hoàng gia thực thụ! Chúc hai bạn mãi nồng cháy và hạnh phúc." },
  { name: "Đức Anh", message: "Màu đỏ Bordeaux rất đẳng cấp, chúc mừng ngày vui của hai bạn." },
];

export function Guestbook({ preview }: { preview: any }) {
  return (
    <section className={`${styles.sectionPadding} bg-[#FDF5E6]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="mx-auto text-[#6D0E0E] mb-8 w-14 h-14 opacity-30" />
            <h2 className={`${styles.serif} ${styles.sectionTitle} italic`}>Lời Chúc Phúc</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className={styles.card}>
            <form className="space-y-12">
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Danh tính</label>
                <input 
                  type="text" 
                  placeholder="Họ và tên quý khách..."
                  className="w-full bg-transparent border-b border-[#6D0E0E]/20 py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light placeholder:text-gray-300"
                />
              </div>
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Lời chúc</label>
                <textarea 
                  rows={4}
                  placeholder="Gửi gắm tâm tình của bạn..."
                  className="w-full bg-transparent border-b border-[#6D0E0E]/20 py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light placeholder:text-gray-300 resize-none"
                />
              </div>
              <button type="button" className={styles.goldButton}>Gửi Lời Chúc</button>
            </form>
          </div>

          <div className="space-y-10">
            {mockWishes.map((wish, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="p-10 border border-[#B8860B]/10 bg-white relative"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#6D0E0E]" />
                <p className="text-[#6D0E0E] font-bold mb-4 italic text-lg">{wish.name}</p>
                <p className="text-gray-500 font-light italic leading-relaxed text-sm">"{wish.message}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
