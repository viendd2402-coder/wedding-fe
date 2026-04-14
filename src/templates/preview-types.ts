"use client";

import type { WeddingTemplate } from "@/lib/templates/types";

/** Các trường mở rộng cho mẫu slide-flex (mẫu khác bỏ qua). */
export type SlideFlexPreviewExtra = {
  /** URL ảnh riêng ô chú rể (trống = ảnh mặc định thẻ chú rể — không lấy ảnh bìa/album) */
  groomPhotoUrl: string;
  /** URL ảnh riêng ô cô dâu (trống = ảnh mặc định thẻ cô dâu — không lấy album) */
  bridePhotoUrl: string;
  groomParentLine1: string;
  groomParentLine2: string;
  brideParentLine1: string;
  brideParentLine2: string;
  groomBio: string;
  brideBio: string;
  timeline1Title: string;
  timeline1Date: string;
  timeline1Body: string;
  timeline2Title: string;
  timeline2Date: string;
  timeline2Body: string;
  timeline3Title: string;
  timeline3Date: string;
  timeline3Body: string;
  timeline4Title: string;
  timeline4Date: string;
  timeline4Body: string;
  bm1Role: string;
  bm1Name: string;
  bm1Bio: string;
  bm2Role: string;
  bm2Name: string;
  bm2Bio: string;
  gm1Role: string;
  gm1Name: string;
  gm1Bio: string;
  gm2Role: string;
  gm2Name: string;
  gm2Bio: string;
  videoCaption: string;
  footerThanksHeadline: string;
  footerThanksBody: string;
  /** Gợi ý trong dropdown lưu bút (trống = dùng gợi ý mặc định) */
  wishSuggestion1: string;
  wishSuggestion2: string;
  wishSuggestion3: string;
  /** Tuỳ chọn: để trống thì dùng bản dịch mặc định trên thiệp */
  heroEyebrow: string;
  heroGettingMarried: string;
  sectionCoupleTitle: string;
  sectionStoryTitle: string;
  sectionPartyTitle: string;
  sectionPartyLead: string;
  sectionEventsTitle: string;
  sectionEventsLead: string;
  sectionGalleryTitle: string;
  sectionVideoTitle: string;
  sectionGuestbookTitle: string;
  sectionGuestbookLead: string;
  sectionGiftTitle: string;
};

/** Tuỳ chỉnh copy / timeline mẫu gentle-drift (để trống = fallback i18n / data mẫu). */
export type GentleDriftPreviewExtra = {
  gdHeroLead: string;
  gdInviteBody: string;
  gdCoupleQuote: string;
  gdStoryLead: string;
  gdAlbumLead: string;
  /** Lễ vu quy — giờ & địa điểm (trống = giờ lễ / địa điểm tiệc chung). */
  gdVuQuyTime: string;
  gdVuQuyVenue: string;
  gdVuQuyLocation: string;
  /** Tiệc cưới nhà chú rể (trống = giờ tiệc / địa điểm chung). */
  gdGroomEventTime: string;
  gdGroomEventVenue: string;
  gdGroomEventLocation: string;
  /** Tiệc cưới nhà cô dâu (trống = giờ tiệc / địa điểm chung). */
  gdBrideEventTime: string;
  gdBrideEventVenue: string;
  gdBrideEventLocation: string;
  /** STK mừng cưới nhà cô dâu (cột phải; trống = hiển thị giống cột nhà chú rể). */
  gdBrideBankName: string;
  gdBrideAccountName: string;
  gdBrideAccountNumber: string;
};

export const emptyGentleDriftPreviewExtra: GentleDriftPreviewExtra = {
  gdHeroLead: "",
  gdInviteBody: "",
  gdCoupleQuote: "",
  gdStoryLead: "",
  gdAlbumLead: "",
  gdVuQuyTime: "",
  gdVuQuyVenue: "",
  gdVuQuyLocation: "",
  gdGroomEventTime: "",
  gdGroomEventVenue: "",
  gdGroomEventLocation: "",
  gdBrideEventTime: "",
  gdBrideEventVenue: "",
  gdBrideEventLocation: "",
  gdBrideBankName: "",
  gdBrideAccountName: "",
  gdBrideAccountNumber: "",
};

