import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { serif, sans } from "./SharedFonts";
import { Heart } from "./Icons";

export function Wishes({ preview }: { preview: any }) {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên của bạn";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập lời chúc";
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
        setFormData({ name: "", message: "" });
      }, 1500);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section id="wishes" className="py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} 
          className="bg-white/40 backdrop-blur-xl border border-white/80 p-10 md:p-20 rounded-[3.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.05)] text-center relative overflow-hidden"
        >
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F3F6FA] rounded-full blur-[80px] opacity-40" />
          
          <div className="relative z-10">
            <Heart className="w-10 h-10 text-[#C9A9A9] mx-auto mb-8" />
            <p className={`text-xs uppercase tracking-[0.5em] text-[#8C7A7A] mb-4 ${sans.className}`}>Wishes</p>
            <h2 className={`text-4xl md:text-6xl text-[#5A5050] italic mb-8 ${serif.className}`}>
              {preview.ewWishesTitle || "Gửi Lời Chúc"}
            </h2>
            <p className={`text-[#6B6161] mb-12 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto ${sans.className}`}>
              {preview.ewWishesLead || "Hãy để lại những lời chúc thân thương nhất cho ngày vui của chúng mình."}
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
                    <label className="text-[10px] uppercase tracking-widest text-[#8C7A7A] ml-4 font-medium">Lời chúc *</label>
                    <textarea 
                      placeholder="Viết lời chúc của bạn tại đây..." 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-white/60 border ${errors.message ? 'border-red-300' : 'border-white/80'} rounded-2xl py-5 px-8 text-sm text-[#5A5050] placeholder-[#8C7A7A]/50 focus:outline-none focus:border-[#C9A9A9] transition-all resize-none shadow-sm`} 
                    />
                    {errors.message && <p className="text-[10px] text-red-400 ml-4 italic">{errors.message}</p>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-[#C9A9A9] text-white rounded-2xl hover:bg-[#B59595] transition-all hover:shadow-xl text-[11px] uppercase tracking-[0.4em] mt-6 font-semibold shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? "Đang gửi..." : "Gửi lời chúc"}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-[#FFF5F7] rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-[#C9A9A9] fill-current" />
                  </div>
                  <h3 className={`text-2xl text-[#5A5050] mb-4 ${serif.className}`}>Cảm ơn bạn!</h3>
                  <p className={`text-[#6B6161] text-sm font-light ${sans.className}`}>Lời chúc của bạn là món quà ý nghĩa nhất.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[10px] uppercase tracking-widest text-[#C9A9A9] hover:text-[#B59595] underline underline-offset-8"
                  >
                    Gửi thêm lời chúc
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
