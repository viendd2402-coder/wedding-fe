"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";
import Link from "next/link";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import WeddingCountdown from "@/components/wedding-countdown";
import {
  AzurePromiseHeader,
  AzurePromiseMusicPlayer,
  azurePromiseEvents,
  azurePromiseGallery,
  type TemplatePreviewProps,
} from "@/templates/free/azure-promise/support";
import scroll from "./azure-promise-preview.module.css";

const ioOpts: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -18% 0px",
  threshold: 0.12,
};

type RevealAxis = "up" | "left" | "right";

function mediaPendingClass(axis: RevealAxis): string {
  if (axis === "left") return scroll.scrollMediaPendingLeft;
  if (axis === "right") return scroll.scrollMediaPendingRight;
  return scroll.scrollMediaPending;
}

function ScrollRevealDiv({
  className = "",
  children,
  revealAxis = "up",
  ...rest
}: ComponentPropsWithoutRef<"div"> & { revealAxis?: RevealAxis }) {
  const ref = useRef<ElementRef<"div">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const p = mediaPendingClass(revealAxis);
  return (
    <div ref={ref} {...rest} className={`${className} ${shown ? scroll.scrollMediaShown : p}`.trim()}>
      {children}
    </div>
  );
}

function ScrollRevealButton(
  props: ComponentPropsWithoutRef<"button"> & { revealAxis?: RevealAxis },
) {
  const { className = "", children, revealAxis = "up", ...rest } = props;
  const ref = useRef<ElementRef<"button">>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(e.target);
        }
      }
    }, ioOpts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pending = mediaPendingClass(revealAxis);
  return (
    <button
      ref={ref}
      {...rest}
      className={`${className} ${shown ? scroll.scrollMediaShown : pending}`.trim()}
    >
      {children}
    </button>
  );
}

