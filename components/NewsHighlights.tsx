// components/NewsHighlights.tsx
'use client';

import { useState } from "react";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface HighlightPost {
  title: string;
  slug: string;
  mainImage?: any;
}

interface HighlightCategory {
  title: string;
  posts: HighlightPost[];
}

interface NewsHighlightsProps {
  highlightData?: HighlightCategory;
}

export default function NewsHighlights({ highlightData }: NewsHighlightsProps) {
  const allPosts = highlightData?.posts || [];
  const [startIndex, setStartIndex] = useState(0);

  const totalPosts = allPosts.length;

  // Logika rotasi bergeser sirkular (Circular Shifting)
  const handlePrev = () => {
    if (totalPosts <= 1) return;
    setStartIndex((prev) => (prev === 0 ? totalPosts - 1 : prev - 1));
  };

  const handleNext = () => {
    if (totalPosts <= 1) return;
    setStartIndex((prev) => (prev === totalPosts - 1 ? 0 : prev + 1));
  };

  // Mengambil 2 postingan untuk ditampilkan menggunakan modul indeks sirkular
  const currentPosts: HighlightPost[] = [];
  if (totalPosts > 0) {
    currentPosts.push(allPosts[startIndex]);
    if (totalPosts > 1) {
      // Mengambil item berikutnya, jika sudah diujung array akan berputar kembali ke index 0
      currentPosts.push(allPosts[(startIndex + 1) % totalPosts]);
    }
  }

  // Mengubah kata kunci deskripsi kiri mengikuti berita pertama yang sedang aktif
  const activeKeyword = currentPosts[0] 
    ? currentPosts[0].title 
    : (highlightData?.title || "Topik Pilihan");

  return (
    <div className="border border-gray-200 rounded-xl flex overflow-hidden shadow-sm h-[180px] bg-white relative w-full select-none">
      
      {/* =========================================================
          SISI KIRI: SLIDER TOPIK PILIHAN (WARNA BIRU CLIP PATH TRIBUN)
          ========================================================= */}
      <div 
        className="bg-[#0b74b6] p-4 text-white w-[25%] flex flex-col justify-between shrink-0 relative z-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0% 100%)' }}
      >
        <div>
          <h2 className="text-base font-bold tracking-wide">Topik Pilihan</h2>
        </div>
        
        <div className="pr-6 mb-2">
          <p className="text-xs md:text-sm font-serif italic font-medium leading-snug line-clamp-2 text-blue-50 transition-all duration-300">
            {activeKeyword}
          </p>
        </div>

        {/* Indikator Titik Posisi Aliran Berita */}
        <div className="flex gap-1.5 items-center">
          {totalPosts <= 1 ? (
            <span className="w-2 h-2 rounded-full bg-white block" />
          ) : (
            allPosts.map((_, idx) => (
              <span 
                key={idx} 
                className={`rounded-full transition-all duration-300 block ${
                  idx === startIndex ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/40'
                }`}
              />
            ))
          )}
        </div>
      </div>
      
      {/* =========================================================
          SISI KANAN: KONTEN BERITA HORIZONTAL
          ========================================================= */}
      <div className="flex-1 p-4 pl-8 pr-14 flex items-center min-w-0 gap-6 relative bg-white">
        
        {currentPosts.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Belum ada berita di topik ini.</p>
        ) : (
          <div className="w-full flex gap-6">
            {currentPosts.map((post, idx) => (
              <div key={post.slug || idx} className="flex-1 w-1/2 flex gap-3 min-w-0 items-center group animate-fadeIn">
                
                {/* Thumbnail Gambar Berita */}
                <Link href={`/blog/${post.slug}`} className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 block relative shadow-sm border border-gray-100">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).url()} 
                      alt={post.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </Link>
                
                {/* Judul Berita */}
                <Link href={`/blog/${post.slug}`} className="min-w-0 flex-1">
                  <h3 className="font-bold text-xs md:text-sm text-gray-950 group-hover:text-[#0b74b6] cursor-pointer line-clamp-4 leading-snug transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
              </div>
            ))}
          </div>
        )}

        {/* =========================================================
           TOMBOL NAVIGASI PANAH (KINI AKTIF BERPUTAR SIRKULAR)
           ========================================================= */}
        <div className="absolute right-4 flex flex-col gap-1.5 z-20">
          <button 
            onClick={handlePrev}
            disabled={totalPosts <= 1}
            className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 text-gray-500 hover:text-[#0b74b6] transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Sebelumnya"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
          <button 
            onClick={handleNext}
            disabled={totalPosts <= 1}
            className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 text-gray-500 hover:text-[#0b74b6] transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Berikutnya"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
}