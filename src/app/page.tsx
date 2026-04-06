"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import HomeHeroSpotlight from "@/components/home-hero-spotlight";
import TemplateCarouselSection from "@/components/template-carousel-section";
import {
  freeTemplates,
  premiumTemplates,
  weddingTemplates,
} from "@/lib/templates";

/** Số dòng bảng so sánh hiển thị trước khi bấm "Xem thêm". */
const FEATURE_TABLE_PREVIEW_COUNT = 6;

type WhyUsIconId = "envelope" | "users" | "list" | "globe" | "pricing" | "heart";
/** Tông thiệp cưới: champagne / blush / sage / hồng — tránh violet-indigo “app công nghệ”. */
type WhyUsTone = "amber" | "rose" | "blush" | "champagne" | "sage" | "warmRose";

function whyUsIconGradient(tone: WhyUsTone, isDark: boolean): string {
  const d = isDark;
  switch (tone) {
    case "amber":
      return d ? "from-amber-200/45 to-rose-400/35" : "from-amber-200 to-rose-100";
    case "rose":
      return d ? "from-rose-500/85 to-pink-600/90" : "from-rose-400 to-pink-400";
    case "blush":
      return d ? "from-[#b8939a]/90 to-[#8f6b73]/90" : "from-[#e8d4d0] to-[#d1b1ab]";
    case "champagne":
      return d ? "from-[#c4a574]/40 to-[#9a737c]/45" : "from-[#e9ddd1] to-[#c5a7a1]";
    case "sage":
      return d ? "from-emerald-700/80 to-teal-800/85" : "from-[#7d8c79] to-[#5c6b58]";
    case "warmRose":
      return d ? "from-[#c97b7b]/90 to-[#8b4049]/90" : "from-[#c7a29f] to-[#9a737c]";
    default:
      return d ? "from-zinc-500 to-zinc-700" : "from-zinc-500 to-zinc-600";
  }
}

function whyUsTitleClass(tone: WhyUsTone, isDark: boolean): string {
  if (isDark) {
    switch (tone) {
      case "amber":
        return "text-amber-200";
      case "rose":
        return "text-rose-300";
      case "blush":
        return "text-[#e8cfc9]";
      case "champagne":
        return "text-[#e9ddd1]";
      case "sage":
        return "text-[#b8c9b0]";
      case "warmRose":
        return "text-[#f0c4c4]";
      default:
        return "text-white/88";
    }
  }
  switch (tone) {
    case "amber":
      return "text-amber-900";
    case "rose":
      return "text-rose-900";
    case "blush":
      return "text-[#6d4c52]";
    case "champagne":
      return "text-[#5c4a42]";
    case "sage":
      return "text-[#3d4a38]";
    case "warmRose":
      return "text-[#6d3d45]";
    default:
      return "text-[var(--color-ink)]";
  }
}

function WhyUsGlyph({ id }: { id: WhyUsIconId }) {
  const c = "h-5 w-5 text-white";
  switch (id) {
    case "envelope":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 5.5L20 7" />
        </svg>
      );
    case "users":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "list":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "globe":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
        </svg>
      );
    case "pricing":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "heart":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 4.21C5.43 4.21 3.78 5.88 3.78 8c0 2.85 3.72 5.23 5.22 7.47.26.4.72.4.98 0 1.5-2.24 5.22-4.62 5.22-7.47 0-2.12-1.65-3.79-3.72-3.79-1.12 0-2.14.52-2.78 1.34-.64-.82-1.66-1.34-2.78-1.34Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

/** Họa tiết chia nhỏ — gợi thiệp / trang trí tiệc. */
function WeddingFlourish({
  align = "center",
  className = "",
}: {
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center gap-3 ${align === "start" ? "justify-start" : "justify-center"} ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-10 max-w-[28vw] shrink bg-[color-mix(in_srgb,var(--color-rose)_42%,transparent)] sm:w-14" />
      <span className="font-display text-[0.95rem] leading-none text-[var(--color-rose)]/72">✦</span>
      <span className="h-px w-10 max-w-[28vw] shrink bg-[color-mix(in_srgb,var(--color-rose)_42%,transparent)] sm:w-14" />
    </div>
  );
}

