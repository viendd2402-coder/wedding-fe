/** Ảnh mặc định cho album (tông ấm / pastel, gần vibe Gentle). */
export const gentleDriftGallery = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1606800052052-a37c2a311d95?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529636799528-92138946795e?auto=format&fit=crop&w=900&q=80",
] as const;

export type GentleDriftStory = { year: string; title: string; body: string };

export const gentleDriftStoryVi: GentleDriftStory[] = [
  {
    year: "2021",
    title: "Gặp nhau thật nhẹ",
    body: "Một chiều không có gì đặc biệt, chỉ có tiếng cười và ánh mắt khiến ngày ấy trở nên khác biệt.",
  },
  {
    year: "2023",
    title: "Cùng nhau lớn lên",
    body: "Những chuyến đi ngắn, những bữa cơm ấm — chúng mình học cách yêu bằng sự kiên nhẫn và vui vẻ.",
  },
  {
    year: "2026",
    title: "Về chung một nhà",
    body: "Chúng mình chọn lưu lại ngày trọng đại theo cách dịu dàng, để gửi tới những người thân yêu nhất.",
  },
];

export const gentleDriftStoryEn: GentleDriftStory[] = [
  {
    year: "2021",
    title: "A quiet hello",
    body: "An ordinary afternoon that somehow felt different — laughter, eye contact, and the start of something gentle.",
  },
  {
    year: "2023",
    title: "Growing side by side",
    body: "Small trips, shared meals, and patience taught us how to love a little more thoughtfully every day.",
  },
  {
    year: "2026",
    title: "Together, officially",
    body: "We want to celebrate this chapter softly and sincerely, surrounded by the people who shaped our story.",
  },
];
