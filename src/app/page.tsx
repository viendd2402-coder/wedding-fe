"use client";

import { useMemo } from "react";
import { useGlobalPreferences } from "@/components/global-preferences-provider";
import HomePremiumControlsPreview from "@/components/home-premium-controls-preview";
import TemplateCarouselSection from "@/components/template-carousel-section";
import {
  freeTemplates,
  premiumTemplates,
  weddingTemplates,
} from "@/lib/templates";

export default function Home() {
  const { language, theme } = useGlobalPreferences();
  const isDark = theme === "dark";

  const copy = useMemo(
    () =>
      language === "vi"
        ? {
            heroEyebrow: "Website cưới hiện đại cho thị trường Việt Nam",
            heroTitle:
              "Bộ template wedding đủ free và premium để khách thấy đúng gu ngay từ lần xem đầu.",
            heroBody:
              "Danh mục mới được mở rộng theo nhiều mood như minimal, floral, editorial, dark luxury và destination. Free để khách bắt đầu nhanh, premium để upsell bằng cảm giác thiết kế riêng.",
            heroPrimaryCta: "Xem mẫu giao diện",
            heroSecondaryCta: "Nhận tư vấn ngay",
            statTemplates: "Templates",
            statDelivery: "Bàn giao",
            statMobile: "Di động",
            templatesEyebrow: "Mẫu giao diện",
            templatesTitle:
              "Chọn theo gu trước, rồi để khách đi từ bản free sang các mẫu premium có cảm giác được thiết kế riêng.",
            freeEyebrow: "Mẫu miễn phí",
            freeTitle: "Mẫu miễn phí",
            freeDescription:
              "Nhóm entry-level để hút lead: dễ chọn, dễ gửi, đủ RSVP và lịch cưới, hợp để khách chốt nhanh mẫu nền.",
            freeCta: "Xem tất cả mẫu miễn phí",
            freeSecondary: "Dùng mẫu này",
            premiumEyebrow: "Mẫu trả phí",
            premiumTitle: "Mẫu trả phí",
            premiumDescription:
              "Nhóm upsell: editorial, classic, dark luxury và destination với nhiều section hơn, visual mạnh hơn và cảm giác cao cấp rõ rệt.",
            premiumCta: "Xem tất cả mẫu trả phí",
            premiumSecondary: "Xem bảng giá",
            featuresEyebrow: "Tính năng",
            featuresTitle:
              "Đây là các điểm làm khách thấy website cưới không chỉ đẹp mà còn đáng tiền.",
            featuresBody:
              "Không chỉ đẹp, sản phẩm cần giải quyết nhu cầu gửi lời mời, xem lịch, chỉ đường và nhận RSVP nhanh gọn.",
            featureTableHeaders: ["Tính năng", "Free", "Premium"],
            featureRows: [
              {
                label: "Giới thiệu cô dâu chú rể",
                free: "Có",
                premium: "Có, tuỳ biến bố cục sâu hơn",
              },
              {
                label: "Timeline câu chuyện",
                free: "Bản cơ bản",
                premium: "Layout kể chuyện nhiều điểm nhấn hơn",
              },
              {
                label: "Lịch cưới và địa điểm",
                free: "Có",
                premium: "Có, trình bày cao cấp hơn",
              },
              {
                label: "RSVP",
                free: "Form cơ bản",
                premium: "Form nâng cao, nhiều điểm chạm hơn",
              },
              {
                label: "Gallery ảnh cưới",
                free: "Cơ bản",
                premium: "Đầy đủ và linh hoạt hơn",
              },
              {
                label: "Gửi lời chúc cô dâu chú rể",
                free: "Không",
                premium: "Có",
              },
              {
                label: "Song ngữ Việt / Anh",
                free: "Không",
                premium: "Có",
              },
              {
                label: "QR check-in / QR mừng cưới",
                free: "Không",
                premium: "Có",
              },
              {
                label: "Bản đồ tới nhà cô dâu / chú rể",
                free: "Không",
                premium: "Có",
              },
              {
                label: "Tuỳ biến giao diện",
                free: "Mức cơ bản",
                premium: "Mạnh hơn theo mood / concept",
              },
            ],
            processEyebrow: "Quy trình",
            processTitle: "Quy trình làm việc rõ ràng",
            processBody:
              "Một landing page kinh doanh tốt cần cho khách thấy rằng việc đặt website cưới là nhanh, dễ và minh bạch.",
            process: [
              {
                step: "01",
                title: "Chọn mẫu giao diện",
                description:
                  "Khách chọn một mẫu có sẵn hoặc gửi style yêu thích để được gợi ý concept phù hợp.",
              },
              {
                step: "02",
                title: "Gửi nội dung và hình ảnh",
                description:
                  "Thu thập tên cô dâu chú rể, lịch cưới, địa điểm, ảnh cưới, màu sắc và các thông tin cần hiển thị.",
              },
              {
                step: "03",
                title: "Thiết kế và chỉnh sửa",
                description:
                  "Bản demo được tạo nhanh để khách xem trước, sau đó tinh chỉnh theo mong muốn cho đến khi ưng ý.",
              },
              {
                step: "04",
                title: "Bàn giao website",
                description:
                  "Bàn giao link website để gửi qua Zalo, Messenger, Instagram hoặc gắn QR trên thiệp in.",
              },
            ],
            valueEyebrow: "Giá trị bán hàng",
            valueTitle:
              "Free giúp mở cuộc trò chuyện, premium giúp chốt giá trị cao hơn.",
            valuePoints: [
              "Catalog rộng hơn để chạy ads và gửi demo",
              "Có mood rõ ràng: minimal, floral, editorial, dark, destination",
              "Dễ bán thêm gói premium hoặc custom",
              "Tối ưu mobile để chia sẻ qua Zalo và Messenger",
            ],
            positioningEyebrow: "Định vị",
            positioningQuote:
              "Bạn không chỉ đang bán một website cưới. Bạn đang bán trải nghiệm mời cưới hiện đại, đúng gu và có thể nâng cấp theo ngân sách.",
            positioningBody:
              "Cách trình bày tinh tế, đẹp và rõ giá trị sẽ giúp thương hiệu của bạn nhìn chuyên nghiệp hơn trong mắt khách hàng.",
            pricingEyebrow: "Bảng giá",
            pricingTitle: "Bảng giá để bán hàng",
            pricingBody:
              "Có thể dùng cấu trúc này để phân tầng rõ giữa mẫu free làm lead magnet, mẫu premium để upsell và gói custom cho khách cần concept riêng.",
            pricing: [
              {
                name: "Basic",
                price: "1.290.000",
                note:
                  "Cho cặp đôi cần website đẹp, nhanh, dễ gửi từ bộ mẫu free hoặc entry-level",
                items: [
                  "1 mẫu giao diện có sẵn",
                  "Tối đa 6 section",
                  "RSVP cơ bản",
                  "Google Maps",
                  "1 lần chỉnh sửa",
                ],
              },
              {
                name: "Premium",
                price: "2.490.000",
                note:
                  "Lựa chọn phù hợp nhất để bán cho đa số khách muốn cảm giác cao cấp hơn",
                items: [
                  "Tuỳ biến màu sắc và bố cục",
                  "Đầy đủ gallery, wishes, RSVP",
                  "Chọn các mood premium như editorial, dark luxury, destination",
                  "Thêm QR mừng cưới",
                  "Xem bản đồ tới nhà cô dâu / chú rể",
                  "3 lần chỉnh sửa",
                  "Ưu tiên hỗ trợ nhanh",
                ],
              },
              {
                name: "Custom",
                price: "Liên hệ",
                note: "Dành cho khách muốn giao diện riêng hoàn toàn",
                items: [
                  "Thiết kế theo concept riêng",
                  "Thêm animation và section đặc biệt",
                  "Hỗ trợ nội dung nâng cao",
                  "Tối ưu theo brand cá nhân",
                  "Báo giá theo yêu cầu",
                ],
              },
            ],
            contactEyebrow: "Liên hệ",
            contactTitle: "Nhận tư vấn hoặc xem demo",
            contactBody:
              "Đây là khu vực CTA cuối trang để lấy lead từ khách quan tâm website cưới.",
            contactName: "Tên khách hàng",
            contactPhone: "Số điện thoại hoặc Zalo",
            contactOption1: "Tôi muốn xem các mẫu có sẵn",
            contactOption2: "Tôi muốn đặt website theo mẫu",
            contactOption3: "Tôi muốn thiết kế website riêng",
            contactMessage:
              "Mô tả nhanh nhu cầu, phong cách mong muốn hoặc ngày cần website",
            contactSubmit: "Nhận tư vấn miễn phí",
          }
        : {
            heroEyebrow: "Modern wedding websites for Vietnam",
            heroTitle:
              "A wedding template library with free and premium options so couples instantly see a style that fits.",
            heroBody:
              "The catalog now spans minimal, floral, editorial, dark luxury, and destination moods. Free templates help couples start quickly, while premium concepts create a custom-designed feel.",
            heroPrimaryCta: "Browse templates",
            heroSecondaryCta: "Get consultation",
            statTemplates: "Templates",
            statDelivery: "Delivery",
            statMobile: "Mobile",
            templatesEyebrow: "Templates",
            templatesTitle:
              "Lead with style first, then guide couples from free picks to premium concepts that feel custom-made.",
            freeEyebrow: "Free templates",
            freeTitle: "Free templates",
            freeDescription:
              "Entry-level options designed to capture leads: easy to choose, easy to share, with RSVP and schedule essentials built in.",
            freeCta: "View all free templates",
            freeSecondary: "Use this template",
            premiumEyebrow: "Premium templates",
            premiumTitle: "Premium templates",
            premiumDescription:
              "Upsell-ready concepts including editorial, classic, dark luxury, and destination layouts with stronger visuals and richer sections.",
            premiumCta: "View all premium templates",
            premiumSecondary: "See pricing",
            featuresEyebrow: "Features",
            featuresTitle:
              "These are the details that make a wedding website feel valuable, not just beautiful.",
            featuresBody:
              "Great design is not enough. The product also needs to help guests view the schedule, navigate quickly, and RSVP with ease.",
            featureTableHeaders: ["Feature", "Free", "Premium"],
            featureRows: [
              {
                label: "Bride and groom introduction",
                free: "Yes",
                premium: "Yes, with deeper layout customization",
              },
              {
                label: "Story timeline",
                free: "Basic version",
                premium: "More editorial storytelling layout",
              },
              {
                label: "Schedule and venue details",
                free: "Yes",
                premium: "Yes, with richer presentation",
              },
              {
                label: "RSVP",
                free: "Basic form",
                premium: "Enhanced RSVP flow",
              },
              {
                label: "Wedding gallery",
                free: "Basic",
                premium: "Full and more flexible",
              },
              {
                label: "Guest wishes for the couple",
                free: "No",
                premium: "Yes",
              },
              {
                label: "Vietnamese / English bilingual",
                free: "No",
                premium: "Yes",
              },
              {
                label: "QR check-in / gift QR",
                free: "No",
                premium: "Yes",
              },
              {
                label: "Map to the bride / groom family home",
                free: "No",
                premium: "Yes",
              },
              {
                label: "Design customization",
                free: "Basic level",
                premium: "Stronger mood / concept customization",
              },
            ],
            processEyebrow: "Process",
            processTitle: "A clear workflow",
            processBody:
              "A strong landing page should show customers that ordering a wedding website is fast, simple, and transparent.",
            process: [
              {
                step: "01",
                title: "Choose a template",
                description:
                  "Couples can pick an available design or share inspiration to get a recommended concept.",
              },
              {
                step: "02",
                title: "Send content and photos",
                description:
                  "Collect names, wedding schedule, venue, photos, color direction, and every detail that needs to appear.",
              },
              {
                step: "03",
                title: "Design and refine",
                description:
                  "A demo is prepared quickly for review, then refined until the couple is happy with the final result.",
              },
              {
                step: "04",
                title: "Website handoff",
                description:
                  "The final website link is delivered for sharing through Zalo, Messenger, Instagram, or printed QR cards.",
              },
            ],
            valueEyebrow: "Sales value",
            valueTitle:
              "Free templates open the conversation, premium templates close higher-value deals.",
            valuePoints: [
              "A broader catalog for ads and demos",
              "Distinct moods: minimal, floral, editorial, dark, and destination",
              "Easier premium and custom upsells",
              "Mobile-first sharing for Zalo and Messenger",
            ],
            positioningEyebrow: "Positioning",
            positioningQuote:
              "You are not just selling a wedding website. You are selling a modern invitation experience that matches the couple's style and budget.",
            positioningBody:
              "Elegant presentation and clear value positioning make the brand feel more professional to customers.",
            pricingEyebrow: "Pricing",
            pricingTitle: "Pricing built for selling",
            pricingBody:
              "This structure clearly separates free templates as lead magnets, premium concepts for upselling, and custom packages for couples who want something unique.",
            pricing: [
              {
                name: "Basic",
                price: "1.290.000",
                note:
                  "For couples who want a beautiful, quick, easy-to-share website from the free or entry-level catalog",
                items: [
                  "1 ready-made template",
                  "Up to 6 sections",
                  "Basic RSVP",
                  "Google Maps",
                  "1 revision",
                ],
              },
              {
                name: "Premium",
                price: "2.490.000",
                note:
                  "The best fit for most couples who want a more elevated and premium feel",
                items: [
                  "Customized colors and layout",
                  "Full gallery, wishes, and RSVP",
                  "Premium moods like editorial, dark luxury, and destination",
                  "Gift QR support",
                  "Maps to the bride and groom family homes",
                  "3 revisions",
                  "Priority support",
                ],
              },
              {
                name: "Custom",
                price: "Contact us",
                note: "For couples who want a fully custom concept",
                items: [
                  "Custom concept design",
                  "Special animations and unique sections",
                  "Advanced content support",
                  "Personal brand alignment",
                  "Custom quotation",
                ],
              },
            ],
            contactEyebrow: "Contact",
            contactTitle: "Get consultation or request a demo",
            contactBody:
              "This final CTA section is designed to capture leads from couples interested in wedding websites.",
            contactName: "Customer name",
            contactPhone: "Phone number or Zalo",
            contactOption1: "I want to browse ready-made templates",
            contactOption2: "I want a website based on a template",
            contactOption3: "I want a fully custom website",
            contactMessage:
              "Briefly describe your needs, preferred style, or delivery timeline",
            contactSubmit: "Get free consultation",
          },
    [language],
  );

  return (
    <main className={`text-[var(--color-ink)] transition-colors ${isDark ? "bg-[#090909]" : "bg-[var(--color-cream)]"}`}>
      <section className="relative isolate overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_top,_rgba(209,177,171,0.12),_transparent_32%),linear-gradient(135deg,_rgba(9,9,9,0.96),_rgba(17,17,19,0.94))]"
              : "bg-[radial-gradient(circle_at_top,_rgba(197,167,161,0.35),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.82),_rgba(233,221,209,0.88))]"
          }`}
        />
        <div className={`absolute -top-28 right-[-120px] h-80 w-80 rounded-full blur-3xl ${isDark ? "bg-white/8" : "bg-white/40"}`} />
        <div
          className={`absolute bottom-0 left-[-80px] h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-[rgba(155,168,150,0.08)]" : "bg-[rgba(125,140,121,0.14)]"
          }`}
        />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
          <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
                {copy.heroEyebrow}
              </p>
              <h1 className="font-display text-5xl leading-none sm:text-7xl lg:text-8xl">
                {copy.heroTitle}
              </h1>
              <p className={`mt-6 max-w-xl text-base leading-8 sm:text-lg ${isDark ? "text-white/74" : "text-[var(--color-ink)]/75"}`}>
                {copy.heroBody}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#templates"
                  className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition"
                >
                  {copy.heroPrimaryCta}
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium backdrop-blur transition"
                >
                  {copy.heroSecondaryCta}
                </a>
              </div>

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-4">
                <div
                  className={`rounded-3xl p-4 backdrop-blur ${
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
                  className={`rounded-3xl p-4 backdrop-blur ${
                    isDark
                      ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                      : "border border-white/70 bg-white/65 shadow-[0_18px_50px_rgba(49,42,40,0.08)]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    {copy.statDelivery}
                  </p>
                  <p className="mt-3 font-display text-3xl">48h</p>
                </div>
                <div
                  className={`rounded-3xl p-4 backdrop-blur ${
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

          </div>

          <div className="pb-6">
            <HomePremiumControlsPreview />
          </div>
        </div>
      </section>

      <section
        id="templates"
        className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="max-w-3xl">
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
          ctaHref="#contact"
          ctaLabel={copy.freeCta}
          templates={freeTemplates}
          badgeClassName="rounded-full bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-medium text-[var(--color-sage)]"
          secondaryActionHref="#contact"
          secondaryActionLabel={copy.freeSecondary}
          secondaryActionClassName="btn-ghost inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
        />

        <TemplateCarouselSection
          eyebrow={copy.premiumEyebrow}
          title={copy.premiumTitle}
          description={copy.premiumDescription}
          eyebrowColorClassName="text-[var(--color-rose)]"
          ctaHref="#pricing"
          ctaLabel={copy.premiumCta}
          templates={premiumTemplates}
          badgeClassName="rounded-full bg-[var(--color-rose)]/12 px-3 py-1 text-xs font-medium text-[var(--color-rose)]"
          secondaryActionHref="#pricing"
          secondaryActionLabel={copy.premiumSecondary}
          secondaryActionClassName="btn-secondary inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
        />
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16"
      >
        <div
          className={`rounded-[2.5rem] px-6 py-14 sm:px-10 lg:px-14 ${
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
            className={`mt-10 overflow-x-auto rounded-[2rem] backdrop-blur ${
              isDark
                ? "border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_14px_36px_rgba(0,0,0,0.22)]"
                : "border border-[var(--color-ink)]/8 bg-white/58 shadow-[0_14px_36px_rgba(49,42,40,0.06)]"
            }`}
          >
            <div className="min-w-[760px]">
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
              {copy.featureRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.5fr_0.8fr_1fr] ${
                    index < copy.featureRows.length - 1
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
          </div>
        </div>
      </section>

      <section
        id="process"
        className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
              {copy.processEyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.processTitle}</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--color-ink)]/70">
            {copy.processBody}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {copy.process.map((item) => (
            <article
              key={item.step}
              className={`rounded-[2rem] p-6 ${
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

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-16">
        <div
          className={`rounded-[2.4rem] p-8 sm:p-10 ${
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
                className={`rounded-[1.5rem] p-4 text-sm ${
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
          className={`rounded-[2.4rem] p-8 sm:p-10 ${
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
        className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10"
      >
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.pricingEyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">{copy.pricingTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink)]/70">
            {copy.pricingBody}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {copy.pricing.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[2.5rem] p-8 ${
                isDark
                  ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
                  : "border border-[var(--color-ink)]/8 bg-white/80 shadow-[0_18px_50px_rgba(49,42,40,0.07)]"
              }`}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
                {plan.name}
              </p>
              <h3 className="mt-4 font-display text-5xl">{plan.price}</h3>
              <p className={`mt-4 text-sm leading-7 ${isDark ? "text-white/70" : "text-[var(--color-ink)]/70"}`}>
                {plan.note}
              </p>
              <div className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <p
                    key={item}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      isDark
                        ? "bg-[rgba(255,255,255,0.04)] text-white/78"
                        : "bg-[var(--color-cream)] text-[var(--color-ink)]/78"
                    }`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-5xl px-6 pb-24 sm:px-10"
      >
        <div
          className={`rounded-[2.5rem] p-8 sm:p-12 ${
            isDark
              ? "border border-white/10 bg-white/6 shadow-[0_18px_50px_rgba(0,0,0,0.24)]"
              : "border border-[var(--color-ink)]/8 bg-white/80 shadow-[0_18px_50px_rgba(49,42,40,0.07)]"
          }`}
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            {copy.contactEyebrow}
            </p>
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
              className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition sm:col-span-2"
            >
              {copy.contactSubmit}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
