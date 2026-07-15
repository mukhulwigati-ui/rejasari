// components/Header.tsx
import { FaSearch, FaYoutube, FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaRegUser } from 'react-icons/fa';
import { MdLiveTv } from 'react-icons/md';
import { HiOutlineNewspaper, HiMenu } from 'react-icons/hi';
import Link from 'next/link'; // PERBAIKAN: Import Link dari Next.js

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Utility Bar: Ditambahkan justify-between untuk membagi space kosong secara merata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 md:py-4 max-w-[1200px] mx-auto gap-3 md:gap-0">
        
        {/* =========================================================
           KOLOM 1: AREA KIRI (Hamburger, Logo Link Utama, Tanggal)
           ========================================================= */}
        <div className="flex items-center justify-between md:justify-start gap-5 w-full md:w-auto shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu: Muncul hanya di mobile */}
            <HiMenu className="text-2xl text-gray-700 cursor-pointer md:hidden" />
            
            {/* PERBAIKAN: Membungkus img logo dengan Link menuju halaman utama "/" */}
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <img src="/images/logo-sdn.png" alt="Logo" className="h-8 md:h-10 object-contain cursor-pointer" />
            </Link>
          </div>

          {/* Tanggal: Pembatas vertikal tipis khas Tribunnews */}
          <div className="text-[11px] md:text-xs text-gray-400 font-medium leading-tight hidden md:block border-l border-gray-300 pl-4 py-0.5">
            Selasa, 14 Juli<br />2026
          </div>

          {/* User Icon: Pindah ke pojok kanan hanya saat di mobile */}
          <FaRegUser className="text-xl text-gray-600 cursor-pointer md:hidden" />
        </div>
        
        {/* =========================================================
           KOLOM 2: SEARCH BAR (Dikunci 400px agar tidak molor gepeng)
           ========================================================= */}
        <div className="w-full md:w-[400px] shrink-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari Berita" 
              className="border border-gray-300 md:border-gray-400 rounded-full py-1.5 pl-5 pr-10 text-xs w-full outline-none bg-gray-50/30 focus:bg-white focus:border-[#0b74b6] transition-all" 
            />
            <FaSearch className="absolute right-4 top-2.5 text-gray-400 text-sm cursor-pointer hover:text-[#0b74b6]" />
          </div>
        </div>

        {/* =========================================================
           KOLOM 3: ACTION & SOCIAL MEDIA ICONS (Desktop)
           ========================================================= */}
        <div className="hidden md:flex items-center justify-end gap-5 text-gray-500 text-base shrink-0">
          {/* Live Button */}
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-1 rounded-full text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors">
            <MdLiveTv className="text-red-600 text-sm" /> LIVE
          </button>
          
          {/* Social Icons */}
          <div className="flex gap-4 text-gray-400 text-lg">
            <FaYoutube className="hover:text-red-600 cursor-pointer transition-colors" /> 
            <FaFacebook className="hover:text-blue-600 cursor-pointer transition-colors" /> 
            <FaInstagram className="hover:text-pink-600 cursor-pointer transition-colors" /> 
            <FaTwitter className="hover:text-gray-800 cursor-pointer transition-colors" /> 
            <HiOutlineNewspaper className="hover:text-blue-500 cursor-pointer transition-colors" /> 
            <FaTiktok className="hover:text-black cursor-pointer transition-colors" />
          </div>
          
          {/* User Icon Desktop */}
          <div className="border-l border-gray-200 pl-3">
            <FaRegUser className="text-lg cursor-pointer text-gray-500 hover:text-gray-800 transition-colors" />
          </div>
        </div>

      </div>
    </header>
  );
}