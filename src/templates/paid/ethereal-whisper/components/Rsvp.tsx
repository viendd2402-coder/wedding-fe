import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Heart } from "./Icons";

export function Rsvp({ preview }: { preview: any }) {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    guests: "1"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";
    if (!formData.status) newErrors.status = "Vui lòng chọn trạng thái tham dự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section id="rsvp" className="py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
          className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 md:p-20 rounded-[3.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.05)] text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFF5F7] rounded-full blur-[80px] opacity-40" />
          
          <div className="relative z-10">
            <Heart className="w-10 h-10 text-[#C9A9A9] mx-auto mb-8" />
            <p className={`text-xs uppercase tracking-[0.5em] text-[#8C7A7A] mb-4 ${sans.className}`}>RSVP</p>
            <h2 className={`text-4xl md:text-6xl text-[#5A5050] italic mb-8 ${serif.className}`}>
              {preview.ewRsvpTitle || "Xác Nhận Tham Dự"}
            </h2>
            <p className={`text-[#6B6161] mb-12 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto ${sans.className}`}>
              {preview.ewRsvpLead || "Vui lòng cho gia đình biết sự hiện diện của bạn để chúng tôi chuẩn bị đón tiếp chu đáo nhất."}
            </p>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`w-full space-y-8 text-left ${sans.className}`} 
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#8C7A7A] ml-4 font-medium">Tên của bạn *</label>
                    <input 
                      type="text" 
                      placeholder="Nhập họ và tên..." 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-white/60 border ${errors.name ? 'border-red-300' : 'border-white/80'} rounded-2xl py-5 px-8 text-sm text-[#5A5050] placeholder-[#8C7A7A]/50 focus:outline-none focus:border-[#C9A9A9] transition-all shadow-sm`} 
                    />
                    {errors.name && <p className="text-[10px] text-red-400 ml-4 italic">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#8C7A7A] ml-4 font-medium">Bạn có tham dự không? *</label>
                    <div className="flex flex-col md:flex-row gap-4">
                       <button 
                         type="button" 
                         onClick={() => setFormData({ ...formData, status: "yes" })}
                         className={`flex-1 py-5 rounded-2xl border transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-medium shadow-sm ${
                           formData.status === "yes" 
                           ? "bg-[#C9A9A9] text-white border-[#C9A9A9] shadow-md" 
                           : "bg-white/60 text-[#5A5050] border-white/80 hover:bg-white hover:border-[#C9A9A9]/30"
                         }`}
                       >
                         Sẽ tham dự
                       </button>
                       <button 
                         type="button" 
                         onClick={() => setFormData({ ...formData, status: "no" })}
                         className={`flex-1 py-5 rounded-2xl border transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-medium shadow-sm ${
                           formData.status === "no" 
                           ? "bg-[#C9A9A9] text-white border-[#C9A9A9] shadow-md" 
                           : "bg-white/60 text-[#5A5050] border-white/80 hover:bg-white hover:border-[#C9A9A9]/30"
                         }`}
                       >
                         Rất tiếc không thể
                       </button>
                    </div>
                    {errors.status && <p className="text-[10px] text-red-400 ml-4 italic">{errors.status}</p>}
                  </div>

                  {formData.status === "yes" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#8C7A7A] ml-4 font-medium">Số người tham dự</label>
                      <select 
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-white/60 border border-white/80 rounded-2xl py-5 px-8 text-sm text-[#5A5050] focus:outline-none focus:border-[#C9A9A9] transition-all shadow-sm appearance-none"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n} người</option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-[#5A5050] text-white rounded-2xl hover:bg-[#433A3A] transition-all hover:shadow-xl text-[11px] uppercase tracking-[0.4em] mt-6 font-semibold shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? "Đang gửi..." : "Xác nhận tham dự"}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-green-400 fill-current" />
                  </div>
                  <h3 className={`text-2xl text-[#5A5050] mb-4 ${serif.className}`}>Trân trọng cảm ơn!</h3>
                  <p className={`text-[#6B6161] text-sm font-light ${sans.className}`}>Thông tin của bạn đã được ghi nhận.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[10px] uppercase tracking-widest text-[#C9A9A9] hover:text-[#B59595] underline underline-offset-8"
                  >
                    Thay đổi thông tin
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
