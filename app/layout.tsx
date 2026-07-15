// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // 1. PERBAIKAN: Mengimpor komponen Footer

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tribunnews - Berita Terkini",
  description: "Portal berita terkini, menyajikan berita hari ini dan kabar terbaru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 flex flex-col justify-between">
        {/* Konten utama halaman (Beranda / Detail Blog) */}
        <div className="flex-1">
          {children}
        </div>

        {/* 2. PERBAIKAN: Memanggil Footer secara global di bawah area konten */}
        <Footer />
      </body>
    </html>
  );
}