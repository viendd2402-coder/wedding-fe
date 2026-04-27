"use client";

import React, { useState } from "react";
import styles from "../santorini-dream.module.css";

const mockWishes = [
  { name: "Thu Hà", message: "Đám cưới rực rỡ quá! Chúc hai bạn hạnh phúc như nắng vàng Santorini." },
  { name: "Anh Quân", message: "Màu xanh tuyệt đẹp, chúc mừng hạnh phúc hai em nhé." },
];

export function Guestbook({ preview }: { preview: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", message: "" };
    let hasError = false;

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên";
      hasError = true;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập lời chúc";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", message: "" });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", message: "" });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {isSubmitted ? (
        <div className="text-center py-10">
          <p className="text-cobalt font-bold">Cảm ơn lời chúc của bạn!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-left mb-12">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Tên của bạn</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (e.target.value) setErrors({ ...errors, name: "" });
              }}
              className={`${styles.inputField} ${errors.name ? 'border-red-400' : ''}`}
              placeholder="Họ và tên"
            />
            {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Lời chúc</label>
            <textarea 
              rows={3}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (e.target.value) setErrors({ ...errors, message: "" });
              }}
              className={`${styles.inputField} ${errors.message ? 'border-red-400' : ''}`}
              placeholder="Nhập lời chúc phúc của bạn"
            />
            {errors.message && <p className="text-[10px] text-red-500 font-medium">{errors.message}</p>}
          </div>
          <button type="submit" className={`${styles.cobaltButton} w-full`}>Gửi Lời Chúc</button>
        </form>
      )}

      <div className={styles.guestbookGrid}>
        {mockWishes.map((wish, idx) => (
          <div key={idx} className={styles.wishCard}>
            <p className={styles.wishName}>{wish.name}</p>
            <p className={styles.wishMessage}>"{wish.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
