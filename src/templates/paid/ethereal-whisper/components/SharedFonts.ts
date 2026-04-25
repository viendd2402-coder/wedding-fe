import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";

export const serif = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"] });
export const sans = Outfit({ subsets: ["latin"], weight: ["200", "300", "400", "500"] });
export const script = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
