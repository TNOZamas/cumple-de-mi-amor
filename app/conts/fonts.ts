import { Cinzel, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["600", "700", "800"],
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-chip",
  weight: ["600", "700"],
});
