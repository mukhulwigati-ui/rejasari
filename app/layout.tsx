// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Menggunakan relative path ke LayoutWrapper
import LayoutWrapper from "../components/LayoutWrapper"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// URL Domain Utama Web Sekolah
const siteUrl = "https://sdn1rejasari.web.id";

// METADATA UTAMA UNTUK SEO DAN SHARE SOSIAL MEDIA (OPEN GRAPH & TWITTER CARDS)
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SDN 1 Rejasari Purwokerto Barat - Portal Berita Resmi",
    template: "%s | SDN 1 Rejasari",
  },
  description: "Portal berita dan informasi resmi SD Negeri 1 Rejasari, Kecamatan Purwokerto Barat. Menyajikan kabar terkini seputar kegiatan sekolah, prestasi siswa, program edukasi, dan pengumuman penting secara akurat.",
  keywords: [
    "SDN 1 Rejasari", 
    "SD Negeri 1 Rejasari", 
    "SDN 1 Rejasari Purwokerto Barat", 
    "Sekolah Dasar Purwokerto", 
    "Portal Berita SDN 1 Rejasari"
  ],
  authors: [{ name: "SDN 1 Rejasari" }],
  creator: "SDN 1 Rejasari Purwokerto Barat",

  // KONFIGURASI OPEN GRAPH (WhatsApp, Facebook, Telegram, LinkedIn, dll)
  openGraph: {
    title: "SDN 1 Rejasari Purwokerto Barat - Portal Berita Resmi",
    description: "Portal berita dan informasi resmi SD Negeri 1 Rejasari, Kecamatan Purwokerto Barat. Menyajikan kabar terkini seputar kegiatan sekolah, prestasi siswa, program edukasi, dan pengumuman penting secara akurat.",
    url: siteUrl,
    siteName: "SDN 1 Rejasari Purwokerto Barat",
    images: [
      {
        url: "/images/banner.png", // Disesuaikan mengarah ke public/images/banner.png
        width: 1200,
        height: 630,
        alt: "SDN 1 Rejasari Purwokerto Barat Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // KONFIGURASI TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    title: "SDN 1 Rejasari Purwokerto Barat - Portal Berita Resmi",
    description: "Portal berita dan informasi resmi SD Negeri 1 Rejasari, Kecamatan Purwokerto Barat.",
    images: ["/images/banner.png"], // Disesuaikan mengarah ke public/images/banner.png
  },

  // ICON WIDGET BROWSER
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 flex flex-col font-sans antialiased text-gray-900">
        
        {/* Membungkus struktur menggunakan LayoutWrapper */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>

      </body>
    </html>
  );
}