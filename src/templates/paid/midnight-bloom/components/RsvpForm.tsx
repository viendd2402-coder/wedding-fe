"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../midnight-bloom.module.css";
import { Heart } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
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
          <div className="text-center mb-16">
            <Heart className="mx-auto text-[#6D0E0E] mb-6 w-14 h-14 opacity-30" />
            <h2 className={`${styles.serif} text-5xl mb-6 text-[#6D0E0E] italic font-bold`}>Xác Nhận Sự Hiện Diện</h2>
            <p className="text-gray-400 font-light tracking-[0.3em] uppercase text-[10px] font-bold">Rất hân hạnh được đón tiếp quý khách tại lễ thành hôn hoàng gia.</p>
          </div>

          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Họ và tên</label>
                <input 
                  type="text" 
                  placeholder="..."
                  className="w-full bg-transparent border-b border-[#6D0E0E]/20 py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light"
                />
              </div>
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B]">Khách của gia đình</label>
                <select className="w-full bg-transparent border-b border-[#6D0E0E]/20 py-4 text-[#2C1810] outline-none focus:border-[#6D0E0E] transition-colors font-light cursor-pointer appearance-none">
                  <option value="groom">Nhà Trai</option>
                  <option value="bride">Nhà Gái</option>
                </select>
              </div>
            </div>

            <div className="space-y-10 text-left">
              <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B8860B] block mb-6">Bạn sẽ tham dự chứ?</label>
              <div className="flex flex-wrap gap-12">
                <label className="flex items-center gap-5 cursor-pointer group">
                  <div className="w-7 h-7 rounded-full border-2 border-[#6D0E0E] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#6D0E0E]" />
                  </div>
                  <span className="text-[#2C1810] text-sm uppercase tracking-widest font-bold">Chắc chắn tham dự</span>
                  <input type="radio" name="attending" className="hidden" defaultChecked />
                </label>
                <label className="flex items-center gap-5 cursor-pointer group">
                  <div className="w-7 h-7 rounded-full border-2 border-[#6D0E0E]/20 flex items-center justify-center group-hover:border-[#6D0E0E] transition-colors">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#6D0E0E] opacity-0" />
                  </div>
                  <span className="text-gray-400 text-sm uppercase tracking-widest font-bold group-hover:text-[#6D0E0E] transition-colors">Rất tiếc không thể đến</span>
                  <input type="radio" name="attending" className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-10 flex justify-center">
              <button type="button" className={styles.goldButton}>Gửi Xác Nhận</button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
