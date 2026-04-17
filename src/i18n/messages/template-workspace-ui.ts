import type { AppLanguage } from "@/components/global-preferences-provider";

export type TemplateWorkspaceLightboxMessages = {
  close: string;
};

/** Nhãn + thẻ vị trí trên thiệp Slide-flex (chỉ dùng khi slug = slide-flex). */
export type SlideFlexWorkspacePanel = {
  sectionTitle: string;
  sectionLead: string;
  /** Phần chung (tên, ngày, địa điểm, STK, ảnh bìa hero/footer & album chỉ lưới Album) — chỉ bọc UI khi slug slide-flex. */
  baseWorkspaceSectionTitle: string;
  baseWorkspaceSectionInventory: string;
  coupleSection: string;
  coupleSectionInventory: string;
  groomParentLine1: string;
  tagGroomParentLine1: string;
  groomParentLine2: string;
  tagGroomParentLine2: string;
  brideParentLine1: string;
  tagBrideParentLine1: string;
  brideParentLine2: string;
  tagBrideParentLine2: string;
  groomBio: string;
  tagGroomBio: string;
  brideBio: string;
  tagBrideBio: string;
  storySection: string;
  storySectionInventory: string;
  storySlotLabel: string;
  tagStorySlot: string;
  timelineTitle: string;
  timelineDate: string;
  timelineBody: string;
  partySection: string;
  partySectionInventory: string;
  bridesmaidBlock: string;
  groomsmenBlock: string;
  tagPartyPerson: string;
  personRole: string;
  personName: string;
  personBio: string;
  mediaSection: string;
  mediaSectionInventory: string;
  videoCaption: string;
  tagVideoCaption: string;
  footerSection: string;
  footerSectionInventory: string;
  footerThanksHeadline: string;
  tagFooterHeadline: string;
  footerThanksBody: string;
  tagFooterBody: string;
  couplePhotosSection: string;
  groomPortraitUpload: string;
  tagGroomPortraitUpload: string;
  bridePortraitUpload: string;
  tagBridePortraitUpload: string;
  heroCopySection: string;
  heroSectionInventory: string;
  heroEyebrow: string;
  tagHeroEyebrow: string;
  heroGettingMarried: string;
  tagHeroGettingMarried: string;
  sectionHeadingsGroup: string;
  sectionHeadingsInventory: string;
  sectionCoupleTitle: string;
  tagSectionCoupleTitle: string;
  sectionStoryTitle: string;
  tagSectionStoryTitle: string;
  sectionPartyTitle: string;
  tagSectionPartyTitle: string;
  sectionPartyLead: string;
  tagSectionPartyLead: string;
  sectionEventsTitle: string;
  tagSectionEventsTitle: string;
  sectionEventsLead: string;
  tagSectionEventsLead: string;
  sectionGalleryTitle: string;
  tagSectionGalleryTitle: string;
  sectionVideoTitle: string;
  tagSectionVideoTitle: string;
  sectionGuestbookTitle: string;
  tagSectionGuestbookTitle: string;
  sectionGuestbookLead: string;
  tagSectionGuestbookLead: string;
  sectionGiftTitle: string;
  tagSectionGiftTitle: string;
  wishSection: string;
  wishSectionInventory: string;
  wishSuggestion1: string;
  tagWishSuggestion1: string;
  wishSuggestion2: string;
  tagWishSuggestion2: string;
  wishSuggestion3: string;
  tagWishSuggestion3: string;
};

/** Nhãn nhóm panel xem thử — chỉ dùng khi slug = gentle-drift. */
export type GentleDriftWorkspacePanel = {
  deepSectionTitle: string;
  deepSectionLead: string;
  bannerHeroSectionTitle: string;
  bannerHeroSectionInventory: string;
  introBannerLabel: string;
  introBannerHint: string;
  tagIntroBanner: string;
  /** Gentle Drift: gợi ý dưới ô chọn ngày giờ đếm ngược. */
  countdownWorkspaceHint: string;
  heroLeadLabel: string;
  heroLeadHint: string;
  tagHeroLead: string;
  groomCouplePortraitLabel: string;
  brideCouplePortraitLabel: string;
  tagGroomCouplePortrait: string;
  tagBrideCouplePortrait: string;
  namesCalendarSectionTitle: string;
  namesCalendarSectionInventory: string;
  copySectionTitle: string;
  copySectionInventory: string;
  inviteWorkspaceSectionTitle: string;
  inviteWorkspaceSectionInventory: string;
  inviteBodyLabel: string;
  tagInviteBody: string;
  coupleQuoteLabel: string;
  tagCoupleQuote: string;
  storyLeadLabel: string;
  tagStoryLead: string;
  albumLeadLabel: string;
  tagAlbumLead: string;
  coupleDetailsSectionTitle: string;
  coupleDetailsSectionInventory: string;
  timelineSectionTitle: string;
  timelineSectionInventory: string;
  timelineYearFieldLabel: string;
  timelineTitleFieldLabel: string;
  timelineBodyFieldLabel: string;
  /** Nút thêm mốc timeline (Gentle Drift). */
  addTimelineBeatLabel: string;
  /** Nút bớt mốc timeline (Gentle Drift). */
  removeTimelineBeatLabel: string;
  /** Gợi ý số mốc (vd. 3–8). */
  timelineBeatCountHint: string;
  footerThanksSectionTitle: string;
  footerThanksSectionInventory: string;
  footerThanksImageLabel: string;
  footerThanksImageHint: string;
  tagFooterThanksImage: string;
  tagFooterThanksHeadline: string;
  tagFooterThanksBody: string;
  footerThanksHeadlineHint: string;
  footerThanksBodyHint: string;
  venueScheduleSectionTitle: string;
  venueScheduleSectionInventory: string;
  eventsQuoteLabel: string;
  eventsQuoteHint: string;
  eventsLeadLabel: string;
  eventsLeadHint: string;
  tagEventsQuote: string;
  tagEventsLead: string;
  vuQuyEventFieldsTitle: string;
  vuQuyEventFieldsHint: string;
  vuQuyEventTimeLabel: string;
  vuQuyEventVenueLabel: string;
  vuQuyEventLocationLabel: string;
  tagVuQuyEventTime: string;
  tagVuQuyEventVenue: string;
  tagVuQuyEventLocation: string;
  vuQuyWhenLineLabel: string;
  vuQuyWhenLinePlaceholder: string;
  vuQuyWhenLineHint: string;
  tagVuQuyWhenLine: string;
  groomEventFieldsTitle: string;
  groomEventFieldsHint: string;
  brideEventFieldsTitle: string;
  brideEventFieldsHint: string;
  groomEventTimeLabel: string;
  groomEventVenueLabel: string;
  groomEventLocationLabel: string;
  brideEventTimeLabel: string;
  brideEventVenueLabel: string;
  brideEventLocationLabel: string;
  tagGroomEventTime: string;
  tagGroomEventVenue: string;
  tagGroomEventLocation: string;
  groomWhenLineLabel: string;
  groomWhenLinePlaceholder: string;
  groomWhenLineHint: string;
  tagGroomWhenLine: string;
  tagBrideEventTime: string;
  tagBrideEventVenue: string;
  tagBrideEventLocation: string;
  brideWhenLineLabel: string;
  brideWhenLinePlaceholder: string;
  brideWhenLineHint: string;
  tagBrideWhenLine: string;
  groomBankFieldsTitle: string;
  brideBankFieldsTitle: string;
  brideBankFieldsHint: string;
  tagBrideBankName: string;
  tagBrideAccountName: string;
  tagBrideAccountNumber: string;
  giftSectionTitle: string;
  giftSectionInventory: string;
  albumGridSectionTitle: string;
  albumGridSectionInventory: string;
  /** Gợi ý tối thiểu / tối đa ảnh album Gentle Drift. */
  albumGridMinMaxHint: string;
  /** Tóm tắt số ô đang hiển thị — có placeholder `{n}` (1–30). */
  albumVisibleSlotsSummary: string;
  /** Nút tăng số ô album hiển thị trên thiệp. */
  addAlbumPhotoSlotLabel: string;
  /** Nút giảm số ô album hiển thị trên thiệp. */
  removeAlbumPhotoSlotLabel: string;
  /** Thẻ vị trí thay cho nhãn chung (tránh copy mô tả slide-flex). */
  tagCoverImage: string;
  tagGallerySection: string;
  tagGallerySlot7: string;
  tagGallerySlot8: string;
  tagGallerySlot9: string;
  tagGallerySlot10: string;
  tagGallerySlot11: string;
  tagGallerySlot12: string;
  /** Thẻ album ô 13–30: thay `{n}` bằng số thứ tự ô. */
  albumSlotTagFromIndex: string;
};

/** Nhóm panel xem thử — chỉ dùng khi slug = brightly-basic. */
export type BrightlyBasicWorkspacePanel = {
  deepSectionTitle: string;
  deepSectionLead: string;
  heroSectionTitle: string;
  heroSectionInventory: string;
  coupleSectionTitle: string;
  coupleSectionInventory: string;
  gallerySectionTitle: string;
  gallerySectionInventory: string;
  eventsSectionTitle: string;
  eventsSectionInventory: string;
  groomReceptionFieldsTitle: string;
  groomReceptionFieldsHint: string;
  tagBbGroomReceptionTime: string;
  tagBbGroomReceptionVenue: string;
  tagBbGroomReceptionLocation: string;
  brideReceptionFieldsTitle: string;
  brideReceptionFieldsHint: string;
  tagBbBrideReceptionTime: string;
  tagBbBrideReceptionVenue: string;
  tagBbBrideReceptionLocation: string;
  wishSectionTitle: string;
  wishSectionInventory: string;
  giftSectionTitle: string;
  giftSectionInventory: string;
  /** Nền parallax lời mời + sự kiện — URL riêng, không dùng lại album. */
  parallaxBgSectionTitle: string;
  parallaxBgSectionInventory: string;
  /** Chữ giới thiệu / mô tả khách tuỳ chỉnh (để trống = bản mẫu theo ngôn ngữ trang). */
  copywritingSectionTitle: string;
  copywritingSectionInventory: string;
  copyFieldPlaceholder: string;
  copyHeroSaveDateLabel: string;
  tagBbHeroSaveDateLine: string;
  copyGettingMarriedLabel: string;
  tagBbGettingMarriedTitle: string;
  copyThanksBodyLabel: string;
  tagBbThanksBody: string;
  copyBigDayLabel: string;
  tagBbBigDayTitle: string;
  copyInviteLeadLabel: string;
  tagBbInviteLead: string;
  copyGalleryTitleLabel: string;
  tagBbGalleryTitle: string;
  copyEventsTitleLabel: string;
  tagBbEventsTitle: string;
  copyEventsDescLabel: string;
  tagBbEventsDesc: string;
  copyGuestbookTitleLabel: string;
  tagBbGuestbookTitle: string;
  copyGiftTitleLabel: string;
  tagBbGiftTitle: string;
  copyFooterEyebrowLabel: string;
  tagBbFooterThanksEyebrow: string;
  copyFooterThanksLabel: string;
  tagBbFooterThanks: string;
  invitationBgUploadLabel: string;
  tagInvitationBg: string;
  eventsBgUploadLabel: string;
  tagEventsBg: string;
  groomBankFieldsTitle: string;
  tagGroomBankName: string;
  tagGroomAccountName: string;
  tagGroomAccountNumber: string;
  brideBankFieldsTitle: string;
  brideBankFieldsHint: string;
  tagBrideBankName: string;
  tagBrideAccountName: string;
  tagBrideAccountNumber: string;
  footerBgSectionTitle: string;
  footerBgSectionInventory: string;
  footerBgUploadLabel: string;
  tagFooterBg: string;
  tagCoverImage: string;
  tagGallerySection: string;
  tagGallerySlot1: string;
  tagGallerySlot2: string;
  tagGallerySlot3: string;
  tagGallerySlot4: string;
  tagGallerySlot5: string;
  tagGallerySlot6: string;
};

