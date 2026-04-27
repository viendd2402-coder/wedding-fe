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
  timeline5Title: string;
  timeline5Date: string;
  timeline5Body: string;
  timeline6Title: string;
  timeline6Date: string;
  timeline6Body: string;
  timeline7Title: string;
  timeline7Date: string;
  timeline7Body: string;
  timeline8Title: string;
  timeline8Date: string;
  timeline8Body: string;
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
  /** Trích dẫn dưới tiêu đề mục Sự kiện (trống = bản mẫu i18n). */
  gdEventsQuote: string;
  /** Đoạn dẫn mục Sự kiện (trống = bản mẫu i18n). */
  gdEventsLead: string;
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
  /** Dòng ngày giờ hiển thị trên thẻ lễ vu quy (trống = “giờ lễ · ngày hiển thị”). */
  gdVuQuyWhenLine: string;
  /** Dòng ngày giờ hiển thị tiệc nhà chú rể (trống = “giờ tiệc · ngày hiển thị”). */
  gdGroomEventWhenLine: string;
  /** Dòng ngày giờ hiển thị tiệc nhà cô dâu (trống = “giờ tiệc · ngày hiển thị”). */
  gdBrideEventWhenLine: string;
  /** STK mừng cưới nhà cô dâu (cột phải; trống = hiển thị giống cột nhà chú rể). */
  gdBrideBankName: string;
  gdBrideAccountName: string;
  gdBrideAccountNumber: string;
  /** Số mốc timeline hiển thị / chỉnh trên Gentle Drift (chuỗi số "3"–"8"). */
  gdTimelineBeatCount: string;
  /** Số ô album bento hiển thị trên thiệp & trong panel (chuỗi số "1"–"30"; để trống = 15). */
  gdAlbumVisibleCount: string;
};

/** Brightly Basic: STK nhà cô dâu (cột phải; trống = hiển thị giống cột nhà chú rể). */
export type BrightlyBasicPreviewExtra = {
  bbBrideBankName: string;
  bbBrideAccountName: string;
  bbBrideAccountNumber: string;
  /** Copy tuỳ khách — từng ô trống = bản mặc định theo ngôn ngữ trang trong `template-previews/brightly-basic`. */
  bbHeroSaveDateLine: string;
  bbGettingMarriedTitle: string;
  bbThanksBody: string;
  bbBigDayTitle: string;
  bbInviteLead: string;
  bbGalleryTitle: string;
  bbEventsTitle: string;
  bbEventsDesc: string;
  bbGuestbookTitle: string;
  bbGiftTitle: string;
  bbFooterThanksEyebrow: string;
  bbFooterThanks: string;
  /** Tiệc nhà chú rể — từng ô trống = dùng giờ tiệc / địa điểm / thành phố chung. */
  bbGroomReceptionTime: string;
  bbGroomReceptionVenue: string;
  bbGroomReceptionLocation: string;
  /** Tiệc nhà cô dâu — từng ô trống = dùng giờ tiệc / địa điểm / thành phố chung. */
  bbBrideReceptionTime: string;
  bbBrideReceptionVenue: string;
  bbBrideReceptionLocation: string;
};

/** Tuỳ chỉnh copy / timeline mẫu timeless-love (để trống = fallback i18n / data mẫu). */
export type TimelessLovePreviewExtra = {
  tlHeroSubtitle: string;
  tlWelcomeTitle: string;
  tlWelcomeText: string;
  tlCoupleTitle: string;
  tlEventsTitle: string;
  tlEventsLead: string;
  tlGalleryTitle: string;
  tlGalleryLead: string;
  tlRsvpTitle: string;
  tlRsvpLead: string;
  tlGiftTitle: string;
  tlGiftLead: string;
  tlFooterThanks: string;
  /** STK mừng cưới nhà cô dâu (cột phải; trống = hiển thị giống cột nhà chú rể). */
  tlBrideBankName: string;
  tlBrideAccountName: string;
  tlBrideAccountNumber: string;
  /** Lễ vu quy — giờ & địa điểm (trống = giờ lễ / địa điểm tiệc chung). */
  tlCeremonyTime: string;
  tlCeremonyVenue: string;
  tlCeremonyLocation: string;
  /** Tiệc cưới — giờ & địa điểm (trống = giờ tiệc / địa điểm chung). */
  tlReceptionTime: string;
  tlReceptionVenue: string;
  tlReceptionLocation: string;
  tlGroomBio: string;
  tlBrideBio: string;
  /** Tiệc nhà chú rể — từng ô trống = dùng giờ tiệc / địa điểm / thành phố chung. */
  tlGroomEventTime: string;
  tlGroomEventVenue: string;
  tlGroomEventLocation: string;
  /** Tiệc nhà cô dâu — từng ô trống = dùng giờ tiệc / địa điểm / thành phố chung. */
  tlBrideEventTime: string;
  tlBrideEventVenue: string;
  tlBrideEventLocation: string;
  tlWishesTitle: string;
  tlWishesLead: string;
  /** Lễ Vu Quy — giờ & địa điểm. */
  tlVuQuyTime: string;
  tlVuQuyVenue: string;
  tlVuQuyLocation: string;
  /** RSVP Form Labels */
  tlRsvpNameLabel: string;
  tlRsvpContactLabel: string;
  tlRsvpWishLabel: string;
  tlRsvpAttendingLabel: string;
  tlRsvpDeclineLabel: string;
  tlRsvpSubmitLabel: string;
  /** Wishes Form Labels */
  tlWishesNameLabel: string;
  tlWishesTextLabel: string;
  tlWishesSubmitLabel: string;
};

