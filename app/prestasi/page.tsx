// app/prestasi/page.tsx
import React from 'react';
// PERBAIKAN: Mengubah FaUserGraduation menjadi FaUserGraduate agar tidak terjadi Build Error
import { FaTrophy, FaCalendarAlt, FaUserGraduate, FaMedal } from 'react-icons/fa';
import { client, urlFor } from "@/lib/sanity";

// Interface untuk mengetik data Prestasi dari Sanity secara aman
interface PrestasiItem {
  jenisLomba: string;
  tanggalLomba: string;
  juaraLomba: string;
  namaSiswa: string;
  foto?: any;
  deskripsi?: string;
}

// UTILITY: Mengambil URL gambar Sanity secara aman
function getSanityImageUrl(imageSource: any): string | null {
  if (!imageSource || !imageSource.asset || !imageSource.asset._ref) return null;
  try {
    return urlFor(imageSource).url();
  } catch {
    return null;
  }
}

// HELPER: Format tanggal Indonesia ringkas
function formatIndonesianDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function PrestasiPage() {
  // Ambil data prestasi dari skema 'prestasi' di Sanity CMS, diurutkan dari tanggal lomba terbaru
  let daftarPrestasi: PrestasiItem[] = [];
  try {
    daftarPrestasi = await client.fetch<PrestasiItem[]>(
      `*[_type == "prestasi"] | order(tanggalLomba desc) {
        jenisLomba,
        tanggalLomba,
        juaraLomba,
        namaSiswa,
        foto,
        deskripsi
      }`
    );
  } catch (error) {
    console.error("Gagal mengambil data prestasi dari Sanity:", error);
  }

  return (
    // Mengunci induk kontainer terluar agar tetap sejajar di koridor web & navbar
    <div className="w-full max-w-[1200px] mx-auto px-4 font-sans text-gray-800 mt-6 min-h-screen pb-16">
      
      {/* =========================================================
         HERO HEADER: ELEGAN & PROFESIONAL
         ========================================================= */}
      <div className="w-full bg-gradient-to-r from-[#0066ad] to-[#004b80] py-12 text-white text-center rounded-xl shadow-xs relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="w-full px-4 relative z-10">
          <span className="text-[10px] uppercase tracking-widest bg-amber-500/30 text-amber-200 px-3 py-1 rounded-full font-bold border border-amber-400/20 backdrop-blur-xs inline-flex items-center gap-1">
            <FaTrophy className="text-xs" /> Galeri Penghargaan
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3">Prestasi Siswa</h1>
          <p className="text-xs md:text-sm text-gray-200 mt-2 max-w-[600px] mx-auto font-medium">
            Apresiasi dan kebanggaan atas torehan prestasi putra-putri terbaik SD Negeri 1 Rejasari Purwokerto Barat.
          </p>
        </div>
      </div>

      {/* =========================================================
         KONTEN UTAMA: CARDS GRID LIST
         ========================================================= */}
      <div className="w-full py-10">
        {daftarPrestasi.length === 0 ? (
          // Kondisi jika data prestasi masih kosong di Sanity Studio
          <div className="text-center py-12 bg-white border border-gray-100 rounded-xl shadow-3xs">
            <FaMedal className="text-5xl text-gray-300 mx-auto mb-3 animate-pulse" />
            <p className="text-sm text-gray-500 font-medium">Belum ada data prestasi siswa yang dirilis saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {daftarPrestasi.map((item, idx) => {
              const fotoUrl = getSanityImageUrl(item.foto);
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-3xs hover:shadow-xs transition-all duration-300 flex flex-col group"
                >
                  {/* Bagian Foto Prestasi */}
                  <div className="w-full h-[200px] bg-gray-100 overflow-hidden relative shrink-0">
                    {fotoUrl ? (
                      <img 
                        src={fotoUrl} 
                        alt={item.jenisLomba} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      // Gambar cadangan jika admin Sanity tidak mengunggah gambar
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-1 bg-slate-50">
                        <FaTrophy className="text-4xl text-gray-200" />
                        <span className="text-[10px] font-medium uppercase tracking-wider">No Image Provided</span>
                      </div>
                    )}
                    {/* Badge Juara Mengambang di Pojok Kiri */}
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wide flex items-center gap-1">
                      <FaMedal /> {item.juaraLomba}
                    </div>
                  </div>

                  {/* Bagian Informasi & Keterangan */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#0066ad] transition-colors line-clamp-2 leading-tight">
                        {item.jenisLomba}
                      </h2>
                      
                      {/* Meta data: Siswa & Tanggal */}
                      <div className="space-y-1.5 pt-1 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                          {/* PERBAIKAN: Mengganti komponen ikon menjadi FaUserGraduate */}
                          <FaUserGraduate className="text-gray-400 text-sm shrink-0" />
                          <span className="text-gray-700 font-semibold line-clamp-1">{item.namaSiswa}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400 text-sm shrink-0" />
                          <span>{formatIndonesianDate(item.tanggalLomba)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Deskripsi / Keterangan Tambahan */}
                    {item.deskripsi && (
                      <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3 line-clamp-3 text-justify">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}