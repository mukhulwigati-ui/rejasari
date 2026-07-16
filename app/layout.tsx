// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// PERBAIKAN: Menggunakan relative path '../components/LayoutWrapper' agar pasti ketemu
import LayoutWrapper from "../components/LayoutWrapper"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDN 1 Rejasari Purwokerto Barat - Portal Berita Resmi",
  description: "Portal berita dan informasi resmi SD Negeri 1 Rejasari, Kecamatan Purwokerto Barat. Menyajikan kabar terkini seputar kegiatan sekolah, prestasi siswa, program edukasi, dan pengumuman penting secara akurat.",
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