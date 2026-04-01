export type TemplateTier = "Miễn phí" | "Trả phí";

export type TemplateFamily =
  | "minimal"
  | "editorial"
  | "romance"
  | "dark-luxury"
  | "destination";

export type TemplateMood =
  | "minimal"
  | "botanical"
  | "fashion"
  | "editorial"
  | "luxury"
  | "dark"
  | "destination"
  | "classic"
  | "boho"
  | "pastel";

export type CountdownVariant =
  | "minimal"
  | "editorial"
  | "romance"
  | "dark"
  | "coastal";

export type WeddingTemplate = {
  slug: string;
  name: string;
  style: string;
  tier: TemplateTier;
  family: TemplateFamily;
  mood: TemplateMood;
  badge: string;
  description: string;
  image: string;
  accent: string;
  heroTitle: string;
  heroSubtitle: string;
  previewLabel: string;
  sections: string[];
  sectionProfile: string;
  countdownVariant: CountdownVariant;
};
