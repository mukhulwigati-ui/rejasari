// components/LayoutWrapper.tsx
"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Memeriksa jika URL diawali dengan rute admin Sanity Studio (/studio)
  const isStudioPage = pathname.startsWith('/studio');

  return (
    <>
      {/* Tampilkan Header hanya jika bukan di halaman studio admin */}
      {!isStudioPage && <Header />}

      {/* Area Utama Konten Aplikasi */}
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      {/* Tampilkan Footer hanya jika bukan di halaman studio admin */}
      {!isStudioPage && <Footer />}
    </>
  );
}