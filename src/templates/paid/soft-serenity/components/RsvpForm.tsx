import React from "react";
import { motion } from "framer-motion";
import styles from "../soft-serenity.module.css";
import { Heart } from "./Icons";

export function RsvpForm({ preview }: { preview: any }) {
  return (
    <section id="rsvp-form" className={`${styles.sectionPadding} bg-[#FDFBF7]`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.card}
        >
          <div className="text-center mb-12">
            <Heart className="mx-auto text-[#c5a059] mb-6 w-10 h-10 opacity-40" />
            <h2 className={`${styles.serif} text-4xl mb-4`}>Xác Nhận Tham Dự</h2>
            <p className="text-gray-500 font-light italic">Vui lòng phản hồi trước ngày 10/10/2026 để chúng mình chuẩn bị chu đáo nhất.</p>
          </div>

          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Họ và tên</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full bg-transparent border-b border-[#c5a059]/30 py-3 text-lg outline-none focus:border-[#c5a059] transition-colors font-light"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Bạn là khách của</label>
                <select className="w-full bg-transparent border-b border-[#c5a059]/30 py-3 text-lg outline-none focus:border-[#c5a059] transition-colors font-light cursor-pointer appearance-none">
                  <option value="groom">Nhà Trai ({preview.groom || "Hoàng Anh"})</option>
                  <option value="bride">Nhà Gái ({preview.bride || "Tuyết Nhi"})</option>
                </select>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-4">Bạn sẽ tham dự chứ?</label>
              <div className="flex flex-wrap gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-[#c5a059] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059] opacity-100" />
                  </div>
                  <span className="text-gray-700 font-light">Chắc chắn tham dự</span>
                  <input type="radio" name="attending" className="hidden" defaultChecked />
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border border-[#c5a059]/30 flex items-center justify-center group-hover:border-[#c5a059]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059] opacity-0" />
                  </div>
                  <span className="text-gray-500 font-light">Rất tiếc không thể đến</span>
                  <input type="radio" name="attending" className="hidden" />
                </label>
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Số người tham dự</label>
              <select className="w-full bg-transparent border-b border-[#c5a059]/30 py-3 text-lg outline-none focus:border-[#c5a059] transition-colors font-light cursor-pointer appearance-none">
                <option value="1">1 người</option>
                <option value="2">2 người</option>
                <option value="3">3 người</option>
                <option value="4">4 người</option>
                <option value="more">Nhiều hơn 4 người</option>
              </select>
            </div>

            <div className="pt-6">
              <button type="button" className={`${styles.rsvpButton} w-full md:w-auto min-w-[280px]`}>
                Xác Nhận Ngay
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
