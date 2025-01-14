import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import HeaderSection from "@/components/organisms/HeaderSection";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Member - Bax Digital Indonesia",
  description: "Bax Digital Indonesia - Digital Platform",
  icons: {
    icon: "/assets/icons/icon-bax.png",
    // shortcut: "/assets/icons/icon-bax.png",
    // apple: "/assets/icons/icon-bax.png",
  },
  // manifest: "/assets/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} min-h-screen bg-gradient-to-b from-[#eaf7ff] to-[#fafbfd] text-foreground antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
