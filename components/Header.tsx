// components/Header.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { FaSearch, FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaRegUser, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';
import { HiOutlineNewspaper, HiMenu } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Tambahan untuk navigasi programmatik
import { client, urlFor } from "@/lib/sanity";

function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

function getTodayIndonesianDate() {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  
  return {
    line1: `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`,
    line2: `${now.getFullYear()}`
  };
}

export default function Header() {
  const date = getTodayIndonesianDate();
  const router = useRouter(); // Inisialisasi router Next.js
  
  const [midBannerData, setMidBannerData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState(''); // State penampung keyword pencarian
  
  const categoriesRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [categories, setCategories] = useState([
    "Bisnis", "Seleb", "Lifestyle", "New Economy", "Techno", "Video", "Otomotif", 
    "Edukasi", "Riset", "Sport", "Kesehatan", "Travel", "Food", "Tech", "Sains"
  ]);
  
  const kilasDaerah = [
    "Jakarta", "Bandung", "Bogor", "Jogja", "Solo", "Semarang", "Surabaya", 
    "Malang", "Bali", "Aceh", "Medan", "Pekanbaru", "Batam", "Palembang", "Balikpapan"
  ];

  // Fungsi penanganan eksekusi pencarian berita
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Pindah ke halaman search dengan membawa query parameter (?q=)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    async function fetchBanner() {
      try {
        const data = await client.fetch(`*[_type == "iklan" && (placement == "mid-banner" || placement == "drafts.mid-banner")][0] {
          title,
          image,
          linkUrl
        }`);
        setMidBannerData(data);
      } catch (error) {
        console.error("Gagal mengambil data banner atas:", error);
      }
    }
    fetchBanner();
  }, []);

  const bannerImgSrc = getSanityImageUrl(midBannerData?.image);

  const executeScroll = (direction: 'left' | 'right') => {
    const step = 8;
    if (categoriesRef.current) {
      if (direction === 'right') {
        categoriesRef.current.scrollLeft += step;
        if (categoriesRef.current.scrollLeft >= categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth - 50) {
          setCategories((prev) => [...prev.slice(1), prev[0]]);
          categoriesRef.current.scrollLeft -= 100;
        }
      } else {
        categoriesRef.current.scrollLeft -= step;
        if (categoriesRef.current.scrollLeft <= 10) {
          setCategories((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
          categoriesRef.current.scrollLeft += 100;
        }
      }
    }
  };

  const startScrolling = (direction: 'left' | 'right') => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    executeScroll(direction);
    scrollIntervalRef.current = setInterval(() => executeScroll(direction), 10);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const hideScrollbarStyle = {
    msOverflowStyle: 'none' as const,
    scrollbarWidth: 'none' as const,
    WebkitOverflowScrolling: 'touch' as const,
  };

  return (
    <header className="w-full bg-white select-none relative">
      
      {/* AREA 1: HEADER UTAMA & SLOT BANNER IKLAN */}
      <div className="w-full bg-white">
        {/* BARIS 1: HEADER UTAMA */}
        <div className="border-b border-gray-100 bg-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 max-w-[1200px] mx-auto gap-3 md:gap-0">
            <div className="flex items-center justify-between md:justify-start gap-5 w-full md:w-auto shrink-0">
              <div className="flex items-center gap-3">
                <HiMenu className="text-2xl text-gray-700 cursor-pointer md:hidden" />
                <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                  <img src="/images/logo-sdn.png" alt="Logo" className="h-8 md:h-10 object-contain cursor-pointer" />
                </Link>
              </div>
              <div className="text-[11px] md:text-xs text-gray-400 font-medium leading-tight hidden md:block border-l border-gray-300 pl-4 py-0.5 font-sans">
                {date.line1}<br />{date.line2}
              </div>
              <FaRegUser className="text-xl text-gray-600 cursor-pointer md:hidden" />
            </div>
            
            {/* =========================================================
               AREA TENGAH: FORM INPUT PENCARIAN (PERBAIKAN AKTIF)
               ========================================================= */}
            {/* PERBAIKAN: Membungkus elemen dengan <form> dan mengikat data state onChange */}
            <div className="w-full md:w-[400px] shrink-0">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Berita" 
                  className="border border-gray-300 rounded-md py-1.5 pl-5 pr-10 text-xs w-full outline-none bg-gray-50/50 focus:bg-white focus:border-[#0066ad] transition-all" 
                />
                <button 
                  type="submit" 
                  className="absolute right-4 top-2.5 text-gray-400 text-sm hover:text-[#0066ad] transition-colors"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center justify-end gap-5 text-gray-500 text-base shrink-0">
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-full text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors">
                <MdLiveTv className="text-red-600 text-sm animate-pulse" /> LIVE
              </button>
              <div className="flex gap-4 text-gray-400 text-lg">
                <FaYoutube className="hover:text-red-600 cursor-pointer transition-colors" /> 
                <FaFacebook className="hover:text-blue-600 cursor-pointer transition-colors" /> 
                <FaInstagram className="hover:text-pink-600 cursor-pointer transition-colors" /> 
                <FaTwitter className="hover:text-gray-800 cursor-pointer transition-colors" /> 
                <HiOutlineNewspaper className="hover:text-blue-500 cursor-pointer transition-colors" /> 
                <FaTiktok className="hover:text-black cursor-pointer transition-colors" />
              </div>
              <div className="border-l border-gray-200 pl-3">
                <FaRegUser className="text-lg cursor-pointer text-gray-500 hover:text-gray-800 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* BARIS 2: SLOT MEGA BANNER IKLAN */}
        <div className="w-full bg-gray-50/50 border-b border-gray-150 py-3">
          <div className="max-w-[1200px] w-full mx-auto flex justify-center overflow-hidden px-4">
            {midBannerData && bannerImgSrc ? (
              <a href={midBannerData.linkUrl || "#"} target="_blank" rel="noopener noreferrer" className="block w-full max-h-[140px] overflow-hidden relative group">
                <img src={bannerImgSrc} alt="Top Banner" className="w-full h-auto object-cover object-center max-h-[140px]" />
                <span className="absolute top-1 right-1 bg-black/40 text-white text-[8px] px-1 rounded uppercase tracking-tight">Ads</span>
              </a>
            ) : (
              <div className="w-full h-[90px] md:h-[120px] bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs font-sans">
                <span className="font-bold tracking-wider text-[10px] text-gray-400">RUANG IKLAN BANNER ATAS</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BARIS 3: NAVIGASI KATEGORI UTAMA */}
      <div className="w-full bg-white border-b border-gray-200 hidden md:block sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-11 relative">
          
          <div className="flex items-center gap-2 font-black text-red-600 text-base italic cursor-pointer select-none shrink-0 pr-4">
            <span>T</span>
          </div>
          
          <div 
            ref={categoriesRef}
            style={hideScrollbarStyle}
            className="flex-1 flex gap-7 items-center overflow-x-auto h-full text-xs font-bold text-gray-600 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat, index) => (
              <span key={index} className="hover:text-[#0066ad] cursor-pointer whitespace-nowrap tracking-wide py-3 border-b-2 border-b-transparent hover:border-b-[#0066ad] transition-all">
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pl-4 shrink-0 bg-white shadow-[-20px_0_20px_5px_#fff] z-10 h-full text-gray-400 select-none">
            <span className="text-[11px] font-bold text-gray-500 mr-2 cursor-pointer hover:text-[#0066ad]">Tribunners</span>
            
            <button 
              onMouseDown={() => startScrolling('left')}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
              className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-[#0066ad] active:scale-95 transition-all cursor-pointer"
            >
              <FaAngleLeft className="text-[10px]" />
            </button>
            <button 
              onMouseDown={() => startScrolling('right')}
              onMouseUp={stopScrolling}
              onMouseLeave={stopScrolling}
              className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-[#0066ad] active:scale-95 transition-all cursor-pointer"
            >
              <FaAngleRight className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>

      {/* LAPISAN B: Jalur Teks KILAS Berita Daerah */}
      <div className="w-full bg-white border-b border-gray-200 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center h-8 text-[11px] font-sans tracking-wide py-1 relative">
          <span className="font-extrabold text-gray-800 uppercase shrink-0 mr-4 border-r border-gray-300 pr-4 z-10 bg-white">KILAS</span>
          
          <div 
            style={hideScrollbarStyle}
            className="flex-1 flex gap-4 text-gray-600 items-center font-medium overflow-x-auto [&::-webkit-scrollbar]:hidden"
          >
            {kilasDaerah.map((city, idx) => (
              <span key={idx} className="hover:text-[#0066ad] cursor-pointer whitespace-nowrap transition-colors">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

    </header>
  );
}