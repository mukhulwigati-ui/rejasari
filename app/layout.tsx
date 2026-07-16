// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// PERBAIKAN: Penyesuaian Metadata khusus untuk SD Negeri 1 Rejasari Purwokerto Barat
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
        
        {/* Header melayang global di atas halaman */}
        <Header />

        {/* Konten dinamis (Beranda, Detail Berita, Halaman Search Google Style) */}
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>

        {/* Footer terkunci rapi di dasar halaman */}
        <Footer />
      </body>
    </html>
  );
}