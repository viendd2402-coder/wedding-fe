import type { Metadata } from "next";
import MyInvitationsScreen from "@/components/my-invitations-screen";
import { myInvitationsMessages } from "@/i18n/messages/my-invitations";

const meta = myInvitationsMessages.vi;

export const metadata: Metadata = {
  title: meta.pageTitle,
  description: meta.pageDescription,
};

export default function MyInvitationsPage() {
  return <MyInvitationsScreen />;
}