/** Tuỳ chỉnh copy mẫu radiant-bloom (để trống = fallback i18n / data mẫu). */
export type RadiantBloomPreviewExtra = {
  rbHeroSubtitle: string;
  rbWelcomeTitle: string;
  rbWelcomeText: string;
  rbCoupleTitle: string;
  rbEventsTitle: string;
  rbEventsLead: string;
  rbGalleryTitle: string;
  rbGalleryLead: string;
  rbRsvpTitle: string;
  rbRsvpLead: string;
  rbGiftTitle: string;
  rbGiftLead: string;
  rbFooterThanks: string;
  /** Lễ vu quy — giờ & địa điểm (trống = giờ lễ / địa điểm tiệc chung). */
  rbCeremonyTime: string;
  rbCeremonyVenue: string;
  rbCeremonyLocation: string;
  /** Tiệc cưới — giờ & địa điểm (trống = giờ tiệc / địa điểm chung). */
  rbReceptionTime: string;
  rbReceptionVenue: string;
  rbReceptionLocation: string;
  /** STK nhà cô dâu (trống = hiển thị giống nhà chú rể). */
  rbBrideBankName: string;
  rbBrideAccountName: string;
  rbBrideAccountNumber: string;
};

/** Tuỳ chỉnh copy mẫu ethereal-whisper (để trống = fallback i18n / data mẫu). */
export type EtherealWhisperPreviewExtra = {
  ewHeroSubtitle: string;
  ewWelcomeTitle: string;
  ewWelcomeText: string;
  ewCoupleTitle: string;
  ewEventsTitle: string;
  ewEventsLead: string;
  ewGalleryTitle: string;
  ewGalleryLead: string;
  ewRsvpTitle: string;
  ewRsvpLead: string;
  ewGiftTitle: string;
  ewGiftLead: string;
  ewFooterThanks: string;
  /** Lễ vu quy — giờ & địa điểm (trống = giờ lễ / địa điểm tiệc chung). */
  ewCeremonyTime: string;
  ewCeremonyVenue: string;
  ewCeremonyLocation: string;
  /** Tiệc cưới — giờ & địa điểm (trống = giờ tiệc / địa điểm chung). */
  ewReceptionTime: string;
  ewReceptionVenue: string;
  ewReceptionLocation: string;
  /** STK nhà cô dâu (trống = hiển thị giống nhà chú rể). */
  ewBrideBankName: string;
  ewBrideAccountName: string;
  ewBrideAccountNumber: string;
  ewGroomBio: string;
  ewBrideBio: string;
};

export type SoftSerenityPreviewExtra = {
  ssHeroLead: string;
  ssInviteBody: string;
  ssCoupleQuote: string;
  ssStoryLead: string;
  ssAlbumLead: string;
  ssVuQuyTime: string;
  ssVuQuyVenue: string;
  ssVuQuyLocation: string;
  ssGroomEventTime: string;
  ssGroomEventVenue: string;
  ssGroomEventLocation: string;
  ssBrideEventTime: string;
  ssBrideEventVenue: string;
  ssBrideEventLocation: string;
  ssGroomBankName: string;
  ssGroomAccountName: string;
  ssGroomAccountNumber: string;
  ssBrideBankName: string;
  ssBrideAccountName: string;
  ssBrideAccountNumber: string;
  ssGroomBio: string;
  ssBrideBio: string;
  ssGroomParentLine1: string;
  ssGroomParentLine2: string;
  ssBrideParentLine1: string;
  ssBrideParentLine2: string;
};

