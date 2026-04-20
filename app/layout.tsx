import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AvisoMaioridade from "./components/AvisoMaioridade";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PopupDestaque from "./components/PopupDestaque";

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
  title: {
    default: "AcompanhantesNaWeb - Acompanhantes do Brasil",
    template: "%s | AcompanhantesNaWeb",
  },
  description: "Encontre acompanhantes em todo o Brasil. As mais belas e sofisticadas acompanhantes de Fortaleza, Sao Paulo, Rio de Janeiro e mais cidades.",
  keywords: ["acompanhantes", "acompanhantes brasil", "acompanhantes fortaleza", "acompanhantes sao paulo", "acompanhantes rio de janeiro"],
  authors: [{ name: "AcompanhantesNaWeb" }],
  creator: "AcompanhantesNaWeb",
  metadataBase: new URL("https://www.acompanhantesnaweb.com.br"),
  alternates: {
    canonical: "https://www.acompanhantesnaweb.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.acompanhantesnaweb.com.br",
    siteName: "AcompanhantesNaWeb",
    title: "AcompanhantesNaWeb - Acompanhantes do Brasil",
    description: "Encontre acompanhantes em todo o Brasil. As mais belas e sofisticadas acompanhantes do pais.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AcompanhantesNaWeb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AcompanhantesNaWeb - Acompanhantes do Brasil",
    description: "Encontre acompanhantes em todo o Brasil.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AvisoMaioridade />
        <PopupDestaque />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}