export type TemplateWorkspacePanelMessages = {
  openPreview: string;
  closePreview: string;
  titleEyebrow: string;
  title: string;
  groomName: string;
  tagGroom: string;
  brideName: string;
  tagBride: string;
  dateLabel: string;
  tagDateLabel: string;
  countdownTarget: string;
  countdownTargetHint: string;
  tagCountdownTarget: string;
  location: string;
  tagLocation: string;
  ceremonyTime: string;
  tagCeremonyTime: string;
  partyTime: string;
  tagPartyTime: string;
  venue: string;
  tagVenue: string;
  bankName: string;
  tagBankName: string;
  accountName: string;
  tagAccountName: string;
  accountNumber: string;
  tagAccountNumber: string;
  coverImage: string;
  tagCoverImage: string;
  coverSelected: string;
  coverEmpty: string;
  gallery: string;
  tagGallerySection: string;
  imageLabel: string;
  tagGallerySlot1: string;
  tagGallerySlot2: string;
  tagGallerySlot3: string;
  tagGallerySlot4: string;
  tagGallerySlot5: string;
  tagGallerySlot6: string;
  imageSelected: string;
  imageDefault: string;
  paymentEyebrow: string;
  paymentTitle: string;
  paymentBuyerLine: string;
  paymentBuyerUnset: string;
  paymentPay: string;
  paymentLoading: string;
  paymentNotConfigured: string;
  paymentFailed: string;
  paymentInviteIncomplete: string;
  /** Chỉ mẫu trả phí — ô subdomain mong muốn. */
  desiredSubdomainLabel: string;
  tagDesiredSubdomain: string;
  /** `aria-label` cho ô read-only hiển thị `.lumiere-wedding.com`. */
  desiredSubdomainSuffixAria: string;
  desiredSubdomainHint: string;
  paymentSubdomainInvalid: string;
  paymentFreeHint: string;
  paymentFreeEyebrow: string;
  paymentFreeTitle: string;
  paymentFreeCta: string;
  paymentFreeLoading: string;
  paymentFreeFailed: string;
  paymentNotFree: string;
  paymentEmailCta: string;
  paymentMailSubject: string;
  slideFlex: SlideFlexWorkspacePanel;
  gentleDrift: GentleDriftWorkspacePanel;
  brightlyBasic: BrightlyBasicWorkspacePanel;
};

export type TemplateWorkspaceMessages = {
  lightbox: TemplateWorkspaceLightboxMessages;
  panel: TemplateWorkspacePanelMessages;
};

const viSlideFlexPanel: SlideFlexWorkspacePanel = {
  sectionTitle: "Slide-flex — tuỳ chỉnh sâu",
  sectionLead:
    "Chỉ mẫu Slide-flex: upload ảnh ô cặp đôi, hero, tiêu đề từng mục, gợi ý lưu bút, bố mẹ, timeline, phù dâu/rể, video, footer.",
  baseWorkspaceSectionTitle: "Thông tin chung & ảnh thiệp",
  baseWorkspaceSectionInventory:
    "• Tên chú rể, tên cô dâu\n• Ngày hiển thị, ngày giờ đếm ngược (ISO)\n• Địa điểm / thành phố, giờ lễ, giờ tiệc, địa điểm tiệc\n• Ngân hàng, chủ TK, số TK\n• Ảnh bìa (upload) — slide 1 hero + nền footer; slide 2+ hero dùng ảnh mẫu trùng ô album 2–5 (URL ổn định) — thẻ cô dâu/chú rể vẫn dùng ảnh mẫu riêng\n• Album tối đa 6 ảnh (upload) — lưới mục Album trên thiệp",
  coupleSection: "Ô cặp đôi — bố mẹ & giới thiệu",
  coupleSectionInventory:
    "• Upload ảnh nền thẻ chú rể (tuỳ chọn — không chọn thì ảnh mẫu riêng thẻ chú rể, không lấy ảnh bìa)\n• Hai dòng họ nhà trai, đoạn giới thiệu chú rể\n• Upload ảnh nền thẻ cô dâu (tuỳ chọn — không chọn thì ảnh mẫu riêng thẻ cô dâu, không lấy album)\n• Hai dòng họ nhà gái, đoạn giới thiệu cô dâu\n• Thiệp công khai: URL ảnh có thể đi kèm JSON (ưu tiên sau upload blob ở trang xem thử).",
  groomParentLine1: "Chú rể — dòng “Con ông …”",
  tagGroomParentLine1: "Mục Cặp đôi · thẻ Chú rể · dòng họ nhà trai (1)",
  groomParentLine2: "Chú rể — dòng “Con bà …”",
  tagGroomParentLine2: "Mục Cặp đôi · thẻ Chú rể · dòng họ nhà trai (2)",
  brideParentLine1: "Cô dâu — dòng “Con ông …”",
  tagBrideParentLine1: "Mục Cặp đôi · thẻ Cô dâu · dòng họ nhà gái (1)",
  brideParentLine2: "Cô dâu — dòng “Con bà …”",
  tagBrideParentLine2: "Mục Cặp đôi · thẻ Cô dâu · dòng họ nhà gái (2)",
  groomBio: "Giới thiệu chú rể",
  tagGroomBio: "Mục Cặp đôi · đoạn mô tả dưới tên chú rể",
  brideBio: "Giới thiệu cô dâu",
  tagBrideBio: "Mục Cặp đôi · đoạn mô tả dưới tên cô dâu",
  storySection: "Chuyện tình — timeline (4 mốc)",
  storySectionInventory:
    "• 4 mốc: mỗi mốc có tiêu đề, nhãn thời gian hiển thị, đoạn kể\n• Để trống cả 4 mốc thì thiệp dùng câu chuyện mẫu",
  storySlotLabel: "Mốc",
  tagStorySlot: "Mục Chuyện tình · thẻ thời gian + tiêu đề + đoạn kể",
  timelineTitle: "Tiêu đề",
  timelineDate: "Mốc thời gian (hiển thị)",
  timelineBody: "Nội dung",
  partySection: "Phù dâu & phù rể (2 + 2)",
  partySectionInventory:
    "• Mỗi người: vai trò, tên, giới thiệu ngắn\n• Tối đa 2 phù dâu và 2 phù rể — để trống tên thì ẩn trên thiệp",
  bridesmaidBlock: "Phù dâu",
  groomsmenBlock: "Phù rể",
  tagPartyPerson: "Mục Phù dâu/rể · thẻ tên + giới thiệu ngắn",
  personRole: "Vai trò",
  personName: "Tên",
  personBio: "Giới thiệu",
  mediaSection: "Video & lời cảm ơn cuối trang",
  mediaSectionInventory: "• Chú thích dưới khối video (placeholder play)",
  videoCaption: "Chú thích dưới khối video",
  tagVideoCaption: "Mục Video · dòng chữ dưới khung play",
  footerSection: "Footer ảnh nền (lời cảm ơn)",
  footerSectionInventory:
    "• Tiêu đề + đoạn lời cảm ơn trong thẻ sáng\n• Ảnh nền footer = ảnh bìa (cùng ảnh hero — không dùng album)",
  footerThanksHeadline: "Tiêu đề lời cảm ơn",
  tagFooterHeadline: "Cuối trang · thẻ tiêu đề trong thẻ sáng",
  footerThanksBody: "Đoạn lời cảm ơn",
  tagFooterBody: "Cuối trang · đoạn mô tả trong thẻ sáng",
  couplePhotosSection: "Ảnh nền thẻ (upload file)",
  groomPortraitUpload: "Ảnh chú rể — tải lên",
  tagGroomPortraitUpload: "Mục Cặp đôi · ảnh nền thẻ Chú rể — không file thì ảnh mẫu riêng (không ảnh bìa)",
  bridePortraitUpload: "Ảnh cô dâu — tải lên",
  tagBridePortraitUpload: "Mục Cặp đôi · ảnh nền thẻ Cô dâu — không file thì ảnh mẫu riêng (không album)",
  heroCopySection: "Dòng chữ hero (tuỳ chọn)",
  heroSectionInventory:
    "• Dòng phụ nhỏ phía trên tên (eyebrow)\n• Câu phụ dưới tên cặp đôi trên hero",
  heroEyebrow: "Dòng phụ nhỏ phía trên tên (Wedding…)",
  tagHeroEyebrow: "Hero ảnh bìa · dòng eyebrow phía trên tên cô dâu chú rể",
  heroGettingMarried: "Câu phụ dưới tên",
  tagHeroGettingMarried: "Hero · câu “Chúng mình sắp cưới…”",
  sectionHeadingsGroup: "Tiêu đề các mục (tuỳ chọn)",
  sectionHeadingsInventory:
    "• Tiêu đề H2: Cặp đôi, Chuyện tình, Phù dâu/rể, Sự kiện, Album, Video, Lưu bút, Mừng cưới\n• Đoạn dẫn (lead) cho mục Phù dâu/rể, Sự kiện, Lưu bút — để trống thì dùng bản dịch mặc định",
  sectionCoupleTitle: "Tiêu đề mục Cặp đôi",
  tagSectionCoupleTitle: "Mục Cặp đôi · H2 chính",
  sectionStoryTitle: "Tiêu đề mục Chuyện tình",
  tagSectionStoryTitle: "Mục Chuyện tình · H2",
  sectionPartyTitle: "Tiêu đề mục Phù dâu/rể",
  tagSectionPartyTitle: "Mục Phù dâu & phù rể · H2",
  sectionPartyLead: "Đoạn dẫn dưới tiêu đề Phù dâu/rể",
  tagSectionPartyLead: "Mục Phù dâu/rể · đoạn lead",
  sectionEventsTitle: "Tiêu đề mục Sự kiện",
  tagSectionEventsTitle: "Mục Sự kiện cưới · H2",
  sectionEventsLead: "Đoạn dẫn mục Sự kiện",
  tagSectionEventsLead: "Mục Sự kiện · đoạn lead dưới H2",
  sectionGalleryTitle: "Tiêu đề mục Album",
  tagSectionGalleryTitle: "Mục Album hình · H2",
  sectionVideoTitle: "Tiêu đề mục Video",
  tagSectionVideoTitle: "Mục Video · H2",
  sectionGuestbookTitle: "Tiêu đề mục Lưu bút",
  tagSectionGuestbookTitle: "Mục Sổ lưu bút · H2",
  sectionGuestbookLead: "Đoạn dẫn mục Lưu bút",
  tagSectionGuestbookLead: "Mục Lưu bút · đoạn lead",
  sectionGiftTitle: "Tiêu đề mục Mừng cưới",
  tagSectionGiftTitle: "Mục Hộp mừng cưới · H2",
  wishSection: "Gợi ý lời chúc (dropdown lưu bút)",
  wishSectionInventory:
    "• Ba dòng gợi ý trong dropdown form lưu bút\n• Để trống cả ba thì dùng gợi ý mặc định theo ngôn ngữ",
  wishSuggestion1: "Gợi ý 1",
  tagWishSuggestion1: "Mục Lưu bút · dropdown gợi ý · dòng 1",
  wishSuggestion2: "Gợi ý 2",
  tagWishSuggestion2: "Mục Lưu bút · dropdown · dòng 2",
  wishSuggestion3: "Gợi ý 3",
  tagWishSuggestion3: "Mục Lưu bút · dropdown · dòng 3",
};