export type MidnightBloomPreviewExtra = {
  mbHeroSubtitle: string;
  mbWelcomeTitle: string;
  mbWelcomeText: string;
  mbCoupleTitle: string;
  mbEventsTitle: string;
  mbEventsLead: string;
  mbGalleryTitle: string;
  mbGalleryLead: string;
  mbRsvpTitle: string;
  mbRsvpLead: string;
  mbGiftTitle: string;
  mbGiftLead: string;
  mbFooterThanks: string;
  mbCeremonyTime: string;
  mbCeremonyVenue: string;
  mbCeremonyLocation: string;
  mbReceptionTime: string;
  mbReceptionVenue: string;
  mbReceptionLocation: string;
  mbGroomBio: string;
  mbBrideBio: string;
  mbGroomParent1: string;
  mbGroomParent2: string;
  mbBrideParent1: string;
  mbBrideParent2: string;
};

/** Tuỳ chỉnh copy mẫu retro-soul (để trống = fallback i18n / data mẫu). */
export type RetroSoulPreviewExtra = {
  rsHeroSubtitle: string;
  rsWelcomeTitle: string;
  rsWelcomeText: string;
  rsCoupleTitle: string;
  rsEventsTitle: string;
  rsEventsLead: string;
  rsGalleryTitle: string;
  rsGalleryLead: string;
  rsRsvpTitle: string;
  rsRsvpLead: string;
  rsGiftTitle: string;
  rsGiftLead: string;
  rsFooterThanks: string;
  rsGroomBio: string;
  rsBrideBio: string;
};

/** Tuỳ chỉnh copy mẫu santorini-dream (để trống = fallback i18n / data mẫu). */
export type SantoriniDreamPreviewExtra = {
  sdHeroSubtitle: string;
  sdWelcomeTitle: string;
  sdWelcomeText: string;
  sdCoupleTitle: string;
  sdEventsTitle: string;
  sdEventsLead: string;
  sdGalleryTitle: string;
  sdGalleryLead: string;
  sdRsvpTitle: string;
  sdRsvpLead: string;
  sdGiftTitle: string;
  sdGiftLead: string;
  sdFooterThanks: string;
  sdGroomBio: string;
  sdBrideBio: string;
};

export const emptyGentleDriftPreviewExtra: GentleDriftPreviewExtra = {
  gdHeroLead: "",
  gdInviteBody: "",
  gdCoupleQuote: "",
  gdStoryLead: "",
  gdAlbumLead: "",
  gdEventsQuote: "",
  gdEventsLead: "",
  gdVuQuyTime: "",
  gdVuQuyVenue: "",
  gdVuQuyLocation: "",
  gdGroomEventTime: "",
  gdGroomEventVenue: "",
  gdGroomEventLocation: "",
  gdBrideEventTime: "",
  gdBrideEventVenue: "",
  gdBrideEventLocation: "",
  gdVuQuyWhenLine: "",
  gdGroomEventWhenLine: "",
  gdBrideEventWhenLine: "",
  gdBrideBankName: "",
  gdBrideAccountName: "",
  gdBrideAccountNumber: "",
  gdTimelineBeatCount: "3",
  gdAlbumVisibleCount: "",
};

export const emptyBrightlyBasicPreviewExtra: BrightlyBasicPreviewExtra = {
  bbBrideBankName: "",
  bbBrideAccountName: "",
  bbBrideAccountNumber: "",
  bbHeroSaveDateLine: "",
  bbGettingMarriedTitle: "",
  bbThanksBody: "",
  bbBigDayTitle: "",
  bbInviteLead: "",
  bbGalleryTitle: "",
  bbEventsTitle: "",
  bbEventsDesc: "",
  bbGuestbookTitle: "",
  bbGiftTitle: "",
  bbFooterThanksEyebrow: "",
  bbFooterThanks: "",
  bbGroomReceptionTime: "",
  bbGroomReceptionVenue: "",
  bbGroomReceptionLocation: "",
  bbBrideReceptionTime: "",
  bbBrideReceptionVenue: "",
  bbBrideReceptionLocation: "",
};

