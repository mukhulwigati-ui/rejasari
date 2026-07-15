// components/SubContentList.tsx
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface PostItem {
  title: string;
  slug: string;
  publishedAt?: string;
  mainImage?: any;
  categoryTitle?: string;
}

interface SubContentListProps {
  // Menerima kiriman array data berita dari halaman utama (app/page.tsx)
  posts: PostItem[];
}

// Helper untuk menghitung waktu terbit berita secara dinamis
function timeAgo(dateString?: string) {
  if (!dateString) return "Baru saja";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60000);

  if (diffMins < 60) return `${diffMins <= 0 ? 1 : diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  return past.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export default function SubContentList({ posts }: SubContentListProps) {
  // Fallback jika data kosong atau sedang dimuat dari CMS
  if (!posts || posts.length === 0) {
    return (
      <main className="flex-1 min-w-0 border border-gray-200 rounded-xl bg-white p-5 shadow-sm text-center text-gray-500 text-sm">
        Belum ada berita rekomendasi saat ini.
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 border border-gray-200 rounded-xl bg-white p-5 shadow-sm space-y-4">
      
      {/* Header Segmen */}
      <h3 className="text-sm font-extrabold text-[#0b74b6] border-b pb-2 mb-4 uppercase tracking-wider">
        Berita <span className="text-gray-900">Rekomendasi</span>
      </h3>
      
      {/* =========================================================
         LIST FEED BERITA DINAMIS DARI SANITY
         ========================================================= */}
      <div className="divide-y divide-gray-100">
        {posts.map((news, index) => (
          <div key={news.slug || index} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-start group">
            
            {/* Thumbnail Gambar Berita */}
            <Link href={`/blog/${news.slug}`} className="w-28 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden block relative">
              {news.mainImage ? (
                <img 
                  src={urlFor(news.mainImage).url()} 
                  alt={news.title}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </Link>
            
            {/* Teks Konten Berita */}
            <div className="flex flex-col justify-between min-w-0 flex-1">
              <Link href={`/blog/${news.slug}`}>
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0b74b6] cursor-pointer line-clamp-2 leading-snug transition-colors">
                  {news.title}
                </h4>
              </Link>
              
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-2">
                <span className="text-red-600 font-bold uppercase">
                  {news.categoryTitle || "Nasional"}
                </span>
                <span>•</span>
                <span>{timeAgo(news.publishedAt)}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}