const viGentleDriftPanel: GentleDriftWorkspacePanel = {
  deepSectionTitle: "Gentle Drift — nhập đúng từng khu vực trên thiệp",
  deepSectionLead:
    "Mẫu editorial: màn chào, vé lịch, hero, thẻ sự kiện, đếm ngược và mừng cưới dùng các ô bên dưới — mỗi khối tương ứng một phần trang, tránh nhập nhầm sang phần khác.",
  bannerHeroSectionTitle: "Màn chào & hero — ảnh và lời dưới tên",
  bannerHeroSectionInventory:
    "• Ảnh màn chào — slot riêng (mặc định khác ảnh bìa / album)\n• Ảnh bìa / hero — nền full-bleed phía sau tên\n• Tên chú rể / cô dâu — màn chào, hero, thẻ Cặp đôi, footer\n• Ngày hiển thị — dưới tên màn chào và trong thẻ sự kiện (khi chưa tuỳ chỉnh dòng giờ)\n• Ngày giờ đếm ngược — chọn bằng lịch, hiển thị dễ đọc trên hero + vé lịch + ô đếm ngược + Google Calendar\n• Lời dưới tên trên hero — nằm phía trên dòng ngày giờ đếm ngược",
  introBannerLabel: "Ảnh màn chào (intro)",
  introBannerHint: "Không chọn file thì dùng ảnh mẫu màn chào (URL riêng, không lấy từ ảnh bìa).",
  tagIntroBanner: "Màn chào · khung ảnh luxury trước khi “Vào xem thiệp”",
  countdownWorkspaceHint:
    "Chọn ngày và giờ theo giờ máy bạn — hệ thống lưu dạng ISO cho đồng hồ đếm ngược, vé lịch và nút thêm Google Calendar.",
  heroLeadLabel: "Lời dưới tên trên hero",
  heroLeadHint: "Để trống thì dùng câu mặc định theo ngôn ngữ trang. Hiển thị ngay dưới tên, phía trên dòng ngày giờ đếm ngược.",
  tagHeroLead: "Hero · đoạn mời gửi lời chúc (dưới tên, trên dòng ngày giờ đếm ngược)",
  groomCouplePortraitLabel: "Ảnh thẻ chú rể (cặp đôi)",
  brideCouplePortraitLabel: "Ảnh thẻ cô dâu (cặp đôi)",
  tagGroomCouplePortrait: "Mục Cô dâu & Chú rể · ảnh thẻ chú rể (không dùng ảnh bìa / album)",
  tagBrideCouplePortrait: "Mục Cô dâu & Chú rể · ảnh thẻ cô dâu (không dùng ảnh bìa / album)",
  namesCalendarSectionTitle: "Tên cặp đôi & lịch (màn chào · hero · vé lịch · đếm ngược)",
  namesCalendarSectionInventory:
    "• Tên chú rể / cô dâu — hiện ở màn chào, hero, thẻ Cặp đôi, footer\n• Ngày hiển thị — dòng ngày dưới tên (intro + hero) và trong thẻ sự kiện\n• Ngày giờ ISO — tháng trên “vé lịch”, ô đếm ngược, nút thêm lịch Google",
  copySectionTitle: "Lời mời & các đoạn mở đầu mục",
  copySectionInventory:
    "• Đoạn lời mời trong khối Save the date\n• Trích dẫn dưới tiêu đề “Cô dâu & Chú rể”\n• Đoạn dẫn mục Chuyện tình yêu\n• Đoạn dẫn mục Album — để trống thì dùng bản mặc định",
  inviteWorkspaceSectionTitle: "Lời mời (khối Save the date)",
  inviteWorkspaceSectionInventory:
    "• Đoạn văn hiển thị sau vé lịch, trong khối lời mời — để trống thì dùng bản mẫu",
  inviteBodyLabel: "Đoạn lời mời (khối Save the date)",
  tagInviteBody: "Mục Lời mời · đoạn văn chính",
  coupleQuoteLabel: "Trích dẫn dưới tiêu đề cặp đôi",
  tagCoupleQuote: "Mục Cô dâu & Chú rể · câu trích dẫn serif",
  storyLeadLabel: "Đoạn dẫn mục Chuyện tình yêu",
  tagStoryLead: "Mục Chuyện tình yêu · đoạn lead dưới H2",
  albumLeadLabel: "Đoạn dẫn mục Album hình",
  tagAlbumLead: "Mục Album · đoạn lead dưới H2",
  coupleDetailsSectionTitle: "Cặp đôi — trích dẫn, họ nhà & giới thiệu",
  coupleDetailsSectionInventory:
    "• Trích dẫn dưới tiêu đề mục Cặp đôi — để trống thì dùng câu mẫu\n• Ảnh thẻ chú rể / cô dâu — slot riêng (mặc định khác album & bìa)\n• Hai dòng “Con ông / Con bà” cho chú rể và cô dâu\n• Đoạn giới thiệu dưới tên — để trống thì dùng đoạn mẫu",
  timelineSectionTitle: "Chuyện tình yêu — đoạn dẫn & các mốc timeline",
  timelineSectionInventory:
    "• Đoạn lead dưới tiêu đề mục — để trống thì dùng bản mẫu\n• Mỗi mốc: ô thứ nhất = năm (hiển thị to), ô thứ hai = tiêu đề mốc, ô thứ ba = đoạn kể\n• Để trống cả ba ô của một mốc thì mốc đó lấy nội dung mẫu (nếu có)\n• Nút + / −: thêm hoặc bớt mốc (tối thiểu 3, tối đa 8)",
  timelineYearFieldLabel: "Năm (số / nhãn thời gian)",
  timelineTitleFieldLabel: "Tiêu đề mốc",
  timelineBodyFieldLabel: "Đoạn kể",
  addTimelineBeatLabel: "Thêm một mốc timeline",
  removeTimelineBeatLabel: "Bớt một mốc timeline",
  timelineBeatCountHint: "Hiện có thể chỉnh từ 3 đến 8 mốc trên thiệp.",
  footerThanksSectionTitle: "Footer — ảnh & lời cảm ơn",
  footerThanksSectionInventory:
    "• Ảnh full-bleed lớn — không chọn file thì dùng ảnh mẫu\n• Dòng cảm ơn chính — để trống thì dùng bản mẫu theo ngôn ngữ trang\n• Đoạn phụ (tuỳ chọn) hiển thị nhỏ hơn bên dưới",
  footerThanksImageLabel: "Ảnh footer (cảm ơn)",
  footerThanksImageHint: "Không chọn file thì dùng ảnh mẫu lớn phía trên lời cảm ơn — chọn ảnh để thay.",
  tagFooterThanksImage: "Footer cuối trang · ảnh minh họa phía trên lời cảm ơn",
  tagFooterThanksHeadline: "Footer cuối trang · dòng lời cảm ơn chính",
  tagFooterThanksBody: "Footer cuối trang · đoạn phụ (tuỳ chọn)",
  footerThanksHeadlineHint:
    "Để trống thì hiển thị câu mẫu theo ngôn ngữ (giống bản dịch trên thiệp khi chưa tuỳ chỉnh).",
  footerThanksBodyHint: "Tuỳ chọn — chỉ hiện khi có nội dung; dùng cho lời ký tên hoặc một câu nhắn thêm.",
  venueScheduleSectionTitle: "Sự kiện cưới — chữ & địa điểm / giờ",
  venueScheduleSectionInventory:
    "• Hai đoạn chữ mở đầu mục Sự kiện — để trống thì dùng bản mẫu\n• Giờ lễ / giờ tiệc & địa điểm chung — mặc định khi chưa nhập riêng từng thẻ\n• Thứ tự: lễ vu quy → tiệc nhà chú rể → tiệc nhà cô dâu\n• Mỗi thẻ có ô “dòng ngày giờ hiển thị” tuỳ chọn (để trống = “giờ · ngày hiển thị”)",
  eventsQuoteLabel: "Trích dẫn dưới tiêu đề mục Sự kiện",
  eventsQuoteHint: "Để trống thì dùng câu trích mẫu trên thiệp.",
  eventsLeadLabel: "Đoạn dẫn mục Sự kiện",
  eventsLeadHint: "Để trống thì dùng đoạn mẫu (lễ vu quy, hai tiệc…).",
  tagEventsQuote: "Mục Sự kiện · câu trích dẫn serif dưới H2",
  tagEventsLead: "Mục Sự kiện · đoạn lead dưới trích dẫn",
  vuQuyEventFieldsTitle: "Lễ vu quy (thẻ 01)",
  vuQuyEventFieldsHint:
    "Để trống cả ba ô thì dùng giờ lễ, địa điểm tiệc và thành phố ở nhóm chung phía trên.",
  vuQuyEventTimeLabel: "Giờ lễ vu quy",
  vuQuyEventVenueLabel: "Địa điểm lễ vu quy",
  vuQuyEventLocationLabel: "Thành phố / khu vực",
  tagVuQuyEventTime: "Mục Sự kiện · thẻ 01 · giờ lễ vu quy",
  tagVuQuyEventVenue: "Mục Sự kiện · thẻ 01 · địa điểm lễ vu quy",
  tagVuQuyEventLocation: "Mục Sự kiện · thẻ 01 · thành phố",
  vuQuyWhenLineLabel: "Dòng ngày giờ hiển thị (lễ vu quy)",
  vuQuyWhenLinePlaceholder: "VD: 09:00 · Chủ nhật, 20 tháng 10 năm 2026",
  vuQuyWhenLineHint:
    "Để trống thì thiệp dùng “giờ lễ vu quy · ngày hiển thị” từ các ô phía trên.",
  tagVuQuyWhenLine: "Mục Sự kiện · thẻ 01 · một dòng ngày giờ trên thiệp",
  groomEventFieldsTitle: "Tiệc cưới nhà chú rể (thẻ 02)",
  groomEventFieldsHint:
    "Để trống cả ba ô thì dùng giờ tiệc, địa điểm tiệc và thành phố chung.",
  brideEventFieldsTitle: "Tiệc cưới nhà cô dâu (thẻ 03)",
  brideEventFieldsHint:
    "Để trống cả ba ô thì dùng giờ tiệc, địa điểm tiệc và thành phố chung.",
  groomEventTimeLabel: "Giờ tiệc nhà chú rể",
  groomEventVenueLabel: "Địa điểm tiệc nhà chú rể",
  groomEventLocationLabel: "Thành phố / khu vực",
  brideEventTimeLabel: "Giờ tiệc nhà cô dâu",
  brideEventVenueLabel: "Địa điểm tiệc nhà cô dâu",
  brideEventLocationLabel: "Thành phố / khu vực",
  tagGroomEventTime: "Mục Sự kiện · thẻ 03 · giờ tiệc nhà trai",
  tagGroomEventVenue: "Mục Sự kiện · thẻ 03 · địa điểm tiệc nhà trai",
  tagGroomEventLocation: "Mục Sự kiện · thẻ 02 · thành phố",
  groomWhenLineLabel: "Dòng ngày giờ hiển thị (tiệc nhà chú rể)",
  groomWhenLinePlaceholder: "VD: 18:00 · Chủ nhật, 20 tháng 10 năm 2026",
  groomWhenLineHint: "Để trống thì dùng “giờ tiệc nhà trai · ngày hiển thị”.",
  tagGroomWhenLine: "Mục Sự kiện · thẻ 02 · một dòng ngày giờ trên thiệp",
  tagBrideEventTime: "Mục Sự kiện · thẻ 03 · giờ tiệc nhà gái",
  tagBrideEventVenue: "Mục Sự kiện · thẻ 03 · địa điểm tiệc nhà gái",
  tagBrideEventLocation: "Mục Sự kiện · thẻ 03 · thành phố",
  brideWhenLineLabel: "Dòng ngày giờ hiển thị (tiệc nhà cô dâu)",
  brideWhenLinePlaceholder: "VD: 11:30 · Chủ nhật, 20 tháng 10 năm 2026",
  brideWhenLineHint: "Để trống thì dùng “giờ tiệc nhà gái · ngày hiển thị”.",
  tagBrideWhenLine: "Mục Sự kiện · thẻ 03 · một dòng ngày giờ trên thiệp",
  groomBankFieldsTitle: "Mừng cưới — nhà chú rể (cột trái)",
  brideBankFieldsTitle: "Mừng cưới — nhà cô dâu (cột phải)",
  brideBankFieldsHint:
    "Để trống cả ba ô thì cột phải hiển thị cùng thông tin với cột nhà chú rể (ô ngân hàng phía trên).",
  tagBrideBankName: "Mục Mừng cưới · cột nhà gái · tên ngân hàng",
  tagBrideAccountName: "Mục Mừng cưới · cột nhà gái · chủ TK",
  tagBrideAccountNumber: "Mục Mừng cưới · cột nhà gái · số TK (nút sao chép)",
  giftSectionTitle: "Mừng cưới (hai cột — nhà trai & nhà gái)",
  giftSectionInventory:
    "• Ba ô đầu: STK nhà chú rể (cột trái trên thiệp)\n• Ba ô “nhà cô dâu”: STK riêng cột phải — để trống thì hiển thị giống nhà trai\n• Mỗi cột có nút sao chép số tài khoản tương ứng",
  albumGridSectionTitle: "Album — đoạn dẫn & lưới ảnh (tối đa 30 ô)",
  albumGridSectionInventory:
    "• Đoạn lead dưới tiêu đề mục Album — để trống thì dùng bản mẫu\n• Dùng nút thêm / bớt ô để chỉnh số ảnh hiển thị trên thiệp (mặc định 15; tối đa 30)\n• Mỗi ô upload tương ứng một ô lưới bento (ô trống dùng ảnh mẫu)\n• Ảnh album không dùng cho thẻ cô dâu/chú rể — hai ảnh đó có ô riêng ở nhóm Cặp đôi",
  albumGridMinMaxHint:
    "Có thể hiển thị từ 1 đến 30 ô; mặc định 15 ô. Mỗi ô có upload riêng — ô không hiển thị trên thiệp vẫn giữ ảnh nếu bạn thu gọn lưới rồi mở lại.",
  albumVisibleSlotsSummary: "Đang hiển thị {n} / 30 ô trên thiệp.",
  addAlbumPhotoSlotLabel: "Thêm ô ảnh",
  removeAlbumPhotoSlotLabel: "Bớt ô ảnh",
  tagCoverImage: "Hero full-bleed · nền ảnh bìa (không dùng cho thẻ cặp đôi)",
  tagGallerySection: "Mục Album · lưới bento (ảnh mẫu khi chưa upload)",
  tagGallerySlot7: "Mục Album · ô ảnh 7",
  tagGallerySlot8: "Mục Album · ô ảnh 8",
  tagGallerySlot9: "Mục Album · ô ảnh 9",
  tagGallerySlot10: "Mục Album · ô ảnh 10",
  tagGallerySlot11: "Mục Album · ô ảnh 11",
  tagGallerySlot12: "Mục Album · ô ảnh 12",
  albumSlotTagFromIndex: "Mục Album · ô ảnh {n}",
};