export const emptyTimelessLovePreviewExtra: TimelessLovePreviewExtra = {
  tlHeroSubtitle: "",
  tlWelcomeTitle: "",
  tlWelcomeText: "",
  tlCoupleTitle: "",
  tlEventsTitle: "",
  tlEventsLead: "",
  tlGalleryTitle: "",
  tlGalleryLead: "",
  tlRsvpTitle: "",
  tlRsvpLead: "",
  tlGiftTitle: "",
  tlGiftLead: "",
  tlFooterThanks: "",
  tlBrideBankName: "",
  tlBrideAccountName: "",
  tlBrideAccountNumber: "",
  tlCeremonyTime: "",
  tlCeremonyVenue: "",
  tlCeremonyLocation: "",
  tlReceptionTime: "",
  tlReceptionVenue: "",
  tlReceptionLocation: "",
  tlGroomBio: "",
  tlBrideBio: "",
  tlGroomEventTime: "",
  tlGroomEventVenue: "",
  tlGroomEventLocation: "",
  tlBrideEventTime: "",
  tlBrideEventVenue: "",
  tlBrideEventLocation: "",
  tlWishesTitle: "",
  tlWishesLead: "",
  tlVuQuyTime: "",
  tlVuQuyVenue: "",
  tlVuQuyLocation: "",
  tlRsvpNameLabel: "",
  tlRsvpContactLabel: "",
  tlRsvpWishLabel: "",
  tlRsvpAttendingLabel: "",
  tlRsvpDeclineLabel: "",
  tlRsvpSubmitLabel: "",
  tlWishesNameLabel: "",
  tlWishesTextLabel: "",
  tlWishesSubmitLabel: "",
};

export const emptyRadiantBloomPreviewExtra: RadiantBloomPreviewExtra = {
  rbHeroSubtitle: "",
  rbWelcomeTitle: "",
  rbWelcomeText: "",
  rbCoupleTitle: "",
  rbEventsTitle: "",
  rbEventsLead: "",
  rbGalleryTitle: "",
  rbGalleryLead: "",
  rbRsvpTitle: "",
  rbRsvpLead: "",
  rbGiftTitle: "",
  rbGiftLead: "",
  rbFooterThanks: "",
  rbCeremonyTime: "",
  rbCeremonyVenue: "",
  rbCeremonyLocation: "",
  rbReceptionTime: "",
  rbReceptionVenue: "",
  rbReceptionLocation: "",
  rbBrideBankName: "",
  rbBrideAccountName: "",
  rbBrideAccountNumber: "",
};

export const emptyEtherealWhisperPreviewExtra: EtherealWhisperPreviewExtra = {
  ewHeroSubtitle: "",
  ewWelcomeTitle: "",
  ewWelcomeText: "",
  ewCoupleTitle: "",
  ewEventsTitle: "",
  ewEventsLead: "",
  ewGalleryTitle: "",
  ewGalleryLead: "",
  ewRsvpTitle: "",
  ewRsvpLead: "",
  ewGiftTitle: "",
  ewGiftLead: "",
  ewFooterThanks: "",
  ewCeremonyTime: "",
  ewCeremonyVenue: "",
  ewCeremonyLocation: "",
  ewReceptionTime: "",
  ewReceptionVenue: "",
  ewReceptionLocation: "",
  ewBrideBankName: "",
  ewBrideAccountName: "",
  ewBrideAccountNumber: "",
  ewGroomBio: "",
  ewBrideBio: "",
};

export const emptySoftSerenityPreviewExtra: SoftSerenityPreviewExtra = {
  ssHeroLead: "",
  ssInviteBody: "",
  ssCoupleQuote: "",
  ssStoryLead: "",
  ssAlbumLead: "",
  ssVuQuyTime: "",
  ssVuQuyVenue: "",
  ssVuQuyLocation: "",
  ssGroomEventTime: "",
  ssGroomEventVenue: "",
  ssGroomEventLocation: "",
  ssBrideEventTime: "",
  ssBrideEventVenue: "",
  ssBrideEventLocation: "",
  ssGroomBankName: "",
  ssGroomAccountName: "",
  ssGroomAccountNumber: "",
  ssBrideBankName: "",
  ssBrideAccountName: "",
  ssBrideAccountNumber: "",
  ssGroomBio: "",
  ssBrideBio: "",
  ssGroomParentLine1: "",
  ssGroomParentLine2: "",
  ssBrideParentLine1: "",
  ssBrideParentLine2: "",
};

