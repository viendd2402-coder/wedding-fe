import type { Metadata } from "next";
import AuthScreen from "@/components/auth-screen";

export const metadata: Metadata = {
  title: "Register | Lumiere Wedding Websites",
  description:
    "Tạo tài khoản Lumiere để bắt đầu thiệp mời trực tuyến cho ngày trọng đại.",
};

export default function RegisterPage() {
  return <AuthScreen mode="register" />;
}
