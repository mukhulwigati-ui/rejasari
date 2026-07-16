// app/search/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { client, urlFor } from "@/lib/sanity";
import Link from 'next/link';

// UTILITY: Ambil gambar Sanity secara aman
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

// HELPER: Format tanggal ringkas ala Google
function formatGoogleDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Ambil hasil pencarian langsung berdasarkan query parameter URL global
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!queryParam.trim()) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const groqQuery = `*[_type == "post" && (title match $keyword || body match $keyword)] | order(publishedAt desc) {
          title,
          slug,
          image,
          publishedAt,
          excerpt
        }`;
        
        const data = await client.fetch(groqQuery, { keyword: `*${queryParam}*` });
        setResults(data);
      } catch (error) {
        console.error("Gagal memuat hasil pencarian:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [queryParam]);

  return (
    // PERBAIKAN UTAMA: Mengubah bg menjadi gray-50/50 lembut dan menambahkan padding atas-bawah yang ideal
    <main className="w-full bg-white min-h-screen py-8 font-sans text-gray-900 selection:bg-blue-100">
      {/* PERBAIKAN UTAMA: Mengunci batas kolom dengan max-w-[1200px] dan px-4/md:px-6 agar posisinya sejajar lurus dengan Logo & Navbar */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        
        {/* SECTION 1: STATS BAR HASIL PENCARIAN (ALA GOOGLE) */}
        {queryParam && !loading && (
          <div className="text-sm text-gray-500 font-normal mb-6 border-b border-gray-100 pb-3">
            Sekitar {results.length} hasil pencarian untuk <span className="font-semibold text-gray-800">"{queryParam}"</span>
          </div>
        )}

        {/* KOLOM PEMBATAS HASIL (Sama dengan ukuran kolom utama Google Search agar tidak meluber lebar) */}
        <div className="max-w-[736px] w-full">

          {/* LOADING STATE */}
          {loading && (
            <div className="space-y-6 py-2 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="max-w-[650px]">
                  <div className="h-3 bg-gray-100 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          )}

          {/* EMPTY STATE (KATA KUNCI TIDAK COCOK) */}
          {!loading && queryParam && results.length === 0 && (
            <div className="py-6 text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">Penelusuran Anda - <span className="font-bold">"{queryParam}"</span> - tidak cocok dengan dokumen berita apa pun.</p>
              <p className="text-gray-500 mt-5 font-bold">Saran:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-500">
                <li>Pastikan semua kata dieja dengan benar.</li>
                <li>Coba kata kunci lain yang lebih umum.</li>
                <li>Coba gunakan kata kunci yang lebih sedikit.</li>
              </ul>
            </div>
          )}

          {/* LIST HASIL BERITA ELEGAN ALA GOOGLE SEARCH */}
          {!loading && results.length > 0 && (
            <div className="space-y-8">
              {results.map((item, idx) => {
                const itemImg = getSanityImageUrl(item.image);
                return (
                  <div key={idx} className="max-w-[650px] font-sans group">
                    
                    {/* Breadcrumb URL navigasi mini */}
                    <div className="text-[12px] text-gray-600 truncate mb-0.5 flex items-center gap-1.5 tracking-wide">
                      <span className="font-medium text-gray-700">Portal Sekolah</span>
                      <span className="text-gray-400 text-[10px]">›</span>
                      <span className="text-gray-500 truncate">berita</span>
                    </div>

                    {/* Judul Berita (Link Biru Standard Google) */}
                    <Link href={`/berita/${item.slug?.current || '#'}`}>
                      <h2 className="text-[19px] md:text-xl font-medium text-[#1a0dab] group-hover:underline cursor-pointer leading-tight mb-1">
                        {item.title}
                      </h2>
                    </Link>

                    {/* Snippet deskripsi berita + Thumbnail Gambar di Kanan */}
                    <div className="flex gap-4 items-start mt-1">
                      <div className="flex-1 text-[14px] text-gray-600 leading-relaxed font-normal">
                        {item.publishedAt && (
                          <span className="text-gray-400 text-[13px] mr-1.5 whitespace-nowrap after:content-['_-']">
                            {formatGoogleDate(item.publishedAt)}
                          </span>
                        )}
                        {item.excerpt || "Klik tautan di atas untuk membaca berita selengkapnya mengenai informasi liputan kegiatan sekolah hari ini."}
                      </div>

                      {itemImg && (
                        <div className="w-[92px] h-[68px] md:w-[104px] md:h-[76px] shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 relative mt-0.5 shadow-2xs">
                          <img 
                            src={itemImg} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}