export const emptyMidnightBloomPreviewExtra: MidnightBloomPreviewExtra = {
  mbHeroSubtitle: "",
  mbWelcomeTitle: "",
  mbWelcomeText: "",
  mbCoupleTitle: "",
  mbEventsTitle: "",
  mbEventsLead: "",
  mbGalleryTitle: "",
  mbGalleryLead: "",
  mbRsvpTitle: "",
  mbRsvpLead: "",
  mbGiftTitle: "",
  mbGiftLead: "",
  mbFooterThanks: "",
  mbCeremonyTime: "",
  mbCeremonyVenue: "",
  mbCeremonyLocation: "",
  mbReceptionTime: "",
  mbReceptionVenue: "",
  mbReceptionLocation: "",
  mbGroomBio: "",
  mbBrideBio: "",
  mbGroomParent1: "",
  mbGroomParent2: "",
  mbBrideParent1: "",
  mbBrideParent2: "",
};

export const emptyRetroSoulPreviewExtra: RetroSoulPreviewExtra = {
  rsHeroSubtitle: "",
  rsWelcomeTitle: "",
  rsWelcomeText: "",
  rsCoupleTitle: "",
  rsEventsTitle: "",
  rsEventsLead: "",
  rsGalleryTitle: "",
  rsGalleryLead: "",
  rsRsvpTitle: "",
  rsRsvpLead: "",
  rsGiftTitle: "",
  rsGiftLead: "",
  rsFooterThanks: "",
  rsGroomBio: "",
  rsBrideBio: "",
};

export const emptySantoriniDreamPreviewExtra: SantoriniDreamPreviewExtra = {
  sdHeroSubtitle: "",
  sdWelcomeTitle: "",
  sdWelcomeText: "",
  sdCoupleTitle: "",
  sdEventsTitle: "",
  sdEventsLead: "",
  sdGalleryTitle: "",
  sdGalleryLead: "",
  sdRsvpTitle: "",
  sdRsvpLead: "",
  sdGiftTitle: "",
  sdGiftLead: "",
  sdFooterThanks: "",
  sdGroomBio: "",
  sdBrideBio: "",
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
  timeline5Title: "",
  timeline5Date: "",
  timeline5Body: "",
  timeline6Title: "",
  timeline6Date: "",
  timeline6Body: "",
  timeline7Title: "",
  timeline7Date: "",
  timeline7Body: "",
  timeline8Title: "",
  timeline8Date: "",
  timeline8Body: "",
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
  GentleDriftPreviewExtra &
  BrightlyBasicPreviewExtra &
  TimelessLovePreviewExtra &
  RadiantBloomPreviewExtra &
  EtherealWhisperPreviewExtra &
  SoftSerenityPreviewExtra &
  MidnightBloomPreviewExtra &
  RetroSoulPreviewExtra &
  SantoriniDreamPreviewExtra;


export type PreviewImages = {
  coverImage: string;
  galleryImages: string[];
  /** Gentle Drift: ảnh màn chào (intro). Trống = dùng ảnh bìa / hero. */
  introBannerImage: string;
  /** Slide-flex: ảnh upload ô chú rể (object URL hoặc https từ snapshot). Trống = preview.groomPhotoUrl hoặc ảnh mặc định thẻ (không dùng ảnh bìa). */
  groomPortraitImage: string;
  /** Slide-flex: ảnh upload ô cô dâu. Trống = preview.bridePhotoUrl hoặc ảnh mặc định thẻ (không dùng album). */
  bridePortraitImage: string;
  /** Gentle Drift: ảnh khu vực footer cảm ơn (trên dòng chữ). Trống = chỉ hiện chữ. */
  gdFooterImage: string;
  /** Brightly Basic: nền parallax khối lời mời — không dùng lại ảnh album/hero. */
  bbInvitationBgImage: string;
  /** Brightly Basic: nền parallax mục sự kiện. */
  bbEventsBgImage: string;
  /** Brightly Basic: ảnh nền footer cảm ơn — không dùng ảnh bìa nếu đã tách upload. */
  bbFooterBgImage: string;
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
  ...emptyBrightlyBasicPreviewExtra,
  ...emptyTimelessLovePreviewExtra,
  ...emptyRadiantBloomPreviewExtra,
  ...emptyEtherealWhisperPreviewExtra,
  ...emptySoftSerenityPreviewExtra,
  ...emptyMidnightBloomPreviewExtra,
  ...emptyRetroSoulPreviewExtra,
  ...emptySantoriniDreamPreviewExtra,
};

export const defaultPreviewImages: PreviewImages = {
  coverImage: "",
  galleryImages: [],
  introBannerImage: "",
  groomPortraitImage: "",
  bridePortraitImage: "",
  gdFooterImage: "",
  bbInvitationBgImage: "",
  bbEventsBgImage: "",
  bbFooterBgImage: "",
};
