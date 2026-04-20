import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AvisoMaioridade from "./components/AvisoMaioridade";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AcompanhantesNaWeb — Acompanhantes do Brasil",
  description: "As mais belas e sofisticadas acompanhantes do Brasil. Encontre acompanhantes em sua cidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AvisoMaioridade />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}