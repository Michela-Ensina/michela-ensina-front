import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const cherrySwash = localFont({
  src: [
    {
      path: "../app/fonts/Cherry_Swash/CherrySwash-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Cherry_Swash/CherrySwash-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const mulish = localFont({
  src: [
    {
      path: "../app/fonts/Mulish/Mulish-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/Mulish/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/Mulish/Mulish-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/Mulish/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/Mulish/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michela Ensina",
  description: "Website institucional e landing page da Michela Ensina.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cherrySwash.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
