import TemplateCarouselSection from "@/components/template-carousel-section";
import {
  freeTemplates,
  premiumTemplates,
  weddingTemplates,
} from "@/lib/templates";

export default function Home() {

  const features = [
    "Trang giới thiệu cô dâu chú rể",
    "Timeline câu chuyện tình yêu",
    "Thông tin lịch cưới và địa điểm",
    "Google Maps và chỉ đường nhanh",
    "Album ảnh và video",
    "Form RSVP thân thiện mobile",
    "Lời chúc từ khách mời",
    "Mừng cưới qua QR hoặc thông tin ngân hàng",
  ];

  const process = [
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
  ];

  const pricing = [
    {
      name: "Basic",
      price: "1.290.000",
      note: "Cho cặp đôi cần website đẹp, nhanh, dễ gửi",
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
      note: "Lựa chọn phù hợp nhất để bán cho đa số khách",
      items: [
        "Tuỳ biến màu sắc và bố cục",
        "Đầy đủ gallery, wishes, RSVP",
        "Thêm QR mừng cưới",
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
  ];

  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,167,161,0.35),_transparent_42%),linear-gradient(135deg,_rgba(255,255,255,0.82),_rgba(233,221,209,0.88))]" />
        <div className="absolute -top-28 right-[-120px] h-80 w-80 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-0 left-[-80px] h-64 w-64 rounded-full bg-[rgba(125,140,121,0.14)] blur-3xl" />

        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-sage)]">
                Studio Website Cưới
              </p>
              <p className="font-display text-2xl tracking-[0.12em]">
                Lumiere
              </p>
            </div>
            <nav className="hidden gap-8 text-sm text-[var(--color-ink)]/70 md:flex">
              <a href="#templates">Mẫu giao diện</a>
              <a href="#features">Tính năng</a>
              <a href="#pricing">Bảng giá</a>
              <a href="#contact">Liên hệ</a>
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
                Website cưới hiện đại cho thị trường Việt Nam
              </p>
              <h1 className="font-display text-5xl leading-none sm:text-7xl lg:text-8xl">
                Bán website wedding đẹp, sang và để khách chốt ngay từ cái nhìn đầu tiên.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-ink)]/75 sm:text-lg">
                Dịch vụ thiết kế website cưới theo phong cách trẻ trung, tối giản
                và tối ưu mobile. Phù hợp để gửi qua Zalo, Messenger và trở thành
                điểm chạm hiện đại cho mọi cặp đôi.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#templates"
                  className="btn-primary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition"
                >
                  Xem mẫu giao diện
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium backdrop-blur transition"
                >
                  Nhận tư vấn ngay
                </a>
              </div>

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-4">
                <div className="rounded-3xl border border-white/70 bg-white/65 p-4 shadow-[0_18px_50px_rgba(49,42,40,0.08)] backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    Templates
                  </p>
                  <p className="mt-3 font-display text-3xl">
                    {weddingTemplates.length}+
                  </p>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/65 p-4 shadow-[0_18px_50px_rgba(49,42,40,0.08)] backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    Bàn giao
                  </p>
                  <p className="mt-3 font-display text-3xl">48h</p>
                </div>
                <div className="rounded-3xl border border-white/70 bg-white/65 p-4 shadow-[0_18px_50px_rgba(49,42,40,0.08)] backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-sage)]">
                    Di động
                  </p>
                  <p className="mt-3 font-display text-3xl">100%</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -left-8 top-12 hidden h-32 w-32 rounded-full border border-white/80 lg:block" />
              <div className="absolute -right-8 bottom-12 hidden h-40 w-40 rounded-full bg-[rgba(197,167,161,0.18)] blur-2xl lg:block" />
              <div className="rounded-[2rem] border border-white/80 bg-white/65 p-4 shadow-[0_25px_80px_rgba(49,42,40,0.12)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,_rgba(233,221,209,0.4),_rgba(125,140,121,0.22)),url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center">
                  <div className="min-h-[520px] bg-[linear-gradient(180deg,rgba(49,42,40,0.03),rgba(49,42,40,0.35))] p-8 sm:p-10">
                    <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-white/80">
                      <span>Demo nổi bật</span>
                      <span>Mẫu trả phí</span>
                    </div>
                    <div className="mt-64 rounded-[1.6rem] border border-white/30 bg-white/16 p-6 text-white backdrop-blur-md">
                      <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                        Mẫu website cưới
                      </p>
                      <p className="mt-4 font-display text-5xl sm:text-6xl">
                        Hiện Đại
                        <span className="px-3 text-white/70">&</span>
                        Tinh Tế
                      </p>
                      <p className="mt-4 max-w-sm text-sm leading-7 text-white/85">
                        Giao diện được tối ưu cho mobile, RSVP, gallery, bản đồ
                        và khả năng tuỳ biến theo từng cặp đôi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="templates"
        className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            Mẫu giao diện
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Các mẫu giao diện có thể click vào xem demo trước, gồm cả miễn phí và trả phí.
          </h2>
        </div>

        <TemplateCarouselSection
          eyebrow="Mẫu miễn phí"
          title="Mẫu miễn phí"
          description="Dùng để thu hút lead, cho khách trải nghiệm nhanh trước khi nâng cấp."
          eyebrowColorClassName="text-[var(--color-sage)]"
          ctaHref="#contact"
          ctaLabel="Xem tất cả mẫu miễn phí"
          templates={freeTemplates}
          badgeClassName="rounded-full bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-medium text-[var(--color-sage)]"
          secondaryActionHref="#contact"
          secondaryActionLabel="Dùng mẫu này"
          secondaryActionClassName="btn-ghost inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
        />

        <TemplateCarouselSection
          eyebrow="Mẫu trả phí"
          title="Mẫu trả phí"
          description="Dành cho khách muốn bố cục đẹp hơn, tính năng đầy đủ hơn và trải nghiệm cao cấp."
          eyebrowColorClassName="text-[var(--color-rose)]"
          ctaHref="#pricing"
          ctaLabel="Xem tất cả mẫu trả phí"
          templates={premiumTemplates}
          badgeClassName="rounded-full bg-[var(--color-rose)]/12 px-3 py-1 text-xs font-medium text-[var(--color-rose)]"
          secondaryActionHref="#pricing"
          secondaryActionLabel="Xem bảng giá"
          secondaryActionClassName="btn-secondary inline-flex rounded-full px-5 py-3 text-sm font-medium transition"
        />
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-16"
      >
        <div className="rounded-[2.5rem] bg-[var(--color-ink)] px-6 py-14 text-white sm:px-10 lg:px-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">
                Tính năng
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Đây là những tính năng khiến khách thấy website cưới thực sự đáng tiền.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/72">
              Không chỉ đẹp, sản phẩm cần giải quyết nhu cầu gửi lời mời, xem lịch,
              chỉ đường và nhận RSVP nhanh gọn.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur"
              >
                <p className="text-sm leading-7 text-white/85">{feature}</p>
              </article>
            ))}
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
              Quy trình
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Quy trình làm việc rõ ràng</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--color-ink)]/70">
            Một landing page kinh doanh tốt cần cho khách thấy rằng việc đặt website
            cưới là nhanh, dễ và minh bạch.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <article
              key={item.step}
              className="rounded-[2rem] border border-[var(--color-ink)]/8 bg-white/75 p-6 shadow-[0_16px_40px_rgba(49,42,40,0.06)]"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-sage)]">
                {item.step}
              </p>
              <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-ink)]/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-16">
        <div className="rounded-[2.4rem] border border-[var(--color-ink)]/8 bg-white/75 p-8 shadow-[0_16px_40px_rgba(49,42,40,0.06)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            Giá trị bán hàng
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Mẫu đẹp giúp bạn thu hút, tính năng tốt giúp khách quyết nhanh.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Nhiều mẫu để mở rộng thành catalog",
              "Phù hợp gửi demo và quảng cáo",
              "Dễ bán thêm gói nâng cấp",
              "Tối ưu cho khách dùng mobile",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-[1.5rem] bg-[var(--color-cream)] p-4 text-sm text-[var(--color-ink)]/75"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.4rem] bg-[linear-gradient(180deg,_rgba(197,167,161,0.22),_rgba(255,255,255,0.82))] p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            Định vị
          </p>
          <blockquote className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
            “Bạn không chỉ đang bán một website cưới. Bạn đang bán trải nghiệm
            mời cưới hiện đại.”
          </blockquote>
          <p className="mt-6 text-sm leading-7 text-[var(--color-ink)]/70">
            Cách trình bày tinh tế, đẹp và rõ giá trị sẽ giúp thương hiệu của bạn
            nhìn chuyên nghiệp hơn trong mắt khách hàng.
          </p>
        </div>
      </section>

      <section
        id="pricing"
        className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10"
      >
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            Bảng giá
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Bảng giá để bán hàng</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink)]/70">
            Bạn có thể bắt đầu từ bảng giá này rồi điều chỉnh lại theo thị trường
            và cách bán của mình.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan) => (
            <article
              key={plan.name}
              className="rounded-[2.5rem] border border-[var(--color-ink)]/8 bg-white/80 p-8 shadow-[0_18px_50px_rgba(49,42,40,0.07)]"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
                {plan.name}
              </p>
              <h3 className="mt-4 font-display text-5xl">{plan.price}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-ink)]/70">
                {plan.note}
              </p>
              <div className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <p key={item} className="rounded-2xl bg-[var(--color-cream)] px-4 py-3 text-sm text-[var(--color-ink)]/78">
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
        <div className="rounded-[2.5rem] border border-[var(--color-ink)]/8 bg-white/80 p-8 shadow-[0_18px_50px_rgba(49,42,40,0.07)] sm:p-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-sage)]">
            Liên hệ
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Nhận tư vấn hoặc xem demo</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--color-ink)]/70">
              Đây là khu vực CTA cuối trang để lấy lead từ khách quan tâm website cưới.
            </p>
          </div>

          <form className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35"
              placeholder="Tên khách hàng"
            />
            <input
              className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35"
              placeholder="Số điện thoại hoặc Zalo"
            />
            <select className="rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none sm:col-span-2">
              <option>Tôi muốn xem các mẫu có sẵn</option>
              <option>Tôi muốn đặt website theo mẫu</option>
              <option>Tôi muốn thiết kế website riêng</option>
            </select>
            <textarea
              className="min-h-32 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 outline-none placeholder:text-[var(--color-ink)]/35 sm:col-span-2"
              placeholder="Mô tả nhanh nhu cầu, phong cách mong muốn hoặc ngày cần website"
            />
            <button
              type="button"
              className="btn-primary rounded-full px-7 py-4 text-sm font-medium transition sm:col-span-2"
            >
              Nhận tư vấn miễn phí
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
