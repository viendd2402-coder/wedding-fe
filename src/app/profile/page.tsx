import type { Metadata } from "next";
import ProfileScreen from "@/components/profile-screen";

export const metadata: Metadata = {
  title: "Hồ sơ | Lumiere Wedding Websites",
  description: "Xem và quản lý thông tin tài khoản Lumiere của bạn.",
};

export default function ProfilePage() {
  return <ProfileScreen />;
}
