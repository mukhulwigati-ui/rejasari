// app/page.tsx
import NewsHighlights from "@/components/NewsHighlights";
// PERBAIKAN UBAH NAMA VARIABEL ALIAS: Agar penulisan komponen di bawah lebih pas dan informatif
import SidebarSlideshow from "@/components/SidebarSlideshow"; 
import LeftIklan from "@/components/LeftIklan";
import MainHeadline from "@/components/MainHeadline";
import SidebarIklan from "@/components/SidebarIklan";
import SubContentList from "@/components/SubContentList"; // KITA KEMBALIKAN DI SINI
import SidebarPopuler from "@/components/SidebarPopuler";
import PhotoAndNewsList from "@/components/PhotoAndNewsList"; // Postingan Terbaru
// PERBAIKAN: Import terbarunya lengkap dari lib/sanity
import { client, indexQuery, highlightCategoryQuery, slideshowQuery } from "@/lib/sanity"; 

// =========================================================
// Interface Lengkap untuk Mengatasi Error TypeScript youtubeUrl
// =========================================================
interface NewsItem {
  title: string;
  slug: string;
  publishedAt?: string;
  mainImage?: any;
  youtubeUrl?: string; // Tipe data didaftarkan agar kompilasi Turbopack aman dan sukses
  categoryTitle?: string;
}

export default async function HomePage() {
  // 1. Ambil seluruh data daftar artikel dari Sanity CMS secara real-time dengan casting tipe data
  const allPosts = await client.fetch<NewsItem[]>(indexQuery);

  // 2. Ambil data kategori highlight (Hasil query berupa objek langsung)
  const activeHighlight = await client.fetch(highlightCategoryQuery);

  // 3. Ambil data banner slideshow dari database Sanity Studio
  const slideData = await client.fetch(slideshowQuery) || [];

  // 4. Pisahkan 5 berita teratas untuk komponen MainHeadline (1 utama besar, 4 grid kecil)
  const headlinePosts = allPosts?.slice(0, 5) || [];
  
  // 5. PILAH DATA UNTUK REKOMENDASI (SubContentList)
  // Kita ambil indeks ke-5 sampai ke-8 untuk masuk ke seksi rekomendasi tengah
  const rekomendasiPosts = allPosts?.slice(5, 9) || [];

  // 6. ALIRKAN SISA POSTINGAN UNTUK POSTINGAN TERBARU (PhotoAndNewsList)
  // Kita alirkan sisa data atau allPosts secara fleksibel agar seksi bawah tidak kosong
  const subPosts = allPosts || [];

  return (
    // PERBAIKAN UTAMA: Mencabut komponen <Header /> karena sudah di-render otomatis secara bersih oleh app/layout.tsx
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-6 space-y-6 pb-12">
      
      {/* =========================================================
          SEGMEN ATAS: FIXED FLEX LAYOUT (LEBAR SIDEBAR LURUS 300px)
          ========================================================= */}
      <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
        
        {/* Bagian Kiri & Tengah: Berita Highlights melar penuh otomatis */}
        <div className="flex-1 min-w-0">
          <NewsHighlights highlightData={activeHighlight} />
        </div>

        {/* Bagian Kanan: DIKUNCI 300px */}
        <div className="w-full lg:w-[300px] shrink-0">
          <SidebarSlideshow slides={slideData} />
        </div>

      </div>

      {/* =========================================================
          SEGMEN BAWAH: TIGA JALUR VERTIKAL MANDIRI (DUAL STICKY FIXED)
          ========================================================= */}
      <div className="flex flex-col lg:flex-row gap-4 w-full relative">
        
        {/* KOLOM 1: KIRI (Jalur Iklan 160px - Sticky) */}
        <div className="w-[160px] shrink-0 hidden lg:block">
          <div className="sticky top-20">
            <LeftIklan isSticky={true} />
          </div> 
        </div>

        {/* KOLOM 2: TENGAH (Aliran Konten Berita Panjang) */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Kirim 5 data teratas ke komponen MainHeadline */}
          <MainHeadline posts={headlinePosts} />
          
          {/* =========================================================
              FITUR DIKEMBALIKAN: SubContentList (Rekomendasi Berita)
              ========================================================= */}
          {rekomendasiPosts.length > 0 && (
            <SubContentList posts={rekomendasiPosts} />
          )}
          
          {/* =========================================================
              SEKSI: POSTINGAN TERBARU (PhotoAndNewsList)
              ========================================================= */}
          <PhotoAndNewsList posts={subPosts} />
        </div>

        {/* KOLOM 3: KANAN (Jalur Kumpulan Widget Sidebar - Sticky Populer) */}
        <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6">
          {/* Muncul normal di atas, akan hilang saat di-scroll */}
          <SidebarIklan />
          
          {/* Mengunci otomatis mengikuti tinggi area konten tengah */}
          <div className="w-full sticky top-20">
            <SidebarPopuler isSticky={false} /> 
          </div>
        </div>

      </div>

    </div>
  );
}