const viBrightlyBasicPanel: BrightlyBasicWorkspacePanel = {
  deepSectionTitle: "Brightly Basic — nhập theo thứ tự đọc thiệp",
  deepSectionLead:
    "Mẫu một trang dài: hero → cặp đôi → nền parallax lời mời/sự kiện → (tuỳ chọn) chữ giới thiệu & tiêu đề mục → album → sự kiện (nội dung) → lưu bút → mừng cưới → ảnh footer. Mỗi vùng ảnh có slot riêng — không tái sử dụng cùng một URL giữa hero, thẻ cô dâu/chú rể, parallax, album và footer.",
  heroSectionTitle: "Hero & logo — ảnh bìa, tên, ngày, đếm ngược",
  heroSectionInventory:
    "• Ảnh bìa (upload) — chỉ nền hero full màn hình (không tự động làm nền footer hay thẻ cặp đôi)\n• Tên chú rể / cô dâu — hero, menu chữ cái, khối cặp đôi, thẻ lời mời, footer\n• Ngày hiển thị — dưới tên hero, trong thẻ lời mời và thẻ sự kiện\n• Ngày giờ ISO — đồng hồ đếm ngược, lịch tháng, nút thêm Google Calendar",
  coupleSectionTitle: "Cặp đôi — ảnh thẻ, họ nhà trai / nhà gái & giới thiệu",
  coupleSectionInventory:
    "• Ảnh thẻ chú rể / cô dâu (upload) — chỉ dùng cho hover card tương ứng; không dùng ảnh bìa hay ô album\n• Bốn dòng “Con ông / Con bà” — hiển thị trong khối lời chào dưới đoạn cảm ơn (còn trống thì hiện dấu “—”)\n• Hai đoạn giới thiệu — nội dung khi bật hover lên ảnh thẻ\n• Để trống đoạn giới thiệu thì dùng đoạn mẫu trên thiệp",
  gallerySectionTitle: "Album ảnh — masonry 6 ô",
  gallerySectionInventory:
    "• Sáu ô chỉ phục vụ lưới masonry mục Gallery — không còn gán sang nền lời mời, sự kiện hay thẻ cô dâu\n• Ô trống = ảnh mẫu riêng từng ô trong `data.ts` của mẫu",
  parallaxBgSectionTitle: "Nền parallax — lời mời & sự kiện (ảnh riêng)",
  parallaxBgSectionInventory:
    "• Ảnh nền khối lời mời / Save the date — không trùng URL với album hay ảnh bìa\n• Ảnh nền mục Sự kiện — một URL riêng; không lấy từ ô gallery",
  copywritingSectionTitle: "Chữ trên thiệp — giới thiệu & mô tả (tuỳ chọn)",
  copywritingSectionInventory:
    "• Khách có thể thay toàn bộ đoạn giới thiệu, tiêu đề mục, lời cảm ơn bằng giọng văn của mình (một ngôn ngữ mỗi thiệp — gõ tiếng Việt hoặc Anh theo nhu cầu).\n• Để trống từng ô → thiệp dùng câu mặc định theo ngôn ngữ trang (VI/EN trong bản dịch mẫu).\n• Thứ tự ô bên dưới theo lần lượt đọc thiệp: hero → cặp đôi → lời mời → album → sự kiện → lưu bút → mừng cưới → footer.",
  copyFieldPlaceholder: "Để trống = giữ bản mẫu theo ngôn ngữ trang",
  copyHeroSaveDateLabel: "Hero — dòng phía trên tên (Save the Date)",
  tagBbHeroSaveDateLine: "Hero · dòng phụ nhỏ phía trên tên cặp đôi",
  copyGettingMarriedLabel: "Cặp đôi — tiêu đề khối giới thiệu",
  tagBbGettingMarriedTitle: "Mục Cặp đôi · H3 (VD We are Getting Married)",
  copyThanksBodyLabel: "Cặp đôi — đoạn giới thiệu / cảm ơn dài",
  tagBbThanksBody: "Mục Cặp đôi · đoạn văn dưới tiêu đề",
  copyBigDayLabel: "Lời mời — tiêu đề lớn (The Big Day)",
  tagBbBigDayTitle: "Mục Lời mời / Save the date · H2 chính",
  copyInviteLeadLabel: "Lời mời — đoạn dẫn dưới tên",
  tagBbInviteLead: "Mục Lời mời · đoạn mô tả dưới tên cô dâu chú rể",
  copyGalleryTitleLabel: "Album — tiêu đề mục",
  tagBbGalleryTitle: "Mục Gallery · H2",
  copyEventsTitleLabel: "Sự kiện — tiêu đề mục",
  tagBbEventsTitle: "Mục Sự kiện · H2",
  copyEventsDescLabel: "Sự kiện — đoạn mô tả phía trên thẻ lễ/tiệc",
  tagBbEventsDesc: "Mục Sự kiện · đoạn dẫn dưới tiêu đề H2",
  copyGuestbookTitleLabel: "Lưu bút — tiêu đề mục",
  tagBbGuestbookTitle: "Mục Lưu bút · H2",
  copyGiftTitleLabel: "Mừng cưới — tiêu đề mục",
  tagBbGiftTitle: "Mục Mừng cưới · H2",
  copyFooterEyebrowLabel: "Footer — dòng phụ nhỏ (Trân trọng…)",
  tagBbFooterThanksEyebrow: "Cuối trang · dòng eyebrow trên lời cảm ơn",
  copyFooterThanksLabel: "Footer — đoạn lời cảm ơn chính",
  tagBbFooterThanks: "Cuối trang · đoạn văn cảm ơn",
  invitationBgUploadLabel: "Ảnh nền khối lời mời (parallax)",
  tagInvitationBg: "Mục Lời mời / Save the date · nền ảnh full-bleed phía sau thẻ",
  eventsBgUploadLabel: "Ảnh nền mục Sự kiện (parallax)",
  tagEventsBg: "Mục Sự kiện cưới · nền ảnh phía sau khối nội dung",
  eventsSectionTitle: "Sự kiện — lễ, tiệc nhà trai & nhà gái, bản đồ",
  eventsSectionInventory:
    "• Lễ thành hôn — giờ lễ, địa điểm (Maps / Google Calendar)\n• Ba ô “Giờ tiệc / Địa điểm tiệc / Thành phố” phía trên là mặc định chung cho cả hai tiệc\n• Tiệc nhà trai & tiệc nhà gái — mỗi bên ba ô tuỳ chọn; để trống từng ô thì ô đó dùng giá trị chung tương ứng\n• Mỗi tiệc có nút Google Maps riêng (chuỗi tìm kiếm theo địa điểm đã hiển thị)",
  groomReceptionFieldsTitle: "Tiệc cưới — nhà trai (tuỳ chỉnh)",
  groomReceptionFieldsHint:
    "Giờ / địa điểm / thành phố: để trống một ô thì ô đó lấy từ “Giờ tiệc”, “Địa điểm tiệc”, “Địa điểm / thành phố” phía trên.",
  tagBbGroomReceptionTime: "Mục Sự kiện · tiệc nhà trai · giờ (fallback = Giờ tiệc)",
  tagBbGroomReceptionVenue: "Mục Sự kiện · tiệc nhà trai · địa điểm (fallback = Địa điểm tiệc)",
  tagBbGroomReceptionLocation: "Mục Sự kiện · tiệc nhà trai · thành phố (fallback = Địa điểm / thành phố)",
  brideReceptionFieldsTitle: "Tiệc cưới — nhà gái (tuỳ chỉnh)",
  brideReceptionFieldsHint:
    "Cùng quy tắc fallback như tiệc nhà trai — hai cột trên thiệp luôn tách “nhà trai” và “nhà gái”.",
  tagBbBrideReceptionTime: "Mục Sự kiện · tiệc nhà gái · giờ (fallback = Giờ tiệc)",
  tagBbBrideReceptionVenue: "Mục Sự kiện · tiệc nhà gái · địa điểm (fallback = Địa điểm tiệc)",
  tagBbBrideReceptionLocation: "Mục Sự kiện · tiệc nhà gái · thành phố (fallback = Địa điểm / thành phố)",
  wishSectionTitle: "Lưu bút — gợi ý trong dropdown",
  wishSectionInventory:
    "• Ba dòng tùy chỉnh thay cho gợi ý mặc định trong menu chọn lời chúc\n• Để trống cả ba thì thiệp dùng gợi ý mặc định theo ngôn ngữ trang",
  giftSectionTitle: "Mừng cưới — nhà trai & nhà gái",
  giftSectionInventory:
    "• Ba ô đầu: STK nhà chú rể (cột trái trên thiệp)\n• Ba ô nhà cô dâu: STK cột phải — để trống cả ba thì hiển thị giống cột nhà trai (như Gentle Drift)\n• Mỗi cột có nút sao chép STK riêng",
  groomBankFieldsTitle: "Mừng cưới — nhà chú rể (cột trái)",
  tagGroomBankName: "Mục Mừng cưới · cột nhà trai · tên ngân hàng",
  tagGroomAccountName: "Mục Mừng cưới · cột nhà trai · chủ TK",
  tagGroomAccountNumber: "Mục Mừng cưới · cột nhà trai · số TK (nút sao chép)",
  brideBankFieldsTitle: "Mừng cưới — nhà cô dâu (cột phải)",
  brideBankFieldsHint:
    "Để trống cả ba ô nhà gái thì cột phải hiển thị cùng thông tin với cột nhà chú rể (ba ô phía trên).",
  tagBrideBankName: "Mục Mừng cưới · cột nhà gái · tên ngân hàng",
  tagBrideAccountName: "Mục Mừng cưới · cột nhà gái · chủ TK",
  tagBrideAccountNumber: "Mục Mừng cưới · cột nhà gái · số TK (nút sao chép)",
  footerBgSectionTitle: "Footer — ảnh nền lời cảm ơn",
  footerBgSectionInventory:
    "• Ảnh nền phía sau lớp mờ footer — URL riêng, không dùng ảnh bìa hay ô album\n• Để trống file thì dùng ảnh mẫu mặc định của mẫu",
  footerBgUploadLabel: "Ảnh nền footer cảm ơn",
  tagFooterBg: "Cuối trang · nền ảnh phía sau “Trân trọng cảm ơn”",
  tagCoverImage: "Hero full-bleed · chỉ nền hero — không tự gán thẻ cặp đôi hay footer",
  tagGallerySection: "Mục Gallery · lưới masonry (ảnh mẫu khi chưa upload)",
  tagGallerySlot1: "Gallery masonry · ô 1",
  tagGallerySlot2: "Gallery masonry · ô 2",
  tagGallerySlot3: "Gallery masonry · ô 3",
  tagGallerySlot4: "Gallery masonry · ô 4",
  tagGallerySlot5: "Gallery masonry · ô 5",
  tagGallerySlot6: "Gallery masonry · ô 6",
};

