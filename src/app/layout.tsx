import type { Metadata } from "next";
import GlobalDashboardControls from "@/components/global-dashboard-controls";
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
    "Dịch vụ thiết kế website cưới hiện đại với nhiều mẫu giao diện đẹp, RSVP, gallery và các gói tuỳ chỉnh.",
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
      <body className="min-h-full flex flex-col">
        <GlobalPreferencesProvider
          initialLanguage={initialLanguage}
          initialTheme={initialTheme}
        >
          <div className="sticky top-0 z-[70] px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <GlobalDashboardControls />
            </div>
          </div>
          {children}
        </GlobalPreferencesProvider>
      </body>
    </html>
  );
}
