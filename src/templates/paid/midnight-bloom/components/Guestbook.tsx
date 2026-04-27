"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { MessageCircle, CheckCircle } from "./Icons";

const mockWishes = [
  { name: "Khánh Linh", message: "Một đám cưới mang phong cách hoàng gia thực thụ! Chúc hai bạn mãi nồng cháy và hạnh phúc." },
  { name: "Đức Anh", message: "Màu đỏ Bordeaux rất đẳng cấp, chúc mừng ngày vui của hai bạn." },
];

export function Guestbook({ preview }: { preview: any }) {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; message?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên của bạn";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập lời chúc của bạn";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Lời chúc hơi ngắn, hãy gửi thêm tâm tình nhé";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", message: "" });
    }, 1500);
  };

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
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-12"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="space-y-4 text-left">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Danh tính</label>
                    <input 
                      type="text" 
                      placeholder="Họ và tên quý khách..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-transparent border-b ${errors.name ? "border-red-500" : "border-[#6D0E0E]/20"} py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light placeholder:text-gray-300`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] uppercase tracking-widest mt-2">{errors.name}</p>}
                  </div>
                  <div className="space-y-4 text-left">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Lời chúc</label>
                    <textarea 
                      rows={4}
                      placeholder="Gửi gắm tâm tình của bạn..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-transparent border-b ${errors.message ? "border-red-500" : "border-[#6D0E0E]/20"} py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light placeholder:text-gray-300 resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-[10px] uppercase tracking-widest mt-2">{errors.message}</p>}
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`${styles.goldButton} disabled:opacity-50`}
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi Lời Chúc"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="mx-auto text-green-600 mb-6 w-16 h-16" />
                  <h3 className={`${styles.serif} text-3xl mb-4 text-[#6D0E0E] italic font-bold`}>Đã Gửi Lời Chúc!</h3>
                  <p className="text-gray-500 font-light italic text-sm mb-10">Cảm ơn bạn đã dành những lời chúc tốt đẹp nhất cho chúng mình.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[#B8860B] uppercase tracking-[0.4em] text-[10px] font-bold"
                  >
                    Gửi thêm lời chúc
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
