import { Cormorant_Garamond, Inter } from "next/font/google";

export const serif = Cormorant_Garamond({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-rb-serif",
});

export const sans = Inter({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-rb-sans",
});