const vi: TemplateWorkspaceMessages = {
  lightbox: { close: "Đóng preview" },
  panel: {
    openPreview: "Mở bảng tuỳ chỉnh xem thử",
    closePreview: "Thu gọn bảng tuỳ chỉnh",
    titleEyebrow: "Xem thử",
    title: "Nhập thông tin — cập nhật ngay trên thiệp",
    groomName: "Tên chú rể",
    tagGroom: "Hero ảnh bìa · menu · Cặp đôi · footer",
    brideName: "Tên cô dâu",
    tagBride: "Hero ảnh bìa · menu · Cặp đôi · footer",
    dateLabel: "Ngày cưới hiển thị",
    tagDateLabel: "Hero · Sự kiện · lịch một tuần",
    countdownTarget: "Ngày giờ đếm ngược (ISO)",
    countdownTargetHint:
      "Ví dụ 2026-10-20T09:00 — dùng cho đồng hồ đếm ngược, lịch tuần, Google Calendar.",
    tagCountdownTarget: "Sự kiện · đếm ngược · thêm lịch",
    location: "Địa điểm / thành phố",
    tagLocation: "Sự kiện · Google Maps · chuỗi địa chỉ tiệc",
    ceremonyTime: "Giờ lễ",
    tagCeremonyTime: "Thẻ Lễ thành hôn trong mục Sự kiện",
    partyTime: "Giờ tiệc",
    tagPartyTime: "Thẻ Tiệc cưới trong mục Sự kiện",
    venue: "Địa điểm tiệc",
    tagVenue: "Sự kiện · Maps · Calendar",
    bankName: "Tên ngân hàng",
    tagBankName: "Mục Mừng cưới · cả hai cột quà",
    accountName: "Tên chủ tài khoản",
    tagAccountName: "Mục Mừng cưới · cả hai cột quà",
    accountNumber: "Số tài khoản",
    tagAccountNumber: "Mục Mừng cưới · nút sao chép STK",
    coverImage: "Ảnh bìa",
    tagCoverImage:
      "Hero slide 1 (ảnh bìa) + footer cảm ơn — slide 2+ = ảnh mẫu ô album 2–5; không dùng làm ảnh nền thẻ cặp đôi",
    coverSelected: "Đã chọn ảnh bìa mới.",
    coverEmpty: "Chưa chọn ảnh bìa.",
    gallery: "Album ảnh (tải lên)",
    tagGallerySection:
      "Lưới mục Album (6 ô) — ảnh mẫu ô 2–5 cũng làm slide 2–5 hero; không dùng cho thẻ cô dâu/chú rể",
    imageLabel: "Ảnh album",
    tagGallerySlot1: "Mục Album · ô ảnh 1",
    tagGallerySlot2: "Mục Album · ô ảnh 2",
    tagGallerySlot3: "Mục Album · ô ảnh 3",
    tagGallerySlot4: "Mục Album · ô ảnh 4",
    tagGallerySlot5: "Mục Album · ô ảnh 5",
    tagGallerySlot6: "Mục Album · ô ảnh 6",
    imageSelected: "Đã chọn ảnh.",
    imageDefault: "Đang dùng ảnh mặc định.",
    paymentEyebrow: "Thanh toán",
    paymentTitle: "Thanh toán gói Premium",
    paymentBuyerLine: "Tên trên đơn thanh toán:",
    paymentBuyerUnset:
      "Chưa nhập tên cô dâu / chú rể — cần đủ hai tên để tạo đơn thanh toán kèm thiệp.",
    paymentPay: "Thanh toán — 199.000đ",
    paymentLoading: "Đang tạo link…",
    paymentNotConfigured:
      "Cổng thanh toán chưa được cấu hình trên máy chủ. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
    paymentFailed: "Không tạo được link. Thử lại sau.",
    paymentInviteIncomplete:
      "Vui lòng nhập tên cô dâu và chú rể, địa điểm tiệc hoặc thành phố, và chỉnh ngày đếm ngược (ISO) hợp lệ trước khi thanh toán.",
    desiredSubdomainLabel: "Subdomain mong muốn (tuỳ chọn)",
    tagDesiredSubdomain: "Thanh toán · đường dẫn công khai sau khi kích hoạt",
    desiredSubdomainSuffixAria: "Hậu tố miền cố định .lumiere-wedding.com",
    desiredSubdomainHint:
      "Chỉ nhập phần trước dấu chấm; đuôi .lumiere-wedding.com cố định. Chữ thường, số và gạch ngang; 3–63 ký tự; không gạch đầu/cuối hoặc liên tiếp. Để trống nếu muốn hệ thống tự gán.",
    paymentSubdomainInvalid:
      "Subdomain không hợp lệ. Chỉ dùng chữ thường a–z, số và một gạch ngang giữa các đoạn (3–63 ký tự).",
    paymentFreeHint:
      "Đây là mẫu miễn phí — không cần thanh toán. Bấm “Tạo thiệp” để lưu thiệp với cùng bộ dữ liệu như luồng trả phí (tên, ngày, địa điểm, album).",
    paymentFreeEyebrow: "Thiệp miễn phí",
    paymentFreeTitle: "Tạo thiệp trên tài khoản",
    paymentFreeCta: "Tạo thiệp",
    paymentFreeLoading: "Đang tạo thiệp…",
    paymentFreeFailed: "Không tạo được thiệp. Thử lại sau.",
    paymentNotFree: "Mẫu này không thuộc gói miễn phí.",
    paymentEmailCta: "Gửi yêu cầu qua email",
    paymentMailSubject: "Yêu cầu mẫu Lumiere",
    slideFlex: viSlideFlexPanel,
    gentleDrift: viGentleDriftPanel,
    brightlyBasic: viBrightlyBasicPanel,
  },
};

