# Rules for Free Wedding Templates (Mẫu thiệp Miễn phí)

When designing or modifying templates in the `src/templates/free/` directory, AI agents MUST follow these strict rules to maintain consistency with the "Free Tier" experience.

## 1. Feature Limitations (Premium Exclusion)
Free templates are designed to be simple and information-focused. The following features **MUST NOT** be included:
- **NO RSVP (Xác nhận tham dự)**: No forms to collect guest attendance.
- **NO Guestbook (Sổ lưu bút/Lời chúc)**: No interface to send or display guest wishes.
- **NO Gift/QR Sections (Mừng cưới)**: No bank account details, QR codes, or gift registry sections.
- **NO Custom Music**: Background music is reserved for premium templates.
- **NO Custom Domain**: Free invitations use the default system subdomain.

## 2. Structural Requirements
- **Compact & Organized**: Sections should have balanced padding (e.g., 4rem-6rem) to feel neat and professional without excessive scrolling.
- **Events Section**: Should typically include **3 distinct parts**:
    1. Lễ Thành Hôn (Ceremony)
    2. Tiệc Cưới Nhà Trai (Groom's Reception)
    3. Tiệc Cưới Nhà Gái (Bride's Reception)
- **Gallery (Wedding Album)**: 
    - Limit to a maximum of **15 images**.
    - Prefer clean, structured grids (Bento or Masonry) rather than complex sliders.
- **Hero/Banner**: Must have a clear, high-quality background image and elegant typography.

## 3. Metadata Configuration
- **Tier**: Must always set `tier: "Miễn phí"`.
- **Slug**: Use descriptive slugs (e.g., `gentle-harmony`).
- **Sections List**: Ensure the `sections` array in `meta.ts` accurately reflects the available sections (Hero, Intro, Couple, Events, Album).

## 4. Visual Philosophy
- **"Gentle & Modern"**: Even though it's free, the design must look premium, clean, and professional.
- **Typography**: Use high-quality Serif/Sans-serif pairings (e.g., Playfair Display & Inter).
- **Images**: Use stable, high-resolution placeholders (e.g., from Pexels) to avoid broken links.

## 5. Implementation Guidelines
- **Unique UI**: Do not share components across templates. Duplicate code if needed to ensure each template is self-contained.
- **Bilingual Support**: Always provide i18n support for both Vietnamese (VI) and English (EN).
- **Editor Integration**: Ensure template-specific fields (like custom intro text or extra event details) are added to the `TemplateWorkspace` panel.

---
*Last Updated: 2026-04-27*
