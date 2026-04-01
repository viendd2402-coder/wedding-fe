import type { Metadata } from "next";
import AuthScreen from "@/components/auth-screen";

export const metadata: Metadata = {
  title: "Login | Lumiere Wedding Websites",
  description: "Đăng nhập để quản lý template và dự án website cưới của bạn.",
};

export default function LoginPage() {
  return <AuthScreen mode="login" />;
}
