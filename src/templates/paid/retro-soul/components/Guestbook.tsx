"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../retro-soul.module.css";
import { MessageCircle } from "./Icons";

const initialWishes = [
  { name: "Hùng Dũng", message: "Gout thẩm mỹ đỉnh quá! Chúc hai bạn mãi chất như thế này nhé." },
  { name: "Minh Anh", message: "Quá ấn tượng, chúc mừng ngày vui của hai bạn." },
];

export function Guestbook({ preview }: { preview: any }) {
  const [wishes, setWishes] = useState(initialWishes);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({ name: false, message: false });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name.trim(),
      message: !formData.message.trim()
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.message) return;

    // Simulate submission
    const newWish = { ...formData };
    setWishes([newWish, ...wishes]);
    setFormData({ name: "", message: "" });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section className={`${styles.sectionPadding} bg-[#F7FFF7]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="mx-auto text-[#FF6B6B] mb-6 w-16 h-16" />
            <h2 className={`${styles.groovy} ${styles.sectionTitle}`}>Lưu Bút</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className={styles.card}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Biệt danh</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tên của bạn..."
                  className={`w-full bg-white border-4 p-4 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-black focus:bg-[#FFE66D]/20'}`}
                />
                {errors.name && <p className="text-red-500 text-[10px] font-black uppercase italic">Vui lòng nhập tên bạn nhé!</p>}
              </div>
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Lời nhắn nhủ</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Gửi lời chúc đến chúng mình..."
                  className={`w-full bg-white border-4 p-4 outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-black focus:bg-[#FFE66D]/20'}`}
                />
                {errors.message && <p className="text-red-500 text-[10px] font-black uppercase italic">Đừng quên để lại lời chúc nhé!</p>}
              </div>
              <div className="flex flex-col items-center gap-4">
                <button type="submit" className={styles.retroButton + " w-full"}>Gửi Ngay!</button>
                <AnimatePresence>
                  {isSuccess && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-green-600 font-black uppercase text-xs"
                    >
                      ✦ Lời chúc đã được gửi đi!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {wishes.map((wish, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 bg-white border-4 border-dark shadow-[8px_8px_0_var(--secondary)]"
              >
                <p className="font-black text-[#FF6B6B] uppercase mb-2 text-sm">{wish.name}</p>
                <p className="font-bold italic text-dark">"{wish.message}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
