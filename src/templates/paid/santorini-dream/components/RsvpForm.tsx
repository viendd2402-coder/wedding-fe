"use client";

import React, { useState } from "react";
import styles from "../santorini-dream.module.css";

export function RsvpForm({ preview }: { preview: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }
    setError("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-cobalt font-bold">Cảm ơn bạn đã xác nhận!</p>
        <p className="text-xs text-gray-400 mt-2">Chúng mình đã nhận được thông tin.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8 text-left">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Tên của bạn</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value) setError("");
            }}
            placeholder="Nhập họ và tên"
            className={`${styles.inputField} ${error ? 'border-red-400' : ''}`}
          />
          {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Bạn là khách của</label>
          <select className={styles.inputField}>
            <option value="groom">Nhà Trai</option>
            <option value="bride">Nhà Gái</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">Tham dự</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="attending" defaultChecked className="accent-gold" />
              <span className="text-xs text-cobalt">Sẽ tham dự</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="attending" className="accent-gold" />
              <span className="text-xs text-cobalt">Rất tiếc</span>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className={`${styles.goldButton} w-full`}>Gửi Xác Nhận</button>
        </div>
      </form>
    </div>
  );
}

