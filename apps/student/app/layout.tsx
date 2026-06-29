import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { Providers } from "./providers";

const mulish = localFont({
  src: [
    {
      path: "./fonts/Mulish/Mulish-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Mulish/Mulish-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mulish/Mulish-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Mulish/Mulish-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Mulish/Mulish-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const cherrySwash = localFont({
  src: [
    {
      path: "./fonts/Cherry_Swash/CherrySwash-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Cherry_Swash/CherrySwash-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Área do aluno | Michela Ensina",
  description: "Ambiente da área do aluno do Michela Ensina.",
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
    <html lang="pt-BR" data-theme="dark" className="dark">
      <body className={`${mulish.variable} ${cherrySwash.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
