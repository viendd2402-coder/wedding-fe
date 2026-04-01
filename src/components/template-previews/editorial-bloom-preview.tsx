"use client";

import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  EditorialBloomFallingHearts,
  EditorialBloomHeader,
  EditorialBloomMusicPlayer,
  editorialBloomCountdownTimeline,
  editorialBloomEvents,
  editorialBloomGallery,
  editorialBloomTimeline,
  editorialBloomWishes,
  type TemplatePreviewProps,
} from "@/templates/premium/editorial-bloom/support";

export default function EditorialBloomPreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { language, theme } = useGlobalPreferences();
  const galleryImages = images.galleryImages.length ? images.galleryImages : editorialBloomGallery;
  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            premiumEditorial: "Premium Editorial",
            signatureValue: "Signature Value",
            date: "Ngày cưới",
            venue: "Địa điểm",
            editorialCover: "Editorial cover",
            designedLikeAStory: "Được kể như một câu chuyện.",
            seeSpread: "Xem editorial spread",
            premiumRsvp: "RSVP cao cấp",
            storySpread: "Story Spread",
            featureStory: "Một chuyện tình được kể như bài viết trang bìa.",
            storyIntro:
              "Premium không chỉ thêm thông tin. Nó kể lại hành trình và bối cảnh của ngày cưới như một bài editorial có nhịp, có khoảng trắng và có chủ đích.",
            invitationCover: "Thiệp mời premium",
            invitationBody:
              "Thiệp mời được thiết kế lại theo ngữ cảnh cưới Việt, ưu tiên đầy đủ nghi lễ, hai bên gia đình và cách đọc quen thuộc với khách mời.",
            invitationHeadline: "Trân trọng báo tin lễ thành hôn",
            invitationSubline:
              "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.",
            invitationDateLine: "Chủ nhật, ngày 20 tháng 10 năm 2026",
            invitationLunarDate: "Nhằm ngày 18 tháng 9 năm Bính Ngọ",
            respectfulInvite: "Trân trọng kính mời",
            familySection: "Hai bên gia đình",
            brideFamily: "Gia đình nhà gái",
            groomFamily: "Gia đình nhà trai",
            brideParents: "Ông bà thân sinh cô dâu",
            groomParents: "Ông bà thân sinh chú rể",
            brideParentsValue: "Ông Nguyễn Văn An - Bà Trần Thị Hoa",
            groomParentsValue: "Ông Lê Minh Quang - Bà Phạm Thu Hà",
            ceremonySection: "Lễ vu quy & gia tiên",
            celebrationSection: "Tiệc mừng",
            ceremonyVenueLabel: "Tư gia nhà gái",
            celebrationVenueLabel: "Địa điểm tiệc",
            dressCode: "Dress Code",
            dressCodeTitle: "Modern Black Tie",
            conciergeNote: "Concierge Note",
            conciergeTitle:
              "Premium là cảm giác có người sắp xếp trải nghiệm giúp khách mời.",
            conciergeBody:
              "Ngoài hình ảnh lớn và layout sang hơn, khách còn nhận được hướng dẫn chỉn chu hơn về thời gian, dress code, gift info và RSVP.",
            weddingWeekFlow: "Wedding Week Flow",
            countdownTimeline: "Đếm ngược theo hành trình cưới",
            eventSchedule: "Lịch sự kiện",
            familyMaps: "Bản đồ gia đình",
            familyMapsTitle: "Chỉ đường tới nhà cô dâu và chú rể",
            familyMapsBody:
              "Bản premium có thể thêm riêng 2 điểm đến để khách tiện xem đường tới nhà gái, nhà trai trước ngày làm lễ.",
            brideHome: "Nhà cô dâu",
            groomHome: "Nhà chú rể",
            openMap: "Xem đường đi",
            guestNotes: "Ghi chú cho khách",
            guestNotesBody:
              "Bản premium có thể dùng để thêm ghi chú riêng cho khách mời, concierge info hoặc hướng dẫn đến venue theo cách rất chỉn chu.",
            giftSalon: "Gift Salon",
            giftPresence: "Lời chúc, quà mừng và sự hiện diện",
            giftSalonBody:
              "Phần quà mừng được trình bày như một section riêng, tách biệt khỏi RSVP để tăng cảm giác dịch vụ cao cấp và chỉn chu hơn.",
            guestCheckIn: "Guest Check-in",
            guestCheckInTitle: "Mã QR check-in cho khách mời",
            guestCheckInBody:
              "Khách chỉ cần mở thiệp cưới trên điện thoại và đưa mã QR này tại bàn đón tiếp để check-in nhanh hơn, phù hợp cho wedding có nhiều khách hoặc cần quản lý luồng vào sự kiện.",
            qrBadge: "Cổng premium",
            qrCodeLabel: "Mã check-in",
            qrGuestName: "Khách mời",
            qrZone: "Khu vực",
            qrZoneValue: "Main Hall - A12",
            qrHelpTitle: "Cách dùng",
            qrHelpSteps: [
              "Mở thiệp cưới khi đến sảnh đón khách",
              "Đưa mã QR cho lễ tân hoặc đội check-in",
              "Nhận hướng dẫn bàn tiệc hoặc khu vực ngồi",
            ],
            premiumPerks: "Premium Perks",
            premiumFeatureBoard: "Premium Feature Board",
            premiumFeatureTitle: "Những điểm làm bản premium đáng tiền hơn hẳn.",
            featureBoardItems: [
              "Song ngữ Việt / Anh cho toàn bộ trải nghiệm",
              "QR check-in cho khách mời tại sảnh đón tiếp",
              "Bản đồ riêng tới nhà cô dâu / chú rể",
              "RSVP nâng cao với nhiều thông tin hơn",
              "Dress code, concierge note và gift salon riêng",
            ],
            conceptNote: "Concept Note",
            conceptBody:
              "Premium phải giống một wedding editorial, không chỉ là bản free có thêm vài phần.",
            rsvpPremium: "RSVP Premium",
            confirmInStyle: "Xác nhận tham dự theo cách chỉn chu hơn.",
            rsvpBody:
              "Ở gói premium, phần xác nhận tham dự không còn là form phụ. Nó trở thành điểm chạm cuối của trải nghiệm, đủ đẹp để khách cảm thấy họ đang phản hồi cho một sự kiện được chuẩn bị chỉn chu.",
            fullName: "Họ và tên",
            contact: "Email hoặc số điện thoại",
            attendingSession: "Chọn buổi tham dự",
            guestCount: "Số lượng khách đi cùng",
            specialRequest: "Yêu cầu đặc biệt",
            message: "Để lại lời nhắn hoặc ghi chú cho cô dâu chú rể",
            rsvpExperience: "Premium RSVP experience",
            submit: "Gửi xác nhận",
            attending: "Tôi sẽ tham dự",
            attendingWithGuest: "Tôi tham dự cùng người thân",
            notAttending: "Rất tiếc, tôi không thể tham dự",
            dateShort: "Ngày",
            venueShort: "Địa điểm",
            giftInformation: "Thông tin mừng cưới",
          }
        : {
            premiumEditorial: "Premium Editorial",
            signatureValue: "Signature Value",
            date: "Date",
            venue: "Venue",
            editorialCover: "Editorial cover",
            designedLikeAStory: "Designed like a story.",
            seeSpread: "View editorial spread",
            premiumRsvp: "Premium RSVP",
            storySpread: "Story Spread",
            featureStory: "A wedding story told like a feature article.",
            storyIntro:
              "Premium is not just about adding more details. It turns the wedding into an editorial narrative with rhythm, breathing room, and intention.",
            invitationCover: "Invitation Cover",
            invitationBody:
              "This invitation is redesigned for a Vietnamese wedding context, with a stronger focus on ceremony flow, both families, and familiar invitation hierarchy.",
            invitationHeadline: "Respectfully announcing our wedding ceremony",
            invitationSubline:
              "Your presence would be a true honor for our families.",
            invitationDateLine: "Sunday, October 20, 2026",
            invitationLunarDate: "Lunar date: the 18th day of the 9th lunar month, Binh Ngo year",
            respectfulInvite: "Respectfully invite you",
            familySection: "The two families",
            brideFamily: "Bride's family",
            groomFamily: "Groom's family",
            brideParents: "Bride's parents",
            groomParents: "Groom's parents",
            brideParentsValue: "Mr. Nguyen Van An - Mrs. Tran Thi Hoa",
            groomParentsValue: "Mr. Le Minh Quang - Mrs. Pham Thu Ha",
            ceremonySection: "Traditional family ceremony",
            celebrationSection: "Wedding reception",
            ceremonyVenueLabel: "Bride's family home",
            celebrationVenueLabel: "Reception venue",
            dressCode: "Dress Code",
            dressCodeTitle: "Modern Black Tie",
            conciergeNote: "Concierge Note",
            conciergeTitle:
              "Premium feels like a hosted guest experience from beginning to end.",
            conciergeBody:
              "Beyond larger visuals and a more elevated layout, guests receive clearer guidance on timing, dress code, gift information, and RSVP details.",
            weddingWeekFlow: "Wedding Week Flow",
            countdownTimeline: "Countdown through the wedding journey",
            eventSchedule: "Event Schedule",
            familyMaps: "Family Maps",
            familyMapsTitle: "Directions to the bride and groom family homes",
            familyMapsBody:
              "The premium version can include two separate destinations so guests can quickly view directions to each family home before the ceremony day.",
            brideHome: "Bride's family home",
            groomHome: "Groom's family home",
            openMap: "Open directions",
            guestNotes: "Guest Notes",
            guestNotesBody:
              "The premium version can include private notes for guests, concierge information, or venue guidance in a much more polished way.",
            giftSalon: "Gift Salon",
            giftPresence: "Wishes, gifts, and your presence",
            giftSalonBody:
              "Gift information is treated as its own section, separate from RSVP, to create a more refined and elevated guest experience.",
            guestCheckIn: "Guest Check-in",
            guestCheckInTitle: "QR check-in for invited guests",
            guestCheckInBody:
              "Guests can simply open the wedding website on their phone and present this QR at reception for a faster arrival flow, ideal for larger weddings or managed guest access.",
            qrBadge: "Premium access",
            qrCodeLabel: "Check-in code",
            qrGuestName: "Guest",
            qrZone: "Zone",
            qrZoneValue: "Main Hall - A12",
            qrHelpTitle: "How it works",
            qrHelpSteps: [
              "Open the wedding invitation when you arrive",
              "Show this QR code to the reception or check-in team",
              "Receive guidance to your table or seating area",
            ],
            premiumPerks: "Premium Perks",
            premiumFeatureBoard: "Premium Feature Board",
            premiumFeatureTitle: "What makes the premium version clearly more valuable.",
            featureBoardItems: [
              "Vietnamese / English bilingual flow across the experience",
              "QR check-in for invited guests at reception",
              "Separate directions to the bride and groom family homes",
              "Enhanced RSVP with richer guest details",
              "Dedicated dress code, concierge note, and gift salon sections",
            ],
            conceptNote: "Concept Note",
            conceptBody:
              "Premium should feel like a wedding editorial, not simply a free version with a few extra blocks.",
            rsvpPremium: "Premium RSVP",
            confirmInStyle: "Confirm in style.",
            rsvpBody:
              "In the premium package, RSVP is no longer treated as a secondary form. It becomes the final touchpoint of the full experience.",
            fullName: "Full name",
            contact: "Email or phone number",
            attendingSession: "Select attendance session",
            guestCount: "Number of accompanying guests",
            specialRequest: "Special requests",
            message: "Leave a note or message for the couple",
            rsvpExperience: "Premium RSVP experience",
            submit: "Send RSVP",
            attending: "I will attend",
            attendingWithGuest: "I will attend with family or guests",
            notAttending: "Unfortunately, I cannot attend",
            dateShort: "Date",
            venueShort: "Venue",
            giftInformation: "Gift Information",
          },
    [language],
  );
  const dressCodeItems = useMemo(
    () =>
      language === "vi"
        ? [
            "Tông đen, champagne, rose beige",
            "Trang phục evening formal thanh lịch",
            "Hạn chế họa tiết quá nổi để đồng bộ concept",
            "Ưu tiên chất liệu satin, lụa, wool hoặc tuxedo clean",
          ]
        : [
            "Black, champagne, and rose beige tones",
            "Elegant evening formal attire",
            "Keep prints subtle to stay aligned with the concept",
            "Preferred fabrics: satin, silk, wool, or a clean tuxedo finish",
          ],
    [language],
  );
  const premiumPerks = useMemo(
    () =>
      language === "vi"
        ? [
            "Layout kể chuyện kiểu editorial thay vì landing page cơ bản",
            "Dress code và concierge note tách riêng",
            "Timeline + event flow nhiều lớp thông tin hơn",
            "Gift salon và wishes được xử lý như section cao cấp",
          ]
        : [
            "An editorial storytelling layout instead of a basic landing page",
            "Dedicated dress code and concierge sections",
            "A richer event flow with layered information",
            "Gift salon and wishes presented as elevated premium sections",
          ],
    [language],
  );
  const timelineItems = useMemo(
    () =>
      language === "vi"
        ? editorialBloomTimeline
        : [
            {
              year: "2017",
              title: "First hello",
              description:
                "A quiet introduction that slowly turned into the easiest conversation either of us had ever known.",
            },
            {
              year: "2020",
              title: "Growing together",
              description:
                "We learned how to build a life in the middle of change, holding onto the small rituals that made us feel at home.",
            },
            {
              year: "2025",
              title: "The promise",
              description:
                "Now the story becomes a celebration, shared with the people who have witnessed our journey and shaped it with love.",
            },
          ],
    [language],
  );
  const wishItems = useMemo(
    () =>
      language === "vi"
        ? editorialBloomWishes
        : [
            {
              name: "Linh & An",
              message:
                "Wishing the two of you a marriage filled with tenderness, laughter, and the kind of love that deepens with every year.",
            },
            {
              name: "Thao",
              message:
                "May this beautiful celebration be only the beginning of a life built with grace, warmth, and unforgettable memories.",
            },
          ],
    [language],
  );
  const isDarkTheme = theme === "dark";
  const pageClasses = isDarkTheme
    ? "bg-[#090909] text-white"
    : "bg-[#f8f3ee] text-[var(--color-ink)]";
  const mutedTextClass = isDarkTheme ? "text-white/72" : "text-[var(--color-ink)]/72";
  const secondaryTextClass = isDarkTheme ? "text-white/76" : "text-[var(--color-ink)]/76";
  const sectionBorderClass = isDarkTheme
    ? "border border-white/10"
    : "border border-[var(--color-ink)]/8";
  const lightPanelClass = isDarkTheme
    ? "bg-[rgba(255,255,255,0.06)] text-white shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
    : "bg-white/86 shadow-[0_18px_48px_rgba(49,42,40,0.07)]";
  const softPanelClass = isDarkTheme
    ? "bg-[rgba(255,255,255,0.04)] text-white"
    : "bg-[var(--color-cream)]";
  const darkPanelClass = isDarkTheme
    ? "bg-[linear-gradient(135deg,#0f0f10,#1d1d1f)] text-white shadow-[0_18px_48px_rgba(0,0,0,0.3)]"
    : "bg-[var(--color-ink)] text-white shadow-[0_18px_48px_rgba(49,42,40,0.14)]";
  const subtlePanelClass = isDarkTheme
    ? "bg-[rgba(255,255,255,0.04)] text-white"
    : "bg-white";

  return (
    <>
      <div className={pageClasses}>
      <section
        className={`relative isolate overflow-hidden ${
          isDarkTheme ? "bg-[#090909]" : "bg-[#f5eee8]"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDarkTheme
              ? "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0))]"
              : "bg-[radial-gradient(circle_at_top_right,_rgba(197,167,161,0.22),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]"
          }`}
        />
        <EditorialBloomFallingHearts color="rgba(184, 144, 152, 0.92)" />
        <EditorialBloomHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
            <div
              className={`flex min-h-[720px] flex-col justify-between rounded-[2.8rem] p-8 backdrop-blur sm:p-10 ${sectionBorderClass} ${
                isDarkTheme
                  ? "bg-[rgba(255,255,255,0.05)] shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
                  : "bg-white/78 shadow-[0_28px_80px_rgba(49,42,40,0.08)]"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-rose)]">
                    {copy.premiumEditorial}
                  </p>
                </div>
                <h1 className="mt-6 font-display text-5xl leading-none sm:text-7xl">
                  {preview.groom}
                  <br />
                  <span className="text-[var(--color-rose)]/88">&</span> {preview.bride}
                </h1>
                <p className={`mt-6 max-w-sm text-base leading-8 ${mutedTextClass}`}>
                  {template.heroTitle}
                </p>
                <div className="mt-8">
                  <EditorialBloomMusicPlayer
                    label="Wedding march"
                    accentClassName="bg-[var(--color-rose)]"
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div className={`rounded-[2rem] px-6 py-7 ${darkPanelClass}`}>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/54">
                    {copy.signatureValue}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/78">
                    {template.sectionProfile}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">
                      {copy.date}
                    </p>
                    <p className="mt-3 font-display text-3xl">20/10</p>
                  </div>
                  <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">
                      {copy.venue}
                    </p>
                    <p className={`mt-3 text-sm leading-7 ${mutedTextClass}`}>
                      {preview.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Cover ${template.name}`,
                })
              }
              className="block min-h-[720px] cursor-pointer rounded-[2.8rem] text-left shadow-[0_28px_90px_rgba(49,42,40,0.18)]"
            >
              <div
                className="min-h-[720px] rounded-[2.8rem] bg-cover bg-center p-8 sm:p-10"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(24,18,18,0.04), rgba(24,18,18,0.48)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between text-xs uppercase tracking-[0.3em] text-white/76">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/62">
                      {copy.editorialCover}
                    </p>
                    <p className="mt-5 font-display text-6xl leading-none text-white sm:text-8xl">
                      {copy.designedLikeAStory}
                    </p>
                    <p className="mt-6 max-w-md text-sm leading-8 text-white/84">
                      {template.heroSubtitle}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="#editorial-spread"
                        className="inline-flex rounded-full border border-white/28 bg-white/14 px-6 py-3 text-sm font-medium text-white backdrop-blur"
                      >
                        {copy.seeSpread}
                      </a>
                      <a
                        href="#rsvp"
                        className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--color-ink)]"
                      >
                        {copy.premiumRsvp}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section
        id="editorial-spread"
        className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-16"
      >
        <div className={`rounded-[2.6rem] px-7 py-10 text-white sm:px-10 ${darkPanelClass}`}>
          <p className="text-xs uppercase tracking-[0.4em] text-white/52">
            {copy.storySpread}
          </p>
          <h2 className="mt-6 font-display text-5xl leading-none sm:text-7xl">
            {copy.featureStory}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-8 text-white/76">
            {copy.storyIntro}
          </p>
          <div className="mt-10 space-y-5">
            {timelineItems.map((item, index) => (
              <div
                key={item.year}
                className={`grid gap-4 ${
                  index === 1 ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
                }`}
              >
                <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                    {item.year}
                  </p>
                  <p className="mt-3 font-display text-3xl">{item.title}</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/76">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className={`rounded-[2.6rem] p-6 sm:p-8 ${sectionBorderClass} ${lightPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-rose)]">
              {copy.invitationCover}
            </p>
            <button
              type="button"
              onClick={() =>
                onPreviewImage({
                  src: images.coverImage || template.image,
                  alt: `Invitation ${template.name}`,
                })
              }
              className="mt-8 block w-full cursor-pointer rounded-[2.2rem] text-left"
            >
              <div
                className="rounded-[2.2rem] bg-cover bg-center p-5"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(49,42,40,0.14)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="rounded-[1.9rem] border border-white/22 bg-[rgba(255,255,255,0.14)] p-8 text-white backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                    {copy.invitationHeadline}
                  </p>
                  <p className="mt-5 max-w-xl text-sm leading-8 text-white/84">
                    {copy.invitationSubline}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.28em] text-white/64">
                    {copy.invitationDateLine}
                  </p>
                  <div className="mt-8 rounded-[1.6rem] border border-white/14 bg-[rgba(255,255,255,0.08)] p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/62">
                      {copy.familySection}
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-[1.3rem] bg-[rgba(255,255,255,0.08)] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/62">
                          {copy.groomFamily}
                        </p>
                        <p className="mt-3 font-display text-3xl">{preview.groom}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/56">
                          {copy.groomParents}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/84">
                          {copy.groomParentsValue}
                        </p>
                      </div>
                      <div className="rounded-[1.3rem] bg-[rgba(255,255,255,0.08)] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-white/62">
                          {copy.brideFamily}
                        </p>
                        <p className="mt-3 font-display text-3xl">{preview.bride}</p>
                        <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/56">
                          {copy.brideParents}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/84">
                          {copy.brideParentsValue}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 font-display text-5xl leading-none sm:text-7xl">
                    {preview.groom}
                    <span className="px-3 text-white/72">&</span>
                    {preview.bride}
                  </p>
                  <p className="mt-5 max-w-xl text-sm leading-8 text-white/84">
                    {copy.invitationBody}
                  </p>
                  <div className="mt-6 rounded-[1.4rem] border border-white/14 bg-[rgba(255,255,255,0.08)] p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/62">
                      {copy.respectfulInvite}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/84">
                      {copy.invitationDateLine}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/56">
                      {copy.invitationLunarDate}
                    </p>
                  </div>
                  <div className="mt-8 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[1.6rem] border border-white/14 bg-[rgba(255,255,255,0.08)] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/66">
                        {copy.ceremonySection}
                      </p>
                      <p className="mt-3 font-display text-3xl">
                        {preview.ceremonyTime}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/84">
                        {copy.ceremonyVenueLabel}
                        <br />
                        12 Nguyen Van Linh, Hai Chau, Da Nang
                      </p>
                    </div>
                    <div className="rounded-[1.6rem] border border-white/14 bg-[rgba(255,255,255,0.08)] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/66">
                        {copy.celebrationSection}
                      </p>
                      <p className="mt-3 font-display text-3xl">
                        {preview.partyTime}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/84">
                        {copy.celebrationVenueLabel}
                        <br />
                        {preview.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className={`rounded-[2.6rem] p-8 ${sectionBorderClass} ${softPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">
                {copy.dressCode}
              </p>
              <h3 className="mt-5 font-display text-4xl">{copy.dressCodeTitle}</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {dressCodeItems.map((item) => (
                  <div
                    key={item}
                    className={`rounded-[1.6rem] p-5 text-sm leading-7 ${subtlePanelClass} ${mutedTextClass}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[2.6rem] p-8 text-white ${darkPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-white/54">
                {copy.conciergeNote}
              </p>
              <p className="mt-5 font-display text-4xl leading-tight">
                {copy.conciergeTitle}
              </p>
              <p className="mt-6 text-sm leading-8 text-white/76">
                {copy.conciergeBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className={`rounded-[2.6rem] p-8 ${sectionBorderClass} ${lightPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">
              {copy.weddingWeekFlow}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              {copy.countdownTimeline}
            </h2>
            <div className="mt-8">
              <WeddingCountdown targetDate={preview.countdownTarget} variant="editorial" />
            </div>
            <div className="mt-8 space-y-4">
              {editorialBloomCountdownTimeline.map((item, index) => (
                <div key={item.label} className="grid grid-cols-[24px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-rose)]" />
                    {index < editorialBloomCountdownTimeline.length - 1 ? <div className="mt-2 h-full w-px bg-[var(--color-ink)]/12" /> : null}
                  </div>
                  <div
                    className={`rounded-[1.5rem] p-4 ${
                      isDarkTheme ? "bg-white/8 text-white" : "bg-white/78"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">{item.date}</p>
                    <p className="mt-2 font-display text-3xl">{item.label}</p>
                    <p className={`mt-2 text-sm leading-7 ${mutedTextClass}`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5">
              {galleryImages.slice(0, 2).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    onPreviewImage({
                      src: image,
                      alt: `Gallery ${index + 1} ${template.name}`,
                    })
                  }
                  className={`${index === 0 ? "h-[380px]" : "h-[250px]"} cursor-pointer rounded-[2.2rem] bg-cover bg-center`}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.28)), url(${image})`,
                  }}
                />
              ))}
            </div>
            <div className="space-y-5">
              <div className={`rounded-[2.2rem] p-6 text-white ${darkPanelClass}`}>
                <p className="text-xs uppercase tracking-[0.3em] text-white/54">
                  {copy.eventSchedule}
                </p>
                <div className="mt-6 space-y-4">
                  {editorialBloomEvents.map((event) => (
                    <article key={event.label} className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/54">
                        {event.label}
                      </p>
                      <p className="mt-3 font-display text-3xl">
                        {event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/76">
                        {event.place === "Riverside Garden" ? preview.venue : event.place}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              <div className={`rounded-[2.2rem] p-6 ${sectionBorderClass} ${lightPanelClass}`}>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-rose)]">
                  {copy.familyMaps}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-tight">
                  {copy.familyMapsTitle}
                </h3>
                <p className={`mt-4 text-sm leading-8 ${mutedTextClass}`}>
                  {copy.familyMapsBody}
                </p>
                <div className="mt-6 grid gap-4">
                  {[
                    {
                      label: copy.brideHome,
                      address: "12 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
                    },
                    {
                      label: copy.groomHome,
                      address: "88 Lê Quý Đôn, Thanh Khê, Đà Nẵng",
                    },
                  ].map((home) => (
                    <div
                      key={home.label}
                      className={`rounded-[1.7rem] p-5 ${softPanelClass}`}
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">
                        {home.label}
                      </p>
                      <p className={`mt-3 text-sm leading-7 ${secondaryTextClass}`}>
                        {home.address}
                      </p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex rounded-full border border-[var(--color-rose)]/22 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-rose)]"
                      >
                        {copy.openMap}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`rounded-[2.2rem] p-6 ${sectionBorderClass} ${lightPanelClass}`}>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-rose)]">
                  {copy.guestNotes}
                </p>
                <p className={`mt-4 text-sm leading-8 ${mutedTextClass}`}>
                  {copy.guestNotesBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div
            className={`rounded-[2.8rem] px-7 py-10 text-white sm:px-10 ${
              isDarkTheme
                ? "bg-[linear-gradient(135deg,#050505,#171717)]"
                : "bg-[linear-gradient(135deg,#2f2727,#5f4744)]"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              {copy.giftSalon}
            </p>
            <h2 className="mt-6 font-display text-5xl leading-none sm:text-6xl">
              {copy.giftPresence}
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-4">
                {wishItems.map((wish) => (
                  <article key={wish.name} className="rounded-[1.8rem] border border-white/10 bg-white/6 p-5">
                    <p className="font-display text-3xl">{wish.name}</p>
                    <p className="mt-3 text-sm leading-7 text-white/76">
                      {wish.message}
                    </p>
                  </article>
                ))}
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {copy.giftInformation}
                </p>
                <p className="mt-5 text-sm leading-8 text-white/76">
                  {preview.bankName}
                  <br />
                  {preview.accountName}
                  <br />
                  {preview.accountNumber}
                </p>
                <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/74">
                  {copy.giftSalonBody}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className={`rounded-[2.4rem] p-6 sm:p-8 ${sectionBorderClass} ${lightPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">
                {copy.premiumFeatureBoard}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-tight">
                {copy.premiumFeatureTitle}
              </h3>
              <div className="mt-6 grid gap-3">
                {copy.featureBoardItems.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-[1.5rem] px-4 py-4 text-sm leading-7 ${softPanelClass} ${secondaryTextClass}`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-rose)]/76">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`rounded-[2.4rem] p-6 sm:p-8 ${sectionBorderClass} ${lightPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">
                {copy.premiumPerks}
              </p>
              <div className="mt-6 grid gap-3">
                {premiumPerks.map((item) => (
                  <div
                    key={item}
                    className={`rounded-[1.5rem] px-4 py-3 text-sm leading-7 ${softPanelClass} ${secondaryTextClass}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[2.4rem] p-6 text-white sm:p-8 ${darkPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-white/52">
                {copy.conceptNote}
              </p>
              <p className="mt-5 font-display text-4xl leading-tight">
                {copy.conceptBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className={`rounded-[2.6rem] p-8 text-white sm:p-10 ${darkPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-white/54">
              {copy.guestCheckIn}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              {copy.guestCheckInTitle}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/76">
              {copy.guestCheckInBody}
            </p>
            <div className="mt-8 space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-white/48">
                {copy.qrHelpTitle}
              </p>
              {copy.qrHelpSteps.map((step) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-white/78"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2.6rem] p-6 sm:p-8 ${sectionBorderClass} ${lightPanelClass}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-rose)]">
                  {copy.qrCodeLabel}
                </p>
                <p className="mt-3 font-display text-4xl">
                  {preview.groom} & {preview.bride}
                </p>
              </div>
              <span className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--color-rose)] ${softPanelClass}`}>
                {copy.qrBadge}
              </span>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="mx-auto w-full max-w-[280px] rounded-[2rem] bg-[var(--color-ink)] p-5 shadow-[0_20px_40px_rgba(49,42,40,0.18)]">
                <div className="rounded-[1.4rem] bg-white p-4">
                  <div className="grid grid-cols-9 gap-1">
                    {[
                      1, 1, 1, 1, 1, 1, 1, 0, 1,
                      1, 0, 0, 0, 0, 0, 1, 0, 1,
                      1, 0, 1, 1, 1, 0, 1, 1, 1,
                      1, 0, 1, 1, 1, 0, 1, 0, 0,
                      1, 0, 1, 1, 1, 0, 1, 1, 1,
                      1, 0, 0, 0, 0, 0, 1, 0, 1,
                      1, 1, 1, 1, 1, 1, 1, 0, 1,
                      0, 0, 1, 0, 1, 0, 0, 1, 0,
                      1, 1, 1, 0, 1, 1, 1, 0, 1,
                    ].map((cell, index) => (
                      <span
                        key={index}
                        className={`aspect-square rounded-[2px] ${
                          cell ? "bg-[var(--color-ink)]" : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">
                    {copy.qrGuestName}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${secondaryTextClass}`}>
                    {preview.groom} & {preview.bride}
                  </p>
                </div>
                <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-rose)]">
                    {copy.qrZone}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${secondaryTextClass}`}>
                    {copy.qrZoneValue}
                  </p>
                </div>
                <div
                  className={`rounded-[1.7rem] border border-dashed p-5 text-sm leading-7 ${
                    isDarkTheme
                      ? "border-white/14 bg-white/4 text-white/72"
                      : "border-[var(--color-ink)]/12 bg-white text-[var(--color-ink)]/72"
                  }`}
                >
                  {preview.dateLabel}
                  <br />
                  {preview.venue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div
          id="rsvp"
          className={`rounded-[2.8rem] p-6 sm:p-8 ${
            isDarkTheme
              ? "border border-white/10 bg-[linear-gradient(135deg,#0d0d0e,#1b1b1d)] shadow-[0_18px_48px_rgba(0,0,0,0.3)]"
              : "bg-[linear-gradient(135deg,#f5eee8,#fff8f5)] shadow-[0_18px_48px_rgba(49,42,40,0.08)]"
          }`}
        >
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div className={`rounded-[2.2rem] p-8 text-white ${darkPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-white/52">
                {copy.rsvpPremium}
              </p>
              <h2 className="mt-5 font-display text-5xl leading-none">
                {copy.confirmInStyle}
              </h2>
              <p className="mt-6 text-sm leading-8 text-white/76">
                {copy.rsvpBody}
              </p>
            </div>

            <form className={`grid gap-4 rounded-[2.2rem] p-6 sm:p-8 ${sectionBorderClass} ${lightPanelClass}`}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.fullName} />
                <input className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.contact} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <select className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass}`}>
                  <option>{copy.attending}</option>
                  <option>{copy.attendingWithGuest}</option>
                  <option>{copy.notAttending}</option>
                </select>
                <input className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.guestCount} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.attendingSession} />
                <input className={`rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.specialRequest} />
              </div>
              <textarea className={`min-h-32 rounded-2xl px-5 py-4 outline-none ${sectionBorderClass} ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/35" : "placeholder:text-[var(--color-ink)]/35"}`} placeholder={copy.message} />
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className={`text-xs uppercase tracking-[0.28em] ${isDarkTheme ? "text-white/44" : "text-[var(--color-ink)]/44"}`}>
                  {copy.rsvpExperience}
                </p>
                <button type="button" className="btn-primary rounded-full px-8 py-4 text-sm font-medium transition">
                  {copy.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
