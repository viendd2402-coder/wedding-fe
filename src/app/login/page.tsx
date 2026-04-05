import type { Metadata } from "next";
import AuthScreen from "@/components/auth-screen";

export const metadata: Metadata = {
  title: "Login | Lumiere Wedding Websites",
  description:
    "Đăng nhập để cập nhật nội dung và theo dõi tiến độ website cưới của bạn.",
};

export default function LoginPage() {
  return <AuthScreen mode="login" />;
}
