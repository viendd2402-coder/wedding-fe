import {
  defaultPreviewData,
  defaultPreviewImages,
  type PreviewData,
  type PreviewImages,
} from "@/templates/preview-types";
import { etherealWhisperMessages } from "@/i18n/messages/template-previews/ethereal-whisper";

export const etherealWhisperPreviewData: PreviewData = {
  ...defaultPreviewData,
  ewHeroSubtitle: etherealWhisperMessages.heroSubtitle,
  ewWelcomeTitle: etherealWhisperMessages.welcomeTitle,
  ewWelcomeText: etherealWhisperMessages.welcomeText,
  ewCoupleTitle: etherealWhisperMessages.coupleTitle,
  ewEventsTitle: etherealWhisperMessages.eventsTitle,
  ewEventsLead: etherealWhisperMessages.eventsLead,
  ewGalleryTitle: etherealWhisperMessages.galleryTitle,
  ewGalleryLead: etherealWhisperMessages.galleryLead,
  ewRsvpTitle: etherealWhisperMessages.rsvpTitle,
  ewRsvpLead: etherealWhisperMessages.rsvpLead,
  ewGiftTitle: etherealWhisperMessages.giftTitle,
  ewGiftLead: etherealWhisperMessages.giftLead,
  ewFooterThanks: etherealWhisperMessages.footerThanks,
  ewGroomBio: "Một nửa vững chãi, luôn mang lại sự an tâm và nụ cười.",
  ewBrideBio: "Cô gái hay cười, luôn tìm thấy niềm vui trong những điều giản dị.",
  ewBrideBankName: "Vietcombank",
  ewBrideAccountName: "NGUYEN THI B",
  ewBrideAccountNumber: "0987654321",
};

export const etherealWhisperPreviewImages: PreviewImages = {
  ...defaultPreviewImages,
  coverImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop",
  ],
};
