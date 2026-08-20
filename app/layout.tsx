import type { Metadata } from "next";
import "./globals.css";
import { cinzel, dmSans, jakarta } from "./conts/fonts";
import StarryBackground from "./components/layout/StarryBackground";

export const metadata: Metadata = {
  title: "Feliz Cumple Mi Amor",
  description: "App para felicitar a mi amor en su cumpleaños Tatiana",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen w-full overflow-x-hidden bg-[#030208] font-text text-white antialiased selection:bg-purple-500/40 selection:text-white">
        <StarryBackground />

        <main className="relative z-10 min-h-screen w-full flex items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
