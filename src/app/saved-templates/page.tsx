import type { Metadata } from "next";
import SavedTemplatesScreen from "@/components/saved-templates-screen";
import { savedTemplatesMessages } from "@/i18n/messages/saved-templates";

const meta = savedTemplatesMessages.vi;

export const metadata: Metadata = {
  title: meta.pageTitle,
  description: meta.pageDescription,
};

export default function SavedTemplatesPage() {
  return <SavedTemplatesScreen />;
}
