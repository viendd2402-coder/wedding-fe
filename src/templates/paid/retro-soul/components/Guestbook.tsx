"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../retro-soul.module.css";
import { MessageCircle } from "./Icons";

const mockWishes = [
  { name: "Hùng Dũng", message: "Gout thẩm mỹ đỉnh quá! Chúc hai bạn mãi chất như thế này nhé." },
  { name: "Minh Anh", message: "Quá ấn tượng, chúc mừng ngày vui của hai bạn." },
];

export function Guestbook({ preview }: { preview: any }) {
  return (
    <section className={`${styles.sectionPadding} bg-[#f4f1ea]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="mx-auto text-orange mb-6 w-16 h-16" />
            <h2 className={`${styles.groovy} ${styles.sectionTitle}`}>Lưu Bút</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={styles.card}>
            <form className="space-y-8">
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Biệt danh</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-mustard/10"
                />
              </div>
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Lời nhắn nhủ</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-mustard/10 resize-none"
                />
              </div>
              <button type="button" className={styles.retroButton}>Gửi Ngay!</button>
            </form>
          </div>

          <div className="space-y-6">
            {mockWishes.map((wish, idx) => (
              <div key={idx} className="p-8 bg-white border-4 border-black shadow-[8px_8px_0_var(--green)]">
                <p className="font-black text-orange uppercase mb-2">{wish.name}</p>
                <p className="font-medium italic">"{wish.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