export default function Home() {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            heroEyebrow: "Thiệp mời online, tinh tế và đúng gu",
            heroTitle:
              "Website cưới thanh lịch — từ những mẫu tinh giản đến bản thiết kế dành riêng hai bạn.",
            heroBody:
              "Mỗi bộ sưu tập được chọn lọc theo phong cách: tối giản, hoa lá, editorial, sang trọng tối hay tiệc xa. Hai bạn có thể bắt đầu với mẫu miễn phí; khi muốn thêm chiều sâu, hãy chọn bản cao cấp với trải nghiệm trọn vẹn hơn.",
            heroTagline:
              "Một link cho ngày trọng đại — gửi như thiệp, chỉnh theo gu hai bạn.",
            heroPrimaryCta: "Xem mẫu giao diện",
            heroSecondaryCta: "Nhận tư vấn ngay",
            statTemplates: "Mẫu có sẵn",
            statDelivery: "Bàn giao",
            statDeliveryValue: "1 vài phút",
            statMobile: "Mọi thiết bị",
            templatesEyebrow: "Mẫu giao diện",
            templatesTitle:
              "Dạo qua các phong cách, chọn điều gần gũi nhất — rồi tùy chỉnh cho ngày trọng đại của hai bạn.",
            freeEyebrow: "Mẫu miễn phí",
            freeTitle: "Mẫu miễn phí",
            freeDescription:
              "Thanh nhã, rõ ràng, sẵn sàng gửi đi: đủ phần giới thiệu, lịch cưới và xác nhận tham dự để mời khách mà không rối.",
            freeCta: "Xem tất cả mẫu miễn phí",
            freeSecondary: "Dùng mẫu này",
            templateCardDemo: "Xem demo",
            premiumEyebrow: "Mẫu trả phí",
            premiumTitle: "Mẫu trả phí",
            premiumDescription:
              "Dành cho cặp đôi muốn thêm chiều sâu: bố cục ấn tượng, thư viện ảnh phong phú và những chi tiết khiến trang mời cưới giống một lời mời thật sự.",
            premiumCta: "Xem tất cả mẫu trả phí",
            premiumSecondary: "Xem bảng giá",
            whyUsEyebrow: "Vì sao chọn chúng tôi",
            whyUsTitle: "Tại sao nên làm thiệp mời online & website cưới với Lumiere?",
            whyUsBody:
              "Đủ tính năng cho một lời mời hiện đại — gọn trên điện thoại, dễ gửi Zalo hay in QR, và thể hiện đúng phong cách của hai bạn.",
            whyUsImageAlt: "Ảnh minh hoạ nhẫn cưới và chi tiết trang trí thanh lịch",
            whyUsLeft: [
              {
                icon: "envelope",
                tone: "amber",
                title: "Thiệp mời online & website cưới",
                description:
                  "Chọn mẫu chỉn chu hoặc nâng cấp lên gói Premium — tiết kiệm thời gian in ấn, vẫn trang trọng và ấm áp với khách mời.",
              },
              {
                icon: "users",
                tone: "rose",
                title: "Xác nhận tham dự (RSVP)",
                description:
                  "Khách ghi nhận nhanh ngay trên trang; hai bạn hình dung số người tham dự thuận tiện hơn cho khâu lên kế hoạch tiệc.",
              },
              {
                icon: "list",
                tone: "blush",
                title: "Lịch lễ & địa điểm",
                description:
                  "Thời gian lễ, tiệc, bản đồ và gợi ý chỉ đường được trình bày rõ — mọi người mở một lần là nắm được toàn bộ hành trình trong ngày.",
              },
            ],
            whyUsRight: [
              {
                icon: "globe",
                tone: "champagne",
                title: "Trang thông tin cưới trọn vẹn",
                description:
                  "Giới thiệu hai bạn, câu chuyện, album ảnh và các sự kiện — một nơi lưu kỷ niệm và chia sẻ với bạn bè, người thân.",
              },
              {
                icon: "pricing",
                tone: "sage",
                title: "Gói dịch vụ rõ ràng",
                description:
                  "Miễn phí để bắt đầu; một gói Premium gộp đủ tính năng trả phí — ngân sách rõ ràng, không lắt léo.",
              },
              {
                icon: "heart",
                tone: "warmRose",
                title: "Sổ lưu lời chúc",
                description:
                  "Ở gói Premium, khách để lại lời chúc trên trang — những dòng kỷ niệm hai bạn có thể mở lại sau nhiều năm.",
              },
            ],
            featuresEyebrow: "Trải nghiệm",
            featuresTitle: "Bảng so sánh tính năng đầy đủ — Miễn phí & Premium",
            featuresBody:
              "Lựa chọn gói phù hợp nhu cầu và ngân sách: dưới đây là danh sách chi tiết từng hạng mục cho thiệp mời online và website cưới, tương tự cách bạn đối chiếu trên các nền tảng chuyên dụng — Lumiere gói gọn trong hai mức Miễn phí và Premium.",
            featuresExpand: "Xem thêm toàn bộ bảng so sánh",
            featuresCollapse: "Thu gọn bảng",
            featureTableHeaders: ["Tính năng", "Miễn phí", "Premium"],
            featureRows: [
              {
                label: "Thời hạn website được công khai",
                free: "6 tháng",
                premium: "24 tháng",
              },
              {
                label: "Giới hạn số lượng hình ảnh album cưới",
                free: "Tới ~15 ảnh",
                premium: "Tới ~120 ảnh",
              },
              {
                label: "Tính năng cốt lõi (giới thiệu, lịch, địa điểm, album, RSVP)",
                free: "Có — trong khung mẫu miễn phí",
                premium: "Có — mở rộng, nhiều khối & bố cục nâng cao",
              },
              {
                label: "Loại bỏ quảng cáo / nội dung chen giữa trải nghiệm khách",
                free: "—",
                premium: "Có",
              },
              {
                label: "Đếm lượt truy cập / thống kê xem trang",
                free: "—",
                premium: "Có",
              },
              {
                label: "Album ảnh dạng photobook / trình chiếu online",
                free: "Dạng lưới cơ bản",
                premium: "Bố cục phong phú, nhiều mẫu trình bày",
              },
              {
                label: "Hộp lời chúc & phản hồi lời chúc từ bạn bè",
                free: "—",
                premium: "Có",
              },
              {
                label: "Khối mừng cưới tới cô dâu chú rể (QR chuyển khoản ngân hàng)",
                free: "—",
                premium: "Có",
              },
              {
                label: "Hiển thị thông tin song thân (bố mẹ hai bên)",
                free: "Theo ô cố định trên mẫu",
                premium: "Có — tuỳ bố cục mẫu Premium",
              },
              {
                label: "Tải lên nhạc nền cá nhân",
                free: "—",
                premium: "Có (theo mẫu hỗ trợ)",
              },
              {
                label: "Thay đổi giao diện đã chọn sau khi tạo",
                free: "Hạn chế / trong phạm vi kho miễn phí",
                premium: "Nhiều lần theo gói & kho mẫu trả phí",
              },
              {
                label: "Loại bỏ logo và thông tin Lumiere trên website",
                free: "—",
                premium: "Có (theo gói)",
              },
              {
                label: "Tuỳ chỉnh mã nguồn (custom HTML / CSS)",
                free: "—",
                premium: "Tuỳ chọn — liên hệ phạm vi",
              },
              {
                label: "Tính năng quản lý danh sách khách mời",
                free: "—",
                premium: "Có (theo lộ trình sản phẩm)",
              },
              {
                label: "Tuỳ chỉnh mã QR (nội dung, màu sắc)",
                free: "—",
                premium: "Có",
              },
              {
                label: "Thiết lập thông báo / nhắc cho người xem website",
                free: "—",
                premium: "Tuỳ chọn — liên hệ",
              },
              {
                label: "Sử dụng mẫu Save the Date",
                free: "—",
                premium: "Có trên mẫu hỗ trợ",
              },
              {
                label: "Tạo và gửi thiệp / link mời riêng cho từng khách",
                free: "—",
                premium: "Tuỳ chọn — liên hệ triển khai",
              },
              {
                label: "Tải xuống danh sách lời chúc (xuất file)",
                free: "—",
                premium: "Có",
              },
              {
                label: "Sử dụng giao diện cao cấp (mẫu Premium / editorial)",
                free: "—",
                premium: "Có",
              },
              {
                label: "Tuỳ chỉnh hiệu ứng (tim bay, hạt, v.v.)",
                free: "—",
                premium: "Có trên mẫu hỗ trợ",
              },
              {
                label: "Tuỳ chọn kiểu hiển thị logo / favicon cho website",
                free: "—",
                premium: "Có (theo mẫu)",
              },
              {
                label: "Cho phép tích hợp tên miền riêng (custom domain)",
                free: "—",
                premium: "Tuỳ chọn — liên hệ triển khai",
              },
              {
                label: "Xác nhận tham dự (RSVP) — độ sâu tuỳ chỉnh",
                free: "Ghi nhận nhanh, biểu mẫu đơn giản",
                premium: "Tuỳ chỉnh câu hỏi & luồng đăng ký",
              },
              {
                label: "Bản đồ & chỉ đường (tiệc, nhà thờ, tiệc cưới…)",
                free: "Có — Google Maps",
                premium: "Có — thêm chỉ đường nhà cô dâu / chú rể",
              },
              {
                label: "Song ngữ Việt / Anh",
                free: "—",
                premium: "Có",
              },
              {
                label: "Tuỳ chỉnh màu sắc & bố cục theo brand tiệc",
                free: "Theo khung mẫu miễn phí",
                premium: "Tuỳ chỉnh sâu",
              },
              {
                label: "Vòng chỉnh sửa nội dung & hỗ trợ vận hành",
                free: "Tự phục vụ theo hướng dẫn",
                premium: "Tới 3 vòng + hỗ trợ ưu tiên",
              },
            ],
            processEyebrow: "Quy trình",
            processTitle: "Bốn bước gọn, rõ ràng",
            processBody:
              "Chúng tôi giữ quy trình ngắn gọn: chọn mẫu, bổ sung thông tin, chỉnh theo ý bạn và bàn giao link để chia sẻ.",
            process: [
              {
                step: "01",
                title: "Chọn mẫu giao diện",
                description:
                  "Hai bạn chọn mẫu có sẵn hoặc gửi hình ảnh tham khảo — chúng tôi gợi ý phong cách phù hợp.",
              },
              {
                step: "02",
                title: "Gửi nội dung và hình ảnh",
                description:
                  "Tên, lịch cưới, địa điểm, album ảnh, tông màu và mọi chi tiết muốn hiển thị cho khách mời.",
              },
              {
                step: "03",
                title: "Hoàn thiện và tinh chỉnh",
                description:
                  "Bản xem thử được dựng nhanh; sau đó chỉnh sửa theo ý hai bạn cho đến khi mọi thứ vừa ý.",
              },
              {
                step: "04",
                title: "Bàn giao và chia sẻ",
                description:
                  "Nhận link website để gửi qua Zalo, Messenger, Instagram hoặc in kèm mã QR trên thiệp giấy.",
              },
            ],
            valueEyebrow: "Điểm nhấn",
            valueTitle:
              "Một nền tảng được nghĩ cho ngày cưới — không chỉ là một trang web.",
            valuePoints: [
              "Nhiều phong cách để hai bạn tìm được bản thể hiện đúng mình",
              "Tối ưu trên điện thoại — gửi Zalo, Messenger hay in QR đều thuận tiện",
              "Bắt đầu với gói miễn phí; nâng lên Premium khi cần đủ tính năng trả phí",
              "Chuyển ngôn ngữ và giao diện sáng / tối theo sở thích",
            ],
            positioningEyebrow: "Triết lý",
            positioningQuote:
              "Thiệp mời hiện đại không chỉ là thông báo — đó là lời mời đầu tiên về phong cách và sự trân trọng của hai bạn.",
            positioningBody:
              "Chúng tôi tin trải nghiệm mời cưới nên chừng mực, ấm áp và trung thực với câu chuyện của hai bạn.",
            pricingEyebrow: "Bảng giá",
            pricingTitle: "Bảng giá thiệp mời online & website cưới Lumiere",
            pricingBody:
              "Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách để có một thiệp mời online và website cưới rõ ràng, dễ gửi và đúng phong cách hai bạn. Gói Miễn phí để bắt đầu; gói Premium gộp toàn bộ tính năng trả phí — chi tiết từng hạng mục nằm ở bảng so sánh phía trên.",
            pricingCompareCta: "Cuộn lên xem bảng so sánh Miễn phí & Premium",
            pricingPopularBadge: "Phổ biến",
            pricing: [
              {
                name: "Miễn phí",
                tagline: "Bắt đầu không tốn phí — đủ để mời khách xem thông tin cốt lõi",
                price: "0đ",
                note:
                  "Dùng mẫu trong kho miễn phí: giới thiệu, lịch, bản đồ, album nhỏ và RSVP đơn giản — phù hợp thử nghiệm hoặc tiệc gọn.",
                featured: false,
              },
              {
                name: "Premium",
                tagline: "Trải nghiệm nâng cao — gộp mọi tính năng trả phí",
                price: "2.490.000đ",
                note:
                  "Gồm toàn bộ hạng mục đánh dấu Có / nâng cao ở cột Premium trong bảng so sánh: thời hạn dài, album lớn, không quảng cáo chen ngang, thống kê truy cập, photobook đẹp hơn, sổ chúc & phản hồi, QR mừng cưới, song thân, nhạc nền, đổi giao diện linh hoạt, gỡ branding, QR tuỳ chỉnh, Save the Date, mẫu cao cấp, hiệu ứng, favicon/logo, tên miền (tuỳ chọn), RSVP sâu, chỉ đường nhà, song ngữ, tuỳ chỉnh sâu & hỗ trợ ưu tiên.",
                featured: true,
              },
            ],
            testimonialsEyebrow: "Phản hồi",
            testimonialsTitle: "Khách hàng chia sẻ",
            testimonialsBody:
              "Vài dòng cảm ơn sau khi hai bạn nhận bàn giao website mời cưới. Dùng nút hai bên hoặc vuốt ngang khi có nhiều phản hồi.",
            feedbackScrollPrev: "Xem phản hồi trước",
            feedbackScrollNext: "Xem phản hồi sau",
            testimonials: [
              {
                quote:
                  "Khách mở một link là thấy đủ giờ lễ, tiệc và RSVP — bố mẹ hai bên đều khen gọn và trang trọng.",
                name: "Minh & Lan",
                detail: "Gói Premium · Hà Nội",
              },
              {
                quote:
                  "Chúng tôi thích mẫu tối giản, chỉnh màu theo tone tiệc xong là gửi Zalo cho bạn bè rất nhanh.",
                name: "Hùng & Thu",
                detail: "Mẫu Minimal Muse · TP.HCM",
              },
              {
                quote:
                  "Bạn thân bảo trang mời cưới nhìn như tạp chí — đúng gu editorial chúng tôi mong muốn từ đầu.",
                name: "An & Chi",
                detail: "Neela Classic · Đà Nẵng",
              },
            ],
            contactEyebrow: "Liên hệ",
            contactTitle: "Chúng tôi lắng nghe",
            contactBody:
              "Để lại thông tin — đội ngũ sẽ liên hệ tư vấn mẫu phù hợp và thời gian triển khai.",
            contactName: "Họ và tên",
            contactPhone: "Số điện thoại hoặc Zalo",
            contactOption1: "Tôi muốn xem các mẫu có sẵn",
            contactOption2: "Tôi muốn đặt website theo mẫu",
            contactOption3: "Tôi muốn tư vấn thêm (gói, tên miền, v.v.)",
            contactMessage:
              "Chia sẻ ngắn gọn phong cách mong muốn, ngày cưới hoặc thời điểm cần bàn giao",
            contactSubmit: "Gửi yêu cầu tư vấn",
          }
        : {
            heroEyebrow: "Refined online wedding invitations",
            heroTitle:
              "Elegant wedding websites—from understated layouts to a design that feels unmistakably yours.",
            heroBody:
              "Each collection is curated around a mood: minimal, floral, editorial, dark luxury, or destination. Start with a complimentary template, then move to a premium experience when you want more depth and polish.",
            heroTagline:
              "One link for your day—shared like a proper invitation, tailored to both of you.",
            heroPrimaryCta: "Browse templates",
            heroSecondaryCta: "Get consultation",
            statTemplates: "Ready-made designs",
            statDelivery: "Handoff",
            statDeliveryValue: "Instant",
            statMobile: "Every device",
            templatesEyebrow: "Templates",
            templatesTitle:
              "Explore the moods, choose what feels closest to you, then tailor it for your celebration.",
            freeEyebrow: "Free templates",
            freeTitle: "Free templates",
            freeDescription:
              "Light, clear, and ready to send: introductions, schedule, and RSVP so guests know what to expect—without clutter.",
            freeCta: "View all free templates",
            freeSecondary: "Use this template",
            templateCardDemo: "View demo",
            premiumEyebrow: "Premium templates",
            premiumTitle: "Premium templates",
            premiumDescription:
              "For couples who want more presence: striking layouts, a richer gallery, and details that make your page feel like a true invitation.",
            premiumCta: "View all premium templates",
            premiumSecondary: "See pricing",
            whyUsEyebrow: "Why Lumiere",
            whyUsTitle: "Why build your online invitation and wedding website with Lumiere?",
            whyUsBody:
              "Everything you need for a modern invitation—mobile-friendly, easy to share on chat or with a QR code, and true to your style.",
            whyUsImageAlt: "Wedding rings and elegant celebration details—illustrative photo",
            whyUsLeft: [
              {
                icon: "envelope",
                tone: "amber",
                title: "Online invitation & wedding site",
                description:
                  "Start from polished templates or go premium—save printing time while keeping the moment respectful and warm for every guest.",
              },
              {
                icon: "users",
                tone: "rose",
                title: "RSVP on the page",
                description:
                  "Guests respond in a few taps so you can estimate attendance more calmly when planning seating and catering.",
              },
              {
                icon: "list",
                tone: "blush",
                title: "Schedule & venues",
                description:
                  "Ceremony, reception, maps, and directions in one place—family and friends understand the full day at a single glance.",
              },
            ],
            whyUsRight: [
              {
                icon: "globe",
                tone: "champagne",
                title: "A complete wedding story page",
                description:
                  "Introductions, your story, gallery, and events—a single link to remember and share with people you love.",
              },
              {
                icon: "pricing",
                tone: "sage",
                title: "Transparent packages",
                description:
                  "Start free; one Premium tier bundles every paid feature—clear budgeting without surprise add-ons.",
              },
              {
                icon: "heart",
                tone: "warmRose",
                title: "Guest book of wishes",
                description:
                  "On premium, guests can leave wishes on your page—lines you can reopen years later.",
              },
            ],
            featuresEyebrow: "Experience",
            featuresTitle: "Full feature comparison — Free & Premium",
            featuresBody:
              "Pick the plan that fits your needs and budget. Below is a line-by-line checklist for your online invitation and wedding site—similar to dedicated invitation platforms—summarized in two tiers: Free and Premium.",
            featuresExpand: "Show full comparison table",
            featuresCollapse: "Collapse table",
            featureTableHeaders: ["Feature", "Free", "Premium"],
            featureRows: [
              {
                label: "Public website duration",
                free: "6 months",
                premium: "24 months",
              },
              {
                label: "Wedding gallery photo limit",
                free: "Up to ~15 photos",
                premium: "Up to ~120 photos",
              },
              {
                label: "Core features (intro, schedule, venues, gallery, RSVP)",
                free: "Yes — within free templates",
                premium: "Yes — expanded blocks & advanced layouts",
              },
              {
                label: "No third-party ads cluttering the guest experience",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Visit analytics / traffic insights",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Photobook-style gallery / slideshow presentation",
                free: "Basic grid",
                premium: "Rich layouts & presentation options",
              },
              {
                label: "Guest wish box & reply to wishes",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Gift-to-couple block (bank transfer QR)",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Parents-of-the-couple information",
                free: "Fixed slots on template",
                premium: "Yes — layout varies by premium template",
              },
              {
                label: "Custom background music upload",
                free: "—",
                premium: "Yes (supported templates)",
              },
              {
                label: "Change the selected theme after launch",
                free: "Limited / within free library",
                premium: "Multiple changes per package & paid library",
              },
              {
                label: "Remove Lumiere logo and footer credit",
                free: "—",
                premium: "Yes (per package)",
              },
              {
                label: "Custom code (HTML / CSS)",
                free: "—",
                premium: "Optional — contact us for scope",
              },
              {
                label: "Guest list management",
                free: "—",
                premium: "Yes (per product roadmap)",
              },
              {
                label: "Custom QR styling (content & colors)",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Notifications / reminders for site visitors",
                free: "—",
                premium: "Optional — contact us",
              },
              {
                label: "Save the Date templates",
                free: "—",
                premium: "Yes on supported templates",
              },
              {
                label: "Per-guest invitation links or cards",
                free: "—",
                premium: "Optional — contact us to enable",
              },
              {
                label: "Download wish list as a file",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Premium / editorial template access",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Motion effects (hearts, particles, etc.)",
                free: "—",
                premium: "Yes on supported templates",
              },
              {
                label: "Logo / favicon display options",
                free: "—",
                premium: "Yes (template-dependent)",
              },
              {
                label: "Custom domain integration",
                free: "—",
                premium: "Optional — contact us to enable",
              },
              {
                label: "RSVP depth & customization",
                free: "Quick, simple form",
                premium: "Custom questions & registration flow",
              },
              {
                label: "Maps & directions (venues, ceremony, reception)",
                free: "Yes — Google Maps",
                premium: "Yes — plus family-home directions",
              },
              {
                label: "Vietnamese / English bilingual pages",
                free: "—",
                premium: "Yes",
              },
              {
                label: "Color & layout tuning to match your celebration",
                free: "Within free template frame",
                premium: "Deep customization",
              },
              {
                label: "Content revision rounds & operational support",
                free: "Self-serve guidance",
                premium: "Up to 3 rounds + priority support",
              },
            ],
            processEyebrow: "Process",
            processTitle: "Four calm, transparent steps",
            processBody:
              "We keep it short: choose a template, share your details, refine together, then receive a link you can share anywhere.",
            process: [
              {
                step: "01",
                title: "Choose a template",
                description:
                  "Pick a design from the gallery or send reference images—we suggest a mood that fits your day.",
              },
              {
                step: "02",
                title: "Share content and photos",
                description:
                  "Names, schedule, venues, gallery, palette, and every line you want guests to read.",
              },
              {
                step: "03",
                title: "Refine together",
                description:
                  "We build a preview quickly, then adjust with you until every detail feels right.",
              },
              {
                step: "04",
                title: "Handoff and share",
                description:
                  "Receive your link for Zalo, Messenger, Instagram, or a printed QR on paper invitations.",
              },
            ],
            valueEyebrow: "Highlights",
            valueTitle:
              "Built around the wedding day—not just another generic site.",
            valuePoints: [
              "Many moods so you can find a look that feels like you",
              "Optimized for phones—easy to share on chat apps or with a QR code",
              "Start on the free tier; upgrade to Premium for every paid feature",
              "Language and light / dark styling to match your taste",
            ],
            positioningEyebrow: "Our belief",
            positioningQuote:
              "A modern invitation is more than information—it is the first impression of your taste and care.",
            positioningBody:
              "We believe the experience should feel restrained, warm, and true to your story.",
            pricingEyebrow: "Pricing",
            pricingTitle: "Lumiere online invitation & wedding website pricing",
            pricingBody:
              "Choose a plan that matches your needs and budget for a clear, shareable invitation experience. Start on Free; Premium bundles every paid feature in one upgrade. For a line-by-line breakdown, use the comparison table in the section above.",
            pricingCompareCta: "Scroll up to the Free & Premium comparison",
            pricingPopularBadge: "Popular",
            pricing: [
              {
                name: "Free",
                tagline: "No cost to start—enough for a clear, shareable invite",
                price: "0đ",
                note:
                  "Use free templates with introductions, schedule, maps, a small gallery, and simple RSVP—ideal to try the flow or for a minimal celebration.",
                featured: false,
              },
              {
                name: "Premium",
                tagline: "Advanced experience—all paid features in one tier",
                price: "2.490.000đ",
                note:
                  "Every row marked Yes or advanced in the Premium column: longer hosting, large gallery, clean guest experience without third-party ads, analytics, richer photobook, wishes + replies, gift QR, parents section, custom music, flexible theme changes, remove Lumiere branding, custom QR, Save the Date, premium templates, motion effects, logo/favicon options, optional domain & custom code, deeper RSVP, family-home maps, bilingual support, deep layout tuning, and priority support.",
                featured: true,
              },
            ],
            testimonialsEyebrow: "Feedback",
            testimonialsTitle: "What couples say",
            testimonialsBody:
              "Short notes from couples after their invitation websites went live. Use the side arrows or swipe when there are more stories.",
            feedbackScrollPrev: "Previous testimonial",
            feedbackScrollNext: "Next testimonial",
            testimonials: [
              {
                quote:
                  "One link showed the schedule, venues, and RSVP—our parents on both sides called it clear and elegant.",
                name: "Minh & Lan",
                detail: "Premium package · Hanoi",
              },
              {
                quote:
                  "We wanted something minimal, matched the palette to our reception, and shared it on chat in minutes.",
                name: "Hùng & Thu",
                detail: "Minimal Muse · Ho Chi Minh City",
              },
              {
                quote:
                  "Friends told us it felt like a magazine—exactly the editorial mood we had in mind from day one.",
                name: "An & Chi",
                detail: "Neela Classic · Da Nang",
              },
            ],
            contactEyebrow: "Contact",
            contactTitle: "We would love to hear from you",
            contactBody:
              "Leave your details—we will follow up with template suggestions and a realistic timeline.",
            contactName: "Full name",
            contactPhone: "Phone or Zalo",
            contactOption1: "I want to browse ready-made templates",
            contactOption2: "I want a website based on a template",
            contactOption3: "I want more guidance (plans, domain, etc.)",
            contactMessage:
              "Share your preferred style, wedding date, or when you need the site ready",
            contactSubmit: "Send my request",
          },
    [language],
  );

  const [featuresTableExpanded, setFeaturesTableExpanded] = useState(false);

  const featureRowsForTable = useMemo(() => {
    const all = copy.featureRows;
    if (featuresTableExpanded || all.length <= FEATURE_TABLE_PREVIEW_COUNT) {
      return all;
    }
    return all.slice(0, FEATURE_TABLE_PREVIEW_COUNT);
  }, [copy.featureRows, featuresTableExpanded]);

  const featureTableHasMore = copy.featureRows.length > FEATURE_TABLE_PREVIEW_COUNT;

  const featuresExpandButtonRef = useRef<HTMLButtonElement>(null);
  const featuresExpandAnchorTopRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const anchorTop = featuresExpandAnchorTopRef.current;
    if (anchorTop === null) return;
    const btn = featuresExpandButtonRef.current;
    featuresExpandAnchorTopRef.current = null;
    if (!btn) return;
    const delta = btn.getBoundingClientRect().top - anchorTop;
    if (delta !== 0) {
      window.scrollBy({ top: delta, left: 0, behavior: "auto" });
    }
  }, [featuresTableExpanded]);

  const feedbackStripRef = useRef<HTMLDivElement>(null);

  const scrollFeedbackStrip = (direction: "left" | "right") => {
    const el = feedbackStripRef.current;
    if (!el) return;
    const step = Math.min(360, Math.max(280, el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const feedbackNavBtnClass = `flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border backdrop-blur transition hover:scale-105 sm:h-12 sm:w-12 ${
    isDark
      ? "border-white/12 bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-white/18"
      : "border-[var(--color-ink)]/12 bg-white/95 text-[var(--color-ink)] shadow-[0_8px_24px_rgba(49,42,40,0.1)] hover:bg-white"
  }`;

  return (
    <main className="home-wedding-main-backdrop text-[var(--color-ink)] transition-colors">
      <section className="relative isolate overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(ellipse_75%_48%_at_50%_-10%,rgba(209,177,171,0.18),transparent_46%),linear-gradient(145deg,rgba(10,9,9,0.98),rgba(14,12,13,0.96))]"
              : "bg-[radial-gradient(ellipse_82%_50%_at_50%_-14%,rgba(197,167,161,0.45),transparent_48%),radial-gradient(circle_at_92%_18%,rgba(233,221,209,0.85),transparent_52%),linear-gradient(168deg,rgba(255,253,251,0.96),rgba(247,242,236,0.99))]"
          }`}
        />
        <div
          className={`animate-float-soft absolute -top-28 right-[-120px] h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-[rgba(209,177,171,0.1)]" : "bg-[color-mix(in_srgb,var(--color-rose)_24%,white)]"
          }`}
        />
        <div
          className={`animate-drift-soft absolute bottom-0 left-[-80px] h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-[rgba(155,168,150,0.1)]" : "bg-[color-mix(in_srgb,var(--color-sage)_18%,white)]"
          }`}
        />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
          <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div className="max-w-2xl">
              <p className="animate-fade-up-soft mb-3 text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
                {copy.heroEyebrow}
              </p>
              <WeddingFlourish align="start" className="animate-fade-up-soft mb-5" />
              <h1 className="animate-fade-up-soft-delay-1 font-display text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
                {copy.heroTitle}
              </h1>
              <p className={`animate-fade-up-soft-delay-2 mt-6 max-w-xl text-base leading-8 sm:text-lg ${isDark ? "text-white/74" : "text-[var(--color-ink)]/75"}`}>
                {copy.heroBody}
              </p>
              <p
                className={`animate-fade-up-soft-delay-2 mt-5 max-w-xl font-display text-lg italic leading-relaxed sm:text-xl ${isDark ? "text-[var(--color-rose)]/80" : "text-[color-mix(in_srgb,var(--color-rose)_88%,var(--color-ink)_12%)]"}`}
              >
                {copy.heroTagline}
              </p>

              <div className="animate-fade-up-soft-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#templates"
                  className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {copy.heroPrimaryCta}
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {copy.heroSecondaryCta}
                </a>
              </div>

              <div className="animate-fade-up-soft-delay-3 mt-12 grid max-w-lg grid-cols-3 gap-4">
                <div
                  className={`rounded-3xl p-4 ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                      : "border border-white/70 bg-white/65 shadow-[0_18px_50px_rgba(49,42,40,0.08)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    {copy.statTemplates}
                  </p>
                  <p className="mt-3 font-display text-3xl">
                    {weddingTemplates.length}+
                  </p>
                </div>
                <div
                  className={`rounded-3xl p-4 ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                      : "border border-white/70 bg-white/65 shadow-[0_18px_50px_rgba(49,42,40,0.08)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    {copy.statDelivery}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{copy.statDeliveryValue}</p>
                </div>
                <div
                  className={`rounded-3xl p-4 ring-1 ring-[color-mix(in_srgb,var(--color-rose)_20%,transparent)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                      : "border border-white/70 bg-white/65 shadow-[0_18px_50px_rgba(49,42,40,0.08)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    {copy.statMobile}
                  </p>
                  <p className="mt-3 font-display text-3xl">100%</p>
                </div>
              </div>
            </div>

            <HomeHeroSpotlight />
          </div>
        </div>
      </section>

      <section
        id="templates"
        className="mx-auto w-full max-w-7xl border-t border-[color-mix(in_srgb,var(--color-rose)_14%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-rose)_6%,transparent),transparent)] px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="max-w-3xl">
          <WeddingFlourish align="start" className="mb-4" />
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.templatesEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {copy.templatesTitle}
          </h2>
        </div>

        <TemplateCarouselSection
          eyebrow={copy.freeEyebrow}
          title={copy.freeTitle}
          description={copy.freeDescription}
          eyebrowColorClassName="text-[var(--color-sage)]"
          ctaHref="/templates/free"
          ctaLabel={copy.freeCta}
          templates={freeTemplates}
          badgeClassName="rounded-full bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-medium text-[var(--color-sage)]"
          secondaryActionHref="#contact"
          secondaryActionLabel={copy.freeSecondary}
          secondaryActionClassName="btn-ghost inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
          demoLinkLabel={copy.templateCardDemo}
        />

        <TemplateCarouselSection
          eyebrow={copy.premiumEyebrow}
          title={copy.premiumTitle}
          description={copy.premiumDescription}
          eyebrowColorClassName="text-[var(--color-rose)]"
          ctaHref="/templates/premium"
          ctaLabel={copy.premiumCta}
          templates={premiumTemplates}
          badgeClassName="rounded-full bg-[var(--color-rose)]/12 px-3 py-1 text-xs font-medium text-[var(--color-rose)]"
          secondaryActionHref="#pricing"
          secondaryActionLabel={copy.premiumSecondary}
          secondaryActionClassName="btn-secondary inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
          demoLinkLabel={copy.templateCardDemo}
        />
      </section>

      <section
        id="why-us"
        className="animate-fade-scale-soft mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">{copy.whyUsEyebrow}</p>
          <h2 className="mt-4 font-display text-3xl leading-[1.15] sm:text-4xl lg:text-[2.65rem]">
            {copy.whyUsTitle}
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 sm:text-lg ${isDark ? "text-white/68" : "text-[var(--color-ink)]/68"}`}>
            {copy.whyUsBody}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1fr_minmax(220px,340px)_1fr] lg:items-center lg:gap-8 xl:gap-12">
          <div className="order-2 flex flex-col gap-10 lg:order-1 lg:gap-12">
            {copy.whyUsLeft.map((item) => (
              <div key={item.title} className="flex flex-row-reverse items-start gap-4 sm:gap-5 lg:ml-auto lg:max-w-md">
                <div
                  className={`shrink-0 rounded-xl bg-gradient-to-br p-3.5 shadow-lg ${whyUsIconGradient(item.tone as WhyUsTone, isDark)}`}
                >
                  <WhyUsGlyph id={item.icon as WhyUsIconId} />
                </div>
                <div className="min-w-0 flex-1 text-right">
                  <h3 className={`text-base font-semibold tracking-tight sm:text-lg ${whyUsTitleClass(item.tone as WhyUsTone, isDark)}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-7 ${isDark ? "text-white/60" : "text-[var(--color-ink)]/64"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 flex justify-center px-2 lg:order-2 lg:px-0">
            <div className="relative w-full max-w-[min(100%,420px)] sm:max-w-[440px] lg:max-w-[380px]">
              {/* Unsplash — photo-1519741497674-611481863552 (Unsplash License) */}
              <Image
                src="/marketing/wedding-animation.jpg"
                alt={copy.whyUsImageAlt}
                width={1200}
                height={1000}
                className="h-auto w-full select-none rounded-2xl object-cover object-center shadow-[0_20px_50px_rgba(49,42,40,0.12)] ring-1 ring-black/5 dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] dark:ring-white/10"
                sizes="(max-width: 1024px) min(100vw, 420px), 380px"
                priority={false}
              />
            </div>
          </div>

          <div className="order-3 flex flex-col gap-10 lg:gap-12">
            {copy.whyUsRight.map((item) => (
              <div key={item.title} className="flex items-start gap-4 sm:gap-5 lg:max-w-md">
                <div
                  className={`shrink-0 rounded-xl bg-gradient-to-br p-3.5 shadow-lg ${whyUsIconGradient(item.tone as WhyUsTone, isDark)}`}
                >
                  <WhyUsGlyph id={item.icon as WhyUsIconId} />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className={`text-base font-semibold tracking-tight sm:text-lg ${whyUsTitleClass(item.tone as WhyUsTone, isDark)}`}>
                    {item.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-7 ${isDark ? "text-white/60" : "text-[var(--color-ink)]/64"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="animate-fade-scale-soft-delay-1 mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16"
      >
        <div
          className={`hover-lift-strong rounded-[2.5rem] px-6 py-14 sm:px-10 lg:px-14 ${
            isDark
              ? "border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(209,177,171,0.1),_transparent_28%),linear-gradient(180deg,#111113,#18181b)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
              : "border border-[var(--color-ink)]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(233,221,209,0.82))] text-[var(--color-ink)] shadow-[0_24px_70px_rgba(49,42,40,0.08)]"
          }`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className={`text-sm uppercase tracking-[0.35em] ${isDark ? "text-[var(--color-rose)]/82" : "text-[var(--color-rose)]/82"}`}>
                {copy.featuresEyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {copy.featuresTitle}
              </h2>
            </div>
            <p className={`max-w-md text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/70"}`}>
              {copy.featuresBody}
            </p>
          </div>

          <div
            className={`mt-10 overflow-x-auto rounded-[2rem] backdrop-blur transition-transform duration-500 hover:scale-[1.01] ${
              isDark
                ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_14px_36px_rgba(0,0,0,0.22)]"
                : "border border-[var(--color-ink)]/8 bg-white/58 shadow-[0_14px_36px_rgba(49,42,40,0.06)]"
            }`}
          >
            <div id="features-comparison-table" className="min-w-[920px]">
              <div className={`grid grid-cols-[1.5fr_0.8fr_1fr] border-b ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                {copy.featureTableHeaders.map((header, index) => (
                  <div
                    key={header}
                    className={`px-5 py-4 text-sm font-medium uppercase tracking-[0.24em] ${
                      index === 1
                        ? "text-[var(--color-sage)]"
                        : index === 2
                          ? "text-[var(--color-rose)]"
                          : isDark
                            ? "text-white/62"
                            : "text-[var(--color-ink)]/62"
                    }`}
                  >
                    {header}
                  </div>
                ))}
              </div>
              {featureRowsForTable.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.5fr_0.8fr_1fr] ${
                    index < featureRowsForTable.length - 1
                      ? isDark
                        ? "border-b border-white/8"
                        : "border-b border-[var(--color-ink)]/10"
                      : ""
                  }`}
                >
                  <div className="px-5 py-4">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-rose)]/76">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`mt-3 text-sm leading-7 ${isDark ? "text-white/88" : "text-[var(--color-ink)]/88"}`}>
                      {row.label}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      isDark
                        ? "bg-[rgba(155,168,150,0.14)] text-[var(--color-sage)]"
                        : "bg-[rgba(125,140,121,0.18)] text-[var(--color-sage)]"
                    }`}>
                      {row.free}
                    </span>
                  </div>
                  <div className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      isDark
                        ? "bg-[rgba(209,177,171,0.14)] text-[var(--color-rose)]"
                        : "bg-[rgba(197,167,161,0.2)] text-[var(--color-rose)]"
                    }`}>
                      {row.premium}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {featureTableHasMore ? (
              <div className={`flex justify-center border-t px-4 py-4 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                <button
                  ref={featuresExpandButtonRef}
                  type="button"
                  aria-expanded={featuresTableExpanded}
                  aria-controls="features-comparison-table"
                  onClick={() => {
                    const el = featuresExpandButtonRef.current;
                    if (el) {
                      featuresExpandAnchorTopRef.current = el.getBoundingClientRect().top;
                    }
                    setFeaturesTableExpanded((v) => !v);
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isDark
                      ? "text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose)]/70"
                      : "text-[var(--color-ink)]/85 hover:bg-[var(--color-ink)]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose)]/50"
                  }`}
                >
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${featuresTableExpanded ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {featuresTableExpanded ? copy.featuresCollapse : copy.featuresExpand}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="animate-fade-scale-soft-delay-1 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
              {copy.processEyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.processTitle}</h2>
          </div>
          <p className={`max-w-md text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
            {copy.processBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.process.map((item) => (
            <article
              key={item.step}
              className={`hover-lift-strong rounded-[2rem] p-6 ${
                isDark
                  ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
                  : "border border-[var(--color-ink)]/8 bg-white/75 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-sage)]">
                {item.step}
              </p>
              <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="animate-fade-scale-soft-delay-2 mx-auto grid w-full max-w-7xl gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-16">
        <div
          className={`hover-lift-strong rounded-[2.4rem] p-8 sm:p-10 ${
            isDark
              ? "border border-white/10 bg-white/6 shadow-[0_16px_40px_rgba(0,0,0,0.24)]"
              : "border border-[var(--color-ink)]/8 bg-white/75 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.valueEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {copy.valueTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.valuePoints.map((feature) => (
              <div
                key={feature}
                className={`hover-lift-strong rounded-[1.5rem] p-4 text-sm ${
                  isDark
                    ? "bg-[rgba(255,255,255,0.04)] text-white/75"
                    : "bg-[var(--color-cream)] text-[var(--color-ink)]/75"
                }`}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`animate-pulse-glow-soft hover-lift-strong rounded-[2.4rem] p-8 sm:p-10 ${
            isDark
              ? "border border-white/10 bg-[linear-gradient(180deg,rgba(209,177,171,0.08),rgba(255,255,255,0.04))]"
              : "bg-[linear-gradient(180deg,_rgba(197,167,161,0.22),_rgba(255,255,255,0.82))]"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.positioningEyebrow}
          </p>
          <blockquote className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            &ldquo;{copy.positioningQuote}&rdquo;
          </blockquote>
          <p className={`mt-6 text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
            {copy.positioningBody}
          </p>
        </div>
      </section>

      <section
        id="pricing"
        className="animate-fade-scale-soft-delay-2 mx-auto w-full max-w-5xl px-6 py-24 sm:px-10"
      >
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.pricingEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.pricingTitle}</h2>
          <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/70"}`}>
            {copy.pricingBody}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#features"
              onClick={() => setFeaturesTableExpanded(true)}
              className="btn-secondary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              {copy.pricingCompareCta}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 lg:grid-cols-2">
          {copy.pricing.map((plan) => (
            <article
              key={plan.name}
              className={`hover-lift-strong rounded-[2.5rem] p-8 transition ${
                plan.featured
                  ? isDark
                    ? "border-2 border-[var(--color-rose)]/45 bg-white/[0.07] shadow-[0_22px_56px_rgba(0,0,0,0.28)] ring-1 ring-[var(--color-rose)]/20"
                    : "border-2 border-[var(--color-rose)]/35 bg-white shadow-[0_22px_56px_rgba(49,42,40,0.1)] ring-1 ring-[var(--color-rose)]/15"
                  : isDark
                    ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                    : "border border-[var(--color-ink)]/8 bg-white/80 shadow-[0_18px_50px_rgba(49,42,40,0.07)]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{plan.name}</p>
                {plan.featured ? (
                  <span className="rounded-full bg-[var(--color-rose)]/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-rose)]">
                    {copy.pricingPopularBadge}
                  </span>
                ) : null}
              </div>
              {plan.tagline ? (
                <p className={`mt-2 text-sm font-medium ${isDark ? "text-white/55" : "text-[var(--color-ink)]/58"}`}>
                  {plan.tagline}
                </p>
              ) : null}
              <h3 className="mt-4 font-display text-4xl sm:text-5xl">{plan.price}</h3>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
                {plan.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="feedback"
        className="animate-fade-scale-soft-delay-2 mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-rose)]">
            {copy.testimonialsEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {copy.testimonialsTitle}
          </h2>
          <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/68" : "text-[var(--color-ink)]/68"}`}>
            {copy.testimonialsBody}
          </p>
        </div>

        <div className="mt-12 flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            className={feedbackNavBtnClass}
            onClick={() => scrollFeedbackStrip("left")}
            aria-label={copy.feedbackScrollPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={feedbackStripRef}
            className="min-w-0 flex-1 flex gap-5 overflow-x-auto scroll-smooth pb-3 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          >
            {copy.testimonials.map((item) => (
              <figure
                key={item.name}
                className={`hover-lift-strong flex w-[min(19rem,100%)] shrink-0 snap-start flex-col rounded-[2rem] p-6 sm:w-[22rem] sm:p-7 ${
                  isDark
                    ? "border border-white/10 bg-white/[0.05] shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
                    : "border border-[var(--color-ink)]/8 bg-white/80 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
                }`}
              >
                <span className="font-display text-4xl leading-none text-[var(--color-rose)]/55" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote
                  className={`mt-2 min-h-0 flex-1 text-base leading-7 [overflow-wrap:normal] [word-break:normal] ${isDark ? "text-white/88" : "text-[var(--color-ink)]/88"}`}
                >
                  {item.quote}
                </blockquote>
                <figcaption className={`mt-6 min-w-0 border-t pt-5 ${isDark ? "border-white/10" : "border-[var(--color-ink)]/10"}`}>
                  <p className="font-display text-xl break-words">{item.name}</p>
                  <div
                    className={`mt-2 max-w-full overflow-x-auto overflow-y-hidden pb-0.5 [-webkit-overflow-scrolling:touch] ${isDark ? "text-white/50" : "text-[var(--color-ink)]/50"}`}
                  >
                    <p className="w-max min-w-full whitespace-nowrap text-xs uppercase tracking-[0.2em]">
                      {item.detail}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            className={feedbackNavBtnClass}
            onClick={() => scrollFeedbackStrip("right")}
            aria-label={copy.feedbackScrollNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      <section
        id="contact"
        className="animate-fade-scale-soft-delay-2 mx-auto w-full max-w-5xl px-6 pb-24 sm:px-10"
      >
        <div
          className={`animate-pulse-glow-soft hover-lift-strong rounded-[2.5rem] p-8 sm:p-12 ${
            isDark
              ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
              : "border border-[color-mix(in_srgb,var(--color-rose)_12%,var(--color-ink)_8%)] bg-white/80 shadow-[0_18px_50px_rgba(49,42,40,0.07)]"
          }`}
        >
          <div className="text-center">
            <WeddingFlourish className="mb-4" />
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">{copy.contactEyebrow}</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.contactTitle}</h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
              {copy.contactBody}
            </p>
          </div>

          <form className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35"
              placeholder={copy.contactName}
            />
            <input
              className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35"
              placeholder={copy.contactPhone}
            />
            <select className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none sm:col-span-2">
              <option>{copy.contactOption1}</option>
              <option>{copy.contactOption2}</option>
              <option>{copy.contactOption3}</option>
            </select>
            <textarea
              className="min-h-32 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35 sm:col-span-2"
              placeholder={copy.contactMessage}
            />
            <button
              type="button"
              className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition-transform duration-300 hover:-translate-y-1 sm:col-span-2"
            >
              {copy.contactSubmit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
