// components/SidebarSlideshow.tsx
'use client';

import { useState, useEffect } from 'react';
import { urlFor } from "@/lib/sanity";

interface SlideItem {
  title: string;
  image: any;
  linkUrl?: string;
}

interface SidebarSlideshowProps {
  // Menerima data array dari Sanity di halaman utama
  slides?: SlideItem[];
}

export default function SidebarSlideshow({ slides = [] }: SidebarSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Jalankan efek auto-play slideshow setiap 4 detik
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  // Tampilan Fallback jika admin CMS belum mengunggah gambar slideshow banner
  if (slides.length === 0) {
    return (
      <div className="bg-[#003366] text-white rounded-xl p-4 flex items-center justify-center shadow-sm h-[180px] bg-gradient-to-b from-[#002244] to-[#003c74] text-center text-xs text-blue-200">
        Belum ada banner pengumuman.
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="bg-[#003366] text-white rounded-xl flex flex-col shadow-sm h-[180px] bg-gradient-to-b from-[#002244] to-[#003c74] relative overflow-hidden w-full group">
      
      {/* 1. LAYER GAMBAR BANNER */}
      {currentSlide.linkUrl ? (
        <a href={currentSlide.linkUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block relative">
          <img 
            src={urlFor(currentSlide.image).url()} 
            alt={currentSlide.title} 
            className="w-full h-full object-cover transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-103"
          />
        </a>
      ) : (
        <div className="w-full h-full relative">
          <img 
            src={urlFor(currentSlide.image).url()} 
            alt={currentSlide.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 2. OVERLAY CAPTION JUDUL (Muncul Lembut di Bagian Bawah Gambar) */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex flex-col justify-end">
        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug drop-shadow-md">
          {currentSlide.title}
        </h4>
      </div>

      {/* 3. INDIKATOR DOTS PAGINASI (Sudut Kanan Atas Floting) */}
      {slides.length > 1 && (
        <div className="absolute top-3 right-3 flex gap-1 bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full z-20">
          {slides.map((_, idx) => (
            <span 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full block transition-all duration-300 ${
                idx === currentIndex ? 'bg-white scale-110' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}