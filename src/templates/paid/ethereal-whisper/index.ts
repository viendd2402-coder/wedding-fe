import type { TemplateModule } from "@/templates/template-registry";
import { etherealWhisperMetadata } from "./metadata";
import { etherealWhisperPreviewImages } from "./data";
import { default as PreviewComponent } from "./preview";

export const etherealWhisperModule: TemplateModule = {
  meta: etherealWhisperMetadata,
  PreviewComponent,
  defaultGalleryImages: etherealWhisperPreviewImages.galleryImages,
};
