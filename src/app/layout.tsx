
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import MusicPlayer from "@/components/player/MusicPlayer";
import AudioEngine from "@/components/player/AudioEngine";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Muse — Find Your Frequency",
    template: "%s | Muse",
  },
  description:
    "Discover music, explore new artists, and create your own listening experience with Muse.",
  applicationName: "Muse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <div className="min-h-screen pb-36">
          {children}
        </div>

        <AudioEngine />

        <MusicPlayer />
      </body>
    </html>
  );
}
