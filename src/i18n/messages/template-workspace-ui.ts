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
    tagCeremonyTime: "Thẻ Lễ cưới trong mục Sự kiện",
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
  },
};

export const templateWorkspaceMessages: Record<AppLanguage, TemplateWorkspaceMessages> =
  { vi, en };
