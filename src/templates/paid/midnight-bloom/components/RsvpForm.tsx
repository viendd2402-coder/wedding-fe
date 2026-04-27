"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { Heart, CheckCircle } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
  const [formData, setFormData] = useState({
    name: "",
    side: "groom",
    attending: "yes"
  });
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { name?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên của bạn";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên quá ngắn";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="rsvp" className={`${styles.sectionPadding} bg-white relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#6D0E0E] via-[#B8860B] to-[#6D0E0E]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="text-center mb-16">
                  <Heart className="mx-auto text-[#6D0E0E] mb-6 w-14 h-14 opacity-30" />
                  <h2 className={`${styles.serif} text-5xl mb-6 text-[#6D0E0E] italic font-bold`}>Xác Nhận Sự Hiện Diện</h2>
                  <p className="text-gray-400 font-light tracking-[0.3em] uppercase text-[10px] font-bold">Rất hân hạnh được đón tiếp quý khách tại lễ thành hôn hoàng gia.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4 text-left">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Họ và tên</label>
                      <input 
                        type="text" 
                        placeholder="..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-transparent border-b ${errors.name ? "border-red-500" : "border-[#6D0E0E]/20"} py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light`}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] uppercase tracking-widest mt-2">{errors.name}</p>}
                    </div>
                    <div className="space-y-4 text-left">
                      <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Khách của gia đình</label>
                      <select 
                        value={formData.side}
                        onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                        className="w-full bg-transparent border-b border-[#6D0E0E]/20 py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light cursor-pointer appearance-none"
                      >
                        <option value="groom">Nhà Trai</option>
                        <option value="bride">Nhà Gái</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-10 text-left">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B] block mb-6">Bạn sẽ tham dự chứ?</label>
                    <div className="flex flex-wrap gap-12">
                      <label className="flex items-center gap-5 cursor-pointer group">
                        <div className={`w-7 h-7 rounded-full border-2 ${formData.attending === "yes" ? "border-[#6D0E0E]" : "border-[#6D0E0E]/20"} flex items-center justify-center`}>
                          <div className={`w-3.5 h-3.5 rounded-full bg-[#6D0E0E] transition-transform ${formData.attending === "yes" ? "scale-100" : "scale-0"}`} />
                        </div>
                        <span className={`text-sm uppercase tracking-widest font-bold ${formData.attending === "yes" ? "text-[#2C1810]" : "text-gray-400"}`}>Chắc chắn tham dự</span>
                        <input 
                          type="radio" 
                          name="attending" 
                          className="hidden" 
                          checked={formData.attending === "yes"}
                          onChange={() => setFormData({ ...formData, attending: "yes" })}
                        />
                      </label>
                      <label className="flex items-center gap-5 cursor-pointer group">
                        <div className={`w-7 h-7 rounded-full border-2 ${formData.attending === "no" ? "border-[#6D0E0E]" : "border-[#6D0E0E]/20"} flex items-center justify-center`}>
                          <div className={`w-3.5 h-3.5 rounded-full bg-[#6D0E0E] transition-transform ${formData.attending === "no" ? "scale-100" : "scale-0"}`} />
                        </div>
                        <span className={`text-sm uppercase tracking-widest font-bold ${formData.attending === "no" ? "text-[#2C1810]" : "text-gray-400"}`}>Rất tiếc không thể đến</span>
                        <input 
                          type="radio" 
                          name="attending" 
                          className="hidden" 
                          checked={formData.attending === "no"}
                          onChange={() => setFormData({ ...formData, attending: "no" })}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-10 flex justify-center">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`${styles.goldButton} disabled:opacity-50 disabled:cursor-not-allowed min-w-[240px]`}
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi Xác Nhận"}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <CheckCircle className="mx-auto text-green-600 mb-8 w-20 h-20" />
                <h3 className={`${styles.serif} text-4xl mb-6 text-[#6D0E0E] italic font-bold`}>Cảm Ơn Bạn!</h3>
                <p className="text-gray-500 font-light italic leading-relaxed max-w-md mx-auto">
                  Thông tin của bạn đã được ghi nhận. Chúng mình rất mong chờ được gặp bạn tại buổi tiệc!
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-12 text-[#B8860B] uppercase tracking-[0.4em] text-[10px] font-bold hover:text-[#6D0E0E] transition-colors"
                >
                  Gửi lại phản hồi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
