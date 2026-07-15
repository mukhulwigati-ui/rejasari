// lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// =========================================================
// 1. KONFIGURASI CLIENT SANITY (DENGAN DUKUNGAN MUTASI AMAN)
// =========================================================
export const client = createClient({
  projectId: 'ww6prabc', // ID project Sanity Anda
  dataset: 'production',
  apiVersion: '2026-07-14', // Menggunakan standar tanggal (14 Juli 2026)
  useCdn: false, // Set ke false agar berita yang baru ditulis di CMS langsung muncul secara real-time tanpa delay cache
  
  // PERBAIKAN: Menambahkan token API agar Next.js diizinkan melakukan bypass read-only 
  // saat ada component/action yang melakukan write/patch data ke Sanity Studio.
  token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});

// =========================================================
// 2. UTILITY HELPER UNTUK MENGUBAH OBJEK GAMBAR SANITY MENJADI URL STRING
// =========================================================
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

// =========================================================
// 3. DAFTAR QUERY GROQ UNTUK MENGAMBIL DATA KONTEN PORTAL
// =========================================================

// A. Query untuk daftar berita di halaman utama (Beranda)
export const indexQuery = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  author,
  mainImage,
  youtubeUrl, // PERBAIKAN: Wajib ditarik agar komponen MainHeadline/SubContentList bisa baca data video
  "categoryTitle": category->title
}`;

// B. Query untuk isi detail berita berdasarkan slug di halaman /blog/[slug]
export const postDetailQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  category->{
    title,
    isHighlight
  },
  publishedAt,
  author,
  editor,
  mainImage,
  youtubeUrl, // PERBAIKAN: Ditambahkan juga di halaman detail jika nanti ingin merender video player embedded
  summary,
  body
}`;

// C. Query untuk boks slider biru "Topik Pilihan" (NewsHighlights)
export const highlightCategoryQuery = `*[_type == "category" && isHighlight == true][0] {
  title,
  "posts": *[_type == "post" && (category._ref == ^._id || category._ref == "drafts." + ^._id || references(^._id))] | order(publishedAt desc)[0..1] {
    title,
    "slug": slug.current,
    mainImage,
    youtubeUrl // PERBAIKAN: Ditambahkan agar boks slider atas bisa memunculkan thumbnail otomatis dari YouTube
  }
}`;

// D. Query untuk mengambil data manajemen iklan (kiri, tengah, kanan, 300x600) secara dinamis
// PERBAIKAN: Ditambahkan kondisi OR (||) untuk mencakup dokumen berstatus draft di studio agar ter-render aman
export const adsQuery = `*[_type == "iklan" && (placement == $placement || placement == "drafts." + $placement)][0] {
  title,
  image,
  linkUrl,
  placement
}`;

// E. Query untuk Mengambil Gambar Slideshow Banner Utama
export const slideshowQuery = `*[_type == "slideshow" && isActive == true] | order(order asc) {
  title,
  image,
  linkUrl
}`;

// F. Query Khusus untuk Mengambil Data Postingan Terbaru Komponen Bawah
// Mengambil 10 postingan teranyar lengkap dengan youtubeUrl dan nama kategori pembungkusnya
export const terbaruQuery = `*[_type == "post"] | order(publishedAt desc)[0..9] {
  title,
  "slug": slug.current,
  publishedAt,
  author,
  mainImage,
  youtubeUrl,
  "categoryTitle": category->title
}`;