const enSlideFlexPanel: SlideFlexWorkspacePanel = {
  sectionTitle: "Slide-flex — deep customization",
  sectionLead:
    "Slide-flex only: couple portrait uploads, hero lines, section titles, wish presets, parents, timeline, party, video, footer.",
  baseWorkspaceSectionTitle: "Core details & invitation images",
  baseWorkspaceSectionInventory:
    "• Groom and bride names\n• Displayed date, countdown date/time (ISO)\n• City/location, ceremony time, reception time, venue\n• Bank, account holder, account number\n• Cover image (upload) — hero slide 1 + thank-you footer; slides 2+ reuse the same default URLs as album tiles 2–5 (reliable Unsplash IDs). Couple cards still use separate stock portraits.\n• Up to 6 album images (upload) — gallery grid on the invitation",
  coupleSection: "Couple cards — parents & bios",
  coupleSectionInventory:
    "• Upload groom card background (optional — otherwise a built-in groom placeholder, not the cover)\n• Two groom family lines, groom bio\n• Upload bride card background (optional — otherwise a built-in bride placeholder, not the album)\n• Two bride family lines, bride bio\n• Public invites: HTTPS portrait URLs may arrive in JSON (used when no local upload blob).",
  groomParentLine1: "Groom — first parent line",
  tagGroomParentLine1: "Couple section · groom card · family line (1)",
  groomParentLine2: "Groom — second parent line",
  tagGroomParentLine2: "Couple section · groom card · family line (2)",
  brideParentLine1: "Bride — first parent line",
  tagBrideParentLine1: "Couple section · bride card · family line (1)",
  brideParentLine2: "Bride — second parent line",
  tagBrideParentLine2: "Couple section · bride card · family line (2)",
  groomBio: "Groom introduction",
  tagGroomBio: "Couple section · paragraph under groom name",
  brideBio: "Bride introduction",
  tagBrideBio: "Couple section · paragraph under bride name",
  storySection: "Love story — timeline (4 beats)",
  storySectionInventory:
    "• Four beats: each has title, date label, story paragraph\n• If all four are empty, the template shows the built-in sample story",
  storySlotLabel: "Beat",
  tagStorySlot: "Our story · date + title + paragraph",
  timelineTitle: "Title",
  timelineDate: "Date label",
  timelineBody: "Story text",
  partySection: "Bridesmaids & groomsmen (2 + 2)",
  partySectionInventory:
    "• Each person: role, name, short bio\n• Up to 2 bridesmaids and 2 groomsmen — empty name hides that card",
  bridesmaidBlock: "Bridesmaids",
  groomsmenBlock: "Groomsmen",
  tagPartyPerson: "Wedding party · name + short bio",
  personRole: "Role",
  personName: "Name",
  personBio: "Short bio",
  mediaSection: "Video & closing thank-you",
  mediaSectionInventory: "• Caption under the video placeholder block",
  videoCaption: "Caption under the video block",
  tagVideoCaption: "Video section · line under the play frame",
  footerSection: "Photo footer (thank-you card)",
  footerSectionInventory:
    "• Thank-you headline + body inside the bright card\n• Footer background uses the same cover image as the hero (album images are not used here)",
  footerThanksHeadline: "Thank-you headline",
  tagFooterHeadline: "Page end · headline inside the bright card",
  footerThanksBody: "Thank-you paragraph",
  tagFooterBody: "Page end · body copy inside the bright card",
  couplePhotosSection: "Card background (file upload)",
  groomPortraitUpload: "Groom card — upload photo",
  tagGroomPortraitUpload: "Couple section · groom card background — no file uses a built-in groom placeholder (not the cover)",
  bridePortraitUpload: "Bride card — upload photo",
  tagBridePortraitUpload: "Couple section · bride card background — no file uses a built-in bride placeholder (not the album)",
  heroCopySection: "Hero taglines (optional)",
  heroSectionInventory:
    "• Small eyebrow line above names\n• Supporting line under the couple names on the hero",
  heroEyebrow: "Small line above names (e.g. Wedding)",
  tagHeroEyebrow: "Cover hero · eyebrow above the couple names",
  heroGettingMarried: "Line under names",
  tagHeroGettingMarried: "Hero · “We’re getting married…” line",
  sectionHeadingsGroup: "Section headings (optional)",
  sectionHeadingsInventory:
    "• H2 titles: Couple, Love story, Party, Events, Gallery, Video, Guestbook, Gift\n• Lead paragraphs for Party, Events, Guestbook — empty falls back to defaults",
  sectionCoupleTitle: "Couple section title",
  tagSectionCoupleTitle: "Couple section · main H2",
  sectionStoryTitle: "Love story section title",
  tagSectionStoryTitle: "Our story · H2",
  sectionPartyTitle: "Wedding party section title",
  tagSectionPartyTitle: "Party section · H2",
  sectionPartyLead: "Intro under party title",
  tagSectionPartyLead: "Party section · lead paragraph",
  sectionEventsTitle: "Events section title",
  tagSectionEventsTitle: "Wedding events · H2",
  sectionEventsLead: "Intro under events title",
  tagSectionEventsLead: "Events section · lead under H2",
  sectionGalleryTitle: "Gallery section title",
  tagSectionGalleryTitle: "Gallery · H2",
  sectionVideoTitle: "Video section title",
  tagSectionVideoTitle: "Video · H2",
  sectionGuestbookTitle: "Guestbook section title",
  tagSectionGuestbookTitle: "Guestbook · H2",
  sectionGuestbookLead: "Guestbook intro",
  tagSectionGuestbookLead: "Guestbook · lead paragraph",
  sectionGiftTitle: "Gift section title",
  tagSectionGiftTitle: "Gift box · H2",
  wishSection: "Wish presets (guestbook dropdown)",
  wishSectionInventory:
    "• Three preset lines for the guestbook wish dropdown\n• If all three are empty, defaults follow the site language",
  wishSuggestion1: "Suggestion 1",
  tagWishSuggestion1: "Guestbook · dropdown · option 1",
  wishSuggestion2: "Suggestion 2",
  tagWishSuggestion2: "Guestbook · dropdown · option 2",
  wishSuggestion3: "Suggestion 3",
  tagWishSuggestion3: "Guestbook · dropdown · option 3",
};

