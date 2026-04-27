"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../retro-soul.module.css";
import { Heart } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
  const [formData, setFormData] = useState({
    name: "",
    side: "groom",
    attending: "yes"
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Vui lòng nhập tên của bạn nhé!");
      return;
    }
    setError("");
    setIsSuccess(true);
    // Simulate API call
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="rsvp" className={`${styles.sectionPadding} bg-[#FF6B6B]/10`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <div className="text-center mb-12">
            <Heart className="mx-auto text-[#FF6B6B] mb-6 w-16 h-16" />
            <h2 className={`${styles.groovy} text-5xl mb-4`}>Bạn sẽ tới chứ?</h2>
            <p className="font-bold uppercase tracking-widest text-xs">Phản hồi ngay để chúng mình chuẩn bị mâm cỗ thật ngon!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Tên của bạn</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên khách mời..."
                  className={`w-full bg-white border-4 p-4 outline-none transition-colors ${error ? 'border-red-500' : 'border-black focus:bg-[#FFE66D]/20'}`}
                />
                {error && <p className="text-red-500 text-[10px] font-black uppercase italic">{error}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Bên nhà nào</label>
                <select 
                  value={formData.side}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                  className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-[#FFE66D]/20 cursor-pointer appearance-none"
                >
                  <option value="groom">Nhà Trai</option>
                  <option value="bride">Nhà Gái</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <label className="font-black uppercase text-xs block mb-4">Sự tham dự</label>
              <div className="flex flex-wrap gap-8">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-8 h-8 border-4 border-black bg-white flex items-center justify-center p-1">
                    <div className={`w-full h-full bg-[#FF6B6B] transition-opacity ${formData.attending === 'yes' ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className={`font-black uppercase text-sm ${formData.attending === 'yes' ? 'text-black' : 'text-gray-400'}`}>Chắc chắn luôn!</span>
                  <input 
                    type="radio" 
                    name="attending" 
                    className="hidden" 
                    checked={formData.attending === 'yes'}
                    onChange={() => setFormData({ ...formData, attending: 'yes' })}
                  />
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-8 h-8 border-4 border-black bg-white flex items-center justify-center p-1">
                    <div className={`w-full h-full bg-[#FF6B6B] transition-opacity ${formData.attending === 'no' ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className={`font-black uppercase text-sm ${formData.attending === 'no' ? 'text-black' : 'text-gray-400'}`}>Rất tiếc...</span>
                  <input 
                    type="radio" 
                    name="attending" 
                    className="hidden" 
                    checked={formData.attending === 'no'}
                    onChange={() => setFormData({ ...formData, attending: 'no' })}
                  />
                </label>
              </div>
            </div>

            <div className="pt-6 flex flex-col items-center gap-4">
              <button type="submit" className={styles.retroButton}>
                Xác Nhận Ngay
              </button>
              
              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-600 font-black uppercase text-xs"
                  >
                    ✦ Cảm ơn bạn đã phản hồi!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