export default function AzurePromisePreview({
  template,
  preview,
  images,
  onPreviewImage,
}: TemplatePreviewProps) {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";
  const galleryImages = images.galleryImages.length ? images.galleryImages : azurePromiseGallery;

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            freeBadge: "Giao diện miễn phí",
            vipBadge: "Giao diện VIP",
            heroTitle: "Khoảnh khắc hạnh phúc của chúng mình",
            heroBody:
              "Một mẫu thiệp cưới online sáng, gọn và dễ dùng, ưu tiên khách xem nhanh trên điện thoại và thao tác rõ ràng như các gallery template phổ biến.",
            previewCta: "Xem trước",
            createCta: "Tạo website",
            tabs: ["Giới thiệu", "Sự kiện", "Album", "RSVP"],
            aboutTitle: "Cô dâu & Chú rể",
            aboutBody:
              "Từ một cuộc gặp gỡ tình cờ, chúng mình đã cùng nhau đi qua những ngày rất bình thường nhưng đầy ý nghĩa, để rồi chọn ngày hôm nay làm khởi đầu cho hành trình mới.",
            storyTitle: "Chuyện của chúng mình",
            storyItems: [
              {
                year: "2021",
                title: "Lần đầu gặp nhau",
                description:
                  "Một buổi chiều bình thường nhưng lại mở ra hành trình rất đặc biệt với cả hai.",
              },
              {
                year: "2023",
                title: "Cùng nhau trưởng thành",
                description:
                  "Những chuyến đi, những bữa cơm và rất nhiều kế hoạch nhỏ đã khiến tình yêu bền chặt hơn.",
              },
              {
                year: "2026",
                title: "Ngày về chung một nhà",
                description:
                  "Chúng mình chọn lưu lại ngày trọng đại này theo cách thật gần gũi để chia sẻ với người thân, bạn bè.",
              },
            ],
            dateTitle: "Ngày tổ chức",
            venueTitle: "Địa điểm",
            countdownTitle: "Đếm ngược ngày cưới",
            invitationTitle: "Thiệp mời online",
            invitationBody:
              "Trân trọng kính mời quý khách đến tham dự lễ thành hôn của hai chúng mình và chung vui trong ngày đặc biệt này.",
            eventTitle: "Thông tin sự kiện",
            eventLead:
              "Toàn bộ lịch trình được sắp xếp rõ ràng để khách mời xem nhanh trên điện thoại mà vẫn nắm đủ thông tin cần thiết.",
            mapTitle: "Bản đồ đến địa điểm",
            mapBody:
              "Khách mời có thể bấm xem đường đi nhanh để tìm tới địa điểm tổ chức thuận tiện hơn trên điện thoại.",
            infoTitle: "Thông tin thêm cho khách mời",
            guestInfoItems: [
              "Dress code: xanh pastel, trắng kem hoặc beige nhẹ",
              "Đón khách từ 17:30 tại sảnh chính",
              "Vui lòng xác nhận trước ngày 10.10.2026",
              "Có khu vực chụp ảnh và bàn đón tiếp riêng",
            ],
            albumTitle: "Album ảnh cưới",
            albumBody:
              "Một layout sáng và thân thiện để ảnh cưới nổi bật mà vẫn giữ cảm giác nhẹ nhàng, gần gũi.",
            galleryStats: [
              { label: "Ảnh album", value: "12+" },
              { label: "Sự kiện", value: "02" },
              { label: "Khách mời", value: "150+" },
            ],
            rsvpTitle: "Xác nhận tham dự",
            rsvpBody:
              "Vui lòng xác nhận sớm để chúng mình chuẩn bị đón tiếp chu đáo hơn trong ngày cưới.",
            giftTitle: "Thông tin mừng cưới",
            giftBody:
              "Nếu quý khách muốn gửi quà mừng, hai chúng mình xin được nhận tấm lòng qua thông tin bên dưới.",
            fullName: "Nhập họ và tên",
            contact: "Số điện thoại hoặc email",
            message: "Gửi lời chúc tới cô dâu chú rể",
            attending: "Tôi sẽ tham dự",
            decline: "Tôi không thể tham dự",
            submit: "Gửi thông tin",
            footerTitle: "Cảm ơn bạn đã ghé xem thiệp cưới của chúng mình",
          }
        : {
            freeBadge: "Free template",
            vipBadge: "VIP template",
            heroTitle: "A joyful chapter begins here",
            heroBody:
              "A bright, simple wedding invitation layout designed for fast mobile viewing and clear actions, inspired by mainstream wedding template galleries.",
            previewCta: "Preview",
            createCta: "Create website",
            tabs: ["About", "Events", "Gallery", "RSVP"],
            aboutTitle: "Bride & Groom",
            aboutBody:
              "From a chance meeting to a shared life full of small meaningful moments, we are excited to celebrate this new chapter with the people we love.",
            storyTitle: "Our story",
            storyItems: [
              {
                year: "2021",
                title: "First hello",
                description:
                  "An ordinary afternoon that unexpectedly became the beginning of something very special.",
              },
              {
                year: "2023",
                title: "Growing together",
                description:
                  "Trips, dinners, and many small plans slowly turned our days into a shared life.",
              },
              {
                year: "2026",
                title: "A new chapter",
                description:
                  "We chose to keep this day in a warm and simple format to share it with everyone we love.",
              },
            ],
            dateTitle: "Wedding date",
            venueTitle: "Venue",
            countdownTitle: "Countdown to our wedding",
            invitationTitle: "Online invitation",
            invitationBody:
              "We warmly invite you to join our wedding celebration and share this meaningful day with us.",
            eventTitle: "Event details",
            eventLead:
              "The schedule is arranged clearly so guests can scan the details quickly on mobile while still seeing everything important.",
            mapTitle: "Directions to the venue",
            mapBody:
              "Guests can quickly open directions on mobile to reach the venue more easily.",
            infoTitle: "More guest information",
            guestInfoItems: [
              "Dress code: pastel blue, cream, or soft beige",
              "Guest reception starts at 17:30",
              "Please RSVP before 10.10.2026",
              "A photo corner and welcome table are prepared on site",
            ],
            albumTitle: "Wedding gallery",
            albumBody:
              "A bright and friendly layout that lets the photos stand out while keeping the overall feel soft and accessible.",
            galleryStats: [
              { label: "Photos", value: "12+" },
              { label: "Events", value: "02" },
              { label: "Guests", value: "150+" },
            ],
            rsvpTitle: "RSVP",
            rsvpBody:
              "Please confirm early so we can prepare a more thoughtful guest experience.",
            giftTitle: "Gift information",
            giftBody:
              "If you would like to send a wedding gift, we would be grateful to receive your thoughtfulness through the details below.",
            fullName: "Enter your full name",
            contact: "Phone number or email",
            message: "Leave a message for the couple",
            attending: "I will attend",
            decline: "I cannot attend",
            submit: "Submit",
            footerTitle: "Thank you for visiting our wedding invitation",
          },
    [language],
  );

  const shellClass = isDark
    ? "border border-white/10 bg-[#101826] text-white shadow-[0_28px_70px_rgba(0,0,0,0.34)]"
    : "border border-[#d3e6f4] bg-[linear-gradient(180deg,#ffffff,#f8fcff)] text-[var(--color-ink)] shadow-[0_28px_70px_rgba(80,113,138,0.14)]";
  const softCardClass = isDark
    ? "border border-white/8 bg-white/5 text-white shadow-[0_14px_36px_rgba(0,0,0,0.16)]"
    : "border border-[#dceaf5] bg-[linear-gradient(180deg,#f8fcff,#f2f8fd)] text-[var(--color-ink)] shadow-[0_14px_36px_rgba(110,144,168,0.08)]";
  const elevatedCardClass = isDark
    ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] text-white shadow-[0_20px_48px_rgba(0,0,0,0.22)]"
    : "border border-[#d7e7f2] bg-white text-[var(--color-ink)] shadow-[0_20px_48px_rgba(110,144,168,0.12)]";
  const subtleTextClass = isDark ? "text-white/72" : "text-[var(--color-ink)]/72";
  const extendedGalleryImages = [...galleryImages, ...galleryImages].slice(0, 8);

  return (
    <div
      className={
        isDark
          ? "bg-[linear-gradient(180deg,#09111d,#0f1b2c)] text-white"
          : "bg-[linear-gradient(180deg,#edf7fd,#f7fbff)] text-[var(--color-ink)]"
      }
    >
      <AzurePromiseHeader tier={template.tier} />

      <section className="mx-auto max-w-4xl px-3 pb-12 sm:px-6 lg:pb-20">
        <div className={`overflow-hidden rounded-[2rem] ${shellClass}`}>
          <div className="relative">
            <div
              className="h-[min(340px,52svh)] min-h-[220px] bg-cover bg-center sm:h-[460px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(19,38,61,0.10), rgba(19,38,61,0.46)), url(${images.coverImage || template.image})`,
              }}
            />
            <div className="relative -mt-20 px-4 pb-4 sm:px-7 sm:pb-0">
              <div className={`rounded-[1.8rem] p-5 backdrop-blur sm:p-7 ${elevatedCardClass}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#dff1ff] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#4d88a8]">
                    {copy.freeBadge}
                  </span>
                  <span className="rounded-full bg-[#fff3d4] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[#a9831d]">
                    {template.style}
                  </span>
                </div>

                <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#6f9bb6]">
                      {copy.heroTitle}
                    </p>
                    <h1 className="mt-4 break-words font-display text-4xl leading-[1.05] sm:text-5xl sm:leading-none lg:text-6xl">
                      {preview.groom} <span className="text-[#7aa6c2]">&</span> {preview.bride}
                    </h1>
                    <p className={`mt-4 max-w-xl text-sm leading-7 ${subtleTextClass}`}>
                      {copy.heroBody}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className={`rounded-[1.2rem] px-4 py-4 ${softCardClass}`}>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f9bb6]">
                        {copy.dateTitle}
                      </p>
                      <p className="mt-2 font-display text-2xl">{preview.dateLabel}</p>
                    </div>
                    <div className={`rounded-[1.2rem] px-4 py-4 ${softCardClass}`}>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f9bb6]">
                        {copy.venueTitle}
                      </p>
                      <p className={`mt-2 text-sm leading-7 ${subtleTextClass}`}>{preview.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onPreviewImage({
                          src: images.coverImage || template.image,
                          alt: `Cover ${template.name}`,
                        })
                      }
                      className="btn-primary rounded-full px-6 py-3 text-sm font-medium"
                    >
                      {copy.previewCta}
                    </button>
                    <Link
                      href="/#contact"
                      className="btn-secondary inline-flex rounded-full px-6 py-3 text-sm font-medium"
                    >
                      {copy.createCta}
                    </Link>
                  </div>

                  <AzurePromiseMusicPlayer
                    label="Wedding march"
                    accentClassName="bg-[#7aa6c2]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-5 grid grid-cols-2 gap-y-1 border-y px-1 py-1 sm:grid-cols-4 sm:px-2 sm:py-0 ${isDark ? "border-white/8" : "border-[#dce9f4]"}`}>
            {copy.tabs.map((item) => (
              <div
                key={item}
                className={`px-2 py-2.5 text-center text-[10px] font-medium uppercase leading-tight tracking-[0.18em] sm:px-4 sm:py-3 sm:text-xs sm:tracking-[0.24em] ${
                  isDark ? "border-white/10 text-white/68" : "text-[#5c7f96]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="space-y-5 p-4 sm:p-6">
            <ScrollRevealDiv revealAxis="left" className={scroll.block}>
            <div className={`rounded-[1.7rem] p-6 sm:p-7 ${elevatedCardClass}`}>
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.invitationTitle}</p>
                  <p className="mt-4 break-words font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
                    {preview.groom} & {preview.bride}
                  </p>
                </div>
                <p className={`text-sm leading-7 ${subtleTextClass}`}>{copy.invitationBody}</p>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.6rem] p-6 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.aboutTitle}</p>
                <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.aboutBody}</p>
              </div>
              <div className={`rounded-[1.6rem] p-6 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.countdownTitle}</p>
                <div className="mt-4">
                  <WeddingCountdown targetDate={preview.countdownTarget} variant="minimal" />
                </div>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="left" className={scroll.block}>
            <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
              <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.storyTitle}</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {copy.storyItems.map((item) => (
                  <div key={item.year} className={`rounded-[1.4rem] p-5 ${elevatedCardClass}`}>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f9bb6]">{item.year}</p>
                    <p className="mt-3 font-display text-3xl leading-tight">{item.title}</p>
                    <p className={`mt-3 text-sm leading-7 ${subtleTextClass}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={`rounded-[1.6rem] p-6 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.dateTitle}</p>
                <p className="mt-4 font-display text-3xl leading-tight">{preview.dateLabel}</p>
              </div>
              <div className={`rounded-[1.6rem] p-6 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.venueTitle}</p>
                <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{preview.venue}</p>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="left" className={scroll.block}>
            <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
              <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.eventTitle}</p>
              <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.eventLead}</p>
              <div className="mt-5 grid gap-4">
                {azurePromiseEvents.map((event) => (
                  <div
                    key={event.label}
                    className={`rounded-[1.4rem] px-5 py-5 ${elevatedCardClass}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <p className="break-words font-display text-2xl sm:text-3xl">{event.label}</p>
                        <p className={`mt-2 text-sm leading-7 ${subtleTextClass}`}>
                          {event.timeKey === "ceremonyTime" ? preview.ceremonyTime : preview.partyTime}
                          {" · "}
                          {event.place === "Riverside Garden" ? preview.venue : event.place}
                        </p>
                      </div>
                      <span className="w-fit shrink-0 rounded-full bg-[#dff1ff] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#4d88a8]">
                        {copy.previewCta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
              <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.mapTitle}</p>
                <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.mapBody}</p>
                <div
                  className={`mt-5 h-48 rounded-[1.4rem] border ${
                    isDark
                      ? "border-white/10 bg-[linear-gradient(180deg,rgba(122,166,194,0.16),rgba(255,255,255,0.04))]"
                      : "border-[#d6e7f2] bg-[linear-gradient(180deg,rgba(122,166,194,0.18),rgba(255,255,255,0.92))]"
                  }`}
                />
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary mt-5 inline-flex rounded-full px-5 py-3 text-sm font-medium"
                >
                  {copy.createCta}
                </a>
              </div>

              <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.albumTitle}</p>
                <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.albumBody}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {copy.galleryStats.map((item) => (
                    <div key={item.label} className={`rounded-[1.2rem] px-4 py-4 ${elevatedCardClass}`}>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#6f9bb6]">{item.label}</p>
                      <p className="mt-2 font-display text-3xl">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {extendedGalleryImages.map((image, index) => (
                  <ScrollRevealButton
                    key={`${image}-${index}`}
                    revealAxis={index % 2 === 0 ? "left" : "right"}
                    type="button"
                    onClick={() =>
                      onPreviewImage({
                        src: image,
                        alt: `Gallery ${index + 1} ${template.name}`,
                      })
                    }
                    className={`${
                      index === 0 ? "col-span-2 h-56 md:col-span-2" : index === 3 ? "col-span-2 h-48 md:col-span-1 md:h-40" : "h-40"
                    } overflow-hidden rounded-[1.3rem] bg-cover bg-center transition hover:scale-[1.01]`}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(15,23,42,0.16)), url(${image})`,
                    }}
                  />
                ))}
                </div>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="left" className={scroll.block}>
            <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
              <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.infoTitle}</p>
                <div className="mt-5 grid gap-3">
                  {copy.guestInfoItems.map((item) => (
                    <div key={item} className={`rounded-[1.3rem] px-4 py-4 ${elevatedCardClass}`}>
                      <p className={`text-sm leading-7 ${subtleTextClass}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-[1.7rem] p-6 sm:p-7 ${softCardClass}`}>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.giftTitle}</p>
                <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.giftBody}</p>
                <div className={`mt-5 rounded-[1.4rem] p-5 ${elevatedCardClass}`}>
                  <p className="font-display text-3xl">{preview.bankName}</p>
                  <p className={`mt-3 text-sm leading-7 ${subtleTextClass}`}>
                    {preview.accountName}
                    <br />
                    {preview.accountNumber}
                  </p>
                </div>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="right" className={scroll.block}>
            <div className={`rounded-[1.7rem] p-6 sm:p-7 ${elevatedCardClass}`}>
              <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#6f9bb6]">{copy.rsvpTitle}</p>
                  <p className={`mt-4 text-sm leading-7 ${subtleTextClass}`}>{copy.rsvpBody}</p>
                </div>
                <form className="grid gap-3">
                <input
                  className={`rounded-2xl px-4 py-3 outline-none ${isDark ? "bg-white/6 placeholder:text-white/34" : "border border-[#d7e8f3] bg-[#fafdff] placeholder:text-[var(--color-ink)]/34"}`}
                  placeholder={copy.fullName}
                />
                <input
                  className={`rounded-2xl px-4 py-3 outline-none ${isDark ? "bg-white/6 placeholder:text-white/34" : "border border-[#d7e8f3] bg-[#fafdff] placeholder:text-[var(--color-ink)]/34"}`}
                  placeholder={copy.contact}
                />
                <select className={`rounded-2xl px-4 py-3 outline-none ${isDark ? "bg-white/6" : "border border-[#d7e8f3] bg-[#fafdff]"}`}>
                  <option>{copy.attending}</option>
                  <option>{copy.decline}</option>
                </select>
                <textarea
                  className={`min-h-28 rounded-2xl px-4 py-3 outline-none ${isDark ? "bg-white/6 placeholder:text-white/34" : "border border-[#d7e8f3] bg-[#fafdff] placeholder:text-[var(--color-ink)]/34"}`}
                  placeholder={copy.message}
                />
                <button type="button" className="btn-primary rounded-full px-6 py-3 text-sm font-medium">
                  {copy.submit}
                </button>
                </form>
              </div>
            </div>
            </ScrollRevealDiv>

            <ScrollRevealDiv revealAxis="up" className={scroll.block}>
            <div className={`rounded-[1.7rem] p-6 text-center ${softCardClass}`}>
              <p className="break-words font-display text-2xl leading-tight sm:text-4xl">{copy.footerTitle}</p>
            </div>
            </ScrollRevealDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