const enGentleDriftPanel: GentleDriftWorkspacePanel = {
  deepSectionTitle: "Gentle Drift — match each area on the invite",
  deepSectionLead:
    "Editorial layout: intro, ticket calendar, hero, event cards, countdown, and gift box pull from the fields below — each block maps to one part of the page so inputs do not blur together.",
  bannerHeroSectionTitle: "Intro & hero — imagery and line under names",
  bannerHeroSectionInventory:
    "• Intro image — its own slot (stock default is not the cover or album)\n• Cover / hero — full-bleed background behind names\n• Groom and bride — intro overlay, hero, couple cards, footer\n• Displayed date — under names on the intro gate and for event fallbacks\n• Countdown date & time — pick with a calendar; shown in plain language on the hero plus ticket + countdown + Google Calendar\n• Hero line under names — invitation to leave wishes, above the countdown line",
  introBannerLabel: "Intro overlay image",
  introBannerHint: "Leave empty to use the built-in intro photo (separate URL — not pulled from the cover image).",
  tagIntroBanner: "Intro gate · luxury frame before “Open invitation”",
  countdownWorkspaceHint:
    "Pick the date and time in your local timezone — we store an ISO string for the countdown. You can still paste a custom ISO if needed.",
  heroLeadLabel: "Line under names on the hero",
  heroLeadHint:
    "Empty falls back to the default line for the page language. Shown directly under names, above the readable countdown line.",
  tagHeroLead: "Hero · wish line under names, above the countdown date/time",
  groomCouplePortraitLabel: "Groom card photo (couple section)",
  brideCouplePortraitLabel: "Bride card photo (couple section)",
  tagGroomCouplePortrait: "Couple section · groom portrait (not cover or album)",
  tagBrideCouplePortrait: "Couple section · bride portrait (not cover or album)",
  namesCalendarSectionTitle: "Couple names & calendar (intro · hero · ticket · countdown)",
  namesCalendarSectionInventory:
    "• Groom and bride — intro overlay, hero, couple cards, footer\n• Displayed date — under names (intro + hero) and inside event cards\n• ISO date/time — month on the ticket strip, countdown, Google Calendar link",
  copySectionTitle: "Invitation copy & section intros",
  copySectionInventory:
    "• Invitation paragraph in the Save the date block\n• Quote under the “Bride & groom” heading\n• Lead under Our story\n• Lead under the album — empty uses defaults",
  inviteWorkspaceSectionTitle: "Invitation (Save the date block)",
  inviteWorkspaceSectionInventory:
    "• Main paragraph after the calendar ticket — empty uses the built-in sample",
  inviteBodyLabel: "Invitation paragraph (Save the date block)",
  tagInviteBody: "Invitation block · main paragraph",
  coupleQuoteLabel: "Quote under couple heading",
  tagCoupleQuote: "Couple section · serif quote line",
  storyLeadLabel: "Our story — section lead",
  tagStoryLead: "Our story · lead under the H2",
  albumLeadLabel: "Album — section lead",
  tagAlbumLead: "Album section · lead under the H2",
  coupleDetailsSectionTitle: "Couple — quote, parents & bios",
  coupleDetailsSectionInventory:
    "• Quote under the couple heading — empty uses the built-in sample\n• Groom and bride card photos — separate slots (defaults differ from the album grid)\n• Two “child of” lines for groom and bride\n• Short bios under names — empty uses sample copy",
  timelineSectionTitle: "Our story — lead & timeline beats",
  timelineSectionInventory:
    "• Lead under the section title — empty uses the built-in sample\n• Each beat: field 1 = year (large), field 2 = title, field 3 = paragraph\n• If all three are empty for a beat, the built-in sample is used when available\n• + / − buttons: add or remove a beat (minimum 3, maximum 8)",
  timelineYearFieldLabel: "Year (number / label)",
  timelineTitleFieldLabel: "Beat title",
  timelineBodyFieldLabel: "Story paragraph",
  addTimelineBeatLabel: "Add a timeline beat",
  removeTimelineBeatLabel: "Remove a timeline beat",
  timelineBeatCountHint: "You can show between 3 and 8 beats on the invite.",
  footerThanksSectionTitle: "Footer — image & thank-you",
  footerThanksSectionInventory:
    "• Large full-bleed footer photo — empty upload keeps the stock image\n• Main thank-you line — empty uses the built-in copy for the page language\n• Optional second line shown smaller underneath",
  footerThanksImageLabel: "Footer thank-you image",
  footerThanksImageHint: "Leave the upload empty to keep the built-in large footer photo — pick a file to replace it.",
  tagFooterThanksImage: "Page footer · image above the thank-you line",
  tagFooterThanksHeadline: "Page footer · main thank-you line",
  tagFooterThanksBody: "Page footer · optional supporting line",
  footerThanksHeadlineHint:
    "Leave empty to use the built-in thank-you line for the current language.",
  footerThanksBodyHint: "Optional — only renders when filled; nice for a sign-off or extra note.",
  venueScheduleSectionTitle: "Wedding events — copy, venues & times",
  venueScheduleSectionInventory:
    "• Two intro lines for the Events section — empty keeps the template copy\n• Shared ceremony/reception time, venue, and city — defaults when per-card fields are empty\n• Order on the invite: ceremony → groom’s reception → bride’s reception\n• Optional “display date/time line” per card — empty uses “time · displayed date”",
  eventsQuoteLabel: "Quote under the Events heading",
  eventsQuoteHint: "Empty keeps the template quote on the invite.",
  eventsLeadLabel: "Lead paragraph under the Events heading",
  eventsLeadHint: "Empty keeps the template paragraph about ceremony and receptions.",
  tagEventsQuote: "Events section · serif quote under the H2",
  tagEventsLead: "Events section · lead under the quote",
  vuQuyEventFieldsTitle: "Ceremony / gate (card 01)",
  vuQuyEventFieldsHint:
    "If all three are empty, the card uses ceremony time, venue, and city from the shared fields above.",
  vuQuyEventTimeLabel: "Ceremony time",
  vuQuyEventVenueLabel: "Ceremony venue",
  vuQuyEventLocationLabel: "City / area",
  tagVuQuyEventTime: "Events · card 01 · ceremony time",
  tagVuQuyEventVenue: "Events · card 01 · ceremony venue",
  tagVuQuyEventLocation: "Events · card 01 · city",
  vuQuyWhenLineLabel: "Displayed date/time line (ceremony)",
  vuQuyWhenLinePlaceholder: "E.g. 9:00 AM · Sunday, October 20, 2026",
  vuQuyWhenLineHint: "Empty uses “ceremony time · displayed date” from the fields above.",
  tagVuQuyWhenLine: "Events · card 01 · one-line schedule on the invite",
  groomEventFieldsTitle: "Groom’s family reception (card 02)",
  groomEventFieldsHint:
    "If all three are empty, the card uses reception time, venue, and city from the shared fields above.",
  brideEventFieldsTitle: "Bride’s family reception (card 03)",
  brideEventFieldsHint:
    "If all three are empty, the card uses reception time, venue, and city from the shared fields above.",
  groomEventTimeLabel: "Groom’s reception time",
  groomEventVenueLabel: "Groom’s reception venue",
  groomEventLocationLabel: "City / area",
  brideEventTimeLabel: "Bride’s reception time",
  brideEventVenueLabel: "Bride’s reception venue",
  brideEventLocationLabel: "City / area",
  tagGroomEventTime: "Events · card 02 · groom reception time",
  tagGroomEventVenue: "Events · card 02 · groom reception venue",
  tagGroomEventLocation: "Events · card 02 · city",
  groomWhenLineLabel: "Displayed date/time line (groom’s reception)",
  groomWhenLinePlaceholder: "E.g. 6:00 PM · Sunday, October 20, 2026",
  groomWhenLineHint: "Empty uses “groom reception time · displayed date”.",
  tagGroomWhenLine: "Events · card 02 · one-line schedule on the invite",
  tagBrideEventTime: "Events · card 03 · bride reception time",
  tagBrideEventVenue: "Events · card 03 · bride reception venue",
  tagBrideEventLocation: "Events · card 03 · city",
  brideWhenLineLabel: "Displayed date/time line (bride’s reception)",
  brideWhenLinePlaceholder: "E.g. 11:30 AM · Sunday, October 20, 2026",
  brideWhenLineHint: "Empty uses “bride reception time · displayed date”.",
  tagBrideWhenLine: "Events · card 03 · one-line schedule on the invite",
  groomBankFieldsTitle: "Gift box — groom’s family (left column)",
  brideBankFieldsTitle: "Gift box — bride’s family (right column)",
  brideBankFieldsHint:
    "If all three are empty, the right column shows the same account as the groom column (fields above).",
  tagBrideBankName: "Gift section · bride column · bank name",
  tagBrideAccountName: "Gift section · bride column · account holder",
  tagBrideAccountNumber: "Gift section · bride column · account number (copy button)",
  giftSectionTitle: "Gift box (two columns — groom & bride)",
  giftSectionInventory:
    "• First three fields: groom’s family account (left column on the invite)\n• Bride family block: separate right-column details — empty mirrors the groom account\n• Each column has its own copy button",
  albumGridSectionTitle: "Album — lead & photo grid (up to 30 tiles)",
  albumGridSectionInventory:
    "• Lead under the album heading — empty uses the built-in sample\n• Use add / remove slot buttons to change how many tiles appear on the invite (default 15; max 30)\n• Each upload maps to one bento tile (empty slots use stock photos)\n• Album images are not reused on the couple cards — use the couple photo uploads for those portraits",
  albumGridMinMaxHint:
    "You can show between 1 and 30 tiles; the default is 15. Each tile has its own upload — images in hidden slots stay saved if you shrink the grid and expand it again.",
  albumVisibleSlotsSummary: "Showing {n} / 30 tiles on the invite.",
  addAlbumPhotoSlotLabel: "Add tile",
  removeAlbumPhotoSlotLabel: "Remove tile",
  tagCoverImage: "Full-bleed hero · cover background (not used on couple cards)",
  tagGallerySection: "Album section · bento grid (stock photos when empty)",
  tagGallerySlot7: "Album section · tile 7",
  tagGallerySlot8: "Album section · tile 8",
  tagGallerySlot9: "Album section · tile 9",
  tagGallerySlot10: "Album section · tile 10",
  tagGallerySlot11: "Album section · tile 11",
  tagGallerySlot12: "Album section · tile 12",
  albumSlotTagFromIndex: "Album section · tile {n}",
};

