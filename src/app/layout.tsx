import type { Metadata } from "next";
import AppTopChrome from "@/components/app-top-chrome";
import SiteFooter from "@/components/site-footer";
import {
  GlobalPreferencesProvider,
  type AppLanguage,
  type AppTheme,
} from "@/components/global-preferences-provider";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lumiere Wedding Websites",
  description:
    "Thiệp mời trực tuyến tinh tế — chọn phong cách phù hợp, chia sẻ dễ dàng và hoàn thiện cùng đội ngũ Lumiere.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("lumiere-language")?.value;
  const savedTheme = cookieStore.get("lumiere-theme")?.value;
  const initialLanguage: AppLanguage = savedLanguage === "en" ? "en" : "vi";
  const initialTheme: AppTheme = savedTheme === "dark" ? "dark" : "light";

  return (
    <html
      lang={initialLanguage}
      data-theme={initialTheme}
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <GlobalPreferencesProvider
          initialLanguage={initialLanguage}
          initialTheme={initialTheme}
        >
          <AppTopChrome />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </GlobalPreferencesProvider>
      </body>
    </html>
  );
}
