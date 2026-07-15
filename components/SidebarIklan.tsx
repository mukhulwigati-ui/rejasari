// components/SidebarIklan.tsx
import { client, adsQuery, indexQuery, urlFor } from "@/lib/sanity";
import Link from "next/link";

// UTILITY: Proteksi konversi asset image Sanity agar server tidak crash jika file kosong
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

export default async function SidebarIklan() {
  // 1. Fetch data Iklan 300x600 secara dinamis berdasarkan placement 'right-sidebar-large'
  let adsData = null;
  let trendingTopics: string[] = [];

  try {
    const [adsFetch, postsFetch] = await Promise.all([
      client.fetch(adsQuery, { placement: 'right-sidebar-large' }),
      client.fetch<any[]>(indexQuery)
    ]);
    
    adsData = adsFetch;

    // 2. Mengambil data untuk seksi Trending Topik dari CMS secara dinamis
    if (postsFetch && postsFetch.length > 0) {
      // Ambil nama-nama kategori unik yang ada di postingan database
      const categories = postsFetch
        .map((post) => post.categoryTitle)
        .filter((value, index, self) => value && self.indexOf(value) === index);
      
      // Jika kategori unik kurang dari 3, pasang fallback judul berita teranyar sebagai topik hangat
      if (categories.length >= 3) {
        trendingTopics = categories.slice(0, 5);
      } else {
        trendingTopics = postsFetch.slice(0, 5).map((post) => post.title);
      }
    }
  } catch (error) {
    console.error("Gagal memuat data komponen SidebarIklan:", error);
  }

  // Fallback data teks jika database CMS masih kosong
  if (trendingTopics.length === 0) {
    trendingTopics = ["Pendidikan", "Otomotif", "Teknologi", "Regional", "Nasional"];
  }

  const adsImageSrc = getSanityImageUrl(adsData?.image);

  return (
    <div className="w-full space-y-6">
      
      {/* =========================================================
         1. KOTAK IKLAN UTAMA (DINAMIS DARI SANITY - 300x600)
         ========================================================= */}
      {adsData && adsImageSrc ? (
        /* Jika data banner terisi di CMS, tampilkan banner link aktif */
        <div className="w-full h-[600px] border border-gray-200 rounded-xl overflow-hidden shadow-sm relative group">
          <a href={adsData.linkUrl || "#"} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
            <img 
              src={adsImageSrc} 
              alt={adsData.title || "Iklan Portal"} 
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <span className="absolute top-2 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-sans tracking-wider">
              Ads 300x600
            </span>
          </a>
        </div>
      ) : (
        /* Siku Cadangan (Placeholder) jika admin belum meng-upload gambar di Sanity Studio */
        <div className="w-full h-[600px] border border-gray-200 rounded-xl bg-gray-50 border-dashed p-4 text-center shadow-sm flex flex-col items-center justify-center text-gray-400 font-sans relative">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ruang Iklan</span>
          <span className="text-[11px] text-gray-300 mt-1">Sediakan Slot Banner 300x600 px</span>
          <span className="absolute top-2 right-2 bg-gray-200 text-gray-400 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
            Empty
          </span>
        </div>
      )}

      {/* =========================================================
         2. TEKS TRENDING TOPIK (DINAMIS BERDASARKAN KONTEN CMS)
         ========================================================= */}
      <div className="pt-2 space-y-3">
        <h3 className="text-sm font-black text-gray-900 border-l-4 border-red-600 pl-2 uppercase tracking-wide">
          Trending Topik
        </h3>
        
        {/* Tampilan Tag Topik Menarik */}
        <div className="flex flex-wrap gap-2 pt-1">
          {trendingTopics.map((topic, idx) => (
            <span 
              key={idx} 
              className="bg-gray-100 hover:bg-[#0066ad] text-gray-700 hover:text-white text-[11px] font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all border border-gray-200 line-clamp-1 max-w-full block leading-none"
            >
              #{topic.toLowerCase().replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
}