const enBrightlyBasicPanel: BrightlyBasicWorkspacePanel = {
  deepSectionTitle: "Brightly Basic — follow the invitation top to bottom",
  deepSectionLead:
    "Single-page scroll: hero → couple → parallax backdrops (invitation + events) → (optional) custom headings & body copy → gallery → events copy → guestbook → gift → footer photo. Each image slot is separate — do not reuse the same image URL across hero, couple cards, parallax bands, the masonry gallery, and the footer.",
  heroSectionTitle: "Hero & mark — cover, names, date, countdown",
  heroSectionInventory:
    "• Cover image (upload) — full-screen hero only (it is not auto-applied to the footer or couple cards)\n• Groom and bride names — hero, nav initials, couple strip, invitation card, footer logotype\n• Displayed date — under hero names, invitation card, event cards\n• ISO date/time — countdown, month calendar, Google Calendar link",
  coupleSectionTitle: "Couple — card photos, parents’ lines & bios",
  coupleSectionInventory:
    "• Groom and bride card photos (upload) — used only on the matching hover card, never the cover or gallery tiles\n• Four “child of …” lines — shown in the thank-you block under the long greeting (empty shows an em dash placeholder)\n• Two bios — appear when guests hover each photo card\n• Leave a bio empty to keep the template’s sample paragraph",
  gallerySectionTitle: "Gallery — six-tile masonry",
  gallerySectionInventory:
    "• Six tiles feed the masonry gallery only — they are not reused for invitation/events parallax or couple cards\n• Empty slots use distinct stock URLs from this template’s `data.ts`",
  parallaxBgSectionTitle: "Parallax backdrops — invitation & events (separate photos)",
  parallaxBgSectionInventory:
    "• Invitation / Save the date band — its own background URL (not the album or cover)\n• Events band — another dedicated URL; not pulled from gallery tiles",
  copywritingSectionTitle: "On-invite copy — intros & descriptions (optional)",
  copywritingSectionInventory:
    "• Lets couples replace headings, intros, and thank-you lines with their own wording (one language per invite — type Vietnamese or English as needed).\n• Leave any field blank to keep the template’s default line for the current page language (VI/EN sample copy).\n• Field order follows the invitation top to bottom: hero → couple → invitation → gallery → events → guestbook → gift → footer.",
  copyFieldPlaceholder: "Leave empty to keep the template default for the page language",
  copyHeroSaveDateLabel: "Hero — line above names (Save the Date)",
  tagBbHeroSaveDateLine: "Hero · small kicker above the couple names",
  copyGettingMarriedLabel: "Couple — intro block headline",
  tagBbGettingMarriedTitle: "Couple section · H3 (e.g. We are Getting Married)",
  copyThanksBodyLabel: "Couple — long intro / thank-you paragraph",
  tagBbThanksBody: "Couple section · paragraph under the headline",
  copyBigDayLabel: "Invitation — main title (The Big Day)",
  tagBbBigDayTitle: "Invitation / Save the date · primary H2",
  copyInviteLeadLabel: "Invitation — lead paragraph under names",
  tagBbInviteLead: "Invitation card · supporting copy under names",
  copyGalleryTitleLabel: "Gallery — section heading",
  tagBbGalleryTitle: "Gallery section · H2",
  copyEventsTitleLabel: "Events — section heading",
  tagBbEventsTitle: "Events section · H2",
  copyEventsDescLabel: "Events — intro above ceremony & receptions",
  tagBbEventsDesc: "Events section · lead under the H2",
  copyGuestbookTitleLabel: "Guestbook — section heading",
  tagBbGuestbookTitle: "Guestbook section · H2",
  copyGiftTitleLabel: "Gift box — section heading",
  tagBbGiftTitle: "Gift section · H2",
  copyFooterEyebrowLabel: "Footer — small eyebrow (With gratitude)",
  tagBbFooterThanksEyebrow: "Footer · eyebrow above the thank-you line",
  copyFooterThanksLabel: "Footer — main thank-you paragraph",
  tagBbFooterThanks: "Footer · thank-you body text",
  invitationBgUploadLabel: "Invitation / Save the date backdrop",
  tagInvitationBg: "Invitation band · full-bleed photo behind the card",
  eventsBgUploadLabel: "Events section backdrop",
  tagEventsBg: "Wedding events · parallax layer behind the content stack",
  eventsSectionTitle: "Events — ceremony, groom-side & bride-side receptions",
  eventsSectionInventory:
    "• Ceremony — time and venue (Maps / Google Calendar)\n• The three fields above (party time, venue, city) are the shared defaults for both receptions\n• Groom-side and bride-side receptions — three optional fields each; leave a field blank to inherit the matching shared value\n• Each reception has its own Google Maps link (built from the displayed address)",
  groomReceptionFieldsTitle: "Reception — groom’s family (overrides)",
  groomReceptionFieldsHint:
    "Time / venue / city: leave a field blank to inherit from Party time, Reception venue, and Location / city above.",
  tagBbGroomReceptionTime: "Events · groom-side reception · time (fallback = Party time)",
  tagBbGroomReceptionVenue: "Events · groom-side reception · venue (fallback = Reception venue)",
  tagBbGroomReceptionLocation: "Events · groom-side reception · city line (fallback = Location / city)",
  brideReceptionFieldsTitle: "Reception — bride’s family (overrides)",
  brideReceptionFieldsHint:
    "Same fallback rules as the groom-side card — the invite always shows two labeled columns.",
  tagBbBrideReceptionTime: "Events · bride-side reception · time (fallback = Party time)",
  tagBbBrideReceptionVenue: "Events · bride-side reception · venue (fallback = Reception venue)",
  tagBbBrideReceptionLocation: "Events · bride-side reception · city line (fallback = Location / city)",
  wishSectionTitle: "Guestbook — wish dropdown presets",
  wishSectionInventory:
    "• Three custom lines that replace the built-in wish samples in the RSVP dropdown\n• If all three are empty, the invitation keeps language-default suggestions",
  giftSectionTitle: "Gift box — groom’s & bride’s accounts",
  giftSectionInventory:
    "• First three fields: groom’s family column on the invite\n• Bride family block: right column — if all three are empty, the UI mirrors the groom column (same pattern as Gentle Drift)\n• Each column has its own copy-to-clipboard button",
  groomBankFieldsTitle: "Gift box — groom’s family (left column)",
  tagGroomBankName: "Gift section · groom column · bank name",
  tagGroomAccountName: "Gift section · groom column · account holder",
  tagGroomAccountNumber: "Gift section · groom column · account number (copy button)",
  brideBankFieldsTitle: "Gift box — bride’s family (right column)",
  brideBankFieldsHint:
    "If all three bride fields are empty, the right column shows the same account details as the groom column above.",
  tagBrideBankName: "Gift section · bride column · bank name",
  tagBrideAccountName: "Gift section · bride column · account holder",
  tagBrideAccountNumber: "Gift section · bride column · account number (copy button)",
  footerBgSectionTitle: "Footer — thank-you backdrop",
  footerBgSectionInventory:
    "• Footer background sits behind the closing thank-you layer — dedicated URL, not the cover or gallery\n• With no upload, the template uses its own stock footer image",
  footerBgUploadLabel: "Footer thank-you backdrop",
  tagFooterBg: "Page end · photo layer behind the thank-you typography",
  tagCoverImage: "Hero full-bleed · cover for the hero only — not couple cards or footer",
  tagGallerySection: "Gallery section · masonry grid (stock until you upload)",
  tagGallerySlot1: "Gallery masonry · tile 1",
  tagGallerySlot2: "Gallery masonry · tile 2",
  tagGallerySlot3: "Gallery masonry · tile 3",
  tagGallerySlot4: "Gallery masonry · tile 4",
  tagGallerySlot5: "Gallery masonry · tile 5",
  tagGallerySlot6: "Gallery masonry · tile 6",
};

const en: TemplateWorkspaceMessages = {
  lightbox: { close: "Close preview" },
  panel: {
    openPreview: "Open preview panel",
    closePreview: "Collapse preview panel",
    titleEyebrow: "Live preview",
    title: "Adjust details — your invitation updates instantly",
    groomName: "Groom name",
    tagGroom: "Cover hero · nav · couple section · footer names",
    brideName: "Bride name",
    tagBride: "Cover hero · nav · couple section · footer names",
    dateLabel: "Displayed wedding date",
    tagDateLabel: "Hero · events · week strip",
    countdownTarget: "Countdown date & time (ISO)",
    countdownTargetHint:
      "Example 2026-10-20T09:00 — powers countdown, week strip, and Google Calendar.",
    tagCountdownTarget: "Events · countdown · add to calendar",
    location: "Location / city",
    tagLocation: "Events · Google Maps · reception address line",
    ceremonyTime: "Ceremony time",
    tagCeremonyTime: "Ceremony card in Events",
    partyTime: "Reception time",
    tagPartyTime: "Reception card in Events",
    venue: "Reception venue",
    tagVenue: "Events · Maps · Calendar",
    bankName: "Bank name",
    tagBankName: "Gift section · both gift columns",
    accountName: "Account holder",
    tagAccountName: "Gift section · both gift columns",
    accountNumber: "Account number",
    tagAccountNumber: "Gift section · copy button",
    coverImage: "Cover image",
    tagCoverImage:
      "Hero slide 1 (cover) + thank-you footer; slides 2+ reuse default album tile URLs (2–5) — not used as couple-card backgrounds",
    coverSelected: "New cover image selected.",
    coverEmpty: "No custom cover image selected.",
    gallery: "Photo album (uploads)",
    tagGallerySection:
      "Gallery grid (6 tiles) — default tiles 2–5 also power hero slides 2–5; not used on couple cards",
    imageLabel: "Album image",
    tagGallerySlot1: "Gallery section · tile 1",
    tagGallerySlot2: "Gallery section · tile 2",
    tagGallerySlot3: "Gallery section · tile 3",
    tagGallerySlot4: "Gallery section · tile 4",
    tagGallerySlot5: "Gallery section · tile 5",
    tagGallerySlot6: "Gallery section · tile 6",
    imageSelected: "Image selected.",
    imageDefault: "Using default image.",
    paymentEyebrow: "Payment",
    paymentTitle: "Premium checkout",
    paymentBuyerLine: "Name on the payment request:",
    paymentBuyerUnset:
      "Bride and groom names are not filled in yet — both are required to create the payment request with your invitation.",
    paymentPay: "Pay — 2,490,000đ",
    paymentLoading: "Creating link…",
    paymentNotConfigured:
      "Checkout is not configured on the server yet. Please try again later or contact support.",
    paymentFailed: "Could not create the payment link.",
    paymentInviteIncomplete:
      "Please enter bride and groom names, a reception venue or city, and a valid countdown date before paying.",
    desiredSubdomainLabel: "Desired subdomain (optional)",
    tagDesiredSubdomain: "Checkout · public link after activation",
    desiredSubdomainSuffixAria: "Fixed domain suffix .lumiere-wedding.com",
    desiredSubdomainHint:
      "Type only the part before the dot; the .lumiere-wedding.com suffix is fixed. Lowercase letters, digits, and hyphens; 3–63 characters; no leading, trailing, or doubled hyphens. Leave blank to let the system assign one.",
    paymentSubdomainInvalid:
      "That subdomain is not valid. Use lowercase a–z, digits, and single hyphens between segments (3–63 characters).",
    paymentFreeHint:
      "This is a free template — no payment. Use “Create invitation” to save with the same invitation fields as checkout (names, date, venue, album). Or email us for help.",
    paymentFreeEyebrow: "Free invitation",
    paymentFreeTitle: "Save to your account",
    paymentFreeCta: "Create invitation",
    paymentFreeLoading: "Creating…",
    paymentFreeFailed: "Could not create the invitation. Try again later.",
    paymentNotFree: "This template is not in the free tier.",
    paymentEmailCta: "Send request by email",
    paymentMailSubject: "Lumiere template request",
    slideFlex: enSlideFlexPanel,
    gentleDrift: enGentleDriftPanel,
    brightlyBasic: enBrightlyBasicPanel,
  },
};

export const templateWorkspaceMessages: Record<AppLanguage, TemplateWorkspaceMessages> =
  { vi, en };
