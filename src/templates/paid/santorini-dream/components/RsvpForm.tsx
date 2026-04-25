"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../santorini-dream.module.css";
import { Heart } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
  return (
    <section id="rsvp" className={`${styles.sectionPadding} bg-white relative overflow-hidden`}>
      {/* Decorative background element */}
      <div className="absolute -right-20 -top-20 w-64 h-64 border-[40px] border-cobalt/5 rounded-full" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <div className="text-center mb-16">
            <Heart className="mx-auto text-cobalt mb-6 w-14 h-14" />
            <h2 className={`${styles.garamond} text-5xl mb-6 text-cobalt italic`}>Xác Nhận Tham Dự</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-cobalt/60">Góp mặt cùng chúng mình tại hòn đảo tình yêu</p>
          </div>

          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Tên của quý khách</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full bg-transparent border-b-2 border-cobalt/20 py-3 text-lg outline-none focus:border-cobalt transition-colors font-light"
                />
              </div>
              <div className="space-y-4 text-left">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt">Khách của gia đình</label>
                <select className="w-full bg-transparent border-b-2 border-cobalt/20 py-3 text-lg outline-none focus:border-cobalt transition-colors font-light cursor-pointer appearance-none">
                  <option value="groom">Nhà Trai</option>
                  <option value="bride">Nhà Gái</option>
                </select>
              </div>
            </div>

            <div className="space-y-8 text-left">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-cobalt block mb-4">Sự hiện diện của bạn</label>
              <div className="flex flex-wrap gap-12">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-6 h-6 rounded-full border-2 border-cobalt flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cobalt" />
                  </div>
                  <span className="text-cobalt font-bold text-sm tracking-widest uppercase">Sẽ tham dự</span>
                  <input type="radio" name="attending" className="hidden" defaultChecked />
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-6 h-6 rounded-full border-2 border-cobalt/30 flex items-center justify-center group-hover:border-cobalt transition-colors">
                    <div className="w-3 h-3 rounded-full bg-cobalt opacity-0" />
                  </div>
                  <span className="text-gray-400 font-bold text-sm tracking-widest uppercase group-hover:text-cobalt transition-colors">Rất tiếc</span>
                  <input type="radio" name="attending" className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-10 flex justify-center">
              <button type="button" className={styles.cobaltButton}>Xác Nhận Ngay</button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
