"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../santorini-dream.module.css";
import { MessageCircle } from "./Icons";

const mockWishes = [
  { name: "Thu Hà", message: "Đám cưới rực rỡ quá! Chúc hai bạn hạnh phúc như nắng vàng Santorini." },
  { name: "Anh Quân", message: "Màu xanh tuyệt đẹp, chúc mừng hạnh phúc hai em nhé." },
];

export function Guestbook({ preview }: { preview: any }) {
  return (
    <section className={`${styles.sectionPadding} bg-[#f0f4f8]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="mx-auto text-cobalt mb-8 w-14 h-14 opacity-40" />
            <h2 className={`${styles.garamond} ${styles.sectionTitle} italic`}>Lời Chúc Phúc</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={styles.card}>
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Tên của bạn</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-b-2 border-cobalt/20 py-3 text-lg outline-none focus:border-cobalt transition-colors font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Lời chúc</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white border-b-2 border-cobalt/20 py-3 text-lg outline-none focus:border-cobalt transition-colors font-light resize-none"
                />
              </div>
              <button type="button" className={`${styles.cobaltButton} w-full`}>Gửi Lời Chúc</button>
            </form>
          </div>

          <div className="space-y-8">
            {mockWishes.map((wish, idx) => (
              <div key={idx} className="p-8 bg-white border-2 border-cobalt shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-cobalt/5 rotate-45 translate-x-6 -translate-y-6" />
                <p className="text-cobalt font-bold mb-3 italic">{wish.name}</p>
                <p className="text-gray-500 font-light text-sm">"{wish.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
