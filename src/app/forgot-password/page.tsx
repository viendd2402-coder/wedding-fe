import type { Metadata } from "next";
import AuthScreen from "@/components/auth-screen";

export const metadata: Metadata = {
  title: "Forgot Password | Lumiere Wedding Websites",
  description: "Nhập email để nhận hướng dẫn đặt lại mật khẩu.",
};

export default function ForgotPasswordPage() {
  return <AuthScreen mode="forgot" />;
}
