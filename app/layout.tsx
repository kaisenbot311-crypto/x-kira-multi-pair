import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "x-kira Bot - Free WhatsApp Bot Pairing",
  description: "Pair x-kira Bot to your WhatsApp for free! Get your pairing code instantly and link using WhatsApp's 'Link a Device' feature. Access powerful bot commands, downloads, AI chat, and more.",
  keywords: ["whatsapp bot", "x-kira bot", "whatsapp pairing", "free bot", "whatsapp bot pairing code", "link whatsapp device"],
  authors: [{ name: "x-kira Bot" }],
  creator: "x-kira Bot",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "x-kira Bot - Free WhatsApp Bot Pairing",
    description: "Pair x-kira Bot to your WhatsApp for free! Get instant pairing codes and access powerful bot features.",
    siteName: "x-kira Bot",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/j99hTVHV/IMG-20251111-WA0012.jpg" />
        <link rel="icon" type="image/png" sizes="192x192" href="https://i.ibb.co/j99hTVHV/IMG-20251111-WA0012.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://i.ibb.co/j99hTVHV/IMG-20251111-WA0012.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