export const emptySlideFlexPreviewExtra: SlideFlexPreviewExtra = {
  groomPhotoUrl: "",
  bridePhotoUrl: "",
  groomParentLine1: "",
  groomParentLine2: "",
  brideParentLine1: "",
  brideParentLine2: "",
  groomBio: "",
  brideBio: "",
  timeline1Title: "",
  timeline1Date: "",
  timeline1Body: "",
  timeline2Title: "",
  timeline2Date: "",
  timeline2Body: "",
  timeline3Title: "",
  timeline3Date: "",
  timeline3Body: "",
  timeline4Title: "",
  timeline4Date: "",
  timeline4Body: "",
  bm1Role: "",
  bm1Name: "",
  bm1Bio: "",
  bm2Role: "",
  bm2Name: "",
  bm2Bio: "",
  gm1Role: "",
  gm1Name: "",
  gm1Bio: "",
  gm2Role: "",
  gm2Name: "",
  gm2Bio: "",
  videoCaption: "",
  footerThanksHeadline: "",
  footerThanksBody: "",
  wishSuggestion1: "",
  wishSuggestion2: "",
  wishSuggestion3: "",
  heroEyebrow: "",
  heroGettingMarried: "",
  sectionCoupleTitle: "",
  sectionStoryTitle: "",
  sectionPartyTitle: "",
  sectionPartyLead: "",
  sectionEventsTitle: "",
  sectionEventsLead: "",
  sectionGalleryTitle: "",
  sectionVideoTitle: "",
  sectionGuestbookTitle: "",
  sectionGuestbookLead: "",
  sectionGiftTitle: "",
};

export type TemplatePageData = WeddingTemplate;

export type PreviewData = {
  bride: string;
  groom: string;
  dateLabel: string;
  location: string;
  countdownTarget: string;
  ceremonyTime: string;
  partyTime: string;
  venue: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
} & SlideFlexPreviewExtra &
  GentleDriftPreviewExtra;

export type PreviewImages = {
  coverImage: string;
  galleryImages: string[];
  /** Gentle Drift: ảnh màn chào (intro). Trống = dùng ảnh bìa / hero. */
  introBannerImage: string;
  /** Slide-flex: ảnh upload ô chú rể (object URL hoặc https từ snapshot). Trống = preview.groomPhotoUrl hoặc ảnh mặc định thẻ (không dùng ảnh bìa). */
  groomPortraitImage: string;
  /** Slide-flex: ảnh upload ô cô dâu. Trống = preview.bridePhotoUrl hoặc ảnh mặc định thẻ (không dùng album). */
  bridePortraitImage: string;
};

export type LightboxImage = {
  src: string;
  alt: string;
};

export type TemplatePreviewProps = {
  template: TemplatePageData;
  preview: PreviewData;
  images: PreviewImages;
  onPreviewImage: (image: LightboxImage) => void;
  /** Trang `/invite/[code]` — ẩn link về trang chủ trong header mẫu (footer cảm ơn của thiệp vẫn giữ). */
  isPublicInviteSnapshot?: boolean;
};

export const defaultPreviewData: PreviewData = {
  bride: "Linh",
  groom: "Minh",
  dateLabel: "Chủ nhật, 20 tháng 10 năm 2026",
  location: "Đà Nẵng",
  countdownTarget: "2026-10-20T09:00",
  ceremonyTime: "09:00",
  partyTime: "18:00",
  venue: "Riverside Garden, Đà Nẵng",
  bankName: "ACB - Ngân hàng Á Châu",
  accountName: "LINH MINH STUDIO",
  accountNumber: "1234 5678 9999",
  ...emptySlideFlexPreviewExtra,
  ...emptyGentleDriftPreviewExtra,
};

export const defaultPreviewImages: PreviewImages = {
  coverImage: "",
  galleryImages: [],
  introBannerImage: "",
  groomPortraitImage: "",
  bridePortraitImage: "",
};
