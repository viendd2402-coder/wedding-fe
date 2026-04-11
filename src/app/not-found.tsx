import type { Metadata } from "next";
import { cookies } from "next/headers";
import type { AppLanguage } from "@/components/global-preferences-provider";
import { NotFoundExperience } from "@/components/not-found-experience";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang: AppLanguage = cookieStore.get("lumiere-language")?.value === "en" ? "en" : "vi";
  return {
    title:
      lang === "en"
        ? "404 — Page not found | Lumiere Wedding Websites"
        : "404 — Trang không tồn tại | Lumiere Wedding Websites",
    description:
      lang === "en"
        ? "The link may have changed or the page no longer exists. Return to Lumiere to choose a wedding template."
        : "Liên kết có thể đã đổi hoặc trang không còn. Quay về Lumiere để chọn mẫu thiệp cưới.",
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang: AppLanguage = cookieStore.get("lumiere-language")?.value === "en" ? "en" : "vi";
  return <NotFoundExperience lang={lang} />;
}
