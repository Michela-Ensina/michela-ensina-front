import type { Metadata } from "next";
import { Cherry_Swash, Mulish } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-body",
});

const cherrySwash = Cherry_Swash({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
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
