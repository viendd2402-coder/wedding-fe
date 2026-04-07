import type { Metadata } from "next";
import SocialAuthCallbackScreen from "@/components/social-auth-callback-screen";

export const metadata: Metadata = {
  title: "Social Sign-in | Lumiere Wedding Websites",
  description: "Hoàn tất đăng nhập bằng Google hoặc Facebook.",
};

export default function SocialAuthCallbackPage() {
  return <SocialAuthCallbackScreen />;
}
