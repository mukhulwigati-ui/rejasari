// components/NewsHighlights.tsx
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
  // Menerima data kategori highlight dinamis dari Sanity
  highlightData?: HighlightCategory;
}

export default function NewsHighlights({ highlightData }: NewsHighlightsProps) {
  // Fallback data default jika data di Sanity Studio belum diisi/kosong
  const currentCategoryTitle = highlightData?.title || "Topik Pilihan";
  const posts = highlightData?.posts || [];

  return (
    <div className="border border-gray-200 rounded-xl flex overflow-hidden shadow-sm h-[180px] bg-white relative w-full">
      
      {/* =========================================================
         SISI KIRI: SLIDER TOPIK PILIHAN (WARNA BIRU DENGAN CLIP PATH TRIBUN)
         ========================================================= */}
      <div 
        className="bg-[#0b74b6] p-4 text-white w-[25%] flex flex-col justify-between shrink-0 relative z-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0% 100%)' }}
      >
        <div>
          <h2 className="text-base font-bold tracking-wide">Topik Pilihan</h2>
        </div>
        
        <div className="pr-6 mb-2">
          <p className="text-sm font-serif italic font-medium leading-snug line-clamp-2 text-blue-50">
            {currentCategoryTitle}
          </p>
        </div>

        {/* Indikator Titik Paginasi */}
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 block"></span>
          <span className="w-2 h-2 rounded-full bg-white block"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 block"></span>
        </div>
      </div>
      
      {/* =========================================================
         SISI KANAN: KONTEN BERITA HORIZONTAL (PASTI HADIR BERDAMPINGAN)
         ========================================================= */}
      <div className="flex-1 p-4 pl-8 pr-14 flex items-center min-w-0 gap-6 relative">
        
        {posts.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Belum ada berita di topik ini.</p>
        ) : (
          // Potong tepat maksimal 2 post dan map berdampingan secara merata
          posts.slice(0, 2).map((post, idx) => (
            <div key={post.slug || idx} className="flex-1 w-1/2 flex gap-3 min-w-0 items-center group">
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
              
              {/* Judul Berita dengan link menuju halaman detail */}
              <Link href={`/blog/${post.slug}`} className="min-w-0 flex-1">
                <h3 className="font-bold text-xs md:text-sm text-gray-950 group-hover:text-[#0b74b6] cursor-pointer line-clamp-4 leading-snug transition-colors">
                  {post.title}
                </h3>
              </Link>
            </div>
          ))
        )}

        {/* Tombol Navigasi Slider Atas & Bawah */}
        <div className="absolute right-4 flex flex-col gap-1.5">
          <button className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
          </button>
          <button className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center bg-white shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
}