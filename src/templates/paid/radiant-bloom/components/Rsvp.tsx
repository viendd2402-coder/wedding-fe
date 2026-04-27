import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";

export function Rsvp({ preview }: { preview: any }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    attendance: "yes",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", attendance: "yes", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section className="relative w-full py-24 md:py-48 px-6 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D4D]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[45%]"
        >
          <span className={`text-[#FF4D4D] text-xs md:text-sm uppercase tracking-[0.5em] font-bold block mb-8 ${sans.className}`}>
            Xác Nhận Tham Dự
          </span>
          <h2 className={`text-6xl md:text-8xl lg:text-[7rem] mb-12 leading-[0.9] tracking-tighter ${serif.className}`}>
            {preview.rbRsvpTitle || "Gửi Lời Chúc."}
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mb-12" />
          <p className={`text-lg md:text-xl text-[#7A756D] leading-relaxed font-light italic ${serif.className}`}>
            {preview.rbRsvpLead || "Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi. Vui lòng phản hồi trước ngày cưới."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full lg:w-[55%] bg-[#FDFBF7] p-8 md:p-16 border border-[#F4F1EA] shadow-[0_30px_100px_rgba(0,0,0,0.03)]"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`text-3xl mb-4 ${serif.className}`}>Cảm Ơn Bạn!</h3>
                <p className={`text-[#7A756D] ${sans.className}`}>Thông tin của bạn đã được gửi thành công.</p>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className={`flex flex-col gap-12 ${sans.className}`}>
                <div className="group relative">
                  <input 
                    type="text" 
                    id="rsvp_name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full bg-transparent border-b border-[#D8D4CC] py-4 text-[#1a1a1a] outline-none transition-all focus:border-[#FF4D4D] text-lg uppercase tracking-widest"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="rsvp_name"
                    className="absolute left-0 top-4 text-[#A4A7A5] text-xs uppercase tracking-[0.3em] font-bold transition-all peer-focus:-top-4 peer-focus:text-[#FF4D4D] peer-not-placeholder-shown:-top-4"
                  >
                    Họ và Tên
                  </label>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <label className="flex-1 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="attendance" 
                      className="peer hidden" 
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    />
                    <div className="w-full py-4 border border-[#D8D4CC] text-center uppercase tracking-[0.2em] text-[10px] font-bold group-hover:border-[#FF4D4D] peer-checked:bg-[#FF4D4D] peer-checked:text-white peer-checked:border-[#FF4D4D] transition-all duration-300">
                      Sẽ Tham Dự
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="attendance" 
                      className="peer hidden" 
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    />
                    <div className="w-full py-4 border border-[#D8D4CC] text-center uppercase tracking-[0.2em] text-[10px] font-bold group-hover:border-[#1a1a1a] peer-checked:bg-[#1a1a1a] peer-checked:text-white peer-checked:border-[#1a1a1a] transition-all duration-300">
                      Rất Tiếc, Không Thể
                    </div>
                  </label>
                </div>

                <div className="group relative">
                  <textarea 
                    rows={2}
                    id="rsvp_note"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="peer w-full bg-transparent border-b border-[#D8D4CC] py-4 text-[#1a1a1a] outline-none transition-all focus:border-[#FF4D4D] text-base uppercase tracking-widest resize-none"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="rsvp_note"
                    className="absolute left-0 top-4 text-[#A4A7A5] text-xs uppercase tracking-[0.3em] font-bold transition-all peer-focus:-top-4 peer-focus:text-[#FF4D4D] peer-not-placeholder-shown:-top-4"
                  >
                    Lời Nhắn Gửi
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-4 px-16 py-5 bg-[#1a1a1a] text-white uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-[#FF4D4D] transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(255,77,77,0.3)] disabled:opacity-50"
                >
                  {status === "submitting" ? "Đang Gửi..." : "Xác Nhận RSVP"}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
