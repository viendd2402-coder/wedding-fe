import { Playfair_Display, Montserrat } from "next/font/google";

export const serif = Playfair_Display({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

export const sans = Montserrat({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["200", "300", "400", "500", "600", "700"] 
});
