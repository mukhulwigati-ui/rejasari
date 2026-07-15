// components/LeftIklan.tsx
import { client, adsQuery, urlFor } from "@/lib/sanity";
import Link from "next/link"; // PERBAIKAN: Sudah diperbaiki dari next/next menjadi next/link

interface LeftIklanProps {
  isSticky?: boolean;
}

// UTILITY: Proteksi konversi asset image Sanity agar server tidak crash jika file kosong
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

export default async function LeftIklan({ isSticky = false }: LeftIklanProps) {
  let adsData = null;

  try {
    // Fetch data iklan dinamis berdasarkan placement 'left-sidebar' dari Sanity
    adsData = await client.fetch(adsQuery, { placement: 'left-sidebar' });
  } catch (error) {
    console.error("Gagal memuat data iklan di LeftIklan:", error);
  }

  const adsImageSrc = getSanityImageUrl(adsData?.image);

  return (
    // Kelas Tailwind mendeteksi apakah isSticky aktif atau tidak saat di-scroll
    <div className={`w-[160px] shrink-0 hidden lg:block ${isSticky ? 'sticky top-4' : 'space-y-4'}`}>
      <div className="border border-gray-200 rounded-xl bg-white p-2 text-center shadow-sm min-h-[600px] flex flex-col justify-between overflow-hidden">
        
        {/* Label Sponsor */}
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
          Sponsor
        </div>
        
        {/* Konten Utama Banner Iklan */}
        <div className="w-full flex-1 flex items-center justify-center rounded overflow-hidden relative group">
          {adsData && adsImageSrc ? (
            /* Jika banner iklan dikonfigurasi di Sanity */
            <a href={adsData.linkUrl || "#"} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
              <img 
                src={adsImageSrc} 
                alt={adsData.title || "Sponsor Ads"} 
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </a>
          ) : (
            /* Tempat Cadangan (Placeholder) jika data kosong di CMS */
            <div className="w-full h-[520px] bg-gray-50 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center p-2 text-gray-400">
              <span className="text-[11px] font-bold uppercase tracking-wide">Ads Slot</span>
              <span className="text-[9px] text-gray-300 mt-1">
                {isSticky ? "160x600 Sticky" : "160x600 Top"}
              </span>
            </div>
          )}
        </div>
        
        {/* Tombol Indeks hanya muncul di banner atas (ketika tidak dalam posisi sticky) */}
        {!isSticky && (
          <div className="text-left pt-2 mt-2 border-t border-gray-100 space-y-1">
            <Link href="/indeks-berita" className="text-[11px] font-bold text-[#0b74b6] hover:text-[#0066ad] hover:underline block transition-colors">
              Indeks Berita +
            </Link>
            <Link href="/indeks-foto" className="text-[11px] font-bold text-[#0b74b6] hover:text-[#0066ad] hover:underline block transition-colors">
              Indeks Foto +
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}