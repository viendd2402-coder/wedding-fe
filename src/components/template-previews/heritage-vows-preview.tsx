"use client";

import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  HeritageVowsFallingHearts,
  HeritageVowsHeader,
  HeritageVowsMusicPlayer,
  heritageVowsGallery,
  heritageVowsWishes,
  type TemplatePreviewProps,
} from "@/templates/premium/heritage-vows/support";

export default function HeritageVowsPreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { language, theme } = useGlobalPreferences();
  const isDarkTheme = theme === "dark";
  const galleryImages = images.galleryImages.length ? images.galleryImages : heritageVowsGallery;

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            heroEyebrow: "Báo hỷ premium Việt",
            heroTitle: "Nét truyền thống trong một trải nghiệm cưới số cao cấp.",
            heroBody:
              "Mẫu này được dựng như một thiệp cưới Việt hiện đại: vẫn có hai họ, nghi lễ, địa chỉ gia đình và nhịp trình bày trang trọng nhưng không bị cũ.",
            invitationTitle: "Trân trọng báo hỷ",
            invitationLead:
              "Gia đình chúng tôi hân hạnh thông báo lễ thành hôn của hai con và kính mời quý khách đến chung vui.",
            lunarDate: "Nhằm ngày 18 tháng 9 năm Bính Ngọ",
            respectfulInvite: "Trân trọng kính mời",
            familiesTitle: "Thông tin hai bên gia đình",
            groomFamily: "Nhà trai",
            brideFamily: "Nhà gái",
            groomParents: "Thân sinh chú rể",
            brideParents: "Thân sinh cô dâu",
            groomParentsValue: "Ông Lê Minh Quang - Bà Phạm Thu Hà",
            brideParentsValue: "Ông Nguyễn Văn An - Bà Trần Thị Hoa",
            ceremonyFlow: "Nghi lễ trong ngày",
            ceremonyFlowTitle: "Một timeline rõ ràng cho khách mời theo dõi.",
            ceremonyItems: [
              {
                label: "Lễ gia tiên",
                time: preview.ceremonyTime,
                place: "Tư gia nhà gái - 12 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
              },
              {
                label: "Lễ thành hôn",
                time: "11:00",
                place: "Nhà thờ Chính Tòa Đà Nẵng - 156 Trần Phú, Hải Châu",
              },
              {
                label: "Tiệc mừng",
                time: preview.partyTime,
                place: preview.venue,
              },
            ],
            familyMaps: "Bản đồ hai họ",
            familyMapsTitle: "Chỉ đường đến nhà trai, nhà gái và sảnh tiệc.",
            mapButton: "Xem đường đi",
            homeCards: [
              {
                title: "Nhà gái",
                address: "12 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
                note: "Đón khách từ 08:00 cho nghi lễ gia tiên.",
              },
              {
                title: "Nhà trai",
                address: "88 Lê Quý Đôn, Thanh Khê, Đà Nẵng",
                note: "Điểm tập trung đoàn nhà trai trước giờ xuất phát.",
              },
              {
                title: "Sảnh tiệc",
                address: preview.venue,
                note: "Đón khách từ 17:30, có khu check-in QR riêng.",
              },
            ],
            premiumBoard: "Giá trị premium",
            premiumBoardTitle: "Những điểm làm mẫu Việt này khác hẳn bản free.",
            premiumItems: [
              "Bố cục thiệp báo hỷ rõ hai họ, hợp ngữ cảnh cưới Việt",
              "Timeline nghi lễ nhiều chặng thay vì chỉ một lịch cưới cơ bản",
              "Bản đồ riêng cho nhà trai, nhà gái và sảnh tiệc",
              "QR check-in và lời chúc trực tiếp trên website",
              "RSVP cao cấp với ghi chú cho gia đình và đội đón khách",
            ],
            galleryTitle: "Khoảnh khắc cưới",
            galleryBody:
              "Khoảng ảnh được giữ nhiều nhịp thở hơn để ảnh cưới vẫn sang nhưng không lấn mất cảm giác nghi lễ.",
            checkInTitle: "Cổng check-in",
            checkInBody:
              "Khách có thể mở thiệp ngay trên điện thoại để check-in nhanh tại bàn đón tiếp hoặc nhận hướng dẫn đến đúng khu vực.",
            qrLabel: "Mã khách mời",
            zoneLabel: "Khu vực",
            zoneValue: "Sảnh Hoa Sen - Bàn H12",
            wishesTitle: "Lời chúc và mừng cưới",
            wishesBody:
              "Bản premium cho phép khách để lại lời chúc ngay trên thiệp, đồng thời tách riêng thông tin mừng cưới để trải nghiệm vẫn trang trọng.",
            giftInfo: "Thông tin mừng cưới",
            rsvpEyebrow: "RSVP premium",
            rsvpTitle: "Xác nhận tham dự theo đúng tinh thần một lễ cưới được chuẩn bị kỹ.",
            rsvpBody:
              "Không chỉ xác nhận có đi hay không, phần RSVP có thể dùng để gom thông tin người đi cùng, nhu cầu đặc biệt và ghi chú cho ban tổ chức.",
            fullName: "Họ và tên",
            contact: "Số điện thoại hoặc email",
            attendance: "Hình thức tham dự",
            attendanceOptions: [
              "Tôi sẽ tham dự",
              "Tôi tham dự cùng người thân",
              "Rất tiếc, tôi không thể tham dự",
            ],
            session: "Buổi lễ tham dự",
            guestCount: "Số khách đi cùng",
            request: "Yêu cầu đặc biệt",
            message: "Lời chúc dành cho cô dâu chú rể",
            submit: "Gửi xác nhận",
            sectionNote: "Website cưới mang đậm chất Việt nhưng vẫn hiện đại, gọn và sang.",
          }
        : {
            heroEyebrow: "Vietnamese premium invitation",
            heroTitle: "Traditional warmth inside an elevated digital wedding experience.",
            heroBody:
              "This template is shaped like a modern Vietnamese wedding invitation: both families, ceremony flow, home addresses, and a more formal rhythm without feeling old-fashioned.",
            invitationTitle: "Respectfully announcing our wedding",
            invitationLead:
              "Our families are honored to share the joyful news of our marriage and warmly invite you to celebrate with us.",
            lunarDate: "Lunar date: the 18th day of the 9th lunar month, Binh Ngo year",
            respectfulInvite: "Respectfully invite you",
            familiesTitle: "The two families",
            groomFamily: "Groom's family",
            brideFamily: "Bride's family",
            groomParents: "Parents of the groom",
            brideParents: "Parents of the bride",
            groomParentsValue: "Mr. Le Minh Quang - Mrs. Pham Thu Ha",
            brideParentsValue: "Mr. Nguyen Van An - Mrs. Tran Thi Hoa",
            ceremonyFlow: "Ceremony flow",
            ceremonyFlowTitle: "A clearer timeline for guests throughout the day.",
            ceremonyItems: [
              {
                label: "Family ceremony",
                time: preview.ceremonyTime,
                place: "Bride's family home - 12 Nguyen Van Linh, Hai Chau, Da Nang",
              },
              {
                label: "Wedding ceremony",
                time: "11:00",
                place: "Da Nang Cathedral - 156 Tran Phu, Hai Chau",
              },
              {
                label: "Reception",
                time: preview.partyTime,
                place: preview.venue,
              },
            ],
            familyMaps: "Family maps",
            familyMapsTitle: "Directions to the bride's home, groom's home, and reception venue.",
            mapButton: "Open directions",
            homeCards: [
              {
                title: "Bride's family home",
                address: "12 Nguyen Van Linh, Hai Chau, Da Nang",
                note: "Guests are welcomed from 08:00 for the family ceremony.",
              },
              {
                title: "Groom's family home",
                address: "88 Le Quy Don, Thanh Khe, Da Nang",
                note: "Gathering point for the groom's family before departure.",
              },
              {
                title: "Reception hall",
                address: preview.venue,
                note: "Guest reception starts at 17:30 with a dedicated QR desk.",
              },
            ],
            premiumBoard: "Premium value",
            premiumBoardTitle: "What makes this Vietnamese premium template clearly different from free.",
            premiumItems: [
              "A formal invitation structure centered around both families",
              "A multi-step ceremony timeline instead of one simple schedule",
              "Separate directions for the bride's home, groom's home, and venue",
              "QR check-in and direct wedding wishes on the website",
              "A richer RSVP flow for guests and event coordination",
            ],
            galleryTitle: "Wedding moments",
            galleryBody:
              "The image rhythm leaves more breathing room so the photography still feels elevated without overshadowing the ceremony atmosphere.",
            checkInTitle: "Guest check-in gateway",
            checkInBody:
              "Guests can open the invitation on their phone and check in quickly at reception or receive guidance to the correct seating zone.",
            qrLabel: "Guest code",
            zoneLabel: "Zone",
            zoneValue: "Lotus Hall - Table H12",
            wishesTitle: "Wishes and gift information",
            wishesBody:
              "The premium version lets guests leave wishes directly on the invitation while keeping gift information in a dedicated, more respectful section.",
            giftInfo: "Gift information",
            rsvpEyebrow: "Premium RSVP",
            rsvpTitle: "Respond with the same level of care as the event itself.",
            rsvpBody:
              "RSVP here goes beyond a basic yes or no. It can also collect guest details, special requests, and notes for the hosting team.",
            fullName: "Full name",
            contact: "Phone number or email",
            attendance: "Attendance type",
            attendanceOptions: [
              "I will attend",
              "I will attend with family or guests",
              "Unfortunately I cannot attend",
            ],
            session: "Attendance session",
            guestCount: "Number of accompanying guests",
            request: "Special requests",
            message: "A message for the couple",
            submit: "Send RSVP",
            sectionNote: "A Vietnamese wedding website that feels cultural, modern, and premium at once.",
          },
    [language, preview.ceremonyTime, preview.partyTime, preview.venue],
  );

  const pageClasses = isDarkTheme
    ? "bg-[#120c0b] text-white"
    : "bg-[#fbf6f0] text-[var(--color-ink)]";
  const shellPanelClass = isDarkTheme
    ? "border border-white/10 bg-[rgba(255,255,255,0.05)] shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
    : "border border-[var(--color-ink)]/8 bg-white/88 shadow-[0_18px_48px_rgba(49,42,40,0.08)]";
  const softPanelClass = isDarkTheme ? "bg-white/6 text-white" : "bg-[var(--color-cream)]";
  const darkPanelClass = isDarkTheme
    ? "bg-[linear-gradient(135deg,#1c0e0b,#3a1610)] text-white shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
    : "bg-[linear-gradient(135deg,#8f2a1f,#c55234)] text-white shadow-[0_18px_48px_rgba(143,42,31,0.2)]";
  const mutedTextClass = isDarkTheme ? "text-white/76" : "text-[var(--color-ink)]/74";
  const subtleTextClass = isDarkTheme ? "text-white/60" : "text-[var(--color-ink)]/58";

  return (
    <div className={pageClasses}>
      <section className="relative isolate overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDarkTheme
              ? "bg-[radial-gradient(circle_at_top_left,_rgba(198,82,52,0.22),_transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0))]"
              : "bg-[radial-gradient(circle_at_top_left,_rgba(198,82,52,0.16),_transparent_24%),linear-gradient(180deg,rgba(255,248,242,0.8),rgba(255,255,255,0))]"
          }`}
        />
        <HeritageVowsFallingHearts color="rgba(213, 82, 52, 0.9)" />
        <HeritageVowsHeader tier={template.tier} />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-10 lg:px-16 lg:pb-20">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className={`rounded-[2.6rem] p-8 sm:p-10 ${darkPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.38em] text-white/64">
                {copy.heroEyebrow}
              </p>
              <h1 className="mt-6 font-display text-5xl leading-none sm:text-7xl">
                {preview.groom}
                <span className="px-3 text-white/70">&</span>
                {preview.bride}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/82">
                {copy.heroTitle}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-8 text-white/72">
                {copy.heroBody}
              </p>
              <div className="mt-8">
                <HeritageVowsMusicPlayer
                  label="Vietnamese wedding theme"
                  accentClassName="bg-[#ffd7c8]"
                />
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {language === "vi" ? "Ngày cưới" : "Wedding date"}
                  </p>
                  <p className="mt-3 font-display text-3xl">20/10</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {language === "vi" ? "Địa điểm" : "Location"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/80">{preview.location}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {language === "vi" ? "Giá trị" : "Value"}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/80">{copy.sectionNote}</p>
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
              className="block min-h-[680px] rounded-[2.6rem] text-left"
            >
              <div
                className="min-h-[680px] rounded-[2.6rem] bg-cover bg-center p-5 shadow-[0_28px_90px_rgba(49,42,40,0.18)]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(33,17,14,0.16), rgba(33,17,14,0.52)), url(${images.coverImage || template.image})`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/18 bg-[rgba(111,21,16,0.28)] p-8 text-white backdrop-blur-sm sm:p-10">
                  <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-white/68">
                    <span>{template.name}</span>
                    <span>{template.previewLabel}</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/64">
                      {copy.invitationTitle}
                    </p>
                    <p className="mt-4 max-w-lg text-sm leading-8 text-white/82">
                      {copy.invitationLead}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/60">
                      {preview.dateLabel}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/52">
                      {copy.lunarDate}
                    </p>
                    <p className="mt-8 font-display text-5xl leading-none sm:text-7xl">
                      {preview.groom}
                      <span className="px-3 text-white/72">&</span>
                      {preview.bride}
                    </p>
                    <p className="mt-6 text-sm uppercase tracking-[0.28em] text-white/64">
                      {copy.respectfulInvite}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-16">
        <div className={`rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b5482b]">
            {copy.familiesTitle}
          </p>
          <div className="mt-6 grid gap-4">
            <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.25em] text-[#b5482b]">
                {copy.groomFamily}
              </p>
              <p className="mt-3 font-display text-4xl">{preview.groom}</p>
              <p className={`mt-4 text-xs uppercase tracking-[0.22em] ${subtleTextClass}`}>
                {copy.groomParents}
              </p>
              <p className={`mt-2 text-sm leading-7 ${mutedTextClass}`}>{copy.groomParentsValue}</p>
            </div>
            <div className={`rounded-[1.7rem] p-5 ${softPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.25em] text-[#b5482b]">
                {copy.brideFamily}
              </p>
              <p className="mt-3 font-display text-4xl">{preview.bride}</p>
              <p className={`mt-4 text-xs uppercase tracking-[0.22em] ${subtleTextClass}`}>
                {copy.brideParents}
              </p>
              <p className={`mt-2 text-sm leading-7 ${mutedTextClass}`}>{copy.brideParentsValue}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#b5482b]">
            {copy.ceremonyFlow}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {copy.ceremonyFlowTitle}
          </h2>
          <div className="mt-8">
            <WeddingCountdown targetDate={preview.countdownTarget} variant="romance" />
          </div>
          <div className="mt-8 grid gap-4">
            {copy.ceremonyItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className={`grid gap-4 rounded-[1.7rem] p-5 sm:grid-cols-[0.28fr_0.72fr] ${softPanelClass}`}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#b5482b]">{item.label}</p>
                  <p className="mt-3 font-display text-3xl">{item.time}</p>
                </div>
                <p className={`text-sm leading-7 ${mutedTextClass}`}>{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className={`rounded-[2.4rem] p-6 sm:p-8 ${darkPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-white/58">
              {copy.familyMaps}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              {copy.familyMapsTitle}
            </h2>
            <div className="mt-8 grid gap-4">
              {copy.homeCards.map((card) => (
                <div key={card.title} className="rounded-[1.8rem] border border-white/12 bg-white/8 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/58">{card.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/82">{card.address}</p>
                      <p className="mt-2 text-sm leading-7 text-white/68">{card.note}</p>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-white/22 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white"
                    >
                      {copy.mapButton}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className={`rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-[#b5482b]">
                {copy.premiumBoard}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-tight">
                {copy.premiumBoardTitle}
              </h3>
              <div className="mt-6 grid gap-3">
                {copy.premiumItems.map((item, index) => (
                  <div key={item} className={`rounded-[1.5rem] px-4 py-4 ${softPanelClass}`}>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#b5482b]/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`mt-2 text-sm leading-7 ${mutedTextClass}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
              <p className="text-xs uppercase tracking-[0.35em] text-[#b5482b]">
                {copy.galleryTitle}
              </p>
              <p className={`mt-4 text-sm leading-8 ${mutedTextClass}`}>{copy.galleryBody}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      onPreviewImage({
                        src: image,
                        alt: `Gallery ${index + 1} ${template.name}`,
                      })
                    }
                    className={`${index === 0 ? "col-span-2 h-[240px]" : "h-[180px]"} rounded-[1.7rem] bg-cover bg-center`}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(49,42,40,0.08), rgba(49,42,40,0.2)), url(${image})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className={`rounded-[2.4rem] p-6 text-white sm:p-8 ${darkPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-white/56">
              {copy.checkInTitle}
            </p>
            <p className="mt-5 text-sm leading-8 text-white/80">{copy.checkInBody}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-white/12 bg-white p-4 shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
                <div className="grid grid-cols-9 gap-1">
                  {[
                    1, 1, 1, 1, 1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0, 0, 1, 0, 1,
                    1, 0, 1, 1, 1, 0, 1, 1, 1,
                    1, 0, 1, 0, 1, 0, 1, 0, 0,
                    1, 0, 1, 1, 1, 0, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 1, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 0, 1,
                    0, 0, 1, 0, 1, 0, 0, 1, 0,
                    1, 1, 1, 0, 1, 1, 1, 0, 1,
                  ].map((cell, index) => (
                    <span
                      key={index}
                      className={`aspect-square rounded-[2px] ${cell ? "bg-[var(--color-ink)]" : "bg-transparent"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/58">{copy.qrLabel}</p>
                  <p className="mt-3 text-sm leading-7 text-white/84">
                    {preview.groom} & {preview.bride}
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/58">{copy.zoneLabel}</p>
                  <p className="mt-3 text-sm leading-7 text-white/84">{copy.zoneValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-[#b5482b]">
              {copy.wishesTitle}
            </p>
            <p className={`mt-4 text-sm leading-8 ${mutedTextClass}`}>{copy.wishesBody}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="space-y-4">
                {heritageVowsWishes.slice(0, 2).map((wish) => (
                  <article key={wish.name} className={`rounded-[1.6rem] p-5 ${softPanelClass}`}>
                    <p className="font-display text-3xl">{wish.name}</p>
                    <p className={`mt-3 text-sm leading-7 ${mutedTextClass}`}>{wish.message}</p>
                  </article>
                ))}
              </div>
              <div className={`rounded-[1.8rem] p-5 ${softPanelClass}`}>
                <p className="text-xs uppercase tracking-[0.22em] text-[#b5482b]">{copy.giftInfo}</p>
                <p className={`mt-4 text-sm leading-8 ${mutedTextClass}`}>
                  {preview.bankName}
                  <br />
                  {preview.accountName}
                  <br />
                  {preview.accountNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 pb-16 sm:px-10 lg:px-16 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
          <div className={`rounded-[2.4rem] p-6 text-white sm:p-8 ${darkPanelClass}`}>
            <p className="text-xs uppercase tracking-[0.35em] text-white/56">{copy.rsvpEyebrow}</p>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{copy.rsvpTitle}</h2>
            <p className="mt-6 text-sm leading-8 text-white/78">{copy.rsvpBody}</p>
          </div>
          <form className={`grid gap-4 rounded-[2.4rem] p-6 sm:p-8 ${shellPanelClass}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
                placeholder={copy.fullName}
              />
              <input
                className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
                placeholder={copy.contact}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <select className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass}`}>
                {copy.attendanceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <input
                className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
                placeholder={copy.guestCount}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
                placeholder={copy.session}
              />
              <input
                className={`rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
                placeholder={copy.request}
              />
            </div>
            <textarea
              className={`min-h-32 rounded-2xl px-5 py-4 outline-none ${softPanelClass} ${isDarkTheme ? "placeholder:text-white/34" : "placeholder:text-[var(--color-ink)]/34"}`}
              placeholder={copy.message}
            />
            <div className="flex justify-end">
              <button type="button" className="btn-primary rounded-full px-8 py-4 text-sm font-medium transition">
                {copy.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
