"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "../retro-soul.module.css";
import { Heart } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
  return (
    <section id="rsvp" className={`${styles.sectionPadding} bg-mustard/20`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <div className="text-center mb-12">
            <Heart className="mx-auto text-orange mb-6 w-16 h-16" />
            <h2 className={`${styles.groovy} text-5xl mb-4 text-green`}>Bạn sẽ tới chứ?</h2>
            <p className="font-bold uppercase tracking-widest text-xs">Phản hồi ngay để chúng mình chuẩn bị mâm cỗ thật ngon!</p>
          </div>

          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Tên của bạn</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-mustard/10"
                />
              </div>
              <div className="space-y-2">
                <label className="font-black uppercase text-xs">Bên nhà nào</label>
                <select className="w-full bg-white border-4 border-black p-4 outline-none focus:bg-mustard/10 cursor-pointer appearance-none">
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
                    <div className="w-full h-full bg-orange" />
                  </div>
                  <span className="font-black uppercase text-sm">Chắc chắn luôn!</span>
                  <input type="radio" name="attending" className="hidden" defaultChecked />
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-8 h-8 border-4 border-black bg-white flex items-center justify-center p-1">
                    <div className="w-full h-full bg-orange opacity-0" />
                  </div>
                  <span className="font-black uppercase text-sm text-gray-400">Rất tiếc...</span>
                  <input type="radio" name="attending" className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-6 flex justify-center">
              <button type="button" className={styles.retroButton}>Xác Nhận Ngay</button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
