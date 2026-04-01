import type { Metadata } from "next";
import AuthScreen from "@/components/auth-screen";

export const metadata: Metadata = {
  title: "Register | Lumiere Wedding Websites",
  description: "Tạo tài khoản để bắt đầu dự án website cưới mới.",
};

export default function RegisterPage() {
  return <AuthScreen mode="register" />;
}
