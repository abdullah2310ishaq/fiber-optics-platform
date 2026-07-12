import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Sora, Space_Grotesk } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site/brand";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const homeSerif = Instrument_Serif({
  variable: "--font-home-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const homeLabel = Space_Grotesk({
  variable: "--font-home-label",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} B2B Platform`,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} ${homeSerif.variable} ${homeLabel.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
