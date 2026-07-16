// app/profil/page.tsx
import React from 'react';

export default function ProfilPage() {
  return (
    // Mengunci induk kontainer terluar dengan max-w-[1200px] mx-auto agar sejajar lurus dengan batas web & navbar
    <div className="w-full max-w-[1200px] mx-auto px-4 font-sans text-gray-800 mt-6 min-h-screen">
      
      {/* =========================================================
         HERO HEADER: DIKUNCI PAS DI DALAM LAYOUT WEB
         ========================================================= */}
      <div className="w-full bg-gradient-to-r from-[#0066ad] to-[#004b80] py-12 text-white text-center rounded-xl shadow-xs">
        <div className="w-full px-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Profil Sekolah</h1>
          <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-[600px] mx-auto font-medium">
            Mengenal lebih dekat SD Negeri 1 Rejasari Purwokerto Barat, tempat mencetak generasi berkarakter dan berprestasi.
          </p>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="max-w-[800px] mx-auto py-10 space-y-8 leading-relaxed">
        
        {/* SECTION 1: SEJARAH & GAMBARAN UMUM (SESUAI DATA GAMBAR ASLI) */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-[#0066ad] pl-3">
            Gambaran Umum
          </h2>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            SD Negeri 1 Rejasari terletak di wilayah yang strategis, di dekat jalan raya dengan fasilitas umum yang lengkap. SD Negeri 1 Rejasari beralamatkan di Jl. Jendral Sudirman Barat RT.01/09 Kecamatan Purwokerto Barat, Kab. Banyumas, Jawa Tengah. SD Negeri 1 Rejasari didirikan pada tanggal 1 April 1985 dengan Nomor SK Pendirian 421.2/026/I/65/85 dengan luas area 2.136 m² yang berada dalam naungan Kementerian Pendidikan dan Kebudayaan.
          </p>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            Karakteristik masyarakatnya masih mengedepankan gotong royong dan solidaritas. Hal itulah yang menjadi salah satu sumber kekuatan sekolah untuk menggandeng mereka dalam berbagai kegiatan. SD Negeri 1 Rejasari memiliki 10 orang pendidik dan tenaga kependidikan yang sudah profesional. 
          </p>
          <p className="text-sm md:text-base text-gray-600 text-justify">
            SD Negeri 1 Rejasari berpredikat Akreditasi A, meskipun demikian, SD Negeri 1 Rejasari terus berbenah dan meningkatkan mutu pendidikan dengan memberikan ruang kebebasan belajar, mendorong kreativitas, serta memperkuat nilai karakter peserta didik serta menyusun program prioritas dari Kemdikdasmen melalui implementasi Kurikulum Merdeka.
          </p>
        </section>

        {/* SECTION 2: IDENTITAS STRUKTURAL FIX */}
        <section className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-3xs">
          <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Identitas Sekolah</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Nama Sekolah</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">SD Negeri 1 Rejasari</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Tanggal Berdiri</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">1 April 1985</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">SK Pendirian</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">421.2/026/I/65/85</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Luas Area</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">2.136 m²</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Total Pendidik & Staf</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">10 Orang</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Kabupaten / Provinsi</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">Banyumas / Jawa Tengah</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Kecamatan</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">Purwokerto Barat</span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium text-xs uppercase tracking-wider">Akreditasi</span>
              <span className="text-green-600 font-extrabold text-sm md:text-base bg-green-50 px-2.5 py-0.5 rounded-md inline-block border border-green-100 mt-0.5">
                A (Sangat Baik)
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}