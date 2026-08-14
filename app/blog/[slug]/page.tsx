// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import LeftIklan from "@/components/LeftIklan";
import SidebarIklan from "@/components/SidebarIklan";
import SidebarPopuler from "@/components/SidebarPopuler";
import { client, postDetailQuery, indexQuery, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { 
  FaThumbsUp, 
  FaThumbsDown, 
  FaFacebook, 
  FaWhatsapp, 
  FaTelegram, 
  FaBookmark 
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// UTILITY 1: Ekstraksi ID video YouTube untuk embed player & thumbnail otomatis
function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const shortsRegExp = /shorts\/([a-zA-Z0-9_-]{11})/;
  
  const match = url.match(regExp);
  const shortsMatch = url.match(shortsRegExp);
  
  return (match && match[7].length === 11) ? match[7] : (shortsMatch ? shortsMatch[1] : null);
}

// UTILITY 2: Proteksi konversi asset image Sanity agar server tidak crash jika file kosong
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

// UTILITY 3: Penghitung selisih waktu terbit berita (timeago)
function timeAgo(dateString?: string) {
  if (!dateString) return "Baru saja";
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 3600000);

  if (diffMins < 60) return `${diffMins <= 0 ? 1 : diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  return past.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) + " WIB";
}

// =========================================================
// OPTIMASI SEO TINGKAT TINGGI & GENERATE METADATA DINAMIS MEDSOS
// =========================================================
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const article = await client.fetch(postDetailQuery, { slug: params.slug });

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | SDN 1 Rejasari",
      description: "Halaman berita atau artikel yang Anda cari tidak ditemukan di basis data SDN 1 Rejasari Purwokerto Barat.",
    };
  }

  // Resolusi Gambar Utama Artikel untuk Media Sosial & Google Indexing
  const sanityImg = getSanityImageUrl(article.mainImage);
  const youtubeId = getYoutubeId(article.youtubeUrl);
  const youtubeThumb = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;
  const shareImage = sanityImg || youtubeThumb || "https://sdn1rejasari.web.id/images/banner.png";

  const canonicalUrl = `https://sdn1rejasari.web.id/blog/${params.slug}`;
  const descriptionText = article.summary?.[0] || article.title;

  return {
    metadataBase: new URL("https://sdn1rejasari.web.id"),
    title: `${article.title} | SDN 1 Rejasari Purwokerto Barat`,
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: article.author || "Redaksi SDN 1 Rejasari" }],
    keywords: [
      article.title,
      article.category?.title || "Berita Sekolah",
      "SDN 1 Rejasari",
      "Purwokerto Barat",
      "Kegiatan Sekolah Dasar Banyumas"
    ],
    
    // OPEN GRAPH METADATA (WHATSAPP, FACEBOOK, TELEGRAM, LINKEDIN)
    openGraph: {
      title: article.title,
      description: descriptionText,
      url: canonicalUrl,
      siteName: "SDN 1 Rejasari Purwokerto Barat",
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author || "Redaksi SDN 1 Rejasari"],
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },

    // TWITTER / X CARD METADATA
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: descriptionText,
      images: [shareImage],
    },
  };
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params;
  const article = await client.fetch(postDetailQuery, { slug: params.slug });

  // Mengambil daftar berita terkini lainnya dari Sanity
  const allPosts = await client.fetch<any[]>(indexQuery) || [];

  if (!article) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-gray-500 font-semibold text-sm bg-white border border-gray-200 px-6 py-4 rounded-xl shadow-xs">
          Artikel tidak ditemukan di CMS database.
        </p>
      </div>
    );
  }

  // RESOLUSI MEDIA UTAMA ARTIKEL
  const sanityImg = getSanityImageUrl(article.mainImage);
  const youtubeId = getYoutubeId(article.youtubeUrl);
  const youtubeThumb = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;
  const finalImageSrc = sanityImg || youtubeThumb || "https://placehold.co/800x500?text=No+Image";

  // FILTER DATA BERITA TERKAIT: Saring artikel berkategori sejenis (maksimal 5 item)
  const beritaTerkait = allPosts
    .filter((p) => p.slug !== params.slug && p.categoryTitle === article.category?.title)
    .slice(0, 5);

  // Fallback terkait jika data kosong
  const fallbackTerkait = beritaTerkait.length > 0 
    ? beritaTerkait 
    : allPosts.filter((p) => p.slug !== params.slug).slice(0, 5);

  // DATA BERITA TERKINI: 6 Artikel terbaru
  const beritaTerkini = allPosts.filter((p) => p.slug !== params.slug).slice(0, 6);

  // JSON-LD STRUCTURED DATA UNTUK GOOGLE RICH RESULTS & NEWS INDEXING
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [finalImageSrc],
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": [{
      "@type": "Person",
      "name": article.author || "Redaksi SDN 1 Rejasari"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "SDN 1 Rejasari Purwokerto Barat",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sdn1rejasari.web.id/images/logo-sdn.png"
      }
    },
    "description": article.summary?.[0] || article.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://sdn1rejasari.web.id/blog/${params.slug}`
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-4 pb-12">
      
      {/* SCHEMA.ORG JSON-LD INJECTION UNTUK GOOGLE BOT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* =========================================================
          STRUKTUR UTAMA RESPONSIF: KONTEN KIRI-TENGAH & SIDEBAR KANAN 300px
          ========================================================= */}
      <div className="flex flex-col lg:flex-row gap-6 w-full relative items-start">
        
        {/* AREA ALIRAN UTAMA KIRI & TENGAH (Lebar Fleksibel Mengisi Sisa Ruang) */}
        <div className="flex-1 min-w-0 space-y-4">
          
          {/* BREADCRUMB PANAH LANCIP (ARROW STYLE) */}
          <div className="w-full bg-[#f6f6f6] border border-gray-200 flex items-stretch text-[11px] h-7 rounded-xs select-none overflow-hidden font-sans">
            {/* Item 1: Home */}
            <Link 
              href="/" 
              className="bg-[#0066ad] text-white flex items-center pl-4 pr-6 font-bold hover:bg-[#005596] transition-colors relative z-30
                         after:content-[''] after:absolute after:top-0 after:right-0 after:translate-x-full after:z-30
                         after:border-t-[14px] after:border-t-transparent after:border-b-[14px] after:border-b-transparent 
                         after:border-l-[10px] after:border-l-[#0066ad] hover:after:border-l-[#005596]"
            >
              Home
            </Link>
            
            {/* Item 2: Regional/Blog */}
            <Link 
              href="/" 
              className="bg-[#5ca2df] text-white flex items-center pl-7 pr-6 font-semibold hover:bg-[#4a91ce] transition-colors relative z-10
                         before:content-[''] before:absolute before:top-0 before:left-0 before:border-t-[14px] before:border-t-transparent before:border-b-[14px] before:border-b-transparent before:border-l-[10px] before:border-l-[#f6f6f6]
                         after:content-[''] after:absolute after:top-0 after:right-0 after:translate-x-full after:z-20
                         after:border-t-[14px] after:border-t-transparent after:border-b-[14px] after:border-b-transparent 
                         after:border-l-[10px] after:border-l-[#5ca2df] hover:after:border-l-[#4a91ce]"
            >
              Blog
            </Link>
            
            {/* Item 3: Nama Kategori Dinamis */}
            <span 
              className="bg-[#d2e5f5] text-[#0066ad] flex items-center pl-7 pr-6 font-medium relative z-0
                         before:content-[''] before:absolute before:top-0 before:left-0 before:border-t-[14px] before:border-t-transparent before:border-b-[14px] before:border-b-transparent before:border-l-[10px] before:border-l-[#f6f6f6]
                         after:content-[''] after:absolute after:top-0 after:right-0 after:translate-x-full after:z-10
                         after:border-t-[14px] after:border-t-transparent after:border-b-[14px] after:border-b-transparent 
                         after:border-l-[10px] after:border-l-[#d2e5f5]"
            >
              {article.category?.title || "Artikel"}
            </span>
          </div>

          {/* BOX UTAMA WADAH ARTIKEL */}
          <main className="w-full border border-gray-200 rounded-xl bg-white shadow-3xs space-y-6">
            
            {/* PADDING ATAS: Hanya untuk area judul dan media */}
            <div className="p-4 md:p-6 pb-0 space-y-6">
              {/* Kategori Berita Redaksi & Judul Utama */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide block">
                  {article.category?.title || "BERITA TERKINI"}
                </span>
                <h1 className="text-2xl md:text-[32px] font-medium font-serif text-gray-800 leading-tight tracking-normal">
                  {article.title}
                </h1>
              </div>

              {/* Metadata Penulis & Tanggal */}
              <div className="text-xs text-gray-400 space-y-1 border-b border-gray-100 pb-4">
                <p>Tayang: <span className="text-gray-500 font-normal">{formatDate(article.publishedAt)}</span></p>
                <p>
                  Penulis: <span className="text-[#0b74b6] font-medium hover:underline cursor-pointer">{article.author || "Redaksi"}</span> 
                  {article.editor && (
                    <> | Editor: <span className="text-[#0b74b6] font-medium hover:underline cursor-pointer"> {article.editor}</span></>
                  )}
                </p>
              </div>

              {/* Social Share Icon Bar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-gray-400 text-sm overflow-x-auto gap-2">
                <div className="flex items-center gap-5 shrink-0">
                  <button className="flex items-center gap-1 hover:text-[#0b74b6] text-base cursor-pointer"><FaThumbsUp /></button>
                  <button className="flex items-center gap-1 hover:text-red-600 text-base cursor-pointer"><FaThumbsDown /></button>
                  <button className="hover:text-gray-800 text-base cursor-pointer"><RiTwitterXFill /></button>
                  <button className="hover:text-blue-600 text-base cursor-pointer"><FaFacebook /></button>
                  <button className="hover:text-green-500 text-base cursor-pointer"><FaWhatsapp /></button>
                  <button className="hover:text-blue-400 text-base cursor-pointer"><FaTelegram /></button>
                  <button className="hover:text-gray-800 text-base cursor-pointer"><BiCommentDetail /></button>
                </div>
                <button className="hover:text-[#0b74b6] text-base shrink-0 cursor-pointer"><FaBookmark /></button>
              </div>

              {/* KONDISIONAL MEDIA: DETEKSI VIDEO YOUTUBE EMBED VS GAMBAR NORMAL */}
              {article.youtubeUrl && youtubeId ? (
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-md">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${youtubeId}`} title={article.title} frameBorder="0" allowFullScreen></iframe>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full aspect-[16/10] bg-gray-200 rounded-xl overflow-hidden relative border border-gray-100 shadow-inner">
                    <img src={finalImageSrc} alt={article.title} className="w-full h-full object-cover object-center" />
                    <button className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] md:text-xs px-2 py-1 rounded-xs">🔍 lihat foto</button>
                  </div>
                </div>
              )}
            </div>

            {/* AREA BAWAH GAMBAR: Iklan Sticky 160px di Kiri & Paragraf Artikel di Kanan */}
            <div className="flex flex-col md:flex-row w-full items-start pt-2 px-4 md:px-6">
              
              {/* KOLOM IKLAN 160px STICKY */}
              <div className="w-[160px] shrink-0 hidden md:block sticky top-20 mr-6 pb-6">
                <LeftIklan isSticky={true} />
              </div>

              {/* AREA TULISAN INTI & RINGKASAN */}
              <div className="flex-1 min-w-0 space-y-6">
                {/* Boks Ringkasan Poin Biru */}
                {article.summary && article.summary.length > 0 && (
                  <div className="border-l-[4px] border-l-[#0b74b6] bg-blue-50/30 rounded-r-xl p-4 md:p-5 space-y-3 shadow-inner">
                    <h3 className="text-xs font-extrabold text-[#0b74b6] uppercase tracking-wider">Ringkasan Berita:</h3>
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-2 leading-relaxed pl-1">
                      {article.summary.map((item: string, idx: number) => <li key={idx}><span className="inline pl-1">{item}</span></li>)}
                    </ul>
                  </div>
                )}

                {/* Render Rich Text Editor Body dari Sanity CMS */}
                <div className="text-sm md:text-base text-gray-800 leading-relaxed space-y-4 prose prose-blue max-w-none pb-8">
                  <PortableText value={article.body} />
                </div>
              </div>
            </div>

            {/* =========================================================
                TIGA SEKSI BAWAH LEBAR PENUH (MELINTANG DI BAWAH ARTIKEL + IKLAN KIRI)
                ========================================================= */}
            <div className="w-full border-t border-gray-150 p-4 md:p-6 space-y-8 bg-white rounded-b-xl">
              
              {/* SEKSI 1: BERITA TERKAIT */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0b74b6] border-b-2 border-b-[#0b74b6] pb-1.5 w-max flex items-center gap-1.5 uppercase">
                  Berita <span className="text-red-600">Terkait</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {fallbackTerkait.map((item, idx) => {
                    const itemFinalSrc = getSanityImageUrl(item.mainImage) || (getYoutubeId(item.youtubeUrl) ? `https://i.ytimg.com/vi/${getYoutubeId(item.youtubeUrl)}/hqdefault.jpg` : null) || "https://placehold.co/150x110?text=No+Image";
                    return (
                      <div key={item.slug || idx} className="space-y-1.5 cursor-pointer flex flex-col group justify-between">
                        <Link href={`/blog/${item.slug}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden border border-gray-150">
                          <img src={itemFinalSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                          {item.youtubeUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <div className="w-6 h-6 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-xs">
                                <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              </div>
                            </div>
                          )}
                        </Link>
                        <Link href={`/blog/${item.slug}`}>
                          <h4 className="text-[11px] font-semibold text-[#0066ad] group-hover:underline transition-colors leading-snug line-clamp-3">
                            {item.title}
                          </h4>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SEKSI 2: FORM KIRIM KOMENTAR */}
              <div className="space-y-3 pt-6 border-t border-gray-150">
                <h3 className="text-sm font-bold text-[#0b74b6] border-b-2 border-b-[#0b74b6] pb-1.5 w-max flex items-center gap-1.5 uppercase">Kirim <span className="text-red-600">Komentar</span></h3>
                <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-200">
                  <textarea rows={3} placeholder="Tulis komentar Anda..." className="w-full text-xs p-3 border border-gray-300 rounded-lg resize-none font-sans outline-none focus:border-[#0b74b6] transition-colors"></textarea>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-gray-400 italic">Isi komentar sepenuhnya menjadi tanggung jawab pengguna dan diatur dalam UU ITE.</p>
                    <button className="bg-[#0b74b6] text-white text-[11px] font-bold px-5 py-1.5 rounded-md uppercase cursor-pointer hover:bg-[#005596] transition-colors">Kirim</button>
                  </div>
                </div>
              </div>

              {/* SEKSI 3: DAFTAR BERITA TERKINI */}
              <div className="space-y-4 pt-6 border-t border-gray-150">
                <h3 className="text-sm font-bold text-[#0b74b6] border-b-2 border-b-[#0b74b6] pb-1.5 w-max flex items-center gap-1.5 uppercase">Berita <span className="text-red-600">Terkini</span></h3>
                <div className="divide-y divide-gray-100">
                  {beritaTerkini.map((news, idx) => {
                    const newsFinalSrc = getSanityImageUrl(news.mainImage) || (getYoutubeId(news.youtubeUrl) ? `https://i.ytimg.com/vi/${getYoutubeId(news.youtubeUrl)}/hqdefault.jpg` : null) || "https://placehold.co/200x150?text=No+Image";
                    return (
                      <div key={news.slug || idx} className="flex gap-4 py-4 justify-between items-start group cursor-pointer">
                        <div className="flex-1 space-y-1.5">
                          <Link href={`/blog/${news.slug}`}>
                            <h4 className="font-semibold text-sm text-[#0066ad] group-hover:underline line-clamp-2 leading-snug transition-colors">{news.title}</h4>
                          </Link>
                          <div className="text-[11px] text-gray-500 flex items-center gap-1.5 font-sans">
                            <span className="font-bold text-red-600 uppercase tracking-wide">{news.categoryTitle || "Umum"}</span>
                            <span className="text-gray-300">•</span>
                            <span>{timeAgo(news.publishedAt)}</span>
                          </div>
                        </div>
                        
                        <Link href={`/blog/${news.slug}`} className="w-40 h-24 bg-gray-100 shrink-0 overflow-hidden relative border border-gray-150 block">
                          <img src={newsFinalSrc} alt={news.title} className="w-full h-full object-cover" />
                          {news.youtubeUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xs">
                                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                              </div>
                            </div>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </main>
        
        </div>

        {/* KOLOM KANAN GLOBAL: Sidebar 300px */}
        <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6 sticky top-20 pb-12">
          <SidebarIklan />
          <SidebarPopuler />
        </div>

      </div>

    </div>
  );
}