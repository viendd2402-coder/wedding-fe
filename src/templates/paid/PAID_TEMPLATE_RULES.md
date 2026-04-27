# Rules for Premium Wedding Templates (Mẫu thiệp Trả phí)

When designing or modifying templates in the `src/templates/paid/` directory, AI agents MUST follow these rules to deliver a high-end, feature-rich experience.

## 1. Feature Inclusion (Premium Standard)
Premium templates MUST support the full suite of interactive features:
- **RSVP (Xác nhận tham dự)**: A polished form for guest attendance confirmation.
- **Guestbook/Wishes (Sổ lưu bút)**: An interface to display warm wishes from guests.
- **Gift & QR Sections (Mừng cưới)**: Elegant display of bank details, account names, and QR codes for both Groom and Bride.
- **Countdown Timer**: A visual countdown to the wedding day.
- **Background Music**: Integration for custom audio tracks.
- **Map Integration**: Dynamic Google Maps links for all venues.

## 2. Structural Requirements
- **Cinematic & Immersive**: High-impact Hero sections (often full-height) with parallax or zoom effects.
- **Spacious Layouts**: Use generous whitespace and balanced padding (e.g., 8rem-12rem) to create an "Ultra-Luxury" editorial feel.
- **Component Sophistication**: Use complex UI elements like tabbed bank details, masonry galleries, and animated timelines.
- **Dynamic Content**: Support for bios, stories, and detailed event descriptions.

## 3. Metadata Configuration
- **Tier**: Must always set `tier: "Trả phí"`.
- **Slug**: Use unique, evocative slugs (e.g., `santorini-dream`, `retro-soul`).
- **Sections List**: Must include all active sections (Hero, Intro, Couple, Story, Events, Gallery, RSVP, Gift, Guestbook).

## 4. Visual Philosophy
- **"High-End Editorial"**: The design should look like a professional digital invitation or a high-fashion website.
- **Typography**: Advanced font pairings, gold-foil effects, or custom decorative fonts.
- **Animations**: Extensive use of **Framer Motion** for entrance animations, hover states, and scroll-based triggers.
- **Consistency**: Maintain a cohesive visual language (colors, borders, icons) across the entire invite.

## 5. Implementation Guidelines
- **Unique UI**: Adhere to the `AGENTS.md` rule: **Duplicate code per template folder**. Do not share invitation UI components across templates.
- **Performance**: Ensure smooth scrolling and fast image loading despite high visual complexity.
- **Mobile First**: All premium layouts must be flawless on mobile devices.
- **Bilingual Support**: Full i18n support for Vietnamese (VI) and English (EN).

---
*Last Updated: 2026-04-27*
