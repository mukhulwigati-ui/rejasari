// components/SidebarPopuler.tsx
import { client, indexQuery } from "@/lib/sanity";
import Link from "next/link";

interface SidebarPopulerProps {
  isSticky?: boolean;
}

export default async function SidebarPopuler({ isSticky = false }: SidebarPopulerProps) {
  // 1. Ambil data berita dari Sanity CMS
  let posts: any[] = [];
  try {
    posts = await client.fetch<any[]>(indexQuery) || [];
  } catch (error) {
    console.error("Gagal mengambil data populer dari Sanity:", error);
  }

  // 2. Strategi fallback/randomizer jika data populer spesifik belum diset di CMS:
  // Kita acak posisinya (shuffling) lalu ambil 5 berita teratas.
  const trendingList = posts
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  // Fallback text jika database Sanity benar-benar kosong
  if (trendingList.length === 0) {
    return (
      <div className={`w-full lg:w-[300px] shrink-0 border border-gray-200 rounded-xl bg-white p-4 shadow-sm ${isSticky ? 'sticky top-4' : ''}`}>
        <h3 className="text-base font-black text-gray-900 border-l-4 border-red-600 pl-2 mb-4 uppercase tracking-wide">
          POPULER
        </h3>
        <p className="text-xs text-gray-400 italic">Belum ada berita populer saat ini.</p>
      </div>
    );
  }

  return (
    // Jika isSticky bernilai true, dia akan menempel di layar pas scroll
    <div className={`w-full lg:w-[300px] shrink-0 border border-gray-200 rounded-xl bg-white p-4 shadow-sm ${isSticky ? 'sticky top-4' : ''}`}>
      <h3 className="text-base font-black text-gray-900 border-l-4 border-red-600 pl-2 mb-4 uppercase tracking-wide">
        POPULER
      </h3>
      <div className="space-y-4">
        {trendingList.map((item, index) => (
          <div key={item.slug || index} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none last:pb-0 group cursor-pointer">
            {/* Nomor Urut Populer */}
            <span className="text-3xl font-black text-gray-200 italic w-8 text-center leading-none group-hover:text-[#0b74b6] transition-colors shrink-0">
              {index + 1}
            </span>
            
            {/* Judul Berita Dinamis dengan Navigasi Link Next.js */}
            <Link href={`/blog/${item.slug}`} className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 group-hover:text-[#0066ad] line-clamp-2 leading-normal transition-colors">
                {item.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}