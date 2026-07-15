// components/PhotoAndNewsList.tsx
'use client';

import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface NewsItem {
  title: string;
  slug: string;
  publishedAt?: string;
  mainImage?: any;
  youtubeUrl?: string; // Ditambahkan untuk melacak link youtube
  categoryTitle?: string;
}

interface PhotoAndNewsListProps {
  posts: NewsItem[];
}

// UTILITY 1: Ambil thumbnail YouTube secara aman
function getYoutubeThumbnail(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const shortsRegExp = /shorts\/([a-zA-Z0-9_-]{11})/;
  
  const match = url.match(regExp);
  const shortsMatch = url.match(shortsRegExp);
  
  const videoId = (match && match[7].length === 11) ? match[7] : (shortsMatch ? shortsMatch[1] : null);
  
  if (videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

// UTILITY 2: Ambil gambar Sanity secara aman
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

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

export default function PhotoAndNewsList({ posts }: PhotoAndNewsListProps) {
  const hasPosts = posts && posts.length > 0;

  // Mengambil 2 berita pertama dari prop posts yang tersedia
  const photoPosts = hasPosts ? posts.slice(0, 2) : [];
  // Sisa berita setelah 2 teratas
  const listNews = hasPosts ? posts.slice(2) : [];

  return (
    <div className="flex-1 min-w-0 border border-gray-200 rounded-xl bg-white p-5 shadow-sm space-y-6">
      
      {/* =========================================================
          SEKSI A: POSTINGAN TERBARU (GRID 2 KOLOM)
          ========================================================= */}
      <div>
        <h3 className="text-sm font-bold text-red-600 border-b pb-2 mb-4 flex items-center gap-2">
          Postingan <span className="text-gray-900">Terbaru</span>
        </h3>
        
        {!hasPosts ? (
          <p className="text-xs text-gray-400 italic">Belum ada postingan terbaru tambahan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {photoPosts.map((post, idx) => {
              const sanityImg = getSanityImageUrl(post.mainImage);
              const youtubeImg = getYoutubeThumbnail(post.youtubeUrl);
              const finalSrc = sanityImg || youtubeImg || "https://placehold.co/600x400?text=No+Image";

              return (
                <div key={post.slug || idx} className="space-y-2 group cursor-pointer">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-100 shadow-xs">
                      <img 
                        src={finalSrc} 
                        alt={post.title}
                        className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Error";
                        }}
                      />
                      {post.youtubeUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow">
                            <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="text-xs font-bold text-[#0b74b6] group-hover:underline leading-snug line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================
          SEKSI B: LIST BERITA ALIRAN (GAMBAR DI SISI KANAN)
          ========================================================= */}
      {listNews.length > 0 && (
        <div className="divide-y divide-gray-100 border-t pt-4">
          {listNews.map((news, idx) => {
            const sanityImg = getSanityImageUrl(news.mainImage);
            const youtubeImg = getYoutubeThumbnail(news.youtubeUrl);
            const finalSrc = sanityImg || youtubeImg || "https://placehold.co/200x150?text=No+Image";

            return (
              <div key={news.slug || idx} className="flex gap-4 py-4 first:pt-0 last:pb-0 justify-between items-start group cursor-pointer">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <span className="text-[10px] font-bold text-red-600 block leading-none">
                    {news.categoryTitle || "Umum"}
                  </span>
                  <Link href={`/blog/${news.slug}`}>
                    <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0b74b6] line-clamp-2 leading-snug transition-colors">
                      {news.title}
                    </h4>
                  </Link>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span className="font-semibold text-gray-500">{news.categoryTitle || "Umum"}</span>
                    <span>•</span>
                    <span>{timeAgo(news.publishedAt)}</span>
                  </div>
                </div>
                
                <Link href={`/blog/${news.slug}`} className="w-24 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden block relative border border-gray-150">
                  <img 
                    src={finalSrc} 
                    alt={news.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/200x150?text=Error";
                    }}
                  />
                  {news.youtubeUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xs">
                        <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-4 text-center border-t border-gray-100">
        <button className="border border-gray-300 px-4 py-1.5 rounded text-xs font-bold text-gray-600 hover:bg-gray-50 bg-white transition-colors">
          Indeks Berita
        </button>
      </div>

    </div>
  );
}