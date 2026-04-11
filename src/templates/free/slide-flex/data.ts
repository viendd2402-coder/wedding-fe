/** Ảnh mặc định khi chưa upload — chỉ dùng cho lưới mục Album. */
export const slideFlexGallery: string[] = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c476e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
];

/**
 * Slide 2+ của hero — lấy từ ảnh mẫu album ô 2–5 (cùng URL đã dùng ổn định trong app).
 * Tránh danh sách URL tĩnh sai id (Unsplash trả 404) làm mất ảnh trên slider.
 */
export const slideFlexHeroAmbientSlides: string[] = slideFlexGallery.slice(1);

/**
 * Ảnh mặc định thẻ chú rể / cô dâu — URL riêng, **không** nằm trong `slideFlexGallery` (một số id cũ đã 404).
 */
export const slideFlexGroomCardFallback =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80";

export const slideFlexBrideCardFallback =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80";

export const defaultGroomBioVi =
  "Chú rể trầm tính, coi trọng gia đình và những điều giản dị. Luôn muốn xây một mái ấm ấm áp bên người mình yêu.";

export const defaultBrideBioVi =
  "Cô dâu thích đọc sách, cà phê sáng và những chuyến đi ngắn. Tin vào tình yêu đủ lớn để vượt qua mọi thử thách.";

export const defaultGroomBioEn =
  "The groom is gentle and family-first. He believes the best days are the quiet ones spent together.";

export const defaultBrideBioEn =
  "The bride loves books, slow mornings, and short trips. She believes love is worth showing up for, every day.";

export type TimelineEntry = { title: string; date: string; body: string };

export const timelineVi: TimelineEntry[] = [
  {
    title: "Bạn có tin vào tình yêu online không?",
    date: "12.2015",
    body: "Từ những dòng chat vu vơ đến những cuộc gọi dài đêm khuya — thế giới ảnh đôi khi lại mang đến tình yêu thật.",
  },
  {
    title: "Lời tỏ tình dễ thương",
    date: "08.2016",
    body: "Giữa phố đông, một câu nhỏ thôi cũng đủ làm tim đập nhanh: “Hy vọng sau này anh được làm những điều ấy cùng em.”",
  },
  {
    title: "Phút giây cầu hôn",
    date: "05.2018",
    body: "Sau những năm vun vén, anh ngỏ lời — và em gật đầu. Hai đứa sẵn sàng viết tiếp câu chuyện dài hơn.",
  },
  {
    title: "Ngày lễ đính hôn",
    date: "07.2018",
    body: "Tiếng tim đập thật nhanh, lời yêu thì thầm — cảm ơn vì luôn là một phần trong cuộc đời nhau.",
  },
];

export const timelineEn: TimelineEntry[] = [
  {
    title: "Do you believe in online love?",
    date: "Dec 2015",
    body: "From casual chats to long night calls — sometimes the digital world brings a very real love story.",
  },
  {
    title: "A sweet confession",
    date: "Aug 2016",
    body: "In a busy street, a simple wish: “I hope one day I get to do all of that with you.”",
  },
  {
    title: "The proposal",
    date: "May 2018",
    body: "After seasons of growing together, the question was asked — and answered with a joyful yes.",
  },
  {
    title: "Engagement day",
    date: "Jul 2018",
    body: "Hearts racing, promises whispered — thank you for always being part of each other’s lives.",
  },
];

export type PartyPerson = { role: string; name: string; bio: string };

export const partyVi: { bridesmaids: PartyPerson[]; groomsmen: PartyPerson[] } = {
  bridesmaids: [
    {
      role: "Phù dâu",
      name: "Lan Anh",
      bio: "Bạn thân từ thời đại học, thích hoa và nấu ăn.",
    },
    {
      role: "Phù dâu",
      name: "Minh Thư",
      bio: "Luôn mang năng lượng tích cực cho mọi kế hoạch.",
    },
  ],
  groomsmen: [
    {
      role: "Phù rể",
      name: "Quang Huy",
      bio: "Anh em chơi từ nhỏ, bạn đồng hành mọi chuyến đi.",
    },
    {
      role: "Phù rể",
      name: "Tuấn Kiệt",
      bio: "Thích công nghệ và cà phê đậm.",
    },
  ],
};

export const partyEn: { bridesmaids: PartyPerson[]; groomsmen: PartyPerson[] } = {
  bridesmaids: [
    { role: "Bridesmaid", name: "Lan Anh", bio: "College bestie; loves flowers and cooking." },
    { role: "Bridesmaid", name: "Minh Thu", bio: "Brings good energy to every plan." },
  ],
  groomsmen: [
    { role: "Groomsman", name: "Quang Huy", bio: "Childhood friend; partner in every road trip." },
    { role: "Groomsman", name: "Tuan Kiet", bio: "Tech lover; strong coffee enthusiast." },
  ],
};

export const wishSuggestionsVi: string[] = [
  "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
  "Chúc mừng ngày trọng đại — hạnh phúc bền lâu nhé!",
  "Chúc hai bạn sớm có thiên thần nhỏ và mái ấm luôn ấm áp!",
];

export const wishSuggestionsEn: string[] = [
  "Congratulations — wishing you a lifetime of joy together!",
  "So happy for you both. Cheers to love, laughter, and adventure!",
  "Warm wishes for your wedding day and every day after.",
];
