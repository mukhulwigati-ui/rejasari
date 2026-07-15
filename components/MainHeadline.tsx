// components/MainHeadline.tsx
'use client';

import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface PostData {
  title: string;
  slug: string;
  publishedAt?: string;
  mainImage?: any;
  youtubeUrl?: string;
  categoryTitle?: string;
}

interface MainHeadlineProps {
  posts: PostData[];
}

// FUNGSI PAMUNGKAS: Ekstraksi ID Youtube (Mendukung watch, shorts, embed, & mobile)
function getYoutubeThumbnail(url?: string): string | null {
  if (!url) return null;
  
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const shortsRegExp = /shorts\/([a-zA-Z0-9_-]{11})/;
  
  const match = url.match(regExp);
  const shortsMatch = url.match(shortsRegExp);
  
  const videoId = (match && match[7].length === 11) ? match[7] : (shortsMatch ? shortsMatch[1] : null);
  
  if (videoId) {
    // Menggunakan i.ytimg.com (lebih cepat & stabil)
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

export default function MainHeadline({ posts }: MainHeadlineProps) {
  if (!posts || posts.length === 0) {
    return (
      <main className="flex-1 min-w-0 border border-gray-200 rounded-xl bg-white p-5 shadow-sm text-center text-gray-500 text-sm">
        Memuat berita utama...
      </main>
    );
  }

  const topPost = posts[0];
  const gridPosts = posts.slice(1, 5);

  const topPostSanityImg = getSanityImageUrl(topPost.mainImage);
  const topPostYoutubeImg = getYoutubeThumbnail(topPost.youtubeUrl);
  // Fallback ke placeholder jika dua-duanya kosong
  const topPostFinalSrc = topPostSanityImg || topPostYoutubeImg || "https://placehold.co/600x400?text=No+Image";

  return (
    <main className="flex-1 min-w-0 border border-gray-200 rounded-xl bg-white p-5 shadow-sm space-y-6">
      
      {topPost && (
        <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-gray-200 group">
          <div className="flex-1 min-w-0 space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
              {topPost.categoryTitle || "Topik Utama"}
            </span>
            <Link href={`/blog/${topPost.slug}`}>
              <h2 className="text-2xl md:text-[28px] font-medium font-serif text-gray-800 leading-tight hover:underline transition-all cursor-pointer decoration-gray-400 decoration-1 underline-offset-4">
                {topPost.title}
              </h2>
            </Link>
          </div>
          
          <Link href={`/blog/${topPost.slug}`} className="w-full md:w-[62%] aspect-[16/11] bg-gray-100 rounded-xl overflow-hidden shrink-0 block relative border border-gray-100 shadow-inner">
            <img 
              src={topPostFinalSrc} 
              alt={topPost.title} 
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Format+Error";
              }}
            />
            
            {/* Tombol Play Besar */}
            {topPost.youtubeUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            )}
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {gridPosts.map((post, index) => {
          const postSanityImg = getSanityImageUrl(post.mainImage);
          const postYoutubeImg = getYoutubeThumbnail(post.youtubeUrl);
          const postFinalSrc = postSanityImg || postYoutubeImg || "https://placehold.co/200x150?text=No+Image";

          return (
            <div key={post.slug || index} className="flex gap-3 min-w-0 items-start group justify-between">
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                  {post.categoryTitle || "Nasional"}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-medium text-sm text-gray-800 line-clamp-3 group-hover:text-[#0b74b6] transition-colors cursor-pointer leading-snug">
                    {post.title}
                  </h3>
                </Link>
              </div>

              <Link href={`/blog/${post.slug}`} className="w-24 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden block border border-gray-100 shadow-sm relative">
                <img 
                  src={postFinalSrc} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/200x150?text=Error";
                  }}
                />
                {post.youtubeUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <div className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}